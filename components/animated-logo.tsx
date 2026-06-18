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

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)
  
  const xControls = useAnimation()
  const yControls = useAnimation()
  const limbControls = useAnimation()
  const leftLegControls = useAnimation()
  const rightLegControls = useAnimation()
  const leftArmControls = useAnimation()
  const rightArmControls = useAnimation()

  useEffect(() => {
    let isCancelled = false
    
    const runSequence = async () => {
      if (isHovered) {
        // 1. Limbs appear
        limbControls.start({ opacity: 1, transition: { duration: 0.1 } })
        
        // 2. The Struggle (stuck to the A)
        // Pull left
        await yControls.start({ 
          x: -5, 
          rotate: -15, 
          scaleX: 0.9, 
          scaleY: 1.05,
          transition: { duration: 0.2, ease: "easeOut" } 
        })
        if (isCancelled) return

        // Shake/vibrate (stuck!)
        await yControls.start({
          x: [-5, -2, -6, -3, -5, -2, -6, -4],
          y: [0, -2, 1, -1, 2, 0, -1, 0],
          rotate: [-15, -12, -18, -14, -17, -15],
          transition: { duration: 0.3 }
        })
        if (isCancelled) return

        // Pull harder!
        await yControls.start({ 
          x: -12, 
          rotate: -25, 
          scaleX: 0.8, 
          scaleY: 1.15,
          transition: { duration: 0.2, ease: "easeIn" } 
        })
        if (isCancelled) return

        // POP free! Jump up and right
        await yControls.start({
          x: 10,
          y: -25,
          rotate: 10,
          scaleX: 1,
          scaleY: 1,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        })
        if (isCancelled) return

        // 3. Land down
        await yControls.start({
          y: 20,
          rotate: 20, // Lean forward to run
          transition: { type: "spring", stiffness: 300, damping: 12 }
        })
        if (isCancelled) return

        // 4. Start running
        // Dramatic leg pumping
        leftLegControls.start({
          rotate: [-60, 60],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        rightLegControls.start({
          rotate: [60, -60],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        
        // Dramatic arm swinging
        leftArmControls.start({
          rotate: [-80, 40],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        rightArmControls.start({
          rotate: [40, -80],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        
        // Bouncing up and down while leaning forward
        yControls.start({
          y: [20, 5],
          rotate: [15, 25],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeOut" }
        })

        // Run straight right to edge of screen
        const distance = typeof window !== "undefined" ? window.innerWidth + 100 : 2000;
        await xControls.start({
          x: distance,
          transition: { duration: 1.8, ease: "easeIn" }
        })
        
        if (isCancelled) return
        
        // Stop animations after it disappears off-screen
        leftLegControls.stop()
        rightLegControls.stop()
        leftArmControls.stop()
        rightArmControls.stop()
        yControls.stop()
        
        // Hide instantly
        xControls.start({ opacity: 0, transition: { duration: 0 } })
        
      } else {
        // --- Reset immediately on unhover ---
        leftLegControls.stop()
        rightLegControls.stop()
        leftArmControls.stop()
        rightArmControls.stop()
        yControls.stop()
        xControls.stop()
        
        limbControls.start({ opacity: 0, transition: { duration: 0.1 } })
        
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
  }, [isHovered, xControls, yControls, limbControls, leftLegControls, rightLegControls, leftArmControls, rightArmControls])

  return (
    <Link 
      href="/" 
      className="text-3xl font-black tracking-tighter flex items-center h-12 z-50 cursor-pointer w-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex relative items-baseline">
        <span className="relative inline-block z-20">
          <motion.div animate={xControls} className="inline-block relative z-20">
            <motion.span 
              animate={yControls} 
              className="inline-block relative origin-bottom"
            >
              Y
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
        <span className="z-10 inline-block relative">A.</span>
      </div>
    </Link>
  )
}
