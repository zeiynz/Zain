import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { Footer } from "@/components/layout/footer"

import "./globals.css"

const siteUrl = "https://zain.dev"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Zain - Founder & Builder",
    template: "%s — Zain",
  },

  description:
    "Zain is a founder and builder creating thoughtful software products, businesses, and experiments.",

  applicationName: "Zain",

  authors: [{ name: "Zain", url: siteUrl }],
  creator: "Zain",
  publisher: "Zain",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Zain",
    title: "Zain - Founder & Builder",
    description:
      "Founder and builder creating thoughtful software products, businesses, and experiments.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zain — Founder & Builder",
    description:
      "Founder and builder creating thoughtful software products, businesses, and experiments.",
  },

  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<LayoutProps<"/">>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Footer />
      </body>
    </html>
  )
}