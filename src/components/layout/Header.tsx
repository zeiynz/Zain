"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Figma, Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-6 inset-x-0 z-50 flex justify-center"
        >
            <motion.div
                animate={{
                    background: scrolled
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.12)",
                    boxShadow: scrolled
                        ? "0 8px 32px rgba(31, 38, 135, 0.25)"
                        : "0 4px 24px rgba(31, 38, 135, 0.15)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "w-full max-w-4xl flex items-center justify-between px-6 py-3 rounded-full",
                    "border border-white/20 backdrop-blur-2xl",
                    "transition-all duration-500 ease-in-out"
                )}
            >
                {/* Brand */}
                <a
                    href="#hero"
                    className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-400 select-none active:opacity-80 transition-opacity duration-150"
                >
                    Zain✨
                </a>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
                    {[
                        { label: "home", href: "#hero" },
                        { label: "about", href: "#about" },
                        { label: "experience", href: "#experience" },
                        { label: "projects", href: "#projects" },
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="relative capitalize text-zinc-200 hover:text-white transition-colors duration-200 active:scale-95"
                        >
                            {item.label}
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-400 group-hover:w-full transition-all duration-200" />
                        </a>
                    ))}
                </nav>

                {/* Socials */}
                <div className="flex items-center gap-4">
                    {[
                        { icon: <Figma className="w-[18px] h-[18px]" />, href: "https://www.figma.com/@zeiyn" },
                        { icon: <Github className="w-[18px] h-[18px]" />, href: "https://github.com/zeiynz" },
                        { icon: <Linkedin className="w-[18px] h-[18px]" />, href: "https://linkedin.com/in/zeiyn" },
                        { icon: <Mail className="w-[18px] h-[18px]" />, href: "mailto:z3eiyn@email.com" },
                    ].map((item, idx) => (
                        <motion.a
                            key={idx}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="text-violet-400 hover:text-fuchsia-300 transition-colors duration-200"
                        >
                            {item.icon}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </motion.header>
    )
}