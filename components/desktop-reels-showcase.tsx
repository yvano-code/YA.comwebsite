"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { getVideoEmbedUrl } from "@/lib/utils"

export function DesktopReelsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const mediaRefs = useRef<{ [key: number]: HTMLIFrameElement | HTMLVideoElement | null }>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [videoReady, setVideoReady] = useState<{ [key: number]: boolean }>({})
  const [isMuted, setIsMuted] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const projects = siteConfig.projects

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Auto-play the currently visible video after 2.5 seconds
    const timer = setTimeout(() => {
      setPlayingIndex(currentIndex)
    }, 2500)

    return () => clearTimeout(timer)
  }, [currentIndex, isMounted])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const width = window.innerWidth
    const newIndex = Math.round(scrollLeft / width)
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
      setPlayingIndex(null)
      setIsMuted(true) // Reset mute when scrolling to a new video
    }
  }

  if (!isMounted) return null // Prevent SSR mismatch completely

  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className="w-full overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory bg-transparent text-white pb-16"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { display: none; }
      `}} />
      
      {projects.map((project, idx) => {
        // Fallbacks for data
        const year = "2024" 
        // @ts-ignore
        const category = project.category || (project.title.includes("SERIES") ? "SERIES" : 
                         project.title.includes("COMMERCIAL") ? "COMMERCIAL" : "SHORT FILM")
        
        // Extract a clean title (removing the tags after the pipe)
        const cleanTitle = project.title.split("|")[0].trim()

        const isLocalVideo = !!project.href?.toLowerCase().match(/\.(mp4|webm|mov)$/)
        const embedUrl = getVideoEmbedUrl(project.href, true, false)
        const isVideo = !!embedUrl || isLocalVideo
        const isPlaying = playingIndex === idx
        const isFocused = currentIndex === idx

        return (
          <div 
            key={idx} 
            className="w-full shrink-0 snap-center px-8 lg:px-12 flex items-center justify-center relative"
          >
            {/* Side Navigation Arrows (Outside the video card) */}
            <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/20 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
              onClick={() => { if (scrollRef.current) scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" }) }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </div>
            <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/20 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
              onClick={() => { if (scrollRef.current) scrollRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" }) }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>

            {/* The main cinematic card (Adapts aspect ratio for vertical videos) */}
            <div className={`relative rounded-xl lg:rounded-[24px] overflow-hidden group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] bg-black/50 border border-white/10 ${
              (project as any).isVertical 
                ? 'h-[75vh] md:h-[80vh] lg:h-[85vh] aspect-[9/16]' 
                : 'w-full max-w-[95vw] md:max-w-[90vw] xl:max-w-[85vw] aspect-video'
            }`}>
              
              {/* VIDEO LAYER (Bottom) */}
              {isFocused && isVideo && isPlaying && (
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center bg-black">
                  {isLocalVideo ? (
                    <video 
                      ref={el => { mediaRefs.current[idx] = el }}
                      src={project.href} 
                      autoPlay
                      playsInline
                      muted={true}
                      onPlay={() => setVideoReady(prev => ({ ...prev, [idx]: true }))}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  ) : (
                    <iframe 
                      ref={el => { mediaRefs.current[idx] = el as HTMLIFrameElement }}
                      src={getVideoEmbedUrl(project.href, true, true) || ""} 
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      onLoad={() => {
                        // Give the iframe a tiny moment to actually start its autoplay
                        setTimeout(() => {
                          setVideoReady(prev => ({ ...prev, [idx]: true }))
                        }, 500)
                        
                        // Forcefully disable closed captions for users who have them turned on by default.
                        // The iframe onLoad fires before the YouTube JS SDK is fully ready inside, 
                        // so we send the command multiple times to ensure it catches.
                        let attempts = 0;
                        const interval = setInterval(() => {
                          const playerEl = mediaRefs.current[idx] as HTMLIFrameElement
                          if (playerEl && playerEl.contentWindow && project.href?.includes('youtu')) {
                            playerEl.contentWindow.postMessage('{"event":"command","func":"unloadModule","args":["captions"]}', '*')
                            playerEl.contentWindow.postMessage('{"event":"command","func":"setOption","args":["captions", "track", {}]}', '*')
                          }
                          attempts++;
                          if (attempts > 8) clearInterval(interval);
                        }, 500)
                      }}
                      className="absolute inset-0 w-full h-full border-0 z-0 bg-black"
                    />
                  )}
                </div>
              )}

              {/* THUMBNAIL LAYER (Middle) */}
              <Image 
                src={project.image || "/placeholder.svg"} 
                alt={cleanTitle} 
                fill 
                style={{ objectPosition: (project as any).imagePosition || 'center' }}
                className={`object-cover transition-all duration-1000 group-hover:scale-105 z-10 pointer-events-none ${isPlaying && videoReady[idx] ? 'opacity-0' : 'opacity-100'}`}
                priority={idx === 0}
              />

              {/* OVERLAYS (Top) */}
              {/* Invisible overlay to allow swiping and tap-to-stop */}
              {isPlaying && (
                <div 
                  className="absolute inset-0 z-20 cursor-pointer" 
                  onClick={() => {
                    setPlayingIndex(null)
                    setIsMuted(true)
                  }}
                />
              )}
                  
              {/* Dark Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none z-20 transition-opacity duration-1000 ${isPlaying && videoReady[idx] ? 'opacity-0 delay-[2000ms]' : 'opacity-100'}`} />

              {/* Professional Play Button (Center, only when paused) */}
              {!isPlaying && isVideo && (
                <div 
                  className="absolute inset-0 m-auto w-20 h-20 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all z-30 cursor-pointer shadow-2xl hover:bg-black/80 hover:scale-105"
                  onClick={(e) => {
                    setPlayingIndex(idx)
                    setIsMuted(false) // Auto-unmute when explicitly clicking play
                  }}
                >
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              )}

              {/* Sleek Volume Toggle (Bottom Right, only when playing) */}
              {isPlaying && isVideo && videoReady[idx] && (
                <div 
                  className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 w-12 h-12 bg-black/30 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all z-30 cursor-pointer shadow-lg hover:bg-white/20 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation()
                    const newMuted = !isMuted
                    setIsMuted(newMuted)
                    
                    const playerEl = mediaRefs.current[idx]
                    if (playerEl) {
                      if (isLocalVideo) {
                        (playerEl as HTMLVideoElement).muted = newMuted
                      } else if (project.href?.includes('youtu')) {
                        const cmd = newMuted ? 'mute' : 'unMute'
                        ;(playerEl as HTMLIFrameElement).contentWindow?.postMessage(`{"event":"command","func":"${cmd}","args":""}`, '*')
                      } else if (project.href?.includes('vimeo')) {
                        const vol = newMuted ? 0 : 1
                        ;(playerEl as HTMLIFrameElement).contentWindow?.postMessage(`{"method":"setVolume","value":${vol}}`, '*')
                      }
                    }
                  }}
                >
                  {isMuted ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </div>
              )}

              {/* === Bottom Left Content === */}
              <div className={`absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20 pointer-events-none transition-opacity duration-1000 ${isPlaying && videoReady[idx] ? 'opacity-0 delay-[2000ms]' : 'opacity-100'}`}>
                <p className="text-[10px] lg:text-xs font-bold tracking-[0.3em] uppercase mb-3 text-white/80">
                  {category}
                </p>
                <h2 className="text-6xl lg:text-[100px] leading-[0.85] font-black uppercase tracking-tighter mb-8 max-w-4xl drop-shadow-2xl">
                  {cleanTitle}
                </h2>
                
                <div className="flex flex-col max-w-md border-t border-white/20 pt-5">
                  {project.credits?.slice(0, 2).map((credit, i) => (
                    <div key={i} className="flex border-b border-white/10 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
                      <span className="w-32 text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 mt-0.5">
                        {credit.label}
                      </span>
                      <span className="text-[11px] font-bold tracking-[0.1em] uppercase flex-1">
                        {credit.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>



            </div>
          </div>
        )
      })}
    </div>
  )
}

