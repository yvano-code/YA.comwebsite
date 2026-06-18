"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// The core content that gets duplicated: one blurry background, one sharp foreground
const PageContent = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
    <Image
      src="/projects/bright_falling.png"
      alt="Cinematic falling"
      fill
      className="object-cover opacity-90"
      priority
      unoptimized
    />
    <div className="absolute inset-0 bg-black/30 mix-blend-multiply pointer-events-none" />
    
    <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto mt-20">
      <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl mb-8 leading-[1.1]">
        Meet Yvano. <br />
        <span className="text-white/90">A filmmaking crew <br className="md:hidden" />in your phone.</span>
      </h1>
      <p className="text-xl md:text-3xl font-medium text-white/80 max-w-2xl drop-shadow-lg leading-relaxed">
        The visionary director that edits, directs, and shapes your memories into cinematic art.
      </p>
    </div>
  </div>
);

export default function HomePageDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Phone scaling effect
  const phoneWidth = useTransform(scrollYProgress, [0, 0.6], ["340px", "100vw"]);
  const phoneHeight = useTransform(scrollYProgress, [0, 0.6], ["700px", "100vh"]);
  const phoneRadius = useTransform(scrollYProgress, [0, 0.6], ["56px", "0px"]);
  
  // Hardware frame fades out as we zoom in
  const hardwareOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black font-sans">
      
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
        {/* Scroll Container */}
        {/* We use 400vh to give the user enough scroll space to see the animation fully */}
        <div ref={containerRef} className="h-[400vh] relative">
          
          {/* Sticky view frame */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            
            {/* LAYER 1: Blurred Background */}
            <div className="absolute inset-0 w-screen h-screen flex items-center justify-center blur-2xl scale-110 opacity-70 pointer-events-none">
              <PageContent />
            </div>

            {/* LAYER 2: Phone Mask & Sharp Content */}
            {mounted && (
              <motion.div 
                style={{ 
                  width: phoneWidth, 
                  height: phoneHeight, 
                  borderRadius: phoneRadius 
                }} 
                className="relative z-10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
              >
                {/* Hardware Bezel & Dynamic Island */}
                <motion.div 
                  style={{ opacity: hardwareOpacity }} 
                  className="absolute inset-0 border-[8px] border-[#1a1a1a] rounded-[inherit] z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full" />
                </motion.div>
                
                {/* Inner Sharp Content - Clipped by the Phone Shape */}
                <div className="absolute inset-0 overflow-hidden rounded-[inherit] bg-black">
                  {/* We force the content to be exactly 100vw and 100vh and centered so it aligns perfectly over the blurred background */}
                  <div className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <PageContent />
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
