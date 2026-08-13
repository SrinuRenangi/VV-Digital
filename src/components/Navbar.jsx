import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Founder', href: '#founder' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
  { label: 'Reviews', href: '#reviews' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[92%] max-w-5xl -translate-x-1/2">
      {/* Floating pill container */}
      <div className="flex items-center justify-between rounded-full border border-black/10 bg-white/80 px-6 py-3 shadow-md backdrop-blur-xl">
        {/* Left: actual logo + badge */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setMenuOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2.5"
        >
          <img
            src="/vv-digitals-logo-stacked-black.svg"
            alt="VV Digitals"
            className="h-10 w-auto shrink-0"
            loading="eager"
          />

        </a>

        {/* Center: links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 text-sm font-medium text-[#1d1d1f]/80 transition-colors duration-200 hover:bg-black/5 hover:text-[#1d1d1f]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA + mobile trigger */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-[#0066CC] px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#0066cc]/90 hover:shadow-lg hover:shadow-[#0066cc]/20 active:scale-95 sm:inline-flex"
          >
            Get in Touch
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="inline-flex items-center justify-center rounded-full p-2 text-[#1d1d1f] transition-colors duration-200 hover:bg-black/5 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu — expands from the capsule */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden ${menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="mt-3 rounded-3xl border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur-xl">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-full px-4 py-2.5 text-sm font-medium text-[#1d1d1f]/80 transition-colors duration-200 hover:bg-black/5 hover:text-[#1d1d1f]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 flex w-full items-center justify-center rounded-full bg-[#0066CC] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#0066cc]/90 hover:shadow-lg hover:shadow-[#0066cc]/20 active:scale-95"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

