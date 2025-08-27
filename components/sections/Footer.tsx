"use client"

import Link from "next/link"
import { FaFacebook, FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
]

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/nexcytech",
    icon: FaFacebook,
    color: "hover:text-blue-400",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/94725299199",
    icon: FaWhatsapp,
    color: "hover:text-green-400",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/nexcytech",
    icon: FaInstagram,
    color: "hover:text-pink-400",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/nexcytech",
    icon: FaLinkedin,
    color: "hover:text-blue-400",
  },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-950/80 to-slate-950/40 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/logo.png"
                  alt="NexCy Technologies"
                  className="w-10 h-10 rounded-xl shadow-lg"
                />
                <span className="text-white font-bold text-2xl tracking-tight">NEXCY</span>
              </div>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Transforming ideas into digital solutions with cutting-edge technology and innovative approaches.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a
                  href="mailto:contact@nexcy.lk"
                  className="flex items-center space-x-3 text-slate-300 hover:text-blue-400 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-500/20 transition-all duration-300">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">contact@nexcy.lk</span>
                </a>
                <a
                  href="https://wa.me/94725299199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-300 hover:text-green-400 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-green-500/20 transition-all duration-300">
                    <FaWhatsapp className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">+94 725 299 199</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-white/5 text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex-shrink-0">
              <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-all duration-300 text-base font-medium hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="text-center">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} NexCy Technologies. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
