"use client"
import React, { useRef, useEffect, useState, useCallback } from "react"
import { siteConfig } from "@/lib/site-config"

export function AutoScrollingFilmography() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const isHoveredRef = useRef(false)
  const isTouchingRef = useRef(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const speed = 0.8 // pixels per frame

  const credits = [...siteConfig.imdbCredits].reverse()
  // Quadruple for safety during fast scrolling
  const duplicatedCredits = [...credits, ...credits, ...credits, ...credits]

  useEffect(() => {
    let animationFrameId: number
    let lastTime = performance.now()
    
    const scrollLoop = (time: number) => {
      const container = containerRef.current
      if (!container) return
      
      const deltaTime = time - lastTime
      lastTime = time

      if (isAutoScrolling && !isHoveredRef.current && !isTouchingRef.current) {
        // Normalize speed to 60fps frame rate (approx 16.6ms)
        const frameSpeed = speed * (deltaTime / 16.66)
        container.scrollLeft += frameSpeed

        // Seamless loop logic
        const singleSetWidth = container.scrollWidth / 4
        // If we scrolled past the middle (2 sets), jump back 1 set
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth
        }
      }

      animationFrameId = requestAnimationFrame(scrollLoop)
    }

    // Set initial position to the second set to allow scrolling backwards immediately
    if (containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
           const singleSetWidth = containerRef.current.scrollWidth / 4
           if (containerRef.current.scrollLeft === 0) {
             containerRef.current.scrollLeft = singleSetWidth
           }
        }
      }, 100)
    }

    animationFrameId = requestAnimationFrame(scrollLoop)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isAutoScrolling, speed])

  const handleUserInteraction = useCallback(() => {
    setIsAutoScrolling(false)

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true)
    }, 2500)
    
    const container = containerRef.current
    if (container) {
       const singleSetWidth = container.scrollWidth / 4
       if (container.scrollLeft >= singleSetWidth * 3) {
          container.scrollLeft -= singleSetWidth
       }
       else if (container.scrollLeft <= singleSetWidth * 0.5) {
          container.scrollLeft += singleSetWidth
       }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      onScroll={handleUserInteraction}
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => { 
        isHoveredRef.current = false
        handleUserInteraction() // Reset timeout when mouse leaves
      }}
      onTouchStart={() => { isTouchingRef.current = true }}
      onTouchEnd={() => { 
        isTouchingRef.current = false
        handleUserInteraction()
      }}
      className="flex overflow-x-auto gap-4 md:gap-6 px-6 lg:px-12 xl:px-16 pb-12 hide-scrollbar"
      style={{ scrollBehavior: 'auto' }}
    >
      {duplicatedCredits.map((credit, idx) => (
        <div 
          key={idx} 
          className="flex-none w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] max-w-[400px] group relative bg-zinc-900 transition-all duration-200 rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col justify-between min-h-[50vh] md:min-h-[60vh] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] cursor-pointer border border-black/10"
        >
          {/* Image Background */}
          {credit.image && (
            <>
              <div 
                className="absolute inset-0 w-full h-full z-0 overflow-hidden" 
                style={
                  // @ts-ignore
                  credit.imageScale ? { transform: `scale(${credit.imageScale})` } : undefined
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={credit.image}
                  alt={credit.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 origin-center opacity-80 group-hover:opacity-100"
                />
              </div>
              {/* Gradients */}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent" />
              </div>
            </>
          )}

          {/* Top: Year and Type Pill */}
          <div className="relative z-10 flex justify-between items-start w-full">
            <span className="text-[14px] md:text-[16px] font-bold tracking-[0.3em] text-white/90 drop-shadow-md">
              {credit.year.split('').join(' ')}
            </span>
            <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-white uppercase px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              {credit.type}
            </span>
          </div>

          {/* Bottom: Title and Roles */}
          <div className="relative z-10 mt-auto pt-8">
            {('note' in credit) && (
              <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-white/80 uppercase mb-2 drop-shadow-md">{(credit as any).note}</p>
            )}
            <h4 className="text-[22px] md:text-[26px] font-black uppercase tracking-tight mb-4 text-white leading-tight drop-shadow-lg">{credit.title}</h4>
            <div className="pt-4 border-t border-white/20">
              <p className="text-[12px] md:text-[13px] font-extrabold text-white/90 uppercase tracking-wide">
                 {credit.roles.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
