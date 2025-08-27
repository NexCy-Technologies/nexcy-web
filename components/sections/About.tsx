"use client"

import { GlassCard } from "@/components/ui/glass-card"
/* Added react icons imports to replace emojis */
import { FaRocket, FaStar, FaBullseye, FaShieldAlt } from "react-icons/fa"

const features = [
  {
    title: "Innovation First",
    description: "We leverage cutting-edge technologies to deliver solutions that give you a competitive advantage.",
    /* Replaced rocket emoji with FaRocket icon */
    icon: FaRocket,
  },
  {
    title: "Quality Assurance",
    description: "Every project undergoes rigorous testing to ensure reliability, security, and optimal performance.",
    /* Replaced sparkles emoji with FaStar icon */
    icon: FaStar,
  },
  {
    title: "Client-Centric",
    description: "Your success is our priority. We work closely with you to understand and exceed your expectations.",
    /* Replaced target emoji with FaBullseye icon */
    icon: FaBullseye,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available to help you succeed with ongoing maintenance and updates.",
    /* Replaced shield emoji with FaShieldAlt icon */
    icon: FaShieldAlt,
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              NexCy Technologies
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We are a forward-thinking technology company dedicated to transforming businesses through innovative digital
            solutions. Our team of expert developers and designers work tirelessly to bring your vision to life.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* About content */}
          <div className="space-y-6">
            <GlassCard className="p-8">
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

            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                To be the leading technology partner for businesses worldwide, recognized for our innovation,
                reliability, and commitment to excellence. We envision a future where technology seamlessly integrates
                with business operations to create unprecedented opportunities for growth and success.
              </p>
            </GlassCard>
          </div>

          {/* Company stats and highlights */}
          <div className="space-y-6">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm sm:text-base text-white/80">Expert team with 4+ years of experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm sm:text-base text-white/80">50+ successful projects delivered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm sm:text-base text-white/80">100% client satisfaction rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm sm:text-base text-white/80">Cutting-edge technology stack</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm sm:text-base text-white/80">Agile development methodology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm sm:text-base text-white/80">Ongoing support and maintenance</span>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-white/60 text-sm">Projects</div>
              </GlassCard>
              <GlassCard className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">4+</div>
                <div className="text-white/60 text-sm">Years</div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <GlassCard key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4 text-blue-400 flex justify-center" role="img" aria-label={feature.title}>
                  <IconComponent />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
