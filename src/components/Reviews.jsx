import { useEffect, useRef, useState } from 'react'
import { Quote, Sparkles, Star, Tag } from 'lucide-react'

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

/* Client Reviews Data featuring client details requested by user */
const REVIEWS = [
  {
    id: 'ssv-college',
    quote:
      'VV Digitals completely transformed SSV Junior College’s brand reputation in the region. Their 4K commercial direction and targeted social campaigns delivered exceptional enrollment growth.',
    name: 'Ashok Kumar Reddy',
    role: 'Chairman & Correspondent',
    clientName: 'SSV Junior College',
    logo: '/logos/ssv-junior-college.png',
    category: 'Personal Branding',
    rating: 5,
  },
  {
    id: 'sri-srinivasa-school',
    quote:
      'The video production and brand strategy from VV Digitals brought Sri Srinivasa Concept EM High School into the spotlight. Their cinematic storytelling resonated deeply with parents.',
    name: 'Ashok Kumar Reddy',
    role: 'Founder & Director',
    clientName: 'Sri Srinivasa Concept EM High School',
    logo: '/logos/sri-srinivasa-school.png',
    category: 'Personal Branding',
    rating: 5,
  },
  {
    id: 'srivari-hospital',
    quote:
      'Building patient trust requires authentic, professional storytelling. VV Digitals created high-impact healthcare commercials that communicated our hospital services clearly.',
    name: 'Krishna Prasad',
    role: 'Managing Director & Lead Specialist',
    clientName: 'Srivari Hospital',
    logo: '/logos/srivari-hospital.png',
    category: 'Personal Branding',
    rating: 5,
  },
  {
    id: 'dr-mobiles',
    quote:
      'Their promotional video edits and hyper-local ad strategies boosted our store footfalls immensely. VV Digitals understands digital marketing better than any agency in Nellore.',
    name: 'Ramesh',
    role: 'Founder & Managing Director',
    clientName: 'DR Mobiles',
    logo: '/logos/dr-mobiles.png',
    category: 'Personal Branding',
    rating: 5,
  },
  {
    id: 'iris-premium',
    quote:
      'The customised label water bottle ad campaigns delivered fantastic brand reach. VV Digitals executed our joint digital marketing strategy with remarkable speed and precision.',
    name: 'GMS & Operations Lead',
    role: 'Brand Operations Lead',
    clientName: 'IRIS Premium Water',
    logo: '/logos/iris-premium-water.png',
    category: 'Digital Marketing',
    rating: 5,
  },
  {
    id: 'kk-enterprises',
    quote:
      'As authorized distributors of Oceana, market presence is key. VV Digitals crafted commercial videos and targeted campaigns that significantly boosted distributor inquiries.',
    name: 'Distribution Lead',
    role: 'Managing Partner',
    clientName: 'KK Enterprises',
    logo: '/logos/kk-enterprises.png',
    category: 'Distribution Partner',
    rating: 5,
  },
  {
    id: 'qb-beverages',
    quote:
      'Outstanding commitment to quality! VV Digitals helped establish Quality Beverages as a trusted regional brand through crisp video commercials and social outreach.',
    name: 'Quality Beverages Team',
    role: 'Operations Lead',
    clientName: 'QB Quality Beverages',
    logo: '/logos/qb-quality-beverages.png',
    category: 'Authorized Distributor',
    rating: 5,
  },
  {
    id: 'srimannarayana-school',
    quote:
      'From event coverage to institutional ad shoots, VV Digitals delivered world-class video production that elevated our school’s brand authority across SPSR Nellore District.',
    name: 'School Management',
    role: 'Correspondent',
    clientName: 'Srimannarayana EM High School',
    logo: '/logos/srimannarayana-school.png',
    category: 'Personal Branding',
    rating: 5,
  },
]

function ReviewCard({ review }) {
  return (
    <div className="group relative flex h-full min-w-[340px] max-w-[420px] flex-col justify-between rounded-3xl border border-black/10 bg-white p-7 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0066cc]/30 hover:shadow-xl sm:min-w-[380px] sm:p-8">
      {/* Top Header: Rating Stars & Category Pill */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#0066cc] text-[#0066cc]" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#0066cc]/20 bg-[#0066cc]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0066cc]">
            <Tag className="h-3 w-3" />
            {review.category}
          </span>
        </div>

        {/* Quote */}
        <div className="relative mt-6">
          <Quote className="absolute -left-2 -top-3 h-8 w-8 text-[#0066cc]/10" />
          <p className="relative z-10 text-sm leading-relaxed text-[#1d1d1f]/85 sm:text-base">
            &ldquo;{review.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Author & Client Metadata Footer */}
      <div className="mt-8 flex items-center gap-4 border-t border-black/10 pt-5">
        {/* Client Logo Avatar */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-[#f8f9fa] p-1.5 transition-colors duration-200 group-hover:border-[#0066cc]/20 group-hover:bg-white">
          <img
            src={review.logo}
            alt={review.clientName}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-base font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors duration-200">
            {review.name}
          </p>
          <p className="truncate text-xs font-semibold text-[#1d1d1f]/75">
            {review.clientName}
          </p>
          <p className="truncate text-[11px] font-medium text-[#86868b]">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-black/10 bg-gradient-to-b from-white via-[#f5f5f7]/60 to-white py-24 sm:py-32"
    >
      {/* Ambient Radial Background Blur */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#0066cc]/5 blur-3xl" />

      {/* Section Header */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#0066cc]" />
            Client Feedback & Testimonials
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[#1d1d1f] sm:text-6xl">
            What our partners say.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-4 max-w-2xl text-base text-[#86868b] sm:text-lg">
            Real feedback from regional business owners, institution leads, doctors, and brand directors.
          </p>
        </Reveal>
      </div>

      {/* Infinite Horizontal Marquee Track for Client Reviews */}
      <div className="marquee-mask mt-16 w-full overflow-hidden py-4">
        <div className="flex w-max animate-marquee gap-6 pr-6 pause-on-hover">
          {[0, 1].map((half) => (
            <div key={half} aria-hidden={half === 1} className="flex items-center gap-6">
              {REVIEWS.map((review) => (
                <ReviewCard key={`${half}-${review.id}`} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}