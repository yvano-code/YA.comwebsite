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
    // Spill outwards from center
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 60 + 20
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 20, // slightly upwards
      rotate: (Math.random() - 0.5) * 180,
      scale: Math.random() * 0.4 + 0.8,
    }
  }

  // Random positions for the "jumble" phase (landed)
  const getRandomJumble = () => {
    // Pile up loosely at the bottom
    return {
      x: (Math.random() - 0.5) * 120, // Spread horizontally
      y: Math.random() * 20 + 10,     // Fall down slightly
      rotate: (Math.random() - 0.5) * 120,
      scale: 1,
    }
  }

  // Use a ref to track if we're currently hovering so async sequences can abort/adapt
  const hoverRef = useRef(false)

  useEffect(() => {
    hoverRef.current = isHovered
    
    const runAnimation = async () => {
      if (isHovered) {
        // --- HOVER IN SEQUENCE ---
        
        // 1. Spilling out like toys
        await controls.start((i) => ({
          ...getRandomSpill(),
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 300, damping: 15, delay: i * 0.01 }
        }))
        
        if (!hoverRef.current) return // Abort if mouse left

        // 2. Spell correctly briefly
        await controls.start((i) => ({
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 200, damping: 12, mass: 0.8 }
        }))
        
        if (!hoverRef.current) return // Abort if mouse left
        
        // Pause briefly to read it
        await new Promise(r => setTimeout(r, 800))
        
        if (!hoverRef.current) return // Abort if mouse left

        // 3. Collapse into a jumble
        controls.start((i) => ({
          ...getRandomJumble(),
          transition: { type: "spring", stiffness: 100, damping: 10, mass: 1.5 }
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
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }
          } else {
            return {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 0,
              opacity: 0,
              width: 0,
              transition: { duration: 0.3 }
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
