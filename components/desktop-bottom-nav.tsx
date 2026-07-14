"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function DesktopBottomNav({ className, isGlobal = false }: { className?: string, isGlobal?: boolean }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  if (pathname === "/test-jason") return null;

  const links = [
    { name: "HOME", path: "/" },
    { name: "REELS", path: "/reels" },
    { name: "BIO", path: "/about" },
  ]

  return (
    <div className={className || "hidden md:flex fixed bottom-12 right-12 z-[100] items-end justify-end pointer-events-none"}>
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 0, y: 0 }}
        className="pointer-events-auto cursor-grab active:cursor-grabbing flex flex-col items-center gap-4"
        whileDrag={{ scale: 1.05 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col gap-2 p-6 bg-black/60 backdrop-blur-[30px] border border-white/10 rounded-[2rem] shadow-xl saturate-[1.5] w-[200px]"
            >
              {links.map((link) => {
                const isActive = pathname === link.path || (link.path === "/" && pathname === "/clips")
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="group relative px-4 py-3 w-full text-center overflow-hidden rounded-xl transition-colors duration-300 hover:bg-white/10"
                  >
                    <span className={`relative z-10 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? "text-white font-bold" : "text-[#eae3d9]/70 group-hover:text-white"}`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute inset-0 border border-white/20 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full bg-black/60 backdrop-blur-[30px] border border-white/10 shadow-lg saturate-[1.5] transition-all duration-300 hover:bg-black/80 hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center justify-center gap-1"
          >
            {isOpen ? (
              <span className="text-[#eae3d9] font-mono text-xl leading-none font-light">×</span>
            ) : (
              <span className="text-[#eae3d9] font-serif text-sm tracking-widest italic font-bold" style={{ fontFamily: 'var(--font-playfair), serif' }}>YA.</span>
            )}
          </motion.div>
        </button>
      </motion.div>
    </div>
  )
}
