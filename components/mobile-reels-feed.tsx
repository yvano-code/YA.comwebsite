"use client"

import { useEffect, useRef, useState, useCallback, memo } from "react"
import { FullVideoDrawer } from "@/components/full-video-drawer"
import { siteConfig } from "@/lib/site-config"
import { TumblerLogo } from "@/components/animated-logo"

const familyToProjectId: Record<string, string> = {
  "BLACK": "black",
  "BBB": "bbb",
  "CHJ": "chj",
  "HONESTLY": "fafiella",
  "SOLITAR": "solitar",
  "MOONGAZER": "moongazer",
  "PRACTICALLY_MAGIC": "practically-magic"
}

const VIDEOS = [
  {
    src: "/projects/YA_originals_videos/BLACK_YA/no_excuse_promo.mp4",
    username: "Being Black In Toronto | Documentary \nCanadian Screen Award Winner",
    avatar: "/projects/black-bleed.png",
    description: "NO EXCUSE! #BLACK Promo Trailer",
    hashtags: "#noexcuse #blackpromo #trailer",
    likes: "12.4K",
    comments: "342",
    audio: "Original Audio - #black",
    family: "BLACK"
  },
  {
    src: "/projects/YA_originals_videos/BBB_YA/BBB_PILOT_TRAILER_Vert.mp4",
    username: "Baked Butter Biscuits | Limited Series Pilot",
    avatar: "/projects/bbb/Still_2025-09-09_1.29.1.jpg",
    description: "Baked Butter Boys - Official Pilot Trailer",
    hashtags: "#bakedbutterboys #pilot #trailer",
    likes: "15.2K",
    comments: "411",
    audio: "Original Audio - bakedbutter",
    family: "BBB"
  },
  {
    src: "/projects/YA_originals_videos/BBB_YA/Meet_The_Cast_Jada.mp4",
    username: "Baked Butter Biscuits | Limited Series Pilot",
    avatar: "/projects/bbb/Still_2025-09-09_1.29.1.jpg",
    description: "Meet The Cast - Jada from Baked Butter Boys",
    hashtags: "#meetthecast #bakedbutterboys #behindthescenes",
    likes: "9.1K",
    comments: "188",
    audio: "Original Audio - bakedbutter",
    family: "BBB"
  },
  {
    src: "/projects/YA_originals_videos/BBB_YA/meet_the_cast.mp4",
    username: "Baked Butter Biscuits | Limited Series Pilot",
    avatar: "/projects/bbb/Still_2025-09-09_1.29.1.jpg",
    description: "Meet The Cast - Evo from Baked Butter Boys",
    hashtags: "#meetthecast #bakedbutterboys #behindthescenes",
    likes: "8.9K",
    comments: "156",
    audio: "Original Audio - bakedbutter",
    family: "BBB"
  },
  {
    src: "/projects/YA_originals_videos/BBB_YA/BBB_Breathalyzer_TikTok.mp4",
    username: "Baked Butter Biscuits | Limited Series Pilot",
    avatar: "/projects/bbb/Still_2025-09-09_1.29.1.jpg",
    description: "The Breathalyzer Test 😂 - Baked Butter Boys",
    hashtags: "#bakedbutterboys #comedy #sketch",
    likes: "24.5K",
    comments: "892",
    audio: "Original Audio - bakedbutter",
    family: "BBB"
  },
  {
    src: "/projects/YA_originals_videos/BBB_YA/BBB_TableSmash_TikTok.mp4",
    username: "Baked Butter Biscuits | Limited Series Pilot",
    avatar: "/projects/bbb/Still_2025-09-09_1.29.1.jpg",
    description: "Table Smash Scene - Baked Butter Boys",
    hashtags: "#bakedbutterboys #tablesmash #behindthescenes",
    likes: "18.3K",
    comments: "522",
    audio: "Original Audio - bakedbutter",
    family: "BBB"
  },
  {
    src: "/projects/YA_originals_videos/CHJ_YA/E02_Social_5.mp4",
    username: "Clubhouse Jamz | Live Broadcast",
    avatar: "/projects/chj/DSC00335.jpg",
    description: "City Hunter J - Episode 2 Clip",
    hashtags: "#cityhunterj #chj #action",
    likes: "11.7K",
    comments: "204",
    audio: "Original Audio - clubhousejamz",
    family: "CHJ"
  },
  {
    src: "/projects/YA_originals_videos/HONESTLY_YA/Honestly_YA_1.mp4",
    username: "Fafiélla - Honestly | Music Video",
    avatar: "/projects/fafiella_image_site.jpg",
    description: "Honestly - Series Premiere Promo",
    hashtags: "#honestly #yaoriginals #drama",
    likes: "14.2K",
    comments: "305",
    audio: "Original Audio - honestly",
    family: "HONESTLY"
  },
  {
    src: "/projects/YA_originals_videos/HONESTLY_YA/Honestly_YA_2.mp4",
    username: "Fafiélla - Honestly | Music Video",
    avatar: "/projects/fafiella_image_site.jpg",
    description: "Honestly - Exclusive Look",
    hashtags: "#honestly #yaoriginals #exclusive",
    likes: "10.8K",
    comments: "189",
    audio: "Original Audio - honestly",
    family: "HONESTLY"
  },
  {
    src: "/projects/YA_originals_videos/SOLITAR_YA/SOLITAR_YA_.mp4",
    username: "Solitair - Fire Blaze | Music Video",
    avatar: "/projects/moongazer-thumbnail.jpg",
    description: "Solitar - Official Promo Trailer",
    hashtags: "#solitar #yaoriginals #sci-fi",
    likes: "21.3K",
    comments: "534",
    audio: "Original Audio - solitar",
    family: "SOLITAR"
  },
  {
    src: "/projects/YA_originals_videos/MOONGAZER_YA/Moongazer_YA.mp4",
    username: "MOONGAZER | Short Thriller",
    avatar: "/projects/moongazer-thumbnail.jpg",
    description: "MoonGazer - Official Trailer",
    hashtags: "#moongazer #thriller #shortfilm",
    likes: "18.5K",
    comments: "412",
    audio: "Original Audio - moongazer",
    family: "MOONGAZER"
  },
  {
    src: "/projects/YA_originals_videos/MOONGAZER_YA/Moongazer_YA_2.mp4",
    username: "MOONGAZER | Short Thriller",
    avatar: "/projects/moongazer-thumbnail.jpg",
    description: "MoonGazer - Exclusive Clip",
    hashtags: "#moongazer #thriller #shortfilm",
    likes: "15.3K",
    comments: "389",
    audio: "Original Audio - moongazer",
    family: "MOONGAZER"
  },
  {
    src: "/projects/YA_originals_videos/PRACTICALLY MAGIC_YA/KMI_XMAS_YA.mp4",
    username: "Practically Magic | Air Pods Spec Commercial",
    avatar: "/projects/practically-magic-thumbnail.jpg",
    description: "Practically Magic - Commercial Spec",
    hashtags: "#practicallymagic #commercial #spec",
    likes: "19.8K",
    comments: "472",
    audio: "Original Audio - practicallymagic",
    family: "PRACTICALLY_MAGIC"
  }
]

