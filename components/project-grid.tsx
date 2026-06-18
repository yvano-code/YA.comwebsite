"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/lib/site-config"
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { ZoomIn, Play } from "lucide-react"

function ProjectCard({ project, onSelect }: { project: Project, onSelect?: (project: Project) => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const isLocalVideo = !!project.href?.toLowerCase().match(/\.(mp4|webm|mov)$/)
  
  // For hover preview (muted, no controls)
  const embedUrlPreview = getVideoEmbedUrl(project.href, true, true)
  // For active playback (with controls and sound)
  const embedUrlActive = getVideoEmbedUrl(project.href, true, false)
  
  const isVideo = !!embedUrlActive || isLocalVideo
  const thumbnailUrl = project.image || getVideoThumbnailUrl(project.href) || "/placeholder.svg"

  const handleMouseEnter = () => {
    if (isVideo && !isClicked) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!isClicked) setIsHovered(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isVideo && !onSelect) {
      e.preventDefault()
      setIsClicked(true)
    }
  }

  const activeContent = (
    <div className="relative aspect-video w-full overflow-hidden bg-black rounded-md shadow-xl">
      {isLocalVideo ? (
        <video 
          src={project.href} 
          autoPlay 
          controls 
          className="absolute inset-0 w-full h-full object-contain bg-black"
        />
      ) : (
        <iframe 
          src={embedUrlActive || ""} 
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  )

  const defaultContent = (
    <div 
      className="group relative aspect-video w-full overflow-hidden bg-muted cursor-pointer rounded-md shadow-sm transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Image
        src={thumbnailUrl}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className={`transition-transform duration-500 group-hover:scale-105 ${
          // @ts-ignore
          project.imagePosition === "bottom" ? "object-cover object-bottom" : "object-cover"
        } ${isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity delay-300`} // fade out image slightly after delay so video can load behind
        priority={true}
      />
      
      {/* Background preview player */}
      {isHovered && isVideo && (
        <div className="absolute inset-0 z-0">
          {isLocalVideo ? (
            <video 
              src={project.href} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          ) : embedUrlPreview && (
            <iframe 
              src={embedUrlPreview} 
              title={`${project.title} preview`}
              allow="autoplay" 
              className="absolute inset-0 h-[150%] w-[150%] -top-[25%] -left-[25%] border-0 opacity-80 pointer-events-none" // scaling iframe to hide UI elements
            />
          )}
        </div>
      )}

      {/* Title overlay, revealed on hover */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 transition-opacity duration-300 gap-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <span className="px-4 text-center text-sm md:text-base font-bold tracking-[0.2em] text-white">
          {project.title}
        </span>
        {isVideo && (
          <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm transition-transform hover:scale-110 border border-white/20">
             <Play className="size-6 md:size-8 text-white ml-1" fill="currentColor" />
          </div>
        )}
        {!project.href && (
          <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm transition-transform hover:scale-110 border border-white/20">
             <ZoomIn className="size-6 md:size-8 text-white" />
          </div>
        )}
      </div>
    </div>
  )

  if (isClicked) {
    return activeContent
  }

  // If there's an external link (not a video)
  if (!isVideo && project.href && project.href.startsWith("http")) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" aria-label={project.title} className="block">
        {defaultContent}
      </a>
    )
  }

  // If there's an internal link (not a video)
  if (!isVideo && project.href) {
    return (
      <Link href={project.href} aria-label={project.title} className="block">
        {defaultContent}
      </Link>
    )
  }

  // If it is a video it will just use defaultContent which handles click internally.
  if (isVideo) {
    return defaultContent;
  }

  // If no link, it's just an image. Make it a lightbox.
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" aria-label={`View ${project.title}`} className="block w-full text-left">
          {defaultContent}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-4xl border-none bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-transparent">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ProjectGrid({ projects, onSelect }: { projects: Project[], onSelect?: (project: Project) => void }) {
  return (
    <section aria-label="Selected work" className="mx-auto w-full max-w-[1400px] px-4 md:px-12 mb-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}
