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
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
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
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-[#f5f5f7] text-[#1d1d1f] transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white hover:shadow-sm"
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
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-12 sm:px-10 sm:pt-16">
        {/* Upper Action Bar with Back To Top */}
        <div className="flex items-center justify-between border-b border-black/10 pb-8">
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-[#f5f5f7] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1d1d1f] transition-all duration-300 hover:bg-black hover:text-white shadow-xs"
          >
            <span>Back To Top</span>
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Main 4-Column Links Grid */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Col 1: Brand Logo & Tagline */}
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-2.5 shadow-xs">
              <img
                src="/vv-digitals-logo-stacked-black.svg"
                alt="VV Digitals Logo"
                className="h-8 w-auto shrink-0"
                loading="eager"
              />
            </div>
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
            <div className="mt-3 flex items-center gap-2.5">
              <SocialLink href="https://instagram.com" label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://x.com" label="X (Twitter)">
                <XIcon className="h-3.5 w-3.5" />
              </SocialLink>
              <SocialLink href="https://t.me" label="Telegram">
                <TelegramIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Leadership Signature Bar */}
      <div className="border-t border-black/10 bg-[#f5f5f7]/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-[#86868b] sm:flex-row sm:px-10">
          <p className="text-center sm:text-left">
            &copy; 2026 VV Digitals. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Founded &amp; Directed by <span className="font-semibold text-[#1d1d1f]">Renangi Vishnu Vardhan</span> &bull; Nellore, AP
          </p>
        </div>
      </div>
    </footer>
  )
}
