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
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className={`absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br ${colorway.blob1} blur-[100px] animate-pulse`} style={{ animationDuration: '10s' }} />
          <div className={`absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl ${colorway.blob2} blur-[120px] animate-pulse`} style={{ animationDuration: '12s', animationDelay: '2s' }} />
          <div className={`absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr ${colorway.blob3} blur-[150px] animate-pulse`} style={{ animationDuration: '15s', animationDelay: '5s' }} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
