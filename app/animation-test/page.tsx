"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { 
  GoodYuteLogo, 
  TumblerLogo, 
  RocketLogo, 
  StoryTellerLogo, 
  AwardWinnerLogo 
} from "@/components/animated-logo"

function AnimationWrapper({ title, children }: { title: string, children: (isHovered: boolean) => React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div className="flex flex-col items-center justify-center py-32 px-12 border border-black/10 rounded-2xl bg-white/50 shadow-sm hover:shadow-md transition-shadow relative min-h-[600px] w-full">
      <h2 className="absolute top-6 left-8 text-sm font-bold uppercase tracking-widest text-black/40 z-50">{title}</h2>
      <div 
        className="text-[90px] md:text-[120px] leading-none font-black tracking-tighter flex items-center justify-center cursor-pointer text-black scale-75 md:scale-100 relative z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children(isHovered)}
      </div>
    </div>
  )
}

function StoryTellerTestLogo({ isHovered }: { isHovered: boolean }) {
  const [isActive, setIsActive] = useState(false)
  const dotControls = useAnimation()
  
  const aControls = useAnimation()
  const tControls = useAnimation()
  const storControls = useAnimation()
  const ellerControls = useAnimation()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let isCancelled = false
    
    if (isHovered) {
      setIsActive(true)
      dotControls.start({ opacity: 0, transition: { duration: 0.4 } })
      
      // Clean scale morph for A -> T
      aControls.start({ scale: 0, opacity: 0, transition: { duration: 0.3, ease: "backIn" } })
      tControls.start({ scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.3, ease: "backOut" } })
      
      // Slide out from behind the anchors
      storControls.start({ x: "0%", transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.4 } })
      ellerControls.start({ x: "0%", transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.4 } })

    } else {
      if (isCancelled) return
      setIsActive(false)
      
      // Slide back behind the anchors
      storControls.start({ x: "100%", transition: { type: "spring", damping: 15, stiffness: 100 } })
      ellerControls.start({ x: "-100%", transition: { type: "spring", damping: 15, stiffness: 100 } })
      
      // Clean scale morph for T -> A
      tControls.start({ scale: 0, opacity: 0, transition: { duration: 0.3, delay: 0.2, ease: "backIn" } })
      aControls.start({ scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.5, ease: "backOut" } })
      
      dotControls.start({ opacity: 1, transition: { duration: 0.4, delay: 0.5 } })
    }
    
    return () => {
      isCancelled = true
      clearTimeout(timeoutId)
    }
  }, [isHovered, dotControls, aControls, tControls, storControls, ellerControls])

  return (
    <div className="relative flex items-center justify-center p-12 w-[1200px] h-[400px] mix-blend-multiply bg-white rounded-2xl overflow-hidden" style={{ isolation: "isolate" }}>
      
      {/* Wrapper that tightly matches the height of the text */}
      <div className="relative flex items-center justify-center">
        
        {/* Black Text Layer */}
        <div className="flex relative items-baseline justify-center z-10 text-black">
          {/* Y and STOR */}
          <span className="relative inline-block z-30">
            <div className="absolute right-[100%] top-0 flex items-baseline overflow-hidden h-full">
              <motion.div animate={storControls} initial={{ x: "100%" }} className="flex justify-end whitespace-pre pr-[0.05em] py-1">
                STOR
              </motion.div>
            </div>
            <span className="relative z-10">Y</span>
          </span>
          
          {/* A / T and ELLER */}
          <span className="relative inline-block z-30">
            <motion.span animate={aControls} initial={{ scale: 1, opacity: 1 }} className="inline-block relative z-10 origin-center py-1">
              A
            </motion.span>
            
            <motion.span animate={tControls} initial={{ scale: 0, opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-20 origin-center py-1">
              T
            </motion.span>

            <div className="absolute left-[100%] top-0 flex items-baseline overflow-hidden h-full">
              <motion.div animate={ellerControls} initial={{ x: "-100%" }} className="flex justify-start whitespace-pre pr-[0.1em] py-1">
                ELLER
              </motion.div>
            </div>
          </span>

          {/* The Dot */}
          <motion.span 
            animate={dotControls}
            initial={{ opacity: 1 }}
            className="inline-block whitespace-pre overflow-visible z-20"
          >
            .
          </motion.span>
        </div>

        {/* Mask Image Layer (Screen) */}
        {/* inset-y-0 perfectly matches the text height. w-[1300px] + max-w-none covers the sliding distance! */}
        <img 
          src="/projects/storyteller_black-bleed.png" 
          alt="Storyteller Black Bleed Mask" 
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1300px] max-w-none object-cover mix-blend-screen pointer-events-none z-20"
          style={{ objectPosition: "50% 50%" }}
        />
        
      </div>
    </div>
  )
}

export default function AnimationTestPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-black w-full overflow-x-hidden pb-32">
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between px-6 md:px-12 pt-8 pb-12 text-sm font-semibold tracking-wide border-b border-black/10 bg-white">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-black tracking-tighter uppercase hover:opacity-70 transition">
            YA.
          </Link>
          <span className="text-black/30">/</span>
          <span className="text-xs font-bold uppercase tracking-widest text-black/60">Animation Lab</span>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="bg-white text-black px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition whitespace-nowrap border border-black/10">Home</Link>
          <Link href="/homepage1" className="bg-white text-black px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition whitespace-nowrap border border-black/10">V1</Link>
          <Link href="/homepage2" className="bg-white text-black px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition whitespace-nowrap border border-black/10">V2</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16">
        <div className="mb-16">
          <h1 className="text-[60px] md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-4">
            Animation <span className="text-black/30">Test Lab</span>
          </h1>
          <p className="text-lg font-medium text-black/50 max-w-2xl">
            Hover over any logo below to trigger its unique animation sequence. 
            All logos start from their default YA resting state.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          <AnimationWrapper title="Toy Tumbler">
            {(isHovered) => <TumblerLogo isHovered={isHovered} />}
          </AnimationWrapper>
          
          <AnimationWrapper title="Cartoon / Good Yute">
            {(isHovered) => <GoodYuteLogo isHovered={isHovered} />}
          </AnimationWrapper>

          <AnimationWrapper title="Rocket Launch">
            {(isHovered) => <RocketLogo isHovered={isHovered} />}
          </AnimationWrapper>

          <AnimationWrapper title="Storyteller / Screenplay (Image Mask Test)">
            {(isHovered) => <StoryTellerLogo isHovered={isHovered} />}
          </AnimationWrapper>

          <AnimationWrapper title="Award Winner / Glitter">
            {(isHovered) => <AwardWinnerLogo isHovered={isHovered} />}
          </AnimationWrapper>
        </div>
      </main>
    </div>
  )
}
