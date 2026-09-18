"use client"

import { TerminalReveal } from "@/components/ui/terminal-reveal"

const socialLinks = [
  { name: "LINKEDIN", href: "https://www.linkedin.com/company/nexcy-technologies" },
  { name: "INSTAGRAM", href: "https://www.instagram.com/nexcytechnologies" },
  { name: "FACEBOOK", href: "https://www.facebook.com/nexcytechnologies" },
  { name: "TWITTER", href: "https://twitter.com/nexcytechnologies" },
  { name: "WHATSAPP", href: "https://wa.me/94769484049" },
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
              <TerminalReveal text="Let's build something amazing together." />
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
                  [{link}]
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-muted uppercase tracking-widest mb-2">NETWORK_NODES</span>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-foreground hover:text-accent focus-visible:text-accent active:text-accent transition-colors block border border-transparent hover:border-accent focus-visible:border-accent active:border-accent px-2 py-1 -ml-2 rounded-sm w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  [{s.name}]
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center font-bold font-mono text-xs rounded-sm">
              NX
            </div>
            <span className="font-mono text-xs text-muted">
              © {new Date().getFullYear()} NEXCY_TECHNOLOGIES — ALL_SYSTEMS_OPERATIONAL
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            <span className="font-mono text-xs text-accent">SERVER_STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
