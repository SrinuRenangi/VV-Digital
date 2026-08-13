import { useEffect, useRef, useState } from 'react'
import { Award, Compass, Sparkles } from 'lucide-react'

/* Scroll-reveal hook: fires once when element enters viewport. */
function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

/* Staggered fade-up wrapper. */
function Reveal({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${className}`}
    >
      {children}
    </div>
  )
}

// Deterministic scatter vectors for reverse unscramble text assembly
function getScatterProps(wordIndex, charIndex, char) {
  const seed = (wordIndex * 23 + charIndex * 13 + char.charCodeAt(0)) % 100
  const angle = (seed * 3.6 * Math.PI) / 180

  const dx = Math.sin(angle) * (140 + (seed % 120)) * (charIndex % 2 === 0 ? 1 : -1)
  const dy = Math.cos(angle * 1.3) * (100 + (seed % 100)) * (wordIndex % 2 === 0 ? -1 : 1)
  const rot = (seed % 2 === 0 ? 1 : -1) * (30 + (seed % 90))
  const scale = 0.4 + (seed % 12) / 10

  return { dx, dy, rot, scale }
}

function ReverseScatterText({ text, progress, wordOffset = 0 }) {
  const words = text.split(' ')

  // Reverse format:
  // When progress = 0 (entering view): scatterFactor = 1 (fully scattered into space)
  // When progress = 1 (scrolled into view): scatterFactor = 0 (letters unscramble into clean text!)
  const scatterFactor = Math.max(0, 1 - progress)

  return (
    <span aria-label={text} className="inline-block select-none">
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(word).map((char, cIdx) => {
            const { dx, dy, rot, scale } = getScatterProps(wordOffset + wIdx, cIdx, char)

            const tx = scatterFactor * dx
            const ty = scatterFactor * dy
            const r = scatterFactor * rot
            const s = 1 + scatterFactor * (scale - 1)
            const opacity = Math.min(1, Math.max(0.15, 1 - scatterFactor * 0.85))
            const blur = scatterFactor * 10

            return (
              <span
                key={cIdx}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${r}deg) scale(${s})`,
                  opacity: opacity,
                  filter: `blur(${blur}px)`,
                  willChange: 'transform, opacity, filter',
                  transition: 'transform 0.05s linear, opacity 0.05s linear, filter 0.05s linear',
                }}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

const PILLARS = [
  {
    icon: Award,
    title: 'Film-Grade Craft',
    desc: 'Cinematic visuals, sharp production, and obsessive detail behind every frame we ship.',
    accent: 'group-hover:bg-black',
  },
  {
    icon: Compass,
    title: 'Strategic Reach',
    desc: 'Data-led campaigns that put your brand in front of the right people at the right moment.',
    accent: 'group-hover:bg-[#0066cc]',
  },
]

// 3D Flip Card: Hidden Back side when un-hovered, flips 180° to reveal Front side on Cursor Hover
function FlipPillarCard({ pillar, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50, isHovered: false })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Slight 3D tilt while hovering front face
    const ry = ((x - centerX) / centerX) * 12
    const rx = -((y - centerY) / centerY) * 12

    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100

    setTilt({ rx, ry, glowX, glowY, isHovered: true })
  }

  const handleMouseLeave = () => {
    setTilt((prev) => ({ ...prev, rx: 0, ry: 0, isHovered: false }))
  }

  // Unhovered = 180deg (Back face visible, content hidden)
  // Hovered = 0deg (Front face visible, content revealed!)
  const rotateY = tilt.isHovered ? tilt.ry : 180
  const rotateX = tilt.isHovered ? tilt.rx : 0

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setTilt((t) => ({ ...t, isHovered: true }))}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
      className="group relative h-80 sm:h-84 w-full cursor-pointer select-none"
    >
      <div
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transformStyle: 'preserve-3d',
          transition: tilt.isHovered
            ? 'transform 0.15s ease-out'
            : 'transform 0.75s cubic-bezier(0.34, 1.4, 0.64, 1)',
        }}
        className="relative h-full w-full rounded-3xl transition-shadow duration-500 hover:shadow-2xl"
      >
        {/* FRONT FACE (Full Content — revealed on cursor hover) */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-[#0066cc]/30 bg-white p-6 shadow-xl sm:p-8"
        >
          {/* Dynamic Cursor Spotlight Overlay */}
          {tilt.isHovered && (
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(350px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(0, 102, 204, 0.12), transparent 70%)`,
              }}
            />
          )}

          <div>
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0066cc] text-white shadow-md`}
              >
                <pillar.icon className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066cc]">
                0{index + 1}
              </span>
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#1d1d1f]">{pillar.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#86868b] sm:text-base">
              {pillar.desc}
            </p>
          </div>

          <div className="border-t border-black/5 pt-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0066cc]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Core Excellence</span>
            </span>
          </div>
        </div>

        {/* BACK FACE (Blank / Minimalist Cover — visible when unhovered) */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-black/10 bg-gradient-to-br from-[#1d1d1f] via-[#2c2c2e] to-[#1d1d1f] p-8 text-white shadow-lg transition-all duration-300 group-hover:border-[#0066cc]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,204,0.18),transparent_65%)]" />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <pillar.icon className="h-7 w-7 text-[#38bdf8]" />
            </div>
            <span className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              {/* Pillar 0{index + 1} */}
            </span>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
              {pillar.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || 800

      // Calculate scroll progress from bottom of viewport (0) to upper viewport (1)
      const startPoint = windowHeight * 0.95
      const endPoint = windowHeight * 0.35

      const progress = Math.min(
        Math.max((startPoint - rect.top) / (startPoint - endPoint), 0),
        1
      )
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden mx-auto max-w-6xl border-t border-black/10 px-6 py-24 sm:px-10 sm:py-32"
    >
      {/* Layer 1: Badge */}
      <Reveal>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b] backdrop-blur-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066cc] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0066cc]" />
          </span>
          About the Studio
        </span>
      </Reveal>

      {/* Layer 2: Reverse Scroll-Unscramble Headline */}
      <div className="mb-16 mt-8 max-w-4xl">
        <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl">
          <ReverseScatterText
            text="We bridge high-end visual craft with strategic digital growth. No clutter, no empty noise."
            progress={scrollProgress}
            wordOffset={5}
          />
        </h2>
      </div>

      {/* Layer 3: Primary split grid */}
      <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
        {/* Left: story paragraphs */}
        <div className="space-y-6 text-lg leading-[1.6] text-[#86868b] sm:text-xl">
          <Reveal delay={200}>
            <p>
              Founded in 2025, VV Digitals was built on a single premise: brands shouldn&rsquo;t
              have to choose between stunning cinema-grade media and measurable marketing returns.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p>
              From full-scale photography and video production to targeted ad campaigns across
              platforms, we handle every stage of brand positioning under one roof with precision
              and speed.
            </p>
          </Reveal>
        </div>

        {/* Right: 2-card pillar grid with Cursor-Hover 3D Flip Reveal */}
        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <FlipPillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}