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
      <div className="mt-auto px-6 lg:px-24 w-full flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 lg:gap-40 pb-16">
        {/* Left Column - Work */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[14px] uppercase tracking-[0.15em] font-medium text-white/90">Work</span>
          <div className="mt-[-10px] mb-4">
            <span 
              className="block text-[100px] md:text-[140px] lg:text-[160px] font-bold uppercase tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', transform: 'scaleY(1.3)' }}
            >
              Inquiries
            </span>
          </div>
          <a href={`mailto:${contact.email}`} className="text-[14px] md:text-[16px] tracking-wide mt-2 hover:text-[#e60000] transition-colors text-white/90">
            {contact.email}
          </a>
        </div>

        {/* Right Column - Socials */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[14px] uppercase tracking-[0.15em] font-medium text-white/90">Social</span>
          <div className="mt-[-10px] mb-4">
            <span 
              className="block text-[100px] md:text-[140px] lg:text-[160px] font-bold uppercase tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', transform: 'scaleY(1.3)' }}
            >
              Links
            </span>
          </div>
          <div className="flex gap-4 mt-2">
            {[
              { id: 'tiktok', label: 'TK', url: siteConfig.social.tiktok },
              { id: 'instagram', label: 'IG', url: siteConfig.social.instagram }
            ].map((social) => {
              if (!social.url) return null;
              return (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border-[1.5px] border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors text-[14px] font-medium tracking-wider"
                >
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
