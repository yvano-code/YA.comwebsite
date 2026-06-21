"use client"

import { useRef, useState } from "react"
import { AnimatedLogo, TumblerLogo } from "@/components/animated-logo"
import { AccordionCarousel } from "@/components/accordion-carousel"
import { FilmCarousel } from "@/components/film-carousel"
import { siteConfig } from "@/lib/site-config"
import Image from "next/image"
import Link from "next/link"

export default function HomePage3() {
  const [isFooterHovered, setIsFooterHovered] = useState(false);
  return (
    <div className="w-full relative overflow-x-hidden">
      {/* ── HERO SECTION (Normal Document Flow) ── */}
      <header className="relative w-full min-h-[100vh] flex flex-col items-center justify-center z-0">
        <div className="flex items-center justify-center w-full flex-grow">
          <AnimatedLogo />
        </div>

         {/* Permanent Content Nav (Text Only) */}
         <nav className="absolute bottom-[27vh] w-full flex items-center justify-center px-4 md:px-12 pb-4 text-sm font-semibold z-50">
               <div className="text-[9.5px] md:text-[11.5px] lg:text-[13.5px] font-medium tracking-[0.25em] uppercase text-black/50 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8 w-full max-w-[90vw] text-center">
                  <span className="whitespace-nowrap">FILM & TELEVISION</span>
                  <span className="text-black/20 font-light hidden md:inline">|</span>
                  <span className="whitespace-nowrap">MUSIC VIDEO</span>
                  <span className="text-black/20 font-light hidden md:inline">|</span>
                  <span className="whitespace-nowrap">COMMERCIAL</span>
                  <span className="text-black/20 font-light hidden md:inline">|</span>
                  <span className="whitespace-nowrap">LIVE BROADCAST</span>
               </div>
         </nav>
      </header>

      {/* ── DYNAMIC CONTENT SECTIONS ── */}
      <div className="relative z-10 w-full pt-16 md:pt-24 pb-24">

            <main>
              <section className="mt-8 md:mt-12 relative">
                {/* Subtle Glow Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.2)_40%,transparent_70%)] blur-[100px] pointer-events-none z-0 mix-blend-overlay" />
                
                <div className="px-6 md:px-12 mb-8 md:mb-10 flex items-start sm:items-end justify-between relative z-10 flex-col sm:flex-row gap-8">
                  <div className="flex flex-col">
                    <h3 className="text-[48px] sm:text-[60px] md:text-[81px] font-black tracking-tighter uppercase leading-[0.85] pb-4 drop-shadow-sm">
                      <span className="text-black">KEY </span>
                      <span className="text-black/30">CREATIONS</span>
                    </h3>
                  </div>
                  
                  {/* Navigation Links (Archived per request) */}
                  {/*
                  <div className="flex flex-col items-start sm:items-end gap-3 z-10 pb-4">
                     <Link href="https://yvanoantonio.com/contact" className="bg-black text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition whitespace-nowrap w-full sm:w-auto text-center">Contact</Link>
                     <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 mt-2 w-full sm:w-auto">
                        <Link href="/homepage1" className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition whitespace-nowrap border border-black/10 w-full sm:w-auto text-center">Homepage 1</Link>
                        <Link href="/homepage2" className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition whitespace-nowrap border border-black/10 w-full sm:w-auto text-center">Homepage 2</Link>
                        <Link href="/animation-test" className="bg-amber-100 text-amber-900 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-amber-200 transition whitespace-nowrap border border-amber-200 w-full sm:w-auto text-center">Animation Lab</Link>
                     </div>
                  </div>
                  */}
                </div>

                <div className="relative z-10 overflow-hidden pb-12">
                  <AccordionCarousel projects={siteConfig.projects} />
                </div>
              </section>



              {/* Accreditations Section */}
              <section className="mt-12 md:mt-16 px-6 md:px-12 pb-12 pt-12 md:pt-16">
                <div className="mb-16 md:mb-24">
                  <h3 className="text-[48px] sm:text-[60px] md:text-[81px] font-black tracking-tighter uppercase leading-[0.85]">
                    <span className="block text-black">AWARDS &</span>
                    <span className="block text-black/30">OFFICIAL SELECTIONS</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 mb-16">
                  {siteConfig.awards.map((award, idx) => (
                    <div key={idx} className={`relative lg:px-8 ${idx !== 0 ? 'lg:border-l lg:border-black/10' : 'lg:pl-0'}`}>
                      <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                        {award.status}
                      </div>
                      <h4 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-[1.1] mb-4 text-black">
                        {award.title}
                      </h4>
                      <p className="text-[12px] md:text-[13px] leading-relaxed text-black/70 font-medium max-w-sm">
                        {award.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Laurels Banner Images */}
                <div className="w-full flex flex-col items-center pt-8 pb-0 gap-0 -mb-20 md:-mb-36 lg:-mb-72">
                  <Image 
                    src="/projects/bbt_laurels_transparent.png"
                    alt="Festival Laurels"
                    width={2000}
                    height={400}
                    className="w-[89%] h-auto object-contain opacity-90 mix-blend-darken drop-shadow-sm relative z-10"
                  />
                  <Image 
                    src="/projects/official_selects_1_nobg.png"
                    alt="Official Selection"
                    width={2000}
                    height={400}
                    className="w-[89%] h-auto object-contain opacity-90 drop-shadow-sm -mt-[10%] md:-mt-[12%] lg:-mt-[15%] relative z-0"
                  />
                </div>
              </section>
              {/* Filmography Section matching Homepage 2 */}
              <FilmCarousel />
            </main>

            {/* Footer */}
            <footer className="w-full mt-24 pb-12 flex flex-col items-center justify-center text-center z-10 relative">
              <div 
                className="text-[40px] md:text-[50px] lg:text-[70px] font-black tracking-tighter uppercase leading-[0.85] mb-6 cursor-pointer flex items-center justify-center h-[80px] md:h-[100px] lg:h-[120px]"
                onMouseEnter={() => setIsFooterHovered(true)}
                onMouseLeave={() => setIsFooterHovered(false)}
              >
                <TumblerLogo isHovered={isFooterHovered} />
              </div>
              <div className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 flex justify-center items-center px-4 w-full text-center">
                <p className="max-w-[90vw] leading-relaxed">
                  FOR BOOKINGS, COLLABORATIONS AND GENERAL INQUIRIES PLEASE EMAIL{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-black hover:text-black/70 transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
            </footer>

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
    </div>
  )
}
