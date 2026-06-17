"use client"

import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  return (
    <header className="relative z-50 flex flex-col items-center gap-4 px-6 pt-12 pb-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <Link href="/" className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {siteConfig.name}
        </Link>
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-1">
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
