"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print",
        isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-4"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Subtle gradient overlay when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-[#2d3142]/50 via-[#2d3142]/30 to-transparent backdrop-blur-md" />
        </div>
      )}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group touch-target flex-shrink-0"
            aria-label="NexCy Technologies home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden">
              <img
                src="/logo.png"
                alt="NexCy Technologies logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#2d3142] dark:text-[#f5f5f5] font-bold text-lg sm:text-xl group-hover:text-[#ef8354] transition-colors">
              NEXCY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <GlassCard className="p-1 rounded-full bg-[#f5f5f5]/10 backdrop-blur-xl border border-[#e0e0e0]/20 shadow-md">
              <div className="flex items-center space-x-1" role="menubar">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    role="menuitem"
                    className={cn(
                      "px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 touch-target",
                      "hover:bg-[#e0e0e0]/30 focus:outline-none focus:ring-2 focus:ring-[#ef8354]",
                      pathname === item.href
                        ? "bg-[#ef8354]/90 text-white"
                        : "text-[#2d3142]/80 hover:text-[#2d3142]"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </GlassCard>

            {/* Contact CTA */}
            <Link href="/contact" className="ml-3 lg:ml-4">
              <Button
                className={cn(
                  "bg-[#ef8354] hover:bg-[#d96b3d] text-white font-medium px-4 lg:px-6 py-2 rounded-full text-sm",
                  "shadow-md hover:shadow-lg transition-all duration-200 motion-safe:transform motion-safe:hover:scale-105",
                  "focus:outline-none focus:ring-2 focus:ring-[#ef8354] focus:ring-offset-2 focus:ring-offset-transparent touch-target"
                )}
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#2d3142] hover:bg-[#e0e0e0]/40 focus:outline-none focus:ring-2 focus:ring-[#ef8354] touch-target"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={cn(
                    "block w-5 h-0.5 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                  )}
                />
                <span
                  className={cn(
                    "block w-5 h-0.5 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "opacity-30" : "opacity-80"
                  )}
                />
                <span
                  className={cn(
                    "block w-5 h-0.5 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#2d3142]/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 md:hidden",
          "transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <GlassCard className="h-full rounded-none rounded-l-2xl p-4 sm:p-6 bg-[#f5f5f5]/90 backdrop-blur-xl border border-[#e0e0e0]/30 shadow-lg">
          <div className="flex flex-col h-full">
            {/* Close button */}
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 id="mobile-menu-title" className="text-[#2d3142] font-semibold text-lg">
                Menu
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-[#2d3142] hover:bg-[#e0e0e0]/40 focus:outline-none focus:ring-2 focus:ring-[#ef8354] touch-target"
                aria-label="Close navigation menu"
              >
                <div className="w-6 h-6 flex items-center justify-center relative">
                  <span className="block w-5 h-0.5 bg-current rotate-45 absolute" />
                  <span className="block w-5 h-0.5 bg-current -rotate-45 absolute" />
                </div>
              </button>
            </div>

            <nav className="flex-1" role="navigation" aria-label="Mobile navigation">
              <ul className="space-y-3" role="menubar">
                {navItems.map((item) => (
                  <li key={item.name} role="none">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem"
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 touch-target",
                        "hover:bg-[#e0e0e0]/40 focus:outline-none focus:ring-2 focus:ring-[#ef8354]",
                        pathname === item.href
                          ? "bg-[#ef8354]/90 text-white"
                          : "text-[#2d3142]/80 hover:text-[#2d3142]"
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact CTA */}
            <div className="mt-6 sm:mt-8">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  className={cn(
                    "w-full bg-[#ef8354] hover:bg-[#d96b3d] text-white font-medium py-3 rounded-lg touch-target",
                    "shadow-md hover:shadow-lg transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-[#ef8354]"
                  )}
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </nav>
  )
}