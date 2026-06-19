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
import { DynamicBackground } from '@/components/dynamic-background'
import { CustomCursor } from '@/components/custom-cursor'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#f0f0f5] text-black selection:bg-black selection:text-white min-h-screen relative`}>
        {/* Dynamic Liquid Glass Background Elements */}
        <DynamicBackground />
        
        {/* Custom Liquid Glass Cursor */}
        <CustomCursor />
        
        {/* Global Glass Overlay */}
        <div className="fixed inset-0 bg-white/20 backdrop-blur-[60px] pointer-events-none z-[-1] border-b border-white/40" />

        <div className="flex min-h-screen flex-col">
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
