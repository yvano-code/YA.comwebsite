"use client"

import { MonitorPlay, Trophy, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

export function MobileBottomNav() {
  const pathname = usePathname()
  
  // Determine active tab based on route
  let activeTab = "clips"
  if (pathname === "/") activeTab = "clips" // reels page is now at /
  else if (pathname === "/intro") activeTab = "home"
  else if (pathname === "/awards") activeTab = "awards"
  else if (pathname === "/my-ya") activeTab = "my-ya"

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-[100] flex justify-center pointer-events-none">
      <motion.div
        drag
        dragMomentum={false}
        className="pointer-events-auto cursor-grab active:cursor-grabbing"
        whileDrag={{ scale: 1.05 }}
      >
        {/* Liquid Glass Pill Background */}
        <div className="flex items-center justify-center gap-1 p-1 px-2 bg-black/40 backdrop-blur-[40px] border border-white/20 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)] saturate-[1.2]">

        {/* Intro / Animations (Home) */}
        <Link 
          href="/intro"
          className="flex items-center justify-center w-[38px] h-[38px] transition-all duration-300 rounded-full hover:bg-white/10"
        >
          <Home className="w-[20px] h-[20px] text-white" fill={activeTab === "home" ? "currentColor" : "none"} strokeWidth={activeTab === "home" ? 2 : 2.5} />
        </Link>

        {/* YA Originals (Now at /) */}
        <Link 
          href="/"
          className="flex items-center justify-center w-[38px] h-[38px] transition-all duration-300 rounded-full hover:bg-white/10"
        >
          {/* Custom SVG for Instagram Reels style Play icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill={activeTab === "clips" ? "white" : "none"} stroke="currentColor" strokeWidth={activeTab === "clips" ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
            <polygon points="10 8 16 12 10 16 10 8" fill={activeTab === "clips" ? "black" : "none"} stroke={activeTab === "clips" ? "none" : "currentColor"}></polygon>
          </svg>
        </Link>

        {/* Awards */}
        <Link 
          href="/awards"
          className="flex items-center justify-center w-[38px] h-[38px] transition-all duration-300 rounded-full hover:bg-white/10"
        >
          <Trophy className="w-[20px] h-[20px] text-white" fill={activeTab === "awards" ? "currentColor" : "none"} strokeWidth={activeTab === "awards" ? 2 : 2.5} />
        </Link>

        {/* Profile / About YA */}
        <Link 
          href="/my-ya"
          className="flex items-center justify-center w-[38px] h-[38px] transition-all duration-300 rounded-full hover:bg-white/10"
        >
          <div className={`w-[20px] h-[20px] rounded-full overflow-hidden border-2 transition-colors ${activeTab === "my-ya" ? "border-white" : "border-transparent"}`}>
            <img src="/projects/10157E32-F553-4DD4-B336-1D1414F25305.JPG" alt="Profile" className="w-full h-full object-cover pointer-events-none" />
          </div>
        </Link>

        </div>
      </motion.div>
    </div>
  )
}
