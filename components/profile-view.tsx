"use client"

import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"
import { AnimatedLogo } from "@/components/animated-logo"
import { useState, useEffect } from "react"
import { AwardsSection } from "@/components/awards-section"
import { motion, AnimatePresence } from "framer-motion"

const pressArticles = [
  // 2023 - Selected
  { type: "REPORT", publisher: "The Black Academy", desc: "Highlighted in The Black Academy's 2023 Skills Development Program official report.", link: "https://blackacademy.ca/wp-content/themes/wp_tba/docs/TBA-SDP-Report-2023.pdf", linkText: "Read Report" },
  { type: "ROSTER", publisher: "The Black Academy", desc: "Inducted into the 2023 cohort for The Black Academy's Skills Development Program.", link: "https://blackacademy.ca/skills-development-program/sdp-participants/?tab=2023", linkText: "View Roster" },
  { type: "PROFILE", publisher: "OYA Media Group", desc: "Participant in the OYA Media Group ecosystem, recognized for contributions to Black Canadian storytelling.", link: "https://www.oyamediagroup.com/participants#One", linkText: "View Profile" },
  { type: "PHOTOGRAPHY", publisher: "POV Magazine", desc: "Photography featured in POV Magazine's piece on the OYA Media Group.", link: "https://povmagazine.com/oya-media-group/", linkText: "View Photography" },

  // 2024
  { type: "PHOTOGRAPHY", publisher: "LBBOnline", desc: "Photography featured in the coverage of the 'Reclaim The Hoodie' campaign by CEE Centre for Young Black Professionals and Publicis Groupe Canada.", link: "https://lbbonline.com/news/cee-centre-for-young-black-professionals-and-publicis-groupe-canada-reclaim-the-hoodie", linkText: "View Photography" },
  { type: "PHOTOGRAPHY", publisher: "LBBOnline", desc: "Photography featured in coverage of the Publicis Groupe Canada and POV Film Initiative bringing advertising training to BIPOC talent.", link: "https://lbbonline.com/news/The-Publicis-Groupe-Canada-and-POV-Film-Initiative-Bringing-Advertising-Training-to-BIPOC-Talent", linkText: "View Photography" },
  { type: "PHOTOGRAPHY", publisher: "LBBOnline", desc: "Photography featured in coverage of the POV Film and Publicis Groupe Canada launch of their advertising training programme.", link: "https://lbbonline.com/news/POV-Film-and-Publicis-Groupe-Canada-Launch-Advertising-Training-Programme", linkText: "View Photography" },
  { type: "PHOTOGRAPHY", publisher: "LBBOnline", desc: "Photography featured in the article 'Achieving Meaningful DEI Progress at a Time of Uneven Investment'.", link: "https://lbbonline.com/news/Achieving-Meaningful-DEI-Progress-at-a-Time-of-Uneven-Investment", linkText: "View Photography" },

  // 2023
  { type: "FEATURE", publisher: "Black Canadian Creators", desc: "Featured in an exploration of Black Canadian comedy and creative expression in 'Baked Butter Biscuits'.", link: "https://blackcanadiancreators.ca/baked-butter-biscuits-black-canadian-comedy/", linkText: "Read Feature" },
  { type: "FEATURE", publisher: "Snail Mail Media", desc: "Featured in Snail Mail Media for his work on Moongazer.", link: "https://www.snailmailmedia.com/moongazer", linkText: "Read Feature" },

  // 2022
  { type: "PHOTOGRAPHY", publisher: "POV Magazine", desc: "Photography featured in POV Magazine's coverage of documenting the pandemic.", link: "https://povmagazine.com/documenting-the-pandemic/", linkText: "View Photography" },
  { type: "PHOTOGRAPHY", publisher: "POV Magazine", desc: "Photography featured in POV Magazine covering the Hot Docs Forum winners.", link: "https://povmagazine.com/this-land-of-ours-arrest-the-midwife-top-hot-docs-forum-winners/", linkText: "View Photography" },
  { type: "PHOTOGRAPHY", publisher: "CBC News", desc: "Photography featured in CBC's coverage of the National Film Board's racial equity initiatives.", link: "https://www.cbc.ca/news/entertainment/national-film-board-racial-equity-1.6657534", linkText: "View Photography" },

  // 2021
  { type: "AWARD", publisher: "Being Black In Canada", desc: "Awarded the 2021 Canadian Screen Award for Best Direction in a Documentary Series.", link: "https://beingblackincanada.com/black-toronto-winner-best-direction-documentary-series-2021-canadian-screen-awards/", linkText: "Read Announcement" },
  { type: "NEWS", publisher: "Street Voices", desc: "Highlighting the importance of representation with his Canadian Screen Award nomination for directing.", link: "https://streetvoices.ca/news/representation-matters-six-emerging-black-directors-are-nominated-for-a-canadian-screen-award-234", linkText: "Read News" },
  { type: "NOMINATION", publisher: "Academy of Canadian Cinema", desc: "Featured alongside fellow co-directors as a Canadian Screen Award nominee.", link: "https://www.academy.ca/2021/omolola-ajao/", linkText: "View Nomination" },
  { type: "NOMINATION", publisher: "Halifax Black Film Festival", desc: "Coverage of the Canadian Screen Award nomination for 'Being Black in Toronto'.", link: "https://halifaxblackfilm.com/being-black-in-toronto-nominated-at-canadian-screen-awards/", linkText: "Read Announcement" },
  { type: "FESTIVAL", publisher: "Montreal Black Film Festival", desc: "Official selection and premiere at the Montreal Black Film Festival.", link: "https://montrealblackfilm.com/en/event/etre-noir-e-au-canada-2/", linkText: "View Festival" },

  // 2019
  { type: "ALUMNI", publisher: "Being Black In Canada", desc: "Featured as a distinguished 2019 alumni of the Being Black In Canada program.", link: "https://beingblackincanada.com/2019-alumni/", linkText: "View Profile" },
  { type: "PHOTOGRAPHY", publisher: "CBC News", desc: "Photography featured in CBC's 'Absolutely Toronto' 2019 community showcase.", link: "https://www.cbc.ca/news/canada/toronto/community/absolutely-toronto-2019-1.5192331", linkText: "View Photography" },
  { type: "PHOTOGRAPHY", publisher: "CBC Arts", desc: "Photography featured in CBC Arts' coverage of neighborhood champions in Jane and Finch.", link: "https://www.cbc.ca/arts/see-jane-and-finch-through-the-eyes-of-a-neighbourhood-champion-1.5028603", linkText: "View Photography" },
  { type: "PHOTOGRAPHY", publisher: "OYA Media Group", desc: "Original photography featured in the production of 'Mr. Jane and Finch'.", link: "https://www.oyamediagroup.com/original-content/mr-jane-and-finch", linkText: "View Photography" },
]

