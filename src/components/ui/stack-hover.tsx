"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

type StackItem = {
    name: string
    description: string
}

interface StackHoverProps {
    items: StackItem[]
}

export function StackHover({ items }: StackHoverProps) {
    const [active, setActive] = useState<string | null>(null)

    return (
        <div className="flex flex-wrap gap-x-1 gap-y-1.5 text-sm leading-6">
            {items.map((item, index) => {
                const isActive = active === item.name

                return (
                    <div key={item.name} className="flex items-center">
                        {index > 0 && (
                            <span className="mr-1 text-muted-foreground/40">
                                ·
                            </span>
                        )}

                        <span className="relative">
                            <button
                                type="button"
                                data-magnetic
                                onMouseEnter={() => setActive(item.name)}
                                onMouseLeave={() => setActive(null)}
                                className="relative cursor-none text-muted-foreground transition-colors duration-300 hover:text-foreground"
                            >
                                {item.name}

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span
                                            initial={{
                                                opacity: 0,
                                                y: 4,
                                                filter: "blur(4px)",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 3,
                                                filter: "blur(3px)",
                                            }}
                                            transition={{
                                                duration: 0.2,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 whitespace-nowrap"
                                        >
                                            <span className="block rounded-lg border border-white/10 bg-background/90 px-3 py-1.5 text-xs text-foreground shadow-xl backdrop-blur-xl">
                                                {item.description}
                                            </span>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}