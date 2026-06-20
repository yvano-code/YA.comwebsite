"use client"

import { motion } from "framer-motion"

export function InfinityAbyss() {
  const layerCount = 12
  const duration = 12

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="relative w-full max-w-[150vw] aspect-square flex items-center justify-center mix-blend-overlay opacity-60">
        {Array.from({ length: layerCount }).map((_, i) => {
          const delay = (i / layerCount) * duration
          
          return (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                // A deep glowing ring effect using subtle colors matching the pastel theme
                background: "radial-gradient(circle at center, transparent 40%, rgba(100, 100, 100, 0.05) 45%, rgba(0, 0, 0, 0.1) 50%, rgba(255, 255, 255, 0.4) 60%, transparent 65%)",
                boxShadow: "inset 0 0 80px rgba(0,0,0,0.05), 0 0 80px rgba(0,0,0,0.05)"
              }}
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{
                scale: [0.1, 4],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              }}
            />
          )
        })}
      </div>
      
      {/* Deep center void overlay to make the center feel infinitely dark/deep */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_0%,transparent_20%)] pointer-events-none blur-3xl" />
      
      {/* Outer vignette to make the rings fade out beautifully at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(240,240,245,0.8)_80%)] pointer-events-none" />
    </div>
  )
}
