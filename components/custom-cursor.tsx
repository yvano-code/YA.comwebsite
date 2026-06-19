"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Ripple = {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement
      const isClickable = target.tagName?.toLowerCase() === 'a' || 
                          target.tagName?.toLowerCase() === 'button' ||
                          window.getComputedStyle(target).cursor === 'pointer' ||
                          target.closest('a') !== null ||
                          target.closest('button') !== null
                          
      setIsHovering(isClickable)
    }
    
    const handleMouseDown = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY }
      setRipples(prev => [...prev, newRipple])
      
      // Clean up ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 1000)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isVisible])

  // Don't render on server or touch devices
  if (typeof window === 'undefined') return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
          iframe {
            cursor: auto !important;
          }
        }
      `}} />
      
      {/* Ripples */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8, borderWidth: '2px' }}
            animate={{ scale: 3, opacity: 0, borderWidth: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9998] rounded-full border-white/60 bg-white/20 backdrop-blur-sm"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Cursor (Liquid Glass) */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center mix-blend-difference"
          animate={{
            x: mousePos.x - (isHovering ? 20 : 12),
            y: mousePos.y - (isHovering ? 20 : 12),
            width: isHovering ? 40 : 24,
            height: isHovering ? 40 : 24,
          }}
          transition={{
            type: "spring",
            stiffness: 1000,
            damping: 40,
            mass: 0.2
          }}
        >
          {/* Glass Orb Body */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[4px] border border-white/40 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.6)]" />
          {/* Liquid highlight */}
          <div className="absolute top-[15%] left-[25%] w-[25%] h-[25%] bg-white/80 rounded-full blur-[1px]" />
        </motion.div>
      )}
    </>
  )
}
