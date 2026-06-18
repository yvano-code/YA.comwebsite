"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)
  
  // Separate controls for independent animation tracks
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
        
        // 2. Break free (wiggle)
        await yControls.start({ 
          rotate: [0, -20, 20, -10, 0], 
          transition: { duration: 0.4 } 
        })
        
        if (isCancelled) return
        
        // 3. Jump down
        await yControls.start({
          y: 25,
          transition: { type: "spring", stiffness: 300, damping: 10 }
        })
        
        if (isCancelled) return

        // 4. Start running
        // Dramatic leg pumping
        leftLegControls.start({
          rotate: [-70, 70],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        rightLegControls.start({
          rotate: [70, -70],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        
        // Dramatic arm swinging
        leftArmControls.start({
          rotate: [-70, 50],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        rightArmControls.start({
          rotate: [50, -70],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        
        // Bouncing up and down while leaning forward
        yControls.start({
          y: [25, 10],
          rotate: [15, 25],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeOut" }
        })

        // Run straight right to edge of screen
        const distance = typeof window !== "undefined" ? window.innerWidth + 100 : 2000;
        await xControls.start({
          x: distance,
          transition: { duration: 2.2, ease: "easeIn" }
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
          y: 0,
          rotate: 0,
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
          {/* X-axis translation container */}
          <motion.div animate={xControls} className="inline-block relative z-20">
            {/* Y-axis translation, rotation, and bounce container */}
            <motion.span 
              animate={yControls} 
              className="inline-block relative"
            >
              Y
              {/* Limbs container */}
              <motion.div 
                animate={limbControls} 
                className="absolute inset-0 pointer-events-none opacity-0"
                initial={{ opacity: 0 }}
              >
                {/* Left Arm & Mickey Glove */}
                <motion.div 
                  animate={leftArmControls}
                  initial={{ rotate: -30 }}
                  className="absolute left-[-12px] top-[45%] w-[12px] h-[3px] bg-black origin-right" 
                >
                  <div className="absolute left-[-6px] top-[-4px] w-[10px] h-[11px] bg-white border-[1.5px] border-black rounded-full flex items-center justify-center space-x-[1px]">
                    <div className="w-[1px] h-[4px] bg-black" />
                    <div className="w-[1px] h-[4px] bg-black" />
                  </div>
                </motion.div>
                
                {/* Right Arm & Mickey Glove */}
                <motion.div 
                  animate={rightArmControls}
                  initial={{ rotate: 30 }}
                  className="absolute right-[-12px] top-[45%] w-[12px] h-[3px] bg-black origin-left" 
                >
                  <div className="absolute right-[-6px] top-[-4px] w-[10px] h-[11px] bg-white border-[1.5px] border-black rounded-full flex items-center justify-center space-x-[1px]">
                    <div className="w-[1px] h-[4px] bg-black" />
                    <div className="w-[1px] h-[4px] bg-black" />
                  </div>
                </motion.div>

                {/* Left Leg & Mickey Shoe */}
                <motion.div 
                  animate={leftLegControls}
                  className="absolute left-[30%] bottom-[-14px] w-[3px] h-[16px] bg-black origin-top" 
                >
                  <div className="absolute left-[-6.5px] bottom-[-5px] w-[16px] h-[9px] bg-yellow-400 border-[1.5px] border-black rounded-full" />
                </motion.div>
                
                {/* Right Leg & Mickey Shoe */}
                <motion.div 
                  animate={rightLegControls}
                  className="absolute right-[30%] bottom-[-14px] w-[3px] h-[16px] bg-black origin-top" 
                >
                  <div className="absolute left-[-6.5px] bottom-[-5px] w-[16px] h-[9px] bg-yellow-400 border-[1.5px] border-black rounded-full" />
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
