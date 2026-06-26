"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { getVideoEmbedUrl } from "@/lib/utils"

export function DesktopReelsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const projects = siteConfig.projects

  const handleScroll = () => {
    if (!scrollRef.current || playingIndex === null) return
    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const width = window.innerWidth
    const currentIndex = Math.round(scrollLeft / width)
    
    if (playingIndex !== currentIndex) {
      setPlayingIndex(null)
    }
  }



  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className="w-screen h-screen overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory bg-[#050505] text-white"
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

        return (
          <div 
            key={idx} 
            className="w-screen h-screen shrink-0 snap-center p-8 lg:p-12 pb-12 flex items-center justify-center relative"
          >
            {/* The main rounded card */}
            <div className="w-full h-full relative rounded-[40px] overflow-hidden group border border-white/10 shadow-2xl bg-black">
              {isPlaying && isVideo ? (
                <>
                  {isLocalVideo ? (
                    <video 
                      src={project.href} 
                      autoPlay
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                    />
                  ) : (
                    <iframe 
                      src={embedUrl || ""} 
                      title={cleanTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0 z-0 bg-black pointer-events-none"
                    />
                  )}
                  {/* Invisible overlay to allow swiping and tap-to-stop */}
                  <div 
                    className="absolute inset-0 z-10 cursor-pointer" 
                    onClick={() => setPlayingIndex(null)}
                  />
                </>
              ) : (
                <Image 
                  src={project.image || "/placeholder.svg"} 
                  alt={cleanTitle} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 z-0"
                  priority={idx === 0}
                />
              )}
                  
              {/* Dark Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none z-10 transition-opacity duration-1000 ${isPlaying ? 'opacity-0 delay-[2000ms]' : 'opacity-100'}`} />

              {/* Play Button Overlay */}
              {!isPlaying && isVideo && (
                <div 
                  className="absolute inset-0 m-auto w-24 h-24 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110 z-20 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
                  onClick={() => setPlayingIndex(idx)}
                >
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              )}

              {/* === Top Right Subtle Scroll Indicator === */}
              <div className="absolute top-8 right-8 lg:top-12 lg:right-12 flex items-center gap-6 z-20 pointer-events-auto">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-colors cursor-pointer backdrop-blur-sm bg-black/10"
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" })
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </div>
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-colors cursor-pointer backdrop-blur-sm bg-black/10"
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" })
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              </div>

              {/* === Bottom Left Content === */}
              <div className={`absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20 pointer-events-none transition-opacity duration-1000 ${isPlaying ? 'opacity-0 delay-[2000ms]' : 'opacity-100'}`}>
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
