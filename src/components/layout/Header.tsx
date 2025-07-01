"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Figma, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from "@/lib/utils"

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className="fixed top-6 inset-x-0 z-50 flex justify-center transition-all">
            <div className={cn(
                "w-full max-w-5xl flex items-center justify-between px-6 py-2 rounded-full",
                "backdrop-blur-md border text-sm shadow-sm transition-all",
                scrolled
                    ? "bg-black/10 border-white/10 text-violet-500"
                    : "bg-transparent border-transparent text-violet-500"
            )}>

                {/* Brand */}
                <Link href="#home" className="text-violet-500 font-medium px-2">
                    Zain!
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-4">
                    <Link href="#hero" className="hover:text-white transition">
                        home
                    </Link>
                    <Link href="#about" className="hover:text-white transition">
                        about
                    </Link>
                    <Link href="#experience" className="hover:text-white transition">
                        experience
                    </Link>
                    <Link href="#projects" className="hover:text-white transition">
                        projects
                    </Link>
                </nav>

                {/* Social Icons */}
                <div className="flex items-center gap-4 ml-4">
                    <Link
                        href="https://www.figma.com/@zeiyn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Figma className="w-4 h-4 hover:text-white transition" />
                    </Link>
                    <Link
                        href="https://github.com/zeiynz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github className="w-4 h-4 hover:text-white transition" />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/zeiyn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin className="w-4 h-4 hover:text-white transition" />
                    </Link>
                    <Link href="mailto:z3eiyn@email.com">
                        <Mail className="w-4 h-4 hover:text-white transition" />
                    </Link>
                </div>
            </div>
        </header>
    )
}