"use client"

import { siteConfig } from "@/lib/site-config"
import { GoodYuteLogo } from "@/components/animated-logo"
import { useState } from "react"
import { initSensory } from "@/lib/sensory"

export function ProfileView() {
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [playState, setPlayState] = useState<0 | 1 | 2>(0)

  const handleTap = () => {
    initSensory()
    if (playState === 0) {
      setPlayState(1)
    } else if (playState === 1) {
      setPlayState(2)
    } else if (playState === 2) {
      setPlayState(1)
    }
  }

  const handleAnimationComplete = () => {
    setPlayState(2)
  }

  const { contact } = siteConfig
  const isHovered = playState === 1 || isLogoHovered

  return (
    <div className="w-full relative z-10 flex flex-col min-h-[100dvh] bg-transparent text-black pt-32 lg:pt-48 pb-32">

      {/* Container for constrained width - Widened for Editorial Feel */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">

        {/* Interactive Logo Top Leftish */}
        <div
          className="flex items-start justify-start text-[8vw] sm:text-[4vw] lg:text-[2.5vw] cursor-pointer mb-16 lg:mb-24 w-max"
          onPointerDown={handleTap}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <GoodYuteLogo
            isHovered={isHovered}
            onAnimationComplete={handleAnimationComplete}
          />
        </div>

        {/* Bio Section */}
        <div className="flex flex-col w-full" style={{ fontFamily: 'var(--font-hanken-grotesk), sans-serif' }}>
          {/* Opener */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-[1.3] text-black mb-12 max-w-6xl font-medium" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Yvano Wickham-Edwards (professionally known as Yvano Antonio) is a Toronto-born, first-generation Canadian of Guyanese descent. He is an award-winning director, entrepreneur, and photojournalist who built a career using cinematography for social impact. He won the <a href="https://www.academy.ca/2021/omolola-ajao/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/50 transition-colors decoration-1 underline-offset-4 font-semibold">2021 Canadian Screen Award</a> for Best Direction in a Documentary Series for his work on <i>Being Black in Toronto</i>. His standout contribution to the series, the short film <i>#BLACK</i>, reached young people across Canada and was screened in 11 film festivals across North America.
          </h1>

          {/* Director's Statement */}
          <div className="border-l-2 border-black/30 pl-6 lg:pl-12 my-8 lg:my-12 max-w-6xl">
            <h3 className="text-[11px] lg:text-xs uppercase tracking-[0.25em] font-bold text-black/50 mb-6">Director's Statement</h3>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-[1.4] text-black/90 font-medium italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              "I'm tired of identifying as a 'Black' creative... Please don't get me wrong. I'm Black and I understand that the world views me through this lens. Just because I personally don't agree doesn't change that I'm viewed this way. In my honest opinion, I think 'Blackness' is a crutch in this industry. I find that the 'Black Creator' funds are drying up while identity politics often get in the way of solid storytelling in general. I'm a Canadian Screen Award-winning director. That has nothing to do with my race. If my work features Black actors then so be it. We're all humans looking to tell stories. I'm just a human."
            </blockquote>
          </div>

          {/* Middle */}
          <div className="flex flex-col gap-8 mb-16 lg:mb-24">
            <p className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-[1.3] text-black max-w-6xl font-medium" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Yvano’s commitment to generating positive change extends far beyond the lens.
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-[1.3] text-black max-w-6xl font-medium" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Through his work with the CEE Centre for Young Black Professionals, he successfully channeled his skills into targeted campaigns and towards empowering the next generation of creators. As an entrepreneur and versatile director, his portfolio spans high-end commercials, brand films, and music television.
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-[1.3] text-black max-w-6xl font-medium" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              He also served as the director for the top 10 countdown web series <i>Clubhouse Jamz</i>, collaborating with famous acts like Kranium, Anders, Charmaine, and 4Korners. Expanding his entrepreneurial footprint, he is now venturing into narrative fiction as the co-creator and director of the upcoming comedy series <i>Baked Butter Biscuits</i>.
            </p>
          </div>

          {/* Closer section removed */}
        </div>
      </div>

      {/* Massive Social Links Footer */}
      <div className="w-full mt-24 lg:mt-32 flex flex-col items-center text-center px-6">
        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-black/50 mb-12">LET'S STAY IN TOUCH</span>

        <div className="flex flex-row flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
          {siteConfig.social.instagram && (
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-black/40 transition-colors"
            >
              <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          )}
          {siteConfig.social.tiktok && (
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-black/40 transition-colors"
            >
              <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
          )}
          {siteConfig.social.twitch && (
            <a
              href={siteConfig.social.twitch}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-black/40 transition-colors"
            >
              <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>
            </a>
          )}
          <a
            href={`mailto:${contact.email}`}
            className="text-black hover:text-black/40 transition-colors"
          >
            <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
        </div>
      </div>

    </div>
  )
}
