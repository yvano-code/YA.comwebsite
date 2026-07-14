import { TestarossaSlider } from "@/components/testarossa-slider"
import { siteConfig } from "@/lib/site-config"
import { MobileReelsFeed } from "@/components/mobile-reels-feed"

export default function TestarossaPage() {
  return (
    <main className="w-full h-[100dvh] overflow-hidden bg-black relative flex flex-col">
      {/* === DESKTOP VIEW === */}
      <div className="hidden md:block w-full h-full relative">
        <TestarossaSlider items={siteConfig.projects} />
      </div>

      {/* === MOBILE VIEW === */}
      <div className="block md:hidden w-full h-full relative overflow-hidden bg-black text-white">
        <MobileReelsFeed />
      </div>
    </main>
  )
}
