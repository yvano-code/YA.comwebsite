"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { Project } from "@/lib/site-config"
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/utils"

export function AccordionCarousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showOverlay, setShowOverlay] = useState(true)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false)

  // Reset overlay when active index changes
  useEffect(() => {
    setShowOverlay(true)
    setHasStartedPlaying(false)
    
    // Dispatch background colorway
    const colorway = projects[activeIndex]?.colorway
    if (colorway) {
      window.dispatchEvent(new CustomEvent('bg-change', { detail: colorway }))
    } else {
      window.dispatchEvent(new CustomEvent('bg-change', { detail: null }))
    }
  }, [activeIndex, projects])

  // Revert background to neutral on unmount
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('bg-change', { detail: null }))
    }
  }, [])

  // Timer to hide overlay after 3 seconds, but ONLY if playing
  useEffect(() => {
    if (!showOverlay || !hasStartedPlaying) return
    const timer = setTimeout(() => {
      setShowOverlay(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [showOverlay, hasStartedPlaying, activeIndex])

  // Detect iframe clicks (since iframes swallow onClick events)
  useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement?.tagName === 'IFRAME') {
        setHasStartedPlaying(true)
        setShowOverlay(true)
        // Return focus to window so we can detect the next click
        setTimeout(() => {
          window.focus()
        }, 100)
      }
    }
    window.addEventListener('blur', handleBlur)
    return () => window.removeEventListener('blur', handleBlur)
  }, [])

  return (
    <div className="flex w-full h-[60vh] min-h-[500px] max-h-[800px] gap-2 md:gap-4 px-6 md:px-12 pb-12 overflow-hidden">
      {projects.map((project, idx) => {
        const isActive = activeIndex === idx
        
        const isLocalVideo = !!project.href?.toLowerCase().match(/\.(mp4|webm|mov)$/)
        const embedUrlActive = getVideoEmbedUrl(project.href, false, false) // <-- Changed autoplay to false
        const isVideo = !!embedUrlActive || isLocalVideo
        const thumbnailUrl = project.image || getVideoThumbnailUrl(project.href) || "/placeholder.svg"

        return (
          <motion.div
            key={project.title}
            layout
            onMouseEnter={() => {
              if (isActive) setShowOverlay(true)
            }}
            onMouseMove={() => {
              if (isActive) setShowOverlay(true)
            }}
            onClick={() => {
              if (!isActive) {
                setActiveIndex(idx)
              } else {
                setShowOverlay(true)
              }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.15)] bg-white/20 backdrop-blur-2xl ${
              isActive ? "flex-grow cursor-default" : "w-12 md:w-24 cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)] transition-shadow"
            }`}
          >
            {/* LIQUID GLASS ANIMATION: Starts as sharp thumbnail, blurs into glass background when active */}
            <Image
              src={thumbnailUrl}
              alt={project.title}
              fill
              className={`absolute inset-0 object-cover z-0 pointer-events-none transition-all duration-700 ease-in-out ${isActive ? 'scale-125 blur-[30px] saturate-[1.5] opacity-80' : 'scale-100 blur-0 opacity-100'}`}
            />
            
            {/* Clean Glass Highlights & Reflections (No dirty gradients) */}
            <div className="absolute inset-0 shadow-[inset_0_2px_6px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(255,255,255,0.2)] z-0 pointer-events-none rounded-[inherit]" />

            {isActive ? (
              // Active State Content (Video inside the glass bezel)
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute inset-0 w-full h-full p-2 md:p-3 flex flex-col z-10"
              >
                {/* AMBIENT BACKLIGHT BEHIND THE VIDEO */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl md:rounded-[2rem]">
                  <Image
                    src={thumbnailUrl}
                    alt="Ambient Backlight"
                    fill
                    className="object-cover blur-3xl saturate-200 opacity-60 scale-[1.5] md:scale-[2] will-change-transform"
                  />
                </div>

                <div className="relative w-full h-full rounded-xl md:rounded-[1.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-black z-10">
                  {/* Background Video/Image */}
                  {isVideo && hasStartedPlaying ? (
                    isLocalVideo ? (
                      <video 
                        src={project.href} 
                        controls 
                        autoPlay
                        onPlay={() => setHasStartedPlaying(true)}
                        onPause={() => setShowOverlay(true)}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                      />
                    ) : (
                      <iframe 
                        src={getVideoEmbedUrl(project.href, true, false) || ""} 
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0 z-0 bg-black"
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 w-full h-full z-0 group/play">
                      <Image
                        src={thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover z-0"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/play:bg-black/10 transition-colors z-10" />
                      {isVideo && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setHasStartedPlaying(true);
                          }}
                          className="absolute inset-0 m-auto w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center transition-all hover:scale-110 z-20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        >
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Overlay text */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showOverlay ? 1 : 0, y: showOverlay ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none"
                  >
                    <h4 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-widest uppercase text-white drop-shadow-lg mb-2">
                      {project.title}
                    </h4>
                    {project.subtitle && (
                      <p className="text-[11px] md:text-[13px] leading-relaxed text-gray-300 font-bold uppercase tracking-[0.2em] mb-4">
                        {project.subtitle}
                      </p>
                    )}
                    <div className="flex flex-col gap-1.5 border-l-2 border-white/30 pl-4 mt-4">
                      {project.credits?.map((credit, i) => (
                        <p key={i} className="text-[9px] md:text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
                          <span className="text-white font-bold mr-2">{credit.label}:</span>
                          {credit.value}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              // Inactive State Content - FULL COLOUR, NO GREYOUT
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10">
                <span 
                  className="block whitespace-nowrap text-[10px] md:text-xs font-black tracking-[0.3em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase z-10"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {project.title}
                </span>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
