"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"

const MickeyGlove = ({ className }: { className?: string }) => {
  const shapes = (
    <>
      <path d="M 25,65 C 5,60 5,35 25,35 C 40,35 45,50 45,50" />
      <path d="M 35,45 C 30,15 50,10 60,30 C 65,40 60,55 60,55" />
      <path d="M 55,45 C 60,15 85,15 85,35 C 85,50 75,60 75,60" />
      <path d="M 70,50 C 95,40 105,65 90,80 C 80,90 65,80 65,80" />
      <circle cx="55" cy="65" r="25" />
      <path d="M 25,85 C 20,105 90,105 85,85 Z" />
    </>
  )
  return (
    <svg viewBox="0 0 110 110" className={className} style={{ overflow: "visible" }}>
      <g stroke="#000" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" fill="#000">{shapes}</g>
      <g fill="#FFF">{shapes}</g>
      <path d="M 45,55 Q 40,65 42,75" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 55,55 Q 55,65 55,75" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 65,55 Q 70,65 68,75" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 25,85 Q 55,75 85,85" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

const MickeyShoe = ({ className, flipped = false }: { className?: string, flipped?: boolean }) => {
  const shapes = (
    <>
      <path d="M 40,25 C 10,25 0,40 0,60 C 0,85 40,90 60,90 C 85,90 100,80 100,55 C 100,30 80,25 65,35 C 55,42 45,42 40,25 Z" />
      <ellipse cx="65" cy="20" rx="20" ry="10" />
    </>
  )
  return (
    <svg viewBox="0 0 110 100" className={className} style={{ overflow: "visible", transform: flipped ? 'scaleX(-1)' : 'none' }}>
      <g stroke="#000" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" fill="#000">{shapes}</g>
      <g fill="#FFCC00">
        <path d="M 40,25 C 10,25 0,40 0,60 C 0,85 40,90 60,90 C 85,90 100,80 100,55 C 100,30 80,25 65,35 C 55,42 45,42 40,25 Z" />
        <ellipse cx="65" cy="20" rx="20" ry="10" />
      </g>
      <ellipse cx="65" cy="20" rx="12" ry="5" fill="#000" />
      <path d="M 30,45 Q 40,65 60,50" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

const DustCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" className={className} style={{ overflow: "visible" }}>
    <circle cx="25" cy="25" r="15" fill="#D1D5DB" />
    <circle cx="15" cy="20" r="10" fill="#D1D5DB" />
    <circle cx="35" cy="20" r="10" fill="#D1D5DB" />
  </svg>
)

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)
  
  // Cinematic animation controls
  const wrapperControls = useAnimation()
  const xControls = useAnimation()
  const yControls = useAnimation()
  const limbControls = useAnimation()
  const leftLegControls = useAnimation()
  const rightLegControls = useAnimation()
  const leftArmControls = useAnimation()
  const rightArmControls = useAnimation()
  
  // Video game visual FX controls
  const shadowControls = useAnimation()
  const popControls = useAnimation()
  const damageControls = useAnimation()
  const dust1Controls = useAnimation()
  const dust2Controls = useAnimation()
  const speedLinesControls = useAnimation()

  useEffect(() => {
    let isCancelled = false
    
    const runSequence = async () => {
      if (isHovered) {
        // 1. Limbs & shadow appear
        limbControls.start({ opacity: 1, transition: { duration: 0.1 } })
        shadowControls.start({ opacity: 0.3, transition: { duration: 0.1 } })
        
        // 2. The Struggle (stuck to the A)
        // Pull left
        yControls.start({ x: -5, rotate: -15, scaleX: 0.9, scaleY: 1.05, transition: { duration: 0.2, ease: "easeOut" } })
        await shadowControls.start({ x: -5, transition: { duration: 0.2, ease: "easeOut" } })
        if (isCancelled) return

        // Shake/vibrate (stuck!)
        yControls.start({
          x: [-5, -2, -6, -3, -5, -2, -6, -4],
          y: [0, -2, 1, -1, 2, 0, -1, 0],
          rotate: [-15, -12, -18, -14, -17, -15],
          transition: { duration: 0.3 }
        })
        await shadowControls.start({
          x: [-5, -2, -6, -3, -5, -2, -6, -4],
          transition: { duration: 0.3 }
        })
        if (isCancelled) return

        // Pull harder!
        yControls.start({ x: -12, rotate: -25, scaleX: 0.8, scaleY: 1.15, transition: { duration: 0.2, ease: "easeIn" } })
        await shadowControls.start({ x: -12, transition: { duration: 0.2, ease: "easeIn" } })
        if (isCancelled) return

        // 3. POP free! (Cinematic break)
        popControls.start({
          scale: [0, 2],
          opacity: [1, 0],
          borderWidth: [4, 0],
          transition: { duration: 0.4, ease: "easeOut" }
        })
        damageControls.start({
          opacity: [0, 1, 1, 0],
          y: [0, -30, -35],
          scale: [0.5, 1.2, 1],
          transition: { duration: 1, ease: "easeOut", times: [0, 0.2, 0.8, 1] }
        })
        
        // Jump up and right
        yControls.start({
          x: 10,
          y: -30,
          rotate: 10,
          scaleX: 1,
          scaleY: 1,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        })
        await shadowControls.start({
          x: 10,
          scale: 0.5,
          opacity: 0.1,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        })
        if (isCancelled) return

        // 4. Heavy Landing (Impact)
        // Screen shake on wrapper
        wrapperControls.start({
          y: [0, 5, -2, 1, 0],
          transition: { duration: 0.3, ease: "easeInOut" }
        })
        // Dust impact
        dust1Controls.start({
          scale: [0, 1.5],
          x: [-10, -25],
          y: [15, 10],
          opacity: [0.8, 0],
          transition: { duration: 0.5, ease: "easeOut" }
        })
        dust2Controls.start({
          scale: [0, 1.5],
          x: [10, 25],
          y: [15, 10],
          opacity: [0.8, 0],
          transition: { duration: 0.5, ease: "easeOut" }
        })
        
        yControls.start({
          y: 20,
          rotate: 20, // Lean forward to run
          transition: { type: "spring", stiffness: 400, damping: 12 }
        })
        await shadowControls.start({
          scale: 1,
          opacity: 0.4,
          transition: { type: "spring", stiffness: 400, damping: 12 }
        })
        if (isCancelled) return

        // 5. Start running
        // Dramatic leg pumping
        leftLegControls.start({
          rotate: [-70, 70],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeInOut" }
        })
        rightLegControls.start({
          rotate: [70, -70],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeInOut" }
        })
        
        // Dramatic arm swinging
        leftArmControls.start({
          rotate: [-80, 40],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeInOut" }
        })
        rightArmControls.start({
          rotate: [40, -80],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeInOut" }
        })
        
        // Bouncing up and down while leaning forward
        yControls.start({
          y: [20, 5],
          rotate: [15, 25],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeOut" }
        })
        shadowControls.start({
          scale: [1, 0.7],
          opacity: [0.4, 0.2],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeOut" }
        })
        
        // Speed lines FX
        speedLinesControls.start({
          opacity: [0, 1, 0],
          x: [0, -20],
          transition: { repeat: Infinity, duration: 0.2 }
        })

        // Run straight right to edge of screen
        const distance = typeof window !== "undefined" ? window.innerWidth + 100 : 2000;
        await xControls.start({
          x: distance,
          transition: { duration: 1.5, ease: "easeIn" }
        })
        
        if (isCancelled) return
        
        // Stop animations after it disappears off-screen
        leftLegControls.stop()
        rightLegControls.stop()
        leftArmControls.stop()
        rightArmControls.stop()
        yControls.stop()
        speedLinesControls.stop()
        
        // Hide instantly
        xControls.start({ opacity: 0, transition: { duration: 0 } })
        shadowControls.start({ opacity: 0, transition: { duration: 0 } })
        
      } else {
        // --- Reset immediately on unhover ---
        leftLegControls.stop()
        rightLegControls.stop()
        leftArmControls.stop()
        rightArmControls.stop()
        yControls.stop()
        xControls.stop()
        speedLinesControls.stop()
        popControls.stop()
        damageControls.stop()
        
        limbControls.start({ opacity: 0, transition: { duration: 0.1 } })
        shadowControls.start({ opacity: 0, transition: { duration: 0.1 } })
        speedLinesControls.start({ opacity: 0, transition: { duration: 0.1 } })
        
        xControls.start({
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        })
        yControls.start({
          x: 0,
          y: 0,
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        })
        shadowControls.start({ x: 0, y: 0, scale: 1 })
        
        leftLegControls.start({ rotate: 0, transition: { duration: 0.1 } })
        rightLegControls.start({ rotate: 0, transition: { duration: 0.1 } })
        leftArmControls.start({ rotate: -30, transition: { duration: 0.1 } })
        rightArmControls.start({ rotate: 30, transition: { duration: 0.1 } })
      }
    }
    
    runSequence()
    
    return () => {
      isCancelled = true
    }
  }, [isHovered, wrapperControls, xControls, yControls, limbControls, leftLegControls, rightLegControls, leftArmControls, rightArmControls, shadowControls, popControls, damageControls, dust1Controls, dust2Controls, speedLinesControls])

  return (
    <Link 
      href="/" 
      className="text-3xl font-black tracking-tighter flex items-center h-12 z-50 cursor-pointer w-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div animate={wrapperControls} className="flex relative items-baseline">
        <span className="relative inline-block z-20">
          {/* X-axis translation container */}
          <motion.div animate={xControls} className="inline-block relative z-20">
            
            {/* Ground Shadow */}
            <motion.div 
              animate={shadowControls}
              initial={{ opacity: 0 }}
              className="absolute bottom-[-6px] left-[0px] w-[20px] h-[4px] bg-black rounded-full blur-[2px]"
            />

            {/* Cinematic Breakout Pop Ring */}
            <motion.div 
              animate={popControls}
              initial={{ opacity: 0, scale: 0 }}
              className="absolute top-[50%] right-[-10px] w-[40px] h-[40px] -mt-[20px] rounded-full border-black z-0 pointer-events-none"
            />

            {/* Video Game Damage Text */}
            <motion.div
              animate={damageControls}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              className="absolute top-[-10px] right-[-60px] text-red-600 font-black text-[10px] italic drop-shadow-md whitespace-nowrap z-50 pointer-events-none tracking-tight"
            >
              CRITICAL!
            </motion.div>

            {/* Impact Dust Clouds */}
            <motion.div animate={dust1Controls} initial={{ opacity: 0 }} className="absolute bottom-[-10px] left-[-10px] w-[20px] h-[20px] pointer-events-none">
              <DustCloud />
            </motion.div>
            <motion.div animate={dust2Controls} initial={{ opacity: 0 }} className="absolute bottom-[-10px] right-[-10px] w-[20px] h-[20px] pointer-events-none">
              <DustCloud />
            </motion.div>

            {/* Speed lines */}
            <motion.div 
              animate={speedLinesControls} 
              initial={{ opacity: 0 }} 
              className="absolute inset-0 pointer-events-none z-0"
            >
              <div className="absolute top-[30%] right-[120%] w-[30px] h-[2px] bg-black/40 rounded-full" />
              <div className="absolute top-[60%] right-[140%] w-[50px] h-[2px] bg-black/30 rounded-full" />
              <div className="absolute top-[80%] right-[110%] w-[20px] h-[2px] bg-black/50 rounded-full" />
            </motion.div>

            {/* Y-axis translation, rotation, and bounce container */}
            <motion.span 
              animate={yControls} 
              className="inline-block relative origin-bottom z-20"
            >
              Y
              {/* Limbs container */}
              <motion.div 
                animate={limbControls} 
                className="absolute inset-0 pointer-events-none opacity-0"
                initial={{ opacity: 0 }}
              >
                {/* Left Arm */}
                <motion.div 
                  animate={leftArmControls}
                  initial={{ rotate: -30 }}
                  className="absolute left-[-12px] top-[40%] w-[12px] h-[3.5px] bg-black origin-right rounded-full z-10" 
                >
                  <MickeyGlove className="absolute left-[-16px] top-[-10px] w-[24px] h-[24px] -rotate-90 drop-shadow-md" />
                </motion.div>
                
                {/* Right Arm */}
                <motion.div 
                  animate={rightArmControls}
                  initial={{ rotate: 30 }}
                  className="absolute right-[-12px] top-[40%] w-[12px] h-[3.5px] bg-black origin-left rounded-full z-10" 
                >
                  <MickeyGlove className="absolute right-[-16px] top-[-10px] w-[24px] h-[24px] rotate-90 drop-shadow-md" />
                </motion.div>

                {/* Left Leg */}
                <motion.div 
                  animate={leftLegControls}
                  className="absolute left-[25%] bottom-[-16px] w-[3.5px] h-[16px] bg-black origin-top rounded-full z-0" 
                >
                  <MickeyShoe className="absolute left-[-10px] bottom-[-10px] w-[28px] h-[24px] drop-shadow-md" flipped={true} />
                </motion.div>
                
                {/* Right Leg */}
                <motion.div 
                  animate={rightLegControls}
                  className="absolute right-[25%] bottom-[-16px] w-[3.5px] h-[16px] bg-black origin-top rounded-full z-0" 
                >
                  <MickeyShoe className="absolute left-[-10px] bottom-[-10px] w-[28px] h-[24px] drop-shadow-md" flipped={true} />
                </motion.div>
              </motion.div>
            </motion.span>
          </motion.div>
        </span>
        {/* The "A." takes cinematic focus styling */}
        <span 
          className="z-10 inline-block relative transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.3 : 1 }}
        >
          A.
        </span>
      </motion.div>
    </Link>
  )
}
