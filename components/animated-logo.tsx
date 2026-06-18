"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  
  // The full string we want to animate
  const fullText = "YVANO ANTONIO.".split("")
  
  // Which letters correspond to "YA."? 
  // Y = 0, A in ANTONIO = 6, . = 13
  const isY = (i: number) => i === 0
  const isA = (i: number) => i === 6
  const isDot = (i: number) => i === 13
  const isYA = (i: number) => isY(i) || isA(i) || isDot(i)

  // Random positions for the "spilling out" phase
  const getRandomSpill = () => {
    // Spill outwards mostly to the right and down (diagonally towards center)
    // Constrain X to avoid horizontal scrolling on small screens, but spread enough
    return {
      x: Math.random() * 250 + 20, 
      y: Math.random() * 120 + 10,
      rotate: (Math.random() - 0.5) * 180,
      scale: Math.random() * 0.5 + 0.8,
    }
  }

  // Use a ref to track if we're currently hovering so async sequences can abort/adapt
  const hoverRef = useRef(false)

  useEffect(() => {
    hoverRef.current = isHovered
    
    const runAnimation = async () => {
      if (isHovered) {
        // --- HOVER IN SEQUENCE ---
        
        // 1. Spilling out like toys (Jumbled state)
        await controls.start((i) => ({
          ...getRandomSpill(),
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 400, damping: 25, delay: i * 0.015 }
        }))
        
        if (!hoverRef.current) return // Abort if mouse left

        // 2. Spell correctly (Final frame, stays here)
        controls.start((i) => ({
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 350, damping: 22 }
        }))
        
      } else {
        // --- HOVER OUT SEQUENCE ---
        
        // Mouse removed: go back to "YA."
        controls.start((i) => {
          if (isYA(i)) {
            return {
              x: 0, 
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              width: "auto",
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }
          } else {
            return {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 0,
              opacity: 0,
              width: 0,
              transition: { duration: 0.2 }
            }
          }
        })
      }
    }

    runAnimation()
  }, [isHovered, controls])

  return (
    <Link 
      href="/" 
      className="text-3xl font-black tracking-tighter relative flex items-center h-12 z-50 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex relative items-baseline">
        {fullText.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            animate={controls}
            initial={
              isYA(i) 
                ? { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, width: "auto" } 
                : { opacity: 0, scale: 0, x: 0, y: 0, rotate: 0, width: 0 }
            }
            className={`inline-block origin-center whitespace-pre ${isYA(i) ? 'z-20' : 'z-10'}`}
            style={{ 
              overflow: 'visible',
              // Add a slight min-width to space to ensure it renders correctly when width is auto
              minWidth: char === ' ' && isHovered ? '0.25em' : 'auto'
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </Link>
  )
}
