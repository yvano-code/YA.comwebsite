import { AccordionCarousel } from "@/components/accordion-carousel"
import { siteConfig } from "@/lib/site-config"

export default function FilmTvPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      <div className="flex flex-col px-6 md:px-12 mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">FILM & TELEVISION</h1>
        <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black/50 mt-2">
          MUSIC VIDEO | COMMERCIAL | LIVE BROADCAST
        </p>
      </div>
      <AccordionCarousel projects={siteConfig.projects} />
    </div>
  )
}
