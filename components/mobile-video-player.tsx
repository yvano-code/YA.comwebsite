"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { Project } from "@/lib/site-config"
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/utils"

export function MobileVideoPlayer({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project>(projects[0])
  const [isPlaying, setIsPlaying] = useState(false)

  // Dispatch background colorway when active project changes
  useEffect(() => {
    if (activeProject) {
      const colorway = activeProject.colorway
      if (colorway) {
        window.dispatchEvent(new CustomEvent('bg-change', { detail: colorway }))
      } else {
        window.dispatchEvent(new CustomEvent('bg-change', { detail: null }))
      }
    }
  }, [activeProject])

  // Revert background to neutral on unmount
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('bg-change', { detail: null }))
    }
  }, [])

  if (!projects || projects.length === 0) return null;

  const handleSelectCarousel = (project: Project) => {
    setActiveProject(project)
    setIsPlaying(false)
  }

  const getOriginClass = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('fafi')) return 'origin-[30%_30%]'
    if (t.includes('baked')) return 'origin-[67%_50%]'
    if (t.includes('moongazer')) return 'origin-[41%_50%]'
    if (t.includes('magic')) return 'origin-[46%_50%]'
    if (t.includes('black')) return 'origin-[50%_24%]'
    return ''
  }

  const getScaleClass = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('black')) return 'scale-[1.15]'
    return 'scale-[1.6]'
  }

  const embedUrlActive = getVideoEmbedUrl(activeProject.href, false, false)
  const isLocalVideo = !!activeProject.href?.toLowerCase().match(/\.(mp4|webm|mov)$/)
  const heroThumbnail = activeProject.image || getVideoThumbnailUrl(activeProject.href) || "/placeholder.svg"

  return (
    <div className="flex flex-col w-full gap-8 pb-0 px-3 md:px-6 max-w-[500px] md:max-w-3xl mx-auto">
      
      {/* 1. Hero Section - Direct Native Embed */}
      <div className="w-full relative flex flex-col rounded-xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border border-white/5 h-[65vh] min-h-[450px] bg-white/5 backdrop-blur-xl">
        
        <div className="absolute inset-0 w-full h-full z-10">
          {!isPlaying && (
            <div 
              className="absolute inset-0 w-full h-full cursor-pointer group z-50 flex items-center justify-center overflow-hidden bg-transparent"
              onClick={() => setIsPlaying(true)}
            >
              <Image 
                src={heroThumbnail} 
                alt={activeProject.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 800px"
                className={`object-cover pointer-events-none ${getScaleClass(activeProject.title)} ${getOriginClass(activeProject.title)}`}
                priority
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors pointer-events-none" />
              <button className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xl relative z-30">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
          )}

          {isPlaying && (
            isLocalVideo ? (
              <video 
                src={activeProject.href} 
                controls 
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-contain bg-black"
              />
            ) : (
              <iframe 
                src={`${embedUrlActive}${embedUrlActive?.includes('?') ? '&' : '?'}autoplay=1`} 
                title={activeProject.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0 bg-black"
              />
            )
          )}
        </div>

        {/* Text Overlay - Only show when NOT playing so video is clean */}
        {!isPlaying && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent z-40 pointer-events-none" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 z-50 pointer-events-none pb-6">
              {(() => {
                const parts = activeProject.title.split('|')
                const mainTitle = parts[0].trim()
                const subTitle = parts.slice(1).join('|').trim()
                return (
                  <>
                    <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase mb-1 drop-shadow-lg text-center leading-[0.9]">
                      {mainTitle}
                    </h2>
                    {subTitle && (
                      <p className="text-white/70 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-center mb-4 drop-shadow-md">
                        {subTitle}
                      </p>
                    )}
                  </>
                )
              })()}
              
              {activeProject.credits && activeProject.credits.length > 0 && (
                <div className="flex flex-col gap-1.5 items-start justify-center mt-2 mb-2 border-l-2 border-white/20 pl-3 mr-auto ml-2">
                  {activeProject.credits.map((c, idx) => (
                    <div key={idx} className="text-left leading-snug">
                      <span className="text-white font-bold tracking-[0.15em] uppercase text-[7px] md:text-[8px] mr-2">
                        {c.label}:
                      </span>
                      <span className="text-white/60 font-semibold tracking-widest uppercase text-[7px] md:text-[8px]">
                        {c.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* 2. Watch More Carousel */}
      {projects.length > 1 && (
        <div className="flex flex-col w-full pb-0">
          <h2 className="text-black font-bold text-[17px] mb-3 tracking-tight">Watch More</h2>
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory hide-scrollbar pb-[3vh] pt-4 px-0">
            {projects.filter(p => p.title !== activeProject.title).reverse().map((project, i) => {
              // Always use the high-res desktop image so there are no black bars
              const thumbUrl = project.image || getVideoThumbnailUrl(project.href) || "/placeholder.svg"
              return (
                <div 
                  key={i} 
                  onClick={() => handleSelectCarousel(project)}
                  className="w-full flex-shrink-0 relative flex flex-col rounded-xl overflow-hidden aspect-[2/3] snap-center shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] border border-white/5 bg-white/5 backdrop-blur-xl group cursor-pointer pointer-events-auto"
                >
                  <Image 
                    src={thumbUrl} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 300px"
                    className={`object-cover pointer-events-none ${getScaleClass(project.title)} ${getOriginClass(project.title)}`} 
                  />
                  
                  {/* Dark gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none z-20" />
                  
                  <div className="absolute bottom-[20%] left-0 w-full z-30 p-4 pointer-events-none flex flex-col items-center">
                    {(() => {
                      const parts = project.title.split('|')
                      const mainTitle = parts[0].trim()
                      const subTitle = parts.slice(1).join('|').trim()
                      return (
                        <>
                          <h3 className="text-white text-base md:text-lg font-black tracking-tight uppercase line-clamp-2 text-center drop-shadow-md leading-[1.1]">
                            {mainTitle}
                          </h3>
                          {subTitle && (
                            <span className="text-white/70 text-[9px] md:text-[10px] font-bold tracking-[0.1em] uppercase text-center mt-1.5 drop-shadow-sm line-clamp-1">
                              {subTitle}
                            </span>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Global styles for hide-scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  )
}
