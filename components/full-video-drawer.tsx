"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical, Heart, MessageSquare, Bookmark, Send } from "lucide-react"
import { Project } from "@/lib/site-config"
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/utils"

interface FullVideoDrawerProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
  clipInfo: any | null
}

export function FullVideoDrawer({ isOpen, onClose, project, clipInfo }: FullVideoDrawerProps) {
  const [, setDragY] = useState(0)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Reset animation state when drawer opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimationComplete(false)
      setIframeLoaded(false)
    }
  }, [isOpen])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!project || !clipInfo) return null

  const isLocalVideo = !!project.href?.toLowerCase().match(/\.(mp4|webm|mov)$/)
  const embedUrlActive = getVideoEmbedUrl(project.href, false, false)
  // Use same logic as MobileVideoPlayer to grab thumbnail
  const heroThumbnail = project.image || getVideoThumbnailUrl(project.href) || "/placeholder.svg"

  const parts = project.title.split('|')
  const mainTitle = parts[0].trim()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDrag={(e, info) => setDragY(info.offset.y)}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose()
              }
              setDragY(0)
            }}
            onAnimationComplete={() => setIsAnimationComplete(true)}
            className="fixed inset-x-0 bottom-0 z-[101] h-[85vh] bg-[#0f0f0f] rounded-t-3xl overflow-hidden flex flex-col"
          >
            {/* Drag Handle Area */}
            <div className="w-full flex justify-center pt-3 pb-2 flex-shrink-0 bg-[#0f0f0f] z-20" onClick={onClose}>
              <div className="w-10 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Content Container (Scrollable) */}
            <div className="flex-1 overflow-y-auto hide-scrollbar pb-10 overscroll-contain">
              <div className="w-full aspect-video bg-black relative flex items-center justify-center overflow-hidden">
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
                    <img src={heroThumbnail} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mb-2 relative z-30" />
                    <span className="text-white/80 text-xs font-bold tracking-widest relative z-30 drop-shadow-md">LOADING</span>
                  </div>
                )}
                
                {isAnimationComplete && (
                  isLocalVideo ? (
                    <video 
                      src={project.href} 
                      controls 
                      autoPlay
                      playsInline
                      onLoadedData={() => setIframeLoaded(true)}
                      className={`absolute inset-0 w-full h-full object-contain ${iframeLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    />
                  ) : (
                    <iframe 
                      src={`${embedUrlActive}${embedUrlActive?.includes('?') ? '&' : '?'}autoplay=1&playsinline=1&rel=0`} 
                      title={project.title}
                      onLoad={() => setIframeLoaded(true)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className={`absolute inset-0 w-full h-full border-0 ${iframeLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    />
                  )
                )}
              </div>

              {/* Vimeo-style Details */}
              <div className="p-4 md:p-6 text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight mb-1">{mainTitle}</h2>
                  </div>
                  <button className="text-white/70 p-1">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
                      <img src={clipInfo.avatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-[15px]">{clipInfo.username}</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-1.5 rounded-full text-[13px] font-semibold ml-3">
                      Follow
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 pr-1">
                  <button className="bg-white hover:bg-white/90 text-black px-5 py-2.5 rounded-full flex items-center gap-2 font-bold text-sm transition-colors">
                    <Send className="w-4 h-4 -ml-0.5" /> Share
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2.5 rounded-full text-[13px] font-medium">
                      <Heart className="w-4 h-4"/> 0
                    </button>
                    <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2.5 rounded-full text-[13px] font-medium">
                      <MessageSquare className="w-4 h-4"/> 0
                    </button>
                    <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2.5 rounded-full text-[13px] font-medium">
                      <Bookmark className="w-4 h-4"/> Save
                    </button>
                  </div>
                </div>

                {/* Write-up & Credits Box */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                  <p className="text-[15px] leading-relaxed text-white/90 mb-5 whitespace-pre-line">
                    {project.subtitle || clipInfo.description}
                  </p>
                  
                  {project.credits && project.credits.length > 0 && (
                    <div className="flex flex-col gap-3 pt-5 border-t border-white/10">
                      {project.credits.map((c, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                          <span className="text-[11px] font-bold tracking-wider text-white/50 uppercase">
                            {c.label}
                          </span>
                          <span className="text-[14px] font-medium text-white/90">
                            {c.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
