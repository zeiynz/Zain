"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { Atom, Layout, Code2, Wind, Palette } from "lucide-react"
import clsx from "clsx"
import Button from "@/components/ui/button"

const skills = [
    { label: "React", icon: Atom },
    { label: "Next.js", icon: Layout },
    { label: "TypeScript", icon: Code2 },
    { label: "Tailwind", icon: Wind },
    { label: "UI/UX", icon: Palette },
]

export default function Hero() {
    const [particles, setParticles] = useState<{ top: string; left: string; delay: number; key: number; size: number }[]>([])

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springConfig = { damping: 25, stiffness: 150 }
    const smoothMouseX = useSpring(mouseX, springConfig)
    const smoothMouseY = useSpring(mouseY, springConfig)

    useEffect(() => {
        setParticles(
            [...Array(30)].map((_, i) => ({
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                delay: Math.random() * 5,
                key: i,
                size: Math.random() * 2 + 1,
            }))
        )
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen bg-black px-6 flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Grid Pattern */}
            <div className="absolute inset-0">
                <div
                    className={clsx(
                        "absolute inset-0 opacity-[0.03]",
                        "[background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]",
                        "[background-size:50px_50px]"
                    )}
                />
            </div>

            {/* Cursor Follow Gradient */}
            <motion.div
                className="absolute w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(120,120,130,0.15) 0%, transparent 70%)",
                    x: smoothMouseX,
                    y: smoothMouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Subtle Static Gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-700/20 rounded-full blur-[120px]" />
            </div>

            {/* Stars/Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map(({ top, left, key, delay, size }) => (
                    <motion.div
                        key={key}
                        className="absolute bg-zinc-400 rounded-full"
                        style={{
                            top,
                            left,
                            width: `${size}px`,
                            height: `${size}px`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl flex flex-col items-center gap-8">
                {/* Animated Shape */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-32 h-32 mb-4"
                >
                    {/* Rotating Squares */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <div className={clsx("absolute inset-0 border-2 border-zinc-700 rounded-2xl", "backdrop-blur-sm")} />
                    </motion.div>

                    <motion.div
                        className="absolute inset-2"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        <div className={clsx("absolute inset-0 border-2 border-zinc-600 rounded-xl", "backdrop-blur-sm")} />
                    </motion.div>

                    {/* Center Dot */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="w-3 h-3 bg-white rounded-full" />
                    </motion.div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-zinc-700/20 rounded-full blur-2xl" />
                </motion.div>

                {/* Title */}
                <div className="space-y-5">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-5xl sm:text-7xl font-bold text-white leading-tight"
                    >
                        Hi, I'm <span className="text-indigo-400">Zain</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-zinc-500 text-lg sm:text-xl max-w-2xl leading-relaxed mx-auto"
                    >
                        I build immersive UIs leveraging the modern React Ecosystem. My focus is on robust design systems and writing clean, scalable code.
                    </motion.p>
                </div>

                {/* Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <Button href="#projects">See My Work</Button>
                    <Button href="mailto:z3eiyn@email.com" variant="secondary">
                        Contact Me
                    </Button>
                </motion.div>

                {/* Skills */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    {skills.map(({ label, icon: Icon }, i) => (
                        <motion.div
                            key={label}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-full",
                                "bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm",
                                "hover:border-zinc-700 hover:bg-zinc-800 transition-all cursor-default"
                            )}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2 + i * 0.3,
                                ease: "easeInOut",
                            }}
                        >
                            <Icon className="w-4 h-4 text-zinc-500" />
                            {label}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    )
}