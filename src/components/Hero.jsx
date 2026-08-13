import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'

// Helper function to generate deterministic scatter vectors for each character
function getScatterProps(wordIndex, charIndex, char) {
  const seed = (wordIndex * 19 + charIndex * 11 + char.charCodeAt(0)) % 100
  const angle = (seed * 3.6 * Math.PI) / 180

  const dx = Math.sin(angle) * (180 + (seed % 140)) * (charIndex % 2 === 0 ? 1 : -1)
  const dy = Math.cos(angle * 1.4) * (140 + (seed % 120)) * (wordIndex % 2 === 0 ? -1 : 1)
  const rot = (seed % 2 === 0 ? 1 : -1) * (40 + (seed % 110))
  const scale = 0.3 + (seed % 14) / 10

  return { dx, dy, rot, scale }
}

function ScatterText({ text, progress, wordOffset = 0 }) {
  const letters = Array.from(text)

  return (
    <span aria-label={text} className="inline-block">
      {letters.map((char, idx) => {
        const { dx, dy, rot, scale } = getScatterProps(wordOffset, idx, char)

        const tx = progress * dx
        const ty = progress * dy
        const r = progress * rot
        const s = 1 + progress * (scale - 1)
        const opacity = Math.max(0, 1 - progress * 1.35)
        const blur = progress * 14

        return (
          <span
            key={idx}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${r}deg) scale(${s})`,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              willChange: 'transform, opacity, filter',
              transition: 'transform 0.05s linear, opacity 0.05s linear, filter 0.05s linear',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('home')
      if (!heroEl) return
      const rect = heroEl.getBoundingClientRect()
      const heroHeight = heroEl.offsetHeight || window.innerHeight
      const progress = Math.min(Math.max(-rect.top / (heroHeight * 0.75), 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-between overflow-hidden px-6 pb-12 pt-28 sm:px-10 sm:pb-16 sm:pt-36"
    >
      {/* Top Block */}
      <div>
        <h1 className="animate-letter-spacing text-4xl font-black uppercase leading-[1.02] tracking-tight text-[#1d1d1f] select-none min-[400px]:text-5xl sm:text-7xl sm:leading-[0.95] sm:tracking-tighter md:text-8xl lg:text-9xl">
          <span className="inline sm:block sm:whitespace-nowrap">
            <ScatterText text="Clear Brands." progress={scrollProgress} wordOffset={1} />{' '}
          </span>
          <span className="inline sm:block sm:whitespace-nowrap">
            <ScatterText text="Automated" progress={scrollProgress} wordOffset={2} />{' '}
          </span>
          <span className="inline sm:block sm:whitespace-nowrap">
            <ScatterText text="Growth." progress={scrollProgress} wordOffset={3} />
          </span>
        </h1>
        <p className="mt-6 flex flex-col gap-2 text-sm font-medium leading-relaxed text-[#86868b] sm:mt-8 sm:gap-1.5 sm:text-base md:text-lg lg:text-xl">
          <span className="inline sm:block sm:whitespace-nowrap">Cinema-grade video &amp; photo production.</span>
          <span className="inline sm:block sm:whitespace-nowrap">Targeted digital marketing &amp; ad growth.</span>
          <span className="inline sm:block sm:whitespace-nowrap">Engineered in Nellore for regional brands.</span>
        </p>
      </div>

      {/* Bottom Block */}
      <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        {/* Left: CTA */}
        <div className="flex w-full sm:w-auto">
          <a
            href="#contact"
            className="flex w-full items-center justify-center rounded-full bg-black px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md sm:w-auto sm:text-sm"
          >
            Start a Project
          </a>
        </div>

        {/* Right: showreel preview card */}
        <a
          href="#reel"
          className="group flex w-full items-center justify-center gap-4 rounded-2xl border border-black/10 bg-[#F5F5F7] p-3.5 transition-all duration-300 hover:scale-[1.02] hover:border-black/20 hover:shadow-md sm:w-auto sm:justify-start sm:p-4"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 group-hover:rotate-[90deg] sm:h-11 sm:w-11">
            <Play className="h-4 w-4 fill-current" />
          </span>
          <span className="flex flex-col text-left">
            <span className="text-sm font-semibold text-[#1d1d1f]">Watch Reel</span>
            <span className="text-xs text-[#86868b]">(0:45)</span>
          </span>
        </a>
      </div>
    </section>
  )
}
