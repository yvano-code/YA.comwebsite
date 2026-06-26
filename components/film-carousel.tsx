"use client"

import { siteConfig } from "@/lib/site-config"
import Image from "next/image"
import Link from "next/link"

export function FilmCarousel() {
  const credits = [...siteConfig.imdbCredits].reverse()

  return (
    <section className="relative w-full pt-16 pb-16">
      {/* Section Header */}
      <div className="px-4 md:px-6 flex items-end justify-between mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-4">
          <h3 className="text-[48px] sm:text-[60px] md:text-[81px] font-black tracking-tighter uppercase leading-[0.85]">
            <span className="block ml-[-0.035em] text-black">CREDITS &</span>
            <span className="block text-black/40">FILMOGRAPHY</span>
          </h3>
          <Link href="https://www.imdb.com/name/nm10645603/" target="_blank" className="text-[11px] md:text-[13px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity flex items-center gap-2 whitespace-nowrap sm:pb-2 md:pb-4 lg:pb-6">
            VIEW FULL IMDB <span className="text-lg leading-none">↗</span>
          </Link>
        </div>

      </div>

      {/* Scrolling Cards */}
      <div className="flex overflow-x-auto gap-4 md:gap-6 px-4 md:px-6 pb-12 snap-x snap-mandatory hide-scrollbar">
        {credits.map((credit, idx) => (
          <div 
            key={idx} 
            className="flex-none w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] snap-center group relative bg-zinc-900 transition-all duration-500 rounded-3xl overflow-hidden p-8 flex flex-col justify-between min-h-[50vh] md:min-h-[60vh] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] cursor-pointer border border-white/10"
          >
            {/* Image Background */}
            {credit.image && (
              <>
                <div 
                  className="absolute inset-0 w-full h-full z-0 overflow-hidden" 
                  style={
                    // @ts-ignore
                    credit.imageScale ? { transform: `scale(${credit.imageScale})` } : undefined
                  }
                >
                  <Image 
                    src={credit.image}
                    alt={credit.title}
                    fill
                    unoptimized={true}
                    className="object-cover transition-transform duration-700 group-hover:scale-105 origin-center opacity-80 group-hover:opacity-100"
                  />
                </div>
                {/* Gradients */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent" />
                </div>
              </>
            )}

            {/* Top: Year and Type Pill */}
            <div className="relative z-10 flex justify-between items-start w-full">
              <span className="text-[14px] md:text-[16px] font-bold tracking-[0.3em] text-white/90 drop-shadow-md">
                {credit.year.split('').join(' ')}
              </span>
              <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-white uppercase px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
                {credit.type}
              </span>
            </div>

            {/* Bottom: Title and Roles */}
            <div className="relative z-10 mt-auto pt-8">
              {credit.note && (
                <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-white/80 uppercase mb-2 drop-shadow-md">{credit.note}</p>
              )}
              <h4 className="text-[22px] md:text-[26px] font-black uppercase tracking-tight mb-4 text-white leading-tight drop-shadow-lg">{credit.title}</h4>
              <div className="pt-4 border-t border-white/20">
                <p className="text-[12px] md:text-[13px] font-extrabold text-white/90 uppercase tracking-wide">
                   {credit.roles.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
