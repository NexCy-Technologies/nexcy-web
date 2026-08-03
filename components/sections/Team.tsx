"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Dinuka Lakshan",
    role: "Frontend & Mobile Developer",
    email: "dinuka@nexcy.lk",
    bio: "Specialized in creating responsive web applications and cross-platform mobile apps with modern frameworks. The leader behind Nexcy's tech vision.",
    skills: ["React", "Next.js", "Flutter", "React Native", "JavaScript"],
    tag: "Co-Founder",
    initial: "D",
    gradient: "from-orange-400 to-orange-500",
  },
  {
    name: "Devindu Dissanayake",
    role: "Backend & DevOps Engineer",
    email: "devindu@nexcy.lk",
    bio: "Expert in building scalable backend systems, cloud infrastructure, and implementing robust DevOps practices for seamless deployment and maintenance.",
    skills: ["Node.js", "Python", "AWS", "Docker", "Kubernetes"],
    tag: "Co-Founder",
    initial: "D",
    gradient: "from-orange-500 to-orange-600",
  },
]

const values = [
  { label: "Passion-Driven",  description: "We build things we're proud of" },
  { label: "Detail-Obsessed", description: "Every pixel, every line of code" },
  { label: "Ship-First",      description: "Ideas into products, fast" },
  { label: "Client-Focused",  description: "Your success is our benchmark" },
]

export default function Team() {
  return (
    <section
      id="team"
      className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#fffaf5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          data-string-reveal
          initial={{ opacity: 0, y: 40 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-5 px-2">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Two builders on a mission — crafting digital products that matter, with the belief that hard work makes the dream work.
          </p>
        </motion.div>

        {/* ── Team Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              data-string-reveal
              data-string-reveal-delay={index * 0.15}
              className="h-full"
            >
              <div className="relative bg-background rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group h-full flex flex-col">

                {/* Left accent border */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${member.gradient}`} />

                {/* Ghost initial — decorative background letter */}
                <div
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-6 text-[10rem] sm:text-[12rem] font-black leading-none text-orange-500/[0.04] select-none pointer-events-none"
                >
                  {member.initial}
                </div>

                {/* Card body */}
                <div className="relative pl-8 pr-6 sm:pl-10 sm:pr-8 pt-6 sm:pt-8 pb-6 sm:pb-8 flex flex-col flex-1">

                  {/* Co-founder tag */}
                  <span className={`self-start mb-3 sm:mb-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${member.gradient} text-white`}>
                    {member.tag}
                  </span>

                  {/* Name */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors duration-300">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-xs sm:text-sm text-orange-500 font-semibold mb-4 sm:mb-5">
                    {member.role}
                  </p>

                  {/* Divider */}
                  <div className="w-8 h-px bg-orange-200 mb-4 sm:mb-5" />

                  {/* Bio */}
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="mb-5 sm:mb-6">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2.5">
                      Expertise
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-orange-50 text-orange-600 text-[11px] sm:text-xs font-medium rounded-full border border-orange-100 hover:bg-orange-100 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Email — pinned to bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-orange-500 transition-colors duration-200 group/link"
                    >
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="group-hover/link:underline underline-offset-2">{member.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Values strip ── */}
        <motion.div
          data-string-reveal
          initial={{ opacity: 0, y: 30 }}
          className="mb-14 sm:mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-orange-100 border border-orange-100 rounded-2xl overflow-hidden bg-background">
            {values.map((v, i) => (
              <motion.div
                key={i}
                data-string-reveal
                data-string-reveal-delay={i * 0.08}
                className="px-5 py-5 sm:px-6 sm:py-6 group hover:bg-orange-50 transition-colors duration-300"
              >
                <p className="text-sm sm:text-base font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                  {v.label}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          data-string-reveal
          initial={{ opacity: 0, y: 30 }}
          className="text-center"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">
            Ready to Work With Us?
          </h3>
          <p className="text-gray-500 mb-6 sm:mb-8 max-w-xl mx-auto text-xs sm:text-sm px-4 leading-relaxed">
            Let's discuss your project and see how our team can help bring your vision to life.
          </p>
          <a href="mailto:contact@nexcy.lk">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Contact Our Team
            </Button>
          </a>
        </motion.div>

      </div>
    </section>
  )
}