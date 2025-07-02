"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Atom, Layout, Code2, Wind, Palette } from "lucide-react"

const skills = [
    { label: "React", icon: Atom },
    { label: "Next.js", icon: Layout },
    { label: "TypeScript", icon: Code2 },
    { label: "Tailwind", icon: Wind },
    { label: "UI/UX", icon: Palette },
]

export default function Hero() {
    const [floatingIcons, setFloatingIcons] = useState<
        { top: string; left: string; delay: number; key: number }[]
    >([])

    useEffect(() => {
        const icons = [...Array(8)].map((_, i) => ({
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 100}%`,
            delay: i * 0.5,
            key: i,
        }))
        setFloatingIcons(icons)
    }, [])

    return (
        <section
            id="hero"
            className="relative min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#ffffff] px-6 flex items-center justify-center overflow-hidden"
        >
            {/* Floating Icons */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {floatingIcons.map(({ top, left, key, delay }) => (
                    <motion.div
                        key={key}
                        className="absolute w-6 h-6 bg-white/40 rounded-xl backdrop-blur-sm shadow-md"
                        style={{ top, left }}
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: [0, -20, 0], opacity: 0.3 }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl flex flex-col items-center gap-6">
                {/* Avatar */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <Image
                        src="/images/memoji.jpg"
                        alt="Zain Avatar"
                        width={160}
                        height={160}
                        className="rounded-full border-4 border-white shadow-xl"
                        priority
                    />
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow animate-ping" />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
                >
                    Hi, I’m{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-slow">
                        Zain
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-gray-500 text-base sm:text-lg max-w-md"
                >
                    Building immersive UI with React, Next.js & Tailwind. Passionate about design systems and clean code.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className="mt-6 flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    {/* See My Work - scroll ke section #projects */}
                    <a
                        href="#projects"
                        className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition shadow"
                    >
                        See My Work
                    </a>

                    {/* Contact Me - buka email default */}
                    <a
                        href="mailto:z3eiyn@email.com"
                        className="px-6 py-3 bg-white border border-gray-200 text-gray-800 text-sm font-medium rounded-full hover:bg-gray-100 transition shadow-sm"
                    >
                        Contact Me
                    </a>
                </motion.div>

                {/* Skill Badges */}
                <motion.div
                    className="mt-6 flex flex-wrap justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    {skills.map(({ label, icon: Icon }, i) => (
                        <motion.div
                            key={label}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 text-gray-700 text-xs font-medium border border-gray-200 backdrop-blur-md shadow-sm"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 2 + i * 0.3, ease: "easeInOut" }}
                        >
                            <Icon className="w-3.5 h-3.5 text-gray-500" />
                            {label}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}