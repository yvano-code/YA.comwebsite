"use client"

export function VideoPlayer({ url }: { url: string }) {
  // We extract the video ID from the URL to build the embed URL
  const videoId = url.split('v=')[1] || 'w0BXesobuSE'

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${videoId}`}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; encrypted-media"
      />
    </div>
  )
}