const ReelVideo = memo(function ReelVideo({ 
  video, 
  globalMuted, 
  isMounted,
  isActive,
  isNext,
  isDrawerOpen,
  onToggleMute, 
  onOpenDrawer 
}: { 
  video: typeof VIDEOS[0], 
  globalMuted: boolean, 
  isMounted: boolean,
  isActive: boolean,
  isNext: boolean,
  isDrawerOpen: boolean,
  onToggleMute: (e: React.MouseEvent | React.TouchEvent) => void, 
  onOpenDrawer: (v: typeof VIDEOS[0]) => void 
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showMuteIcon, setShowMuteIcon] = useState(false)
  const [showUnmuteIcon, setShowUnmuteIcon] = useState(false)
  const previousMuted = useRef(globalMuted)
  
  const project = siteConfig.projects.find(p => p.colorway?.id === familyToProjectId[video.family])
  const credits = project?.credits?.filter(c => c.label.toLowerCase() !== "video by") || []

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = globalMuted
    }
    
    // Trigger flash animation if the state actually changed while this video is active
    if (isActive && previousMuted.current !== globalMuted) {
      if (globalMuted) {
        setShowMuteIcon(true)
        setTimeout(() => setShowMuteIcon(false), 800)
      } else {
        setShowUnmuteIcon(true)
        setTimeout(() => setShowUnmuteIcon(false), 800)
      }
    }
    previousMuted.current = globalMuted
  }, [globalMuted, isActive])

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !isDrawerOpen) {
        // Use a small timeout to ensure DOM is ready and prevent play() promise interruption
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented
            console.log("Auto-play prevented", error)
          })
        }
      } else {
        videoRef.current.pause()
      }
    }
  }, [isActive, isDrawerOpen])

  const handleToggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // If Safari blocked autoplay (or it was manually paused), force play
        videoRef.current.play().catch(() => {})
        videoRef.current.muted = false
        if (globalMuted) onToggleMute(e)
      } else {
        videoRef.current.muted = !globalMuted
        onToggleMute(e)
      }
    }
  }

  return (
    <div className="relative w-full h-[100dvh] snap-start snap-always bg-black flex-shrink-0 cursor-pointer" onClick={handleToggleMute}>
      {/* Background Poster */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none opacity-50"
        style={{ backgroundImage: `url('${video.src.replace('.mp4', '_poster.jpg')}')` }}
      />
      
      {isMounted && (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.src.replace('.mp4', '_poster.jpg')}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loop
          muted={globalMuted}
          playsInline
          autoPlay={isActive}
          preload={isActive || isNext ? "auto" : "none"}
        />
      )}

      {/* Center Flash Indicators */}
      {showMuteIcon && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none p-4 bg-black/40 backdrop-blur-md rounded-full animate-in fade-in zoom-in duration-200">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </div>
      )}
      
      {showUnmuteIcon && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none p-4 bg-black/40 backdrop-blur-md rounded-full animate-in fade-in zoom-in duration-200">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {/* Gradients for readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Bottom Left Info */}
      <button 
        type="button"
        className="absolute left-6 bottom-24 right-16 pb-[env(safe-area-inset-bottom)] flex flex-col gap-1.5 z-50 scale-[0.92] origin-bottom-left cursor-pointer text-left"
        onClick={(e) => { 
          e.stopPropagation(); 
          onOpenDrawer(video); 
        }}
        onTouchEnd={(e) => { 
          e.stopPropagation(); 
          onOpenDrawer(video); 
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-white/20">
            <img src={video.avatar} alt="Profile" className="w-full h-full object-cover pointer-events-none" />
          </div>
          <span className="text-white font-semibold text-[13px] drop-shadow-md uppercase whitespace-pre-wrap leading-tight">{video.username}</span>
        </div>
        
        {credits.length > 0 ? (
          <div className="flex flex-col pr-4 border-l-[1.5px] border-white/40 pl-3 py-1 my-1 gap-1">
            {credits.map((c, i) => (
              <p key={i} className="text-[10px] sm:text-[11px] font-bold text-white drop-shadow-md tracking-wider uppercase leading-snug">
                {c.label}: <span className="text-white/70 font-medium">{c.value}</span>
              </p>
            ))}
          </div>
        ) : (
          <div className="flex flex-col pr-4">
            <p className="text-white text-[13px] font-normal drop-shadow-md truncate">
              {video.description} <span className="text-white/90">{video.hashtags}</span>
            </p>
          </div>
        )}
      </button>
    </div>
  )
})

