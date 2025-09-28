"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"

const navItems = [
  { name: "Home", href: "/", section: "home" },
  { name: "About", href: "/about", section: "about" },
  { name: "Services", href: "/services", section: "services" },
  { name: "Team", href: "/team", section: "team" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Skip section detection if currently navigating
      if (isNavigating) return

      // Update active section based on scroll position with better detection
      const sections = ["home", "about", "services", "team", "contact"]
      let currentSection = "home" // default to home
      
      // Find the section that's most visible in the viewport
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top
          const elementBottom = rect.bottom
          const viewportHeight = window.innerHeight
          
          // Check if section is in the upper half of the viewport
          if (elementTop <= viewportHeight * 0.3 && elementBottom >= viewportHeight * 0.3) {
            currentSection = section
            break
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
        // Update URL without triggering navigation
        const newUrl = currentSection === "home" ? "/" : `/${currentSection}`
        window.history.replaceState(null, "", newUrl)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname, activeSection, isNavigating])

  // Handle section scrolling on page load (for direct URL access)
  useEffect(() => {
    const handleInitialScroll = () => {
      const hash = pathname.replace("/", "") || "home"
      const element = document.getElementById(hash)
      if (element && hash !== "home") {
        setIsNavigating(true)
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
          setActiveSection(hash)
          setTimeout(() => setIsNavigating(false), 1000)
        }, 100)
      } else if (hash === "home") {
        setActiveSection("home")
      }
    }

    handleInitialScroll()
  }, [pathname])

  const scrollToSection = (sectionId: string, href: string) => {
    setIsMobileMenuOpen(false)
    setIsNavigating(true) // Prevent scroll detection during navigation
    
    const element = document.getElementById(sectionId)
    if (element) {
      // Immediately update active section and URL
      setActiveSection(sectionId)
      window.history.pushState(null, "", href)
      
      // Smooth scroll to element
      element.scrollIntoView({ behavior: "smooth" })
      
      // Re-enable scroll detection after navigation is complete
      setTimeout(() => {
        setIsNavigating(false)
      }, 1000) // Give enough time for smooth scroll to complete
    }
  }

  const isActive = (section: string) => {
    return activeSection === section
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 no-print",
        isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-4"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Enhanced backdrop blur with liquid glass effect */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500",
        isScrolled ? "opacity-100" : "opacity-0"
      )}>
        <div className="w-full h-full bg-[#fffaf5]/80 backdrop-blur-xl border-b border-orange-200/30 shadow-lg shadow-orange-500/5" />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo with enhanced animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <button
              onClick={() => scrollToSection("home", "/")}
              className="flex items-center space-x-2 group touch-target flex-shrink-0"
              aria-label="NexCy Technologies home"
            >
              <img
                src="/logo.png"
                alt="NexCy Technologies logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-gray-900 font-bold text-lg sm:text-xl group-hover:text-orange-600 transition-colors duration-300" style={{ fontFamily: 'Geometr415 Blk BT, sans-serif' }}>
                NEXCY
              </span>
            </button>
          </motion.div>

          {/* Desktop Navigation with special Contact Us button */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-8"
              role="menubar"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.section, item.href)}
                    role="menuitem"
                    className={cn(
                      "text-sm font-medium transition-all duration-300 touch-target relative",
                      "hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2 px-1 py-2",
                      isActive(item.section)
                        ? "text-orange-600 font-semibold"
                        : "text-gray-700"
                    )}
                    aria-current={isActive(item.section) ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Active indicator line */}
                    {isActive(item.section) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500"
                        layoutId="activeTab"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                </motion.div>
              ))}
              
              {/* Special Contact Us Button */}
              <motion.div
                initial={{ y: -20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <button
                  onClick={() => scrollToSection("contact", "/contact")}
                  className={cn(
                    "px-6 py-2.5 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600",
                    "text-white font-semibold text-sm rounded-lg touch-target relative overflow-hidden",
                    "shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30",
                    "transition-all duration-300 transform hover:scale-105",
                    "focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2",
                    isActive("contact") ? "ring-2 ring-orange-300" : ""
                  )}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  />
                  <span className="relative z-10">Contact Us</span>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile menu toggle - simplified */}
          <div className="md:hidden flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-gray-700 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2 touch-target transition-all duration-300"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className="block w-5 h-0.5 bg-current transition-all duration-300"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 2 : -2
                  }}
                />
                <motion.span
                  className="block w-5 h-0.5 bg-current transition-all duration-300"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                />
                <motion.span
                  className="block w-5 h-0.5 bg-current transition-all duration-300"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -2 : 2
                  }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-md z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Enhanced Mobile menu with liquid glass */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4
            }}
            id="mobile-menu"
            className="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <GlassCard className="h-full rounded-none rounded-l-3xl p-6 bg-[#fffaf5]/95 backdrop-blur-2xl border-l border-orange-200/50 shadow-2xl shadow-orange-500/10">
              <div className="flex flex-col h-full">
                {/* Enhanced close button */}
                <div className="flex justify-between items-center mb-8">
                  <motion.h2 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    id="mobile-menu-title" 
                    className="text-gray-900 font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
                  >
                    Menu
                  </motion.h2>
                  <motion.button
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl text-gray-700 hover:bg-orange-100/70 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 touch-target transition-all duration-300"
                    aria-label="Close navigation menu"
                  >
                    <div className="w-6 h-6 flex items-center justify-center relative">
                      <span className="block w-5 h-0.5 bg-current rotate-45 absolute" />
                      <span className="block w-5 h-0.5 bg-current -rotate-45 absolute" />
                    </div>
                  </motion.button>
                </div>

                <nav className="flex-1" role="navigation" aria-label="Mobile navigation">
                  <ul className="space-y-2" role="menubar">
                    {navItems.map((item, index) => (
                      <motion.li 
                        key={item.name} 
                        role="none"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <button
                          onClick={() => scrollToSection(item.section, item.href)}
                          role="menuitem"
                          className={cn(
                            "block px-4 py-4 text-base font-medium transition-all duration-300 touch-target relative w-full text-left",
                            "hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50",
                            isActive(item.section)
                              ? "text-orange-600 font-semibold"
                              : "text-gray-700"
                          )}
                          aria-current={isActive(item.section) ? "page" : undefined}
                        >
                          <span className="relative z-10">{item.name}</span>
                          {/* Active indicator */}
                          {isActive(item.section) && (
                            <motion.div
                              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full"
                              layoutId="activeMobileTab"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Enhanced Contact CTA */}
                <motion.div 
                  className="mt-8"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                >
                  <button
                    onClick={() => scrollToSection("contact", "/contact")}
                    className={cn(
                      "w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600",
                      "text-white font-medium py-4 rounded-xl touch-target relative overflow-hidden",
                      "shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30",
                      "transition-all duration-300 transform hover:scale-105",
                      "focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                    )}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                    <span className="relative z-10 font-semibold">Contact Us</span>
                  </button>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}