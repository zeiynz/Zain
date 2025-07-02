"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const projects = [
    {
        title: "Lazain Bleu",
        url: "https://github.com/zeiynz/lazainbleu",
        desc: "Lazain Bleu is a sleek web app for a luxury perfume brand, Inspired by Faith and Heritage. Built with modern tech and driven by my passion for fragrance and storytelling. (still in the process of development)",
    },
    {
        title: "Gizify",
        url: "https://github.com/Gizify",
        desc: "Gizify is an AI-based mobile application for nutrition monitoring in pregnant women and healthy recipe recommendations aimed at preventing stunting. Our goal is to help users maintain a balanced diet effortlessly through smart technology.",
    },
    {
        title: "PetWell",
        url: "https://github.com/ENTS-H108",
        desc: "An app that uses camera-based disease detection and offers vet consultations via chat. It also helps you find nearby veterinarians with a user-friendly interface, ensuring your pets get the best care effortlessly.",
    },
    {
        title: "Startup Dashboard",
        url: "#",
        desc: "Analytics dashboard with interactive charts and real-time insights. Built with Next.js, Recharts, and Tailwind.",
    },
]

export default function Projects() {
    return (
        <section id="projects" className="relative px-6 py-24 bg-gradient-to-br from-[#f5f7fa] to-[#ffffff]">
            {/* Title */}
            <motion.div
                className="text-center max-w-2xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">My Projects</h2>
                <p className="text-gray-500 text-base sm:text-lg">
                    A collection of digital products where code meets creativity built with care, vision, and real purpose.
                </p>
            </motion.div>

            {/* Project Cards */}
            <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
                {projects.map((project, i) => (
                    <motion.a
                        key={project.title}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-violet-400 transition-colors">
                                {project.title}
                            </h3>
                            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {project.desc}
                        </p>
                    </motion.a>
                ))}
            </div>
        </section>
    )
}