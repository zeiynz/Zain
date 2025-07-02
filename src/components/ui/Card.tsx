"use client"

import {
    ElementType,
    ReactNode,
    ComponentPropsWithoutRef,
} from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type CardProps<T extends ElementType = "div"> = {
    as?: T
    children: ReactNode
    className?: string
    delay?: number
    once?: boolean
} & Omit<ComponentPropsWithoutRef<T>, "once">

export const Card = <T extends ElementType = "div">({
    as,
    children,
    className,
    delay = 0,
    once = false,
    ...rest
}: CardProps<T>) => {
    const Component = as || "div"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once }}
            className={cn(
                "rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300 hover:bg-white",
                className
            )}
        >
            <Component {...rest}>{children}</Component>
        </motion.div>
    )
}