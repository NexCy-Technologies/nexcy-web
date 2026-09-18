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
        url: "https://www.nexcy.lk/og-image.jpg",
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
    images: ["https://www.nexcy.lk/og-image.jpg"],
  },
}

import { createClient } from "@supabase/supabase-js"

export default async function HomePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch site_content
  const { data: contentData } = await supabase
    .from('site_content')
    .select('section, key, value');

  // Fetch services
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  // Fetch case studies
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });

  const content = contentData?.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = {};
    acc[item.section][item.key] = item.value;
    return acc;
  }, {} as Record<string, Record<string, any>>);

  const heroHeadline = content?.about?.headline || "Your vision,\nOur mission.";
  const heroIntro = content?.about?.intro_text || "Empower your business with cutting-edge web, mobile, and AI solutions — built for scalability, performance, and real impact.";

  return (
    <>
      <SkipLink />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <Navigation />
        
        {/* Main content */}
        <main id="main-content" tabIndex={-1}>
          {/* Hero Section */}
          <div id="home">
            <Hero headline={heroHeadline} introText={heroIntro} />
          </div>

          {/* Services Section */}
          <LazySection>
            <Services services={services || []} caseStudies={caseStudies || []} />
          </LazySection>

          {/* Process / Team Section */}
          <LazySection>
            <Team />
          </LazySection>

          {/* Contact Section */}
          <LazySection>
            <Contact />
          </LazySection>
        </main>

        {/* Footer */}
        <LazySection>
          <Footer />
        </LazySection>
      </div>
    </>
  )
}