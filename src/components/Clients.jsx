import { useEffect, useRef, useState } from 'react'
import { ShieldCheck, Tag } from 'lucide-react'

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
      className={`transition-all duration-700 ease-out will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${className}`}
    >
      {children}
    </div>
  )
}

/*
 * Prominent client roster with transparent, enhanced brand logos.
 * Displayed in exact order requested by user:
 * 1. Sri Srinivasa Concept EM High School - Personal Branding
 * 2. SSV Junior College - Personal Branding
 * 3. Srivari Hospital - Personal Branding
 * 4. IRIS Premium Customised Label Water Bottle - Digital Marketing (Collab with GMS)
 * 5. KK Enterprises Authorised Distributor Oceana - Authorized Distributor Oceana
 * 6. QB Quality Beverages - Authorised Distributor Oceana
 * 7. DR Mobiles - Personal Branding
 * 8. Srimannarayana EM High School - Personal Branding
 */
const CLIENTS = [
  {
    id: 'sri-srinivasa',
    name: 'Sri Srinivasa Concept EM High School',
    subtitle: 'Concept EM Education',
    category: 'Personal Branding',
    logo: '/logos/sri-srinivasa-school.png',
    alt: 'Sri Srinivasa Concept EM High School Logo',
  },
  {
    id: 'ssv-college',
    name: 'SSV Junior College',
    subtitle: 'Higher Education & Academy',
    category: 'Personal Branding',
    logo: '/logos/ssv-junior-college.png',
    alt: 'SSV Junior College Logo',
  },
  {
    id: 'srivari-hospital',
    name: 'Srivari Hospital',
    subtitle: 'Multispecialty Healthcare',
    category: 'Personal Branding',
    logo: '/logos/srivari-hospital.png',
    alt: 'Srivari Hospital Logo',
  },
  {
    id: 'iris-premium',
    name: 'IRIS Premium',
    subtitle: 'Customised Label Water Bottle',
    category: 'Digital Marketing (Collab with GMS)',
    logo: '/logos/iris-premium-water.png',
    alt: 'IRIS Premium Water Logo',
  },
  {
    id: 'kk-enterprises',
    name: 'KK Enterprises',
    subtitle: 'Authorised Distributor Oceana',
    category: 'Authorized Distributor Oceana',
    logo: '/logos/kk-enterprises.png',
    alt: 'KK Enterprises Logo',
  },
  {
    id: 'qb-quality-beverages',
    name: 'QB Quality Beverages',
    subtitle: 'Promise of Purity',
    category: 'Authorized Distributor Oceana',
    logo: '/logos/qb-quality-beverages.png',
    alt: 'QB Quality Beverages Logo',
  },
  {
    id: 'dr-mobiles',
    name: 'DR Mobiles',
    subtitle: 'Mobile Sales & Services',
    category: 'Personal Branding',
    logo: '/logos/dr-mobiles.png',
    alt: 'DR Mobiles Logo',
  },
  {
    id: 'srimannarayana-school',
    name: 'Srimannarayana EM High School',
    subtitle: 'Atmakur - SPSR Nellore Dist',
    category: 'Personal Branding',
    logo: '/logos/srimannarayana-school.png',
    alt: 'Srimannarayana EM High School Logo',
  },
]

function ClientCard({ client }) {
  return (
    <div className="group relative flex min-w-[300px] cursor-pointer items-center gap-5 rounded-3xl border border-black/10 bg-white/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0066cc]/30 hover:bg-white hover:shadow-xl sm:min-w-[350px] sm:p-6">
      {/* Enhanced Logo Container with Transparent Background */}
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-[#f8f9fa] p-2 transition-all duration-300 group-hover:border-[#0066cc]/20 group-hover:bg-white group-hover:shadow-md sm:h-22 sm:w-22">
        <img
          src={client.logo}
          alt={client.alt}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-108"
          loading="lazy"
        />
      </div>

      {/* Client Information */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="truncate text-base font-bold text-[#1d1d1f] transition-colors duration-200 group-hover:text-[#0066cc] sm:text-lg">
          {client.name}
        </span>
        {client.subtitle && (
          <span className="truncate text-xs font-medium text-[#86868b] sm:text-sm">
            {client.subtitle}
          </span>
        )}
        <div className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full border border-[#0066cc]/20 bg-[#0066cc]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#0066cc]">
          <Tag className="h-3 w-3 shrink-0" />
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
      className="relative overflow-hidden border-y border-black/10 bg-gradient-to-b from-[#f5f5f7]/80 via-white to-[#f5f5f7]/60 py-24"
    >
      {/* Background Accent Blur */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#0066cc]/5 blur-3xl" />

      {/* Section Header */}
      <div className="mx-auto mb-16 flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:px-10 md:flex-row">
        <Reveal className="flex flex-col items-center gap-4 md:items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b] shadow-xs">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066cc] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0066cc]" />
            </span>
            Client Roster
          </span>
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl md:text-left">
            Trusted by growing regional brands.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-md text-center text-sm leading-relaxed text-[#86868b] sm:text-base md:text-right">
            Every client receives our team&rsquo;s direct focus, custom content strategy, and personal brand development.
          </p>
        </Reveal>
      </div>

      {/* Interactive Marquee Track */}
      <div className="marquee-mask w-full overflow-hidden py-2">
        <div className="flex w-max animate-marquee gap-6 pr-6 pause-on-hover">
          {[0, 1].map((half) => (
            <div key={half} aria-hidden={half === 1} className="flex items-center gap-6">
              {CLIENTS.map((client) => (
                <ClientCard key={`${half}-${client.id}`} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Grid Showcase Below Marquee for Full Visibility of All 8 Brands */}
      {/* <div className="mx-auto mt-16 max-w-6xl px-6 sm:px-10">
        <Reveal delay={200}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {CLIENTS.map((client) => (
              <div
                key={`grid-${client.id}`}
                className="group flex flex-col items-center justify-between rounded-2xl border border-black/10 bg-white p-5 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0066cc]/30 hover:shadow-lg"
              >
                <div className="flex h-24 w-full items-center justify-center p-2">
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex flex-col items-center">
                  <h3 className="line-clamp-2 text-sm font-bold text-[#1d1d1f] transition-colors duration-200 group-hover:text-[#0066cc]">
                    {client.name}
                  </h3>
                  <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-[#0066cc]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#0066cc]">
                    <ShieldCheck className="h-3 w-3" />
                    {client.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div> */}
    </section>
  )
}