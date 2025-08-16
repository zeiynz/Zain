import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Header from "@/components/layout/Header"
import type { Metadata } from "next"

// Load Inter from Google Fonts, bundled locally by Next.js
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // mencegah layout shift
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Zain",
  description: "Personal Portfolio of Zain built with Next.js and Tailwind",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-gradient-to-b from-blue-50 to-white text-black font-sans`}
      // className={`${inter.variable} bg-white text-black dark:bg-blue-950 dark:text-white font-sans`}
      >
        {/* ThemeProvider untuk dark mode toggle */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}