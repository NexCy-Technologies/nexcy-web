import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/components/sections/Hero"
import Navigation from "@/components/Navigation"
import { LazySection } from "@/components/ui/lazy-section"
import { SkipLink } from "@/components/ui/skip-link"

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-lg" />,
})

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
  title: "NexCy Technologies - Future of Digital Innovation",
  description:
    "Leading technology company specializing in web development, mobile apps, ERP/POS systems, AI/ML solutions, and IoT development. Expert team delivering cutting-edge software solutions.",
  keywords: "nexcy, nexcytech, technology, software company, software company sri lanka, it company, web, app, software, development, ERP, POS, mobile apps, ios apps, AI, ML, IoT",
  openGraph: {
    title: "NexCy Technologies - Future of Digital Innovation",
    description:
      "Leading technology company specializing in web development, mobile apps, ERP/POS systems, AI/ML solutions, and IoT development.",
    url: "https://nexcy.lk",
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
    title: "NexCy Technologies - Future of Digital Innovation",
    description:
      "Leading technology company specializing in web development, mobile apps, ERP/POS systems, AI/ML solutions, and IoT development.",
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

export default function Home() {
  return (
    <>
      <SkipLink />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <LazySection>
            <About />
          </LazySection>
          <LazySection>
            <Services />
          </LazySection>
          <LazySection>
            <Team />
          </LazySection>
          <LazySection>
            <Contact />
          </LazySection>
        </main>
        <LazySection>
          <Footer />
        </LazySection>
      </div>
    </>
  )
}
