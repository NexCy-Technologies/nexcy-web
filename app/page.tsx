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
    url: "https://nexcy.lk/about",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NexCy Technologies",
  url: "https://nexcy.lk",
  logo: "https://nexcy.lk/logo.png",
  description:
    "Leading technology company specializing in web development, mobile apps, ERP/POS systems, AI/ML solutions, and IoT development.",
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
    offerCount: "6",
    offers: [
      {
        "@type": "Offer",
        name: "Web Development",
        description: "Modern, responsive websites and web applications",
      },
      {
        "@type": "Offer",
        name: "Mobile App Development",
        description: "Native Android and iOS applications",
      },
      {
        "@type": "Offer",
        name: "ERP/POS Systems",
        description: "Enterprise resource planning and point-of-sale solutions",
      },
      {
        "@type": "Offer",
        name: "AI/ML Solutions",
        description: "Intelligent systems powered by machine learning",
      },
      {
        "@type": "Offer",
        name: "IoT Development",
        description: "Internet of Things solutions and smart automation",
      },
      {
        "@type": "Offer",
        name: "Software Development",
        description: "Custom software solutions for businesses",
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      <SkipLink />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen">
        {/* Hero Section with dark background */}
        <div className="bg-gradient-to-br from-black via-orange-950 to-black">
          <Navigation />
          <section id="home">
            <Hero />
          </section>
        </div>

        {/* Main content with light background */}
        <main id="main-content" tabIndex={-1} className="bg-[#fffaf5]">
          {/* About Section */}
          <section id="about">
            <LazySection>
              <About />
            </LazySection>
          </section>

          {/* Services Section */}
          <section id="services">
            <LazySection>
              <Services />
            </LazySection>
          </section>

          {/* Team Section */}
          <section id="team">
            <LazySection>
              <Team />
            </LazySection>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <LazySection>
              <Contact />
            </LazySection>
          </section>
        </main>

        {/* Footer - separate from main content */}
        <LazySection>
          <Footer />
        </LazySection>
      </div>
    </>
  )
}