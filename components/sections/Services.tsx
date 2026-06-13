"use client";

import Link from "next/link";
import {
  FaGlobe,
  FaBriefcase,
  FaMobile,
  FaCog,
  FaRobot,
  FaNetworkWired,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";
import projectsData from "@/data/projects.json";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built with cutting-edge technologies.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure"],
    icon: FaGlobe,
  },
  {
    title: "ERP/POS Systems",
    description:
      "Comprehensive enterprise resource planning and point-of-sale solutions for your business.",
    features: [
      "Inventory Management",
      "Sales Tracking",
      "Reporting",
      "Multi-location",
    ],
    icon: FaBriefcase,
  },
  {
    title: "Mobile Apps",
    description:
      "Native Android and iOS applications that deliver exceptional user experiences.",
    features: [
      "Cross-platform",
      "Native Performance",
      "App Store Ready",
      "Push Notifications",
    ],
    icon: FaMobile,
  },
  {
    title: "Software Development",
    description:
      "Custom software solutions tailored to your specific business requirements.",
    features: [
      "Custom Solutions",
      "Scalable Architecture",
      "API Integration",
      "Cloud Ready",
    ],
    icon: FaCog,
  },
  {
    title: "AI/ML Solutions",
    description:
      "Intelligent systems powered by machine learning and artificial intelligence.",
    features: [
      "Predictive Analytics",
      "Automation",
      "Data Processing",
      "Smart Insights",
    ],
    icon: FaRobot,
  },
  {
    title: "IoT Development",
    description:
      "Internet of Things solutions connecting devices and enabling smart automation.",
    features: [
      "Device Integration",
      "Real-time Monitoring",
      "Data Analytics",
      "Remote Control",
    ],
    icon: FaNetworkWired,
  },
];

const techLogos = [
  { name: "React", logo: "/technologies/react-logo.png" },
  { name: "Next.js", logo: "/technologies/next.js-logo.png" },
  { name: "TailwindCSS", logo: "/technologies/tailwind-css-logo.png" },
  { name: "Flutter", logo: "/technologies/flutter-logo.png" },
  { name: "Android", logo: "/technologies/android-logo.png" },
  { name: "Node.js", logo: "/technologies/nodejs-logo.png" },
  { name: "Laravel", logo: "/technologies/laravel-logo.png" },
  { name: "Python", logo: "/technologies/python-logo.png" },
  { name: "Flask", logo: "/technologies/flask-logo.png" },
  { name: "Express", logo: "/technologies/express-logo.png" },
  { name: "MongoDB", logo: "/technologies/mongodb-logo.png" },
  { name: "Firebase", logo: "/technologies/firebase-logo.png" },
  { name: "AWS", logo: "/technologies/aws-logo.png" },
  { name: "Azure", logo: "/technologies/azure-logo.png" },
  { name: "Google Cloud", logo: "/technologies/google-cloud-logo.png" },
  { name: "Cloudflare", logo: "/technologies/cloudflare-logo.png" },
  { name: "Vercel", logo: "/technologies/vercel-logo.png" },
  { name: "GitHub", logo: "/technologies/github-logo.png" },
  { name: "Git", logo: "/technologies/git-logo.png" },
  { name: "Jira", logo: "/technologies/jira-logo.png" },
];

const ROW_1 = techLogos.slice(0, 7);
const ROW_2 = techLogos.slice(7, 14);
const ROW_3 = techLogos.slice(14);

function getMicrolicPreviewUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url&meta=false`;
}

function TechPill({ tech }: { tech: { name: string; logo: string } }) {
  return (
    <div className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-gray-100 hover:border-orange-300 hover:shadow-sm hover:shadow-orange-100 transition-all duration-300 cursor-default flex-shrink-0">
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        <img
          src={tech.logo}
          alt={tech.name}
          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-300"
          loading="lazy"
        />
      </div>
      <span className="text-xs font-medium text-gray-500 group-hover:text-orange-500 transition-colors duration-300 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#fffaf5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-6 px-2">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            We offer comprehensive technology solutions to help your business
            thrive in the digital age. From web development to AI solutions,
            we've got you covered.
          </p>
        </motion.div>

        {/* ── Services Grid with expand-in-place ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16 sm:mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, idx) => {
              const isOpen = activeService === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`rounded-2xl bg-white shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer ${
                    isOpen ? "shadow-xl ring-2 ring-orange-400/40" : "hover:shadow-lg"
                  }`}
                  onClick={() =>
                    setActiveService(isOpen ? null : idx)
                  }
                >
                  {/* Card Header — always visible */}
                  <div className="flex items-center gap-4 p-5 sm:p-6">
                    <div
                      className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-orange-400 to-orange-600"
                          : "bg-orange-50"
                      }`}
                    >
                      <service.icon
                        className={`text-lg transition-colors duration-300 ${
                          isOpen ? "text-white" : "text-orange-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "border-orange-500 bg-orange-500 text-white rotate-45"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="6" y1="1" x2="6" y2="11" />
                        <line x1="1" y1="6" x2="11" y2="6" />
                      </svg>
                    </span>
                  </div>

                  {/* Expandable body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-gray-100 pt-4">
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                            {service.description}
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((feat, fidx) => (
                              <li
                                key={fidx}
                                className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700"
                              >
                                <FaCheckCircle className="text-orange-500 flex-shrink-0 text-xs" />
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Success Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 sm:mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Success Projects
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto px-4">
              Discover some of our recent successful projects that showcase our
              expertise and commitment to excellence.
            </p>
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-3 sm:-mx-0 px-3 sm:px-0">
            {projectsData.projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96 snap-start"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white group">
                  {/* Live screenshot preview */}
                  <div className="relative overflow-hidden aspect-video bg-gray-100">
                    <img
                      src={getMicrolicPreviewUrl(project.url)}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-orange-500/90 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight flex-1">
                        {project.title}
                      </h4>
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-orange-500 hover:text-orange-600 transition-colors mt-0.5"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Visit ${project.title}`}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                      </Link>
                    </div>

                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-1.5 mb-4">
                      {project.features.slice(0, 4).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                          <span className="text-xs text-gray-600 leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-xs rounded-lg transition-all duration-300"
                      >
                        <FaGlobe className="mr-1.5 text-xs" />
                        Visit Live Site
                        <FaExternalLinkAlt className="ml-auto text-xs" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Technologies We Use ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Technologies{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                We Use
              </span>
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              We leverage the latest and most reliable technologies to build
              robust, scalable solutions.
            </p>
          </div>

          <style jsx>{`
            @keyframes scroll-ltr {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scroll-rtl {
              0%   { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .track-ltr  { animation: scroll-ltr 28s linear infinite; }
            .track-rtl  { animation: scroll-rtl 22s linear infinite; }
            .track-ltr2 { animation: scroll-ltr 35s linear infinite; }
            .marquee-wrap:hover .track-ltr,
            .marquee-wrap:hover .track-rtl,
            .marquee-wrap:hover .track-ltr2 { animation-play-state: paused; }
          `}</style>

          {/* Outer container — clips rows and adds edge fades */}
          <div
            className="marquee-wrap relative overflow-hidden -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-0"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            {/* Row 1 — left to right, normal speed */}
            <div className="overflow-hidden mb-3">
              <div className="track-ltr flex gap-3 w-max">
                {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((tech, i) => (
                  <TechPill key={`r1-${i}`} tech={tech} />
                ))}
              </div>
            </div>

            {/* Row 2 — right to left, faster */}
            <div className="overflow-hidden mb-3">
              <div className="track-rtl flex gap-3 w-max">
                {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((tech, i) => (
                  <TechPill key={`r2-${i}`} tech={tech} />
                ))}
              </div>
            </div>

            {/* Row 3 — left to right, slowest */}
            <div className="overflow-hidden">
              <div className="track-ltr2 flex gap-3 w-max">
                {[...ROW_3, ...ROW_1.slice(0, 3), ...ROW_3, ...ROW_1.slice(0, 3), ...ROW_3, ...ROW_1.slice(0, 3)].map((tech, i) => (
                  <TechPill key={`r3-${i}`} tech={tech} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
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
