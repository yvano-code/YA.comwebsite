"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

function FloatingLetter({ 
  char, 
  index, 
  randoms, 
  scrollYProgress 
}: { 
  char: string, 
  index: number, 
  randoms: any[], 
  scrollYProgress: any 
}) {
  const r = randoms[index];
  
  // Create a 3D effect: letters come from "behind" the camera (scale > 1) and fall down into the abyss (scale < 0)
  const z = useTransform(scrollYProgress, [0, 0.7], [r.startZ, r.endZ]);
  const y = useTransform(scrollYProgress, [0, 0.7], [`${r.startY}vh`, `${r.endY}vh`]);
  const x = useTransform(scrollYProgress, [0, 0.7], [`${r.startX}vw`, `${r.endX}vw`]);
  
  // 3D rotations for the letters tumbling
  const rotateX = useTransform(scrollYProgress, [0, 0.7], [0, r.rotX]);
  const rotateY = useTransform(scrollYProgress, [0, 0.7], [0, r.rotY]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.7], [r.rStart, r.rEnd]);
  
  // Fade out as they fall into the abyss
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.7], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ y, x, z, rotateX, rotateY, rotateZ, opacity }}
      className="absolute text-6xl md:text-9xl font-black text-white/90 mix-blend-overlay drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] pointer-events-none"
    >
      {char}
    </motion.div>
  );
}

export default function HomePageDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background/Scene scale and movement for falling effect
  // Zooming IN on the background makes the viewer feel like they are falling DOWN into it.
  const sceneScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.5]);
  const sceneY = useTransform(scrollYProgress, [0, 0.8], ["0%", "-10%"]);
  const sceneOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0.3]);

  // "YVANO ANTONIO" -> 13 characters
  const name = "YVANO ANTONIO";
  const letters = name.split("");

  // Bio section fades in at the end of the scroll
  const bioOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const bioY = useTransform(scrollYProgress, [0.75, 1], [50, 0]);
  const bioScale = useTransform(scrollYProgress, [0.75, 1], [0.9, 1]);

  // 3D Randoms
  const randoms = [
    { startY: 100, endY: -50, startX: -40, endX: -10, startZ: 200, endZ: -500, rotX: 180, rotY: 90, rStart: 10, rEnd: 45 },
    { startY: 120, endY: -80, startX: -20, endX: 10, startZ: 300, endZ: -600, rotX: -180, rotY: 45, rStart: -10, rEnd: -90 },
    { startY: 80, endY: -40, startX: -10, endX: -30, startZ: 150, endZ: -400, rotX: 360, rotY: -90, rStart: 20, rEnd: 180 },
    { startY: 150, endY: -100, startX: 10, endX: 30, startZ: 400, endZ: -700, rotX: -360, rotY: 180, rStart: -5, rEnd: -60 },
    { startY: 90, endY: -60, startX: 30, endX: 5, startZ: 250, endZ: -450, rotX: 90, rotY: -45, rStart: 15, rEnd: 90 },
    { startY: 0, endY: 0, startX: 0, endX: 0, startZ: 0, endZ: 0, rotX: 0, rotY: 0, rStart: 0, rEnd: 0 }, // space
    { startY: 110, endY: -70, startX: -35, endX: -15, startZ: 280, endZ: -550, rotX: -90, rotY: 45, rStart: -20, rEnd: -120 },
    { startY: 130, endY: -90, startX: -15, endX: 5, startZ: 350, endZ: -650, rotX: 180, rotY: -180, rStart: 5, rEnd: 45 },
    { startY: 85, endY: -45, startX: 5, endX: -25, startZ: 180, endZ: -420, rotX: -180, rotY: 90, rStart: 25, rEnd: 150 },
    { startY: 140, endY: -110, startX: 25, endX: 15, startZ: 380, endZ: -680, rotX: 360, rotY: -45, rStart: -15, rEnd: -75 },
    { startY: 95, endY: -55, startX: -25, endX: 0, startZ: 220, endZ: -480, rotX: -360, rotY: 180, rStart: 10, rEnd: 60 },
    { startY: 125, endY: -85, startX: 15, endX: -5, startZ: 320, endZ: -620, rotX: 90, rotY: -90, rStart: -25, rEnd: -180 },
    { startY: 105, endY: -65, startX: -5, endX: 25, startZ: 260, endZ: -520, rotX: -90, rotY: 45, rStart: 30, rEnd: 210 },
  ];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* Simple Back Button */}
      <div className="fixed top-6 left-6 z-[100]">
        <Link 
          href="/" 
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg"
        >
          ← Back to Main
        </Link>
      </div>

      <main>
        {/* Sunken Place Animation Container */}
        {/* Height is 500vh to give plenty of scroll duration for a smooth 3D effect */}
        <div ref={containerRef} className="h-[500vh] relative">
          
          {/* Sticky view frame */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black" style={{ perspective: "1000px" }}>
            
            {/* The main subject (falling away) */}
            <motion.div 
              style={{ scale: sceneScale, y: sceneY, opacity: sceneOpacity }}
              className="absolute inset-0 w-full h-full flex items-center justify-center origin-center"
            >
              <Image
                src="/projects/sunken_place_falling.png"
                alt="Sunken Place Falling"
                fill
                className="object-cover"
                priority
                unoptimized
              />
              {/* Optional Vignette overlay to blend edges */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            </motion.div>

            {/* 3D Floating Letters Container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
              {mounted && letters.map((char, i) => {
                if (char === " ") return null;
                return (
                  <FloatingLetter 
                    key={i} 
                    char={char} 
                    index={i} 
                    randoms={randoms} 
                    scrollYProgress={scrollYProgress} 
                  />
                );
              })}
            </div>

            {/* Bio appearing at the end */}
            <motion.div 
              style={{ opacity: bioOpacity, y: bioY, scale: bioScale }}
              className="absolute inset-0 flex items-center justify-center p-6 md:p-12 pointer-events-auto z-50 bg-black/40 backdrop-blur-sm"
            >
              <div className="max-w-3xl w-full text-center">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 md:mb-12 text-white drop-shadow-2xl">
                  Yvano Antonio
                </h2>
                <div className="text-xl md:text-3xl font-medium leading-relaxed text-gray-200 space-y-6 md:space-y-8 drop-shadow-lg">
                  {siteConfig.imdbBio.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-16">
                  <Link href="/film-tv" className="bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    View Filmography
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
