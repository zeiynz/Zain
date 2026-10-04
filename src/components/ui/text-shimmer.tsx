"use client"

import { motion, useReducedMotion } from "motion/react"

type TextShimmerProps = {
    children: React.ReactNode
    as?: "span" | "p" | "h1" | "h2" | "h3"
    className?: string
    duration?: number
}

export function TextShimmer({
    children,
    as = "span",
    className,
    duration = 2,
}: TextShimmerProps) {
    const reducedMotion = useReducedMotion()
    const Component = motion[as]

    return (
        <Component
            className={[
                "bg-linear-to-r from-muted-foreground/40 via-foreground to-muted-foreground/40",
                "bg-size-[200%_100%] bg-clip-text text-transparent",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            animate={
                reducedMotion
                    ? undefined
                    : { backgroundPosition: ["100% 0%", "-100% 0%"] }
            }
            transition={
                reducedMotion
                    ? undefined
                    : {
                        duration,
                        ease: "linear",
                        repeat: Infinity,
                    }
            }
        >
            {children}
        </Component>
    )
}

export default TextShimmer