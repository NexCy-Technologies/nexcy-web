"use client"

import { useEffect, useState } from "react"

export function useGlassGlow() {
  const [scrollY, setScrollY] = useState(0)
  const [glowIntensity, setGlowIntensity] = useState(0.3)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Calculate glow intensity based on scroll position
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min(currentScrollY / maxScroll, 1)
      const intensity = 0.3 + scrollProgress * 0.4 // Range from 0.3 to 0.7
      setGlowIntensity(intensity)
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { scrollY, glowIntensity }
}
