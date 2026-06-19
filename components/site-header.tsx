"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <header className="relative z-50 flex flex-col items-center gap-4 px-6 pt-12 pb-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <Link 
          href="/" 
          className="text-4xl md:text-5xl font-black tracking-tight text-foreground"
        >
          {siteConfig.name}
        </Link>
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-3">
          FILM & TELEVISION | MUSIC VIDEO | COMMERCIAL | LIVE BROADCAST
        </p>
      </div>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-2 md:gap-6">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-xs font-medium tracking-[0.15em] transition-colors hover:text-foreground px-3 py-1.5 rounded-md ${
                    isActive 
                      ? "text-foreground border-2 border-gray-300" 
                      : "text-muted-foreground border-2 border-transparent"
                  }`}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

