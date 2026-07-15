"use client"
import { useState, useEffect } from "react"
import { TestarossaSlider } from "@/components/testarossa-slider"
import { siteConfig } from "@/lib/site-config"
import { MobileReelsFeed } from "@/components/mobile-reels-feed"

export default function TestarossaPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <main className="w-full h-[100dvh] overflow-hidden bg-black relative flex flex-col">
      {/* === DESKTOP VIEW === */}
      <div className={`w-full h-full relative ${isMobile === null ? 'hidden md:block' : isMobile ? 'hidden' : 'block'}`}>
        {(isMobile === null || !isMobile) && <TestarossaSlider items={siteConfig.projects} />}
      </div>

      {/* === MOBILE VIEW === */}
      <div className={`w-full h-full relative overflow-hidden bg-black text-white ${isMobile === null ? 'block md:hidden' : isMobile ? 'block' : 'hidden'}`}>
        {(isMobile === null || isMobile) && <MobileReelsFeed />}
      </div>
    </main>
  )
}
