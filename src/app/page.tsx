import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Team />
      <Services />
      <Technologies />
      <Work />
    </main>
  );
}
