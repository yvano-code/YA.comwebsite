import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/site-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: 'white',
}

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#f0f0f5] text-black selection:bg-black selection:text-white min-h-screen relative`}>
        {/* Dynamic Liquid Glass Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
          <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-pink-300/40 via-purple-300/40 to-transparent blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-blue-300/40 via-cyan-300/40 to-transparent blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
          <div className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-amber-200/40 via-orange-200/30 to-transparent blur-[150px] animate-pulse" style={{ animationDuration: '15s', animationDelay: '5s' }} />
        </div>
        
        {/* Global Glass Overlay */}
        <div className="fixed inset-0 bg-white/20 backdrop-blur-[60px] pointer-events-none z-[-1] border-b border-white/40" />

        <div className="flex min-h-screen flex-col relative z-0">
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
