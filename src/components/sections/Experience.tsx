"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import clsx from "clsx"
import { Briefcase, ArrowUpRight, Sparkles } from "lucide-react"

type Particle = { top: string; left: string; delay: number; size: number }

interface ExperienceItem {
    role: string
    company: string
    year: string
    description: string
    tags: string[]
    link: string
}

export default function Experience() {
    const [particles, setParticles] = useState<Particle[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

    useEffect(() => {
        setParticles(
            Array.from({ length: 12 }).map(() => ({
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                delay: Math.random() * 5,
                size: Math.random() * 2 + 1,
            }))
        )
    }, [])

    const experiences: ExperienceItem[] = [
        {
            role: "Founder",
            company: "Lazain Bleu",
            year: "2025 — Present",
            description:
                "Building Lazain Bleu from the ground up, defining its brand identity, strategy, and market presence. The brand combines French perfumery with Islamic and Andalusian heritage, delivering refined and contemporary fragrance experiences.",
            tags: ["Brand Strategist"],
            link: "https://www.instagram.com/lazainbleu/",
        },
        {
            role: "Cloud Computing",
            company: "Bangkit Academy led by Google, GoTo, and Traveloka",
            year: "2024",
            description:
                "Completed a cloud computing program, mastering GCP, Kubernetes, and Terraform. Built scalable applications and deployed microservices.",
            tags: ["Google Cloud", "Kubernetes", "Docker", "Terraform"],
            link: "https://grow.google/intl/id_id/bangkit/",
        },
    ]

    return (
        <section
            ref={containerRef}
            id="experience"
            className="relative overflow-hidden bg-black px-4 sm:px-6 py-24 sm:py-32 flex flex-col items-center justify-center"
        >
            {/* Grid Background */}
            <div className="absolute inset-0">
                <div
                    className={clsx(
                        "absolute inset-0 opacity-[0.02]",
                        "[background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]",
                        "[background-size:80px_80px]"
                    )}
                />
            </div>

            {/* Gradient Glow */}
            <motion.div
                className="absolute left-1/2 top-1/3 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] -translate-x-1/2 rounded-full blur-[100px] sm:blur-[120px] opacity-20 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(100,100,110,0.3), transparent 70%)",
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-zinc-600 rounded-full"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{
                            duration: 4 + p.size,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative z-10 text-center mb-16 sm:mb-20"
            >
                <div
                    className={clsx(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6",
                        "bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm"
                    )}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <Briefcase className="w-4 h-4 text-zinc-500" />
                    </motion.div>
                    <span className="text-zinc-500 text-xs font-mono tracking-widest">
                        EXPERIENCE
                    </span>
                </div>

                <h2 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-4">
                    Journey So Far
                </h2>

                <motion.div
                    className="mx-auto h-0.5 bg-gradient-to-r from-transparent via-zinc-700 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 160 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                />
            </motion.div>

            {/* Timeline */}
            <div className="relative z-10 w-full max-w-4xl mx-auto">
                <div className="absolute left-5 sm:left-1/2 top-0 w-px h-full bg-zinc-900 sm:-translate-x-1/2">
                    <motion.div
                        className="w-full bg-gradient-to-b from-zinc-700 via-zinc-600 to-transparent"
                        style={{ height: lineHeight }}
                    />
                </div>

                <div className="space-y-14 sm:space-y-20">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={clsx(
                                "relative flex flex-col sm:flex-row items-start gap-8 sm:gap-12",
                                i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                            )}
                        >
                            <div className="absolute left-4 sm:left-1/2 top-0 sm:-translate-x-1/2 flex items-center justify-center">
                                <motion.div
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                                />
                            </div>

                            <div className="hidden sm:block sm:w-[45%]" />

                            {/* Card container */}
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ duration: 0.3 }}
                                className={clsx(
                                    "relative group w-full sm:w-[45%] sm:ml-0",
                                    "p-5 sm:p-6 rounded-2xl",
                                    "bg-zinc-900/30 border border-zinc-800/50",
                                    "hover:bg-zinc-900/50 hover:border-zinc-700/50",
                                    "transition-all backdrop-blur-sm"
                                )}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                                    className={clsx(
                                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3 sm:mb-4",
                                        "bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 text-xs font-mono"
                                    )}
                                >
                                    <Sparkles className="w-3 h-3" />
                                    {exp.year}
                                </motion.div>

                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-zinc-200 transition-colors">
                                    {exp.role}
                                </h3>
                                <p className="text-zinc-500 font-medium mb-3 sm:mb-4">
                                    {exp.company}
                                </p>

                                <p className="text-zinc-400 text-sm leading-relaxed mb-3 sm:mb-4">
                                    {exp.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {exp.tags.map((tag, j) => (
                                        <motion.span
                                            key={j}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: i * 0.1 + 0.5 + j * 0.05,
                                                duration: 0.3,
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            className={clsx(
                                                "px-3 py-1 rounded-lg text-xs font-medium",
                                                "bg-zinc-900 border border-zinc-800 text-zinc-400",
                                                "hover:border-zinc-700 hover:text-zinc-300 transition-all"
                                            )}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Icon link only clickable */}
                                <motion.a
                                    href={exp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={{ x: -5, y: 5 }}
                                    whileHover={{ x: 0, y: 0 }}
                                >
                                    <ArrowUpRight className="w-5 h-5 text-zinc-600 hover:text-zinc-300 transition-colors" />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}