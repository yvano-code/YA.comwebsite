"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { siteConfig, type Project } from "@/lib/site-config"
import { getVideoEmbedUrl } from "@/lib/utils"
import { AnimatedLogo } from "@/components/animated-logo"
import { Send } from "lucide-react"

function VideoPlayer({ item, isBackground, isActive, idx, activeIndex, isMuted, startTime, scaleClass, isVideoLink }: any) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Determine if this specific video should be muted
    const shouldBeMuted = isBackground ? true : (!isActive || isMuted);

    // For native video tags
    if (videoRef.current) {
      videoRef.current.muted = shouldBeMuted;
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }

    // For iframes (YouTube/Vimeo)
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const isVimeo = item.href?.includes('vimeo');
      const isYouTube = item.href?.includes('youtube') || item.href?.includes('youtu.be');

      if (isVimeo) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'setVolume', value: shouldBeMuted ? 0 : 1 }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: isActive ? 'play' : 'pause' }),
          '*'
        );
      } else if (isYouTube) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: shouldBeMuted ? 'mute' : 'unMute', args: [] }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: isActive ? 'playVideo' : 'pauseVideo', args: [] }),
          '*'
        );
      }
    }
  }, [isMuted, isActive, isBackground, item.href]);

  if (isVideoLink) {
    return (
      <div className={`absolute inset-0 w-full h-full pointer-events-none ${scaleClass}`}>
        <video
          ref={videoRef}
          src={`${item.href}#t=${startTime}`}
          autoPlay
          muted={true}
          loop
          playsInline
          className={`w-full h-full ${isBackground ? 'object-cover' : 'object-contain'} pointer-events-none`}
        />
      </div>
    );
  }

  const embedUrl = getVideoEmbedUrl(item.href, true, true);
  if (embedUrl) {
    const isVimeo = embedUrl.includes('vimeo.com');
    const isYouTube = embedUrl.includes('youtube');
    let finalUrl = embedUrl;

    if (isYouTube) {
      const videoId = embedUrl.split('/embed/')[1]?.split('?')[0] || '';
      finalUrl = `${embedUrl}&start=${startTime}&loop=1&playlist=${videoId}&cc_load_policy=0&iv_load_policy=3`;
      finalUrl += isBackground ? '&player=bg' : '&player=fg';
    } else if (isVimeo) {
      finalUrl = `${embedUrl}&loop=1&texttrack=`;
      finalUrl += isBackground ? '&player=bg' : '&player=fg';
      finalUrl += `#t=${startTime}s`;
    }

    return (
      <div className={`absolute inset-0 w-full h-full pointer-events-none ${scaleClass}`}>
        <iframe
          ref={iframeRef}
          src={finalUrl}
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          className={`w-full h-full ${isBackground ? 'object-cover' : 'object-contain'} border-0 pointer-events-none`}
        />
      </div>
    );
  }

  return null;
}

