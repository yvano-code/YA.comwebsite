import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: siteConfig.contact.blurb,
}

export default function ContactPage() {
  const { contact } = siteConfig

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <h1 className="text-sm font-medium tracking-[0.2em] text-foreground">
            {contact.heading}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {contact.blurb}
          </p>

          <a
            href={`mailto:${contact.email}`}
            className="text-base font-medium tracking-wide text-foreground underline-offset-4 hover:underline"
          >
            {contact.email}
          </a>

          {contact.repName && (
            <div className="mt-4 flex flex-col gap-1">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {contact.repName}
              </p>
              {contact.repEmail && (
                <a
                  href={`mailto:${contact.repEmail}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {contact.repEmail}
                </a>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
