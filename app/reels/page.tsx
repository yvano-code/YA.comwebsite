"use client"

import { AccordionCarousel } from "@/components/accordion-carousel"
import { AwardsSection } from "@/components/awards-section"
import { siteConfig } from "@/lib/site-config"
import { TumblerLogo } from "@/components/animated-logo"
import { DesktopReelsShowcase } from "@/components/desktop-reels-showcase"
import { useState } from "react"
import { initSensory } from "@/lib/sensory"

export default function ReelsPage() {
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [playState, setPlayState] = useState<0 | 1 | 2>(0)

  const handleTap = () => {
    initSensory()
    if (playState === 0) {
      setPlayState(1)
    } else if (playState === 1) {
      setPlayState(2)
    } else if (playState === 2) {
      setPlayState(1)
    }
  }

  const handleAnimationComplete = () => {
    setPlayState(2)
  }

  const isHovered = playState === 1 || isLogoHovered

  return (
    <>
      {/* === DESKTOP VIEW === */}
      <div className="hidden lg:block">
        <DesktopReelsShowcase />
        
        {/* Filmography & Awards below the showcase for desktop */}
        <div className="bg-black text-white pt-8 pb-32">
          <AwardsSection />
          
          <div 
            className="w-full flex items-center justify-center mt-12 mb-16 text-[1.83vw] cursor-pointer"
            onPointerDown={handleTap}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <TumblerLogo 
              isHovered={isHovered} 
              onAnimationComplete={handleAnimationComplete}
              muteSound={true}
            />
          </div>
        </div>
      </div>

      {/* === MOBILE VIEW === */}
      <div className="block lg:hidden w-full relative min-h-screen overflow-x-hidden bg-transparent flex flex-col pt-24 pb-32">
        <div className="flex flex-col px-6 md:px-12 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">FILM & TELEVISION</h1>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black/50 mt-2">
            MUSIC VIDEO | COMMERCIAL | LIVE BROADCAST
          </p>
        </div>

        {/* The colorful, clickable scrolling reels we had before */}
        <AccordionCarousel projects={siteConfig.projects} />
        
        {/* Spacer to allow full scroll view of showcase before moving to awards */}
        <div style={{ height: "7vh", flexShrink: 0 }} />

        {/* Filmography & Awards below the showcase */}
        <AwardsSection />

        {/* YA toy tumblr animation at the bottom, nicely sized */}
        <div 
          className="w-full flex items-center justify-center mt-12 mb-16 text-[4.88vw] sm:text-[3.66vw] cursor-pointer"
          onPointerDown={handleTap}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <TumblerLogo 
            isHovered={isHovered} 
            onAnimationComplete={handleAnimationComplete}
            muteSound={true}
          />
        </div>
      </div>
    </>
  )
}
