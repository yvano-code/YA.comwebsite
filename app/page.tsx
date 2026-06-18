import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 md:px-12">
      
      <div className="relative w-full aspect-video bg-black overflow-hidden mb-16 rounded-sm">
        <VideoPlayer url="https://www.youtube.com/watch?v=w0BXesobuSE" />
      </div>
    </div>
  )
}
