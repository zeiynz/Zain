"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"

export default function About() {
    const highlights = [
        {
            title: "🧠 Problem Solver",
            desc: "I love turning complex ideas into clear, functional designs that users understand instantly.",
        },
        {
            title: "🎯 Detail Oriented",
            desc: "Every pixel matters I craft interfaces with precision and consistency.",
        },
        {
            title: "🚀 Fast & Performant",
            desc: "Optimized code and fast loading UI is always part of my workflow.",
        },
        {
            title: "🤝 Collaborative",
            desc: "I thrive in teams communication and feedback are key to every great product.",
        },
    ]

    return (
        <section id="about" className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
            {/* Title */}
            <motion.h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                About Me
            </motion.h2>

            {/* Subheading */}
            <motion.p
                className="text-gray-600 text-base sm:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                {"Hello! You can call me Zain. I’m a Software Engineer working with the React ecosystem. I'm passionate about building elegant, intuitive, and high-performance user experiences. I enjoy solving problems through clean design systems and creating products people love to use."}
            </motion.p>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                {highlights.map((card, i) => (
                    <Card key={i} delay={0.2 + i * 0.1}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                    </Card>
                ))}
            </div>
        </section>
    )
}