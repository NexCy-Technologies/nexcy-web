"use client"

import { FaFacebook, FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

const primaryLinks = [
  { name: "Home", href: "/", section: "home" },
  { name: "Contact us", href: "/contact", section: "contact" },
]

const secondaryLinks = [
  { name: "How it works", href: "/services", section: "services" },
  { name: "Privacy policy", href: "/about", section: "about" },
]

const thirdLinks = [
  { name: "Our mission", href: "/about", section: "about" },
  { name: "Our team", href: "/team", section: "team" },
]

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/nexcytechnologies",
    icon: FaTwitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nexcytechnologies",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/nexcytechnologies",
    icon: FaFacebook,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/nexcy-technologies",
    icon: FaLinkedin,
  },
]

export default function Footer() {
  const scrollToSection = (sectionId: string, href: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", href)
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-black via-orange-950 to-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-orange-500/10 rounded-3xl transform rotate-12 animate-pulse"></div>
        <div className="absolute top-32 right-40 w-16 h-16 bg-orange-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-600/15 rounded-2xl transform -rotate-12 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-16 sm:py-20 lg:py-24">
          {/* Hero Text */}
          <div className="mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              You can help <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                shape the future
              </span>
            </h2>
          </div>

          {/* Links and Contact */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12">
            {/* Logo and Copyright */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3 mb-8">
                <img
                  src="/logo.png"
                  alt="NexCy Technologies"
                  className="w-10 h-10 rounded-xl"
                />
                <span 
                  className="text-white font-bold text-2xl tracking-tight" 
                  style={{ fontFamily: 'Geometr415 Blk BT, sans-serif' }}
                >
                  nexcy
                </span>
              </div>
              <div className="text-gray-300 text-sm space-y-1">
                <p>Copyright © {new Date().getFullYear()}</p>
                <p className="text-gray-400">Big ideas. Smart solutions.</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 lg:gap-20">
              {/* Column 1 */}
              <div className="space-y-4">
                {primaryLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.section, link.href)}
                    className="block text-gray-300 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                {secondaryLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.section, link.href)}
                    className="block text-gray-300 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                {thirdLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.section, link.href)}
                    className="block text-gray-300 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Button and Social */}
            <div className="flex-shrink-0 space-y-6">
              <button
                onClick={() => scrollToSection("contact", "/contact")}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                CONTACT US
              </button>

              {/* Social Icons */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-600 mb-8"></div>
      </div>
    </footer>
  )
}