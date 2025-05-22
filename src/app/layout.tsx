import './globals.css'
import type { Metadata } from 'next'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'NexCy Technologies',
  description: 'Innovating the future. Official site of NexCy Technologies Pvt Ltd.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-[var(--color-background)] text-[var(--color-foreground)]">
      <body className="min-h-screen w-full overflow-x-hidden font-sans">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}