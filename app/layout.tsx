import type React from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "NexCy Technologies - Future of Digital Innovation",
    template: "%s | NexCy Technologies",
  },
  description:
    "NexCy Technologies provides web development, mobile apps, ERP/POS systems, AI/ML solutions, IoT development, and custom software solutions.",
  keywords:
    "nexcy, nexcytech, technology, software company, web development, mobile apps, ERP, POS, AI, ML, IoT",
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
  alternates: { canonical: "https://nexcy.lk" },
  category: "Technology",
  classification: "Business",
  other: {
    "theme-color": "#ff6a00", // Updated orange theme
    "color-scheme": "dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} scroll-smooth`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ff6a00" />
        <meta name="color-scheme" content="dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon & App icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Structured Data */}
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
                "NexCy Technologies provides web development, mobile apps, ERP/POS systems, AI/ML solutions, IoT development, and custom software solutions.",
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
            }),
          }}
        />
      </head>
      <body className="font-roboto antialiased bg-gradient-to-br from-black via-orange-950 to-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}