"use client"

/**
 * FilmTvShowcase — /film-tv2
 *
 * Features:
 *  • Infinite circular snap-scroll (3-copy clone technique with silent jump-back)
 *  • Per-project dynamic palette: 3 animated colour blobs swap smoothly on
 *    every card change, tinting the lava-lamp background to match the thumbnail
 *  • Cards + reflections share ONE rounded overflow container → zero gap
 *  • Glossy horizon line, palette-tinted colour-blend on reflections, shimmer sweep
 *  • Footer + background text removed; full-viewport layout
 */

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

// ─── Data ────────────────────────────────────────────────────────────────────

const REAL = siteConfig.projects
const N    = REAL.length

/** Three copies for seamless infinite loop (indices 0…3N-1) */
const LOOP = [...REAL, ...REAL, ...REAL]

/**
 * Per-project light, luminous colour palettes.
 * Channels stored as "R G B" strings so they can be used inside rgba(…).
 * Order matches siteConfig.projects order.
 */
const PAL = [
  { a: "125 211 252", b: "103 232 249", c: "167 243 208" }, // Clubhouse Jamz  — sky / cyan
  { a: "251 113 133", b: "253 186 116", c: "249 168 212" }, // BBB             — rose / peach
  { a:  "94 234 212", b: "167 243 208", c: "125 211 252" }, // Moongazer       — teal / mint
  { a: "244 114 182", b: "216 180 254", c: "251 207 232" }, // Fafiélla        — pink / violet
  { a: "251 146  60", b: "253 224  71", c: "252 165 165" }, // Practically Magic — amber / orange
  { a: "212 212 216", b: "228 228 231", c: "244 244 245" }, // #BLACK          — platinum / silver
  { a: "165 180 252", b: "196 181 253", c: "147 197 253" }, // Solitar         — periwinkle
]

function thumb(p: (typeof REAL)[number]): string {
  return p.image ?? "/placeholder.svg"
}

// ─── Component ───────────────────────────────────────────────────────────────

