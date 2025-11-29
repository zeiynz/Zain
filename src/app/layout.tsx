import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Header from "@/components/layout/Header"
import type { Metadata, Viewport } from "next"

// Font setup
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

// Global SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://iamzeiyn.com"),
  title: {
    default: "Zain",
    template: "%s | Zain",
  },
  description:
    "Explore the professional portfolio of Zain — software engineer, investor, and entrepreneur building impactful digital experiences.",
  keywords: [
    "Zain",
    "iamzeiyn",
    "Portfolio",
    "Software Engineer",
    "Investor",
    "Entrepreneur",
    "Content Creator",
    "Full Stack Developer",
  ],
  authors: [{ name: "Zain", url: "https://iamzeiyn.com" }],
  creator: "Zain",
  alternates: {
    canonical: "https://iamzeiyn.com",
  },
  openGraph: {
    title: "Zain | Software Engineer, Investor, Entrepreneur",
    description:
      "Discover Zain’s portfolio featuring software projects, investments, and digital ventures.",
    url: "https://iamzeiyn.com",
    siteName: "iamzeiyn",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://iamzeiyn.com/zain2.png",
        width: 1200,
        height: 630,
        alt: "Zain Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zain | Portfolio",
    description:
      "Professional portfolio by Zain — Software Engineer, Investor, and Entrepreneur.",
    creator: "@iamzeiyn",
    images: ["https://iamzeiyn.com/zain2.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Mobile viewport
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

// Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Zain",
    url: "https://iamzeiyn.com",
    sameAs: [
      "https://www.youtube.com/@iamzeiyn",
      "https://github.com/zeiynz",
      "https://linkedin.com/in/zeiyn",
      "https://www.instagram.com/iamzeiyn",
      "https://www.pinterest.com/iamzeiyn"
    ],
    jobTitle: "Software Engineer, Investor, Entrepreneur",
    worksFor: {
      "@type": "Organization",
      name: "Lazain Bleu",
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload key assets */}
        <link rel="preload" href="/images/zain2.png" as="image" />

        {/* Inject structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} bg-[var(--background)] text-[var(--foreground)] font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}