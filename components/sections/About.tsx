"use client"

import { motion } from "framer-motion"
import { FaRocket, FaStar, FaBullseye, FaShieldAlt } from "react-icons/fa"

const aboutPanels = [
  {
    title: "Our Mission",
    description:
      "Empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We create digital experiences that anticipate tomorrow's challenges.",
    icon: FaRocket,
    color: "#ef8354",
  },
  {
    title: "Our Vision",
    description:
      "To be the leading technology partner worldwide, recognized for innovation, reliability, and excellence. Integrating technology seamlessly with business operations.",
    icon: FaStar,
    color: "#4f5d75",
  },
  {
    title: "Why Choose Us?",
    description:
      "AI-powered workflows, enterprise-grade security, agile methodology, cutting-edge technology stack, and ongoing support ensure your success.",
    icon: FaShieldAlt,
    color: "#d96b3d",
  },
]

const features = [
  {
    title: "Innovation First",
    description: "Leverage cutting-edge tech to deliver solutions that give you a competitive advantage.",
    icon: FaRocket,
  },
  {
    title: "Client-Centric",
    description: "Your success is our priority. We work closely to exceed your expectations.",
    icon: FaBullseye,
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#f5f5f5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d3142] mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-[#ef8354] via-[#d96b3d] to-[#4f5d75] bg-clip-text text-transparent">
              NexCy Technologies
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#747474] max-w-3xl mx-auto leading-relaxed">
            Transforming businesses through innovative digital solutions, scalable software, and cutting-edge technology. 
            Our team combines expertise and creativity to deliver impactful results.
          </p>
        </motion.div>

        {/* About Panels */}
        <div className="space-y-8 lg:space-y-12">
          {aboutPanels.map((panel, idx) => {
            const Icon = panel.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="relative flex flex-col lg:flex-row items-start gap-6 p-8 rounded-xl bg-white/5 border border-transparent backdrop-blur-xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden group"
              >
                {/* Tech hover gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-[#ef8354]/20 group-hover:to-[#4f5d75]/30 transition-all duration-500 pointer-events-none"
                  style={{ mixBlendMode: "overlay" }}
                ></div>

                {/* Icon */}
                <div
                  className="flex-shrink-0 text-4xl"
                  style={{ color: panel.color }}
                >
                  <Icon />
                </div>

                {/* Text content */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-2xl font-bold text-[#2d3142] mb-2">{panel.title}</h3>
                  <p className="text-[#747474] text-base leading-relaxed">{panel.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="relative flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-transparent backdrop-blur-xl shadow-md hover:shadow-xl cursor-pointer group overflow-hidden"
              >
                <div className="text-3xl text-[#ef8354] flex-shrink-0">
                  <Icon />
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-[#2d3142] mb-1">{feature.title}</h4>
                  <p className="text-[#747474] text-sm leading-relaxed">{feature.description}</p>
                </div>

                {/* Tech hover overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-[#ef8354]/20 group-hover:to-[#4f5d75]/30 transition-all duration-500 pointer-events-none"
                  style={{ mixBlendMode: "overlay" }}
                ></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}