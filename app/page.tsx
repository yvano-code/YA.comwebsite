import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 md:px-12">
      {/* 
        Using a cinematic 21:9 container to crop the top and bottom.
        This perfectly hides the baked-in black bars and the YouTube title/source info,
        while maintaining the full horizontal width of the video.
      */}
      <div className="relative w-full aspect-[21/9] bg-black overflow-hidden mt-8 mb-16 rounded-sm">
        <iframe
          src="https://www.youtube.com/embed/ci6YxSjBAto?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=ci6YxSjBAto&playsinline=1&modestbranding=1"
          className="absolute top-1/2 left-1/2 w-full aspect-video -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  )
}
