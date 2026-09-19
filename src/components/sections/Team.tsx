import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";

const teamMembers = [
  {
    id: "01",
    name: "Dinuka Lakshan",
    role: "Co-Founder & Lead Engineer",
    bio: "Full-stack architect specializing in scalable web and mobile infrastructure. Focused on building robust, high-performance systems and managing end-to-end product delivery.",
    skills: ["React", "Next.js", "Node.js", "TypeScript"]
  },
  {
    id: "02",
    name: "Devindu Dissanayake",
    role: "Co-Founder & Lead Engineer",
    bio: "Specialist in mobile applications and systems architecture. Passionate about creating seamless user experiences, resilient backends, and crafting pixel-perfect interfaces.",
    skills: ["Flutter", "Android", "Firebase", "Supabase"]
  }
];

const values = [
  {
    title: "Passion-Driven",
    description: "We are deeply invested in the craft of software engineering, building with intention and uncompromising care."
  },
  {
    title: "Detail-Obsessed",
    description: "Every pixel, every line of code matters. We hold ourselves to the highest standards of quality and maintainability."
  },
  {
    title: "Ship-First",
    description: "Ideas are cheap; execution is everything. We prioritize delivering working software early, iterating often based on feedback."
  },
  {
    title: "Client-Focused",
    description: "We align our technical decisions with your business goals, ensuring maximum impact and long-term value."
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
          {teamMembers.map((member) => (
            <Card key={member.id} className="flex flex-col h-full !p-8 md:!p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {member.name}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-base text-muted mb-8">
                {member.role}
              </p>
              <p className="font-[family-name:var(--font-inter)] text-muted leading-relaxed mb-12 flex-grow text-lg">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-3 mt-auto">
                {member.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 border border-[var(--border)] bg-transparent font-[family-name:var(--font-inter)] text-xs text-muted hover:text-foreground hover:border-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Values */}
        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted mb-8">Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, i) => (
              <div key={i} className="p-6 md:p-8 border border-[var(--border)] bg-transparent">
                <h4 className="text-base font-bold mb-4 text-foreground">{value.title}</h4>
                <p className="font-[family-name:var(--font-inter)] text-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
