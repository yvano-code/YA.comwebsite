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

      {/* Contact Line */}
      <div className="mt-auto px-6 lg:px-24 text-center opacity-80">
        <p className="text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.1em] font-extrabold text-black leading-relaxed">
          For bookings, collaborations and general inquiries please email <br className="lg:hidden" />
          <a href={`mailto:${contact.email}`} className="text-black hover:text-[#e60000] transition-colors underline decoration-2 underline-offset-4 decoration-black/40 hover:decoration-[#e60000] lg:ml-2">{contact.email}</a>
        </p>
      </div>
    </div>
  )
}
