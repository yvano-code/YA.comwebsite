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
    <div className="w-full relative z-10 flex flex-col min-h-[100dvh] bg-transparent text-black pt-24 pb-32">
      {/* Scrolling Photos */}
      <div className="w-full mb-12 lg:mb-20 overflow-x-auto lg:overflow-x-visible hide-scrollbar snap-x snap-mandatory flex lg:justify-center gap-4 lg:gap-6 px-6 lg:px-0">
        {scrollingPhotos.map((src, i) => (
          <div key={i} className="flex-none w-[75vw] sm:w-[50vw] lg:w-[17vw] xl:w-[16vw] aspect-[4/5] relative snap-center rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] bg-black/5 border border-black/5 transition-transform duration-500 hover:scale-[1.02] lg:hover:-translate-y-2">
            <Image 
              src={src}
              alt={`Photo ${i+1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
        {/* Spacer to allow the last card to center perfectly on mobile */}
        <div className="flex-none w-6 lg:hidden" aria-hidden="true" />
      </div>

      {/* Bio Text */}
      <div className="px-6 lg:px-24 mb-16 lg:mb-24 text-center">
        <p className="text-sm sm:text-base lg:text-xl leading-[1.8] lg:leading-[2] text-black/70 font-medium max-w-4xl mx-auto">
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
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-1">Work</span>
          <div className="overflow-visible py-4">
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter transform scale-y-[2.5] origin-center">Inquiries</span>
          </div>
          <a href={`mailto:${contact.email}`} className="text-xs md:text-sm tracking-wider mt-6 hover:text-[#e60000] transition-colors">
            {contact.email}
          </a>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-1">Social</span>
          <div className="overflow-visible py-4">
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter transform scale-y-[2.5] origin-center">Links</span>
          </div>
          <div className="flex gap-4 mt-6">
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
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#f0f0f5] transition-colors text-xs font-medium tracking-wider"
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
