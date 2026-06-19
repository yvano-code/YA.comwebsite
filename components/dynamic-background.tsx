"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type Colorway = {
  id: string
  baseBg: string
  blob1: string
  blob2: string
  blob3: string
}

const NEUTRAL_COLORWAY: Colorway = {
  id: "neutral",
  baseBg: "bg-[#e5e5eb]", // Slightly darker off-white for drama
  blob1: "from-zinc-400/50 via-gray-300/50 to-transparent",
  blob2: "from-gray-400/50 via-slate-300/50 to-transparent",
  blob3: "from-slate-300/50 via-zinc-300/50 to-transparent"
}

export function DynamicBackground() {
  const [colorway, setColorway] = useState<Colorway>(NEUTRAL_COLORWAY)

  useEffect(() => {
    const handleBgChange = (e: Event) => {
      const customEvent = e as CustomEvent<Colorway | null>
      if (customEvent.detail) {
        setColorway(customEvent.detail)
      } else {
        setColorway(NEUTRAL_COLORWAY)
      }
    }
    
    window.addEventListener('bg-change', handleBgChange)
    return () => window.removeEventListener('bg-change', handleBgChange)
  }, [])

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-[-2] transition-colors duration-[1500ms] ease-in-out ${colorway.baseBg}`}>
      <AnimatePresence mode="popLayout">
        <motion.div 
          key={colorway.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }} // Increased master opacity for brighter look
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Blob 1 - Slow sweep across top */}
          <motion.div 
            className={`absolute -top-[20%] -left-[10%] w-[80vw] h-[60vw] rounded-[100%] bg-gradient-to-br ${colorway.blob1} blur-[120px] opacity-80`} 
            animate={{ x: ["0vw", "30vw", "0vw"], y: ["0vh", "10vh", "0vh"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Blob 2 - Slow sweep across bottom right */}
          <motion.div 
            className={`absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-[100%] bg-gradient-to-tl ${colorway.blob2} blur-[120px] opacity-80`} 
            animate={{ x: ["0vw", "-40vw", "0vw"], y: ["0vh", "-20vh", "0vh"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Blob 3 - Center breathing drift */}
          <motion.div 
            className={`absolute top-[10%] left-[10%] w-[90vw] h-[80vw] rounded-[100%] bg-gradient-to-tr ${colorway.blob3} blur-[140px] opacity-70`} 
            animate={{ scale: [1, 1.15, 1], x: ["0vw", "10vw", "0vw"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
