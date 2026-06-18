"use client"

import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/site-config"

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
  const { social, contact } = siteConfig

  // We use the demo reel video URL here
  const videoId = "w0BXesobuSE"

  return (
    <footer className="mt-32 relative w-full flex items-center justify-center overflow-hidden py-32 md:py-48">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${videoId}`}
          className="absolute inset-0 w-full h-full object-cover scale-150 transform-gpu"
          allow="autoplay; encrypted-media"
        />
        {/* Dark overlay to make the video subtle and let the text pop */}
        <div className="absolute inset-0 bg-black/60" /> 
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
        <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 md:mb-4">
          FOR BOOKINGS, COLLABORATIONS AND GENERAL INQUIRIES PLEASE EMAIL <a href={`mailto:${contact.email}`} className="text-gray-200 hover:text-white transition-colors">{contact.email}</a>
        </p>
        <h2 className="text-[13vw] sm:text-[12vw] font-black tracking-tighter text-[#e60000] leading-none select-none drop-shadow-xl">
          YVANO ANTONIO.
        </h2>
      </div>

      {/* Bottom bar with socials and copyright */}
      <div className="absolute bottom-6 left-0 w-full px-6 flex flex-col md:flex-row items-center justify-between gap-4 z-10 text-gray-400">
        <p className="text-xs font-medium">
          &copy; {new Date().getFullYear()} GOOD YUTE LIFESTYLE
        </p>
        <div className="flex items-center gap-5">
          {/* @ts-ignore */}
          {social.tiktok && (
            // @ts-ignore
            <a href={social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="transition-colors hover:text-white">
              <TiktokIcon className="size-5" />
            </a>
          )}
          {social.instagram && (
            <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-white">
              <InstagramIcon className="size-5" />
            </a>
          )}
          {social.youtube && (
            <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="transition-colors hover:text-white">
              <YoutubeIcon className="size-5" />
            </a>
          )}
          {social.email && (
            <a href={`mailto:${social.email}`} aria-label="Email" className="transition-colors hover:text-white">
              <MailIcon className="size-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

