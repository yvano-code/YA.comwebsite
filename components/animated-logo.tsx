"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useAnimation, AnimatePresence, useSpring, useTransform, MotionValue } from "framer-motion"
import { playSciFiSound, playRocketSound, playBabasSample, playBinauralShimmer } from "@/lib/sensory"


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

export function GoodYuteLogo({ isHovered, onAnimationComplete, isMobile = false }: { isHovered: boolean, onAnimationComplete?: () => void, isMobile?: boolean }) {
  const topTextControls = useSafeAnimation()
  const bottomTextControls = useSafeAnimation()
  const dotControls = useSafeAnimation()
  const exclamationControls = useSafeAnimation()

  useEffect(() => {
    let isCancelled = false
    topTextControls.stop()
    bottomTextControls.stop()
    dotControls.stop()
    exclamationControls.stop()

    const runSequence = async () => {
      if (isHovered) {
        // Sound removed as requested

        // 1. Expand "OU'RE "
        topTextControls.start({ width: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeOut" } })
        
        await new Promise(r => setTimeout(r, 450))
        if (isCancelled) return

        // 2. Drop the dot (one line down)
        dotControls.start({ y: "0.88em", transition: { type: "spring", stiffness: 300, damping: 15 } })
        
        await new Promise(r => setTimeout(r, 250))
        if (isCancelled) return

        // 3. Expand "GOOD YUTE" to the left, and shift the whole line right to center it
        bottomTextControls.start({ x: 0, transition: { duration: 0.5, ease: "easeOut" } })
        dotControls.start({ x: "1.25em", transition: { duration: 0.5, ease: "easeOut" } })

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

        // 2. Collapse "GOOD YUTE" and move dot back to original X position
        bottomTextControls.start({ x: "100%", transition: { duration: 0.3, ease: "easeIn" } })
        dotControls.start({ x: 0, transition: { duration: 0.3, ease: "easeIn" } })
        
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
        initial={{ y: 0, x: 0 }}
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
      0px 8px 10px rgba(0,0,0,0.3)
    `,
  };
};

export function TumblerLogo({ isHovered, onAnimationComplete, isVertical = false, isMobile = false, muteSound = false }: { isHovered: boolean, onAnimationComplete?: () => void, isVertical?: boolean, isMobile?: boolean, muteSound?: boolean }) {

  const controls = useSafeAnimation()
  
  // The full string we want to animate
  const fullText = "YVANO ANTONIO.".split("")
  
  // Which letters correspond to "YA."? 
  // Y = 0, A in ANTONIO = 6, . = 13
  const isY = (i: number) => i === 0
  const isA = (i: number) => i === 6
  const isDot = (i: number) => i === 13
  const isYA = (i: number) => isY(i) || isA(i) || isDot(i)

  // Pre-compute stable random positions so they don't change on re-renders
  const spillPositions = useMemo(() => {
    return fullText.map(() => {
      if (isVertical) {
        return {
          x: `${(Math.random() - 0.5) * 45}vw`,
          y: `${(Math.random() - 0.5) * 35}vh`,
          rotate: (Math.random() - 0.5) * 180,
          scale: Math.random() * 0.3 + 0.8,
        }
      }
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 60 + 20
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 20,
        rotate: (Math.random() - 0.5) * 180,
        scale: Math.random() * 0.4 + 0.8,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVertical])

  const jumblePositions = useMemo(() => {
    return fullText.map(() => {
      if (isVertical) {
        return {
          x: `${(Math.random() - 0.5) * 45}vw`,
          y: `${(Math.random() * 15) + 10}vh`,
          rotate: (Math.random() - 0.5) * 120,
          scale: 1,
        }
      }
      return {
        x: (Math.random() - 0.5) * 120,
        y: Math.random() * 20 + 10,
        rotate: (Math.random() - 0.5) * 120,
        scale: 1,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVertical])

  const hoverRef = useRef(false)

  useEffect(() => {
    let isCancelled = false
    controls.stop()
    hoverRef.current = isHovered
    
    const runAnimation = async () => {
if (isHovered) {
        // --- HOVER IN SEQUENCE ---
        
        // 1. Spilling out like toys
        if (isCancelled) return
        if (!muteSound) playSciFiSound('whoosh', 0)
        await controls.start((i) => ({
          ...spillPositions[i],
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 300, damping: 15, delay: i * 0.01 }
        }))
        
        if (!hoverRef.current || isCancelled) return
        
        // 2. Spell correctly briefly
        if (!muteSound) playSciFiSound('blip', 0)
        await controls.start((i) => {
          let xValue: number | string = 0;
          let yValue: number | string = 0;

          if (isVertical) {
            // Stacked: YVANO on top, ANTONIO. on bottom
            if (i <= 4) {
              xValue = "1.1em";
              yValue = "-0.55em";
            } else if (i >= 6) {
              xValue = "-1.3em";
              yValue = "0.55em";
            }
          }

          return {
            x: xValue,
            y: yValue,
            rotate: 0,
            scale: 1,
            opacity: 1,
            width: "auto",
            transition: { type: "spring", stiffness: 200, damping: 12, mass: 0.8 }
          }
        })
        
        if (!hoverRef.current || isCancelled) return
        
        // Pause briefly to read it
        await new Promise(r => setTimeout(r, 1800))
        
        if (!hoverRef.current || isCancelled) return

        // 3. Collapse into a jumble
        if (!muteSound) playSciFiSound('rumble', 0)
        await controls.start((i) => ({
          ...jumblePositions[i],
          transition: { type: "spring", stiffness: 100, damping: 10, mass: 1.5 }
        }))

        // Automatically complete the animation cycle
        if (onAnimationComplete) {
          onAnimationComplete()
        }

      } else {
        // --- HOVER OUT SEQUENCE ---
        
        if (isCancelled) return
        if (!muteSound) playSciFiSound('rewind', 0)
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
  }, [isHovered, controls, spillPositions, jumblePositions])

  return (
    <div className="flex relative items-baseline" style={{ willChange: 'transform' }}>
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
            willChange: 'transform, opacity',
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

const NasaY = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className} fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 15 15 C 15 50, 40 60, 40 85 M 65 15 C 65 40, 40 60, 40 60" />
  </svg>
)

const NasaA = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className} fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 15 85 L 40 15 L 65 85" />
  </svg>
)

const NasaDot = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 30 100" className={className} fill="currentColor">
    <circle cx="15" cy="85" r="9" />
  </svg>
)

export function RocketLogo({ isHovered, onAnimationComplete, isMobile = false, muteSound = false }: { isHovered: boolean, onAnimationComplete?: () => void, isMobile?: boolean, muteSound?: boolean }) {
  const yControls = useSafeAnimation()
  const aControls = useSafeAnimation()
  const dotControls = useSafeAnimation()
  const fireControls = useSafeAnimation()
  const smokeControls = useSafeAnimation()
  const [countdown, setCountdown] = useState<number | null>(null)
  const [smokeActive, setSmokeActive] = useState(false) // Gate infinite smoke puff loops to avoid wasted GPU when hidden
  const hoverRef = useRef(false)

  useEffect(() => {
    hoverRef.current = isHovered
    let isCancelled = false
    
    yControls.stop()
    aControls.stop()
    dotControls.stop()
    fireControls.stop()
    smokeControls.stop()

    const runAnimation = async () => {
      if (isHovered) {
        // 1. Countdown
        if (isCancelled) return
        setCountdown(3)
        if (!muteSound) playRocketSound('beep')
        if (!muteSound) playRocketSound('eruption')
        // rumble Y and Dot
        yControls.start({ x: [-1, 1, -1, 1], y: [-1, 1, -1, 1], transition: { repeat: Infinity, duration: 0.1 } })
        dotControls.start({ x: [-1, 1, -1, 1], y: [-1, 1, -1, 1], transition: { repeat: Infinity, duration: 0.1 } })
        aControls.start({ y: [0, -2, 0], transition: { repeat: Infinity, duration: 0.1 } })
        
        await new Promise(r => setTimeout(r, 1000))
        if (!hoverRef.current) { isCancelled = true; return }
        setCountdown(2)
        if (!muteSound) playRocketSound('beep')
        await new Promise(r => setTimeout(r, 1000))
        if (!hoverRef.current) { isCancelled = true; return }
        setCountdown(1)
        if (!muteSound) playRocketSound('beep')
        
        // Ignite engine
        setSmokeActive(true)
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
        if (!muteSound) playRocketSound('blastoff')
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
              transition: { duration: 0.5, ease: "easeOut", times: [0, 0.4, 0.7, 1] }
            }
          },
          {
            // Path 2: Vertical Space Shot, Return from Bottom Right
            takeoff: {
              y: [20, -300, -800],
              x: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: [1, 0.6, 0.1],
              transition: { duration: 2.0, ease: "easeIn", times: [0, 0.5, 1] }
            },
            teleport: { x: w + 200, y: h + 200, rotate: -45, scale: 0.1 },
            landing: {
              y: [h + 200, h * 0.6, h * 0.2, 0],
              x: [w + 200, 300, -100, 0],
              rotate: [-45, -20, 10, 0],
              scale: [0.1, 0.4, 0.7, 1],
              transition: { duration: 0.5, ease: "easeOut", times: [0, 0.4, 0.7, 1] }
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
        await new Promise(r => setTimeout(r, 800))
        if (isCancelled) return
        
        // Retrorockets fire!
        fireControls.start({ 
          opacity: [0, 1, 1, 0], 
          scaleX: [0, 0.8, 0.5, 0], 
          scaleY: [0, 2.0, 1.5, 0], 
          transition: { duration: 0.5, times: [0, 0.1, 0.9, 1], ease: "easeInOut" } 
        })
        smokeControls.start({
          opacity: [0, 1, 1, 0],
          scale: [0, 1.5, 1.5, 0],
          y: 0,
          transition: { duration: 0.5, times: [0, 0.1, 0.9, 1], ease: "easeInOut" }
        })
        
        // 4. Smooth Landing back to the start
        await aControls.start(selectedPath.landing)
        
        if (isCancelled) return

        // Cut the engine on touchdown (already faded out by the landing transition)
        fireControls.start({ opacity: 0, scale: 0, transition: { duration: 0.1 } })
        
        // Small puff of smoke on touchdown, then disable the infinite loops
        await smokeControls.start({ scale: [0, 1.5], opacity: [0, 0.5, 0], y: [0, 20], transition: { duration: 0.5 } })
        setSmokeActive(false)
        
        // Wait 0.5 seconds at the end of the animation and then trigger next animation
        await new Promise(r => setTimeout(r, 500))
        if (!hoverRef.current || isCancelled) return
        
        if (onAnimationComplete) {
          onAnimationComplete()
        }
      } else {
        setCountdown(null)
        setSmokeActive(false)
        aControls.stop()
        fireControls.stop()
        smokeControls.stop()
        
        yControls.start({ x: 0, y: 0, transition: { duration: 0.5 } })
        dotControls.start({ x: 0, y: 0, transition: { duration: 0.5 } })
        aControls.start({ x: 0, y: 0, rotate: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } })
        fireControls.start({ opacity: 0, scale: 0, transition: { duration: 0.5 } })
        smokeControls.start({ opacity: 0, scale: 0, y: 0, transition: { duration: 0.5 } })
      }
    }
    
    runAnimation()

    return () => {
      isCancelled = true
    }
  }, [isHovered, yControls, dotControls, aControls, fireControls, smokeControls])

  return (
    <div className="flex relative items-baseline gap-[2px] text-[#fc3d21]">
      <motion.span animate={yControls} className="inline-block relative z-20" style={{ willChange: 'transform' }}>
        <NasaY className="w-[0.8em] h-[1em] -scale-x-100" />
      </motion.span>
      <motion.span animate={aControls} className="inline-block relative z-30 origin-bottom" style={{ willChange: 'transform' }}>
        <NasaA className="w-[0.8em] h-[1em]" />
        <motion.div animate={fireControls} initial={{ opacity: 0, scale: 0 }} className="absolute top-[80%] left-[50%] -translate-x-[50%] w-[0.6em] h-[1.5em] origin-top z-0" style={{ willChange: 'transform, opacity' }}>
          <RocketFire className="w-full h-full text-[#fc3d21]" />
        </motion.div>
        <motion.div animate={smokeControls} initial={{ opacity: 0, scale: 0, y: 0 }} className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[3em] h-[3em] origin-top z-[-1]" style={{ willChange: 'transform, opacity' }}>
          <RocketSmoke className="absolute inset-0 w-full h-full" />
          {/* Smoke puff loops only mount when active to avoid wasting GPU on hidden infinite animations */}
          {smokeActive && (
            <>
              <motion.div animate={{ scale: [1, 2.5, 4], x: [0, -60, -100], y: [0, 40, 100], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0 }} className="absolute inset-0" style={{ willChange: 'transform, opacity' }}>
                <RocketSmoke className="w-full h-full" />
              </motion.div>
              <motion.div animate={{ scale: [1, 2.5, 4], x: [0, 60, 100], y: [0, 40, 100], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }} className="absolute inset-0" style={{ willChange: 'transform, opacity' }}>
                <RocketSmoke className="w-full h-full" />
              </motion.div>
              <motion.div animate={{ scale: [1, 2.5, 4], x: [0, -30, -50], y: [0, 80, 180], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }} className="absolute inset-0" style={{ willChange: 'transform, opacity' }}>
                <RocketSmoke className="w-full h-full" />
              </motion.div>
              <motion.div animate={{ scale: [1, 2.5, 4], x: [0, 30, 50], y: [0, 80, 180], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.9 }} className="absolute inset-0" style={{ willChange: 'transform, opacity' }}>
                <RocketSmoke className="w-full h-full" />
              </motion.div>
              <motion.div animate={{ scale: [1, 2.5, 4], x: [0, 0, 0], y: [0, 60, 150], opacity: [0.8, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }} className="absolute inset-0" style={{ willChange: 'transform, opacity' }}>
                <RocketSmoke className="w-full h-full" />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.span>
      <motion.span animate={dotControls} className="inline-block relative z-20" style={{ willChange: 'transform' }}>
        <NasaDot className="w-[0.3em] h-[1em]" />
      </motion.span>
      
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

export function StoryTellerLogo({ isHovered, onAnimationComplete }: { isHovered: boolean, onAnimationComplete?: () => void }) {
  const [isActive, setIsActive] = useState(false)
  const dotControls = useSafeAnimation()
  
  const aControls = useSafeAnimation()
  const tControls = useSafeAnimation()
  const storControls = useSafeAnimation()
  const ellerControls = useSafeAnimation()

  let isCancelled = false

  useEffect(() => {
    if (isHovered) {
      if (isCancelled) return
      
      aControls.start({ scale: 0.8, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } })
      tControls.start({ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } })
      storControls.start({ x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } })
      ellerControls.start({ x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 } })
    } else {
      if (isCancelled) return
      
      storControls.start({ x: "100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } })
      ellerControls.start({ x: "-100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } })
      tControls.start({ scale: 0.8, opacity: 0, transition: { duration: 0.3, ease: "easeIn", delay: 0.1 } })
      aControls.start({ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut", delay: 0.2 } })
    }
    
    return () => {
      isCancelled = true
    }
  }, [isHovered, storControls, ellerControls, tControls, aControls])

  const imgClass = "h-[1.2em] w-auto shrink-0 inline-block object-contain -mr-[0.02em]"

  return (
    <div className="flex relative items-center justify-center py-4">
      {/* LEFT WING */}
      <div className="flex items-center justify-end relative z-10">
        <div 
          className="absolute right-[50%] top-[-0.5em] bottom-[-0.5em] flex items-center overflow-hidden pr-[0.4em] pl-[0.5em] z-0 min-w-max"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
          <motion.div 
            animate={storControls} 
            initial={{ x: "100%", opacity: 0 }} 
            className="flex justify-end whitespace-nowrap min-w-max"
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          >
            <div className="flex items-center min-w-max">
              <img src="/3d_text_fur_S.png?v=6" alt="S" className={imgClass} />
              <img src="/3d_text_fur_T.png?v=6" alt="T" className={imgClass} />
              <img src="/3d_text_fur_O.png?v=6" alt="O" className={imgClass} />
              <img src="/3d_text_fur_R.png?v=6" alt="R" className={imgClass} />
            </div>
          </motion.div>
        </div>
        
        <div className="relative z-10 flex items-center">
          <img src="/3d_text_fur_Y.png?v=6" alt="Y" className={imgClass} />
        </div>
      </div>

      {/* RIGHT WING */}
      <div className="flex items-center justify-start relative z-10">
        <div className="relative z-20 flex items-center justify-center h-[1.2em] w-[1.2em]">
          <motion.div
            animate={aControls}
            initial={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img src="/3d_text_fur_A.png?v=6" alt="A" className={imgClass} />
          </motion.div>
          
          <motion.div
            animate={tControls}
            initial={{ scale: 0.6, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img src="/3d_text_fur_T.png?v=6" alt="T" className={imgClass} />
          </motion.div>
        </div>

        <div 
          className="absolute left-[50%] top-[-0.5em] bottom-[-0.5em] flex items-center overflow-hidden pl-[0.7em] pr-[0.5em] z-0 min-w-max"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
          <motion.div 
            animate={ellerControls} 
            initial={{ x: "-100%", opacity: 0 }} 
            className="flex justify-start whitespace-nowrap min-w-max"
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          >
            <div className="flex items-center min-w-max">
              <img src="/3d_text_fur_E.png?v=6" alt="E" className={imgClass} />
              <img src="/3d_text_fur_L.png?v=6" alt="L" className={imgClass} />
              <img src="/3d_text_fur_L.png?v=6" alt="L" className={imgClass} />
              <img src="/3d_text_fur_E.png?v=6" alt="E" className={imgClass} />
              <img src="/3d_text_fur_R.png?v=6" alt="R" className={imgClass} />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* THE DOT */}
      <div className="inline-block relative z-20 ml-1 h-[1em] flex items-end">
         <img src="/3d_text_O.png?v=4" alt="." className="h-[0.3em] w-auto inline-block object-contain drop-shadow-2xl opacity-0" />
      </div>
    </div>
  )
}

const DUST_COUNT = 150;
const dustParticles = Array.from({ length: DUST_COUNT }).map((_, i) => {
  const angle = Math.random() * Math.PI * 2;
  // Expansive radius (edge to edge viewport coverage)
  const radius = Math.pow(Math.random(), 1.5) * 2000 + 10;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  // Parallax depth! from -1500 to 2000
  const z = (Math.random() * 3500) - 1500;
  
  // More bokeh for heavy depth of field effect
  const isBokeh = Math.random() > 0.80;
  const size = isBokeh ? Math.random() * 20 + 8 : Math.random() * 4 + 1.5;
  const blur = isBokeh ? size * 0.8 : Math.random() * 3.0;
  
  const delay = Math.random() * 0.4;
  // Photorealistic warm lighting with heavily weighted bright whites and soft yellows
  const colors = [
    "#ffffff", "#ffffff", "#ffffff", "#ffffff", 
    "#fffbeb", "#fffbeb", 
    "#fef08a", "#fef08a", 
    "#fde047", "#eab308", "#ca8a04", "#a16207"
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const twinkleDuration = Math.random() * 2.0 + 1.5; // Much slower, subtler twinkle
  
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

export function AwardWinnerLogo({ isHovered, onAnimationComplete, isMobile = false, muteSound = false }: { isHovered: boolean, onAnimationComplete?: () => void, isMobile?: boolean, muteSound?: boolean }) {
  const [isActive, setIsActive]   = useState(false)
  const yControls        = useSafeAnimation()
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
      yControls.stop()
      aControls.stop()
      dotControls.stop()
      aTextControls.stop()
      restTextControls.stop()
      swooshControls.stop()

      if (isHovered) {
        if (!muteSound) playBinauralShimmer()
        // 1. Hold for 500ms before exploding
        await new Promise(r => setTimeout(r, 500))
        if (isCancelled) return

        // 2. Explode
        dotControls.start({ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } })
        yControls.start({ scale: 0.8, opacity: 0, transition: { duration: 0.3, ease: "easeOut" } })
        aControls.start({ scale: 0.8, opacity: 0, transition: { duration: 0.3, ease: "easeOut" } })

        setIsActive(true)
        await new Promise(r => setTimeout(r, 50))
        if (isCancelled) return

        swooshControls.start(i => {
          const p = dustParticles[i as number]
          return {
            opacity: [0, 0.6, 0.2, 0.5, 0.3],
            x: [0, p.x],
            y: [0, p.y],
            z: [0, p.z],
            scale: [0, 1.2, 1],
            transition: { 
              duration: 3.0, 
              type: "spring", bounce: 0.1, delay: p.delay,
              opacity: { repeat: Infinity, duration: p.twinkleDuration, repeatType: "mirror", ease: "easeInOut" }
            }
          }
        })

        await new Promise(r => setTimeout(r, 250))
        if (isCancelled) return

        aTextControls.start({ 
          opacity: 1, scale: 1, rotate: 0, x: 0, y: 0, 
          transition: { type: "spring", damping: 12, stiffness: 130 } 
        })
        
        await restTextControls.start(i => ({
          opacity: 1, scale: 1, rotate: 0, x: 0, y: 0,
          transition: { type: "spring", damping: 12, stiffness: 130, delay: (i as number) * 0.015 }
        }))
        if (isCancelled) return

      } else {
        clearTimeout(timeoutId)
        if (isActive) {
          aTextControls.start({ opacity: 0, scale: 0.95, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } })
          restTextControls.start({ opacity: 0, scale: 0.95, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } })
          swooshControls.start({ opacity: 0, scale: 0.8, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } })
          timeoutId = setTimeout(() => {
            if (!isCancelled) setIsActive(false)
          }, 500)
        }

        const smoothTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        yControls.start({ scale: 1, opacity: 1, transition: { ...smoothTransition, delay: 0 } })
        aControls.start({ scale: 1, opacity: 1, transition: { ...smoothTransition, delay: 0.08 } })
        dotControls.start({ opacity: 1, transition: { ...smoothTransition, delay: 0.16 } })
      }
    }

    runAnimation()
    return () => { isCancelled = true; clearTimeout(timeoutId) }
  }, [isHovered, yControls, aControls, dotControls, restTextControls, aTextControls, gridControls, dustParticles, swooshControls, onAnimationComplete])

  const particlesToRender = isMobile ? dustParticles.slice(0, 30) : dustParticles;

  return (
    <div 
      className="flex relative items-baseline justify-center uppercase text-[1.4em]"
      style={{
        fontFamily: '"Avenir Next", Montserrat, "Century Gothic", sans-serif',
        fontWeight: 200,
        letterSpacing: "0.15em",
      }}
    >
      {/* Y (Trophy) */}
      <motion.span
        animate={yControls}
        initial={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center origin-center z-20"
      >
        <img 
          src="/csa_award_statue_nobg_v3.png" 
          alt="Canadian Screen Award Statue" 
          className="h-[2.2em] w-auto object-contain mr-[0.2em]" 
        />
      </motion.span>

      {/* A — fades in/out */}
      <motion.span
        animate={aControls}
        initial={{ opacity: 1 }}
        className="inline-block z-20 -translate-y-[0.1em]"
      >
        A
      </motion.span>

      {/* Dot */}
      <motion.span
        animate={dotControls}
        initial={{ opacity: 1 }}
        className="inline-block z-20 -translate-y-[0.1em]"
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
          {/* Intense Central Core Light */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 0.7, 0.4, 0.8, 0.5], 
                scale: [0.5, 1.2, 1, 1.3, 1.1] 
              }}
              transition={{ 
                duration: 3, 
                delay: 0.8, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] aspect-square rounded-full pointer-events-none mix-blend-screen"
              style={{
                background: "radial-gradient(circle at center, rgba(255,250,200,0.4) 0%, rgba(253,224,71,0.15) 30%, transparent 70%)",
                filter: "blur(40px)",
                transformStyle: "preserve-3d",
                transform: "translateZ(-100px)"
              }}
            />
          )}

          {/* Dust Swirl 3D Effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 pointer-events-none mix-blend-screen dark:mix-blend-color-dodge brightness-125 dark:brightness-150"
            style={{ width: 0, height: 0, transformStyle: "preserve-3d" }}
            animate={{ rotateZ: 360 }}
            transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
          >
            {particlesToRender.map((p, i) => (
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
                  filter: isMobile ? "none" : `blur(${p.blur}px)`,
                  transformStyle: isMobile ? "flat" : "preserve-3d",
                  willChange: "transform, opacity"
                }}
              />
            ))}
          </motion.div>

          <div
            className="flex flex-col items-center justify-center relative uppercase"
            style={{
              fontSize: "clamp(24px, 5.5vw, 64px)", // slightly smaller to accommodate wide tracking
              letterSpacing: "0.15em",
              fontFamily: '"Avenir Next", Montserrat, "Century Gothic", sans-serif',
              transform: "translateZ(0)",
              transformStyle: "preserve-3d",
              lineHeight: 1.1,
              gap: "0.15em",
              fontWeight: 300,
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
  const [animType, setAnimType] = useState<"cartoon" | "tumbler" | "rocket" | "storyteller" | "awardwinner" | null>(null)

  useEffect(() => {
    const allTypes: ("cartoon" | "tumbler" | "rocket" | "awardwinner")[] = ["cartoon", "tumbler", "rocket", "awardwinner"]
    setAnimType(allTypes[Math.floor(Math.random() * allTypes.length)])
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const cycleAnimation = () => {
    let timeoutMs = 800
    if (animType === "cartoon") {
      timeoutMs = 1200
    } else if (animType === "tumbler") {
      timeoutMs = 1000
    }
    
    setTimeout(() => {
      setAnimType(prev => {
        const allTypes: ("cartoon" | "tumbler" | "rocket" | "awardwinner")[] = ["cartoon", "tumbler", "rocket", "awardwinner"]
        const availableTypes = allTypes.filter(type => type !== prev)
        return availableTypes[Math.floor(Math.random() * availableTypes.length)]
      })
    }, timeoutMs)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    cycleAnimation()
  }

  if (!animType) {
    return (
      <div className="text-[70px] md:text-[90px] lg:text-[120px] leading-none font-black tracking-tighter flex items-center justify-center z-50 w-fit mx-auto text-transparent select-none pointer-events-none py-4">
        YA
      </div>
    )
  }

  return (
    <Link 
      href="/" 
      className="text-[70px] md:text-[90px] lg:text-[120px] leading-none font-black tracking-tighter flex items-center justify-center z-50 cursor-pointer w-fit mx-auto text-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div key={animType} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {animType === "cartoon" ? (
            <GoodYuteLogo isHovered={isHovered} onAnimationComplete={cycleAnimation} />
          ) : animType === "tumbler" ? (
            <TumblerLogo isHovered={isHovered} onAnimationComplete={cycleAnimation} />
          ) : animType === "storyteller" ? (
            <StoryTellerLogo isHovered={isHovered} onAnimationComplete={cycleAnimation} />
          ) : animType === "awardwinner" ? (
            <AwardWinnerLogo isHovered={isHovered} onAnimationComplete={cycleAnimation} />
          ) : (
            <RocketLogo isHovered={isHovered} onAnimationComplete={cycleAnimation} />
          )}
        </motion.div>
      </AnimatePresence>
    </Link>
  )
}
