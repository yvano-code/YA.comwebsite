"use client"

import { motion, MotionValue, useTransform } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { useEffect, useState } from "react"

interface VortexTunnelProps {
  scrollYProgress: MotionValue<number>
}

export function VortexTunnel({ scrollYProgress }: VortexTunnelProps) {
  // Prevent hydration mismatches with a mounted state
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // We build a true vortex by stacking rings. 
  // By scaling them down exponentially and overlapping them, we create a tight vanishing point.
  const numRings = 20
  const panelsPerRing = 8 
  
  const panelWidth = 800     
  const panelHeight = 800    
  
  // Radius for an octagonal cylinder
  const radius = (panelWidth / 2) / Math.tan(Math.PI / panelsPerRing)

  // Pre-calculate the scale and Z position of each ring to form a vanishing point cone
  const ringsData = []
  let currentZ = 0
  for (let i = 0; i < numRings; i++) {
    const scale = Math.pow(0.8, i) // Taper down to ~1% size
    ringsData.push({ ringIndex: i, ringZ: currentZ, scale })
    // Advance Z by a fraction of the scaled height to densely overlap the layers
    currentZ -= (panelHeight * 0.35) * scale 
  }

  // The total depth is about -1100px. We want to fly mostly through it.
  const cameraZ = useTransform(scrollYProgress, [0, 1], [0, 900])
  
  // The camera slowly rotates to match the twist of the vortex
  const tunnelRotateZ = useTransform(scrollYProgress, [0, 1], [0, 240])

  // Fade the tunnel in as soon as scrolling starts
  const tunnelOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0.5, 1])

  const projects = siteConfig.imdbCredits.slice(0, 8)

  if (!mounted) return null

  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center pointer-events-none"
      style={{ perspective: 800, opacity: tunnelOpacity }}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ 
          transformStyle: "preserve-3d", 
          z: cameraZ, 
          rotateZ: tunnelRotateZ
        }}
      >
        {ringsData.map(({ ringIndex, ringZ, scale }) => {
          // The Twist! Each ring is rotated slightly more than the last, creating a smooth vortex spiral curve
          const ringTwist = ringIndex * 15 // Tighter twist for the cone
          
          return (
            <div
              key={`ring-${ringIndex}`}
              className="absolute flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(${ringZ}px) rotateZ(${ringTwist}deg) scale(${scale})`
              }}
            >
              {Array.from({ length: panelsPerRing }).map((_, panelIndex) => {
                // Each column of the vortex displays one specific project
                const project = projects[panelIndex]

                // Angle for the octagonal cylinder
                const angle = panelIndex * (360 / panelsPerRing)
                
                return (
                  <div
                    key={`panel-${ringIndex}-${panelIndex}`}
                    className="absolute flex items-center justify-center overflow-hidden"
                    style={{
                      width: `${panelWidth}px`,
                      height: `${panelHeight}px`,
                      marginLeft: `-${panelWidth / 2}px`,
                      marginTop: `-${panelHeight / 2}px`,
                      // Fold the panels into a cylinder
                      transform: `rotateZ(${angle}deg) translateY(-${radius}px) rotateX(-90deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    <div className="w-full h-full relative border-[0.5px] border-black/80 flex items-center justify-center bg-[#050505]">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      <div className="relative z-10 rotate-90 flex flex-col items-center text-center px-12 pb-12 w-[800px]">
                        <span className="text-xl font-bold tracking-[0.4em] text-white/50 mb-2 uppercase">
                          {project.year} • {project.type}
                        </span>
                        <span className="text-[70px] leading-[0.9] font-black tracking-tighter text-white uppercase drop-shadow-2xl">
                          {project.title}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
