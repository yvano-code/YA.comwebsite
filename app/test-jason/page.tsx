import { JasonSlider } from "@/components/jason-slider"
import { siteConfig } from "@/lib/site-config"

export default function TestJasonPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <JasonSlider items={siteConfig.projects} />
    </main>
  )
}
