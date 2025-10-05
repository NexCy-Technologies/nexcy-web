"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const teamMembers = [
  {
    name: "Dinuka Lakshan",
    role: "Frontend & Mobile Developer",
    email: "dinuka@nexcy.lk",
    github: "dinuka-lakshan",
    bio: "Specialized in creating responsive web applications and cross-platform mobile apps with modern frameworks.The leader behind Nexcy's tech vision.",
    skills: ["React", "Next.js", "Flutter", "React Native", "JavaScript"],
    image: "/team/dinuka.png",
  },
  {
    name: "Devindu Dissanayake",
    role: "Backend & DevOps Engineer",
    email: "devindu@nexcy.lk",
    github: "devindu-dissanayake",
    bio: "Expert in building scalable backend systems, cloud infrastructure, and implementing robust DevOps practices for seamless deployment and maintenance. Your go to guy for all things backend and cloud.",
    skills: ["Node.js", "Python", "AWS", "Docker", "Kubernetes"],
    image: "/team/devindu.png",
  },
  {
    name: "Kaviru De Silva",
    role: "UI/UX Designer",
    email: "kaviru@nexcy.lk",
    github: "kaviru-desilva",
    bio: "Creative designer focused on crafting intuitive user experiences and beautiful interfaces that engage users and drive business results.The mind behind Nexcy's stunning designs.",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Prototyping"],
    image: "/team/kaviru.png",
  },
]

export default function Team() {
  return (
    <section id="team" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#fffaf5] overflow-hidden">
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
            Meet Our{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            A group of yougsters embarking on an adventure doing what they enjoy the most. The people who make Nexcy what it is, with specilization's in different fields, working towards a common goal believing that hardwork can make the dream work.
          </p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              className="group cursor-pointer"
            >
              <div className="p-4 sm:p-6 text-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="space-y-4 sm:space-y-6">
                  {/* Profile image */}
                  <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-orange-200/50 group-hover:ring-orange-400/70 transition-all duration-300">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={`${member.name} - ${member.role}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 96px, 128px"
                    />
                  </div>

                  {/* Member info */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-orange-500 font-medium text-sm sm:text-base">{member.role}</p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Expertise</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 sm:px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-200/50 hover:bg-orange-100 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="pt-3 sm:pt-4 border-t border-orange-100 space-y-2 sm:space-y-3">
                    <div className="flex flex-col space-y-2 sm:space-y-3">
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center justify-center sm:justify-start space-x-2 text-orange-500 hover:text-orange-600 transition-colors text-xs sm:text-sm font-medium break-all sm:break-normal"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span className="text-center sm:text-left">{member.email}</span>
                      </a>
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center sm:justify-start space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm font-medium"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="text-center sm:text-left">{member.github}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {[
            {
              value: "100%",
              label: "Cloud Native",
              description: "Scalable architecture"
            },
            {
              value: "Zero",
              label: "Downtime Deploy",
              description: "Seamless updates"
            },
            {
              value: "24/7",
              label: "Support Available",
              description: "Always here to help"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
            >
              <div className="p-6 sm:p-8 text-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">{stat.value}</div>
                <div className="text-gray-700 font-medium text-sm sm:text-base">{stat.label}</div>
                <div className="text-gray-500 text-xs sm:text-sm mt-2">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ 
            duration: 0.7, 
            delay: 0.4,
            ease: "easeOut"
          }}
          className="text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">Ready to Work With Us?</h3>
          <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
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