"use client"

import { useState } from "react"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

export default function EditorialPage() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)
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
                onClick={() => {
                  setSelectedIndex(index);
                  setSelectedVideoIndex(0);
                }}
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
              <div className="flex flex-col mb-16 max-w-4xl">
                <span className="text-gray-400 block mb-3 uppercase tracking-widest text-[11px] font-semibold">Project Details</span>
                <span className="leading-relaxed whitespace-pre-wrap font-normal text-[13px] sm:text-sm text-foreground/90">{group.details || "Details coming soon..."}</span>
              </div>

              {/* Media Content */}
              {/* @ts-ignore */}
              {group.showControls ? (
                <div className="flex flex-col gap-4">
                  {/* Main Video */}
                  <div className="w-full aspect-video">
                    {(() => {
                      const img = group.images[selectedVideoIndex];
                      if (!img) return null;
                      const isYoutube = img.includes('youtube.com') || img.includes('youtu.be');
                      let youtubeId = '';
                      let startTime = '';
                      if (isYoutube) {
                        const match = img.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                        if (match) youtubeId = match[1];
                        const timeMatch = img.match(/[?&]t=([0-9]+)s?/);
                        if (timeMatch) startTime = `&start=${timeMatch[1]}`;
                      }
                      return isYoutube ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=0&controls=1&rel=0&showinfo=0&modestbranding=1&playsinline=1${startTime}`}
                          className="w-full h-full shadow-xl"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : null;
                    })()}
                  </div>

                  {/* Thumbnails */}
                  {group.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      {group.images.map((img, i) => {
                        if (i === selectedVideoIndex) return null;
                        
                        const isYoutube = img.includes('youtube.com') || img.includes('youtu.be');
                        let youtubeId = '';
                        let startTime = '';
                        if (isYoutube) {
                          const match = img.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                          if (match) youtubeId = match[1];
                          const timeMatch = img.match(/[?&]t=([0-9]+)s?/);
                          if (timeMatch) startTime = `&start=${timeMatch[1]}`;
                        }

                        return (
                          <div 
                            key={i} 
                            className="w-full aspect-video cursor-pointer relative group" 
                            onClick={() => setSelectedVideoIndex(i)}
                          >
                            <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors" />
                            <iframe
                              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1&controls=1&rel=0&showinfo=0&modestbranding=1&playsinline=1${startTime}`}
                              className="w-full h-full pointer-events-none shadow-md"
                              allow="encrypted-media"
                              allowFullScreen
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 grid-flow-dense">
                  {group.images.map((img, i) => {
                    const isVideo = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.webm') || img.toLowerCase().endsWith('.mov');
                    const isYoutube = img.includes('youtube.com') || img.includes('youtu.be');
                    
                    // Extract youtube video ID and start time for embed
                    let youtubeId = '';
                    let startTime = '';
                    if (isYoutube) {
                      const match = img.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                      if (match) youtubeId = match[1];

                      const timeMatch = img.match(/[?&]t=([0-9]+)s?/);
                      if (timeMatch) startTime = `&start=${timeMatch[1]}`;
                    }

                    let colSpanClass = 'md:col-span-1';
                    let rowSpanClass = 'md:row-span-1';
                    
                    if (group.images.length === 1) {
                      colSpanClass = 'md:col-span-4';
                      if (isYoutube || isVideo) colSpanClass += ' aspect-video';
                    } else if (group.images.length === 3 && (isYoutube || isVideo)) {
                      colSpanClass = i === 0 ? 'md:col-span-4 aspect-video' : 'md:col-span-2 aspect-video';
                      rowSpanClass = 'md:row-span-1';
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
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=0&controls=1&rel=0&showinfo=0&loop=1&playlist=${youtubeId}&modestbranding=1&playsinline=1${startTime}`}
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        ) : isVideo ? (
                          <video
                            src={img}
                            controls
                            loop
                            playsInline
                            className="w-full h-full bg-black object-contain"
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
