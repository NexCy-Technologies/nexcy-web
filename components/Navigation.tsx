"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home",     section: "home" },
  { name: "About",   section: "about" },
  { name: "Services", section: "services" },
  { name: "Work",     section: "work" },
  { name: "Team",    section: "team" },
]

export default function Navigation() {
  const [isScrolled,       setIsScrolled]       = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection,    setActiveSection]    = useState("home")
  const [isNavigating,     setIsNavigating]     = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)
      if (isNavigating) return

      const sections = ["home", "about", "services", "work", "team", "contact"]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          const vh = window.innerHeight
          if (top <= vh * 0.35 && bottom >= vh * 0.35) {
            if (id !== activeSection) {
              setActiveSection(id)
              window.history.replaceState(null, "", id === "home" ? "/" : `/#${id}`)
            }
            break
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [activeSection, isNavigating])

  const scrollTo = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    setIsNavigating(true)
    const el = document.getElementById(sectionId)
    if (el) {
      setActiveSection(sectionId)
      window.history.pushState(null, "", sectionId === "home" ? "/" : `/#${sectionId}`)
      el.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => setIsNavigating(false), 1000)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 no-print"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Glass bar ── */}
        <div
          className={cn(
            "transition-all duration-500",
            isScrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4"
          )}
        >
          {/* Background layer — clean white glass, not warm tinted */}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-500",
              isScrolled
                ? "bg-background/75 dark:bg-slate-950/75 backdrop-blur-xl border-b border-border/60 shadow-sm"
                : "bg-transparent border-b border-transparent"
            )}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <motion.button
                onClick={() => scrollTo("home")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-2 group flex-shrink-0"
                aria-label="Nexcy Technologies home"
              >
                <img
                  src="/logo.png"
                  alt="Nexcy logo"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                />
                <span
                  className="text-gray-900 font-black text-lg sm:text-xl tracking-tight group-hover:text-orange-500 transition-colors duration-300"
                  style={{ fontFamily: "Geometr415 Blk BT, sans-serif" }}
                >
                  NEXCY
                </span>
              </motion.button>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-1">
                {/* Nav pill container */}
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500",
                    isScrolled
                      ? "bg-gray-100/80 backdrop-blur-sm"
                      : "bg-white/20 backdrop-blur-sm border border-white/30"
                  )}
                >
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollTo(item.section)}
                      className={cn(
                        "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
                        activeSection === item.section
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      {activeSection === item.section && (
                        <motion.div
                          layoutId="activeDesktopPill"
                          className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-md shadow-orange-300/40"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </button>
                  ))}
                </div>

                {/* Contact CTA */}
                <motion.button
                  onClick={() => scrollTo("contact")}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "ml-3 px-5 py-2 text-sm font-semibold rounded-full relative overflow-hidden",
                    "bg-gradient-to-r from-orange-400 to-orange-500",
                    "hover:from-orange-500 hover:to-orange-600",
                    "text-white shadow-md shadow-orange-400/30",
                    "transition-all duration-300",
                    activeSection === "contact" && "ring-2 ring-orange-300 ring-offset-1"
                  )}
                >
                  {/* Shimmer */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{ x: ["-100%", "150%"] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: "linear", repeatDelay: 1 }}
                  />
                  <span className="relative z-10">Contact Us</span>
                </motion.button>
              </div>

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                  <motion.span
                    className="block h-0.5 bg-current rounded-full"
                    animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                    transition={{ duration: 0.22 }}
                  />
                  <motion.span
                    className="block h-0.5 bg-current rounded-full"
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1, scaleX: isMobileMenuOpen ? 0 : 1 }}
                    transition={{ duration: 0.22 }}
                  />
                  <motion.span
                    className="block h-0.5 bg-current rounded-full"
                    animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                    transition={{ duration: 0.22 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile slide-in panel ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 md:hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Glass panel */}
            <div className="h-full bg-background/90 backdrop-blur-2xl border-l border-gray-200/60 shadow-2xl shadow-black/10 rounded-l-3xl flex flex-col p-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Nexcy" className="w-7 h-7 object-contain" />
                  <span
                    className="font-black text-base text-gray-900"
                    style={{ fontFamily: "Geometr415 Blk BT, sans-serif" }}
                  >
                    NEXCY
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 space-y-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.22 }}
                    onClick={() => scrollTo(item.section)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left",
                      activeSection === item.section
                        ? "bg-orange-50 text-orange-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {activeSection === item.section && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    )}
                    {item.name}
                  </motion.button>
                ))}
              </nav>

              {/* Contact CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.22 }}
                className="mt-6"
              >
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-300/30 transition-all duration-200 active:scale-95 relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "150%"] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: "linear", repeatDelay: 1 }}
                  />
                  <span className="relative z-10">Contact Us</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
