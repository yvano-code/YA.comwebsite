"use client"

import { useState } from "react"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

export default function LandingPageDemo() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const group = siteConfig.editorial[selectedIndex]

  return (
    <div className="min-h-screen bg-[#F3F4F3] text-black font-sans selection:bg-black selection:text-white pb-24">
      {/* Optional Top Nav to match awwwards-style feel */}
      <nav className="flex items-center justify-between p-6 md:px-12 text-sm font-semibold tracking-wide">
         <div className="text-xl font-black tracking-tighter">Y.</div>
         <div className="hidden md:flex space-x-8">
            <button className="hover:text-gray-500 transition-colors">Explore</button>
            <button className="hover:text-gray-500 transition-colors">Directory</button>
            <button className="hover:text-gray-500 transition-colors">Academy</button>
         </div>
         <div>
            <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">Contact</button>
         </div>
      </nav>

      <main className="px-4 md:px-8 lg:px-12">
        {/* Massive Header Text */}
        <div className="flex flex-col items-center mt-8 md:mt-16 mb-8 md:mb-12 w-full overflow-hidden">
           <h1 className="text-[12vw] md:text-[11vw] leading-[0.85] font-black tracking-tighter text-center uppercase whitespace-nowrap">
             YVANO ANTONIO
           </h1>
           
           {/* Selector matching the avatars below title in reference */}
           <div className="flex flex-wrap justify-center gap-3 mt-10 md:mt-16">
             {siteConfig.editorial.map((item, idx) => (
               <button 
                 key={idx}
                 onClick={() => setSelectedIndex(idx)}
                 className={`px-5 py-2 rounded-full border text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                   selectedIndex === idx 
                     ? "bg-black text-white border-black shadow-lg scale-105" 
                     : "bg-white text-black border-gray-200 hover:border-black hover:bg-gray-50"
                 }`}
               >
                 {item.client}
               </button>
             ))}
           </div>
        </div>

        {/* Big Media Frame */}
        {group && (
          <div className="relative w-full mx-auto aspect-[4/3] md:aspect-[21/9] bg-black rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-700 mt-8">
            
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
                
                // Extra scale to hide youtube chrome if any
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
               
               {/* Center massive text inside frame (like the INDIGO cutout text) */}
               <div className="flex flex-col items-center justify-center transform translate-y-4">
                  <h2 className="text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-white mix-blend-overlay drop-shadow-2xl">
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
          <div className="max-w-4xl mx-auto mt-20 md:mt-32 text-center px-4">
             <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-bold">About {group.client}</div>
             
             <div className="text-lg md:text-2xl leading-relaxed text-gray-800 font-medium">
                {group.details.split('\n\n').filter(p => !p.startsWith('###') && !p.includes('[LINK]')).map((paragraph, i) => (
                  <p key={i} className="mb-6">{paragraph}</p>
                ))}
             </div>
          </div>
        )}

      </main>
    </div>
  )
}
