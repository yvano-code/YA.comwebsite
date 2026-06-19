"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { Project } from "@/lib/site-config"
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/utils"

export function AccordionCarousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex w-full h-[60vh] min-h-[500px] max-h-[800px] gap-2 md:gap-4 px-6 md:px-12 pb-12 overflow-hidden">
      {projects.map((project, idx) => {
        const isActive = activeIndex === idx
        
        const isLocalVideo = !!project.href?.toLowerCase().match(/\.(mp4|webm|mov)$/)
        const embedUrlActive = getVideoEmbedUrl(project.href, true, false)
        const isVideo = !!embedUrlActive || isLocalVideo
        const thumbnailUrl = project.image || getVideoThumbnailUrl(project.href) || "/placeholder.svg"

        return (
          <motion.div
            key={project.title}
            layout
            onClick={() => {
              if (!isActive) setActiveIndex(idx)
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-2xl ${
              isActive ? "flex-grow cursor-default" : "w-12 md:w-24 cursor-pointer hover:opacity-80 transition-opacity"
            }`}
          >
            {isActive ? (
              // Active State Content
              <div className="absolute inset-0 w-full h-full bg-black">
                {/* Background Video/Image */}
                {isVideo ? (
                  isLocalVideo ? (
                    <video 
                      src={project.href} 
                      autoPlay 
                      controls 
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  ) : (
                    <iframe 
                      src={embedUrlActive || ""} 
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0 z-0"
                    />
                  )
                ) : (
                  <Image
                    src={thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover z-0"
                  />
                )}
                
                {/* Overlay text */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none"
                >
                  <h4 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-widest uppercase text-white drop-shadow-lg mb-2">
                    {project.title}
                  </h4>
                  {project.subtitle && (
                    <p className="text-[11px] md:text-[13px] leading-relaxed text-gray-300 font-bold uppercase tracking-[0.2em] mb-4">
                      {project.subtitle}
                    </p>
                  )}
                  {project.credits && project.credits.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-2">
                      {project.credits.map((credit, i) => (
                        <div key={i} className="text-[10px] md:text-[11px] tracking-[0.05em] bg-black/50 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                          <span className="font-bold text-gray-400 uppercase mr-2">{credit.label}:</span>
                          <span className="text-white font-medium uppercase">{credit.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            ) : (
              // Inactive State Content
              <div className="absolute inset-0 w-full h-full bg-black">
                <Image
                  src={thumbnailUrl}
                  alt={project.title}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Vertical Text */}
                  <span 
                    className="text-white font-bold tracking-[0.3em] uppercase whitespace-nowrap text-xs md:text-sm"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {project.title}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
