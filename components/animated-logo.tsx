"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
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

function CartoonLogo({ isHovered }: { isHovered: boolean }) {
  // Cinematic animation controls
  const wrapperControls = useAnimation()
  const xControls = useAnimation()
  const yControls = useAnimation()
  const limbControls = useAnimation()
  const leftLegControls = useAnimation()
  const rightLegControls = useAnimation()
  const leftArmControls = useAnimation()
  const rightArmControls = useAnimation()
  
  // Video game visual FX controls
  const shadowControls = useAnimation()
  const popControls = useAnimation()
  const damageControls = useAnimation()
  const dust1Controls = useAnimation()
  const dust2Controls = useAnimation()
  const speedLinesControls = useAnimation()

  useEffect(() => {
    let isCancelled = false
    
    const runSequence = async () => {
      if (isHovered) {
        // 1. Limbs & shadow appear
        limbControls.start({ opacity: 1, transition: { duration: 0.1 } })
        shadowControls.start({ opacity: 0.3, transition: { duration: 0.1 } })
        
        // 2. Anticipation Squash (Cuphead rubber hose style)
        await yControls.start({ 
          scaleX: 1.3, 
          scaleY: 0.7, 
          y: 5,
          transition: { duration: 0.2 } 
        })
        if (isCancelled) return

        // 3. The Struggle (stuck to the A)
        // Pull left
        yControls.start({ x: -10, y: -5, rotate: -20, scaleX: 0.8, scaleY: 1.2, transition: { duration: 0.2, ease: "easeOut" } })
        await shadowControls.start({ x: -10, scale: 0.8, transition: { duration: 0.2, ease: "easeOut" } })
        if (isCancelled) return

        // Shake/vibrate (stuck!)
        yControls.start({
          x: [-10, -8, -12, -9, -11, -8, -12, -10],
          y: [-5, -7, -4, -6, -3, -7, -4, -5],
          rotate: [-20, -17, -23, -19, -22, -20],
          transition: { duration: 0.3 }
        })
        await shadowControls.start({
          x: [-10, -8, -12, -9, -11, -8, -12, -10],
          transition: { duration: 0.3 }
        })
        if (isCancelled) return

        // Pull harder!
        yControls.start({ x: -15, y: -10, rotate: -30, scaleX: 0.7, scaleY: 1.4, transition: { duration: 0.2, ease: "easeIn" } })
        await shadowControls.start({ x: -15, scale: 0.7, transition: { duration: 0.2, ease: "easeIn" } })
        if (isCancelled) return

        // 4. POP free! (Cinematic break)
        popControls.start({
          scale: [0, 2.5],
          opacity: [1, 0],
          borderWidth: [6, 0],
          transition: { duration: 0.4, ease: "easeOut" }
        })
        damageControls.start({
          opacity: [0, 1, 1, 0],
          y: [0, -30, -40],
          x: [0, 10, 20],
          scale: [0.5, 1.3, 1],
          rotate: [0, 5, 10],
          transition: { duration: 3.0, ease: "easeOut", times: [0, 0.1, 0.9, 1] }
        })
        
        // Jump up and right in a huge arc (squash in air)
        yControls.start({
          x: 10,
          y: -40,
          rotate: [ -30, 10, 30 ], // flip forward
          scaleX: 1,
          scaleY: 1,
          transition: { type: "spring", stiffness: 300, damping: 15 }
        })
        await shadowControls.start({
          x: 10,
          scale: 0.4,
          opacity: 0.1,
          transition: { type: "spring", stiffness: 300, damping: 15 }
        })
        if (isCancelled) return

        // 5. Heavy Landing (Impact)
        wrapperControls.start({
          y: [0, 6, -3, 2, 0],
          transition: { duration: 0.3, ease: "easeInOut" }
        })
        dust1Controls.start({
          scale: [0, 1.5],
          x: [-10, -30],
          y: [15, 5],
          opacity: [0.8, 0],
          transition: { duration: 0.5, ease: "easeOut" }
        })
        dust2Controls.start({
          scale: [0, 1.5],
          x: [10, 30],
          y: [15, 5],
          opacity: [0.8, 0],
          transition: { duration: 0.5, ease: "easeOut" }
        })
        
        // Squash on impact
        yControls.start({
          y: 20,
          rotate: 0, 
          scaleX: 1.4,
          scaleY: 0.6,
          transition: { type: "spring", stiffness: 500, damping: 15 }
        })
        await shadowControls.start({
          scale: 1.2,
          opacity: 0.5,
          transition: { type: "spring", stiffness: 500, damping: 15 }
        })
        if (isCancelled) return

        // 6. Start running (Rubber hose style)
        // High leg pumping
        leftLegControls.start({
          rotate: [-80, 80],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeInOut" }
        })
        rightLegControls.start({
          rotate: [80, -80],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeInOut" }
        })
        
        // Windmilling arms (Cuphead style)
        leftArmControls.start({
          rotate: [0, -360],
          transition: { repeat: Infinity, duration: 0.3, ease: "linear" }
        })
        rightArmControls.start({
          rotate: [0, 360],
          transition: { repeat: Infinity, duration: 0.3, ease: "linear" }
        })
        
        // Bouncing up and down while leaning forward
        yControls.start({
          y: [15, 0],
          rotate: 35,
          scaleX: 1.1,
          scaleY: 0.9,
          skewX: -10, // wind resistance
          transition: { y: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeOut" } }
        })
        shadowControls.start({
          scale: [1, 0.7],
          opacity: [0.4, 0.2],
          transition: { repeat: Infinity, repeatType: "reverse", duration: 0.1, ease: "easeOut" }
        })
        
        // Speed lines FX
        speedLinesControls.start({
          opacity: [0, 1, 0],
          x: [0, -30],
          transition: { repeat: Infinity, duration: 0.15 }
        })

        // Run straight right to edge of screen
        const distance = typeof window !== "undefined" ? window.innerWidth + 100 : 2000;
        await xControls.start({
          x: distance,
          transition: { duration: 1.5, ease: "easeIn" }
        })
        
        if (isCancelled) return
        
        // Stop animations after it disappears off-screen
        leftLegControls.stop()
        rightLegControls.stop()
        leftArmControls.stop()
        rightArmControls.stop()
        yControls.stop()
        speedLinesControls.stop()
        
        // Hide instantly
        xControls.start({ opacity: 0, transition: { duration: 0 } })
        shadowControls.start({ opacity: 0, transition: { duration: 0 } })
        
      } else {
        // --- Reset immediately on unhover ---
        leftLegControls.stop()
        rightLegControls.stop()
        leftArmControls.stop()
        rightArmControls.stop()
        yControls.stop()
        xControls.stop()
        speedLinesControls.stop()
        popControls.stop()
        damageControls.stop()
        
        limbControls.start({ opacity: 0, transition: { duration: 0 } })
        shadowControls.start({ opacity: 0, transition: { duration: 0 } })
        speedLinesControls.start({ opacity: 0, transition: { duration: 0 } })
        
        xControls.start({
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        })
        yControls.start({
          x: 0,
          y: 0,
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        })
        shadowControls.start({ x: 0, y: 0, scale: 1, transition: { duration: 0 } })
        
        // Instantly reset rotations so they don't unwind 360 degrees
        leftLegControls.set({ rotate: 0 })
        rightLegControls.set({ rotate: 0 })
        leftArmControls.set({ rotate: -30 })
        rightArmControls.set({ rotate: 30 })
      }
    }
    
    runSequence()
    
    return () => {
      isCancelled = true
    }
  }, [isHovered, wrapperControls, xControls, yControls, limbControls, leftLegControls, rightLegControls, leftArmControls, rightArmControls, shadowControls, popControls, damageControls, dust1Controls, dust2Controls, speedLinesControls])

  return (
    <motion.div animate={wrapperControls} className="flex relative items-baseline">
      <span className="relative inline-block z-20">
        
        {/* Video Game Damage Text */}
        <motion.div
          animate={damageControls}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          className="absolute top-[40px] left-[30px] text-yellow-400 font-black text-2xl italic drop-shadow-[0_4px_0_rgba(0,0,0,1)] whitespace-nowrap z-[100] pointer-events-none tracking-tighter origin-top-left"
          style={{ WebkitTextStroke: '1px black' }}
        >
          YOU'RE A GOOD YUTE!
        </motion.div>

        {/* X-axis translation container */}
        <motion.div animate={xControls} className="inline-block relative z-20">
          
          {/* Ground Shadow */}
          <motion.div 
            animate={shadowControls}
            initial={{ opacity: 0 }}
            className="absolute bottom-[-6px] left-[0px] w-[20px] h-[4px] bg-black rounded-full blur-[2px]"
          />

          {/* Cinematic Breakout Pop Ring */}
          <motion.div 
            animate={popControls}
            initial={{ opacity: 0, scale: 0 }}
            className="absolute top-[50%] right-[-10px] w-[40px] h-[40px] -mt-[20px] rounded-full border-black z-0 pointer-events-none"
          />

          {/* Impact Dust Clouds */}
          <motion.div animate={dust1Controls} initial={{ opacity: 0 }} className="absolute bottom-[-10px] left-[-10px] w-[20px] h-[20px] pointer-events-none">
            <DustCloud />
          </motion.div>
          <motion.div animate={dust2Controls} initial={{ opacity: 0 }} className="absolute bottom-[-10px] right-[-10px] w-[20px] h-[20px] pointer-events-none">
            <DustCloud />
          </motion.div>

          {/* Speed lines */}
          <motion.div 
            animate={speedLinesControls} 
            initial={{ opacity: 0 }} 
            className="absolute inset-0 pointer-events-none z-0"
          >
            <div className="absolute top-[30%] right-[120%] w-[30px] h-[2px] bg-black/40 rounded-full" />
            <div className="absolute top-[60%] right-[140%] w-[50px] h-[2px] bg-black/30 rounded-full" />
            <div className="absolute top-[80%] right-[110%] w-[20px] h-[2px] bg-black/50 rounded-full" />
          </motion.div>

          {/* Y-axis translation, rotation, and bounce container */}
          <motion.span 
            animate={yControls} 
            className="inline-block relative origin-bottom z-20"
          >
            Y
            {/* Limbs container */}
            <motion.div 
              animate={limbControls} 
              className="absolute inset-0 pointer-events-none opacity-0"
              initial={{ opacity: 0 }}
            >
              {/* Left Arm (Rubber Hose Curve) */}
              <motion.div 
                animate={leftArmControls}
                initial={{ rotate: -30 }}
                className="absolute left-[-16px] top-[40%] w-[16px] h-[10px] origin-right z-10" 
              >
                <svg viewBox="0 0 16 10" className="absolute inset-0 overflow-visible">
                  <path d="M 16,5 Q 8,-5 0,5" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <MickeyGlove className="absolute left-[-14px] top-[-7px] w-[24px] h-[24px] -rotate-90 drop-shadow-md" />
              </motion.div>
              
              {/* Right Arm (Rubber Hose Curve) */}
              <motion.div 
                animate={rightArmControls}
                initial={{ rotate: 30 }}
                className="absolute right-[-16px] top-[40%] w-[16px] h-[10px] origin-left z-10" 
              >
                <svg viewBox="0 0 16 10" className="absolute inset-0 overflow-visible">
                  <path d="M 0,5 Q 8,-5 16,5" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <MickeyGlove className="absolute right-[-14px] top-[-7px] w-[24px] h-[24px] rotate-90 drop-shadow-md" />
              </motion.div>

              {/* Left Leg (Rubber Hose Curve) */}
              <motion.div 
                animate={leftLegControls}
                className="absolute left-[25%] bottom-[-16px] w-[10px] h-[16px] origin-top z-0" 
              >
                <svg viewBox="0 0 10 16" className="absolute inset-0 overflow-visible">
                  <path d="M 5,0 Q -5,8 5,16" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <MickeyShoe className="absolute left-[-9px] bottom-[-12px] w-[28px] h-[24px] drop-shadow-md" flipped={true} />
              </motion.div>
              
              {/* Right Leg (Rubber Hose Curve) */}
              <motion.div 
                animate={rightLegControls}
                className="absolute right-[25%] bottom-[-16px] w-[10px] h-[16px] origin-top z-0" 
              >
                <svg viewBox="0 0 10 16" className="absolute inset-0 overflow-visible">
                  <path d="M 5,0 Q 15,8 5,16" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <MickeyShoe className="absolute left-[-9px] bottom-[-12px] w-[28px] h-[24px] drop-shadow-md" flipped={true} />
              </motion.div>
            </motion.div>
          </motion.span>
        </motion.div>
      </span>
      {/* The "A." takes cinematic focus styling */}
      <span 
        className="z-10 inline-block relative transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.3 : 1 }}
      >
        A.
      </span>
    </motion.div>
  )
}

function TumblerLogo({ isHovered }: { isHovered: boolean }) {
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
  )
}

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)
  const [animType, setAnimType] = useState<"cartoon" | "tumbler">("cartoon")

  const handleMouseEnter = () => {
    if (!isHovered) {
      setAnimType(Math.random() > 0.5 ? "cartoon" : "tumbler")
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Link 
      href="/" 
      className="text-3xl font-black tracking-tighter flex items-center h-12 z-50 cursor-pointer w-fit"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {animType === "cartoon" ? (
        <CartoonLogo isHovered={isHovered} />
      ) : (
        <TumblerLogo isHovered={isHovered} />
      )}
    </Link>
  )
}
