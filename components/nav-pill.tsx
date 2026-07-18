"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface VerticalNavPillProps {
  className?: string;
  avatarSrc?: string;
  onWatchMore?: () => void;
}

export function VerticalNavPill({ className, avatarSrc, onWatchMore }: VerticalNavPillProps) {
  const pathname = usePathname()
  
  let activeTab = "clips"
  if (pathname === "/") activeTab = "clips"
  else if (pathname === "/about") activeTab = "my-ya"

  return (
    <div className={`z-[50] flex flex-col items-center justify-center gap-5 w-[60px] py-6 bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-lg ${className || "fixed right-4 bottom-28"}`}>
      
      {/* Portfolio / Profile Button */}
      <Link href="/about" className="flex flex-col items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
        <div className={`relative w-[44px] h-[44px] rounded-full overflow-hidden shadow-sm border-[2px] transition-colors ${activeTab === "my-ya" ? "border-white" : "border-white/40 hover:border-white/80"}`}>
          <Image
            src="/projects/10157E32-F553-4DD4-B336-1D1414F25305.JPG" 
            alt="Portfolio"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Reels / Home Button */}
      <Link href="/" className="flex items-center justify-center w-[44px] h-[44px] bg-transparent rounded-full hover:bg-white/10 transition-colors active:scale-95 shadow-sm mt-1">
        <svg width="26" height="26" viewBox="0 0 24 24" fill={activeTab === "clips" ? "white" : "none"} stroke="white" strokeWidth={activeTab === "clips" ? "0" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
          <polygon points="10 8 16 12 10 16 10 8" fill={activeTab === "clips" ? "black" : "none"} stroke={activeTab === "clips" ? "none" : "white"}></polygon>
        </svg>
      </Link>

      {/* Watch More Button */}
      {onWatchMore && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onWatchMore(); }}
          onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onWatchMore(); }}
          className="flex flex-col items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer mt-1 group"
        >
          <div className="w-[42px] h-[42px] rounded-full bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center shadow-md border border-white/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="text-white font-bold text-[9px] uppercase tracking-wider drop-shadow-md">More</span>
        </button>
      )}
    </div>
  )
}
