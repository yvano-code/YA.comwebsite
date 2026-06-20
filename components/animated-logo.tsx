"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence, useSpring, useTransform, MotionValue } from "framer-motion"


function useSafeAnimation() {
  const controls = useAnimation();
  if (!(controls as any)._isPatched) {
    const origStart = controls.start;
    controls.start = async (...args: any[]) => {
      try {
        return await origStart.apply(controls, args);
      } catch (e: any) {
        if (e && e.message && e.message.includes("mounted")) return;
        throw e;
      }
    };
    (controls as any)._isPatched = true;
  }
  return controls;
}

import Link from "next/link"

const MickeyGlove = ({ className }: { className?: string }) => {
  const shapes = (
    <>
      <path d="M 25,65 C 5,60 5,35 25,35 C 40,35 45,50 45,50" />
      <path d="M 35,45 C 30,15 50,10 60,30 C 65,40 60,55 60,55" />
      <path d="M 55,45 C 60,15 85,15 85,35 C 85,50 75,60 75,60" />
      <path d="M 70,50 C 95,40 105,65 90,80 C 80,90 65,80 65,80" />
      <circle cx="55" cy="65" r="25" />
      <path d="M 25,85 C 20,105 90,105 85,85 Z" />
    </>
  )
  return (
    <svg viewBox="0 0 110 110" className={className} style={{ overflow: "visible" }}>
      <g stroke="#000" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" fill="#000">{shapes}</g>
      <g fill="#FFF">{shapes}</g>
      <path d="M 45,55 Q 40,65 42,75" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 55,55 Q 55,65 55,75" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 65,55 Q 70,65 68,75" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 25,85 Q 55,75 85,85" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

const MickeyShoe = ({ className, flipped = false }: { className?: string, flipped?: boolean }) => {
  const shapes = (
    <>
      <path d="M 40,25 C 10,25 0,40 0,60 C 0,85 40,90 60,90 C 85,90 100,80 100,55 C 100,30 80,25 65,35 C 55,42 45,42 40,25 Z" />
      <ellipse cx="65" cy="20" rx="20" ry="10" />
    </>
  )
  return (
    <svg viewBox="0 0 110 100" className={className} style={{ overflow: "visible", transform: flipped ? 'scaleX(-1)' : 'none' }}>
      <g stroke="#000" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" fill="#000">{shapes}</g>
      <g fill="#FFCC00">
        <path d="M 40,25 C 10,25 0,40 0,60 C 0,85 40,90 60,90 C 85,90 100,80 100,55 C 100,30 80,25 65,35 C 55,42 45,42 40,25 Z" />
        <ellipse cx="65" cy="20" rx="20" ry="10" />
      </g>
      <ellipse cx="65" cy="20" rx="12" ry="5" fill="#000" />
      <path d="M 30,45 Q 40,65 60,50" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}



const DustCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" className={className} style={{ overflow: "visible" }}>
    <circle cx="25" cy="25" r="15" fill="#D1D5DB" />
    <circle cx="15" cy="20" r="10" fill="#D1D5DB" />
    <circle cx="35" cy="20" r="10" fill="#D1D5DB" />
  </svg>
)

function GoodYuteLogo({ isHovered }: { isHovered: boolean }) {
  const topTextControls = useSafeAnimation()
  const bottomTextControls = useSafeAnimation()
  const dotControls = useSafeAnimation()
  const exclamationControls = useSafeAnimation()

  useEffect(() => {
    let isCancelled = false

    const runSequence = async () => {
      if (isHovered) {
        // 1. Expand "OU'RE "
        topTextControls.start({ width: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeOut" } })
        
        await new Promise(r => setTimeout(r, 450))
        if (isCancelled) return

        // 2. Drop the dot (one line down)
        dotControls.start({ y: "0.88em", transition: { type: "spring", stiffness: 300, damping: 15 } })
        
        await new Promise(r => setTimeout(r, 250))
        if (isCancelled) return

        // 3. Expand "GOOD YUTE" to the left
        bottomTextControls.start({ x: 0, transition: { duration: 0.5, ease: "easeOut" } })

        await new Promise(r => setTimeout(r, 500))
        if (isCancelled) return

        // 4. Reveal exclamation mark vertically
        exclamationControls.start({ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.25, ease: "easeOut" } })

      } else {
        // Reverse sequence
        // 1. Hide exclamation mark vertically
        exclamationControls.start({ clipPath: "inset(100% 0% 0% 0%)", transition: { duration: 0.2, ease: "easeIn" } })
        
        await new Promise(r => setTimeout(r, 250))
        if (isCancelled) return

        // 2. Collapse "GOOD YUTE"
        bottomTextControls.start({ x: "100%", transition: { duration: 0.3, ease: "easeIn" } })
        
        await new Promise(r => setTimeout(r, 350))
        if (isCancelled) return

        // 3. Raise the dot
        dotControls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
        
        await new Promise(r => setTimeout(r, 200))
        if (isCancelled) return

        // 4. Collapse "OU'RE "
        topTextControls.start({ width: 0, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } })
      }
    }

    runSequence()

    return () => { isCancelled = true }
  }, [isHovered, topTextControls, bottomTextControls, dotControls, exclamationControls])

  return (
    <div className="flex relative items-baseline font-black leading-[0.88] tracking-tighter z-20">
      {/* Top Line */}
      <span className="inline-block relative z-20">Y</span>
      
      <motion.div 
        animate={topTextControls} 
        initial={{ width: 0, opacity: 0 }}
        className="overflow-hidden flex items-baseline whitespace-pre"
      >
        <span>OU'RE </span>
      </motion.div>
      
      <span className="inline-block relative z-20">A</span>
      
      <motion.span 
        animate={dotControls}
        initial={{ y: 0 }}
        className="inline-flex relative z-20 items-baseline"
      >
        <div className="absolute right-[100%] overflow-hidden flex whitespace-pre">
          <motion.span 
            animate={bottomTextControls}
            initial={{ x: "100%" }}
            className="inline-block"
          >
            GOOD YUTE&nbsp;
          </motion.span>
        </div>
        <span className="relative inline-flex items-baseline justify-center">
          <span className="opacity-0 pointer-events-none">!</span>
          <span className="absolute inset-0 pointer-events-none flex items-baseline justify-center">.</span>
          <motion.span 
            animate={exclamationControls}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            className="absolute inset-0 pointer-events-none flex items-baseline justify-center"
          >
            !
          </motion.span>
        </span>
      </motion.span>
    </div>
  )
}

const TOY_COLORS = [
  { color: '#ef4444', extrude: '#991b1b' }, // Red
  { color: '#3b82f6', extrude: '#1e3a8a' }, // Blue
  { color: '#eab308', extrude: '#854d0e' }, // Yellow
  { color: '#22c55e', extrude: '#166534' }, // Green
  { color: '#f97316', extrude: '#9a3412' }, // Orange
  { color: '#ec4899', extrude: '#831843' }, // Pink
  { color: '#8b5cf6', extrude: '#4c1d95' }, // Purple
  { color: '#14b8a6', extrude: '#0f766e' }, // Teal
];

const SPECIFIC_COLORS: Record<number, { color: string, extrude: string }> = {
  0: { color: '#00c2ff', extrude: '#007ab8' }, // Bright Sky Blue
  6: { color: '#f97316', extrude: '#9a3412' }, // Orange
  13: { color: '#00f5d4', extrude: '#00a398' } // Bright Teal
};

const getToyStyle = (index: number, char: string) => {
  if (char === ' ') return {};
  const style = SPECIFIC_COLORS[index] || TOY_COLORS[index % TOY_COLORS.length];
  return {
    color: style.color,
    fontFamily: '"Arial Rounded MT Bold", "Varela Round", "Fredoka One", "Comic Sans MS", sans-serif',
    textShadow: `
      0px 1px 0px ${style.extrude},
      0px 2px 0px ${style.extrude},
      0px 3px 0px ${style.extrude},
      0px 4px 0px ${style.extrude},
      0px 5px 0px ${style.extrude},
      0px 6px 0px ${style.extrude},
      0px 7px 0px ${style.extrude},
      0px 8px 0px ${style.extrude},
      0px 9px 0px ${style.extrude},
      0px 10px 0px ${style.extrude},
      0px 11px 0px ${style.extrude},
      0px 12px 0px ${style.extrude},
      0px 20px 15px rgba(0,0,0,0.4)
    `,
  };
};

export function TumblerLogo({ isHovered }: { isHovered: boolean }) {

  const controls = useSafeAnimation()
  
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

  const hoverRef = useRef(false)

  useEffect(() => {
    let isCancelled = false
    hoverRef.current = isHovered
    
    const runAnimation = async () => {
      if (isHovered) {
        // --- HOVER IN SEQUENCE ---
        
        // 1. Spilling out like toys
        if (isCancelled) return
        await controls.start((i) => ({
          ...getRandomSpill(),
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 300, damping: 15, delay: i * 0.01 }
        }))
        
        if (!hoverRef.current || isCancelled) return // Abort if mouse left

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
        
        if (!hoverRef.current || isCancelled) return // Abort if mouse left
        
        // Pause briefly to read it
        await new Promise(r => setTimeout(r, 1800))
        
        if (!hoverRef.current || isCancelled) return // Abort if mouse left

        // 3. Collapse into a jumble
        await controls.start((i) => ({
          ...getRandomJumble(),
          transition: { type: "spring", stiffness: 100, damping: 10, mass: 1.5 }
        }))
        
      } else {
        // --- HOVER OUT SEQUENCE ---
        
        if (isCancelled) return
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

    return () => {
      isCancelled = true
    }
  }, [isHovered, controls])

  return (
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
            minWidth: char === ' ' && isHovered ? '0.25em' : 'auto',
            ...getToyStyle(i, char)
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

const RocketFire = ({ className }: { className?: string }) => (
  <img src="/rocket-fire.png" alt="Rocket Fire" className={`object-contain rotate-180 ${className}`} style={{ filter: "drop-shadow(0px 10px 10px rgba(255, 100, 0, 0.5))" }} />
)

const RocketSmoke = ({ className }: { className?: string }) => (
  <img src="/rocket-smoke.png" alt="Rocket Smoke" className={`object-contain ${className}`} style={{ filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.2))" }} />
)

function RocketLogo({ isHovered }: { isHovered: boolean }) {
  const yControls = useSafeAnimation()
  const aControls = useSafeAnimation()
  const dotControls = useSafeAnimation()
  const fireControls = useSafeAnimation()
  const smokeControls = useSafeAnimation()
  const [countdown, setCountdown] = useState<number | null>(null)
  const hoverRef = useRef(false)

  useEffect(() => {
    hoverRef.current = isHovered
    let isCancelled = false
    
    const runAnimation = async () => {
      if (isHovered) {
        // 1. Countdown
        if (isCancelled) return
        setCountdown(3)
        // rumble Y and Dot
        yControls.start({ x: [-1, 1, -1, 1], y: [-1, 1, -1, 1], transition: { repeat: Infinity, duration: 0.1 } })
        dotControls.start({ x: [-1, 1, -1, 1], y: [-1, 1, -1, 1], transition: { repeat: Infinity, duration: 0.1 } })
        aControls.start({ y: [0, -2, 0], transition: { repeat: Infinity, duration: 0.1 } })
        
        await new Promise(r => setTimeout(r, 1000))
        if (!hoverRef.current) { isCancelled = true; return }
        setCountdown(2)
        await new Promise(r => setTimeout(r, 1000))
        if (!hoverRef.current) { isCancelled = true; return }
        setCountdown(1)
        
        // Ignite engine
        fireControls.start({ 
          opacity: 1, 
          scale: 1,
          scaleX: 0.8, 
          scaleY: 1, 
          transition: { duration: 0.5, ease: "easeOut" } 
        })
        smokeControls.start({ opacity: [0, 1], scale: [0, 1.5], y: 0, transition: { duration: 1 } })
        
        await new Promise(r => setTimeout(r, 1000))
        if (!hoverRef.current) { isCancelled = true; return }
        setCountdown(0)
        await new Promise(r => setTimeout(r, 200))
        setCountdown(null)
        
        // Stop rumbling Y and Dot at liftoff
        yControls.stop()
        dotControls.stop()
        if (isCancelled) return
        yControls.start({ x: 0, y: 0 })
        dotControls.start({ x: 0, y: 0 })

        // BLAST OFF SEQUENCE
        // 1. The Implosion / Anticipation Squash
        // It smoothly squashes down to build energy
        await aControls.start({
          scaleX: 1.5,
          scaleY: 0.5,
          y: 20,
          transition: { duration: 0.4, ease: "easeInOut" }
        })
        if (isCancelled) return
        
        // Brief extreme squeeze right before launch!
        await aControls.start({
          scaleX: 1.8,
          scaleY: 0.3,
          y: 25,
          transition: { duration: 0.1, ease: "easeIn" }
        })
        if (isCancelled) return

        // 2. EXPLOSION and Vertical Burst!
        smokeControls.start({ y: [0, 200], scale: [1.5, 6], opacity: [1, 0], transition: { duration: 0.8, ease: "easeOut" } })
        fireControls.start({ opacity: 1, scaleX: 0.6, scaleY: 2.0, transition: { duration: 0.3, ease: "easeOut" } })
        
        // VERY IMPORTANT: Restore scaleX and scaleY to 1 during launch so it looks normal upon return!
        aControls.start({
          scaleX: 1,
          scaleY: 1,
          transition: { duration: 0.2, ease: "easeOut" }
        })
        
        const w = typeof window !== "undefined" ? window.innerWidth : 1500;
        const h = typeof window !== "undefined" ? window.innerHeight : 1000;
        
        const paths = [
          {
            // Path 1: Orbit Right, Return from Bottom Left
            takeoff: {
              y: [20, -200, -600, -700, -400],
              x: [0, 20, 200, 600, w + 200],
              rotate: [0, 10, 45, 75, 90],
              scale: [1, 0.8, 0.6, 0.4, 0.1],
              transition: { duration: 2.5, ease: "easeInOut", times: [0, 0.2, 0.5, 0.8, 1] }
            },
            teleport: { x: -100, y: h + 200, rotate: 45, scale: 0.1 },
            landing: {
              y: [h + 200, h * 0.7, h * 0.3, 0],
              x: [-100, 150, 50, 0],
              rotate: [45, 15, -10, 0],
              scale: [0.1, 0.4, 0.7, 1],
              transition: { duration: 2.5, ease: "easeOut", times: [0, 0.4, 0.7, 1] }
            }
          },
          {
            // Path 2: Vertical Space Shot, Return from Bottom Right
            takeoff: {
              y: [20, -300, -800],
              x: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: [1, 0.6, 0.1],
              transition: { duration: 1.5, ease: "easeIn", times: [0, 0.5, 1] }
            },
            teleport: { x: w + 200, y: h + 200, rotate: -45, scale: 0.1 },
            landing: {
              y: [h + 200, h * 0.6, h * 0.2, 0],
              x: [w + 200, 300, -100, 0],
              rotate: [-45, -20, 10, 0],
              scale: [0.1, 0.4, 0.7, 1],
              transition: { duration: 2.5, ease: "easeOut", times: [0, 0.4, 0.7, 1] }
            }
          }
        ];
        
        const selectedPath = paths[Math.floor(Math.random() * paths.length)];
        
        // Take off
        await aControls.start(selectedPath.takeoff)
        
        if (isCancelled) return

        // Cut engines momentarily while off-screen
        fireControls.start({ opacity: 0, scale: 0, transition: { duration: 0.1 } })
        
        // 3. Wraps around the Earth!
        // Instantly teleport to the start of the landing path
        aControls.set(selectedPath.teleport)
        
        // Wait a tiny beat for suspense
        await new Promise(r => setTimeout(r, 200))
        if (isCancelled) return
        
        // Retrorockets fire!
        fireControls.start({ 
          opacity: [0, 1, 1, 0], 
          scaleX: [0, 0.8, 0.5, 0], 
          scaleY: [0, 2.0, 1.5, 0], 
          transition: { duration: 2.5, times: [0, 0.1, 0.9, 1], ease: "easeInOut" } 
        })
        smokeControls.start({
          opacity: [0, 1, 1, 0],
          scale: [0, 1.5, 1.5, 0],
          y: 0,
          transition: { duration: 2.5, times: [0, 0.1, 0.9, 1], ease: "easeInOut" }
        })
        
        // 4. Smooth Landing back to the start
        await aControls.start(selectedPath.landing)
        
        if (isCancelled) return

        // Cut the engine on touchdown (already faded out by the landing transition)
        fireControls.start({ opacity: 0, scale: 0, transition: { duration: 0.1 } })
        
        // Small puff of smoke on touchdown
        smokeControls.start({ scale: [0, 1.5], opacity: [0, 0.5, 0], y: [0, 20], transition: { duration: 0.5 } })
        
      } else {
        // RESET state instantly
        hoverRef.current = false
        isCancelled = true
        setCountdown(null)
        yControls.stop()
        dotControls.stop()
        aControls.stop()
        fireControls.stop()
        smokeControls.stop()
        
        yControls.start({ x: 0, y: 0 })
        dotControls.start({ x: 0, y: 0 })
        aControls.start({ x: 0, y: 0, rotate: 0, scale: 1, transition: { type: "spring" } })
        fireControls.start({ opacity: 0, scale: 0 })
        smokeControls.start({ opacity: 0, scale: 0, y: 0 })
      }
    }
    
    runAnimation()

    return () => {
      isCancelled = true
    }
  }, [isHovered, yControls, dotControls, aControls, fireControls, smokeControls])

  return (
    <div className="flex relative items-baseline">
      <motion.span animate={yControls} className="inline-block relative z-20">Y</motion.span>
      <motion.span animate={aControls} className="inline-block relative z-30 origin-bottom">
        A
        <motion.div animate={fireControls} initial={{ opacity: 0, scale: 0 }} className="absolute top-[85%] left-[50%] -translate-x-[50%] w-[0.8em] h-[1.5em] origin-top">
          <RocketFire className="w-full h-full" />
        </motion.div>
        <motion.div animate={smokeControls} initial={{ opacity: 0, scale: 0, y: 0 }} className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[3em] h-[3em] origin-top z-[-1]">
          {/* Main big puff */}
          <RocketSmoke className="absolute inset-0 w-full h-full" />
          
          {/* Billowing trailing puffs to create a spreading smoke column */}
          <motion.div animate={{ scale: [1, 2.5, 4], x: [0, -60, -100], y: [0, 40, 100], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0 }} className="absolute inset-0">
            <RocketSmoke className="w-full h-full" />
          </motion.div>
          <motion.div animate={{ scale: [1, 2.5, 4], x: [0, 60, 100], y: [0, 40, 100], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }} className="absolute inset-0">
            <RocketSmoke className="w-full h-full" />
          </motion.div>
          <motion.div animate={{ scale: [1, 2.5, 4], x: [0, -30, -50], y: [0, 80, 180], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }} className="absolute inset-0">
            <RocketSmoke className="w-full h-full" />
          </motion.div>
          <motion.div animate={{ scale: [1, 2.5, 4], x: [0, 30, 50], y: [0, 80, 180], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.9 }} className="absolute inset-0">
            <RocketSmoke className="w-full h-full" />
          </motion.div>
          <motion.div animate={{ scale: [1, 2.5, 4], x: [0, 0, 0], y: [0, 60, 150], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }} className="absolute inset-0">
            <RocketSmoke className="w-full h-full" />
          </motion.div>
        </motion.div>
      </motion.span>
      <motion.span animate={dotControls} className="inline-block relative z-20">.</motion.span>
      
      {countdown !== null && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-[-30px] left-[50%] -translate-x-[50%] text-red-500 font-black text-xl pointer-events-none drop-shadow-md z-50"
        >
          {countdown}
        </motion.div>
      )}
    </div>
  )
}

function StoryTellerLogo({ isHovered }: { isHovered: boolean }) {
  const [isActive, setIsActive] = useState(false)
  const dotControls = useSafeAnimation()
  
  const aControls = useSafeAnimation()
  const tControls = useSafeAnimation()
  const storControls = useSafeAnimation()
  const ellerControls = useSafeAnimation()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let isCancelled = false
    
    if (isHovered) {
      setIsActive(true)
      dotControls.start({ opacity: 0, transition: { duration: 0.4 } })
      
      // Clean scale morph for A -> T
      aControls.start({ scale: 0, opacity: 0, transition: { duration: 0.3, ease: "backIn" } })
      tControls.start({ scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.3, ease: "backOut" } })
      
      // Slide out from behind the anchors
      storControls.start({ x: "0%", transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.4 } })
      ellerControls.start({ x: "0%", transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.4 } })

    } else {
      if (isCancelled) return
      setIsActive(false)
      
      // Slide back behind the anchors
      storControls.start({ x: "100%", transition: { type: "spring", damping: 15, stiffness: 100 } })
      ellerControls.start({ x: "-100%", transition: { type: "spring", damping: 15, stiffness: 100 } })
      
      // Clean scale morph for T -> A
      tControls.start({ scale: 0, opacity: 0, transition: { duration: 0.3, delay: 0.2, ease: "backIn" } })
      aControls.start({ scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.5, ease: "backOut" } })
      
      dotControls.start({ opacity: 1, transition: { duration: 0.4, delay: 0.5 } })
    }
    
    return () => {
      isCancelled = true
      clearTimeout(timeoutId)
    }
  }, [isHovered, dotControls, aControls, tControls, storControls, ellerControls])

  return (
    <div className="flex relative items-baseline justify-center">
      {/* Y and STOR */}
      <span className="relative inline-block z-30">
        <div className="absolute right-[100%] top-0 flex items-baseline overflow-hidden h-full">
          {/* x: 100% hides STOR entirely behind Y due to the right-[100%] container mask */}
          <motion.div animate={storControls} initial={{ x: "100%" }} className="flex justify-end whitespace-pre pr-[0.05em] py-1">
            STOR
          </motion.div>
        </div>
        <span className="relative z-10">Y</span>
      </span>
      
      {/* A / T and ELLER */}
      <span className="relative inline-block z-30">
        {/* The base A dictates the layout width so it never shifts */}
        <motion.span animate={aControls} initial={{ scale: 1, opacity: 1 }} className="inline-block relative z-10 origin-center py-1">
          A
        </motion.span>
        
        {/* The T scales in directly over the A */}
        <motion.span animate={tControls} initial={{ scale: 0, opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-20 origin-center py-1">
          T
        </motion.span>

        {/* ELLER rolls out to the right */}
        <div className="absolute left-[100%] top-0 flex items-baseline overflow-hidden h-full">
          {/* x: -100% hides ELLER entirely behind A/T due to the left-[100%] container mask */}
          <motion.div animate={ellerControls} initial={{ x: "-100%" }} className="flex justify-start whitespace-pre pr-[0.1em] py-1">
            ELLER
          </motion.div>
        </div>
      </span>

      {/* The Dot */}
      <motion.span 
        animate={dotControls}
        initial={{ opacity: 1 }}
        className="inline-block whitespace-pre overflow-visible z-20"
      >
        .
      </motion.span>
    </div>
  )
}

const DUST_COUNT = 1200;
const dustParticles = Array.from({ length: DUST_COUNT }).map((_, i) => {
  const angle = Math.random() * Math.PI * 2;
  // Expansive radius (edge to edge viewport coverage)
  const radius = Math.pow(Math.random(), 1.5) * 2000 + 10;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  // Parallax depth! from -1500 to 2000
  const z = (Math.random() * 3500) - 1500;
  
  // More plentiful, smaller speckles
  const isBokeh = Math.random() > 0.90;
  const size = isBokeh ? Math.random() * 24 + 8 : Math.random() * 3.5 + 0.8;
  const blur = isBokeh ? size * 0.5 : Math.random() * 1.0;
  
  const delay = Math.random() * 0.4;
  // Photorealistic warm lighting with heavily weighted bright whites and soft yellows
  const colors = [
    "#ffffff", "#ffffff", "#ffffff", "#ffffff", 
    "#fffbeb", "#fffbeb", 
    "#fef08a", "#fef08a", 
    "#fde047", "#eab308", "#ca8a04", "#a16207"
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const twinkleDuration = Math.random() * 1.0 + 0.3; // Faster, punchier twinkle
  
  return { x, y, z, size, blur, delay, color, angle, twinkleDuration };
});

const getInitialPos = () => ({
  rotate: (Math.random() - 0.5) * 180,
  x: (Math.random() - 0.5) * 60,
  y: (Math.random() - 0.5) * 60
});

const csInitial = "CANADIAN SCREEN".split("").map(() => getInitialPos());
const awInitial = "AWARD WINNER".split("").map(() => getInitialPos());
const csaInitial = getInitialPos();

function AwardWinnerLogo({ isHovered }: { isHovered: boolean }) {
  const [isActive, setIsActive]   = useState(false)
  const [yVisible, setYVisible]   = useState(true)
  const yControls        = useSafeAnimation()   // Y scale-fade
  const aControls        = useSafeAnimation()   // Main A fade
  const dotControls      = useSafeAnimation()   // dot fade
  const aTextControls      = useSafeAnimation()   // The specific 'A' in the grid
  const restTextControls   = useSafeAnimation()   // The rest of the grid text
  const gridControls       = useSafeAnimation()   // The whole grid wrapper
  const swooshControls     = useSafeAnimation()   // The golden swoosh effect

  // Mouse tracking for 3D parallax
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (!isActive) return
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isActive, mouseX, mouseY])

  const rotateX = useTransform(mouseY, [-1, 1], [15, -15])
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let isCancelled = false

    const runAnimation = async () => {
      if (isHovered) {

        // ── 1. Fade out Y + dot ──────────────────────────────────────────────
        dotControls.start({ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } })
        await yControls.start({ scale: 0, opacity: 0, transition: { duration: 0.42, ease: "backIn" } })
        if (isCancelled) return
        setYVisible(false)

        // Hold A for a little bit longer
        await new Promise(r => setTimeout(r, 250))
        if (isCancelled) return

        // ── 2. Fade out A ────────────────────────────────────────────────────
        await aControls.start({ opacity: 0, transition: { duration: 0.28, ease: "easeInOut" } })
        if (isCancelled) return

        // ── 3. Mount grid ────────────────────────────────────────────────────
        setIsActive(true)
        await new Promise(r => setTimeout(r, 40))
        if (isCancelled) return

        // ── 4. Fade in the target A in its right spot ────────────────────────
        // grid initial is scale: 1, opacity: 1, so we don't need to set it
        await aTextControls.start({ 
          opacity: 1, scale: 1, rotate: 0, x: 0, y: 0, 
          transition: { duration: 0.3, ease: "easeOut" } 
        })
        if (isCancelled) return

        // ── 5. The rest of the letters burst out + dust swirl ───────────────────
        swooshControls.start(i => {
          const p = dustParticles[i as number]
          return {
            opacity: [0, 1, 0.4, 1, 0.9],
            x: [0, p.x],
            y: [0, p.y],
            z: [0, p.z],
            scale: [0, 1.2, 1],
            transition: { 
              duration: 2.5, 
              type: "spring", bounce: 0.3, delay: p.delay,
              opacity: { repeat: Infinity, duration: p.twinkleDuration, repeatType: "mirror", ease: "easeInOut" }
            }
          }
        })

        await restTextControls.start(i => ({
          opacity: 1, scale: 1, rotate: 0, x: 0, y: 0,
          transition: { type: "spring", damping: 12, stiffness: 130, delay: (i as number) * 0.015 }
        }))
        if (isCancelled) return

      } else {
        // ── Instant reset on unhover ─────────────────────────────────────────
        clearTimeout(timeoutId)
        setIsActive(false)
        setYVisible(true)
        aControls.set({ opacity: 1 })
        yControls.set({ scale: 1, opacity: 1 })
        dotControls.set({ opacity: 1 })
      }
    }

    runAnimation()
    return () => { isCancelled = true; clearTimeout(timeoutId) }
  }, [isHovered, yControls, aControls, dotControls, restTextControls, aTextControls, gridControls])

  return (
    <div className="flex relative items-baseline justify-center">
      {/* Y */}
      {yVisible && (
        <motion.span
          animate={yControls}
          initial={{ scale: 1, opacity: 1 }}
          className="inline-block origin-center z-20"
        >
          Y
        </motion.span>
      )}

      {/* A — fades in/out */}
      <motion.span
        animate={aControls}
        initial={{ opacity: 1 }}
        className="inline-block z-20"
      >
        A
      </motion.span>

      {/* Dot */}
      <motion.span
        animate={dotControls}
        initial={{ opacity: 1 }}
        className="inline-block z-20"
      >
        .
      </motion.span>

      {/* Centred text grid — Absolute so it centres perfectly over YA. */}
      {isActive && (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={gridControls}
          style={{ 
            transformOrigin: "center center", 
            perspective: "1200px", 
            transformStyle: "preserve-3d",
            rotateX, 
            rotateY 
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-50 w-max"
        >
          {/* Dust Swirl 3D Effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 pointer-events-none mix-blend-screen dark:mix-blend-color-dodge brightness-125 dark:brightness-150"
            style={{ width: 0, height: 0, transformStyle: "preserve-3d" }}
            animate={{ rotateZ: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {dustParticles.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                initial={{ opacity: 0, x: 0, y: 0, z: 0, scale: 0 }}
                animate={swooshControls}
                className="absolute rounded-full"
                style={{
                  width: p.size * 4,
                  height: p.size * 4,
                  background: `radial-gradient(circle at center, ${p.color} 0%, transparent 70%)`,
                  marginLeft: -(p.size * 4) / 2,
                  marginTop: -(p.size * 4) / 2,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity"
                }}
              />
            ))}
          </motion.div>

          <div
            className="flex flex-col items-center justify-center relative"
            style={{
              fontSize: "clamp(32px, 7.2vw, 84px)",
              letterSpacing: "-0.025em",
              transform: "translateZ(0)",
              transformStyle: "preserve-3d",
              lineHeight: 0.88,
              gap: "0.08em",
              fontWeight: 900,
            }}
          >
            {/* CANADIAN SCREEN */}
            <div className="flex items-baseline">
              {"CANADIAN SCREEN".split("").map((c, i) => (
                <motion.span
                  key={`cs-${i}`}
                  custom={i}
                  initial={{ opacity: 0, scale: 0, ...csInitial[i] }}
                  animate={restTextControls}
                  className="inline-block whitespace-pre"
                  style={{ minWidth: c === " " ? "0.22em" : "auto" }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
            {/* AWARD WINNER */}
            <div className="flex items-baseline relative">
              {"AWARD WINNER".split("").map((c, i) => (
                <motion.span
                  key={`aw-${i}`}
                  custom={i + 20}
                  initial={{ opacity: 0, scale: 0, ...awInitial[i] }}
                  animate={i === 0 ? aTextControls : restTextControls}
                  className="inline-block whitespace-pre"
                  style={{ minWidth: c === " " ? "0.22em" : "auto" }}
                >
                  {c}
                </motion.span>
              ))}
              <motion.img
                custom={35}
                initial={{ opacity: 0, scale: 0, ...csaInitial }}
                animate={restTextControls}
                src="/csa_award_clean.png"
                alt="Canadian Screen Award"
                className="absolute right-[-1.6em] bottom-[-0.2em] h-[2.8em] w-auto object-contain origin-bottom"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}



// ─── Spray Can SVG ────────────────────────────────────────────────────────────
const SprayCan = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 80" className={className} style={{ overflow: "visible" }}>
    {/* nozzle */}
    <rect x="22" y="4" width="10" height="5" rx="2" fill="#222" />
    <rect x="28" y="2" width="4" height="4" rx="1" fill="#555" />
    {/* body */}
    <rect x="8" y="10" width="24" height="52" rx="6" fill="#111" stroke="#000" strokeWidth="2" />
    {/* label stripe */}
    <rect x="8" y="28" width="24" height="14" rx="2" fill="#e63946" />
    <text x="20" y="38" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold" fontFamily="sans-serif">CITY</text>
    {/* cap */}
    <rect x="10" y="62" width="20" height="6" rx="3" fill="#444" />
    {/* finger bump */}
    <ellipse cx="32" cy="13" rx="5" ry="4" fill="#333" />
  </svg>
)


export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)
  const [animType, setAnimType] = useState<"cartoon" | "tumbler" | "rocket" | "storyteller" | "awardwinner">("cartoon")

  const handleMouseEnter = () => {
    if (!isHovered) {
      const allTypes: ("cartoon" | "tumbler" | "rocket" | "storyteller" | "awardwinner")[] = ["cartoon", "tumbler", "rocket", "storyteller", "awardwinner"]
      const availableTypes = allTypes.filter(type => type !== animType)
      setAnimType(availableTypes[Math.floor(Math.random() * availableTypes.length)])
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Link 
      href="/" 
      className="text-[90px] md:text-[120px] lg:text-[156px] leading-none font-black tracking-tighter flex items-center justify-center z-50 cursor-pointer w-fit mx-auto text-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {animType === "cartoon" ? (
        <GoodYuteLogo isHovered={isHovered} />
      ) : animType === "tumbler" ? (
        <TumblerLogo isHovered={isHovered} />
      ) : animType === "storyteller" ? (
        <StoryTellerLogo isHovered={isHovered} />
      ) : animType === "awardwinner" ? (
        <AwardWinnerLogo isHovered={isHovered} />
      ) : (
        <RocketLogo isHovered={isHovered} />
      )}
    </Link>
  )
}
