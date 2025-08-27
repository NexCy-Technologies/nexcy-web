import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "NexCy Technologies - Web Development & Software Solutions",
    template: "%s | NexCy Technologies",
  },
  description:
    "Leading technology company specializing in web development, mobile apps, ERP/POS systems, AI/ML solutions, and IoT development.",
  keywords: "nexcy, texcytech, technology, web, app, software, development, ERP, POS, mobile apps, AI, ML, IoT",
  authors: [{ name: "NexCy Technologies" }],
  creator: "NexCy Technologies",
  publisher: "NexCy Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://nexcy.lk",
  },
  category: "Technology",
  classification: "Business",
  other: {
    "theme-color": "#1e3a8a",
    "color-scheme": "dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="color-scheme" content="dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                "https://facebook.com/nexcytech",
                "https://instagram.com/nexcytech",
                "https://linkedin.com/company/nexcytech",
              ],
            }),
          }}
        />
      </head>
      <body className="font-roboto antialiased">{children}</body>
    </html>
  )
}
