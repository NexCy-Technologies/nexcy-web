import type { Metadata } from "next"
import Services from "@/components/sections/Services"
import Navigation from "@/components/Navigation"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "Our Services - NexCy Technologies",
  description:
    "Explore our comprehensive technology services including web development, mobile apps, ERP/POS systems, AI/ML solutions, and IoT development.",
  openGraph: {
    title: "Our Services - NexCy Technologies",
    description:
      "Explore our comprehensive technology services including web development, mobile apps, ERP/POS systems, AI/ML solutions, and IoT development.",
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navigation />
      <main className="pt-20">
        <Services />
      </main>
      <Footer />
    </div>
  )
}
