"use client"

import { useRef } from "react"
import { useScroll, motion, useTransform, useSpring } from "framer-motion"
import { AnimatedLogo } from "@/components/animated-logo"
import { FilmCarousel } from "@/components/film-carousel"
import { AccordionCarousel } from "@/components/accordion-carousel"
import { siteConfig } from "@/lib/site-config"
import Image from "next/image"
import Link from "next/link"

export default function HomePage2() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Track scroll for the hero logo specifically
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Fade and warp the logo away
  const smoothHeroScroll = useSpring(heroScroll, { stiffness: 100, damping: 30 })
  const navOpacity = useTransform(smoothHeroScroll, [0, 0.1], [1, 0])
  const heroOpacity = useTransform(smoothHeroScroll, [0.05, 0.15], [1, 0])
  const contentOpacity = useTransform(smoothHeroScroll, [0.1, 0.4], [0, 1])
  
  return (
    <div className="w-full relative">
      {/* ── HERO SCROLL TRACK ── */}
      <div ref={heroRef} className="absolute top-0 left-0 w-full h-[150vh] pointer-events-none z-0" />

      {/* ── FIXED HERO OVERLAY ── */}
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        style={{ opacity: heroOpacity }}
      >
        <motion.nav 
          style={{ opacity: navOpacity }}
          className="absolute top-0 w-full flex items-center justify-between px-6 md:px-12 pt-8 pb-4 text-sm font-semibold tracking-wide z-50 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Link href="/homepage1" className="bg-white text-black px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition whitespace-nowrap border border-black/10">
              Go to Homepage 1
            </Link>
          </div>
          <div className="pointer-events-auto">
            <Link href="https://yvanoantonio.com/contact" className="bg-black text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition whitespace-nowrap">
              Contact
            </Link>
          </div>
        </motion.nav>

        <main className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none">
          <motion.div 
            style={{ pointerEvents: useTransform(smoothHeroScroll, v => v < 0.8 ? "auto" : "none") as any }} 
            className="flex items-center justify-center w-full h-full"
          >
            <AnimatedLogo scrollYProgress={smoothHeroScroll} />
          </motion.div>
        </main>
      </motion.div>

      {/* ── DYNAMIC CONTENT SECTIONS (Fades in, becomes scrollable after 150vh) ── */}
      <div className="relative w-full pb-[150vh]">
        <motion.div 
          className="sticky top-0 w-full min-h-screen"
          style={{ opacity: contentOpacity }}
        >
          <div className="relative z-10 bg-[#FDFDFD]/90 backdrop-blur-3xl rounded-t-[2.5rem] md:rounded-t-[5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-white/40 overflow-hidden">
        
        {/* Name Header Section */}
        <section className="pt-20 md:pt-28 pb-8 md:pb-12 flex flex-col items-center justify-center text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-black tracking-tighter uppercase leading-none mb-4 md:mb-6 text-black"
          >
            Yvano Antonio
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-black/50 flex flex-wrap justify-center gap-2 md:gap-4"
          >
            <span>Film & Television</span>
            <span className="hidden sm:inline">|</span>
            <span>Music Video</span>
            <span className="hidden sm:inline">|</span>
            <span>Commercial</span>
            <span className="hidden sm:inline">|</span>
            <span>Live Broadcast</span>
          </motion.div>
        </section>

        {/* Film & TV Section */}
        <section className="pt-4 md:pt-8 pb-16 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 md:px-12 mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="flex flex-col">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                Featured <br/> <span className="text-black/40">Works</span>
              </h2>
            </div>
            <Link href="/film-tv" className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity border-b-2 border-black pb-1 hidden sm:block">
              Explore All Projects ↗
            </Link>
          </motion.div>

          <AccordionCarousel projects={siteConfig.projects} />
        </section>

        {/* Filmography Section (Sticky Horizontal Scroll inside a black container for contrast) */}
        <FilmCarousel />

        {/* Awards Section */}
        <section className="px-6 md:px-12 py-12 md:py-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h3 className="text-5xl md:text-7xl lg:text-[90px] xl:text-[111px] font-black tracking-tighter uppercase mb-6 leading-[0.85]">
                <span className="block">Awards &</span>
                <span className="block text-black/40">Official Selections</span>
              </h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-24">
            {siteConfig.awards.map((award, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="group cursor-default relative pl-6 border-l-2 border-black/10 hover:border-black transition-colors duration-500"
              >
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors duration-300"></div>
                  {award.status}
                </div>
                <h4 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-[1.1] mb-4 text-black">
                  {award.title}
                </h4>
                <p className="text-[12px] md:text-[13px] leading-relaxed text-black/70 font-medium max-w-sm group-hover:text-black transition-colors duration-300">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Laurels Banner Images */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full flex flex-col items-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity duration-700"
          >
            <Image 
              src="/projects/bbt_laurels.webp"
              alt="Festival Laurels Row 1"
              width={2500}
              height={600}
              unoptimized={true}
              className="w-full h-auto object-contain mix-blend-multiply filter contrast-[1.5] grayscale"
            />
          </motion.div>
        </section>
      </div>
        </motion.div>
      </div>
    </div>
  )
}
