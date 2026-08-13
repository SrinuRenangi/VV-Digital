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
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
    icon: Compass,
    title: 'Precision Craft',
    desc: 'Cinema-quality 4K visual direction, commercial lighting, and post-production editing.',
  },
  {
    icon: Award,
    title: 'Automated Reach',
    desc: 'Data-driven ad funnels designed for measurable brand growth and high conversion.',
  },
]

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

    const ry = ((x - centerX) / centerX) * 12
    const rx = -((y - centerY) / centerY) * 12

    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100

    setTilt({ rx, ry, glowX, glowY, isHovered: true })
  }

  const handleMouseLeave = () => {
    setTilt((prev) => ({ ...prev, rx: 0, ry: 0, isHovered: false }))
  }

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
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-black/20 bg-white p-6 shadow-xl sm:p-8"
        >
          {tilt.isHovered && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(350px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(0, 0, 0, 0.06), transparent 70%)`,
              }}
            />
          )}

          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-md">
                <pillar.icon className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
                0{index + 1}
              </span>
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#1d1d1f]">{pillar.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#86868b] sm:text-base">
              {pillar.desc}
            </p>
          </div>

          <div className="border-t border-black/5 pt-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Core Excellence</span>
            </span>
          </div>
        </div>

        {/* BACK FACE (Minimalist Cover — visible when unhovered) */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-black/10 bg-[#1d1d1f] p-8 text-white shadow-lg transition-all duration-300 group-hover:border-black"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-inner">
              <pillar.icon className="h-7 w-7" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
                Pillar 0{index + 1}
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">{pillar.title}</h3>
            </div>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>Hover To Reveal</span>
            </span>
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
    let animId
    let targetProgress = 0
    let currentProgress = 0

    const updateTarget = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || 800

      const startPoint = windowHeight * 0.95
      const endPoint = windowHeight * 0.35

      targetProgress = Math.min(
        Math.max((startPoint - rect.top) / (startPoint - endPoint), 0),
        1
      )
    }

    const loop = () => {
      const diff = targetProgress - currentProgress
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.1
        setScrollProgress(currentProgress)
      }
      animId = requestAnimationFrame(loop)
    }

    window.addEventListener('scroll', updateTarget, { passive: true })
    updateTarget()
    loop()

    return () => {
      window.removeEventListener('scroll', updateTarget)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden mx-auto max-w-6xl border-t border-black/10 px-6 py-10 sm:px-10 sm:py-16 lg:py-20"
    >
      {/* Layer 1: Badge */}
      <Reveal>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b] backdrop-blur-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
          </span>
          About the Studio
        </span>
      </Reveal>

      {/* Layer 2: Reverse Scroll-Unscramble Headline */}
      <div className="mb-10 mt-6 max-w-4xl sm:mb-16 sm:mt-8">
        <h2 className="text-2xl font-semibold leading-[1.15] tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl">
          <ReverseScatterText
            text="We bridge high-end visual craft with strategic digital growth. No clutter, no empty noise."
            progress={scrollProgress}
            wordOffset={5}
          />
        </h2>
      </div>

      {/* Layer 3: Primary split grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:gap-20">
        {/* Left: story paragraphs */}
        <div className="space-y-5 text-base leading-[1.6] text-[#86868b] sm:space-y-6 sm:text-xl">
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

        {/* Right: 2-card pillar grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <FlipPillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}