export function TestarossaSlider({ items, className }: { items: Project[], className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMuted, setIsMuted] = useState(true)


  const [showInfo, setShowInfo] = useState(false)
  const isAnimating = useRef(false)

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const vParam = urlParams.get('v')
      if (vParam) {
        const foundIndex = items.findIndex(item => encodeURIComponent(item.title.split('|')[0].trim()) === vParam)
        if (foundIndex !== -1) {
          setActiveIndex(foundIndex)
          setIsExpanded(true)
          setShowInfo(true)
        }
      }
    }
  }, [items])

  const handleShare = async () => {
    try {
      const mainTitle = items[activeIndex].title.split('|')[0].trim()
      const shareUrl = `${window.location.origin}${window.location.pathname}?v=${encodeURIComponent(mainTitle)}`
      
      const shareData = {
        title: mainTitle,
        text: `Check out ${mainTitle}`,
        url: shareUrl,
      }
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copied to clipboard')
      }
    } catch (err) {
      console.log('Error sharing:', err)
    }
  }

  // When activeIndex changes, store the previous index so we can keep it mounted during transitions
  useEffect(() => {
    setPrevIndex(prev => {
      // The old activeIndex is now the prevIndex
      return activeIndex;
    });
  }, [activeIndex]);

  const navigate = useCallback((direction: number) => {
    if (isAnimating.current) return
    const nextIndex = activeIndex + direction
    if (nextIndex >= 0 && nextIndex < items.length) {
      isAnimating.current = true
      setSlideDirection(direction)
      setActiveIndex(nextIndex)
      // Automatically collapse expanded view when navigating to prevent weird layouts, or keep it expanded?
      // Let's keep it expanded if they click the side NEXT/PREV buttons while expanded.
      setTimeout(() => {
        isAnimating.current = false
      }, 500)
    }
  }, [activeIndex, items.length])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isAnimating.current) return
    const direction = e.deltaY > 0 ? 1 : -1

    if (Math.abs(e.deltaY) > 20) {
      navigate(direction)
    }
  }, [navigate])

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isAnimating.current) return
    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY

    if (deltaY > 50) {
      navigate(1)
    } else if (deltaY < -50) {
      navigate(-1)
    }
  }, [navigate])

  useEffect(() => {
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.documentElement.style.overscrollBehavior = "none"
    document.body.style.overscrollBehavior = "none"

    window.addEventListener("wheel", handleWheel, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      document.documentElement.style.overscrollBehavior = ""
      document.body.style.overscrollBehavior = ""
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleWheel, handleTouchEnd])

  const renderMedia = (item: Project, idx: number, isBackground: boolean) => {
    const isBgActive = idx === activeIndex;

    const isActive = isBackground
      ? isBgActive
      : idx === activeIndex;

    // Preload current, prev, and next to save memory and network bandwidth.
    const isVisible = Math.abs(idx - activeIndex) <= 1 || isBgActive;

    if (!item.href || !isVisible) return null;

    let startTime = 0;
    let scaleClass = isBackground ? 'scale-[1.05]' : 'scale-100';
    if (item.title.includes('#BLACK')) {
      startTime = 69;
      if (isBackground) scaleClass = 'scale-[3.5]';
    } else if (item.title.includes('FAFIÉLLA')) {
      startTime = 71;
    } else if (item.title.includes('MOONGAZER')) {
      startTime = 10;
    }

    const isVideoLink = item.href?.match(/\.(mp4|webm|mov)$/i);

    return (
      <VideoPlayer
        item={item}
        isBackground={isBackground}
        isActive={isActive}
        idx={idx}
        activeIndex={activeIndex}
        isMuted={isMuted}
        startTime={startTime}
        scaleClass={scaleClass}
        isVideoLink={!!isVideoLink}
      />
    );
  }

  return (
    <div className={className || "fixed inset-0 z-[9999] w-full h-screen overflow-hidden bg-transparent text-[#eae3d9]"}>

      {/* Background Layer - Preload all for instant switching */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-transparent">
        {/* Overlay to tint and blur the background image with site color */}
        <div className="absolute inset-0 bg-[#eae3d9]/25 backdrop-blur-md z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/[0.11] z-20 pointer-events-none" />

        {isMounted && items.map((item, idx) => {
          const isBgActive = idx === activeIndex;

          // Mount background videos only if they are adjacent to active index to prevent network blocking
          const isVisible = Math.abs(idx - activeIndex) <= 1;

          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{ opacity: isBgActive ? 0.6 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`absolute inset-0 z-0 pointer-events-none origin-center`}
            >
              {isVisible && item.href ? renderMedia(item, idx, true) : (
                <Image
                  src={item.image || "/placeholder.jpg"}
                  alt="background"
                  fill
                  className="object-cover pointer-events-none"
                  priority={idx === 0 || isBgActive}
                />
              )}
            </motion.div>
          );
        })}
      </div>



      {/* ── VERTICAL SLIDER CORE (Also Expanded View) ── */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none gap-6">

          {/* Central Frame Wrapper */}
          <div
            onClick={() => {
              if (!isExpanded) setIsExpanded(true)
            }}
            className={`relative pointer-events-auto flex-none group mx-auto transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isExpanded
                ? 'w-[100vw] h-[100dvh] cursor-default'
                : `cursor-pointer ${items[activeIndex].title.includes('#BLACK')
                  ? 'w-[55vw] h-[97.7vw] md:w-[35vw] md:h-[62.2vw] lg:w-[28vw] lg:h-[49.7vw] xl:w-[25vw] xl:h-[44.4vw]'
                  : 'w-[100vw] h-[56.2vw] md:w-[66.6vw] md:h-[37.4vw] lg:w-[55.5vw] lg:h-[31.2vw] xl:w-[50vw] xl:h-[28.1vw]'}`
              }`}
          >

            {/* Subtle corner framing brackets */}
            <div className={`absolute -top-1 -left-1 w-4 h-4 border-t border-l border-[#eae3d9]/40 z-40 transition-opacity group-hover:border-[#eae3d9] ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute -top-1 -right-1 w-4 h-4 border-t border-r border-[#eae3d9]/40 z-40 transition-opacity group-hover:border-[#eae3d9] ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-[#eae3d9]/40 z-40 transition-opacity group-hover:border-[#eae3d9] ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-[#eae3d9]/40 z-40 transition-opacity group-hover:border-[#eae3d9] ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />

            {/* Frame Rulers / Edge labels */}
            <div className="absolute -left-8 top-0 h-full w-6 flex flex-col justify-between items-end text-[7px] font-mono text-[#eae3d9]/30 py-4 hidden md:flex">
              <span>640</span><span>630</span><span>620</span><span>610</span><span>600</span><span>590</span><span>580</span><span>570</span><span>560</span>
            </div>
            <div className="absolute -right-8 top-0 h-full w-6 flex flex-col justify-between items-start text-[7px] font-mono text-[#eae3d9]/30 py-4 hidden md:flex">
              <span>640</span><span>630</span><span>620</span><span>610</span><span>600</span><span>590</span><span>580</span><span>570</span><span>560</span>
            </div>

            {/* Masking container for the sliding images */}
            <div className="w-full h-full relative overflow-hidden bg-black">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-full h-full flex-none bg-black"
                  initial={false}
                  animate={{ y: `${(idx - activeIndex) * 100}%` }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                  style={{ zIndex: idx === activeIndex ? 10 : 1 }}
                >
                  {item.href ? renderMedia(item, idx, false) : (
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      priority={idx === activeIndex || idx === activeIndex + 1 || idx === activeIndex - 1}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Expanded UI Overlay */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-[10001] pointer-events-none flex flex-col justify-between p-4 md:p-8 text-[#eae3d9] font-mono tracking-widest uppercase"
                >
                  {/* Top Row */}
                  <div className="flex justify-between w-full pointer-events-auto items-center px-4 md:px-8 mt-4 md:mt-8">
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsExpanded(false); setIsMuted(true); }}
                      className="flex gap-2 items-center text-[11px] bg-black/20 p-2 px-4 rounded-md backdrop-blur-sm text-[#eae3d9]/70 hover:text-[#eae3d9] transition-colors cursor-pointer"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg> BACK
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); setShowInfo(true); }}
                      className="text-[11px] bg-black/20 p-2 px-4 rounded-md backdrop-blur-sm text-[#eae3d9]/70 hover:text-[#eae3d9] transition-colors cursor-pointer"
                    >
                      INFO
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                      className="flex gap-2 items-center text-[11px] bg-black/20 p-2 px-4 rounded-md backdrop-blur-sm text-[#eae3d9]/70 hover:text-[#eae3d9] transition-colors cursor-pointer"
                    >
                      {isMuted ? 'UNMUTE' : 'MUTE'}
                    </button>
                  </div>

                  {/* Bottom Row - Scroll Indicator */}
                  <div className="flex justify-center w-full pointer-events-auto text-[10px] pb-8 md:pb-12 text-[#eae3d9]/70">
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex flex-col items-center gap-2 pointer-events-none mix-blend-difference"
                    >
                      <span>SCROLL TO EXPLORE</span>
                      <div className="w-[1px] h-8 bg-[#eae3d9]/50" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top/Bottom Micro-labels */}
            {/* Top/Bottom Micro-labels */}
            <div className={`absolute -top-6 left-[2%] right-[2%] flex justify-between items-center text-[8px] font-mono tracking-[0.2em] text-[#eae3d9] uppercase z-40 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="relative h-6 w-32 flex items-center overflow-hidden">
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.div
                    key={`cat-${activeIndex}`}
                    custom={slideDirection}
                    initial={(dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 })}
                    animate={{ y: 0, opacity: 1 }}
                    exit={(dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 })}
                    transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                    className="absolute py-4 -my-4"
                  >
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7], textShadow: ['0px 0px 0px rgba(234,227,217,0)', '0px 0px 12px rgba(234,227,217,0.95)', '0px 0px 0px rgba(234,227,217,0)'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                    >
                      {items[activeIndex].category?.split('|')[0] || "FILM"}
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center h-6 pointer-events-none text-[9px] tracking-[0.3em] font-mono font-semibold text-[#eae3d9] py-4 -my-4"
                animate={{ opacity: [0.7, 1, 0.7], textShadow: ['0px 0px 0px rgba(234,227,217,0)', '0px 0px 12px rgba(234,227,217,0.95)', '0px 0px 0px rgba(234,227,217,0)'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                [ FULLSCREEN ]
              </motion.div>
              <div className="relative h-6 w-48 flex items-center justify-end overflow-hidden">
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.div 
                    key={`dir-${activeIndex}`}
                    custom={slideDirection}
                    initial={(dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 })}
                    animate={{ y: 0, opacity: 1 }}
                    exit={(dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 })}
                    transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                    className="absolute text-right truncate max-w-full py-4 -my-4 px-2 -mx-2"
                  >
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7], textShadow: ['0px 0px 0px rgba(234,227,217,0)', '0px 0px 12px rgba(234,227,217,0.95)', '0px 0px 0px rgba(234,227,217,0)'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    >
                      {items[activeIndex].credits
                        ?.filter(c => c.value.includes('Yvano'))
                        .map(c => c.label)
                        .join(' • ')}
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className={`absolute -bottom-6 left-[2%] right-[2%] flex justify-between text-[8px] font-mono tracking-[0.2em] text-[#eae3d9] uppercase z-40 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="relative h-6 w-64 flex items-center overflow-hidden">
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.div 
                    key={`brand-${activeIndex}`}
                    custom={slideDirection}
                    initial={(dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 })}
                    animate={{ y: 0, opacity: 1 }}
                    exit={(dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 })}
                    transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                    className="absolute text-left truncate max-w-full py-4 -my-4 px-2 -mx-2"
                  >
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7], textShadow: ['0px 0px 0px rgba(234,227,217,0)', '0px 0px 12px rgba(234,227,217,0.95)', '0px 0px 0px rgba(234,227,217,0)'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    >
                      {items[activeIndex].credits
                        ?.filter(c => c.label.toLowerCase().includes('executive producer') || c.label.toLowerCase().includes('creator'))
                        .map(c => `${c.label}: ${c.value}`)
                        .join(' • ')}
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="relative h-6 w-16 flex justify-end items-center overflow-hidden">
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.div
                    key={`num-${activeIndex}`}
                    custom={slideDirection}
                    initial={(dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 })}
                    animate={{ y: 0, opacity: 1 }}
                    exit={(dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 })}
                    transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                    className="absolute py-4 -my-4"
                  >
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7], textShadow: ['0px 0px 0px rgba(234,227,217,0)', '0px 0px 12px rgba(234,227,217,0.95)', '0px 0px 0px rgba(234,227,217,0)'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    >
                      .{String(activeIndex + 1).padStart(2, '0')}
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

{/* ── LEFT SCROLL INDICATOR ── */ }
<div className={`hidden md:flex absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6 pointer-events-none transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
  <div className="text-[9px] font-mono tracking-[0.3em] text-[#eae3d9]/50 [writing-mode:vertical-lr] rotate-180 uppercase">
    Scroll to explore
  </div>
  <div className="relative w-[1px] h-16 bg-[#eae3d9]/20 overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 w-full h-1/2 bg-[#eae3d9]"
      animate={{ y: ['-100%', '200%'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
</div>

{/* ── LEFT BIO ── */ }
<div 
  className={`hidden lg:flex absolute left-16 xl:left-20 z-40 w-[18vw] max-w-[300px] flex-col justify-start pointer-events-auto transition-opacity duration-500 top-1/2 -translate-y-[15.6vw] xl:-translate-y-[14.05vw] mt-1 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
>
  <div className="flex flex-col gap-4 text-sm xl:text-base text-[#eae3d9]/80 leading-relaxed tracking-tight font-medium mix-blend-difference text-left" style={{ fontFamily: 'var(--font-playfair), serif' }}>
    {siteConfig.imdbBio.split('\n\n').map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))}
  </div>
  <Link href="/about" className="mt-8 group relative flex items-center justify-center gap-4 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full backdrop-blur-md transition-all duration-200 w-fit overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
    {/* Glow effect */}
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-200 rounded-full" />
    <span className="relative z-10 text-[11px] font-mono tracking-[0.3em] uppercase text-white font-medium">READ MORE</span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 text-white transition-transform duration-200 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  </Link>
</div>

{/* ── RIGHT SIDEBAR (LOGO + TITLES) ── */ }
<div className={`hidden md:flex absolute right-12 lg:right-16 xl:right-20 top-1/2 -translate-y-1/2 z-50 flex-col items-end pointer-events-auto max-h-[80vh] transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>

  {/* LOGO */}
  <div className="flex flex-col items-center pr-4 mb-10 w-full">
    <motion.div
      layoutId="ya-logo-nav"
      className="relative flex justify-center h-8 w-full"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] flex justify-center pointer-events-auto origin-center scale-90">
        <AnimatedLogo autoPlay={true} muteSound={true} disableInteraction={true} className="text-3xl lg:text-4xl" />
      </div>
    </motion.div>
  </div>

  {/* TITLES LIST */}
  <div className="flex flex-col gap-2 lg:gap-3 items-center overflow-y-auto no-scrollbar py-4 pr-4">
    {items.map((item, idx) => {
      const isActive = idx === activeIndex;
      return (
        <div
          key={idx}
          onClick={() => {
            setActiveIndex(idx);
          }}
          className={`group flex items-center justify-center cursor-pointer transition-all duration-200 w-full text-center py-1.5 px-4 rounded-full hover:bg-white/5`}
        >
          <span className={`text-[9px] lg:text-[10px] uppercase tracking-[0.15em] transition-all duration-200 ${isActive ? "text-[#eae3d9] font-medium scale-105" : "text-[#eae3d9]/30 font-light group-hover:text-[#eae3d9]/80 group-hover:scale-105"}`}>
            {item.title.split('|')[0].trim()}
          </span>
        </div>
      );
    })}
  </div>
</div>

{/* ── TYPOGRAPHY OVERLAY ── */ }
{
  (!isExpanded) && (
    <div className={`absolute inset-0 z-40 pointer-events-none flex items-center justify-center px-4 md:px-12 text-center transition-opacity duration-500`}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={activeIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
          className="text-[12vw] md:text-[9vw] lg:text-[7rem] leading-[0.9] tracking-tighter text-[#eae3d9] italic drop-shadow-2xl uppercase max-w-[90vw]"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          {items[activeIndex].title.split('|')[0].trim()}
        </motion.h2>
      </AnimatePresence>
    </div>
  )
}

{/* ── FOOTER ── */ }
<div className={`absolute bottom-0 left-0 w-full flex justify-between items-end px-8 py-8 z-50 text-[10px] uppercase font-mono tracking-widest transition-opacity duration-500 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100 text-[#eae3d9]/70'}`}>
  <div>© 2026</div>
</div>
{/* ── INFO PANEL ── */ }
<AnimatePresence>
  {showInfo && (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
      className="fixed top-0 right-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-full bg-[#111]/90 backdrop-blur-xl z-[10002] border-l border-[#eae3d9]/10 flex flex-col pointer-events-auto"
    >
      <div className="p-8 md:p-12 h-full overflow-y-auto font-mono text-[#eae3d9]">
        <div className="flex justify-between items-center mb-16 text-[10px] tracking-widest uppercase text-[#eae3d9]/70">
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          <div className="flex gap-2">
            <button onClick={handleShare} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer bg-black/20 p-2 px-4 rounded-md backdrop-blur-sm">
              <Send className="w-3 h-3" /> SHARE
            </button>
            <button onClick={() => setShowInfo(false)} className="hover:text-white transition-colors cursor-pointer bg-black/20 p-2 px-4 rounded-md backdrop-blur-sm">
              CLOSE
            </button>
          </div>
        </div>

        <div className="text-[10px] tracking-widest uppercase text-[#eae3d9]/60 mb-6">
          {items[activeIndex].category || 'FEATURE DOCUMENTARY / TV & FILM'}
        </div>

        <h2 className="text-4xl md:text-5xl italic font-serif text-[#eae3d9] tracking-tight mb-16" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          {items[activeIndex].title.split('|')[0]}
        </h2>

        <div className="space-y-6 text-[10px] uppercase tracking-widest leading-loose">
          {items[activeIndex].credits?.map((credit, i) => (
            <div key={i} className="flex flex-col mb-4">
              <span className="text-[#eae3d9]/50 mb-1">{credit.label}</span>
              <span className="text-[#eae3d9]">{credit.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div >
  )
}
