"use client"

import React from "react"
import clsx from "clsx"

export type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "secondary"
}

export default function Button({ href, children, variant = "primary", className, ...props }: ButtonProps) {
    const base = "px-6 py-3 rounded-full text-sm font-medium transition-all"
    const variants: Record<string, string> = {
        primary: "group bg-white text-black hover:bg-zinc-200",
        secondary: "bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700",
    }

    return (
        <a href={href} className={clsx(base, variants[variant], className)} {...props}>
            {children}
        </a>
    )
}