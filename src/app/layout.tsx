import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/sections/Navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexcy.lk"),
  title: {
    default: "Nexcy Technologies | Software Engineering & Digital Infrastructure",
    template: "%s | Nexcy Technologies"
  },
  description: "Empower your business with cutting-edge web, mobile, and AI solutions — built for scalability, performance, and real impact.",
  alternates: {
    canonical: "https://www.nexcy.lk",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nexcy.lk",
    title: "Nexcy Technologies",
    description: "Empower your business with cutting-edge web, mobile, and AI solutions.",
    siteName: "Nexcy Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexcy Technologies",
    description: "Empower your business with cutting-edge web, mobile, and AI solutions.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexcy Technologies",
  url: "https://www.nexcy.lk",
  logo: "https://www.nexcy.lk/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+94-76-948-4049",
    contactType: "customer service",
    areaServed: "LK",
    availableLanguage: "en"
  },
  sameAs: [
    "https://www.linkedin.com/company/nexcy-technologies",
    "https://www.instagram.com/nexcytechnologies",
    "https://www.facebook.com/nexcytechnologies",
    "https://twitter.com/nexcytechnologies"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
