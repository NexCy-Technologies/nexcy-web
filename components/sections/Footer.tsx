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
    <footer className="bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          {/* Hero Text */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Let's build something{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                amazing together
              </span>
            </h2>
          </div>

          {/* Links and Contact */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 sm:gap-12">
            {/* Logo and Copyright */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                <img
                  src="/logo.png"
                  alt="NexCy Technologies"
                  className="w-10 h-10 rounded-xl"
                />
                <span 
                  className="text-gray-900 font-bold text-2xl tracking-tight" 
                  style={{ fontFamily: 'Geometr415 Blk BT, sans-serif' }}
                >
                  NEXCY
                </span>
              </div>
              <div className="text-gray-600 text-sm space-y-1">
                <p>Copyright © {new Date().getFullYear()}</p>
                <p className="text-gray-500">Big ideas. Smart solutions.</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16">
              {/* Column 1 */}
              <div className="space-y-4">
                {primaryLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.section, link.href)}
                    className="block text-gray-600 hover:text-orange-600 transition-colors duration-300 text-left text-sm sm:text-base"
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
                    className="block text-gray-600 hover:text-orange-600 transition-colors duration-300 text-left text-sm sm:text-base"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection("contact", "/contact")}
                className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-300 py-6 sm:py-8">
          {/* Social Icons */}
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-xs sm:text-sm font-medium">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}