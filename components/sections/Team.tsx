"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const teamMembers = [
  {
    name: "Dinuka Lakshan",
    role: "Chief Executive Officer",
    email: "dinuka@nexcy.lk",
    bio: "Chief Executive Officer leading the company with a bold vision for innovation, sustainable growth, and client success. Dinuka is passionate about building high-performing teams and delivering exceptional value to clients.",
    skills: ["React", "Node.js", "Flutter", "Firebase", "Leadership"],
    image: "/dinuka.png",
  },
  {
    name: "Devindu Dissanayake",
    role: "Chief Technology Officer",
    email: "devindu@nexcy.lk",
    bio: "Chief Technology Officer driving technical strategy, fostering innovation, and ensuring engineering excellence across all teams. Devindu specializes in scalable architectures and emerging technologies.",
    skills: ["DevOps", "React Native", "Swift", "Kotlin", "Cloud Computing"],
    image: "/devindu.png",
  },
  {
    name: "Dasith",
    role: "Chief Operating Officer",
    email: "dasith@nexcy.lk",
    bio: "Chief Operating Officer ensuring seamless project execution, operational excellence, and efficient resource management throughout the organization. Dasith is dedicated to optimizing processes and delivering results.",
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science", "Project Management"],
    image: "/dasith.png",
  },
  {
    name: "Kaviru De Silva",
    role: "Chief Creative Officer",
    email: "kaviru@nexcy.lk",
    bio: "Creative visionary leading design, branding, and user experience for innovative digital products. Kaviru crafts compelling visual identities and intuitive interfaces that delight users.",
    skills: ["UI/UX Design", "AI/ML", "AWS", "Figma", "Branding"],
    image: "/kaviru.png",
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Our talented team of developers, designers, and engineers are passionate about creating exceptional digital
            experiences that drive results.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <GlassCard
              key={index}
              variant="team"
              className="p-6 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className="space-y-6">
                {/* Profile image */}
                <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/20 group-hover:ring-blue-400/50 transition-all duration-300">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 128px"
                  />
                </div>

                {/* Member info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-blue-400 font-medium">{member.role}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white/80">Expertise</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="pt-4 border-t border-white/20">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{member.email}</span>
                  </a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Team stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <GlassCard className="p-8 text-center">
            <div className="text-4xl font-bold text-white mb-2">4+</div>
            <div className="text-white/60">Years Experience</div>
            <div className="text-white/40 text-sm mt-2">Average team experience</div>
          </GlassCard>
          <GlassCard className="p-8 text-center">
            <div className="text-4xl font-bold text-white mb-2">20+</div>
            <div className="text-white/60">Projects Delivered</div>
            <div className="text-white/40 text-sm mt-2">Successful completions</div>
          </GlassCard>
          <GlassCard className="p-8 text-center">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/60">Support Available</div>
            <div className="text-white/40 text-sm mt-2">Always here to help</div>
          </GlassCard>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Work With Us?</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how our experienced team can help bring your vision to life.
          </p>
          <a href="mailto:contact@nexcy.lk">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-105"
            >
              Contact Our Team
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
