"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaGlobe, FaBriefcase, FaMobile, FaCog, FaRobot, FaNetworkWired, FaExternalLinkAlt } from "react-icons/fa"
import projectsData from "@/data/projects.json"

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure"],
    icon: FaGlobe,
  },
  {
    title: "ERP/POS Systems",
    description: "Comprehensive enterprise resource planning and point-of-sale solutions for your business.",
    features: ["Inventory Management", "Sales Tracking", "Reporting", "Multi-location"],
    icon: FaBriefcase,
  },
  {
    title: "Mobile Apps",
    description: "Native Android and iOS applications that deliver exceptional user experiences.",
    features: ["Cross-platform", "Native Performance", "App Store Ready", "Push Notifications"],
    icon: FaMobile,
  },
  {
    title: "Software Development",
    description: "Custom software solutions tailored to your specific business requirements.",
    features: ["Custom Solutions", "Scalable Architecture", "API Integration", "Cloud Ready"],
    icon: FaCog,
  },
  {
    title: "AI/ML Solutions",
    description: "Intelligent systems powered by machine learning and artificial intelligence.",
    features: ["Predictive Analytics", "Automation", "Data Processing", "Smart Insights"],
    icon: FaRobot,
  },
  {
    title: "IoT Development",
    description: "Internet of Things solutions connecting devices and enabling smart automation.",
    features: ["Device Integration", "Real-time Monitoring", "Data Analytics", "Remote Control"],
    icon: FaNetworkWired,
  },
]

const techLogos = [
  { name: "React", logo: "/technologies/react-logo.png" },
  { name: "Node.js", logo: "/technologies/nodejs-logo.png" },
  { name: "TailwindCSS", logo: "/technologies/tailwind-css-logo.png" },
  { name: "Laravel", logo: "/technologies/laravel-logo.png" },
  { name: "Flutter", logo: "/technologies/flutter-logo.png" },
  { name: "Firebase", logo: "/technologies/firebase-logo.png" },
  { name: "Python", logo: "/technologies/python-logo.png" },
  { name: "Cloudflare", logo: "/technologies/cloudflare-logo.png" },
  { name: "AWS", logo: "/technologies/aws-logo.png" },
  { name: "Android", logo: "/technologies/android-logo.png" },
  { name: "Vercel", logo: "/technologies/vercel-logo.png" },
  { name: "GitHub", logo: "/technologies/github-logo.png" },
  { name: "Next.js", logo: "/technologies/next.js-logo.png" },
  { name: "MongoDB", logo: "/technologies/mongodb-logo.png" },
  { name: "Jira", logo: "/technologies/jira-logo.png" },
  { name: "Google Cloud", logo: "/technologies/google-cloud-logo.png" },
  { name: "Git", logo: "/technologies/git-logo.png" },
  { name: "Flask", logo: "/technologies/flask-logo.png" },
  { name: "Express", logo: "/technologies/express-logo.png" },
  { name: "Azure", logo: "/technologies/azure-logo.png" },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive technology solutions to help your business thrive in the digital age. From web
            development to AI solutions, we've got you covered.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <GlassCard
              key={index}
              variant="service"
              className="p-8 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-4">
                  <service.icon className="text-5xl text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span className="text-white/60 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Success Projects
              </span>
            </h3>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
              Discover some of our recent successful projects that showcase our expertise and commitment to excellence.
            </p>
          </div>

          {/* Horizontally scrollable projects */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {projectsData.projects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-80 sm:w-96 snap-start">
                  <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300 group">
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-lg aspect-video">
                        <img
                          src={`/projects/${project.id}.jpg`}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Project details */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {project.title}
                          </h4>
                          <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <FaExternalLinkAlt className="text-sm" />
                          </Link>
                        </div>

                        <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{project.description}</p>

                        {/* Technologies used */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-white/20 text-white text-xs px-2 py-1 rounded-full border border-white/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Key features */}
                        <div className="space-y-1">
                          {project.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-green-400 rounded-full" />
                              <span className="text-white/60 text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Visit button */}
                        <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-200"
                          >
                            <FaGlobe className="mr-2 text-sm" />
                            Visit Live Site
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {projectsData.projects.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-white/30 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Technologies We Use</h3>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
              We leverage the latest and most reliable technologies to build robust, scalable solutions.
            </p>
          </div>

          {/* First marquee - left to right */}
          <div className="relative overflow-hidden w-full -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="flex animate-marquee space-x-16 py-6 px-4 sm:px-6 lg:px-8">
              {[...techLogos, ...techLogos].map((tech, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center">
                  <img
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second marquee - right to left */}
          <div className="relative overflow-hidden w-full -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="flex animate-marquee-reverse space-x-16 py-6 px-4 sm:px-6 lg:px-8">
              {[...techLogos.slice().reverse(), ...techLogos.slice().reverse()].map((tech, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center">
                  <img
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-105"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
