"use client"

import { FaFacebook, FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

const navigationLinks = [
  { name: "Home", href: "/", section: "home" },
  { name: "About", href: "/about", section: "about" },
  { name: "Services", href: "/services", section: "services" },
  { name: "Team", href: "/team", section: "team" },
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
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
          {/* Hero Text */}
          <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-snug xs:leading-tight">
              Let's build something{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                amazing together
              </span>
            </h2>
          </div>

          {/* Links and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 xs:gap-8 sm:gap-10 md:gap-6 lg:gap-8">
            {/* Logo and Copyright */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="flex items-center gap-2 xs:gap-2.5 mb-3 xs:mb-4 sm:mb-5">
                <img
                  src="/logo.png"
                  alt="NexCy Technologies"
                  className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg xs:rounded-xl flex-shrink-0"
                />
                <span 
                  className="text-gray-900 font-bold text-base xs:text-lg sm:text-xl md:text-2xl tracking-tight" 
                  style={{ fontFamily: 'Geometr415 Blk BT, sans-serif' }}
                >
                  NEXCY
                </span>
              </div>
              <div className="text-gray-600 text-xs sm:text-sm space-y-0.5">
                <p>Copyright © {new Date().getFullYear()}</p>
                <p className="text-gray-500">Big ideas. Smart solutions.</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-5 lg:col-span-6 flex justify-start md:justify-center">
              <div className="flex flex-wrap gap-x-6 xs:gap-x-8 sm:gap-x-10 md:gap-x-6 lg:gap-x-8 xl:gap-x-10 gap-y-2 xs:gap-y-2.5 sm:gap-y-3">
                {navigationLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.section, link.href)}
                    className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-left text-xs xs:text-sm sm:text-base whitespace-nowrap"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Button */}
            <div className="md:col-span-3 md:flex md:justify-end md:items-start">
              <button
                onClick={() => scrollToSection("contact", "/contact")}
                className="w-full md:w-auto bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold px-4 xs:px-5 sm:px-6 md:px-5 lg:px-6 xl:px-8 py-2 xs:py-2.5 sm:py-3 rounded-md sm:rounded-lg text-xs xs:text-sm sm:text-base transition-all duration-200 hover:shadow-lg active:scale-95"
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-4 xs:py-5 sm:py-6">
          {/* Social Icons */}
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2.5 xs:gap-3 sm:gap-4">
              <span className="text-gray-600 text-xs sm:text-sm font-medium">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 transition-colors duration-200 p-1.5 xs:p-2 -m-1.5 xs:-m-2"
                  aria-label={social.name}
                >
                  <social.icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}