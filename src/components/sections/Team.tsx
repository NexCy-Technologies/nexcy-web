import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Code2, Server, Flame, Microscope, Rocket, Users, Mail } from "lucide-react";
import { FadeUpStagger } from "@/components/ui/fade-up-stagger";

const teamMembers = [
  {
    id: "01",
    badge: "CO-FOUNDER",
    name: "Dinuka Lakshan",
    role: "Frontend & Mobile Developer",
    icon: Server,
    bio: "Specialized in creating responsive web applications and cross-platform mobile apps with modern frameworks. The leader behind Nexcy's tech vision.",
    skills: ["React", "Next.js", "Flutter", "React Native", "JavaScript"],
    email: "dinuka@nexcy.lk",
    letter: "D"
  },
  {
    id: "02",
    badge: "CO-FOUNDER",
    name: "Devindu Dissanayake",
    role: "Backend & DevOps Engineer",
    icon: Code2,
    bio: "Expert in building scalable backend systems, cloud infrastructure, and implementing robust DevOps practices for seamless deployment and maintenance.",
    skills: ["Node.js", "Python", "AWS", "Docker", "Kubernetes"],
    email: "devindu@nexcy.lk",
    letter: "D"
  }
];

const values = [
  {
    title: "Passion-Driven",
    description: "We are deeply invested in the craft of software engineering, building with intention and uncompromising care.",
    icon: Flame
  },
  {
    title: "Detail-Obsessed",
    description: "Every pixel, every line of code matters. We hold ourselves to the highest standards of quality and maintainability.",
    icon: Microscope
  },
  {
    title: "Ship-First",
    description: "Ideas are cheap; execution is everything. We prioritize delivering working software early, iterating often based on feedback.",
    icon: Rocket
  },
  {
    title: "Client-Focused",
    description: "We align our technical decisions with your business goals, ensuring maximum impact and long-term value.",
    icon: Users
  }
];

export function Team() {
  return (
    <section className="py-24 md:py-32 relative border-t border-[var(--border)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 md:mb-24">
          <SectionLabel>THE TEAM</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-6 mb-8 max-w-4xl">
            Who we are
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
            A lean, highly focused duo dedicated to delivering technical excellence without the bloat.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <FadeUpStagger key={member.id} index={index}>
                <Card className="flex flex-col h-full !p-8 md:!p-12 hover:border-[var(--accent)] transition-colors duration-300 group relative overflow-hidden border-l-2 border-l-transparent hover:border-l-[var(--accent)]">
                  {/* Background Letter */}
                  <div className="absolute -bottom-10 -right-4 text-[180px] font-bold text-foreground/5 leading-none select-none z-0">
                    {member.letter}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <span className="inline-block bg-[var(--accent)] text-background font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                        {member.badge}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-base text-[var(--accent)] font-semibold mb-6">
                      {member.role}
                    </p>

                    <div className="w-12 h-px bg-border mb-6"></div>

                    <p className="font-[family-name:var(--font-inter)] text-muted leading-relaxed mb-10 flex-grow text-lg">
                      {member.bio}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-4">
                        EXPERTISE
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-4 py-1.5 rounded-full border border-[var(--border)] bg-transparent font-[family-name:var(--font-inter)] text-xs text-muted hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto border-t border-[var(--border)] pt-6">
                      <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors w-fit">
                        <Mail className="w-4 h-4" />
                        <span className="font-[family-name:var(--font-inter)]">{member.email}</span>
                      </a>
                    </div>
                  </div>
                </Card>
          </FadeUpStagger>
        );
      })}
    </div>

        {/* Values */}
        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted mb-8">Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <FadeUpStagger key={index} index={index}>
                  <div className="p-6 md:p-8 border border-[var(--border)] bg-transparent h-full flex flex-col">
                    <Icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                    <h4 className="text-base font-bold mb-4 text-foreground">{value.title}</h4>
                    <p className="font-[family-name:var(--font-inter)] text-sm text-muted leading-relaxed flex-grow">
                      {value.description}
                    </p>
                  </div>
                </FadeUpStagger>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
