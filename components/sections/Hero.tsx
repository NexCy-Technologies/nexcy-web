"use client"

import { motion } from "framer-motion"
import { GlassButton } from "@/components/ui/glass-button"
import { AnimatedBackground } from "@/components/animated-background"
import { ArrowRight, Zap } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f5f5f5] text-[#2d3142]">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5]/80 via-[#f5f5f5]/60 to-[#f5f5f5]/80 z-10" />

      {/* Floating glass shapes */}
      <div className="absolute inset-0 z-20">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full glass bg-[#ef8354]/20 animate-float opacity-30" />
        <div className="absolute top-3/4 right-1/4 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 rounded-full glass bg-[#4f5d75]/20 animate-float-delayed opacity-20" />
        <div className="absolute top-1/2 right-1/3 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full glass bg-[#747474]/20 animate-pulse-slow opacity-25" />
      </div>

      {/* Main content */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 lg:space-y-12"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 8vw, 6rem)",
                lineHeight: "clamp(2.2rem, 8.5vw, 6.5rem)",
              }}
            >
              Build the{" "}
              <span className="bg-gradient-to-r from-[#ef8354] via-[#ef8354]/80 to-[#4f5d75] bg-clip-text text-transparent">
                Future
              </span>{" "}
              with{" "}
              <span className="relative">
                NexCy
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#ef8354] to-[#4f5d75] rounded-full"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-[#747474] leading-relaxed max-w-2xl"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                lineHeight: "clamp(1.5rem, 3vw, 2rem)",
              }}
            >
              Empowering businesses with cutting-edge software, web, and app solutions. Designed for scalability,
              performance, and unprecedented impact in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <GlassButton
                variant="primary"
                className="group w-full sm:w-auto bg-[#ef8354] hover:bg-[#d96b3d] text-white shadow-md shadow-[#ef8354]/40 transition-all duration-300"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </GlassButton>

              <GlassButton
                variant="outline"
                className="group w-full sm:w-auto border-2 border-[#2d3142] text-[#2d3142] hover:bg-[#ef8354]/10 hover:text-[#2d3142] transition-all duration-300"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                <span>Explore Solutions</span>
              </GlassButton>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Rotating Logo */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="w-64 h-64 perspective-3d">
              <motion.img
                src="/logo.png"
                alt="NexCy Logo"
                className="w-full h-full object-contain"
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D Perspective styles */}
      <style jsx>{`
        .perspective-3d {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}