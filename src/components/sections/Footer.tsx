"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import Image from "next/image"
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaXTwitter, FaWhatsapp } from "react-icons/fa6"

const socialLinks = [
  { name: "LINKEDIN", href: "https://www.linkedin.com/company/nexcy-technologies", icon: FaLinkedinIn },
  { name: "INSTAGRAM", href: "https://www.instagram.com/nexcytechnologies", icon: FaInstagram },
  { name: "FACEBOOK", href: "https://www.facebook.com/nexcytechnologies", icon: FaFacebookF },
  { name: "TWITTER", href: "https://twitter.com/nexcytechnologies", icon: FaXTwitter },
  { name: "WHATSAPP", href: "https://wa.me/94769484049", icon: FaWhatsapp },
]

export function Footer() {
  const scrollTo = (sectionId: string, href: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", href)
    }
  }

  return (
    <footer className="border-t border-border bg-background pt-20 pb-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <ScrollReveal text="Let's build something amazing together." />
            </h2>
            <p className="text-muted text-lg sm:text-xl font-sans max-w-md">
              Big ideas. Smart solutions. We turn your vision into reality — from the first line of code to launch day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-muted uppercase tracking-widest mb-2">SYSTEM_LINKS</span>
              {["ABOUT", "SERVICES", "TEAM", "CONTACT"].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase(), `/#${link.toLowerCase()}`)}
                  className="text-sm font-mono text-foreground hover:text-accent focus-visible:text-accent active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background transition-colors text-left"
                >
                  {link}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-muted uppercase tracking-widest mb-2">NETWORK_NODES</span>
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-foreground hover:text-[var(--accent)] focus-visible:text-[var(--accent)] active:text-[var(--accent)] transition-colors flex items-center gap-2 border border-transparent hover:border-[var(--accent)] focus-visible:border-[var(--accent)] active:border-[var(--accent)] px-2 py-1 -ml-2 rounded-sm w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <Icon className="w-4 h-4" />
                    {s.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/NexCy_Logo.png" alt="Nexcy Logo" width={24} height={24} className="w-6 h-6 object-contain" />
            <span className="font-[family-name:var(--font-inter)] text-sm text-muted">
              © {new Date().getFullYear()} Nexcy Technologies. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
