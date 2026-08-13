import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Camera,
  CheckCircle2,
  ChevronRight,
  Megaphone,
  Scissors,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

/* Scroll-reveal hook for header elements */
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
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const isClickingRef = useRef(false)

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  // Handle clicking left-menu item: smooth scrolls window forward or reverse to trigger sticky stacking/unstacking animation
  const handleSelectService = (index) => {
    const targetService = SERVICES_DATA[index]
    setActiveCardIndex(index)
    setExpandedId(targetService.id)
    isClickingRef.current = true

    if (sectionRef.current) {
      const sectionRect = sectionRef.current.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const sectionTop = sectionRect.top + scrollTop

      // Absolute Y position calculation for both forward and reverse navigation
      const cardHeightSpacing = 460
      const targetY = sectionTop + 140 + index * cardHeightSpacing

      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
    }

    setTimeout(() => {
      isClickingRef.current = false
    }, 850)
  }

  // Passive scroll sync: highlights left-menu item as user scrolls up or down through sticky cards
  useEffect(() => {
    const handleScrollSync = () => {
      if (isClickingRef.current || !cardRefs.current.length) return
      
      for (let i = cardRefs.current.length - 1; i >= 0; i--) {
        const el = cardRefs.current[i]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const stickyTopPx = 112 + i * 32
        
        if (rect.top <= stickyTopPx + 80) {
          setActiveCardIndex(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScrollSync, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollSync)
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative border-t border-black/10 bg-white py-10 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* 50/50 Split Grid Container */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column (50% Sticky Text & Navigation Header) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start lg:py-4">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f5f5f7] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#1d1d1f] shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-black" />
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
                      className={`group flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-xs font-bold transition-all duration-300 ${
                        activeCardIndex === idx
                          ? 'border-black bg-black text-white shadow-lg scale-[1.02]'
                          : 'border-black/10 bg-white text-[#86868b] hover:border-black/30 hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs opacity-75">{service.num}</span>
                        <span className="truncate text-sm font-semibold">{service.title}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeCardIndex === idx ? 'translate-x-1 text-white' : 'opacity-40'
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
                  className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#1d1d1f] hover:scale-[1.03] active:scale-95"
                >
                  <span>Explore Custom Package</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column (50% Sticky Stacking Cards Column) */}
          <div className="relative flex flex-col gap-8 pb-12 lg:col-span-7">
            {SERVICES_DATA.map((service, idx) => {
              const IconComponent = service.icon
              const isExpanded = expandedId === service.id

              // Dynamic sticky top offset so cards pop up and stack smoothly over each other
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
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-8 backdrop-blur-xl transition-all duration-500 cursor-pointer sm:p-10 ${
                      activeCardIndex === idx || isExpanded
                        ? 'border-black shadow-2xl ring-1 ring-black/10 -translate-y-1'
                        : 'border-black/10 shadow-[0_-10px_30px_rgba(0,0,0,0.06),0_15px_40px_rgba(0,0,0,0.08)] hover:border-black/30 hover:shadow-xl'
                    }`}
                  >
                    {/* Card Header */}
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/10 bg-[#f5f5f7] text-[#1d1d1f] transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:shadow-md">
                          <IconComponent className="h-7 w-7" />
                        </div>
                        <span className="font-mono text-base font-extrabold tracking-wider text-[#86868b]">
                          {service.num}
                        </span>
                      </div>

                      {/* Category & Stat Badges (Strict Monochrome Black & White) */}
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#f5f5f7] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1d1d1f]">
                          <Zap className="h-3 w-3 text-black" />
                          {service.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1 text-[11px] font-semibold text-[#1d1d1f]">
                          <BarChart3 className="h-3 w-3 text-black" />
                          {service.stat}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#1d1d1f] transition-colors duration-200 group-hover:text-black sm:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#86868b] sm:text-base">
                        {service.tagline}
                      </p>

                      {/* Core Highlights List */}
                      <div className="mt-6 border-t border-black/10 pt-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                          Core Capabilities
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {service.highlights.map((item) => (
                            <li key={item} className="flex items-center gap-2.5">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-black" />
                              <span className="text-xs font-medium text-[#1d1d1f]/90 sm:text-sm">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expandable Deliverables Drawer */}
                      {isExpanded && (
                        <div className="mt-6 rounded-2xl border border-black/10 bg-[#f5f5f7] p-5 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                            Deliverables &amp; Scope
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {service.deliverables.map((deliv) => (
                              <span
                                key={deliv}
                                className="inline-flex items-center rounded-lg border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-[#1d1d1f] shadow-2xs"
                              >
                                {deliv}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-xs leading-relaxed text-[#86868b]">
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
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black hover:underline"
                      >
                        <span>{isExpanded ? 'Hide Scope' : 'View Deliverables'}</span>
                        <ChevronRight
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${
                            isExpanded ? 'rotate-90 text-black' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}