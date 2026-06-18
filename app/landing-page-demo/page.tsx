"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export default function LandingPageDemo() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const group = siteConfig.editorial[selectedIndex]

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
        {/* Editorial Section */}
        <section className="px-4 md:px-8 lg:px-12 pt-8 md:pt-12">
          
          {/* Selector matching the avatars below title in reference */}
          <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mr-4">Editorial Projects</span>
            {siteConfig.editorial.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`px-6 py-2.5 rounded-full border text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  selectedIndex === idx 
                    ? "bg-black text-white border-black shadow-lg" 
                    : "bg-white text-black border-gray-200 hover:border-black hover:bg-gray-50"
                }`}
              >
                {item.client}
              </button>
            ))}
          </div>

          {/* Big Media Frame */}
          {group && (
            <div className="relative w-full mx-auto aspect-[4/3] md:aspect-[21/9] bg-black rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-700">
              
              {/* Background Media */}
              {(() => {
                const img = group.images[0];
                if (!img) return <div className="absolute inset-0 bg-gray-900" />;
                
                const isYoutube = img.includes('youtube.com') || img.includes('youtu.be');
                const isVideo = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.mov') || img.toLowerCase().endsWith('.webm');
                
                if (isYoutube) {
                  let youtubeId = '';
                  const match = img.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                  if (match) youtubeId = match[1];
                  
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=${youtubeId}&playsinline=1`}
                      className="absolute inset-0 w-full h-full scale-[1.3] md:scale-[1.15] pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-1000"
                      allow="autoplay; encrypted-media"
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
                       className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000"
                     />
                   )
                } else {
                   return (
                     <Image 
                       src={img}
                       alt={group.client}
                       fill
                       className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000"
                       priority
                     />
                   )
                }
              })()}

              {/* Overlays inside the frame */}
              <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between text-white z-10 pointer-events-none">
                 {/* Top Bar inside frame */}
                 <div className="flex justify-between items-start w-full">
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                      The Maker
                    </div>
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                      Contact
                    </div>
                 </div>
                 
                 {/* Center massive text inside frame */}
                 <div className="flex flex-col items-center justify-center transform translate-y-4">
                    <h2 className="text-[15vw] md:text-[10vw] font-black tracking-tighter leading-none text-white mix-blend-overlay drop-shadow-2xl">
                      {group.client.toUpperCase()}
                    </h2>
                 </div>

                 {/* Bottom center inside frame */}
                 <div className="flex justify-center w-full">
                    <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      <span className="animate-pulse">[ || ]</span>
                      <span>With sound</span>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* Details Section */}
          {group && group.details && (
            <div className="w-full mt-10 md:mt-12 text-center">
               <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-bold">About {group.client}</div>
               
               <div className="text-[13px] md:text-[14px] leading-loose text-gray-700 font-medium w-full mx-auto">
                  {group.details.split('\n\n').filter(p => !p.startsWith('###') && !p.includes('[LINK]')).map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
               </div>
            </div>
          )}
        </section>

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

        {/* Accreditations Section */}
        <section className="mt-16 md:mt-20 px-6 md:px-12 pb-12">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-6">
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Accreditations</h3>
            <Link href="/imdb" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity pb-1 w-max">View Full IMDb ↗</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {siteConfig.awards.map((award, idx) => (
              <div key={idx} className="group cursor-default relative">
                <div className="absolute -left-4 top-1 w-1.5 h-1.5 rounded-full bg-[#E05D4C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#E05D4C] transition-colors duration-300 md:hidden"></div>
                  {award.status}
                </div>
                <h4 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-[1.1] mb-4 group-hover:text-[#E05D4C] transition-colors duration-300">
                  {award.title}
                </h4>
                <p className="text-[12px] md:text-[13px] leading-relaxed text-gray-600 font-medium max-w-sm">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Filmography Horizontal Scroll Section */}
        <section className="mt-8 md:mt-12 overflow-hidden border-t border-black/10 pt-16 md:pt-24 mb-12">
          <div className="px-6 md:px-12 mb-12 md:mb-16 flex items-end justify-between">
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Filmography</h3>
            <div className="flex gap-4 items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hidden md:block">Scroll to explore</span>
              <svg className="w-4 h-4 text-gray-400 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-4 md:gap-6 px-6 md:px-12 pb-12 snap-x snap-mandatory hide-scrollbar">
            {siteConfig.imdbCredits.map((credit, idx) => (
              <div key={idx} className="flex-none w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] snap-center group relative bg-gray-100 hover:bg-black transition-colors duration-500 rounded-3xl p-8 flex flex-col justify-between min-h-[280px] md:min-h-[320px] shadow-sm hover:shadow-2xl">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-500 transition-colors duration-500">{credit.year}</span>
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] uppercase bg-black/5 group-hover:bg-white/10 text-black group-hover:text-white px-3 py-1 rounded-full transition-colors duration-500">{credit.type}</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-[1.1] text-black group-hover:text-white transition-colors duration-500 mb-4">
                    {credit.title}
                  </h4>
                  {credit.note && (
                    <p className="text-[10px] font-bold tracking-widest text-[#E50914] uppercase mb-4">{credit.note}</p>
                  )}
                </div>
                
                <div className="pt-6 border-t border-black/10 group-hover:border-white/20 transition-colors duration-500">
                  <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-gray-400 group-hover:text-gray-500 transition-colors duration-500 mb-2">Role</p>
                  <p className="text-[13px] md:text-[14px] font-extrabold text-black group-hover:text-white transition-colors duration-500">
                     {credit.roles.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Massive Name Footer */}
      <footer className="w-full mt-24 md:mt-40 pb-8 relative overflow-hidden flex flex-col items-center">
        <div className="w-full flex justify-center relative">
          {/* Massive Name */}
          <h2 className="text-[15vw] md:text-[15.5vw] font-black tracking-tighter text-[#E50914] leading-[0.75] whitespace-nowrap scale-y-[1.35] origin-bottom select-all ml-[-1vw]">
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
