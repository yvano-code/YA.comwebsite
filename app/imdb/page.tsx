import { siteConfig } from "@/lib/site-config"
import Link from "next/link"

export default function ImdbPage() {
  return (
    <div className="w-full bg-white min-h-screen text-black pt-16 pb-32">
      <div className="mx-auto w-full max-w-4xl px-4 md:px-8 space-y-16">
        <header className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase">Accreditations</h1>
            <p className="text-muted-foreground uppercase tracking-[0.1em] text-xs">
              Selected Filmography & Directing Credits
            </p>
          </div>
          {siteConfig.imdbBio && (
            <div className="space-y-4">
              <p className="text-sm md:text-base leading-relaxed max-w-3xl">
                {siteConfig.imdbBio}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center">
                {"imdbBioLink" in siteConfig && (
                  <Link 
                    href={(siteConfig as any).imdbBioLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-bold tracking-[0.1em] uppercase hover:text-gray-500 transition-colors border-b border-black pb-1 hover:border-gray-500 w-fit"
                  >
                    {(siteConfig as any).imdbBioLink.title} ↗
                  </Link>
                )}
                <Link 
                  href="https://www.imdb.com/name/nm10504529/?ref_=tt_ov_1_1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold tracking-[0.1em] uppercase hover:text-gray-500 transition-colors border-b border-black pb-1 hover:border-gray-500 w-fit"
                >
                  VIEW FULL IMDB PROFILE ↗
                </Link>
              </div>
            </div>
          )}
        </header>

        <div className="border-t border-black/10 pt-8">
          <div className="space-y-8">
            {siteConfig.imdbCredits.map((credit, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-wider uppercase">
                    {credit.title}
                  </h3>
                  <div className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                    {credit.roles.join(" • ")}
                  </div>
                  {"note" in credit && (
                    <div className="text-xs font-bold tracking-widest uppercase text-black pt-1">
                      {(credit as any).note}
                    </div>
                  )}
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

        {"awards" in siteConfig && (
          <div className="border-t border-black/10 pt-16 mt-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-[0.15em] uppercase mb-8">Awards</h2>
            <ul className="space-y-6 list-disc pl-5">
              {(siteConfig as any).awards.map((award: any, index: number) => (
                <li key={index} className="text-sm md:text-base leading-relaxed pl-2">
                  <strong>{award.title}</strong>: <strong>{award.status}</strong> <span dangerouslySetInnerHTML={{ __html: award.description }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
