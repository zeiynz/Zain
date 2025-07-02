"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Figma, Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className="fixed top-6 inset-x-0 z-50 flex justify-center transition-all duration-300 ease-in-out">
            <div
                className={cn(
                    "w-full max-w-4xl flex items-center justify-between px-6 py-3 rounded-full",
                    "border shadow-md backdrop-blur-md transition-all duration-300 ease-in-out",
                    scrolled
                        ? "bg-white/1 border-transparent text-violet-600"
                        : "bg-white/40 border-transparent text-violet-600"
                )}
            >
                {/* Brand */}
                <Link
                    href="#home"
                    className="text-xl font-bold tracking-tight text-black"
                >
                    Zain!
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
                    {[
                        { label: "home", href: "#hero" },
                        { label: "about", href: "#about" },
                        { label: "experience", href: "#experience" },
                        { label: "projects", href: "#projects" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-black transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Socials */}
                <div className="flex items-center gap-3">
                    <Link href="https://www.figma.com/@zeiyn" target="_blank" aria-label="Figma">
                        <Figma className="w-[18px] h-[18px] text-violet-600 hover:text-black transition duration-200" />
                    </Link>
                    <Link href="https://github.com/zeiynz" target="_blank" aria-label="GitHub">
                        <Github className="w-[18px] h-[18px] text-violet-600 hover:text-black transition duration-200" />
                    </Link>
                    <Link href="https://linkedin.com/in/zeiyn" target="_blank" aria-label="LinkedIn">
                        <Linkedin className="w-[18px] h-[18px] text-violet-600 hover:text-black transition duration-200" />
                    </Link>
                    <Link href="mailto:z3eiyn@email.com" aria-label="Email">
                        <Mail className="w-[18px] h-[18px] text-violet-600 hover:text-black transition duration-200" />
                    </Link>
                </div>
            </div>
        </header>
    )
}