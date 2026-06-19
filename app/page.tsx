"use client"

import { useState } from "react"
import { AnimatedLogo } from "@/components/animated-logo"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { AccordionCarousel } from "@/components/accordion-carousel"

export default function LandingPageDemo() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-24">
      {/* Navigation matching Awwwards, but using real links */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-8 text-sm font-semibold tracking-wide">
         <AnimatedLogo />
         <div className="hidden md:flex items-center justify-center flex-1 mx-4 lg:mx-8">
           <h3 className="text-sm lg:text-xl xl:text-2xl font-black tracking-tighter uppercase leading-none text-center whitespace-nowrap">
             FILM & TELEVISION <span className="mx-1 md:mx-2 text-gray-300">|</span> MUSIC VIDEO <span className="mx-1 md:mx-2 text-gray-300">|</span> COMMERCIAL <span className="mx-1 md:mx-2 text-gray-300">|</span> LIVE BROADCAST
           </h3>
         </div>
         <div>
            <Link href="https://yvanoantonio.com/contact" className="bg-black text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition whitespace-nowrap">Contact</Link>
         </div>
      </nav>

      <main>
        {/* Editorial Section Removed */}

        {/* Film & TV Horizontal Scroll Section */}
        <section className="mt-20 md:mt-24 overflow-hidden">
          <div className="px-6 md:px-12 mb-8 md:mb-10 flex items-end justify-between">
            <div className="flex flex-col">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-normal md:leading-snug">Selected Filmography</h3>
            </div>
            <Link href="/film-tv" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity border-b border-black pb-1 hidden sm:block">View All Projects ↗</Link>
          </div>

          {/* Accordion Carousel Container */}
          <AccordionCarousel projects={siteConfig.projects} />
        </section>

        {/* Filmography Horizontal Scroll Section */}
        <section className="mt-16 md:mt-20 overflow-hidden mb-12">
          <div className="px-6 md:px-12 mb-12 md:mb-16 flex items-end justify-between">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Filmography & Credits</h3>
              <Link href="https://www.imdb.com/name/nm10645603/" target="_blank" className="text-[11px] md:text-[13px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity flex items-center gap-2 whitespace-nowrap sm:pb-1 md:pb-2">
                VIEW FULL IMDB <span className="text-lg leading-none">↗</span>
              </Link>
            </div>
            <div className="flex gap-4 items-center sm:pb-1 md:pb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hidden md:block">Scroll to explore</span>
              <svg className="w-4 h-4 text-gray-400 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-4 md:gap-6 px-6 md:px-12 pb-12 snap-x snap-mandatory hide-scrollbar">
            {[...siteConfig.imdbCredits].reverse().map((credit, idx) => (
              <div key={idx} className="flex-none w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] snap-center group relative bg-black transition-all duration-500 rounded-3xl overflow-hidden p-8 flex flex-col justify-between min-h-[300px] md:min-h-[380px] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer border border-white/5">
                
                {/* Image Background */}
                {credit.image && (
                  <>
                    {/* Image Wrapper for Scaling */}
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
                        className="object-cover transition-transform duration-700 group-hover:scale-105 origin-center"
                      />
                    </div>
                    {/* Gradients */}
                    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent" />
                    </div>
                  </>
                )}

                {/* Top: Year and Type Pill */}
                <div className="relative z-10 flex justify-between items-start w-full">
                  <span className="text-[14px] md:text-[16px] font-bold tracking-[0.3em] text-white/90 drop-shadow-md">
                    {credit.year.split('').join(' ')}
                  </span>
                  <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-white uppercase px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 shadow-sm">
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

        {/* Accreditations Section */}
        <section className="mt-8 md:mt-12 px-6 md:px-12 pb-12 border-t border-black/10 pt-16 md:pt-24">
          <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">AWARDS & OFFICIAL SELECTIONS</h3>
              <p className="text-[13px] md:text-[15px] font-medium leading-relaxed max-w-2xl text-gray-700">
                {siteConfig.accreditations}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-16">
            {siteConfig.awards.map((award, idx) => (
              <div key={idx} className="group cursor-default relative">
                <div className="absolute -left-4 top-1 w-1.5 h-1.5 rounded-full bg-[#E05D4C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-black mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#E05D4C] transition-colors duration-300 md:hidden"></div>
                  {award.status}
                </div>
                <h4 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-[1.1] mb-4 group-hover:text-[#E05D4C] transition-colors duration-300">
                  {award.title}
                </h4>
                <p className="text-[12px] md:text-[13px] leading-relaxed text-black font-medium max-w-sm">
                  {award.description}
                </p>
              </div>
            ))}
          </div>

          {/* Laurels Banner Images */}
          <div className="w-full flex flex-col items-center pt-8 pb-8 gap-8 md:gap-12">
            <Image 
              src="/projects/bbt_laurels.webp"
              alt="Festival Laurels Row 1"
              width={2500}
              height={600}
              unoptimized={true}
              className="w-full h-auto object-contain mix-blend-darken contrast-125 grayscale opacity-80 scale-[0.98]"
            />
          </div>
        </section>
      </main>

      {/* Global Style for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  )
}
