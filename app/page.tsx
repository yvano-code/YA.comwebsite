import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectShowcase } from "@/components/project-showcase"
import { siteConfig } from "@/lib/site-config"

export default function Page() {
  return (
    <ProjectShowcase projects={siteConfig.projects} />
  )
}
