import { useEffect, useRef, useState } from 'react'
import { Award, Compass } from 'lucide-react'

/* Scroll-reveal hook: fires once when the element enters the viewport. */
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

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl border-t border-black/10 px-6 py-24 sm:px-10 sm:py-32"
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

      {/* Layer 2: Headline */}
      <Reveal delay={120}>
        <h2 className="mb-16 mt-8 max-w-4xl text-3xl font-semibold leading-[1.12] tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl">
          We bridge high-end visual craft with strategic digital growth. No clutter, no empty
          noise.
        </h2>
      </Reveal>

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

        {/* Right: 2-card pillar grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={240 + i * 120}>
              <div className="group flex h-full flex-col rounded-3xl border border-black/10 bg-[#f5f5f7] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-8">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black transition-all duration-300 ${pillar.accent} group-hover:text-white`}
                >
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#1d1d1f]">{pillar.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#86868b]">{pillar.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}