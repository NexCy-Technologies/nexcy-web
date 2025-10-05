import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/components/sections/Hero"
import Navigation from "@/components/Navigation"
import { LazySection } from "@/components/ui/lazy-section"
import { SkipLink } from "@/components/ui/skip-link"

const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-white/5 rounded-lg" />,
})

const Team = dynamic(() => import("@/components/sections/Team"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-white/5 rounded-lg" />,
})

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-lg" />,
})

const Footer = dynamic(() => import("@/components/sections/Footer"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-white/5 rounded-lg" />,
})

export const metadata: Metadata = {
  title: "Services - NexCy Technologies",
  description:
    "Explore the innovative services offered by NexCy Technologies, including web development, mobile apps, ERP/POS systems, AI/ML solutions, IoT development, and custom software solutions.",
  keywords:
    "nexcy services, web development, mobile apps, ERP, POS, AI, ML, IoT, software solutions, technology company sri lanka",
  openGraph: {
    title: "Services - NexCy Technologies",
    description:
      "Discover NexCy Technologies' services: modern web development, mobile applications, ERP/POS systems, AI/ML, IoT, and custom software solutions.",
    url: "https://nexcy.lk/services",
    siteName: "NexCy Technologies",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NexCy Technologies Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - NexCy Technologies",
    description:
      "Explore NexCy Technologies' services: web development, mobile apps, ERP/POS, AI/ML, IoT, and custom software solutions.",
    images: ["/og-image.jpg"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NexCy Technologies",
  url: "https://nexcy.lk",
  logo: "https://nexcy.lk/logo.png",
  description:
    "Leading technology company providing web development, mobile apps, ERP/POS systems, AI/ML solutions, IoT development, and custom software solutions.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "LK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+94725299199",
    contactType: "customer service",
    email: "contact@nexcy.lk",
  },
  sameAs: [
    "https://www.facebook.com/nexcytechnologies",
    "https://www.instagram.com/nexcytechnologies",
    "https://www.linkedin.com/company/nexcy-technologies",
  ],
  offers: {
    "@type": "AggregateOffer",
    offerCount: 6,
    offers: [
      { "@type": "Offer", name: "Web Development", description: "Modern, responsive websites and web applications" },
      { "@type": "Offer", name: "Mobile App Development", description: "Native Android and iOS applications" },
      { "@type": "Offer", name: "ERP/POS Systems", description: "Enterprise resource planning and POS solutions" },
      { "@type": "Offer", name: "AI/ML Solutions", description: "Intelligent systems powered by machine learning" },
      { "@type": "Offer", name: "IoT Development", description: "IoT solutions enabling smart automation" },
      { "@type": "Offer", name: "Software Development", description: "Custom software solutions for businesses" },
    ],
  },
}

export default function ServicesPage() {
  return (
    <>
      <SkipLink />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black">
        <Navigation />

        <main id="main-content" tabIndex={-1}>
          {/* Hero Section */}
          <section id="home">
            <Hero />
          </section>

          {/* Services Section */}
          <section id="services" className="bg-[#fffaf5]">
            <LazySection>
              <Services />
            </LazySection>
          </section>

          {/* Team Section */}
          <section id="team" className="bg-[#fffaf5]">
            <LazySection>
              <Team />
            </LazySection>
          </section>

          {/* Contact Section */}
          <section id="contact" className="bg-[#fffaf5]">
            <LazySection>
              <Contact />
            </LazySection>
          </section>
        </main>

        {/* Footer */}
        <LazySection>
          <Footer />
        </LazySection>
      </div>
    </>
  )
}