function TumblerLoop() {
  const [isHovered, setIsHovered] = useState(false)
  
  useEffect(() => {
    // Loop the animation every 6 seconds
    const interval = setInterval(() => {
      setIsHovered(true)
      setTimeout(() => {
        setIsHovered(false)
      }, 3000) // Hover out after 3s
    }, 15000)
    
    // Initial trigger
    const timeout = setTimeout(() => {
      setIsHovered(true)
      setTimeout(() => {
        setIsHovered(false)
      }, 3000)
    }, 2000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="flex items-center justify-center text-[1.14rem] md:text-[1.5rem] pointer-events-none">
      <div className="font-black tracking-tighter z-10 relative">
        <TumblerLogo isHovered={isHovered} muteSound={true} />
      </div>
    </div>
  )
}

export function MobileReelsFeed() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [globalMuted, setGlobalMuted] = useState(true) // MUST start muted for iOS autoPlay to work!
  const [displayVideos, setDisplayVideos] = useState(VIDEOS)
  const [activeIndex, setActiveIndex] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null)
  
  const selectedProject = selectedVideo ? siteConfig.projects.find(p => p.colorway?.id === familyToProjectId[selectedVideo.family]) || null : null

  const handleOpenDrawer = useCallback((video: typeof VIDEOS[0]) => {
    setSelectedVideo(video)
    setDrawerOpen(true)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  useEffect(() => {
    // 1. Start with a completely randomized pool of videos
    let remaining = [...VIDEOS].sort(() => Math.random() - 0.5)
    let finalArray = [remaining.shift()!]
    
    while (remaining.length > 0) {
      const lastFamily = finalArray[finalArray.length - 1].family
      
      const nextIndex = remaining.findIndex(v => v.family !== lastFamily)
      
      if (nextIndex !== -1) {
        finalArray.push(remaining.splice(nextIndex, 1)[0])
      } else {
        const leftover = remaining.shift()!
        let inserted = false
        
        if (finalArray[0].family !== leftover.family) {
           finalArray.unshift(leftover)
           inserted = true
        } else {
           for (let i = 1; i < finalArray.length; i++) {
             if (finalArray[i - 1].family !== leftover.family && finalArray[i].family !== leftover.family) {
               finalArray.splice(i, 0, leftover)
               inserted = true
               break
             }
           }
        }
        
        if (!inserted) {
          finalArray.push(leftover)
        }
      }
    }
    
    setDisplayVideos(finalArray)
    setIsHydrated(true)
  }, [])

  const toggleGlobalMute = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setGlobalMuted(prev => !prev)
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const index = Math.round(container.scrollTop / container.clientHeight)
    const clampedIndex = Math.max(0, Math.min(index, displayVideos.length - 1))
    
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex)
    }
  }

  if (!isHydrated) {
    return <div className="fixed inset-0 z-40 bg-black flex items-center justify-center"></div>
  }

  return (
    <>
      <div 
        className="lg:hidden fixed inset-0 z-40 bg-black overflow-y-auto snap-y snap-mandatory hide-scrollbar flex flex-col overscroll-none"
        onScroll={handleScroll}
      >
        {/* Global Fixed Header */}
        <div className="fixed top-12 md:top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-[0.89]">
          <TumblerLoop />
        </div>

        {displayVideos.map((video, idx) => {
          const isActive = idx === activeIndex
          const isNext = idx === activeIndex + 1
          const isMounted = Math.abs(idx - activeIndex) <= 1
          return (
            <ReelVideo 
              key={`${video.src}-${idx}`} 
              video={video} 
              globalMuted={globalMuted} 
              isMounted={isMounted}
              isActive={isActive}
              isNext={isNext}
              isDrawerOpen={drawerOpen}
              onToggleMute={toggleGlobalMute} 
              onOpenDrawer={handleOpenDrawer}
            />
          )
        })}
      </div>

      <FullVideoDrawer 
        isOpen={drawerOpen} 
        onClose={handleCloseDrawer} 
        project={selectedProject} 
        clipInfo={selectedVideo} 
      />
    </>
  )
}

