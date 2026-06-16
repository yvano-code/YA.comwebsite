"use client"

import { useState } from "react"
import { ProjectGrid } from "./project-grid"
import { ProjectDetail } from "./project-detail"
import type { Project } from "@/lib/site-config"

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const handleSelectProject = (project: Project) => {
    setActiveProject(project)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClose = () => {
    setActiveProject(null)
  }

  return (
    <div className="flex flex-col w-full">
      {activeProject && (
        <ProjectDetail project={activeProject} onClose={handleClose} />
      )}
      <ProjectGrid projects={projects} onSelect={handleSelectProject} />
    </div>
  )
}
