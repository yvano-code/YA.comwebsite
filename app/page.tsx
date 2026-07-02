"use client"

import { AccordionCarousel } from "@/components/accordion-carousel"
import { AwardsSection } from "@/components/awards-section"
import { siteConfig } from "@/lib/site-config"
import { AnimatedLogo, TumblerLogo } from "@/components/animated-logo"
import { MobileAnimatedLogo } from "@/components/mobile-animated-logo"
import { DesktopReelsShowcase } from "@/components/desktop-reels-showcase"
import { MobileReelsFeed } from "@/components/mobile-reels-feed"
import { useState, useEffect } from "react"
import { initSensory } from "@/lib/sensory"

export default function HomePage() {
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [playState, setPlayState] = useState<0 | 1 | 2>(0)

  // Global Audio Context Unlocker for Mobile/iOS
  useEffect(() => {
    const unlockAudio = () => {
      initSensory();
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('touchstart', unlockAudio, { once: true });
    document.addEventListener('click', unlockAudio, { once: true });
    return () => {
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
    };
  }, []);

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
          
        </div>
      </div>

      {/* === MOBILE VIEW === */}
      <div className="block lg:hidden w-full h-[100dvh] relative overflow-hidden bg-black text-white">
        <MobileReelsFeed />

      </div>
    </>
  )
}
