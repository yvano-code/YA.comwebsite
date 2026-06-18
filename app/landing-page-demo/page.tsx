"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

// Elegant SVG Laurel Wreath Component
const LaurelWreath = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 20.324 81.298 C 12.384 66.82 12.871 49.337 20.573 34.258 C 21.905 31.652 25.109 30.601 27.714 31.933 C 30.32 33.265 31.371 36.468 30.039 39.074 C 23.957 50.985 23.518 64.912 29.627 75.986 C 30.707 77.946 29.988 80.407 28.028 81.488 C 26.068 82.568 23.606 81.849 22.526 79.889 L 20.324 81.298 Z" />
    <path d="M 79.676 81.298 C 87.616 66.82 87.129 49.337 79.427 34.258 C 78.095 31.652 74.891 30.601 72.286 31.933 C 69.68 33.265 68.629 36.468 69.961 39.074 C 76.043 50.985 76.482 64.912 70.373 75.986 C 69.293 77.946 70.012 80.407 71.972 81.488 C 73.932 82.568 76.394 81.849 77.474 79.889 L 79.676 81.298 Z" />
    <path d="M 12.56 61.944 C 4.604 53.649 3.013 41.252 8.358 31.066 C 9.697 28.514 12.923 27.525 15.474 28.864 C 18.026 30.203 19.014 33.429 17.675 35.98 C 13.565 43.81 14.887 53.473 21.053 59.904 C 22.955 61.887 22.868 65.006 20.885 66.908 C 18.903 68.81 15.784 68.723 13.882 66.74 L 12.56 61.944 Z" />
    <path d="M 87.44 61.944 C 95.396 53.649 96.987 41.252 91.642 31.066 C 90.303 28.514 87.077 27.525 84.526 28.864 C 81.974 30.203 80.986 33.429 82.325 35.98 C 86.435 43.81 85.113 53.473 78.947 59.904 C 77.045 61.887 77.132 65.006 79.115 66.908 C 81.097 68.81 84.216 68.723 86.118 66.74 L 87.44 61.944 Z" />
    <path d="M 23.362 39.851 C 18.256 29.414 21.049 16.598 30.407 8.94 C 32.545 7.189 35.69 7.495 37.441 9.633 C 39.191 11.771 38.885 14.916 36.747 16.666 C 29.435 22.651 27.234 32.748 31.255 40.966 C 32.41 43.327 31.42 46.166 29.059 47.32 C 26.699 48.475 23.86 47.485 22.705 45.124 L 23.362 39.851 Z" />
    <path d="M 76.638 39.851 C 81.744 29.414 78.951 16.598 69.593 8.94 C 67.455 7.189 64.31 7.495 62.559 9.633 C 60.809 11.771 61.115 14.916 63.253 16.666 C 70.565 22.651 72.766 32.748 68.745 40.966 C 67.59 43.327 68.58 46.166 70.941 47.32 C 73.301 48.475 76.14 47.485 77.295 45.124 L 76.638 39.851 Z" />
    <path d="M 37.601 23.952 C 37.653 12.316 45.922 2.308 57.347 0.05 C 60.038 -0.48 62.597 1.298 63.126 3.989 C 63.655 6.68 61.877 9.238 59.186 9.767 C 50.141 11.554 43.514 19.569 43.473 28.847 C 43.46 31.597 41.218 33.816 38.468 33.803 C 35.718 33.79 33.498 31.548 33.511 28.798 L 37.601 23.952 Z" />
    <path d="M 62.399 23.952 C 62.347 12.316 54.078 2.308 42.653 0.05 C 39.962 -0.48 37.403 1.298 36.874 3.989 C 36.345 6.68 38.123 9.238 40.814 9.767 C 49.859 11.554 56.486 19.569 56.527 28.847 C 56.54 31.597 58.782 33.816 61.532 33.803 C 64.282 33.79 66.502 31.548 66.489 28.798 L 62.399 23.952 Z" />
    <circle cx="50" cy="92" r="5" />
    <path d="M 43 92 Q 50 98 57 92" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

