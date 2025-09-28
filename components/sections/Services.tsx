"use client";

import Link from "next/link";
import { FaGlobe, FaBriefcase, FaMobile, FaCog, FaRobot, FaNetworkWired, FaExternalLinkAlt } from "react-icons/fa";
import projectsData from "@/data/projects.json";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
];

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
];

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#fffaf5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            We offer comprehensive technology solutions to help your business thrive in the digital age. From web development to AI solutions, we've got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.1,
                ease: "easeOut"
              }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-auto min-h-[250px] sm:min-h-[280px]"
            >
              {/* Default Content */}
              <div className="p-4 sm:p-5 md:p-6 transition-all duration-500 md:group-hover:blur-sm md:group-hover:opacity-30 h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <service.icon className="text-2xl sm:text-3xl md:text-4xl text-orange-500" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed">{service.description}</p>
              </div>

              {/* Hover Content - Desktop Only */}
              <div className="hidden md:flex absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 p-4 sm:p-5 md:p-6 flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-full group-hover:translate-y-0">
                <div className="text-center mb-4">
                  <p className="text-orange-100 text-sm leading-relaxed mb-6">{service.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center space-x-3 text-sm text-white">
                      <span className="w-2 h-2 bg-orange-200 rounded-full flex-shrink-0" />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 sm:mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Success Projects
              </span>
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Discover some of our recent successful projects that showcase our expertise and commitment to excellence.
            </p>
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-3 sm:-mx-0 px-3 sm:px-0">
            {projectsData.projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.1,
                  ease: "easeOut"
                }}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96 snap-start group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-auto">
                  {/* Default Content */}
                  <div className="transition-all duration-500 md:group-hover:blur-sm md:group-hover:opacity-40">
                    <div className="relative overflow-hidden rounded-t-xl aspect-video">
                      <img
                        src={`/projects/${project.id}.jpg`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="bg-orange-500/90 text-white text-xs px-2 sm:px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 flex-1 pr-2 leading-tight">{project.title}</h4>
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:text-orange-600 transition-colors duration-300 flex-shrink-0"
                        >
                          <FaExternalLinkAlt className="text-xs sm:text-sm" />
                        </Link>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">{project.description}</p>
                    </div>
                  </div>

                  {/* Hover Content - Desktop Only */}
                  <div className="hidden md:flex absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 p-4 sm:p-6 flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-full group-hover:translate-y-0 rounded-xl">
                    <div className="text-center mb-3 sm:mb-4">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{project.title}</h4>
                      <p className="text-orange-100 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 justify-center">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-white/20 text-white text-xs px-2 py-1 rounded-full border border-white/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-orange-200 rounded-full flex-shrink-0" />
                          <span className="text-white text-xs sm:text-sm leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 font-medium rounded-lg transition-all duration-300 text-xs sm:text-sm py-2">
                        <FaGlobe className="mr-2 text-xs sm:text-sm" />
                        Visit Live Site
                        <FaExternalLinkAlt className="ml-auto text-xs sm:text-sm" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies We Use */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Technologies{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                We Use
              </span>
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              We leverage the latest and most reliable technologies to build robust, scalable solutions.
            </p>
          </div>
          
          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            @keyframes marquee-reverse {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0%);
              }
            }
            
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
            
            .animate-marquee-reverse {
              animation: marquee-reverse 40s linear infinite;
            }
            
            .marquee-container:hover .animate-marquee,
            .marquee-container:hover .animate-marquee-reverse {
              animation-play-state: paused;
            }

            @media (max-width: 640px) {
              .animate-marquee {
                animation: marquee 25s linear infinite;
              }
              .animate-marquee-reverse {
                animation: marquee-reverse 25s linear infinite;
              }
            }
          `}</style>
          
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative overflow-hidden w-full marquee-container"
          >
            <div className="flex animate-marquee space-x-6 sm:space-x-8 md:space-x-16 py-4 sm:py-6">
              {[...techLogos, ...techLogos, ...techLogos].map((tech, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
                  <img
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    className="h-6 sm:h-8 md:h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative overflow-hidden w-full marquee-container"
          >
            <div className="flex animate-marquee-reverse space-x-6 sm:space-x-8 md:space-x-16 py-4 sm:py-6">
              {[...techLogos.slice().reverse(), ...techLogos.slice().reverse(), ...techLogos.slice().reverse()].map((tech, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
                  <img
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    className="h-6 sm:h-8 md:h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ 
            duration: 0.7, 
            delay: 0.3,
            ease: "easeOut"
          }}
          className="text-center mt-12 sm:mt-16"
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}