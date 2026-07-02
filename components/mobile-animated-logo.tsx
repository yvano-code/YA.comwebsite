"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TumblerLogo, AwardWinnerLogo, RocketLogo, GoodYuteLogo } from "@/components/animated-logo"
import { initSensory } from "@/lib/sensory"

export function MobileAnimatedLogo() {
  const allTypes = ["tumbler", "awardwinner", "cartoon", "rocket"] as const;
  const [currentIndex, setCurrentIndex] = useState(0); 
  
  // States for tap interaction:
  // 0: resting (showing YA. waiting for tap to explode)
  // 1: playing (exploded)
  // 2: played (returned to YA. waiting for tap to cycle)
  const [playState, setPlayState] = useState<0 | 1 | 2>(0);

  const handleTap = () => {
    initSensory();
    if (playState === 0) {
      setPlayState(1); // triggers hover state
    } else if (playState === 1) {
      setPlayState(2); // end animation early
    } else if (playState === 2) {
      // cycle and fade in next
      const nextIndex = (currentIndex + 1) % allTypes.length;
      setCurrentIndex(nextIndex);
      setPlayState(0); // resting state for the next one
    }
  }

  const handleAnimationComplete = () => {
    // Automatically trigger the reverse animation by setting it to 'played'
    // This tells the child component that it is no longer hovered, so it sucks back in.
    setPlayState(2);
  }

  const animType = allTypes[currentIndex];
  const isHovered = playState === 1;

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-pointer z-[100] bg-black/0 text-black" 
      onPointerDown={handleTap}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={animType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center text-[6.5vh] leading-none font-black tracking-tighter"
        >
          {animType === "tumbler" ? (
            <TumblerLogo isHovered={isHovered} onAnimationComplete={handleAnimationComplete} isVertical={true} isMobile={true} muteSound={true} />
          ) : animType === "awardwinner" ? (
            <AwardWinnerLogo isHovered={isHovered} onAnimationComplete={handleAnimationComplete} isMobile={true} muteSound={true} />
          ) : animType === "cartoon" ? (
            <GoodYuteLogo isHovered={isHovered} onAnimationComplete={handleAnimationComplete} isMobile={true} muteSound={true} />
          ) : animType === "rocket" ? (
            <RocketLogo isHovered={isHovered} onAnimationComplete={handleAnimationComplete} isMobile={true} muteSound={true} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
