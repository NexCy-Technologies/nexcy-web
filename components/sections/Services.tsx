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
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

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

function ProjectCard({
  project,
  index,
  total,
  containerProgress,
}: {
  project: any;
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
}) {
  // Define the exact range where this card is scaled and darkened by the NEXT card coming up
  // The card is pinned when containerProgress hits (index / total). 
  // It begins to scale down immediately as containerProgress moves towards ((index + 1) / total)
  const startRange = index / total;
  const endRange = (index + 1) / total;
  
  // 3. Define the exact scale/opacity curve
  const scale = useTransform(containerProgress, [startRange, endRange], [1, 0.92]);
  const overlayOpacity = useTransform(containerProgress, [startRange, endRange], [0, 0.6]); // ~40% darken is 60% black overlay

  // 1. Scroll/inview-triggered pan/zoom on the preview pane
  const imgScale = useTransform(containerProgress, [startRange, endRange], [1, 1.08]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-2 sm:px-4 py-8">
      <motion.div
        style={{ scale }}
        className="w-full max-w-5xl h-[85vh] sm:h-[75vh] md:h-[70vh] bg-[#0f1115] rounded-xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col relative"
      >
        {/* Fake Window Header */}
        <div className="h-10 bg-[#1a1d24] border-b border-gray-800 flex items-center px-4 flex-shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="mx-auto text-[10px] font-mono text-gray-500">
            ~/projects/{project.id}.json
          </div>
        </div>

        {/* Content Split - 2. Stack vertically on mobile, do not hide code pane */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Code Pane (Top on mobile, Left on desktop) */}
          <div className="w-full h-1/2 md:h-full md:w-1/2 p-4 sm:p-6 overflow-y-auto bg-[#0a0a0c] font-mono text-[10px] sm:text-xs leading-loose text-gray-300 scrollbar-hide">
            <div className="text-orange-400 inline">const</div> <div className="text-blue-400 inline">project</div> = {"{"}
            <div className="pl-4">
              <span className="text-gray-400">"title"</span>: <span className="text-green-400">"{project.title}"</span>,<br />
              <span className="text-gray-400">"category"</span>: <span className="text-green-400">"{project.category}"</span>,<br />
              <span className="text-gray-400">"technologies"</span>: [<br />
              {project.technologies.map((t: string) => (
                <div key={t} className="pl-4">
                  <span className="text-green-400">"{t}"</span>,
                </div>
              ))}
              ],<br />
              <span className="text-gray-400">"features"</span>: [<br />
              {project.features.map((f: string) => (
                <div key={f} className="pl-4">
                  <span className="text-green-400">"{f}"</span>,
                </div>
              ))}
              ],<br />
              <span className="text-gray-400">"description"</span>: <span className="text-green-400">"{project.description}"</span><br />
            </div>
            {"}"};
          </div>

          {/* Preview Pane (Bottom on mobile, Right on desktop) */}
          <div className="w-full h-1/2 md:h-full md:w-1/2 relative overflow-hidden bg-black border-t md:border-t-0 md:border-l border-gray-800">
            <motion.img
              style={{ scale: imgScale }}
              src={getMicrolicPreviewUrl(project.url)}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover object-top opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center">
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-md font-mono text-[10px] sm:text-xs">
                  [EXECUTE_PREVIEW]
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay for exact darken curve */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />
      </motion.div>
    </div>
  );
}

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  
  const projectsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          data-string-reveal
          initial={{ opacity: 0, y: 50 }}
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
                  data-string-reveal
                  data-string-reveal-delay={idx * 0.1}
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
        <div className="relative bg-[#050505] -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 py-16 sm:py-24 mt-16 sm:mt-24 border-y border-gray-900">
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
            <motion.div
              data-string-reveal
              initial={{ opacity: 0, y: 50 }}
              className="text-center mb-16 sm:mb-24"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Success Projects
                </span>
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                Real-world impact. Explore the architecture and output of our recent deployments.
              </p>
            </motion.div>

            <div ref={projectsRef} className="relative w-full" style={{ height: `${projectsData.projects.length * 100}vh` }}>
              {projectsData.projects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  total={projectsData.projects.length}
                  containerProgress={projectsProgress}
                />
              ))}
            </div>
          </div>
        </div>

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
              <div data-string-marquee className="flex gap-3 w-max">
                {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((tech, i) => (
                  <TechPill key={`r1-${i}`} tech={tech} />
                ))}
              </div>
            </div>

            {/* Row 2 — right to left, faster */}
            <div className="overflow-hidden mb-3">
              <div data-string-marquee="reverse" className="flex gap-3 w-max">
                {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((tech, i) => (
                  <TechPill key={`r2-${i}`} tech={tech} />
                ))}
              </div>
            </div>

            {/* Row 3 — left to right, slowest */}
            <div className="overflow-hidden">
              <div data-string-marquee className="flex gap-3 w-max">
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
          <Link href="/#contact">
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
