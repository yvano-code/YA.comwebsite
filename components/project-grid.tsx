import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/lib/site-config"

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="group relative aspect-video w-full overflow-hidden bg-muted">
      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Title overlay, revealed on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="px-4 text-center text-sm font-medium tracking-[0.2em] text-white">
          {project.title}
        </span>
      </div>
    </div>
  )

  if (!project.href) {
    return <div>{content}</div>
  }

  const isExternal = project.href.startsWith("http")

  return isExternal ? (
    <a href={project.href} target="_blank" rel="noreferrer" aria-label={project.title}>
      {content}
    </a>
  ) : (
    <Link href={project.href} aria-label={project.title}>
      {content}
    </Link>
  )
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section aria-label="Selected work" className="mx-auto w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
