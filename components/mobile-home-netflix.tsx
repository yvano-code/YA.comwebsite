"use client"

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'

export function MobileHomeNetflix() {
  const allImages = useMemo(() => {
    // Helper to check if a file is an image
    const isImage = (src: string) => {
      if (!src) return false;
      const lower = src.toLowerCase();
      return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp') || lower.includes('image.tmdb.org');
    };

    // Gather all valid images from projects
    const projectImages = siteConfig.projects
      .map(p => p.image)
      .filter(isImage);

    // Gather images from the editorial section to add more variety
    const editorialImages = siteConfig.editorial
      .flatMap(e => e.images || [])
      .filter(isImage);

    const combinedImages = [...projectImages, ...editorialImages];

    // Get unique images only
    return combinedImages.filter((v, i, a) => a.indexOf(v) === i) as string[];
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (allImages.length <= 1) return;
    
    // Switch images every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev >= allImages.length - 1 ? 0 : prev + 1))
    }, 3000)
    
    return () => clearInterval(intervalId)
  }, [allImages.length])

  if (allImages.length === 0) return null;

  return (
    <div className="w-full h-[100dvh] relative bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Contained Slideshow Box (9:16 Portrait) */}
      <div 
        className="relative bg-[#111] overflow-hidden rounded-xl border border-white/10 shadow-2xl mx-auto flex-shrink-0"
        style={{
          width: '90vw',
          maxWidth: '450px',
          aspectRatio: '9 / 16',
          maxHeight: '80dvh'
        }}
      >
        {allImages.map((imgSrc, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div 
              key={imgSrc}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 20 : 0,
                transition: 'opacity 1.5s ease-in-out',
                WebkitTransition: 'opacity 1.5s ease-in-out',
                willChange: 'opacity'
              }}
            >
              <img
                src={imgSrc}
                alt={`Slide ${index}`}
                loading={index === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 6s linear',
                  WebkitTransition: '-webkit-transform 6s linear',
                  willChange: 'transform'
                }}
              />
            </div>
          )
        })}
      </div>

    </div>
  )
}
