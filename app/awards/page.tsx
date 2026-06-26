"use client"

import { siteConfig } from "@/lib/site-config"
import Image from "next/image"
import Link from "next/link"

export default function AwardsPage() {
  const credits = [...siteConfig.imdbCredits].reverse()

  return (
    <div className="w-full relative min-h-screen flex flex-col pt-16 md:pt-24 pb-0 overflow-x-hidden">
      
      {/* ── CREDITS & FILMOGRAPHY ── */}
      <section className="w-full pt-8 relative">
        <div className="px-6 flex flex-col mb-4">
          <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.85]">
            <span className="block ml-[-0.035em] text-black">CREDITS &</span>
            <span className="block text-black/40">FILMOGRAPHY</span>
          </h3>
        </div>

        {/* Full Width Mobile Snap Carousel */}
        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory hide-scrollbar px-3 md:px-6 w-full">
          {credits.map((credit, idx) => (
            <div 
              key={idx} 
              className="flex-none w-full snap-center relative bg-zinc-900 rounded-2xl overflow-hidden p-6 flex flex-col justify-between min-h-[50vh] sm:min-h-[60vh] border border-white/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]"
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
                      className="object-cover opacity-60"
                      style={{
                        // @ts-ignore
                        objectPosition: credit.imagePosition || "center"
                      }}
                    />
                  </div>
                  {/* Gradients to ensure text readability */}
                  <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/80 to-transparent" />
                  </div>
                </>
              )}

              {/* Top: Year and Type Pill */}
              <div className="relative z-10 flex justify-between items-start w-full">
                <span className="text-white/80 font-mono tracking-widest text-xs font-bold pt-1">
                  {credit.year.split('').join(' ')}
                </span>
                <span className="px-3 py-1 text-[8px] sm:text-[9px] font-bold tracking-widest text-white/90 border border-white/20 rounded-full uppercase backdrop-blur-md bg-black/20">
                  {credit.type}
                </span>
              </div>

              {/* Bottom: Title and Roles */}
              <div className="relative z-10 w-full pt-12">
                {credit.note && (
                  <div className="mb-4">
                     <p className="text-[8px] font-bold tracking-widest text-white uppercase border-l-2 border-[#E05D4C] pl-2">
                       {credit.note}
                     </p>
                  </div>
                )}
                
                <div className="w-full h-[1px] bg-white/20 mb-4" />
                
                <h4 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase mb-1">
                  {credit.title}
                </h4>
                
                <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-white/60 uppercase">
                  {credit.roles.join(" & ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOBILE VIEW: AWARDS & OFFICIAL SELECTIONS ── */}
      <section className="px-6 md:px-12 pt-16 pb-0 relative z-10">
        <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-8">
          AWARDS & <br />
          <span className="text-black/40">OFFICIAL SELECTIONS</span>
        </h3>

        <div className="w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] -ml-6 md:-ml-12 mb-12 relative bg-transparent">
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
          
          <div className="flex w-full items-center gap-0 overflow-x-auto hide-scrollbar px-6 md:px-12">
            {[
              "/projects/official_selects_1_final.png",
              "/projects/bbt_laurels_final.png",
            ].map((src, i) => (
              <div key={i} className="shrink-0 w-[280vw] md:w-[130vw] flex items-center justify-center py-4">
                <Image 
                  src={src}
                  alt={`Festival Laurels Row ${i + 1}`}
                  width={2500}
                  height={400}
                  unoptimized={true}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-8 mb-8">
          {siteConfig.awards.map((award, idx) => (
            <div key={idx} className="flex flex-col border-b border-black/10 pb-6 last:border-0 last:pb-0">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-black mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                {award.status}
              </div>
              <h4 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-[1.1] mb-2">
                {award.title}
              </h4>
              <p className="text-[13px] leading-relaxed text-black/80 font-medium max-w-sm">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Small spacer to ensure the bottom navbar sits nicely */}
      <div className="w-full h-24 lg:h-32" />
    </div>
  )
}

