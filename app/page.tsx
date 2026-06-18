import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 md:px-12">
      
      <div className="flex justify-center w-full mt-2 mb-8">
        <div className="flex flex-col items-start gap-1 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase">
          <span className="bg-[#B5FFED] px-2 py-1.5 text-gray-600 leading-none">
            FOR BOOKINGS, COLLABORATIONS, AND GENERAL INQUIRIES.
          </span>
          <span className="bg-[#B5FFED] px-2 py-1.5 text-gray-600 leading-none">
            SEND A MESSAGE VIA THE CONTACT FORM OR EMAIL DIRECTLY:
          </span>
          <span className="bg-[#B5FFED] px-2 py-1.5 text-black font-bold leading-none">
            YWICKHAMEDWARDS@GMAIL.COM
          </span>
        </div>
      </div>

      <div className="relative w-full aspect-video bg-black overflow-hidden mb-16 rounded-sm">
        <VideoPlayer url="https://www.youtube.com/watch?v=w0BXesobuSE" />
      </div>
    </div>
  )
}
