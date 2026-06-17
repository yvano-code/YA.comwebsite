"use client"

import { Project } from "@/lib/site-config"
import Image from "next/image"
import { getVideoEmbedUrl } from "@/lib/utils"

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const embedUrl = getVideoEmbedUrl(project.href, true)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-8 pb-16 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-[0.1em] uppercase">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
            - {project.subtitle} -
          </p>
        )}
      </div>

      {embedUrl ? (
        <div className="relative aspect-video w-full overflow-hidden bg-black mb-12 shadow-xl">
          <iframe 
            src={embedUrl} 
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : project.href?.toLowerCase().match(/\.(mp4|webm|mov)$/) ? (
        <div className="relative aspect-video w-full overflow-hidden bg-black mb-12 shadow-xl">
          <video
            src={project.href}
            autoPlay
            controls
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ) : (
        /* Fallback if it's somehow not a video link */
        <div className="relative aspect-video w-full overflow-hidden bg-muted mb-12 shadow-xl">
           <Image src={project.image} alt={project.title} fill className="object-cover" priority={true} />
        </div>
      )}

      {/* @ts-ignore - checking if credits exists to support optional array */}
      {project.credits && project.credits.length > 0 && (
        <div className="flex flex-col items-center space-y-3 mb-16 text-sm text-foreground">
          {/* @ts-ignore */}
          {project.credits.map((c, i) => (
            <div key={i} className="flex flex-row gap-2">
              <span className="font-semibold">{c.label}:</span>
              <span className="text-muted-foreground">{c.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center w-full max-w-6xl mx-auto mb-6 text-sm">
        <span className="font-semibold tracking-[0.1em] uppercase">Back to Home</span>
        <button 
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.1em] cursor-pointer"
        >
          [ Close View ]
        </button>
      </div>
      
      <hr className="w-full border-border/50 mb-12" />
    </section>
  )
}
