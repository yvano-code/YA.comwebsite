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
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] tracking-tight leading-[1.3] text-black mb-12 max-w-6xl font-medium" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Yvano Wickham-Edwards (professionally known as Yvano Antonio) is a Toronto-born, first-generation Canadian of Guyanese descent. He is an award-winning director, entrepreneur, and photojournalist who has built a career seamlessly blending cinematic realism with profound social impact. He won the <a href="https://www.academy.ca/2021/omolola-ajao/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/50 transition-colors decoration-1 underline-offset-4 font-semibold">2021 Canadian Screen Award</a> for Best Direction in a Documentary Series for his work on <i>Being Black in Toronto</i>. His standout contribution to the series, the short film <i>#BLACK</i>, reached young people across the nation, offering a grounded look at the everyday challenges and responsibilities Black youth navigate in the digital age.
          </h1>
          
          {/* Middle */}
          <p className="text-lg sm:text-xl lg:text-[22px] text-black/80 leading-[1.7] lg:leading-[1.8] font-normal max-w-5xl mb-16 lg:mb-24">
            Yvano’s commitment to generating positive change extends far beyond the lens. Through his work with the CEE Centre for Young Black Professionals, he successfully transferred his creative skills toward making tangible community impacts, empowering the next generation of creators. As an entrepreneur and versatile director, his portfolio spans high-end commercials, brand films, and music television. He served as the director for the top 10 countdown web series <i>Clubhouse Jamz</i>, collaborating with famous acts like Kranium, Anders, Charmaine, and 4Korners. Expanding his entrepreneurial footprint, he is now venturing into narrative fiction as the co-creator and director of the upcoming comedy series <i>Baked Butter Biscuits</i>.
          </p>

          {/* Director's Statement */}
          <div className="border-l-2 border-black/30 pl-6 lg:pl-12 my-8 lg:my-12 max-w-6xl">
            <h3 className="text-[11px] lg:text-xs uppercase tracking-[0.25em] font-bold text-black/50 mb-6">Director's Statement</h3>
            <blockquote className="text-2xl sm:text-3xl lg:text-[38px] tracking-tight leading-[1.4] text-black/90 font-medium italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              "I'm tired of identifying as a 'Black' creative... Please don't get me wrong. I'm Black and I understand that the world views me through this lens. Just because I personally don't agree doesn't change that I'm viewed this way. In my honest opinion, I think 'Blackness' is a crutch in this industry. I find that the 'Black Creator' funds are drying up while identity politics often get in the way of solid storytelling in general. I'm a Canadian Screen Award-winning director. That has nothing to do with my race. If my work features Black actors then so be it. We're all humans looking to tell stories. I'm just a human."
            </blockquote>
          </div>

          {/* Closer */}
          <p className="text-lg sm:text-xl lg:text-[22px] text-black/80 leading-[1.7] lg:leading-[1.8] font-normal max-w-5xl mt-16 lg:mt-24">
            Ultimately, Yvano Antonio continues to craft compelling visual stories that push boundaries. Whether he is directing a national campaign, mentoring young professionals, or developing a new television series, his focus remains firmly on authentic human experiences and the universal power of solid storytelling.
          </p>
        </div>
      </div>

      {/* Massive Social Links Footer */}
      <div className="w-full mt-32 lg:mt-48 flex flex-col items-center text-center px-6">
        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-black/50 mb-12">Connect On</span>
        
        <div className="flex flex-col items-center gap-4">
          {siteConfig.social.instagram && (
            <a 
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-6xl sm:text-8xl lg:text-[140px] font-medium tracking-tight hover:text-black/40 transition-colors leading-[0.9]"
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              Instagram
            </a>
          )}
          {siteConfig.social.tiktok && (
            <a 
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-6xl sm:text-8xl lg:text-[140px] font-medium tracking-tight hover:text-black/40 transition-colors leading-[0.9]"
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              TikTok
            </a>
          )}
          <a 
            href={`mailto:${contact.email}`}
            className="text-6xl sm:text-8xl lg:text-[140px] font-medium tracking-tight hover:text-black/40 transition-colors leading-[0.9]"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            Email
          </a>
        </div>
      </div>

    </div>
  )
}
