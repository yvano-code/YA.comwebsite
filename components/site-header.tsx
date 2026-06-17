"use client"

import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  return (
    <header className="relative z-50 flex flex-col items-center gap-4 px-6 pt-12 pb-8 text-center">
      <svg width="0" height="0" className="absolute" style={{ pointerEvents: "none" }}>
        <filter id="rough-edges">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="flex flex-col items-center gap-2">
        <Link 
          href="/" 
          className="text-5xl md:text-6xl text-foreground"
          style={{ 
            fontFamily: "var(--font-archivo-black)",
            filter: "url('#rough-edges')",
            letterSpacing: "-0.04em"
          }}
        >
          {siteConfig.name}
        </Link>
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-3">
          FILM & TELEVISION | MUSIC VIDEO | COMMERCIAL | LIVE BROADCAST
        </p>
      </div>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-6">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-xs font-medium tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
