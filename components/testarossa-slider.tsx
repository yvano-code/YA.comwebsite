"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { Project } from "@/lib/site-config"
import { getVideoEmbedUrl } from "@/lib/utils"
import { TumblerLogo } from "@/components/animated-logo"

function VideoPlayer({ item, isBackground, isActive, idx, activeIndex, isMuted, startTime, scaleClass, isVideoLink }: any) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Determine if this specific video should be muted
    const shouldBeMuted = isBackground ? true : (!isActive || isMuted);
    
    // For native video tags
    if (videoRef.current) {
      videoRef.current.muted = shouldBeMuted;
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
      } else if (isYouTube) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: shouldBeMuted ? 'mute' : 'unMute', args: [] }), 
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
          className={`w-full h-full object-cover pointer-events-none`}
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
      finalUrl = `${embedUrl}&start=${startTime}&loop=1&playlist=${videoId}`;
      finalUrl += isBackground ? '&player=bg' : '&player=fg';
    } else if (isVimeo) {
      finalUrl = `${embedUrl}&loop=1`;
      finalUrl += isBackground ? '&player=bg' : '&player=fg';
      finalUrl += `#t=${startTime}s`;
    }

    return (
      <div className={`absolute inset-0 w-full h-full pointer-events-none ${scaleClass}`}>
        <iframe
          ref={iframeRef}
          src={finalUrl}
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          className={`w-full h-full object-cover border-0 pointer-events-none`}
        />
      </div>
    );
  }
  
  return null;
}

