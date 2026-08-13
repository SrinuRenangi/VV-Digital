import { ArrowUp, MapPin, Phone } from 'lucide-react'

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
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-[#f5f5f7] text-[#1d1d1f] transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white hover:shadow-sm"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-black/10 bg-white text-[#1d1d1f]">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-8 sm:px-10 sm:pt-12 sm:pb-12">
        {/* Main 4-Column Links Grid */}
        <div className="grid grid-cols-1 gap-10 py-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Col 1: Brand Raw SVG Logo & Tagline */}
          <div className="lg:col-span-4">
            <img
              src="/vv-digitals-logo-stacked-black.svg"
              alt="VV Digitals Logo"
              className="h-11 w-auto shrink-0 transition-transform duration-300 hover:scale-105 sm:h-12"
              loading="eager"
            />
            <p className="mt-4 text-sm font-semibold tracking-tight text-[#1d1d1f]">
              Clear Brands. Automated Growth. Engineered in Nellore.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#86868b]">
              Full-service cinema video production, photography, and data-driven ad campaign marketing for ambitious regional brands.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#86868b]">
              <MapPin className="h-4 w-4 text-black" />
              <span>Nellore, Andhra Pradesh, India</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-black">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              <li>
                <a href="#home" className="text-[#86868b] transition-colors duration-200 hover:text-black">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#86868b] transition-colors duration-200 hover:text-black">
                  About Studio
                </a>
              </li>
              <li>
                <a href="#founder" className="text-[#86868b] transition-colors duration-200 hover:text-black">
                  Leadership &amp; Founder
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#86868b] transition-colors duration-200 hover:text-black">
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#clients" className="text-[#86868b] transition-colors duration-200 hover:text-black">
                  Client Roster
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#86868b] transition-colors duration-200 hover:text-black">
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Scope */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-black">
              Capabilities
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-[#86868b]">
              <li>Photo &amp; Video Production</li>
              <li>Digital Marketing &amp; Meta Ads</li>
              <li>Brand Promotion &amp; Identity</li>
              <li>Video Editing &amp; Post-Production</li>
              <li>Personal Branding Programs</li>
            </ul>
          </div>

          {/* Col 4: Direct Contact & Connect */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-widest text-black">
              Direct Contact
            </p>
            <a
              href="tel:+919491002402"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1d1d1f] transition-colors duration-200 hover:text-black"
            >
              <Phone className="h-4 w-4 text-black" />
              <span>+91 94910 02402</span>
            </a>

            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-black">
              Social Links
            </p>
            <div className="mt-3 flex items-center gap-3">
              <SocialLink href="https://instagram.com" label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://x.com" label="X (Twitter)">
                <XIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://t.me" label="Telegram">
                <TelegramIcon className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Single Animated Arrow Scroll To Top Bar */}
      <div className="border-t border-black/10 bg-[#f5f5f7]/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-[#86868b] sm:flex-row sm:px-10">
          <p className="text-center sm:text-left">
            &copy; 2026 VV Digitals. All rights reserved.
          </p>

          {/* Single Animated Upward Arrow Scroll To Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#1d1d1f] shadow-xs transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 animate-bounce" />
          </button>

          <p className="text-center sm:text-right">
            Founded &amp; Directed by <span className="font-semibold text-[#1d1d1f]">Renangi Vishnu Vardhan</span> &bull; Nellore, AP
          </p>
        </div>
      </div>
    </footer>
  )
}
