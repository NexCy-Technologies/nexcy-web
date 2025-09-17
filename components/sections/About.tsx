"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"
/* React icons */
import { FaRocket, FaStar, FaBullseye, FaShieldAlt } from "react-icons/fa"

interface AboutProps {
  animateOnMount?: boolean
}

const features = [
  {
    title: "Innovation First",
    description: "We leverage cutting-edge technologies to deliver solutions that give you a competitive advantage.",
    icon: FaRocket,
  },
  {
    title: "Quality Assurance",
    description: "Every project undergoes rigorous testing to ensure reliability, security, and optimal performance.",
    icon: FaStar,
  },
  {
    title: "Client-Centric",
    description: "Your success is our priority. We work closely with you to understand and exceed your expectations.",
    icon: FaBullseye,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available to help you succeed with ongoing maintenance and updates.",
    icon: FaShieldAlt,
  },
]

export default function About({ animateOnMount = true }: AboutProps) {
  const animationProps = animateOnMount
    ? { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } }
    : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 } }

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] overflow-hidden">
      {/* Animated square mesh background */}
      <motion.div
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div {...animationProps} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#A1A1AA] bg-clip-text text-transparent">
              NexCy Technologies
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We are a forward-thinking technology company dedicated to transforming businesses through innovative digital
            solutions. Our team of expert developers and designers work tirelessly to bring your vision to life.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* About content */}
          <motion.div
            {...animationProps}
            className="space-y-6"
          >
            <GlassCard className="p-8 transition-transform transform hover:rotate-1 hover:scale-105 duration-500">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and
                innovation. We believe in creating digital experiences that not only meet today's needs but anticipate
                tomorrow's challenges.
              </p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Since our founding, we've been committed to delivering exceptional results through a combination of
                technical expertise, creative thinking, and unwavering dedication to our clients' success.
              </p>
            </GlassCard>

            <GlassCard className="p-8 transition-transform transform hover:-rotate-1 hover:scale-105 duration-500">
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-sm sm:text-base text-white/80">
                To be the leading technology partner for businesses worldwide, recognized for our innovation,
                reliability, and commitment to excellence. We envision a future where technology seamlessly integrates
                with business operations to create unprecedented opportunities for growth and success.
              </p>
            </GlassCard>
          </motion.div>

          {/* Company stats and highlights */}
          <motion.div
            {...animationProps}
            className="space-y-6"
          >
            <GlassCard className="p-8 transition-transform transform hover:rotate-2 hover:scale-105 duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                {[
                  "AI-powered development workflows",
                  "Enterprise-grade security standards",
                  "100% client satisfaction rate",
                  "Cutting-edge technology stack",
                  "Agile development methodology",
                  "Ongoing support and maintenance",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full" />
                    <span className="text-sm sm:text-base text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-6 text-center hover:scale-110 hover:rotate-2 transition-transform duration-500">
                <div className="text-3xl font-bold text-white mb-2">Real</div>
                <div className="text-white/60 text-sm">Time Analytics</div>
              </GlassCard>
              <GlassCard className="p-6 text-center hover:scale-110 hover:-rotate-2 transition-transform duration-500">
                <div className="text-3xl font-bold text-white mb-2">Micro</div>
                <div className="text-white/60 text-sm">Services Ready</div>
              </GlassCard>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <motion.div
          {...animationProps}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <GlassCard
                key={index}
                className="p-6 text-center hover:scale-110 hover:rotate-3 transition-transform duration-500"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-4xl mb-4 text-[#3B82F6] flex justify-center"
                  role="img"
                  aria-label={feature.title}
                >
                  <IconComponent />
                </motion.div>
                <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}