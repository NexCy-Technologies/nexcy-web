import type { Metadata } from "next"
import Team from "@/components/sections/Team"
import Navigation from "@/components/Navigation"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "Our Team - NexCy Technologies",
  description:
    "Meet the talented team behind NexCy Technologies - experienced developers and technology experts dedicated to your success.",
  openGraph: {
    title: "Our Team - NexCy Technologies",
    description:
      "Meet the talented team behind NexCy Technologies - experienced developers and technology experts dedicated to your success.",
  },
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navigation />
      <main className="pt-20">
        <Team />
      </main>
      <Footer />
    </div>
  )
}
