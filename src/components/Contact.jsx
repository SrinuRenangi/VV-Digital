import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, MapPin, MessageSquare, Phone, Sparkles } from 'lucide-react'

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

const SERVICE_OPTIONS = [
  'Brand Promotion',
  'Digital Marketing',
  'Photo & Video Production',
  'Video Editing & Post',
  'Full Creative Package',
]

const FIELD =
  'w-full rounded-2xl border border-black/10 bg-[#f5f5f7] px-4 py-3.5 text-sm font-medium text-[#1d1d1f] placeholder:text-[#86868b]/70 outline-none transition-all duration-200 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 sm:text-base'

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
      className="relative overflow-hidden border-t border-black/10 bg-[#f5f5f7]/60 py-10 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Left Column (Equal Height Match) */}
        <div className="flex flex-col justify-between lg:col-span-5 lg:h-full">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#86868b] shadow-xs">
                <Sparkles className="h-4 w-4 text-black" />
                Get In Touch
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 mb-4 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
                Let&rsquo;s build something exceptional.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-base leading-relaxed text-[#86868b] sm:text-lg">
                Tell us what you are building. We&rsquo;ll show you how we can help grow your brand.
              </p>
            </Reveal>
          </div>

          {/* Contact Cards Stack aligned to bottom */}
          <div className="mt-8 flex flex-col gap-4">
            <Reveal delay={240}>
              <a
                href="https://wa.me/919491002402"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4.5 transition-all duration-300 hover:border-black/30 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-white transition-colors duration-300 group-hover:bg-black">
                  <Phone className="h-5 w-5 text-white" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-medium text-[#86868b]">Direct Phone / WhatsApp</span>
                  <span className="text-base font-semibold text-[#1d1d1f]">+91 94910 02402</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-white">
                  <MapPin className="h-5 w-5 text-white" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-medium text-[#86868b]">Headquarters</span>
                  <span className="text-base font-semibold text-[#1d1d1f]">
                    Nellore, Andhra Pradesh, India
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Column (Equal Height Form Card Match) */}
        <div className="flex flex-col lg:col-span-7 lg:h-full">
          {submitted ? (
            <div className="flex flex-col justify-center h-full rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8 md:p-10">
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="h-14 w-14 text-green-500" />
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
              className="flex flex-col justify-between h-full rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8 md:p-10"
              onSubmit={handleFormSubmit}
            >
              <div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#86868b]">
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
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#86868b]">
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

                <div className="mt-5 flex flex-col sm:mt-6">
                  <label htmlFor="service" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#86868b]">
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

                <div className="mt-5 flex flex-col sm:mt-6">
                  <label htmlFor="details" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#86868b]">
                    Project Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    required
                    placeholder="Tell us about your brand, timeline, or goals..."
                    className={`${FIELD} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-black px-6 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#1d1d1f] active:scale-95 shadow-md sm:mt-8"
              >
                <MessageSquare className="h-4 w-4 text-white" />
                <span>Let&rsquo;s Connect</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}