"use client"

import { FaFacebook, FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

const navLinks = [
  { name: "Home", href: "/", section: "home" },
  { name: "About", href: "/#about", section: "about" },
  { name: "Services", href: "/#services", section: "services" },
  { name: "Team", href: "/#team", section: "team" },
  { name: "Contact", href: "/#contact", section: "contact" },
]

const socialLinks = [
  { name: "Twitter",   href: "https://twitter.com/nexcytechnologies",             icon: FaTwitter },
  { name: "Instagram", href: "https://www.instagram.com/nexcytechnologies",        icon: FaInstagram },
  { name: "Facebook",  href: "https://www.facebook.com/nexcytechnologies",         icon: FaFacebook },
  { name: "LinkedIn",  href: "https://www.linkedin.com/company/nexcy-technologies", icon: FaLinkedin },
  { name: "WhatsApp",  href: "https://wa.me/94725299199",                           icon: FaWhatsapp },
]

export default function Footer() {
  const scrollTo = (sectionId: string, href: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", href)
    }
  }

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main content ── */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">

            {/* Left — brand + tagline */}
            <div className="lg:col-span-5">
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/logo.png"
                  alt="Nexcy Technologies"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex-shrink-0"
                />
                <span
                  className="text-gray-900 font-black text-xl sm:text-2xl tracking-tight"
                  style={{ fontFamily: "Geometr415 Blk BT, sans-serif" }}
                >
                  NEXCY
                </span>
              </div>

              {/* Big footer headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                Let's build something{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  amazing together.
                </span>
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
                Big ideas. Smart solutions. We turn your vision into reality — from the first line of code to launch day.
              </p>

              {/* CTA */}
              <button
                onClick={() => scrollTo("contact", "/#contact")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm shadow-md shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 hover:scale-105"
              >
                Start a Project
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Middle — nav links */}
            <div className="lg:col-span-3 lg:col-start-7">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Navigation
              </p>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollTo(link.section, link.href)}
                      className="text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — contact */}
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Contact
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:contact@nexcy.lk"
                  className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                    <FaFacebook className="hidden" />
                    <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  contact@nexcy.lk
                </a>
                <a
                  href="https://wa.me/94725299199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-green-500 transition-colors duration-200 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <FaWhatsapp className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  +94 725 299 199
                </a>
              </div>

              {/* Social icons */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Follow Us
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200"
                    >
                      <s.icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-100 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Nexcy Technologies. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Built with passion in{" "}
            <span className="text-orange-400 font-medium">Sri Lanka 🇱🇰</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