export function FilmTvShowcase() {
  const railRef = useRef<HTMLDivElement>(null)

  /**
   * loopIdx: index within LOOP (0…3N-1).
   * We start in the MIDDLE copy (loopIdx = N) and silently jump back
   * when the user scrolls past the first or third copy boundaries.
   */
  const [loopIdx,   setLoopIdx]   = useState(N)
  const [scrolling, setScrolling] = useState(false)
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isJumping   = useRef(false)

  const displayIdx = loopIdx % N   // 0…N-1: drives palette + dots
  const pal        = PAL[displayIdx] ?? PAL[0]

  // ── Utilities ──────────────────────────────────────────────────────────────

  /** Return the LOOP index of the card closest to the rail's visual centre */
  const findCentre = useCallback((): number => {
    const rail = railRef.current
    if (!rail) return N
    const mid  = rail.getBoundingClientRect().left + rail.clientWidth / 2
    let best = N, bestD = Infinity
    rail.querySelectorAll<HTMLElement>("[data-card]").forEach((el, i) => {
      const r = el.getBoundingClientRect()
      const d = Math.abs(r.left + r.width / 2 - mid)
      if (d < bestD) { bestD = d; best = i }
    })
    return best
  }, [])

  /** Instantly (no animation) jump to the equivalent card in the middle copy */
  const jumpToMiddle = useCallback((idx: number) => {
    if (idx >= N && idx < 2 * N) return  // already in middle copy
    if (isJumping.current) return
    const dest  = idx < N ? idx + N : idx - N
    const rail  = railRef.current
    if (!rail) return
    const cards = rail.querySelectorAll<HTMLElement>("[data-card]")
    const card  = cards[dest]
    if (!card) return
    isJumping.current = true
    // Direct scrollLeft assignment = instant, no snap animation
    rail.scrollLeft = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2
    setLoopIdx(dest)
    setTimeout(() => { isJumping.current = false }, 120)
  }, [])

  // ── Initial scroll (mount) ─────────────────────────────────────────────────
  useEffect(() => {
    requestAnimationFrame(() => {
      const rail  = railRef.current
      if (!rail) return
      const cards = rail.querySelectorAll<HTMLElement>("[data-card]")
      const card  = cards[N]
      if (!card) return
      rail.scrollLeft = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2
    })
  }, [])

  // ── Scroll event handlers ──────────────────────────────────────────────────
  const onScroll = useCallback(() => {
    if (isJumping.current) return

    // Shimmer on/off
    setScrolling(true)
    if (scrollTimer.current) clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => {
      setScrolling(false)
      // Fallback for browsers lacking `scrollend`
      if (!isJumping.current) {
        const idx = findCentre()
        setLoopIdx(idx)
        jumpToMiddle(idx)
      }
    }, 400)

    setLoopIdx(findCentre())
  }, [findCentre, jumpToMiddle])

  const onScrollEnd = useCallback(() => {
    if (isJumping.current) return
    const idx = findCentre()
    setLoopIdx(idx)
    jumpToMiddle(idx)
  }, [findCentre, jumpToMiddle])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    rail.addEventListener("scroll",    onScroll,    { passive: true })
    rail.addEventListener("scrollend", onScrollEnd)
    return () => {
      rail.removeEventListener("scroll",    onScroll)
      rail.removeEventListener("scrollend", onScrollEnd)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
    }
  }, [onScroll, onScrollEnd])

  // ── Programmatic navigation ────────────────────────────────────────────────
  const smoothScrollTo = useCallback((li: number) => {
    const rail  = railRef.current
    if (!rail) return
    const cards = rail.querySelectorAll<HTMLElement>("[data-card]")
    const card  = cards[Math.max(0, Math.min(li, LOOP.length - 1))]
    if (!card) return
    rail.scrollTo({
      left:     card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    })
  }, [])

  const go = useCallback((dir: -1 | 1) => {
    smoothScrollTo(findCentre() + dir)
  }, [findCentre, smoothScrollTo])

  const goToReal = useCallback((ri: number) => {
    smoothScrollTo(N + ri)
  }, [smoothScrollTo])

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes ftDrift1 {
          0%,100% { transform: translate(  0%,  0%) scale(1.00); }
          33%     { transform: translate(  5%,  7%) scale(1.10); }
          66%     { transform: translate( -4%, -3%) scale(0.94); }
        }
        @keyframes ftDrift2 {
          0%,100% { transform: translate(  0%,  0%) scale(1.00); }
          40%     { transform: translate( -7%,  6%) scale(1.12); }
          72%     { transform: translate(  5%, -7%) scale(0.92); }
        }
        @keyframes ftDrift3 {
          0%,100% { transform: translate(  0%,  0%) scale(1.00); }
          28%     { transform: translate(  5%, -9%) scale(1.07); }
          76%     { transform: translate( -6%,  5%) scale(1.09); }
        }
        @keyframes ftShimmer {
          0%   { transform: translateX(-180%) skewX(-22deg); opacity:0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX( 340%) skewX(-22deg); opacity:0; }
        }
      `}</style>

      {/*
        ══════════════════════════════════════════════════════════════
        LAYER 1 — Dynamic palette blobs
        Sit above the glass overlay (z:0) so their colours are vivid.
        Three large radial-gradient blobs drift gently and smoothly
        transition to the active project's palette when the card changes.
        ══════════════════════════════════════════════════════════════
      */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Blob A — top-left */}
        <div style={{
          position: "absolute",
          width: "82vw", height: "82vw",
          top: "-28%", left: "-22%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${pal.a},0.52) 0%, transparent 65%)`,
          filter: "blur(95px)",
          transition: "background 1.6s cubic-bezier(0.4,0,0.2,1)",
          animation: "ftDrift1 22s ease-in-out infinite",
        }} />
        {/* Blob B — bottom-right */}
        <div style={{
          position: "absolute",
          width: "88vw", height: "88vw",
          bottom: "-30%", right: "-24%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${pal.b},0.46) 0%, transparent 65%)`,
          filter: "blur(105px)",
          transition: "background 1.6s cubic-bezier(0.4,0,0.2,1)",
          animation: "ftDrift2 28s ease-in-out infinite",
        }} />
        {/* Blob C — centre wash */}
        <div style={{
          position: "absolute",
          width: "110vw", height: "72vw",
          top: "12%", left: "-5%",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(${pal.c},0.34) 0%, transparent 60%)`,
          filter: "blur(85px)",
          transition: "background 1.6s cubic-bezier(0.4,0,0.2,1)",
          animation: "ftDrift3 26s ease-in-out infinite",
        }} />
      </div>

      {/*
        ══════════════════════════════════════════════════════════════
        LAYER 2 — Page content
        ══════════════════════════════════════════════════════════════
      */}
      <div
        className="relative w-full min-h-screen flex flex-col overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {/* ── Minimal header ── */}
        <header className="flex items-center justify-between px-10 pt-9 pb-0 shrink-0">
          <div>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.36em",
              textTransform: "uppercase", color: "rgba(0,0,0,0.27)",
            }}>
              Film &amp; Television
            </p>
            <p style={{
              fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(0,0,0,0.17)", marginTop: 4,
            }}>
              {String(displayIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </p>
          </div>

          <nav className="flex gap-2" aria-label="Project navigation">
            {([-1, 1] as const).map(dir => (
              <button
                key={dir}
                onClick={() => go(dir)}
                aria-label={dir === -1 ? "Previous project" : "Next project"}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.58)",
                  border: "1px solid rgba(255,255,255,0.72)",
                  backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                  boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.18s ease, box-shadow 0.18s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  {dir === -1
                    ? <path d="M9 2 4 7 9 12" stroke="rgba(0,0,0,0.52)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    : <path d="M5 2 10 7 5 12" stroke="rgba(0,0,0,0.52)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  }
                </svg>
              </button>
            ))}
          </nav>
        </header>

        {/* ── Scroll rail + reflections ── */}
        <div
          className="flex-1 flex flex-col justify-center"
          style={{ marginTop: "5.5vh" }}
        >
          <div
            ref={railRef}
            className="flex overflow-x-auto"
            style={{
              gap: "20px",
              scrollSnapType: "x mandatory",
              // scroll-padding tells snap where the "viewport" begins/ends
              scrollPaddingInline: "18.5vw",
              paddingInline: "18.5vw",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {LOOP.map((project, li) => {
              const ri     = li % N
              const active = li === loopIdx
              const src    = thumb(project)

              return (
                <div
                  key={`${ri}-${Math.floor(li / N)}`}
                  data-card="true"
                  style={{
                    flexShrink: 0,
                    width: "clamp(440px, 63vw, 820px)",
                    scrollSnapAlign: "center",
                    scrollSnapStop: "always",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/*
                    ┌─────────────────────────────────────────────────────┐
                    │  UNIFIED CONTAINER                                   │
                    │  border-radius + overflow:hidden here only.          │
                    │  This ensures the card image and its reflection      │
                    │  share rounded corners with ZERO gap between them.   │
                    └─────────────────────────────────────────────────────┘
                  */}
                  <div style={{
                    borderRadius: 22,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.65s ease, opacity 0.65s ease",
                    boxShadow: active
                      ? [
                          "0 36px 100px rgba(0,0,0,0.20)",
                          "0 10px 32px rgba(0,0,0,0.12)",
                          `0 0 0 1px rgba(${pal.a},0.25)`,
                          "inset 0 1px 0 rgba(255,255,255,0.22)",
                        ].join(", ")
                      : "0 4px 20px rgba(0,0,0,0.06)",
                    opacity: active ? 1 : 0.58,
                  }}>

                    {/* ── Card image ── */}
                    <div style={{
                      position: "relative",
                      height: "clamp(260px, 43vh, 510px)",
                      flexShrink: 0,
                    }}>
                      <Image
                        src={src}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width:1440px) 63vw, 820px"
                        priority={li === N}
                      />

                      {/* Diagonal gloss highlight — makes the card look like a polished print */}
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: [
                          "linear-gradient(135deg,",
                          "  rgba(255,255,255,0.14)  0%,",
                          "  rgba(255,255,255,0.04) 38%,",
                          "  transparent 58%",
                          ")",
                        ].join(""),
                      }} />

                      {/* Bottom gradient + title */}
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column", justifyContent: "flex-end",
                        padding: "clamp(18px,2.4vw,30px)",
                        background: [
                          "linear-gradient(to top,",
                          "  rgba(0,0,0,0.76) 0%,",
                          "  rgba(0,0,0,0.30) 40%,",
                          "  transparent 66%",
                          ")",
                        ].join(""),
                      }}>
                        {project.credits?.[0] && (
                          <p style={{
                            fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase",
                            color: "rgba(255,255,255,0.46)", fontWeight: 600, marginBottom: 7,
                          }}>
                            {project.credits[0].value}
                          </p>
                        )}
                        <h2 style={{
                          fontSize: "clamp(12px,1.4vw,19px)", fontWeight: 900,
                          color: "white", textTransform: "uppercase",
                          letterSpacing: "0.07em", lineHeight: 1.18,
                          textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                        }}>
                          {project.title}
                        </h2>
                      </div>
                    </div>

                    {/*
                      ── Reflection ──
                      Lives INSIDE the unified container so border-radius and overflow
                      are shared — no gap, no white corner bleed.

                      Mask technique (scaleY(-1) on inner child):
                        The flipped div's LOCAL y-axis is inverted vs the screen:
                        • Local y=0 (top)    → visual BOTTOM of the reflection
                        • Local y=100% (btm) → visual TOP  (right at the card edge)
                      mask: "to bottom, transparent→black"
                        • local 0% (visual bottom) = transparent → fades to nothing ✓
                        • local 100% (visual top)  = black       → fully visible ✓
                    */}
                    <div style={{
                      position: "relative",
                      height: "clamp(90px, 16vh, 175px)",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}>

                      {/* Flipped image */}
                      <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url(${src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transform: "scaleY(-1)",
                        filter: "blur(1.5px) saturate(0.52) brightness(1.22)",
                        WebkitMaskImage: [
                          "linear-gradient(to bottom,",
                          "  transparent                   0%,",
                          "  rgba(0,0,0,0.18)             18%,",
                          "  rgba(0,0,0,0.68)             52%,",
                          "  black                       100%",
                          ")",
                        ].join(""),
                        maskImage: [
                          "linear-gradient(to bottom,",
                          "  transparent                   0%,",
                          "  rgba(0,0,0,0.18)             18%,",
                          "  rgba(0,0,0,0.68)             52%,",
                          "  black                       100%",
                          ")",
                        ].join(""),
                      }} />

                      {/*
                        Glossy horizon line at the card→reflection seam.
                        A thin bright stripe + palette glow = looks like light
                        skimming across water/glass.
                      */}
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 2,
                        background: [
                          `linear-gradient(to right,`,
                          `  transparent,`,
                          `  rgba(255,255,255,0.75) 20%,`,
                          `  rgba(${pal.a},0.55) 50%,`,
                          `  rgba(255,255,255,0.75) 80%,`,
                          `  transparent`,
                          `)`,
                        ].join(""),
                        transition: "background 1.6s ease",
                      }} />

                      {/*
                        Palette colour blend — ties the reflection's tone to
                        the active project's colours so it harmonises with
                        the background blobs.
                      */}
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: [
                          `linear-gradient(to bottom,`,
                          `  rgba(${pal.a},0.10) 0%,`,
                          `  rgba(${pal.b},0.22) 100%`,
                          `)`,
                        ].join(""),
                        transition: "background 1.6s ease",
                        mixBlendMode: "color",
                      }} />

                      {/*
                        Glossy specular sheen overlay.
                        A subtle bright gradient from top-left gives the
                        reflection the appearance of polished glass.
                      */}
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: [
                          "linear-gradient(160deg,",
                          "  rgba(255,255,255,0.18) 0%,",
                          "  rgba(255,255,255,0.06) 35%,",
                          "  transparent 60%",
                          ")",
                        ].join(""),
                      }} />

                      {/* Shimmer sweep — plays continuously while scrolling */}
                      {scrolling && (
                        <div style={{
                          position: "absolute", inset: 0,
                          overflow: "hidden", pointerEvents: "none",
                        }}>
                          <div style={{
                            position: "absolute",
                            top: 0, bottom: 0,
                            left: 0, width: "42%",
                            background: [
                              "linear-gradient(108deg,",
                              "  transparent           10%,",
                              "  rgba(255,255,255,0.62) 50%,",
                              "  transparent           90%",
                              ")",
                            ].join(""),
                            animation: "ftShimmer 0.88s cubic-bezier(0.25,0.46,0.45,0.94) infinite",
                          }} />
                        </div>
                      )}
                    </div>
                    {/* ── end unified container ── */}
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Dot / pill indicator ── */}
          <div
            style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              gap: 8, marginTop: 28,
            }}
            role="tablist"
            aria-label="Project navigation dots"
          >
            {REAL.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === displayIdx}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => goToReal(i)}
                style={{
                  height: 3,
                  width: i === displayIdx ? 22 : 3,
                  borderRadius: 999,
                  background: i === displayIdx ? "rgba(0,0,0,0.48)" : "rgba(0,0,0,0.18)",
                  border: "none", padding: 0, cursor: "pointer",
                  transition: [
                    "width 0.40s cubic-bezier(0.34,1.56,0.64,1)",
                    "background 0.40s ease",
                  ].join(", "),
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom breathing room */}
        <div style={{ height: "7vh", flexShrink: 0 }} />
      </div>
    </>
  )
}
