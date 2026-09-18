import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/components/sections/Hero"
import Navigation from "@/components/Navigation"
import { LazySection } from "@/components/ui/lazy-section"
import { SkipLink } from "@/components/ui/skip-link"

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg" />,
})

const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100 rounded-lg" />,
})

const Team = dynamic(() => import("@/components/sections/Team"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-gray-100 rounded-lg" />,
})

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg" />,
})

const Footer = dynamic(() => import("@/components/sections/Footer"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100 rounded-lg" />,
})

export const metadata: Metadata = {
  title: "NexCy Technologies",
  description:
    "NexCy Technologies, our mission, vision, and commitment to delivering innovative technology solutions.",
  keywords:
    "nexcy, nexcytech, technology, software company, about us, company profile, mission, vision",
  openGraph: {
    title: "NexCy Technologies",
    description:
      "NexCy Technologies, our mission, vision, and commitment to delivering innovative technology solutions.",
    url: "https://www.nexcy.lk",
    siteName: "NexCy Technologies",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NexCy Technologies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    twitter: {
    card: "summary_large_image",
    title: "NexCy Technologies",
    description:
      "NexCy Technologies, our mission, vision, and commitment to delivering innovative technology solutions.",
    images: ["/og-image.jpg"],
  },
}


export default function AboutPage() {
  return (
    <>
      <SkipLink />
      <div className="min-h-screen overflow-x-hidden">
        {/* Hero Section with dark background */}
        <div className="bg-gradient-to-br from-black via-orange-950 to-black" id="home">
          <Navigation />
          <Hero />
        </div>

        {/* Main content with light background */}
        <main id="main-content" tabIndex={-1} className="bg-[#fffaf5]">
          {/* About Section */}
          <LazySection>
            <About />
          </LazySection>

          {/* Services Section */}
          <LazySection>
            <Services />
          </LazySection>

          {/* Team Section */}
          <LazySection>
            <Team />
          </LazySection>

          {/* Contact Section */}
          <LazySection>
            <Contact />
          </LazySection>
        </main>

        {/* Footer - separate from main content */}
        <LazySection>
          <Footer />
        </LazySection>
      </div>
    </>
  )
}