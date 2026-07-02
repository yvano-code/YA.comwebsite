"use client"

import { useRef, useState, useEffect } from "react"
import { AnimatedLogo, TumblerLogo } from "@/components/animated-logo"
import { MobileAnimatedLogo } from "@/components/mobile-animated-logo"
import { MobileHomeNetflix } from "@/components/mobile-home-netflix"
import { AccordionCarousel } from "@/components/accordion-carousel"
import { MobileVideoPlayer } from "@/components/mobile-video-player"
import { FilmCarousel } from "@/components/film-carousel"
import { siteConfig } from "@/lib/site-config"
import { initSensory } from "@/lib/sensory"
import Image from "next/image"
import Link from "next/link"

export default function HomePage3() {
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

  return (
    <div className="w-full relative overflow-x-hidden h-[100dvh] lg:h-auto">
      {/* ── HERO SECTION (Normal Document Flow) ── */}
      {/* [overflow:clip] clips rocket animation at viewport edge without creating a scroll container */}
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
               <div className="text-[7.5px] lg:text-[13.5px] font-medium tracking-[0.2em] lg:tracking-[0.25em] uppercase text-white/50 flex flex-row flex-nowrap items-center justify-center gap-2 lg:gap-8 w-full max-w-full text-center whitespace-nowrap overflow-visible">
                  <span className="transition-colors">FILM & TELEVISION</span>
                  <span className="text-white/20 font-light">|</span>
                  <span className="transition-colors">MUSIC VIDEO</span>
                  <span className="text-white/20 font-light">|</span>
                  <span className="transition-colors">COMMERCIAL</span>
                  <span className="text-white/20 font-light">|</span>
                  <span className="transition-colors">LIVE BROADCAST</span>
               </div>
         </nav>
      </header>

      {/* ── DYNAMIC CONTENT SECTIONS ── */}
      <div className="hidden lg:block relative z-10 w-full pb-24">

            {/* Global Style for hiding scrollbar */}
            <style dangerouslySetInnerHTML={{__html: `
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}} />
      </div>
    </div>
  )
}
