import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 md:px-12">
      
      <div className="flex w-full justify-between items-center flex-col xl:flex-row gap-2 mt-2 mb-6 text-[10px] sm:text-xs text-[#8c8c8c] font-medium tracking-[0.2em] uppercase text-center">
        <span>FOR BOOKINGS, COLLABORATIONS, AND GENERAL INQUIRIES.</span>
        <span>SEND A MESSAGE VIA THE CONTACT FORM OR EMAIL DIRECTLY: <span className="font-semibold text-[#666]">YWICKHAMEDWARDS@GMAIL.COM</span></span>
      </div>

      <div className="relative w-full aspect-video bg-black overflow-hidden mb-16 rounded-sm">
        <VideoPlayer url="https://www.youtube.com/watch?v=w0BXesobuSE" />
      </div>
    </div>
  )
}
