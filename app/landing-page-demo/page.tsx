"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export default function LandingPageDemo() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

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
              <h3 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase">FILM & TELEVISION | MUSIC VIDEO | COMMERCIAL | LIVE BROADCAST</h3>
              <p className="text-[11px] md:text-[13px] font-bold tracking-[0.1em] uppercase text-gray-500 mt-1 md:mt-2">Selected Filmography</p>
            </div>
            <Link href="/film-tv" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity border-b border-black pb-1 hidden sm:block">View All Projects ↗</Link>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto gap-6 md:gap-12 px-6 md:px-12 pb-8 md:pb-12 snap-x snap-mandatory hide-scrollbar">
            {siteConfig.projects.map((project, idx) => (
              <div key={idx} className="flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center group">
                <div 
                  className={`block relative aspect-[16/9] bg-black rounded-2xl md:rounded-[2rem] overflow-hidden mb-6 transition-transform duration-500 shadow-xl ${playingVideo !== idx ? 'group-hover:scale-[1.02] cursor-pointer' : ''}`}
                  onClick={(e) => {
                    if (project.href && playingVideo !== idx) {
                      e.preventDefault();
                      setPlayingVideo(idx);
                    }
                  }}
                >
                  {playingVideo === idx && project.href ? (
                    (() => {
                      const isYoutube = project.href.includes('youtube.com') || project.href.includes('youtu.be');
                      const isVimeo = project.href.includes('vimeo.com');
                      
                      if (isYoutube) {
                        let youtubeId = '';
                        const match = project.href.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                        if (match) youtubeId = match[1];
                        return (
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full border-0 z-30"
                          ></iframe>
                        );
                      }

                      if (isVimeo) {
                        const vimeoMatch = project.href.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
                        if (vimeoMatch) {
                          const vimeoId = vimeoMatch[1];
                          const vimeoHash = vimeoMatch[2];
                          const vimeoSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1${vimeoHash ? `&h=${vimeoHash}` : ''}`;
                          return (
                            <iframe
                              src={vimeoSrc}
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full border-0 z-30"
                            ></iframe>
                          );
                        }
                      }

                      return (
                        <video 
                          src={project.href} 
                          controls
                          autoPlay 
                          className="absolute inset-0 w-full h-full object-cover z-30"
                        />
                      );
                    })()
                  ) : project.image || project.href ? (
                    (() => {
                      const img = project.image || project.href;
                      const isYoutube = img.includes('youtube.com') || img.includes('youtu.be');
                      const isVideo = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.mov');
                      
                      let resolvedSrc = img;
                      if (isYoutube) {
                        let youtubeId = '';
                        const imgMatch = img.match(/img\.youtube\.com\/vi\/([^/]+)/);
                        if (imgMatch) {
                          youtubeId = imgMatch[1];
                        } else {
                          const match = img.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                          if (match) youtubeId = match[1];
                        }
                        resolvedSrc = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
                      }

                      return isVideo ? (
                        <video 
                          src={resolvedSrc} 
                          autoPlay 
                          muted 
                          loop 
                          playsInline 
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      ) : (
                        <Image 
                          src={resolvedSrc}
                          alt={project.title}
                          fill
                          unoptimized={true}
                          className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105"
                        />
                      );
                    })()
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs tracking-widest font-bold">
                      NO MEDIA
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  {playingVideo !== idx && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#E50914] group-hover:border-[#E50914] transition-all duration-500 transform group-hover:scale-110">
                        <svg className="w-4 h-4 md:w-6 md:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Outside */}
                <div className="px-2 mt-4">
                  <h4 className="text-[13px] md:text-[15px] font-bold tracking-widest uppercase mb-3 text-black">{project.title}</h4>
                  {project.subtitle && (
                    <p className="text-[10px] md:text-[11px] leading-relaxed text-gray-500 font-medium uppercase tracking-wide mb-4">{project.subtitle}</p>
                  )}
                  {project.credits && project.credits.length > 0 && (
                    <div className="flex flex-col gap-2 border-l-2 border-black/10 pl-4 mt-2">
                      {project.credits.map((credit, i) => (
                        <div key={i} className="text-[10px] md:text-[11px] tracking-[0.05em]">
                          <span className="font-bold text-gray-400 uppercase mr-2">{credit.label}:</span>
                          <span className="text-gray-800 font-medium uppercase">{credit.value}</span>
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

          {/* Laurels Banner Images */}
          <div className="w-full flex flex-col items-center pt-8 pb-8 px-2 md:px-4 gap-8 md:gap-12">
            <Image 
              src="/projects/bbt_laurels.webp"
              alt="Festival Laurels Row 1"
              width={2000}
              height={500}
              unoptimized={true}
              className="w-full h-auto object-contain mix-blend-multiply opacity-90"
            />
            <Image 
              src="/projects/official_selection.jpg"
              alt="Official Selection"
              width={2000}
              height={500}
              unoptimized={true}
              className="w-full h-auto object-contain mix-blend-multiply opacity-90 scale-95"
            />
          </div>
        </section>
      </main>

      {/* Massive Name Footer */}
      <footer className="w-full mt-24 md:mt-40 pb-12 relative flex flex-col items-center overflow-hidden">
        <div className="w-full flex justify-center relative pt-8">
          {/* Massive Name */}
          <h2 className="text-[10.5vw] md:text-[11vw] lg:text-[11.5vw] font-black tracking-tighter text-[#E50914] leading-none whitespace-nowrap text-center px-4">
            YVANO ANTONIO.
          </h2>

          {/* Overlapping Blurb */}
          <div className="absolute top-0 md:top-2 right-4 md:right-8 lg:right-[4%] z-10 text-right md:text-left opacity-60 hover:opacity-100 transition-opacity duration-300">
            <p className="text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] uppercase tracking-[0.1em] font-extrabold text-black md:whitespace-nowrap leading-relaxed max-w-[200px] md:max-w-none ml-auto">
              For bookings, collaborations and general inquiries please email <br className="md:hidden" />
              <a href="mailto:yvanoantonio@protonmail.com" className="text-black hover:text-[#E50914] transition-colors underline decoration-2 underline-offset-4 decoration-black/40 hover:decoration-[#E50914]">yvanoantonio@protonmail.com</a>
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
