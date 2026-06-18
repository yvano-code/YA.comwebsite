"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePageDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background/Scene scale and movement
  // Starts normal, scales down as if moving away/falling backwards
  const sceneScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const sceneY = useTransform(scrollYProgress, [0, 0.8], ["0%", "40%"]);
  const sceneOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  // "YVANO ANTONIO" -> 13 characters
  const name = "YVANO ANTONIO";
  const letters = name.split("");

  // Bio section fades in at the end of the scroll
  const bioOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const bioY = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  // Stable random-ish values to avoid hydration errors
  const randoms = [
    { startY: -20, endY: -150, startX: -30, endX: -10, rStart: 10, rEnd: 45, zScale: 0.8 },
    { startY: 10, endY: -200, startX: 10, endX: 40, rStart: -10, rEnd: -90, zScale: 1.2 },
    { startY: -40, endY: -100, startX: -20, endX: -40, rStart: 20, rEnd: 180, zScale: 1.5 },
    { startY: 30, endY: -250, startX: 30, endX: 10, rStart: -5, rEnd: -60, zScale: 0.9 },
    { startY: -10, endY: -120, startX: 0, endX: 20, rStart: 15, rEnd: 90, zScale: 1.1 },
    { startY: 0, endY: 0, startX: 0, endX: 0, rStart: 0, rEnd: 0, zScale: 1 }, // space
    { startY: 40, endY: -300, startX: -40, endX: -10, rStart: -20, rEnd: -120, zScale: 1.4 },
    { startY: -30, endY: -180, startX: 40, endX: 20, rStart: 5, rEnd: 45, zScale: 0.7 },
    { startY: 20, endY: -220, startX: -10, endX: -30, rStart: 25, rEnd: 150, zScale: 1.3 },
    { startY: -25, endY: -140, startX: 20, endX: 50, rStart: -15, rEnd: -75, zScale: 1.0 },
    { startY: 15, endY: -260, startX: -25, endX: -5, rStart: 10, rEnd: 60, zScale: 1.6 },
    { startY: -5, endY: -160, startX: 15, endX: -15, rStart: -25, rEnd: -180, zScale: 0.9 },
    { startY: 35, endY: -280, startX: -35, endX: 25, rStart: 30, rEnd: 210, zScale: 1.2 },
  ];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <div className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <SiteHeader />
      </div>

      <main>
        {/* Sunken Place Animation Container */}
        {/* Height is 400vh to give plenty of scroll duration */}
        <div ref={containerRef} className="h-[400vh] relative">
          
          {/* Sticky view frame */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
            
            {/* The main subject (falling away) */}
            <motion.div 
              style={{ scale: sceneScale, y: sceneY, opacity: sceneOpacity }}
              className="relative w-full h-full max-w-7xl flex items-center justify-center pointer-events-none"
            >
              <Image
                src="/projects/PRO_9325-Edit-NoBG.png"
                alt="Yvano Antonio"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                unoptimized
              />
            </motion.div>

            {/* Floating Letters */}
            {mounted && letters.map((char, i) => {
              if (char === " ") return null;

              const r = randoms[i];
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(scrollYProgress, [0, 0.8], [`${r.startY}vh`, `${r.endY}vh`]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const x = useTransform(scrollYProgress, [0, 0.8], [`${r.startX}vw`, `${r.endX}vw`]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const rotate = useTransform(scrollYProgress, [0, 0.8], [r.rStart, r.rEnd]);
              
              // Apply opacity fade in at the very start to stagger them slightly
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [0, 0.1 + (i * 0.05), 0.7, 0.9], [0, 1, 1, 0]);
              
              // Base scale varies slightly by letter to give depth
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const scale = useTransform(scrollYProgress, [0, 0.8], [r.zScale, r.zScale * 2]);

              return (
                <motion.div
                  key={i}
                  style={{ y, x, rotate, opacity, scale }}
                  className="absolute text-7xl md:text-9xl font-black text-white mix-blend-screen drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] pointer-events-none"
                >
                  {char}
                </motion.div>
              );
            })}

            {/* Bio appearing at the end */}
            <motion.div 
              style={{ opacity: bioOpacity, y: bioY }}
              className="absolute inset-0 flex items-center justify-center p-6 md:p-12 pointer-events-auto z-10"
            >
              <div className="max-w-4xl w-full text-center md:text-left">
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-8 md:mb-12">
                  About
                </h2>
                <div className="text-lg md:text-3xl font-medium leading-relaxed text-gray-300 space-y-6 md:space-y-8">
                  {siteConfig.imdbBio.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}
