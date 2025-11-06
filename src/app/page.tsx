// app/page.tsx
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Experience from "@/components/sections/Experience"
import Projects from "@/components/sections/Projects"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </main>
  )
}