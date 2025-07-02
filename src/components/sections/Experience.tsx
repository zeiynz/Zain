"use client"

import { Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"

const experiences = [
    {
        company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
        role: "Cloud Computing Cohort",
        period: "Feb 2024 – Jul 2024",
        description:
            "Participated in a prestigious program focused on cloud computing, gaining hands-on experience with Google Cloud Platform, Kubernetes, and DevOps practices. Developed skills in deploying scalable applications and managing cloud infrastructure.",
    },
]

export default function Experience() {
    return (
        <section id="experience" className="relative max-w-5xl mx-auto px-6 py-24">
            {/* Title */}
            <motion.h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Experience
            </motion.h2>

            {/* Timeline */}
            <div className="relative pl-6 border-l border-gray-200 space-y-12">
                {experiences.map((exp, i) => (
                    <div key={i} className="relative group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[18px] top-1.5 bg-white p-1 rounded-full border border-gray-300 shadow-md z-10">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                        </div>

                        {/* Card without loop animation */}
                        <Card delay={0} animateOnce>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                                <h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
                                <span className="text-sm text-gray-500">{exp.period}</span>
                            </div>
                            <h4 className="text-sm text-blue-600 font-medium mb-2">{exp.company}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}