export default function LandingPageDemo() {

  return (
    <div className="min-h-screen bg-[#F3F4F3] text-black selection:bg-black selection:text-white pb-24">
      {/* Navigation matching Awwwards, but using real links */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-8 text-sm font-semibold tracking-wide">
         <Link href="/" className="text-3xl font-black tracking-tighter">YA.</Link>
         <div className="hidden lg:flex items-center space-x-10">
           {siteConfig.nav.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href}
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
           ))}
         </div>
         <div>
            <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition">Contact</Link>
         </div>
      </nav>

      <main>
        {/* Editorial Section Removed */}

        {/* Film & TV Horizontal Scroll Section */}
        <section className="mt-20 md:mt-24 overflow-hidden">
          <div className="px-6 md:px-12 mb-8 md:mb-10 flex items-end justify-between">
            <div className="flex flex-col">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Film & TV</h3>
              <p className="text-[11px] md:text-[13px] font-bold tracking-[0.1em] uppercase text-gray-500 mt-1 md:mt-2">Selected Filmography</p>
            </div>
            <Link href="/film-tv" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity border-b border-black pb-1 hidden sm:block">View All Projects ↗</Link>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto gap-6 md:gap-12 px-6 md:px-12 pb-8 md:pb-12 snap-x snap-mandatory hide-scrollbar">
            {siteConfig.projects.map((project, idx) => (
              <div key={idx} className="flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center group">
                <div className="relative aspect-[16/9] bg-black rounded-2xl md:rounded-[2rem] overflow-hidden mb-6 shadow-xl">
                  {project.image || project.href ? (
                    (() => {
                      const img = project.image || project.href;
                      const isYoutube = img.includes('youtube.com') || img.includes('youtu.be');
                      const isVideo = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.mov');
                      
                      if (isYoutube) {
                        let youtubeId = '';
                        const match = img.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                        if (match) youtubeId = match[1];
                        return (
                          <Image 
                            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                            alt={project.title}
                            fill
                            unoptimized={true}
                            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                          />
                        )
                      } else if (isVideo) {
                         return (
                           <video 
                             src={img} 
                             autoPlay 
                             muted 
                             loop 
                             playsInline 
                             className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                           />
                         )
                      } else {
                         return (
                           <Image 
                             src={img}
                             alt={project.title}
                             fill
                             unoptimized={true}
                             className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                           />
                         )
                      }
                    })()
                  ) : (
                    <div className="absolute inset-0 bg-gray-800" />
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                       <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex flex-col">
                  <h4 className="text-[13px] md:text-[15px] font-bold tracking-widest uppercase mb-3 text-black">{project.title}</h4>
                  {project.subtitle && (
                    <p className="text-[12px] md:text-[13px] leading-relaxed text-gray-500 font-medium mb-4">{project.subtitle}</p>
                  )}
                  {project.credits && project.credits.length > 0 && (
                    <div className="flex flex-col gap-2 border-l-2 border-black/10 pl-4 mt-2">
                      {project.credits.slice(0, 3).map((credit, i) => (
                        <div key={i} className="text-[10px] md:text-[11px] tracking-[0.05em]">
                          <span className="font-bold text-gray-400 uppercase mr-2">{credit.label}:</span>
                          <span className="text-gray-800 font-medium">{credit.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filmography Horizontal Scroll Section */}
        <section className="mt-16 md:mt-20 overflow-hidden mb-12">
          <div className="px-6 md:px-12 mb-12 md:mb-16 flex items-end justify-between">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Filmography</h3>
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
            {siteConfig.imdbCredits.map((credit, idx) => (
              <div key={idx} className="flex-none w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] snap-center group relative bg-black transition-all duration-500 rounded-3xl overflow-hidden p-8 flex flex-col justify-between min-h-[300px] md:min-h-[380px] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer border border-white/5">
                
                {/* Image Background */}
                {credit.image && (
                  <div className="absolute inset-0 w-full h-full z-0">
                    <Image 
                      src={credit.image}
                      alt={credit.title}
                      fill
                      unoptimized={true}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Only a bottom and top gradient for text legibility, no dark overlay across the whole image */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">{credit.year}</span>
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] uppercase bg-white/10 text-white px-3 py-1 rounded-full">{credit.type}</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-[1.1] text-white group-hover:text-[#E50914] transition-colors duration-500 mb-4 drop-shadow-md">
                    {credit.title}
                  </h4>
                  {credit.note && (
                    <p className="text-[10px] font-bold tracking-widest text-[#E50914] uppercase mb-4">{credit.note}</p>
                  )}
                </div>
                
                <div className="relative z-10 pt-6 border-t border-white/20">
                  <p className="text-[13px] md:text-[14px] font-extrabold text-white">
                     {credit.roles.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accreditations Section */}
        <section className="mt-8 md:mt-12 px-6 md:px-12 pb-12 border-t border-black/10 pt-16 md:pt-24">
          <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">Accreditations</h3>
              <p className="text-[13px] md:text-[15px] font-medium leading-relaxed max-w-2xl text-gray-700">
                {siteConfig.accreditations}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {siteConfig.awards.map((award, idx) => {
              const isCSA = award.title.includes("Canadian Screen Award");
              
              return (
                <div key={idx} className={`group cursor-default relative ${isCSA ? 'md:-mt-2' : ''}`}>
                  {isCSA && (
                    <div className="absolute -inset-6 -z-10 bg-[#E05D4C]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"></div>
                  )}
                  
                  {!isCSA && (
                    <div className="absolute -left-4 top-1 w-1.5 h-1.5 rounded-full bg-[#E05D4C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
                  )}

                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 flex items-center gap-2">
                    {isCSA ? (
                      <div className="flex items-center gap-2 text-[#E05D4C] w-full">
                         <div className="relative w-8 h-8 flex-shrink-0 animate-pulse">
                           <LaurelWreath className="w-full h-full drop-shadow-sm" />
                         </div>
                         <span className="tracking-[0.3em] font-black">{award.status}</span>
                      </div>
                    ) : (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#E05D4C] transition-colors duration-300 md:hidden"></div>
                        {award.status}
                      </>
                    )}
                  </div>
                  
                  <h4 className={`text-xl md:text-2xl font-black tracking-tight uppercase leading-[1.1] mb-4 transition-colors duration-300 ${isCSA ? 'text-[#E05D4C]' : 'group-hover:text-[#E05D4C]'}`}>
                    {award.title}
                  </h4>
                  
                  <p className={`text-[12px] md:text-[13px] leading-relaxed font-medium max-w-sm ${isCSA ? 'text-gray-800' : 'text-gray-600'}`}>
                    {award.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Massive Name Footer */}
      <footer className="w-full mt-24 md:mt-40 pb-8 relative overflow-hidden flex flex-col items-center">
        <div className="w-full flex justify-center relative">
          {/* Massive Name */}
          <h2 className="text-[11.5vw] md:text-[12vw] lg:text-[12.5vw] font-black tracking-tighter text-[#E50914] leading-[0.75] whitespace-nowrap scale-y-[1.35] origin-bottom text-center px-4">
            YVANO ANTONIO.
          </h2>

          {/* Overlapping Blurb */}
          <div className="absolute top-[5%] md:top-[12%] right-4 md:right-8 lg:right-[3%] z-10 text-right md:text-left">
            <p className="text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] uppercase tracking-[0.1em] font-extrabold text-[#111] md:whitespace-nowrap leading-relaxed max-w-[200px] md:max-w-none ml-auto drop-shadow-md">
              For bookings, collaborations and general inquiries please email <br className="md:hidden" />
              <a href="mailto:yvanoantonio@protonmail.com" className="text-black hover:text-white transition-colors underline decoration-2 underline-offset-4 decoration-black hover:decoration-white">yvanoantonio@protonmail.com</a>
            </p>
          </div>
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
  )
}