const PressArticleItem = ({ article, idx }: { article: any, idx: number }) => {
  let borderClass = "border-l-0 border-black/10";
  let padClass = "pl-0";

  if (idx % 4 === 0) {
    borderClass = "border-l-0";
    padClass = "pl-0";
  } else if (idx % 2 === 0) {
    borderClass = "border-l-0 lg:border-l border-black/10";
    padClass = "pl-0 lg:pl-6";
  } else {
    borderClass = "border-l-0 md:border-l border-black/10";
    padClass = "pl-0 md:pl-4 lg:pl-6";
  }

  return (
    <div className={`relative flex flex-col justify-between h-full ${borderClass} ${padClass}`}>
      <div>
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/50 mb-3 flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-black/20"></div>
          {article.type}
        </div>
        <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
          <h4 className="text-2xl font-semibold tracking-wide uppercase leading-[1.1] mb-2 text-black" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>
            {article.publisher}
          </h4>
        </a>
        <p className="text-[12px] leading-relaxed text-black/70 font-medium max-w-sm mb-6">
          {article.desc}
        </p>
      </div>
      <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold tracking-[0.15em] uppercase text-black hover:opacity-60 flex items-center gap-2 w-fit border-b border-black/20 pb-1 mt-auto">
        {article.linkText} <span className="font-sans">↗&#xFE0E;</span>
      </a>
    </div>
  )
}

