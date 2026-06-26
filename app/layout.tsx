import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Outfit, Hanken_Grotesk, Sedgwick_Ave_Display, Permanent_Marker } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/site-config'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken-grotesk' })
const sedgwickDisplay = Sedgwick_Ave_Display({ weight: "400", subsets: ['latin'], variable: '--font-sedgwick-display' })
const permanentMarker = Permanent_Marker({ weight: "400", subsets: ['latin'], variable: '--font-permanent-marker' })

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
  viewportFit: 'cover',
}

import { SiteFooter } from '@/components/site-footer'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { DesktopBottomNav } from '@/components/desktop-bottom-nav'
import dynamic from 'next/dynamic'

const InteractiveLavaLamp = dynamic(
  () => import('@/components/interactive-lava-lamp').then((mod) => mod.InteractiveLavaLamp)
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} ${outfit.variable} ${hankenGrotesk.variable} ${sedgwickDisplay.variable} ${permanentMarker.variable} antialiased bg-[#f0f0f5] text-black selection:bg-black selection:text-white min-h-[100dvh] relative`}>
        {/* Patch for Brave Browser Wallet injecting broken scripts and crashing Next.js Dev Server */}
        <script dangerouslySetInnerHTML={{ __html: `if (typeof window !== 'undefined' && !window.ethereum) { window.ethereum = {}; }` }} />
        
        {/* Dynamic Liquid Glass Background Elements */}
        <InteractiveLavaLamp />
        
        {/* Global Glass Overlay */}
        <div className="fixed inset-0 bg-white/20 backdrop-blur-[60px] pointer-events-none z-[0] border-b border-white/40" />

        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <DesktopBottomNav />
        <MobileBottomNav />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
