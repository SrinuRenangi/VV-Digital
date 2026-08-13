import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, MapPin, MessageSquare, Phone, Send, Sparkles } from 'lucide-react'

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
      className={`transition-all duration-700 ease-out will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${className}`}
    >
      {children}
    </div>
  )
}

/* --- Custom brand SVG icons --- */
function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function TelegramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function SocialButton({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white text-[#1d1d1f] transition-all duration-300 hover:scale-105 hover:text-[#0066cc] hover:shadow-md"
    >
      {children}
    </a>
  )
}

const SERVICE_OPTIONS = [
  'Brand Promotion',
  'Digital Marketing',
  'Photo & Video Production',
  'Video Editing & Post',
  'Full Creative Package',
]

const FIELD =
  'w-full rounded-2xl border border-black/10 bg-[#f5f5f7] px-4 py-3 text-[#1d1d1f] placeholder:text-[#86868b]/70 outline-none transition-all duration-200 focus:border-[#0066cc] focus:bg-white focus:ring-2 focus:ring-[#0066cc]/20'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') || ''
    const phone = formData.get('phone') || ''
    const service = formData.get('service') || ''
    const details = formData.get('details') || ''

    // Format WhatsApp message
    const messageText = `*New Inquiry from VV Digitals Website*\n\n📌 *Name:* ${name}\n📞 *Phone:* ${phone}\n🎯 *Service Required:* ${service}\n📝 *Project Details:* ${details}`

    const whatsappUrl = `https://wa.me/919491002402?text=${encodeURIComponent(messageText)}`

    // Open WhatsApp URL in a new tab
    window.open(whatsappUrl, '_blank')
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-black/10 bg-[#f5f5f7]/60"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 py-24 sm:px-10 sm:py-28 lg:grid-cols-12 lg:gap-16">
        {/* Left Column */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b]">
              <Sparkles className="h-4 w-4 text-[#0066cc]" />
              Get In Touch
            </span>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-6 mb-6">
              <h2 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
                Let&rsquo;s build something exceptional.
              </h2>
              <div className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4.5 py-2.5 shadow-xs transition-all duration-300 hover:scale-105 hover:shadow-md">
                <img
                  src="/vv-digitals-logo-stacked-black.svg"
                  alt="VV Digitals"
                  className="h-9 w-auto shrink-0"
                  loading="eager"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-base leading-relaxed text-[#86868b] sm:text-lg">
              Tell us what you are building. We&rsquo;ll show you how we can help grow your brand.
            </p>
          </Reveal>

          {/* Contact Cards Stack */}
          <div className="mt-8 flex flex-col gap-4">
            <Reveal delay={240}>
              <a
                href="https://wa.me/919491002402"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4 transition-all duration-300 hover:border-[#25D366]/40 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1d1d1f] text-white transition-colors duration-300 group-hover:bg-[#25D366]">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-[#86868b]">Direct Phone / WhatsApp</span>
                  <span className="text-base font-semibold text-[#1d1d1f]">+91 94910 02402</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1d1d1f] text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-[#86868b]">Headquarters</span>
                  <span className="text-base font-semibold text-[#1d1d1f]">
                    Nellore, Andhra Pradesh, India
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Social Links Row */}
          <div className="mt-8">
            <Reveal delay={400}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                Connect With Us
              </p>
            </Reveal>
            <Reveal delay={460}>
              <div className="flex items-center gap-3">
                <SocialButton href="https://instagram.com" label="Instagram">
                  <InstagramIcon className="h-5 w-5" />
                </SocialButton>
                <SocialButton href="https://x.com" label="X (Twitter)">
                  <XIcon className="h-4 w-4" />
                </SocialButton>
                <SocialButton href="https://t.me" label="Telegram">
                  <TelegramIcon className="h-5 w-5" />
                </SocialButton>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm sm:p-10">
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="h-14 w-14 text-[#0066cc]" />
                <h3 className="mt-5 text-2xl font-semibold text-[#1d1d1f]">Inquiry Sent via WhatsApp</h3>
                <p className="mt-2 leading-relaxed text-[#86868b]">
                  Thank you for reaching out! Your project details have been sent directly to WhatsApp (<b>+91 94910 02402</b>). Renangi Vishnu Vardhan and the VV Digitals team will reply shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-[#f5f5f7] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1d1d1f] hover:bg-black hover:text-white transition-colors duration-200"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form
              className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm sm:p-10"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-[#86868b]">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-[#86868b]">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 94910 02402"
                    className={FIELD}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="service" className="mb-1.5 block text-xs font-medium text-[#86868b]">
                  Service Required
                </label>
                <select id="service" name="service" className={FIELD} defaultValue={SERVICE_OPTIONS[0]}>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="details" className="mb-1.5 block text-xs font-medium text-[#86868b]">
                  Project Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  required
                  placeholder="Tell us about your brand, timeline, or goals..."
                  className={`${FIELD} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1d1d1f] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#0066cc] active:scale-95 shadow-md"
              >
                <MessageSquare className="h-4 w-4 text-[#25D366]" />
                Let's Connect
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 sm:flex-row sm:px-10">
          <p className="text-center text-sm text-[#86868b]">
            &copy; 2026 VV Digitals. All rights reserved.
          </p>
          <p className="text-center text-sm text-[#86868b]">
            Founded by Renangi Vishnu Vardhan &bull; Nellore, AP &bull; +91 94910 02402
          </p>
        </div>
      </div>
    </section>
  )
}