import { siteConfig } from "@/lib/site-config"
import Link from "next/link"

export default function ImdbPage() {
  return (
    <div className="w-full bg-white min-h-screen text-black pt-16 pb-32">
      <div className="mx-auto w-full max-w-4xl px-4 md:px-8 space-y-16">
        <header className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase">Credits</h1>
            <p className="text-muted-foreground uppercase tracking-[0.1em] text-xs">
              Selected Filmography & Directing Credits
            </p>
          </div>
          {siteConfig.imdbBio && (
            <p className="text-sm md:text-base leading-relaxed max-w-3xl">
              {siteConfig.imdbBio}
            </p>
          )}
        </header>

        <div className="border-t border-black/10 pt-8">
          <div className="space-y-8">
            {siteConfig.imdbCredits.map((credit, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8 group">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-wider uppercase group-hover:text-gray-500 transition-colors">
                    {credit.title}
                  </h3>
                  <div className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                    {credit.roles.join(" • ")}
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 text-sm font-medium tracking-widest text-gray-400">
                  <span>{credit.year}</span>
                  <span className="hidden sm:inline border-t border-black/20 w-8 my-1"></span>
                  <span className="text-xs uppercase">{credit.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-16 border-t border-black/10 text-center">
          <Link 
            href="https://www.imdb.com/name/nm10504529/?ref_=tt_ov_1_1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block border border-black px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors"
          >
            View Full IMDB Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
