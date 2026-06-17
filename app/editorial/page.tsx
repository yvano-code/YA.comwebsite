"use client"

import { useState } from "react"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

export default function EditorialPage() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const group = siteConfig.editorial[selectedIndex]

  return (
    <div className="w-full bg-background min-h-[calc(100vh-200px)] text-foreground pt-8 pb-32">
      <div className="mx-auto w-full px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/5 flex flex-col">
          <div className="flex flex-col space-y-4 text-sm tracking-wide mt-2">
            {siteConfig.editorial.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`text-left hover:opacity-70 transition-opacity ${
                  selectedIndex === index ? "font-bold" : "font-normal"
                }`}
              >
                {item.client}
              </button>
            ))}
          </div>
          
          {/* Optional bottom links if needed, but not required by siteConfig */}
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col">
          {group && (
            <div className="w-full flex flex-col animate-in fade-in duration-500">
              {/* Meta Header */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 text-xs sm:text-sm font-semibold tracking-wide">
                <div className="md:col-span-2">
                  <span className="text-gray-400 block mb-1">Client:</span>
                  <span className="underline decoration-1 underline-offset-4 uppercase">{group.client}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-400 block mb-1">Project Details:</span>
                  <span className="leading-relaxed whitespace-pre-wrap font-normal">{group.details || "Details coming soon..."}</span>
                </div>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 grid-flow-dense">
                {group.images.map((img, i) => {
                  const isVideo = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.webm');
                  const isYoutube = img.includes('youtube.com') || img.includes('youtu.be');
                  
                  // Extract youtube video ID for embed
                  let youtubeId = '';
                  if (isYoutube) {
                    const match = img.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                    if (match) youtubeId = match[1];
                  }

                  let colSpanClass = 'md:col-span-1';
                  let rowSpanClass = 'md:row-span-1';
                  
                  if (group.images.length === 1) {
                    colSpanClass = 'md:col-span-4';
                    if (isYoutube || isVideo) colSpanClass += ' aspect-video';
                  } else if (isYoutube) {
                    colSpanClass = 'md:col-span-3 aspect-video';
                    rowSpanClass = 'md:row-span-2';
                  } else if (isVideo) {
                    colSpanClass = 'md:col-span-4';
                  } else if (img.includes('S3 Ep 1 - 8') || img.includes('DSC00393.jpg')) {
                    // Try to guess which ones are vertical to fit best
                    rowSpanClass = 'md:row-span-2';
                  } else if (i === 0 && !isYoutube && !isVideo) {
                    colSpanClass = 'md:col-span-2';
                  }

                  return (
                    <div 
                      key={i} 
                      className={`relative w-full h-full min-h-[250px] ${colSpanClass} ${rowSpanClass}`}
                    >
                      {isYoutube ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=${youtubeId}&modestbranding=1&playsinline=1`}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : isVideo ? (
                        <video
                          src={img}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image 
                          src={img} 
                          alt={`${group.client} ${i + 1}`}
                          width={1200}
                          height={1200}
                          className="w-full h-full object-cover"
                          priority={true}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
