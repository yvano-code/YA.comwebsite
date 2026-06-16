import { siteConfig } from "@/lib/site-config"

function VimeoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 7.42c-.1 2.14-1.59 5.06-4.48 8.78C14.54 20.07 12 22 9.86 22c-1.33 0-2.45-1.22-3.36-3.67-.61-2.23-1.22-4.46-1.83-6.69-.68-2.45-1.4-3.67-2.18-3.67-.17 0-.76.35-1.77 1.06L0 7.62c1.2-1.06 2.39-2.12 3.56-3.18C5.17 3.06 6.38 2.36 7.19 2.28c1.9-.18 3.07 1.12 3.51 3.91.47 3.01.8 4.88.98 5.62.54 2.45 1.13 3.67 1.78 3.67.5 0 1.27-.8 2.29-2.39 1.02-1.59 1.56-2.8 1.64-3.63.16-1.5-.43-2.26-1.78-2.26-.64 0-1.29.15-1.97.44C15.65 3.74 18.04 1.4 21.6 1.5c2.64.07 3.88 1.7 3.74 4.88L22 7.42z" />
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
  const { social } = siteConfig

  return (
    <footer className="mt-16 flex flex-col items-center gap-6 px-6 pb-12 pt-8 text-center">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </p>
      <div className="flex items-center gap-5 text-muted-foreground">
        {social.vimeo && (
          <a href={social.vimeo} target="_blank" rel="noreferrer" aria-label="Vimeo" className="transition-colors hover:text-foreground">
            <VimeoIcon className="size-5" />
          </a>
        )}
        {social.instagram && (
          <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-foreground">
            <InstagramIcon className="size-5" />
          </a>
        )}
        {social.youtube && (
          <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="transition-colors hover:text-foreground">
            <YoutubeIcon className="size-5" />
          </a>
        )}
        {social.email && (
          <a href={`mailto:${social.email}`} aria-label="Email" className="transition-colors hover:text-foreground">
            <MailIcon className="size-5" />
          </a>
        )}
      </div>
    </footer>
  )
}
