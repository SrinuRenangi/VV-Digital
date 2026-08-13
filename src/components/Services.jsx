import { useEffect, useRef, useState } from 'react'
import { Camera, Check, Megaphone, Scissors, TrendingUp } from 'lucide-react'

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

const CARDS = [
  {
    num: '01',
    span: 'md:col-span-7',
    dark: true,
    icon: Camera,
    title: 'Photo & Video Production',
    items: ['4K Cinema', 'Commercial Direction', 'Product Photography'],
  },
  {
    num: '02',
    span: 'md:col-span-5',
    dark: false,
    icon: TrendingUp,
    title: 'Digital Marketing',
    items: ['Meta & Google Ads', 'Audience Targeting', 'Growth'],
  },
  {
    num: '03',
    span: 'md:col-span-5',
    dark: false,
    icon: Megaphone,
    title: 'Brand Promotion',
    items: ['Launch Strategy', 'Identity', 'Positioning'],
  },
  {
    num: '04',
    span: 'md:col-span-7',
    dark: true,
    icon: Scissors,
    title: 'Video Editing & Post',
    items: ['Pacing', 'Color Grading', 'Motion Graphics'],
  },
]

function BentoCard({ card }) {
  const dark = card.dark
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-10 ${
        dark ? 'bg-[#1d1d1f] text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'
      }`}
    >
      {/* Card number watermark */}
      <span
        className={`absolute right-6 top-6 text-sm font-black tracking-tight ${
          dark ? 'text-white/20' : 'text-black/10'
        }`}
      >
        {card.num}
      </span>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${
          dark
            ? 'bg-white/10 text-white group-hover:bg-[#0066cc]'
            : 'bg-white text-black group-hover:bg-[#0066cc] group-hover:text-white'
        }`}
      >
        <card.icon className="h-6 w-6" />
      </div>

      <h3 className="mt-8 text-xl font-bold uppercase tracking-tight sm:text-2xl">{card.title}</h3>
      <p
        className={`mt-2 text-[11px] font-semibold uppercase tracking-widest ${
          dark ? 'text-white/50' : 'text-[#86868b]'
        }`}
      >
        Capabilities
      </p>

      <ul className="mt-4 space-y-2.5">
        {card.items.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <Check className="h-4 w-4 shrink-0 text-[#0066cc]" />
            <span className={`text-sm sm:text-base ${dark ? 'text-white/85' : 'text-[#1d1d1f]/80'}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-6xl border-t border-black/10 px-6 py-24 sm:px-10 sm:py-32"
    >
      {/* Header */}
      <Reveal>
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-[#86868b]">
          What We Do
        </p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mb-16 text-4xl font-black uppercase tracking-tight text-[#1d1d1f] sm:text-7xl">
          End-to-End Brand Building.
        </h2>
      </Reveal>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {CARDS.map((card, i) => (
          <Reveal key={card.num} delay={i * 90} className={card.span}>
            <BentoCard card={card} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}