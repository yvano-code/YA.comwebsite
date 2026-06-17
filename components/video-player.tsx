"use client"

import dynamic from 'next/dynamic'

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export function VideoPlayer({ url }: { url: string }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <ReactPlayer
        url={url}
        playing={true}
        loop={true}
        muted={true}
        controls={false}
        width="100%"
        height="100%"
        playsinline={true}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              modestbranding: 1,
              rel: 0,
              disablekb: 1,
              iv_load_policy: 3
            }
          }
        }}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}
