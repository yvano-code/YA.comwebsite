"use client"

import { AccordionCarousel } from "@/components/accordion-carousel"
import { AwardsSection } from "@/components/awards-section"
import { siteConfig } from "@/lib/site-config"
import { AnimatedLogo, TumblerLogo } from "@/components/animated-logo"
import { MobileAnimatedLogo } from "@/components/mobile-animated-logo"
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
      {/* ── HERO BANNER (From Homepage) ── */}
      <header className="relative w-full h-[100dvh] lg:min-h-[100vh] flex flex-col items-center justify-center z-0 [overflow:clip]">
        {/* Desktop Logo */}
        <div className="hidden lg:flex items-center justify-center w-full flex-grow relative z-20">
          <AnimatedLogo />
        </div>

        {/* Mobile Logo */}
        <div className="flex lg:hidden absolute inset-0 w-full h-full items-center justify-center z-[100] text-[6.5vh] leading-none font-black tracking-tighter">
          <MobileAnimatedLogo />
        </div>

         {/* Permanent Content Nav (Links to Clips) - Desktop Only */}
         <nav className="hidden lg:flex absolute bottom-[10dvh] lg:bottom-[27vh] w-full items-center justify-center px-2 lg:px-12 pb-4 text-sm font-semibold z-50 pointer-events-none">
               <div className="text-[7.5px] lg:text-[13.5px] font-medium tracking-[0.2em] lg:tracking-[0.25em] uppercase text-black/50 flex flex-row flex-nowrap items-center justify-center gap-2 lg:gap-8 w-full max-w-full text-center whitespace-nowrap overflow-visible">
                  <span className="transition-colors">FILM & TELEVISION</span>
                  <span className="text-black/20 font-light">|</span>
                  <span className="transition-colors">MUSIC VIDEO</span>
                  <span className="text-black/20 font-light">|</span>
                  <span className="transition-colors">COMMERCIAL</span>
                  <span className="text-black/20 font-light">|</span>
                  <span className="transition-colors">LIVE BROADCAST</span>
               </div>
         </nav>
      </header>

      {/* === DESKTOP VIEW === */}
      <div className="hidden lg:block pt-16">
        <div className="px-12 mb-16">
          <h3 className="text-[81px] font-black tracking-tighter uppercase leading-[0.85] ml-[-0.035em]">
            <span className="text-black">SELECTED</span>
            <span className="text-black/30 ml-8">WORKS</span>
          </h3>
        </div>
        
        <DesktopReelsShowcase />
        
        {/* Filmography & Awards below the showcase for desktop */}
        <div className="bg-transparent text-black pt-8 pb-32">
          <AwardsSection />
          
          <div 
            className="w-full flex items-center justify-center mt-12 mb-16 text-[12px] md:text-[16px] lg:text-[24px] cursor-pointer relative z-20"
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
        <div className="flex flex-col px-6 md:px-12 mb-8 md:mb-12 text-black">
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

        <div 
          className="w-full flex items-center justify-center mt-8 mb-16 text-[16px] cursor-pointer relative z-20"
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
