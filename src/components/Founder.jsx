import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Calendar, MapPin, Phone, Sparkles } from 'lucide-react'

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

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden border-y border-black/10 bg-[#f5f5f7]/60 py-24 sm:py-32"
    >
      {/* Background Layer: top-right radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-40 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-[#0066cc]/8 to-transparent blur-[100px]"
      />

      {/* Inner Wrapper */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        {/* Eyebrow Badge */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#0066cc]" />
            Leadership
          </span>
        </Reveal>

        {/* Main Executive Card */}
        <Reveal delay={120}>
          <div className="group mt-8 rounded-3xl border border-black/10 bg-white p-8 shadow-xs transition-all duration-500 hover:border-black/15 hover:shadow-xl sm:rounded-[32px] sm:p-12 md:p-16">
            {/* Inner Grid */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left Column */}
              <div className="lg:col-span-5">
                {/* Photo Frame: inline SVG clip-path mask + fallback monogram */}
                <div className="relative inline-block">
                  <div className="relative h-40 w-40 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d1d1f] to-[#2c2c2e] p-1 shadow-xl transition-transform duration-500 group-hover:scale-[1.02] sm:h-48 sm:w-48">
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 176 176"
                      role="img"
                      aria-label="Renangi Vishnu Vardhan — Founder & Creative Director"
                    >
                      <defs>
                        <linearGradient id="founderBg" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#2c2c2e" />
                          <stop offset="100%" stopColor="#1d1d1f" />
                        </linearGradient>
                        <clipPath id="founderClip">
                          <rect x="0" y="0" width="176" height="176" rx="20" />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#founderClip)">
                        <rect width="176" height="176" fill="url(#founderBg)" />
                        <circle cx="150" cy="26" r="86" fill="#0066cc" opacity="0.18" />
                        <circle cx="20" cy="150" r="70" fill="#0066cc" opacity="0.1" />
                        <text
                          x="88"
                          y="106"
                          textAnchor="middle"
                          fontFamily="Inter, ui-sans-serif, sans-serif"
                          fontWeight="800"
                          fontSize="52"
                          letterSpacing="3"
                          fill="#ffffff"
                        >
                          RVV
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Floating FOUNDER badge */}
                  <span className="absolute -bottom-3 left-4 rounded-full bg-[#0066cc] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg">
                    Founder
                  </span>
                </div>

                {/* Title & Role */}
                <h3 className="mt-10 text-2xl font-semibold text-[#1d1d1f] sm:text-3xl">
                  Renangi Vishnu Vardhan
                </h3>
                <p className="mt-1 mb-6 text-[#86868b]">Founder &amp; Creative Director</p>

                {/* Meta Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-[#1d1d1f]">
                    <MapPin className="h-3.5 w-3.5 text-[#0066cc]" />
                    Nellore, Andhra Pradesh
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-[#1d1d1f]">
                    <Calendar className="h-3.5 w-3.5 text-[#0066cc]" />
                    Est. 2025
                  </span>
                </div>
              </div>
              {/* Right Column */}
              <div className="lg:col-span-7">
                <blockquote className="border-l-2 border-[#0066cc] pl-5 text-xl font-normal leading-relaxed text-[#1d1d1f] sm:pl-6 sm:text-2xl">
                  Every business has a story worth telling. My goal with VV Digitals is to give
                  brands the visual polish and marketing horsepower they need to stand alongside
                  industry leaders.
                </blockquote>

                <p className="mt-6 mb-8 text-base leading-relaxed text-[#86868b] sm:text-lg">
                  Steering VV Digitals from Nellore, Vishnu Vardhan combines hands-on creative
                  execution with performance-oriented campaign strategies.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="tel:+916309016428"
                    className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] active:scale-95"
                  >
                    <Phone className="h-4 w-4 text-[#0066cc]" />
                    Call +91 63090 16428
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#F5F5F7] px-6 py-3.5 text-sm font-medium text-[#1d1d1f] transition-all duration-300 hover:scale-[1.03] active:scale-95"
                  >
                    Schedule a Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}