"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { useScroll, useMotionValueEvent } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Navbar({ className }: { className?: string }) {
    const [isDark, setIsDark] = React.useState(true)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12))

    React.useEffect(() => {
        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("light")
    }, [])

    const toggleTheme = (dark: boolean) => {
        if (dark === isDark) return
        setIsDark(dark)
        const html = document.documentElement
        if (dark) {
            html.classList.add("dark")
            html.classList.remove("light")
        } else {
            html.classList.add("light")
            html.classList.remove("dark")
        }
    }

    return (
        <div className={cn("fixed top-3 inset-x-0 z-50 flex justify-center px-4 pointer-events-none", className)}>
            {/* Outer wrapper animates — logo is NOT inside motion so it won't jitter */}
            <motion.nav
                initial={false}
                animate={{
                    backgroundColor: scrolled ? "rgba(8,8,8,0.80)" : "rgba(8,8,8,0.55)",
                    boxShadow: scrolled
                        ? "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)"
                        : "0 0 0 1px rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.2)",
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                }}
                className="pointer-events-auto flex items-center gap-0.5 h-9 px-1 rounded-full will-change-auto"
            >
                {/* Logo — plain div, no motion, no scale, no jitter */}
                <Link
                    href="/"
                    aria-label="Home"
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.08] hover:bg-white/[0.12] active:opacity-70 transition-colors duration-200"
                >
                    <Image src="/icon.svg" alt="Logo" width={16} height={16} className="object-contain" />
                </Link>

                {/* Contact */}
                <a
                    href="/contact"
                    rel="noopener noreferrer"
                    className="text-[12px] font-medium text-white/60 hover:text-white px-3 py-1 rounded-full hover:bg-white/[0.06] transition-colors duration-200"
                >
                    Contact
                </a>

                {/* Theme pill */}
                <div className="relative flex items-center h-6 rounded-full bg-white/10 p-0.5 ml-0.5">
                    <motion.div
                        className="absolute top-0.5 bottom-0.5 w-[22px] rounded-full bg-white"
                        animate={{ left: !isDark ? 2 : "calc(100% - 24px)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
                    />
                    <button
                        onClick={() => toggleTheme(false)}
                        aria-label="Light mode"
                        className={cn(
                            "relative z-10 w-6 h-full flex items-center justify-center transition-colors duration-200",
                            !isDark ? "text-black" : "text-white/50"
                        )}
                    >
                        <Sun className="w-2.5 h-2.5" />
                    </button>
                    <button
                        onClick={() => toggleTheme(true)}
                        aria-label="Dark mode"
                        className={cn(
                            "relative z-10 w-6 h-full flex items-center justify-center transition-colors duration-200",
                            isDark ? "text-black" : "text-white/50"
                        )}
                    >
                        <Moon className="w-2.5 h-2.5" />
                    </button>
                </div>
            </motion.nav>
        </div>
    )
}