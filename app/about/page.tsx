import type { Metadata } from "next"
import About from "@/components/sections/About"
import Navigation from "@/components/Navigation"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "About Us - NexCy Technologies",
  description:
    "Learn about NexCy Technologies, our mission, vision, and commitment to delivering innovative technology solutions.",
  openGraph: {
    title: "About Us - NexCy Technologies",
    description:
      "Learn about NexCy Technologies, our mission, vision, and commitment to delivering innovative technology solutions.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navigation />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </div>
  )
}
