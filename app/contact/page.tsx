import type { Metadata } from "next"
import Contact from "@/components/sections/Contact"
import Navigation from "@/components/Navigation"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "Contact Us - NexCy Technologies",
  description:
    "Get in touch with NexCy Technologies. Contact us for your web development, mobile app, and software solution needs.",
  openGraph: {
    title: "Contact Us - NexCy Technologies",
    description:
      "Get in touch with NexCy Technologies. Contact us for your web development, mobile app, and software solution needs.",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navigation />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
