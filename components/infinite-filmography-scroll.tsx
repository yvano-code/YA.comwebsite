"use client"

import { useState, useRef, useEffect } from "react"
import { siteConfig } from "@/lib/site-config"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function InfiniteFilmographyScroll() {
  const [isPaused, setIsPaused] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // We duplicate the array multiple times to ensure the marquee has enough content to loop seamlessly on ultra-wide screens
  const items = siteConfig.imdbCredits;
  const loopItems = [...items, ...items, ...items]; 

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsPaused(true);
  }

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 2800); // ~2.5 - 3 second delay before resuming
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  return (
    <div 
      className="relative w-full overflow-hidden flex items-center py-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={cn(
          "flex w-max animate-marquee",
          isPaused ? "duration-[40s]" : "duration-[40s]" // Tailwind just controls standard classes, we use style for state
        )}
        style={{ 
          animationPlayState: isPaused ? 'paused' : 'running', 
          animationDuration: '60s' // Adjust this for speed of scroll (higher = slower)
        }}
      >
        {loopItems.map((credit, idx) => (
          <div 
            key={`${credit.title}-${idx}`} 
            className="w-[280px] h-[340px] md:w-[340px] md:h-[400px] lg:w-[380px] lg:h-[440px] flex-shrink-0 mx-2 md:mx-3 group relative overflow-hidden bg-black rounded-3xl"
          >
            {credit.image && (
              <Image 
                src={credit.image} 
                alt={credit.title} 
                fill 
                sizes="(max-width: 768px) 280px, (max-width: 1200px) 340px, 380px"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                style={{ 
                  objectPosition: credit.imagePosition || 'center',
                  transform: !credit.imageScale ? 'scale(1.0)' : `scale(${credit.imageScale})`
                }}
              />
            )}
            
            {/* Top Info */}
            <div className="absolute top-0 w-full flex justify-between items-start p-6 md:p-8 z-10">
              <span className="text-[10px] md:text-[11px] text-white tracking-[0.3em] font-medium mt-1">
                {credit.year}
              </span>
              <span className="text-[9px] md:text-[10px] text-white tracking-[0.2em] font-medium uppercase border border-white/30 rounded-full px-3 py-1">
                {credit.type}
              </span>
            </div>

            {/* Bottom Info Gradient & Text */}
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 z-10">
              <h3 className="text-2xl md:text-3xl font-sans font-black text-white tracking-tight mb-1 uppercase leading-none">
                {credit.title}
              </h3>
              <p className="text-[9px] md:text-[10px] tracking-[0.15em] font-bold uppercase text-white/80">
                {credit.roles.join(" & ")}
              </p>
              
              {('note' in credit) && (
                <div className="mt-3 text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-white/60">
                  {(credit as any).note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
