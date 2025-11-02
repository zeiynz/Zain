import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Header from "@/components/layout/Header"
import type { Metadata, Viewport } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

// Global metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://zainportfolio.com"), // replace with your domain
  title: {
    default: "Zain | Portfolio",
    template: "%s | Zain",
  },
  description:
    "Explore the professional portfolio of Zain — software engineer, investor, and entrepreneur creating innovative digital experiences.",
  keywords: [
    "Zain",
    "Portfolio",
    "Software Engineer",
    "Investor",
    "Entrepreneur",
    "Content Creator",
    "Full Stack Developer",
  ],
  authors: [{ name: "Zain" }],
  creator: "Zain",
  openGraph: {
    title: "Zain | Portfolio",
    description:
      "Discover Zain’s personal portfolio featuring cutting-edge web projects, investments, and digital ventures.",
    url: "https://zainportfolio.com",
    siteName: "Zain Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // optional, replace with real image
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
    creator: "@zain", // replace with your handle
    images: ["/og-image.jpg"],
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

// Optional: for mobile optimization
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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