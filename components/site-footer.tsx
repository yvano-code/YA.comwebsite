"use client"

import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/site-config"
import { TumblerLogo } from "@/components/animated-logo"

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.33-5.18 2.01-7.07 1.68-1.9 4.2-2.93 6.75-2.73v4.02c-1.18-.1-2.38.16-3.37.8-1.52.98-2.3 2.8-2.01 4.59.25 1.53 1.44 2.82 2.93 3.23 1.48.4 3.12-.04 4.14-1.15.93-1.02 1.4-2.42 1.38-3.83.03-5.19-.01-10.39.02-15.58z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.53A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12c1.88.53 9.38.53 9.38.53s7.5 0 9.38-.53a3 3 0 0 0 2.12-2.12A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  const { contact } = siteConfig

  if (pathname === "/" || pathname === "/intro" || pathname === "/clips" || pathname === "/my-ya" || pathname === "/reels") return null

  return (
    <footer className="hidden md:flex w-full pt-24 md:pt-40 pb-12 relative flex-col items-center overflow-hidden">
      <div className="w-full flex justify-center relative pt-8">
        
        {/* ── DESKTOP ONLY: Massive Name & Blurb ── */}
        <div className="hidden md:flex w-full justify-center relative">
          <div className="pt-8 overflow-hidden">
            <h2 className="text-[10.5vw] md:text-[11vw] lg:text-[11.5vw] font-black tracking-tighter text-[#e60000] leading-none whitespace-nowrap text-center px-4 transform scale-y-[1.3] origin-bottom">
              YVANO ANTONIO.
            </h2>
          </div>

          {/* Overlapping Blurb */}
          <div className="absolute top-0 md:top-2 right-4 md:right-8 lg:right-[4%] z-10 text-right md:text-left opacity-60 hover:opacity-100 transition-opacity duration-300">
            <p className="text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] uppercase tracking-[0.1em] font-extrabold text-black md:whitespace-nowrap leading-relaxed max-w-[200px] md:max-w-none ml-auto">
              For bookings, collaborations and general inquiries please email <br className="md:hidden" />
              <a href={`mailto:${contact.email}`} className="text-black hover:text-[#e60000] transition-colors underline decoration-2 underline-offset-4 decoration-black/40 hover:decoration-[#e60000]">{contact.email}</a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}

