import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 md:px-12">
      
      <div className="w-full text-center mt-2 mb-6 text-[8px] sm:text-[10px] text-[#8c8c8c] font-medium tracking-[0.2em] uppercase">
        FOR BOOKINGS, COLLABORATIONS AND GENERAL INQUIRIES PLEASE EMAIL <span className="font-semibold text-[#666] uppercase">YVANOANTONIO@PROTONMAIL.COM</span>
      </div>

      <div className="relative w-full aspect-video bg-black overflow-hidden mb-16 rounded-sm">
        <VideoPlayer url="https://www.youtube.com/watch?v=w0BXesobuSE" />
      </div>
    </div>
  )
}
