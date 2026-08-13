import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'

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

/*
 * Prominent client roster. Logos are rendered as high-resolution inline SVG
 * vector badges (no rasterization → no pixelation at large 56px sizes).
 * Badge sits muted greyscale (bg #f5f5f7, dark text) and flips to the full
 * brand color (#0066cc / white) on hover.
 */
const CLIENTS = [
  { name: 'Srimannarayana College', initials: 'SC', category: 'Education' },
  { name: 'Amruthadhara Agencies', initials: 'AA', category: 'Distribution' },
  { name: 'Senthamizh Residency', initials: 'SR', category: 'Hospitality' },
  { name: 'SSV Junior College', initials: 'SSV', category: 'Education' },
  { name: 'KK Enterprises', initials: 'KK', category: 'Enterprise' },
  { name: 'IRIS Premium Water', initials: 'IW', category: 'Bottled Water' },
]

/* Large vector initial badge (w-14 = 56px). */
function LogoBadge({ client }) {
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 shrink-0" aria-hidden="true">
      <rect
        x="0"
        y="0"
        width="56"
        height="56"
        rx="16"
        fill="#f5f5f7"
        className="transition-colors duration-300 group-hover:fill-[#0066cc]"
      />
      <text
        x="28"
        y="38"
        textAnchor="middle"
        fontFamily="Inter, ui-sans-serif, sans-serif"
        fontWeight="700"
        fontSize={client.initials.length > 2 ? 19 : 23}
        fill="#1d1d1f"
        className="transition-colors duration-300 group-hover:fill-white"
      >
        {client.initials}
      </text>
    </svg>
  )
}

function ClientCard({ client }) {
  return (
    <div className="group flex min-w-[280px] cursor-pointer items-center gap-5 rounded-3xl border border-black/10 bg-white px-10 py-7 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-xl sm:min-w-[320px]">
      <LogoBadge client={client} />
      <div className="flex min-w-0 flex-col">
        <span className="whitespace-nowrap text-lg font-bold text-[#1d1d1f] sm:text-xl">
          {client.name}
        </span>
        <span className="mt-1 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#86868b]">
          <MapPin className="h-3 w-3" />
          {client.category}
        </span>
      </div>
    </div>
  )
}

export default function Clients() {
  return (
    <section
      id="clients"
      className="relative overflow-hidden border-y border-black/10 bg-[#f5f5f7]/60 py-24"
    >
      {/* Section Header */}
      <div className="mx-auto mb-14 flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:px-10 md:flex-row">
        <Reveal className="flex flex-col items-center gap-4 md:items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b]">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066cc] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0066cc]" />
            </span>
            Client Roster
          </span>
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl md:text-left">
            Trusted by growing regional brands.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-sm text-center text-sm text-[#86868b] sm:text-base md:text-right">
            Every client receives our team&rsquo;s direct focus and personal involvement.
          </p>
        </Reveal>
      </div>

      {/* Marquee Track */}
      <div className="marquee-mask w-full overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 pr-5 pause-on-hover">
          {[0, 1].map((half) => (
            <div key={half} aria-hidden={half === 1} className="flex items-center gap-5">
              {CLIENTS.map((client) => (
                <ClientCard key={client.name} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}