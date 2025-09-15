"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { useGlassGlow } from "@/hooks/use-glass-glow"
import { useEffect, useState } from "react"
import { FaRocket, FaBullseye, FaShieldAlt, FaMobile } from "react-icons/fa"

export default function Hero() {
  const { glowIntensity } = useGlassGlow()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-3 sm:px-6 lg:px-8 pt-20"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-56 sm:w-72 md:w-96 h-56 sm:h-72 md:h-96 bg-blue-500/10 rounded-full blur-3xl motion-safe:animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.2}px) scale(${1 + glowIntensity * 0.1})`,
            opacity: 0.3 + glowIntensity * 0.2,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-blue-400/8 rounded-full blur-3xl motion-safe:animate-pulse motion-safe:delay-1000"
          style={{
            transform: `translateY(${scrollY * -0.15}px) scale(${1 + glowIntensity * 0.08})`,
            opacity: 0.25 + glowIntensity * 0.15,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto">
        <GlassCard
          variant="hero"
          className={cn(
            "p-5 sm:p-8 md:p-10 lg:p-14 xl:p-16",
            "backdrop-blur-xl bg-black/20 border border-white/10",
            "shadow-2xl shadow-black/40",
            "transition-all duration-500 ease-out",
            "hover:bg-black/25 hover:border-white/20 hover:shadow-black/50",
          )}
          style={{
            backdropFilter: `blur(${16 + glowIntensity * 4}px)`,
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, ${0.4 + glowIntensity * 0.2}), 
                       0 0 0 1px rgba(255, 255, 255, ${0.05 + glowIntensity * 0.05}),
                       inset 0 1px 0 rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05})`,
            transform: `translateY(${scrollY * -0.03}px)`,
          }}
        >
          <div className="space-y-6 sm:space-y-8 text-center">
            {/* Heading */}
            <div className="space-y-4">
              <h1
                id="hero-heading"
                className={cn(
                  "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
                  "font-bold text-white leading-tight tracking-tight",
                )}
              >
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  NexCy
                </span>{" "}
                <br className="hidden sm:block" />
                Technologies
              </h1>

              <div
                className="mx-auto h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
                style={{
                  width: `${Math.min(160 + scrollY * 0.3, 240)}px`,
                  opacity: 0.4 + glowIntensity * 0.2,
                }}
              />
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Transforming ideas into cutting-edge digital solutions.
              <br className="hidden md:block" />
              We specialize in web development, mobile applications, AI/ML solutions, and enterprise software.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-6">
              {[
                { icon: FaRocket, label: "Fast Delivery", desc: "Rapid development" },
                { icon: FaBullseye, label: "Precision", desc: "Accurate solutions" },
                { icon: FaShieldAlt, label: "Secure", desc: "Enterprise security" },
                { icon: FaMobile, label: "Responsive", desc: "All devices" },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-4 sm:p-6 rounded-lg bg-black/10 backdrop-blur-sm",
                      "border border-white/5 hover:border-white/10",
                      "transition-all duration-300 hover:bg-black/15",
                    )}
                  >
                    <IconComponent className="text-lg sm:text-xl md:text-2xl mb-2 text-blue-400 mx-auto" />
                    <div className="text-sm font-medium text-white mb-1">{item.label}</div>
                    <div className="text-xs text-white/60">{item.desc}</div>
                  </div>
                )
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-sm sm:text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-auto"
                >
                  Explore Services
                </Button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm font-medium px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-sm sm:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 w-full sm:w-auto bg-transparent"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "AI", label: "Powered" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 no-print"
        aria-hidden="true"
        style={{ opacity: Math.max(0, 1 - scrollY * 0.01) }}
      >
        <div className="motion-safe:animate-bounce">
          <div className="w-5 h-9 border border-white/20 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 motion-safe:animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
