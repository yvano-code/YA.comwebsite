"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)
  const yControls = useAnimation()
  const limbControls = useAnimation()
  const leftLegControls = useAnimation()
  const rightLegControls = useAnimation()

  useEffect(() => {
    let isCancelled = false
    
    const runSequence = async () => {
      if (isHovered) {
        // 1. Limbs appear
        limbControls.start({ opacity: 1, transition: { duration: 0.1 } })
        
        // 2. Break free (wiggle to loosen up)
        await yControls.start({ 
          y: -10, 
          rotate: [0, -15, 15, -10, 0], 
          transition: { duration: 0.4 } 
        })
        
        if (isCancelled) return
        
        // 3. Jump down
        await yControls.start({
          y: 20,
          transition: { type: "spring", stiffness: 300, damping: 10 }
        })
        
        if (isCancelled) return

        // 4. Start running
        // Lean forward
        yControls.start({
          rotate: 15,
          transition: { duration: 0.2 }
        })
        
        // Start pumping legs infinitely
        leftLegControls.start({
          rotate: [-40, 40],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        rightLegControls.start({
          rotate: [40, -40],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.12, ease: "easeInOut" }
        })
        
        // Run diagonally and disappear
        await yControls.start({
          x: 400,
          y: 200,
          opacity: 0,
          transition: { duration: 1.2, ease: "linear" }
        })
        
        // Stop legs when disappeared
        leftLegControls.stop()
        rightLegControls.stop()
        
      } else {
        // Reset immediately on unhover
        leftLegControls.stop()
        rightLegControls.stop()
        limbControls.start({ opacity: 0, transition: { duration: 0.1 } })
        
        yControls.start({
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        })
        
        leftLegControls.start({ rotate: 0, transition: { duration: 0.1 } })
        rightLegControls.start({ rotate: 0, transition: { duration: 0.1 } })
      }
    }
    
    runSequence()
    
    return () => {
      isCancelled = true
    }
  }, [isHovered, yControls, limbControls, leftLegControls, rightLegControls])

  return (
    <Link 
      href="/" 
      className="text-3xl font-black tracking-tighter flex items-center h-12 z-50 cursor-pointer w-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex relative items-baseline">
        <span className="relative inline-block z-20">
          <motion.span 
            animate={yControls} 
            className="inline-block relative z-20"
          >
            Y
            <motion.div 
              animate={limbControls} 
              className="absolute inset-0 pointer-events-none opacity-0"
              initial={{ opacity: 0 }}
            >
              {/* Left Arm */}
              <div className="absolute left-[-4px] top-[45%] w-[8px] h-[3px] bg-black rounded-full rotate-[-30deg] origin-right" />
              {/* Right Arm */}
              <div className="absolute right-[-4px] top-[45%] w-[8px] h-[3px] bg-black rounded-full rotate-[30deg] origin-left" />
              {/* Left Leg */}
              <motion.div 
                animate={leftLegControls}
                className="absolute left-[35%] bottom-[-10px] w-[3px] h-[12px] bg-black rounded-full origin-top" 
              />
              {/* Right Leg */}
              <motion.div 
                animate={rightLegControls}
                className="absolute right-[35%] bottom-[-10px] w-[3px] h-[12px] bg-black rounded-full origin-top" 
              />
            </motion.div>
          </motion.span>
        </span>
        <span className="z-10 inline-block relative">A.</span>
      </div>
    </Link>
  )
}
