import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Camera,
  CheckCircle2,
  ChevronRight,
  Layers,
  Megaphone,
  Scissors,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

/* Scroll-reveal hook: fires once when element enters viewport. */
function useInView(threshold = 0.15) {
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

const SERVICES_DATA = [
  {
    id: 'production',
    num: '01',
    category: 'Production',
    title: 'Photo & Video Production',
    tagline: 'Cinematic 4K media production tailored for regional impact.',
    description:
      'We handle complete on-field commercial shoots, high-end product photography, and brand documentaries using cinema-grade equipment.',
    icon: Camera,
    accent: 'from-[#0066cc]/20 via-[#0066cc]/5 to-transparent',
    badgeColor: 'border-[#0066cc]/30 bg-[#0066cc]/10 text-[#0066cc]',
    stat: '150+ Shoots Executed',
    highlights: [
      '4K & 60FPS Cinema Filming',
      'Commercial Concept & Direction',
      'Studio & Product Photography',
      'Aerial Drone & Event Coverage',
    ],
    deliverables: ['TV & Social Ad Master', 'Raw & Graded Stills', 'Short-form Reel Cuts'],
  },
  {
    id: 'marketing',
    num: '02',
    category: 'Marketing',
    title: 'Digital Marketing & Performance',
    tagline: 'Data-driven ad campaigns built to turn views into high-intent leads.',
    description:
      'From Meta ad funnels to hyper-targeted Google search ads, we optimize every rupee of ad spend to maximize customer acquisition.',
    icon: TrendingUp,
    accent: 'from-[#2563eb]/20 via-[#3b82f6]/5 to-transparent',
    badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-600',
    stat: '4.2x Average Campaign ROI',
    highlights: [
      'Meta & Instagram Ad Funnels',
      'Google Ads & Local Search SEO',
      'Hyper-Local Audience Targeting',
      'Real-time Performance Analytics',
    ],
    deliverables: ['Custom Ad Creative Set', 'Weekly Lead Reports', 'Funnel Optimization'],
  },
  {
    id: 'promotion',
    num: '03',
    category: 'Branding',
    title: 'Brand Promotion & Identity',
    tagline: 'Transforming regional businesses into trusted household brands.',
    description:
      'Complete end-to-end personal branding, commercial launch campaigns, visual identity assets, and influencer collaboration management.',
    icon: Megaphone,
    accent: 'from-[#7c3aed]/20 via-[#8b5cf6]/5 to-transparent',
    badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-600',
    stat: '35+ Regional Brands Built',
    highlights: [
      'Commercial Launch Strategy',
      'Visual Identity & Logo Assets',
      'Personal Branding Programs',
      'PR & Influencer Partnerships',
    ],
    deliverables: ['Brand Guidelines Deck', 'Launch Campaign Plan', 'Social Media Kit'],
  },
  {
    id: 'post-production',
    num: '04',
    category: 'Post-Production',
    title: 'Video Editing & Post-Production',
    tagline: 'Precision pacing, Hollywood color grading, and dynamic motion graphics.',
    description:
      'Our post-production suite transforms raw video footage into polished, high-engagement content engineered for modern social algorithms.',
    icon: Scissors,
    accent: 'from-[#0284c7]/20 via-[#38bdf8]/5 to-transparent',
    badgeColor: 'border-sky-500/30 bg-sky-500/10 text-sky-600',
    stat: '100% 4K Mastered Outputs',
    highlights: [
      'DaVinci Resolve Color Grading',
      '2D & 3D Motion Graphics',
      'Sound Design & Audio Mix',
      'High-Pacing Short Reel Edits',
    ],
    deliverables: ['4K ProRes Export', 'Vertical Reel Variants', 'Subtitled Cutdowns'],
  },
]

export default function Services() {
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [expandedId, setExpandedId] = useState('production')
  const cardRefs = useRef([])

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const handleSelectService = (index) => {
    const targetService = SERVICES_DATA[index]
    setActiveCardIndex(index)
    setExpandedId(targetService.id) // Automatically open & expand the selected service card!

    if (cardRefs.current[index]) {
      const cardEl = cardRefs.current[index]
      const yOffset = -100 // Header sticky alignment offset
      const y = cardEl.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="services"
      className="relative border-t border-black/10 bg-gradient-to-b from-white via-[#f5f5f7]/60 to-white py-24 sm:py-32"
    >
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#0066cc]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* 50/50 Split Grid Container */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column (50% Sticky Text & Navigation Header) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start lg:py-4">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b] shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#0066cc]" />
                Core Capabilities
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[#1d1d1f] sm:text-5xl lg:text-6xl leading-[1.1]">
                End-to-End Brand Building.
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 text-base leading-relaxed text-[#86868b] sm:text-lg">
                We combine cinema-grade video production with performance digital marketing to build market-leading regional brands.
              </p>
            </Reveal>

            {/* Interactive Index Navigation List */}
            <Reveal delay={240}>
              <div className="mt-10 hidden space-y-3 lg:block">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]/60">
                  Services Roster ({SERVICES_DATA.length})
                </p>
                <div className="space-y-2">
                  {SERVICES_DATA.map((service, idx) => (
                    <button
                      key={service.id}
                      onClick={() => handleSelectService(idx)}
                      className={`group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-xs font-bold transition-all duration-300 ${
                        activeCardIndex === idx
                          ? 'border-[#0066cc] bg-[#0066cc]/10 text-[#0066cc] shadow-md ring-2 ring-[#0066cc]/20'
                          : 'border-black/5 bg-white text-[#86868b] hover:border-black/15 hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs opacity-75">{service.num}</span>
                        <span className="truncate text-sm font-semibold">{service.title}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeCardIndex === idx ? 'translate-x-1 text-[#0066cc]' : 'opacity-40'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Quick Consultation CTA Button */}
            <Reveal delay={300}>
              <div className="mt-8 pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[#1d1d1f] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#0066cc] hover:shadow-xl"
                >
                  <span>Explore Custom Package</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column (50% Smooth Stacking Cards Column) */}
          <div className="relative flex flex-col gap-8 pb-12 lg:col-span-7">
            {SERVICES_DATA.map((service, idx) => {
              const IconComponent = service.icon
              const isExpanded = expandedId === service.id

              // Dynamic sticky top offset so cards stack smoothly over each other
              const stickyTopStyle = {
                top: `calc(7rem + ${idx * 2}rem)`,
                zIndex: (idx + 1) * 10,
              }

              return (
                <div
                  key={service.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={stickyTopStyle}
                  className="sticky transition-all duration-500 will-change-transform"
                >
                  <div
                    onMouseEnter={() => setActiveCardIndex(idx)}
                    onClick={() => {
                      setActiveCardIndex(idx)
                      toggleExpand(service.id)
                    }}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white/95 p-8 shadow-[0_-10px_35px_rgba(0,0,0,0.08),0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 cursor-pointer sm:p-10 ${
                      activeCardIndex === idx || isExpanded
                        ? 'border-[#0066cc] ring-2 ring-[#0066cc]/20 shadow-2xl'
                        : 'border-black/10 hover:border-[#0066cc]/40'
                    }`}
                  >
                    {/* Background Subtle Gradient Glow */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />

                    {/* Card Header */}
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/5 bg-[#f5f5f7] text-[#1d1d1f] transition-all duration-300 group-hover:bg-[#0066cc] group-hover:text-white group-hover:shadow-md">
                          <IconComponent className="h-7 w-7" />
                        </div>
                        <span className="font-mono text-base font-extrabold tracking-wider text-[#86868b]/70">
                          {service.num}
                        </span>
                      </div>

                      {/* Category & Stat Badges */}
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider ${service.badgeColor}`}
                        >
                          <Zap className="h-3 w-3" />
                          {service.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#f5f5f7] px-3.5 py-1 text-[11px] font-semibold text-[#1d1d1f]">
                          <BarChart3 className="h-3 w-3 text-[#0066cc]" />
                          {service.stat}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#1d1d1f] transition-colors duration-200 group-hover:text-[#0066cc] sm:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#86868b] sm:text-base">
                        {service.tagline}
                      </p>

                      {/* Core Highlights List */}
                      <div className="mt-6 border-t border-black/5 pt-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                          Core Capabilities
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {service.highlights.map((item) => (
                            <li key={item} className="flex items-center gap-2.5">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066cc]" />
                              <span className="text-xs font-medium text-[#1d1d1f]/85 sm:text-sm">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expandable Deliverables Drawer */}
                      {isExpanded && (
                        <div className="mt-6 rounded-2xl border border-[#0066cc]/20 bg-[#0066cc]/5 p-5 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#0066cc]">
                            Deliverables & Scope
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {service.deliverables.map((deliv) => (
                              <span
                                key={deliv}
                                className="inline-flex items-center rounded-lg border border-[#0066cc]/20 bg-white px-3 py-1 text-xs font-semibold text-[#1d1d1f] shadow-2xs"
                              >
                                {deliv}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-xs text-[#86868b]">
                            {service.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(service.id)
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0066cc] hover:underline"
                      >
                        <span>{isExpanded ? 'Hide Scope' : 'View Deliverables'}</span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      <a
                        href="#contact"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-4.5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#0066cc] hover:shadow-md"
                      >
                        <span>Book Service</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* Bottom Callout Banner */}
        <Reveal delay={300} className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#1d1d1f] p-8 text-white shadow-2xl sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0066cc]/30 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#38bdf8]">
                  <Layers className="h-3.5 w-3.5" />
                  Custom Brand Package
                </span>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Need a tailored commercial or growth strategy?
                </h3>
                <p className="mt-2 text-sm text-white/70 sm:text-base">
                  We design custom video production and ad campaign packages tailored to your brand&rsquo;s goals and budget.
                </p>
              </div>

              <a
                href="#contact"
                className="shrink-0 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#1d1d1f] shadow-lg transition-all duration-300 hover:bg-[#0066cc] hover:text-white hover:shadow-2xl"
              >
                Request Free Consultation
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}