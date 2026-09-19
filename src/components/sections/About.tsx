import { SectionLabel } from "@/components/ui/section-label";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BlurText } from "@/components/ui/blur-text";
import { Card } from "@/components/ui/card";
import { Zap, Users } from "lucide-react";

const manifestoItems = [
  {
    index: "01",
    title: "Engineering Excellence",
    text: "We build digital infrastructure that scales. Our team of experts turns complex problems into elegant, maintainable solutions, ensuring your products are robust from day one.",
  },
  {
    index: "02",
    title: "Radical Transparency",
    text: "No black boxes. We maintain open lines of communication, providing clear documentation and regular updates so you are always in the loop regarding your project's architecture and progress.",
  },
  {
    index: "03",
    title: "Continuous Innovation",
    text: "The tech landscape evolves rapidly, and so do we. We continuously explore new frameworks, AI integrations, and architectural patterns to keep your products ahead of the curve.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative border-t border-[var(--border)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <SectionLabel>WHO WE ARE</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mt-6 mb-8 max-w-4xl">
            <BlurText text="Building the digital future, one product at a time." animateBy="words" delay={70} />
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
            We are a collective of engineers, designers, and strategists dedicated to delivering exceptional digital experiences. By bridging the gap between cutting-edge technology and human-centric design, we build software that empowers businesses to thrive in a digital-first world.
          </p>
        </div>

        {/* Manifesto Section */}
        <div className="mb-24">
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted mb-8">Manifesto</h3>
          <div className="flex flex-col border-t border-[var(--border)]">
            {manifestoItems.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row border-b border-[var(--border)] group hover:bg-[var(--surface)] transition-colors">
                <div className="md:w-1/4 p-6 md:p-8 lg:p-12 flex items-center md:items-start shrink-0">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-mono text-muted/20 group-hover:text-muted/40 transition-colors tracking-tighter">
                    {item.index}
                  </span>
                </div>
                <div className="md:w-3/4 p-6 md:p-8 lg:p-12 md:border-l border-[var(--border)] flex flex-col justify-center">
                  <h4 className="text-xl md:text-2xl font-bold mb-4 text-foreground">{item.title}</h4>
                  <p className="font-[family-name:var(--font-inter)] text-muted text-base md:text-lg leading-relaxed max-w-3xl">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars Section */}
        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted mb-8">Core Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card className="flex flex-col">
              <Zap className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h4 className="text-xl font-bold mb-4 text-foreground">Innovation First</h4>
              <p className="font-[family-name:var(--font-inter)] text-muted leading-relaxed">
                We thrive on solving complex technical challenges and pushing the boundaries of what&apos;s possible. From AI-driven analytics to real-time distributed systems, we leverage the best tools to build future-proof solutions.
              </p>
            </Card>
            <Card className="flex flex-col">
              <Users className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h4 className="text-xl font-bold mb-4 text-foreground">Client-Centric</h4>
              <p className="font-[family-name:var(--font-inter)] text-muted leading-relaxed">
                Your success is our success. We partner closely with our clients to deliver solutions that drive real business impact, adapting our process to integrate seamlessly with your team&apos;s workflow and objectives.
              </p>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
}