export function TestarossaSlider({ items, className }: { items: Project[], className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [isCenterLogoHovered, setIsCenterLogoHovered] = useState(false)
  const [viewMode, setViewMode] = useState<'slider' | 'list'>('slider')
  const [hoveredListIndex, setHoveredListIndex] = useState<number | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const isAnimating = useRef(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
      setActiveIndex(nextIndex)
      // Automatically collapse expanded view when navigating to prevent weird layouts, or keep it expanded?
      // Let's keep it expanded if they click the side NEXT/PREV buttons while expanded.
      setTimeout(() => {
        isAnimating.current = false
      }, 900)
    }
  }, [activeIndex, items.length])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isAnimating.current || viewMode === 'list') return
    const direction = e.deltaY > 0 ? 1 : -1
    
    if (Math.abs(e.deltaY) > 20) {
      navigate(direction)
    }
  }, [navigate, viewMode])

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isAnimating.current || viewMode === 'list') return
    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY

    if (deltaY > 50) {
      navigate(1)
    } else if (deltaY < -50) {
      navigate(-1)
    }
  }, [navigate, viewMode])

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
    const isBgActive = viewMode === 'list'
      ? (hoveredListIndex !== null ? idx === hoveredListIndex : false)
      : idx === activeIndex;

    const isActive = isBackground
      ? isBgActive
      : idx === activeIndex;

    // Preload current, prev, and next so the video is ready when the user swipes!
    const isVisible = Math.abs(idx - activeIndex) <= 1 || isBgActive;

    if (!item.href || !isVisible) return null;

    let startTime = 0;
    let scaleClass = isBackground ? 'scale-[1.05]' : '';
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
    <div className={className || "fixed inset-0 z-[9999] w-full h-screen overflow-hidden bg-black text-[#eae3d9]"}>

      {/* Background Layer - Preload all for instant switching */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {/* Overlay to darken and blur the background image */}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-md z-20 pointer-events-none" />

        {isMounted && items.map((item, idx) => {
          const isBgActive = viewMode === 'list'
            ? (hoveredListIndex !== null ? idx === hoveredListIndex : false)
            : idx === activeIndex;

          const isVisible = idx === activeIndex || idx === prevIndex || isBgActive;
          if (!item.href || !isVisible) return null;

          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{ opacity: isBgActive ? 0.6 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className={`absolute inset-0 z-0 pointer-events-none origin-center`}
            >
              {item.href ? renderMedia(item, idx, true) : (
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
      {(viewMode === 'slider' || isExpanded) && (
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
                  : 'w-[90vw] h-[50.6vw] md:w-[60vw] md:h-[33.7vw] lg:w-[50vw] lg:h-[28.1vw] xl:w-[45vw] xl:h-[25.3vw]'}`
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
              <motion.div
                className="absolute w-full h-full flex flex-col"
                animate={{ y: `-${activeIndex * 100}%` }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
              >
                {items.map((item, idx) => (
                  <div key={idx} className="relative w-full h-full flex-none bg-black">
                    {item.href ? renderMedia(item, idx, false) : (
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority={idx === activeIndex || idx === activeIndex + 1 || idx === activeIndex - 1}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Expanded UI Overlay */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
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
            <div className={`absolute -top-6 left-0 right-0 flex justify-between items-center text-[8px] font-mono tracking-[0.2em] text-[#eae3d9] uppercase z-40 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
              <span>{items[activeIndex].category?.split('|')[0] || "FILM"}</span>
              <div
                className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center h-6 cursor-pointer pointer-events-auto text-[22.5px] tracking-normal normal-case"
                onMouseEnter={() => setIsCenterLogoHovered(true)}
                onMouseLeave={() => setIsCenterLogoHovered(false)}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] flex justify-center opacity-80 hover:opacity-100 transition-opacity origin-center">
                  <TumblerLogo isHovered={isCenterLogoHovered} muteSound={true} />
                </div>
              </div>
              <span>EDITORIAL</span>
            </div>

            <div className={`absolute -bottom-6 left-0 right-0 flex justify-between text-[8px] font-mono tracking-[0.2em] text-[#eae3d9] uppercase z-40 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
              <span>{String(activeIndex + 1).padStart(2, '0')}.</span>
              <span className="truncate max-w-[60%] text-center">{items[activeIndex].title.split('|')[0]}</span>
              <span>.{String(activeIndex + 1).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── TOP HEADER (LIST MODE) ── */}
      {viewMode === 'list' && (
        <div className={`absolute top-8 md:top-12 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 pointer-events-none transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
          {/* YA LOGO (LEFT) */}
          <motion.div
            layoutId="ya-logo-nav"
            className="cursor-pointer relative flex justify-center h-8 w-32 pointer-events-auto"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="absolute top-0 w-[300px] flex justify-center pointer-events-auto origin-left">
              <TumblerLogo isHovered={isLogoHovered} muteSound={true} />
            </div>
          </motion.div>

          {/* VIEW TOGGLE (RIGHT) */}
          <motion.div layoutId="view-toggle-nav" className="flex gap-4 items-center text-[11px] uppercase font-mono tracking-widest text-[#eae3d9]/70 bg-black/20 p-2 px-4 rounded-md backdrop-blur-sm pointer-events-auto">
            <span
              onClick={() => setViewMode('slider')}
              className={`cursor-pointer transition-colors ${viewMode === 'slider' ? 'text-[#eae3d9] font-bold' : 'hover:text-[#eae3d9]'}`}
            >
              SLIDER
            </span>
            <span>/</span>
            <span
              onClick={() => setViewMode('list')}
              className={`cursor-pointer transition-colors ${viewMode === 'list' ? 'text-[#eae3d9] font-bold' : 'hover:text-[#eae3d9]'}`}
            >
              LIST
            </span>
          </motion.div>
        </div>
      )}

      {/* ── LIST VIEW CORE ── */}
      {(viewMode === 'list' && !isExpanded) && (
        <div className="absolute inset-0 z-40 overflow-y-auto pointer-events-auto no-scrollbar pt-32 pb-32 px-4 md:px-12">
          <div className="max-w-[1400px] mx-auto flex flex-col w-full border-t border-[#eae3d9]/20">
            {items.map((item, idx) => {
              const parts = item.title.split('|');
              const mainTitle = parts[0]?.trim();
              const subTitle = parts.length > 1 ? parts.slice(1).join(' | ').trim() : '';

              const isHovered = hoveredListIndex === idx;
              const isFaded = hoveredListIndex !== null && hoveredListIndex !== idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredListIndex(idx)}
                  onMouseLeave={() => setHoveredListIndex(null)}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsExpanded(true);
                  }}
                  className={`flex flex-col md:flex-row items-center justify-between py-6 md:py-8 border-b border-[#eae3d9]/20 cursor-pointer group transition-all duration-500 ${isFaded ? 'opacity-30' : 'opacity-100'}`}
                >
                  {/* Left: Index + Title + Subtitle */}
                  <div className="flex-1 flex gap-4 md:gap-8 items-start w-full mb-4 md:mb-0">
                    <span className="font-mono text-[10px] md:text-xs text-[#eae3d9] pt-2">{String(idx + 1).padStart(2, '0')}.</span>
                    <div className="flex flex-col">
                      <h2 className="text-3xl md:text-5xl italic font-serif text-[#eae3d9] tracking-tight group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        {mainTitle}
                      </h2>
                      {subTitle && (
                        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#eae3d9]/70 mt-2 md:mt-4">
                          {subTitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Center: Thumbnail */}
                  <div className="w-[80%] md:w-[250px] lg:w-[320px] aspect-[16/9] relative mx-4 md:mx-8 overflow-hidden rounded-sm mb-4 md:mb-0 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={mainTitle}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-mono text-[10px] text-white tracking-widest uppercase flex items-center gap-2">
                        <span className="text-[12px] leading-none mb-0.5">•</span> PLAY VIDEO
                      </span>
                    </div>
                  </div>

                  {/* Right: Category/Tags */}
                  <div className="flex-1 flex justify-end w-full">
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#eae3d9]/70 text-right">
                      {item.category?.toUpperCase() || 'FILM'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── LEFT SCROLL INDICATOR ── */}
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

      {/* ── RIGHT SIDEBAR (TOGGLE + TITLES + LOGO) ── */}
      <div className={`hidden md:flex absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-50 flex-col items-end pointer-events-auto max-h-[80vh] transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>

        {/* TOP CONTROLS (LOGO + TOGGLE) */}
        {viewMode === 'slider' && (
          <div className="flex flex-col items-center pr-4">
            {/* LOGO */}
            <motion.div
              layoutId="ya-logo-nav"
              className="cursor-pointer mb-8 relative flex justify-center h-8 w-full"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div className="absolute top-0 w-[300px] flex justify-center pointer-events-auto">
                <TumblerLogo isHovered={isLogoHovered} muteSound={true} />
              </div>
            </motion.div>

            {/* VIEW TOGGLE */}
            <motion.div layoutId="view-toggle-nav" className="flex gap-4 items-center mb-8 text-[11px] uppercase font-mono tracking-widest text-[#eae3d9]/70 bg-black/20 p-2 px-4 rounded-md backdrop-blur-sm">
              <span
                onClick={() => setViewMode('slider')}
                className={`cursor-pointer transition-colors ${viewMode === 'slider' ? 'text-[#eae3d9] font-bold' : 'hover:text-[#eae3d9]'}`}
              >
                SLIDER
              </span>
              <span>/</span>
              <span
                onClick={() => setViewMode('list')}
                className={`cursor-pointer transition-colors ${viewMode === 'list' ? 'text-[#eae3d9] font-bold' : 'hover:text-[#eae3d9]'}`}
              >
                LIST
              </span>
            </motion.div>
          </div>
        )}

        {/* TITLES LIST */}
        {viewMode === 'slider' && (
          <div className="flex flex-col gap-3 items-end w-[35vw] overflow-y-auto no-scrollbar py-4 pr-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (isAnimating.current) return;
                  isAnimating.current = true;
                  setActiveIndex(idx);
                  setTimeout(() => { isAnimating.current = false; }, 900);
                }}
                className={`cursor-pointer text-[9px] lg:text-[10px] font-mono uppercase tracking-widest transition-all duration-300 text-right w-full truncate origin-right ${idx === activeIndex
                    ? "text-[#eae3d9] opacity-100 font-bold scale-110 drop-shadow-md pr-2"
                    : "text-[#eae3d9]/40 hover:text-[#eae3d9]/80"
                  }`}
              >
                {item.title.split('|')[0]}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── TYPOGRAPHY OVERLAY ── */}
      {(viewMode === 'slider' && !isExpanded) && (
        <div className={`absolute inset-0 z-40 pointer-events-none flex items-center justify-center px-4 md:px-12 text-center transition-opacity duration-500`}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              className="text-[12vw] md:text-[9vw] lg:text-[7rem] leading-[0.9] tracking-tighter text-[#eae3d9] italic drop-shadow-2xl uppercase max-w-[90vw]"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {items[activeIndex].title.split('|')[0].trim()}
            </motion.h2>
          </AnimatePresence>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div className={`absolute bottom-0 left-0 w-full flex justify-between items-end px-8 py-8 z-50 text-[10px] uppercase font-mono tracking-widest transition-opacity duration-500 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100 text-[#eae3d9]/70'}`}>
        <div>© 2026</div>
      </div>
      {/* ── INFO PANEL ── */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="fixed top-0 right-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-full bg-[#111]/90 backdrop-blur-xl z-[10002] border-l border-[#eae3d9]/10 flex flex-col pointer-events-auto"
          >
            <div className="p-8 md:p-12 h-full overflow-y-auto font-mono text-[#eae3d9]">
              <div className="flex justify-between items-center mb-16 text-[10px] tracking-widest uppercase text-[#eae3d9]/70">
                <span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                <button onClick={() => setShowInfo(false)} className="hover:text-white transition-colors cursor-pointer bg-black/20 p-2 px-4 rounded-md backdrop-blur-sm">CLOSE</button>
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

    </div>
  )
}
