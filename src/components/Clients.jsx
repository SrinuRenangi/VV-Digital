import { Sparkles, Tag } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

/* Authentic Regional Client Data provided by user */
const CLIENTS = [
  {
    id: 'ssv-junior-college',
    name: 'SSV Junior College',
    subtitle: 'Ashok Kumar Reddy',
    logo: '/logos/ssv-junior-college.png',
    category: 'Personal Branding',
  },
  {
    id: 'sri-srinivasa-school',
    name: 'Sri Srinivasa Concept EM High School',
    subtitle: 'Ashok Kumar Reddy',
    logo: '/logos/sri-srinivasa-school.png',
    category: 'Personal Branding',
  },
  {
    id: 'srivari-hospital',
    name: 'Srivari Hospital',
    subtitle: 'Dr. Krishna Prasad',
    logo: '/logos/srivari-hospital.png',
    category: 'Personal Branding',
  },
  {
    id: 'dr-mobiles',
    name: 'DR Mobiles',
    subtitle: 'Ramesh',
    logo: '/logos/dr-mobiles.png',
    category: 'Personal Branding',
  },
  {
    id: 'iris-premium-water',
    name: 'IRIS Premium Water',
    subtitle: 'Customised Label Water Bottle',
    logo: '/logos/iris-premium-water.png',
    category: 'Digital Marketing',
  },
  {
    id: 'kk-enterprises',
    name: 'KK Enterprises',
    subtitle: 'Oceana Authorized Distributor',
    logo: '/logos/kk-enterprises.png',
    category: 'Distribution Partner',
  },
  {
    id: 'qb-quality-beverages',
    name: 'QB Quality Beverages',
    subtitle: 'Authorized Regional Distributor',
    logo: '/logos/qb-quality-beverages.png',
    category: 'Authorized Distributor',
  },
  {
    id: 'srimannarayana-school',
    name: 'Srimannarayana EM High School',
    subtitle: 'Institutional Brand Partner',
    logo: '/logos/srimannarayana-school.png',
    category: 'Personal Branding',
  },
]

function ClientCard({ client }) {
  return (
    <div className="group relative flex h-full min-w-[280px] max-w-[340px] flex-col items-start gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:shadow-xl sm:min-w-[320px] sm:p-7">
      {/* Brand Logo Container */}
      <div className="flex h-16 w-full items-center justify-center rounded-2xl border border-black/5 bg-[#f8f9fa] p-3 transition-colors duration-200 group-hover:border-black/20 group-hover:bg-white">
        <img
          src={client.logo}
          alt={`${client.name} Logo`}
          className="max-h-full max-w-full object-contain filter transition-all duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Brand Info & Metadata */}
      <div className="flex w-full flex-col gap-1">
        <h3 className="line-clamp-1 text-base font-bold text-[#1d1d1f] group-hover:text-black transition-colors duration-200 sm:text-lg">
          {client.name}
        </h3>
        {client.subtitle && (
          <span className="truncate text-xs font-medium text-[#86868b] sm:text-sm">
            {client.subtitle}
          </span>
        )}
        <div className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full border border-black/10 bg-[#f5f5f7] px-2.5 py-0.5 text-[11px] font-semibold text-[#1d1d1f]">
          <Tag className="h-3 w-3 shrink-0 text-black" />
          <span className="truncate">{client.category}</span>
        </div>
      </div>
    </div>
  )
}

export default function Clients() {
  return (
    <section
      id="clients"
      className="relative overflow-hidden border-y border-black/10 bg-white py-10 sm:py-16 lg:py-20"
    >
      {/* Section Header */}
      <div className="mx-auto mb-10 flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:mb-16 sm:px-10 md:flex-row">
        <Reveal className="flex flex-col items-center gap-4 md:items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f5f5f7] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#1d1d1f] shadow-xs">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
            </span>
            Proven Client Roster
          </span>
          <h2 className="text-center text-4xl font-extrabold tracking-tight text-[#1d1d1f] sm:text-left sm:text-6xl">
            Trusted by leaders.
          </h2>
        </Reveal>

        <Reveal delay={100} className="max-w-md text-center md:text-left">
          <p className="flex flex-col gap-1 text-sm font-medium leading-relaxed text-[#86868b] sm:text-base md:text-lg">
            <span className="block whitespace-nowrap">High-impact video production,</span>
            <span className="block whitespace-nowrap">custom content strategy, and</span>
            <span className="block whitespace-nowrap">personal brand development.</span>
          </p>
        </Reveal>
      </div>

      {/* Interactive Marquee Track */}
      <div className="marquee-mask w-full overflow-hidden py-2">
        <div className="flex w-max animate-marquee-reverse gap-6 pr-6 pause-on-hover">
          {[0, 1].map((half) => (
            <div key={half} aria-hidden={half === 1} className="flex items-center gap-6">
              {CLIENTS.map((client) => (
                <ClientCard key={`${half}-${client.id}`} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}