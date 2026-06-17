import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-white/30">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* We use scale-150 and centering to crop the youtube borders and make it completely full bleed */}
        <iframe
          src="https://www.youtube.com/embed/ci6YxSjBAto?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=ci6YxSjBAto&playsinline=1"
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-70"
          allow="autoplay; encrypted-media"
        />
        {/* Subtle dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-16">
        <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">
          
          {/* Bottom Left: Navigation */}
          <div className="flex-1">
            <Link 
              href="/film-tv" 
              className="text-2xl md:text-4xl font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              FILM & TELEVISION
            </Link>
          </div>

          {/* Bottom Right: Info */}
          <div className="flex flex-col items-end text-right space-y-8" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            
            {/* Name & Title */}
            <div className="space-y-1">
              <Link href="/film-tv" className="hover:opacity-70 transition-opacity">
                <h1 className="text-3xl md:text-5xl font-bold tracking-[0.1em] uppercase">YVANO ANTONIO</h1>
              </Link>
              <p className="text-sm md:text-base font-medium tracking-[0.3em] uppercase">DIRECTOR</p>
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80 mt-2">
                FILM & TELEVISION / MUSIC VIDEO / COMMERCIAL / LIVE BROADCAST
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-1">
              <Link href="/contact" className="hover:opacity-70 transition-opacity">
                <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase">CONTACT</p>
              </Link>
              <p className="text-[10px] md:text-xs tracking-[0.15em] text-white/80 uppercase">
                PHONE: 647 809 7416
              </p>
              <a href="mailto:YWICKHAMEDWARDS@GMAIL.COM" className="text-[10px] md:text-xs tracking-[0.15em] text-white/80 uppercase hover:text-white transition-colors">
                EMAIL: YWICKHAMEDWARDS@GMAIL.COM
              </a>
            </div>

            {/* Biography */}
            <div>
              <Link 
                href="/editorial" 
                className="text-sm md:text-base font-medium tracking-[0.2em] uppercase hover:opacity-70 transition-opacity text-white/80 italic"
              >
                BIOGRAPHY
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
