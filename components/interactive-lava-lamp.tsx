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
    <div className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden bg-[#faf9f6]">
      {/* Blob 1 - Top Left (Cyan/Blue) */}
      <motion.div style={{ x: shiftX1, y: shiftY1 }} className="absolute inset-0 opacity-[0.52]">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(186,230,253,0.8)_0%,transparent_70%)] blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: ["0%", "25%", "0%"],
            y: ["0%", "15%", "0%"],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Blob 2 - Bottom Right (Pink/Orange) */}
      <motion.div style={{ x: shiftX2, y: shiftY2 }} className="absolute inset-0 opacity-[0.45]">
        <motion.div 
          className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(254,205,211,0.8)_0%,rgba(255,237,213,0.5)_40%,transparent_70%)] blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: ["0%", "-30%", "0%"],
            y: ["0%", "-20%", "0%"],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Blob 3 - Center (Warm Cream/Yellow) */}
      <motion.div style={{ x: shiftX3, y: shiftY3 }} className="absolute inset-0 opacity-[0.37]">
        <motion.div 
          className="absolute top-[20%] left-[20%] w-[80vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(254,240,138,0.6)_0%,transparent_70%)] blur-[140px]"
          animate={{
            scale: [1, 1.1, 1.2, 1],
            x: ["0%", "15%", "-15%", "0%"],
            y: ["0%", "-15%", "15%", "0%"],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  )
}
