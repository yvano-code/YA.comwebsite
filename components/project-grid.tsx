import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/lib/site-config"
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { ZoomIn, Play } from "lucide-react"

function ProjectCard({ project, onSelect }: { project: Project, onSelect?: (project: Project) => void }) {
  const embedUrl = getVideoEmbedUrl(project.href)
  const thumbnailUrl = project.image || getVideoThumbnailUrl(project.href) || "/placeholder.svg"

  const content = (
    <div className="group relative aspect-video w-full overflow-hidden bg-muted cursor-pointer">
      <Image
        src={thumbnailUrl}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Title overlay, revealed on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="px-4 text-center text-sm font-medium tracking-[0.2em] text-white flex flex-col items-center gap-2">
          {project.title}
          {!project.href && <ZoomIn className="size-5 opacity-70" />}
          {embedUrl && <Play className="size-5 opacity-70" />}
        </span>
      </div>
    </div>
  )

  // If it's a video and we have an onSelect handler
  if (embedUrl && onSelect) {
    return (
      <button type="button" onClick={() => onSelect(project)} aria-label={`View ${project.title}`} className="block w-full text-left">
        {content}
      </button>
    )
  }

  // If it's a video but no onSelect handler (fallback)
  if (embedUrl) {
    return (
      <div className="group relative aspect-video w-full overflow-hidden bg-muted">
        <iframe 
          src={embedUrl} 
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    )
  }

  // If there's an external link
  if (project.href && project.href.startsWith("http")) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" aria-label={project.title} className="block">
        {content}
      </a>
    )
  }

  // If there's an internal link
  if (project.href) {
    return (
      <Link href={project.href} aria-label={project.title} className="block">
        {content}
      </Link>
    )
  }

  // If no link, it's just an image. Make it a lightbox.
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" aria-label={`View ${project.title}`} className="block w-full text-left">
          {content}
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
    <section aria-label="Selected work" className="mx-auto w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}
