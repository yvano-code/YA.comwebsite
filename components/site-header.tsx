import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  return (
    <header className="flex flex-col items-center gap-4 px-6 pt-12 pb-8 text-center">
      <Link href="/" className="text-lg font-medium tracking-[0.2em] text-foreground">
        {siteConfig.name}
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-6">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-xs font-medium tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
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
