"use client"

import Image from "next/image"
import { siteConfig } from "@/lib/site-config"
import { GoodYuteLogo } from "@/components/animated-logo"
import { useState } from "react"
import { initSensory } from "@/lib/sensory"

export function ProfileView() {
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

  const { contact } = siteConfig
  const isHovered = playState === 1 || isLogoHovered

  const scrollingPhotos = [
    "/projects/IMG_0270.jpeg",
    "/projects/PRO_8342.jpg",
    "/projects/PRO_8782.jpg",
    "/projects/PRO_8926.jpg",
    "/projects/PRO_9325-Edit 2.jpg"
  ]

  return (
    <div className="w-full relative z-10 flex flex-col min-h-[100dvh] bg-black text-white pt-32 pb-32">
      {/* Bio Text */}
      <div className="px-6 lg:px-24 mb-16 lg:mb-24 text-center">
        <p className="text-sm sm:text-base lg:text-xl leading-[1.8] lg:leading-[2] text-white/70 font-medium max-w-4xl mx-auto">
          {siteConfig.imdbBio}
        </p>
      </div>

      {/* Good Yute Logo Title (Interactive) */}
      <div 
        className="w-full flex items-center justify-center text-[5.5vw] sm:text-[4vw] lg:text-[2vw] cursor-pointer mb-8 -mt-[8vh]"
        onPointerDown={handleTap}
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <GoodYuteLogo 
          isHovered={isHovered} 
          onAnimationComplete={handleAnimationComplete}
        />
      </div>

      {/* Contact Section */}
      <div className="mt-auto px-6 lg:px-24 w-full flex flex-col md:flex-row justify-center items-center gap-20 md:gap-40 lg:gap-64 pb-8">
        {/* Left Column */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-4">Work</span>
          <div className="overflow-visible py-2 mb-8 md:mb-12">
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter transform scale-y-[2.5] origin-top">Inquiries</span>
          </div>
          <a href={`mailto:${contact.email}`} className="text-xs md:text-sm tracking-wider mt-2 hover:text-[#e60000] transition-colors">
            {contact.email}
          </a>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-4">Social</span>
          <div className="overflow-visible py-2 mb-8 md:mb-12">
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter transform scale-y-[2.5] origin-top">Links</span>
          </div>
          <div className="flex gap-4 mt-2">
            {Object.entries(siteConfig.social).map(([platform, url]) => {
              if (!url || platform === 'email') return null;
              
              let label = platform.substring(0, 2).toUpperCase();
              if (platform === 'instagram') label = 'IG';
              if (platform === 'tiktok') label = 'TK';
              if (platform === 'youtube') label = 'YT';
              if (platform === 'linkedin') label = 'LI';
              if (platform === 'vimeo') label = 'VM';
              if (platform === 'facebook') label = 'FB';
              
              return (
                <a 
                  key={platform}
                  href={url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors text-xs font-medium tracking-wider"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