export function ProfileView() {
  const [showAllPress, setShowAllPress] = useState(false)
  const [activeSection, setActiveSection] = useState<'press' | 'portraits'>('press')
  const [activeBioSection, setActiveBioSection] = useState<'statement' | 'about'>('statement')
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0)

  useEffect(() => {
    // Set to 'about' by default on mobile screens
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setActiveBioSection('about')
    }
  }, [])

  const mobilePortraits = [
    "/projects/IMG_0270.jpeg",
    "/projects/PRO_9325-Edit 2.jpg",
    "/projects/PRO_8342.jpg",
    "/projects/10157E32-F553-4DD4-B336-1D1414F25305.JPG"
  ]

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft
    const width = e.currentTarget.clientWidth
    const index = Math.round(scrollLeft / width)
    if (index !== currentMobileIndex) {
      setCurrentMobileIndex(index)
    }
  }

  const { contact } = siteConfig

  return (
    <div className="w-full relative z-10 flex flex-col min-h-[100dvh] bg-transparent text-black pt-32 lg:pt-48 pb-32">

      {/* Container for constrained width - Widened for Editorial Feel */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
        {/* Back to Homepage Button */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] uppercase text-black/50 hover:text-black transition-colors mb-8 lg:mb-12 w-fit"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:-translate-x-1"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          <span>BACK TO HOMEPAGE</span>
        </Link>

        {/* Bio Section */}
        <div className="flex flex-col w-full" style={{ fontFamily: 'var(--font-hanken-grotesk), sans-serif' }}>

          {/* Bio Toggle Section */}
          <div className="border-l-2 border-black/30 pl-6 lg:pl-12 mb-16 lg:mb-24 max-w-6xl min-h-[200px]">
            <h3 className="text-[11px] lg:text-xs uppercase tracking-[0.25em] font-bold mb-6 flex items-center">
              <span 
                onClick={() => setActiveBioSection('about')} 
                className={`cursor-pointer transition-all duration-300 ${activeBioSection === 'about' ? 'text-black underline decoration-[2px] underline-offset-[6px]' : 'text-black/30 hover:text-black/60'}`}
              >
                ABOUT
              </span>
              <span className="text-black/30 mx-2 lg:mx-3">|</span>
              <span 
                onClick={() => setActiveBioSection('statement')} 
                className={`cursor-pointer transition-all duration-300 ${activeBioSection === 'statement' ? 'text-black underline decoration-[2px] underline-offset-[6px]' : 'text-black/30 hover:text-black/60'}`}
              >
                DIRECTOR'S STATEMENT
              </span>
            </h3>

            <AnimatePresence mode="wait">
              {activeBioSection === 'statement' ? (
                <motion.blockquote
                  key="statement"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-[1.4] text-black/90 font-medium italic"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  "I'm tired of identifying as a 'Black' creative... Please don't get me wrong. I'm Black and I understand that the world views me through this lens. Just because I personally don't agree doesn't change that I'm viewed this way. In my honest opinion, I think 'Blackness' is a crutch in this industry. I find that the 'Black Creator' funds are drying up while identity politics often get in the way of solid storytelling in general. I'm a Canadian Screen Award-winning director. That has nothing to do with my race. If my work features Black actors then so be it. We're all humans looking to tell stories. I'm just a human."
                </motion.blockquote>
              ) : (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-[1.4] text-black/90 font-medium"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  <div className="flex flex-col gap-6">
                    <p>
                      Yvano Wickham-Edwards (professionally known as Yvano Antonio) is a Toronto-born, first-generation Canadian of Guyanese descent. He is an award-winning director, entrepreneur, and photojournalist who has built a career seamlessly blending cinematic realism with profound social impact.
                    </p>
                    <p>
                      He won the <a href="https://www.academy.ca/2021/omolola-ajao/" target="_blank" rel="noopener noreferrer" className="underline decoration-black/30 underline-offset-4 hover:decoration-black hover:bg-black/5 px-1 -mx-1 rounded font-medium transition-all">2021 Canadian Screen Award</a> for Best Direction in a Documentary Series for his work on Being Black in Toronto. His standout contribution to the series, the short film #BLACK, reached young people across the nation, offering a grounded look at the everyday challenges and responsibilities Black youth navigate in the digital age.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recent Collaborators Grid */}
          <div className="w-full mb-16 lg:mb-24 flex flex-col items-start max-w-6xl">
            <h3 className="text-[11px] lg:text-xs uppercase tracking-[0.25em] font-bold text-black/50 mb-10">
              Recent Collaborators
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12 lg:gap-y-16 gap-x-8 lg:gap-12 w-full justify-items-center items-center">
              {[
                "CBC_CBC_Gem_logo_resize_nobg.png",
                "CEE_toronto_nobg.png",
                "InsightProductions_BAS_Logo-scaled.png",
                "NSI_Logo_nobg.png",
                "OYA-Scale-Up-Initiative-Color-White-768x568.png",
                "ObacLogoShadow-2.png",
                "POV_White_nobg.png",
                "FFC_COLOR_TEXT-BLACK_EN.png",
                "images_nobg.png",
                "oya_image-asset.webp"
              ].map((logo, idx) => (
                <div key={idx} className="relative h-[59px] lg:h-[80px] w-full max-w-[149px] lg:max-w-[186px] flex items-center justify-center transition-transform hover:scale-105">
                  <Image src={`/projects/collaborators/${logo}`} alt="Collaborator logo" fill className="object-contain" priority={idx < 5} />
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* FILMOGRAPHY & AWARDS SECTION */}
      <div className="-mt-8">
        <AwardsSection>
          {/* Press Section - Full width to align with other section titles */}
          <div className="w-full px-6 mt-8 lg:mt-12 pt-16 border-t border-black/10">
        <div className="mb-16 lg:mb-24 flex items-center">
          <h3 className="text-3xl md:text-4xl lg:text-[60px] font-semibold tracking-wide uppercase leading-[1.1]" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>
            <span 
              onClick={() => setActiveSection('press')} 
              className={`cursor-pointer transition-all duration-300 ${activeSection === 'press' ? 'text-black underline decoration-[3px] md:decoration-[4px] underline-offset-[12px] md:underline-offset-[16px]' : 'text-black/30 hover:text-black/60'}`}
            >
              PRESS
            </span>
            <span className="text-black/30 mx-2 lg:mx-4">&</span>
            <span 
              onClick={() => setActiveSection('portraits')} 
              className={`cursor-pointer transition-all duration-300 ${activeSection === 'portraits' ? 'text-black underline decoration-[3px] md:decoration-[4px] underline-offset-[12px] md:underline-offset-[16px]' : 'text-black/30 hover:text-black/60'}`}
            >
              PORTRAITS
            </span>
          </h3>
        </div>

        <AnimatePresence mode="wait">
          {activeSection === 'press' ? (
            <motion.div
              key="press-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-16 gap-x-0">
                {pressArticles.slice(0, 4).map((article, idx) => (
                  <PressArticleItem key={`press-${idx}`} article={article} idx={idx} />
                ))}
              </div>

              <AnimatePresence>
                {showAllPress && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden origin-top"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-16 gap-x-0 pt-12 lg:pt-16">
                      {pressArticles.slice(4).map((article, idx) => {
                        const realIdx = idx + 4;
                        return (
                          <motion.div
                            key={`press-more-${realIdx}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
                            className="h-full"
                          >
                            <PressArticleItem article={article} idx={realIdx} />
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* View All Button */}
              <div className="w-full flex justify-center mt-12 mb-8 transform-gpu translate-z-0">
                <button
                  onClick={() => setShowAllPress(!showAllPress)}
                  className="text-xs font-bold tracking-[0.2em] uppercase text-black/50 hover:text-black transition-colors border-b border-black/20 pb-1 outline-none transform-gpu translate-z-0"
                >
                  {showAllPress ? "Show Less" : "View All Press"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="portraits-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* Desktop Portraits */}
              <div className="hidden md:flex w-full gap-4 h-[60vh] lg:h-[80vh] justify-center items-center">
                {mobilePortraits.map((src, i) => (
                  <div 
                    key={i} 
                    className="relative h-full flex-1"
                  >
                    <Image 
                      src={src} 
                      alt={`Portrait ${i + 1}`} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                ))}
              </div>
              
              {/* Mobile Portraits */}
              <div className="md:hidden w-full flex flex-col relative pb-8 group bg-black/5">
                <div 
                  className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
                  onScroll={handleScroll}
                >
                  {mobilePortraits.map((src, i) => (
                    <div key={i} className="min-w-full w-full shrink-0 snap-center relative aspect-[3/4] overflow-hidden flex items-center justify-center">
                      <Image 
                        src={src} 
                        alt={`Portrait ${i + 1}`} 
                        fill 
                        className="object-cover relative z-10" 
                      />
                    </div>
                  ))}
                </div>
                
                {/* UI Indicators */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-20">
                  {mobilePortraits.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentMobileIndex === i ? 'bg-white scale-125' : 'bg-white/50'}`} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        </div>
        </AwardsSection>
      </div>

      {/* Let's Stay In Touch - Stacked and Centered */}
      <div className="w-full px-6 flex flex-col items-center text-center -mt-4 lg:-mt-8 mb-16 lg:mb-24 relative z-20">
          <span className="text-[11px] lg:text-xs uppercase tracking-[0.25em] font-bold text-black/50 mb-8">
            LET'S STAY IN TOUCH
          </span>
          <div className="flex flex-row flex-wrap justify-center items-center gap-6 sm:gap-8">
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-black/40 transition-colors"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            )}
            {siteConfig.social.tiktok && (
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-black/40 transition-colors"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            )}
            {siteConfig.social.twitch && (
              <a
                href={siteConfig.social.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-black/40 transition-colors"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>
              </a>
            )}
            <a
              href={`mailto:${contact.email}`}
              className="text-black hover:text-black/40 transition-colors"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>

    </div>
  )
}
