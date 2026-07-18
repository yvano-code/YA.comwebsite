"use client"

import { siteConfig } from "@/lib/site-config"
import { InfiniteFilmographyScroll } from "@/components/infinite-filmography-scroll"

export default function InfoPage() {
  return (
    <div className="w-full min-h-screen bg-[#F6F3EE] pt-32 pb-48 text-[#111] relative z-20">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24">
        
        {/* BIO SECTION */}
        <section className="mb-32 md:mb-40 max-w-5xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight text-[#111]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Biography
            </h2>
          </div>
          
          <div className="space-y-12">
            <p className="text-2xl md:text-4xl lg:text-5xl font-serif leading-[1.4] md:leading-[1.3] text-[#111] max-w-4xl tracking-tight whitespace-pre-wrap" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              {siteConfig.imdbBio}
            </p>
            <p className="text-xl md:text-3xl font-serif leading-[1.5] text-[#111]/80 max-w-4xl whitespace-pre-wrap" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              {siteConfig.imdbBioMiddle}
            </p>
            
            <div className="relative py-12 md:py-16 my-8 md:my-16 pl-6 md:pl-12 border-l-2 border-[#111]/20">
              <span className="absolute -left-6 md:-left-8 top-12 text-6xl md:text-8xl text-[#111]/10 font-serif" style={{ fontFamily: 'var(--font-playfair), serif' }}>"</span>
              <div className="text-lg md:text-2xl font-serif text-[#111]/70 max-w-3xl leading-[1.8] flex flex-col gap-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {siteConfig.imdbDirectorStatement?.split('\n\n').map((paragraph, i, arr) => (
                  <p key={i}>
                    {paragraph}{i === arr.length - 1 ? '"' : ''}
                  </p>
                ))}
              </div>
            </div>
            
            <p className="text-sm md:text-base font-sans font-medium leading-[2] tracking-wide text-[#111]/70 max-w-2xl uppercase">
              {siteConfig.imdbBioCloser}
            </p>
          </div>
        </section>

      </div>

      {/* FILMOGRAPHY SECTION (FULL WIDTH) */}
      <section className="w-full mb-32 md:mb-40 relative">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-[60px] font-semibold tracking-wide uppercase leading-[1.1] text-[#111]" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>
            Credits & Filmography
          </h2>
          <div className="flex items-center">
            <span className="inline-block py-2 px-5 bg-transparent rounded-full text-[10px] tracking-[0.2em] font-medium uppercase text-[#111] border border-[#111]/20 pb-1.5 flex items-center gap-2">
              SWIPE <span>→</span>
            </span>
          </div>
        </div>
        
        {/* Infinite Scroll component handles its own full width bleed */}
        <InfiniteFilmographyScroll />
      </section>

      {/* AWARDS SECTION */}
      <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 mb-32">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight text-[#111]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Awards & Selections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {siteConfig.awards.map((award, index) => (
            <div key={index} className="group relative pt-8">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#111]/10 group-hover:bg-[#111]/30 transition-colors duration-500"></div>
              
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.2em] font-medium text-[#111]/50 mb-4 uppercase">{award.status}</div>
                  <h3 className="text-xl md:text-2xl font-serif text-[#111] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>{award.title}</h3>
                </div>
                <p className="text-xs tracking-widest text-[#111]/60 uppercase leading-[2] mt-4 font-medium">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  )
}
