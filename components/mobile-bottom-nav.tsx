"use client"

import { MonitorPlay, Trophy, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { VerticalNavPill } from "@/components/nav-pill"

export function MobileBottomNav() {
  const pathname = usePathname()
  
  if (pathname === "/test-jason" || pathname === "/" || pathname === "/clips") return null;

  return (
    <div className="md:hidden">
      <VerticalNavPill />
    </div>
  )
}
