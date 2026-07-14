"use client"

import Image from "next/image"

export function NavPill({ className }: { className?: string }) {
  return (
    <div className={`z-[10000] flex items-center justify-between w-[240px] h-[80px] bg-[#e5e5e5] rounded-[40px] px-8 shadow-sm ${className || "fixed bottom-12 left-1/2 -translate-x-1/2"}`}>
      {/* Play Button */}
      <button className="flex items-center justify-center w-12 h-12 bg-white rounded-[14px] hover:scale-105 transition-transform active:scale-95 shadow-sm">
        <svg viewBox="0 0 24 24" fill="black" className="w-5 h-5 ml-1">
          <path d="M5 3l14 9-14 9V3z" />
        </svg>
      </button>
      
      {/* Profile/Avatar */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-sm">
        <Image
          src="/placeholder.jpg" 
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
