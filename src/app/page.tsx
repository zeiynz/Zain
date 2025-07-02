import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Experience from "@/components/sections/Experience"
import Projects from "@/components/sections/Projects"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="bg-white text-gray-900 min-h-screen font-sans">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </main>
  )
}