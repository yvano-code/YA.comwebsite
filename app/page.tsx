import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6">
      <div className="relative w-full aspect-video bg-muted overflow-hidden mt-4 mb-16">
        <iframe
          src="https://www.youtube.com/embed/ci6YxSjBAto?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=ci6YxSjBAto&playsinline=1"
          className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  )
}
