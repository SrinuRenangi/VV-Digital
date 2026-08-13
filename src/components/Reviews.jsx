import { useEffect, useRef, useState } from 'react'
import { Sparkles, Star } from 'lucide-react'

/* Scroll-reveal hook: fires once when the element enters the viewport. */
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

const REVIEWS = [
  {
    quote:
      'VV Digitals completely transformed our brand presence in Nellore. The 4K video quality and social campaigns boosted our enrollment inquiries significantly.',
    name: 'Srimannarayana College',
    role: 'Institution Lead',
  },
  {
    quote:
      'Professional, fast, and transparent. They delivered custom commercial videos that looked like national ad campaigns within days.',
    name: 'Amruthadhara Agencies',
    role: 'Managing Partner',
  },
  {
    quote:
      'The team understands storytelling and digital targeting better than any regional agency we\u2019ve worked with. Highly recommended!',
    name: 'Senthamizh Residency',
    role: 'General Manager',
  },
]

function ReviewCard({ review, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group flex h-full flex-col rounded-3xl border border-black/10 bg-[#f5f5f7] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-black/15 hover:shadow-lg">
        {/* Rating stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#0066cc] text-[#0066cc]" />
          ))}
        </div>

        {/* Quote */}
        <p className="mt-5 flex-1 text-base leading-relaxed text-[#1d1d1f]/80">
          &ldquo;{review.quote}&rdquo;
        </p>

        {/* Author metadata */}
        <div className="mt-6 border-t border-black/10 pt-5">
          <p className="font-semibold text-[#1D1D1F]">{review.name}</p>
          <p className="mt-0.5 text-xs text-[#86868b]">{review.role}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="mx-auto max-w-6xl border-t border-black/10 px-6 py-24 sm:px-10 sm:py-32"
    >
      {/* Eyebrow Badge */}
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b]">
          <Sparkles className="h-4 w-4 text-[#0066cc]" />
          Client Feedback
        </span>
      </Reveal>

      {/* Section Header */}
      <Reveal delay={100}>
        <h2 className="mt-6 mb-4 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-6xl">
          What our partners say.
        </h2>
      </Reveal>
      <Reveal delay={180}>
        <p className="mb-16 text-lg font-normal text-[#86868b]">
          Real feedback from regional business owners, institution leads, and brand directors.
        </p>
      </Reveal>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {REVIEWS.map((review, i) => (
          <ReviewCard key={review.name} review={review} delay={i * 120} />
        ))}
      </div>
    </section>
  )
}