// layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/layout/Header"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white font-sans">
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}