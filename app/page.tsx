import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectShowcase } from "@/components/project-showcase"
import { siteConfig } from "@/lib/site-config"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ProjectShowcase projects={siteConfig.projects} />
      </main>
      <SiteFooter />
    </div>
  )
}
