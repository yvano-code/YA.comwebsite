"use client"

import { Home } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function DesktopBottomNav() {
  const pathname = usePathname()
  
  // Determine active tab based on route
  let activeTab = "home"
  if (pathname === "/reels" || pathname === "/clips") activeTab = "clips"
  else if (pathname === "/my-ya") activeTab = "my-ya"

  return (
    <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
      {/* Liquid Glass Pill Background (Instagram style) */}
      <div className="flex items-center justify-center gap-2 p-2 bg-[#121212]/70 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:bg-[#1a1a1a]/80">
        
        {/* Home */}
        <Link 
          href="/"
          className="flex items-center justify-center w-[72px] h-[48px] transition-all duration-300 rounded-full hover:bg-white/10"
        >
          <Home className="w-6 h-6 text-white" fill={activeTab === "home" ? "currentColor" : "none"} strokeWidth={activeTab === "home" ? 2 : 2.5} />
        </Link>

        {/* YA Originals (Reels) */}
        <Link 
          href="/reels"
          className="flex items-center justify-center w-[72px] h-[48px] transition-all duration-300 rounded-full hover:bg-white/10"
        >
          {/* Custom SVG for Instagram Reels style Play icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill={activeTab === "clips" ? "white" : "none"} stroke="currentColor" strokeWidth={activeTab === "clips" ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
            <polygon points="10 8 16 12 10 16 10 8" fill={activeTab === "clips" ? "black" : "none"} stroke={activeTab === "clips" ? "none" : "currentColor"}></polygon>
          </svg>
        </Link>

        {/* Profile / About YA */}
        <Link 
          href="/my-ya"
          className="flex items-center justify-center w-[72px] h-[48px] transition-all duration-300 rounded-full hover:bg-white/10"
        >
          <div className={`w-[28px] h-[28px] rounded-full overflow-hidden border-2 transition-colors ${activeTab === "my-ya" ? "border-white" : "border-transparent"}`}>
            <img src="/projects/10157E32-F553-4DD4-B336-1D1414F25305.JPG" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </Link>

      </div>
    </div>
  )
}
