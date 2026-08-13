import { Play } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-between px-6 pb-16 pt-36 sm:px-10"
    >
      {/* Top Block */}
      <div>
        <h1 className="animate-letter-spacing text-6xl font-black uppercase leading-none tracking-tighter text-[#1d1d1f] sm:text-8xl md:text-9xl">
          Clear Brands.
          <br />
          Automated Growth.
        </h1>
        <p className="mt-8 max-w-xl text-xl text-[#86868b]">
          Full-service creative production and digital strategy engineered in Nellore for
          ambition-driven companies.
        </p>
      </div>

      {/* Bottom Block */}
      <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        {/* Left: CTA + phone */}
        <div className="flex flex-col items-start gap-5">
          <a
            href="#contact"
            className="inline-flex rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            Start a Project
          </a>
          <a
            href="tel:+916309016428"
            className="text-lg font-medium text-[#86868b] transition-colors duration-200 hover:text-[#1d1d1f]"
          >
            +91 63090 16428
          </a>
        </div>

        {/* Right: showreel preview card */}
        <a
          href="#reel"
          className="group flex items-center gap-4 self-start rounded-2xl border border-black/10 bg-[#F5F5F7] p-4 transition-all duration-300 hover:scale-[1.04] hover:border-black/20 hover:shadow-lg sm:self-auto"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 group-hover:rotate-[90deg]">
            <Play className="h-4 w-4 fill-current" />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-[#1d1d1f]">Watch Reel</span>
            <span className="text-xs text-[#86868b]">(0:45)</span>
          </span>
        </a>
      </div>
    </section>
  )
}

