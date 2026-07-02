"use client"

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function InteractiveLavaLamp() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring settings for super buttery smooth, slow "pull" effect
  // High damping and mass makes it feel heavy and fluid like liquid
  const springConfig = { damping: 100, stiffness: 40, mass: 5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Parallax ratios to create depth when mouse moves
  // Positive values follow mouse, negative values move away
  const shiftX1 = useTransform(smoothMouseX, (v) => v * 0.12)
  const shiftY1 = useTransform(smoothMouseY, (v) => v * 0.12)

  const shiftX2 = useTransform(smoothMouseX, (v) => v * -0.09)
  const shiftY2 = useTransform(smoothMouseY, (v) => v * -0.09)

  const shiftX3 = useTransform(smoothMouseX, (v) => v * 0.07)
  const shiftY3 = useTransform(smoothMouseY, (v) => v * 0.07)

  useEffect(() => {
    // Set initial position to center on mount
    mouseX.set(window.innerWidth / 2)
    mouseY.set(window.innerHeight / 2)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden bg-slate-50">
      {/* Blob 1 - Top Left (Cyan/Blue) */}
      <motion.div style={{ x: shiftX1, y: shiftY1, willChange: 'transform' }} className="absolute inset-0 opacity-[0.3]">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[100vw] h-[100vw] md:w-[80vw] md:h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.8)_0%,rgba(6,182,212,0.4)_40%,transparent_70%)] blur-[60px] md:blur-[120px]"
          style={{ willChange: 'transform' }}
          animate={{
            scale: [1, 1.3, 1],
            x: ["0%", "30%", "0%"],
            y: ["0%", "20%", "0%"],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Blob 2 - Bottom Right (Pink/Orange) */}
      <motion.div style={{ x: shiftX2, y: shiftY2, willChange: 'transform' }} className="absolute inset-0 opacity-[0.25]">
        <motion.div 
          className="absolute -bottom-[10%] -right-[10%] w-[110vw] h-[110vw] md:w-[90vw] md:h-[90vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.8)_0%,rgba(249,115,22,0.5)_40%,transparent_70%)] blur-[70px] md:blur-[140px]"
          style={{ willChange: 'transform' }}
          animate={{
            scale: [1, 1.4, 1],
            x: ["0%", "-40%", "0%"],
            y: ["0%", "-30%", "0%"],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Blob 3 - Center (Warm Cream/Yellow) */}
      <motion.div style={{ x: shiftX3, y: shiftY3, willChange: 'transform' }} className="absolute inset-0 opacity-[0.2]">
        <motion.div 
          className="absolute top-[10%] left-[10%] w-[120vw] h-[100vw] md:w-[100vw] md:h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.7)_0%,rgba(234,179,8,0.4)_50%,transparent_70%)] blur-[80px] md:blur-[160px]"
          style={{ willChange: 'transform' }}
          animate={{
            scale: [1, 1.2, 1.3, 1],
            x: ["0%", "25%", "-25%", "0%"],
            y: ["0%", "-25%", "25%", "0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  )
}
