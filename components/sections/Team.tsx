"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const teamMembers = [
  {
    name: "Dinuka Lakshan",
    role: "Frontend & Mobile Developer",
    email: "dinuka@nexcy.lk",
    bio: "Specialized in creating responsive web applications and cross-platform mobile apps with modern frameworks. The leader behind Nexcy's tech vision.",
    skills: ["React", "Next.js", "Flutter", "React Native", "JavaScript"],
    image: "/team/dinuka.png",
    accent: "from-orange-400 to-orange-500",
    tag: "Co-Founder",
  },
  {
    name: "Devindu Dissanayake",
    role: "Backend & DevOps Engineer",
    email: "devindu@nexcy.lk",
    bio: "Expert in building scalable backend systems, cloud infrastructure, and implementing robust DevOps practices for seamless deployment and maintenance.",
    skills: ["Node.js", "Python", "AWS", "Docker", "Kubernetes"],
    image: "/team/devindu.png",
    accent: "from-orange-500 to-orange-600",
    tag: "Co-Founder",
  },
]

const stats = [
  { value: "🔥", label: "Passion-Driven", description: "We build things we're proud of" },
  { value: "🎯", label: "Detail-Obsessed", description: "Every pixel, every line of code" },
  { value: "🚀", label: "Ship-First", description: "Ideas turned into products fast" },
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.65, delay: index * 0.15, ease: "easeOut" }}
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group h-full flex flex-col">

                {/* Top accent bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${member.accent}`} />

                {/* Card body */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">

                  {/* Header row */}
                  <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-orange-100 group-hover:ring-orange-300 transition-all duration-300`}>
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={`${member.name}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Co-founder badge */}
                      <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                        {member.tag}
                      </span>
                    </div>

                    {/* Name + role */}
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-0.5 group-hover:text-orange-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-orange-500 font-medium leading-tight">
                        {member.role}
                      </p>
                    </div>
                  </div>

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

                  {/* Spacer pushes email to bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200 group/link"
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

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 mb-14 sm:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                {stat.value}
              </div>
              <div className="text-gray-900 font-bold text-xs sm:text-sm md:text-base leading-tight mb-1 sm:mb-1.5">
                {stat.label}
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs leading-snug hidden sm:block">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
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
