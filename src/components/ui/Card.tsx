"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"

interface CardProps {
    src: string
    alt: string
}

export default function Card({ src, alt }: CardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useTransform(mouseY, [-200, 200], [10, -10])
    const rotateY = useTransform(mouseX, [-200, 200], [-10, 10])

    const springConfig = { damping: 25, stiffness: 150 }
    const smoothRotateX = useSpring(rotateX, springConfig)
    const smoothRotateY = useSpring(rotateY, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
        setIsHovered(false)
    }

    return (
        <motion.div
            className="relative w-full aspect-square"
            style={{ perspective: "1000px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    transformStyle: "preserve-3d",
                    rotateX: smoothRotateX,
                    rotateY: smoothRotateY,
                }}
            >
                <div
                    className={clsx(
                        "relative w-full h-full rounded-2xl overflow-hidden",
                        "bg-zinc-900 border border-zinc-800"
                    )}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {isHovered && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                            }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}