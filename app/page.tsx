import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 md:px-12">
      <div className="relative w-full aspect-video bg-black overflow-hidden mt-8 mb-16 rounded-sm">
        <iframe
          src="https://www.youtube.com/embed/ci6YxSjBAto?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=ci6YxSjBAto&playsinline=1&modestbranding=1"
          className="absolute inset-0 w-full h-full pointer-events-none"
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  )
}
