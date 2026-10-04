"use client"

import { ArrowUpRight } from "lucide-react"

import { TextShimmer } from "@/components/ui/text-shimmer"

const projects = [
    {
        name: "Your Product",
        description: "Something worth building",
        href: "#",
    },
    {
        name: "Another Thing",
        description: "A small experiment",
        href: "#",
    },
    {
        name: "Stealth",
        description: "Coming soon",
        href: "#",
    },
]

export default function Hero() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
            <section className="animate-in fade-in duration-700">
                <div className="space-y-1">
                    <TextShimmer
                        as="h1"
                        duration={4}
                        className="text-lg font-medium tracking-tight"
                    >
                        Zain
                    </TextShimmer>

                    <p className="text-sm text-muted-foreground">
                        Founder &amp; Builder
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Indonesia · GMT+7
                    </p>
                </div>

                <div className="mt-10 max-w-xl space-y-4 text-[15px] leading-7 sm:text-base">
                    <p>
                        I build products, businesses, and occasionally things that
                        probably didn&apos;t need to exist.
                    </p>

                    <p className="text-muted-foreground">
                        Mostly interested in software, AI, and the space between a good
                        idea and something people actually use.
                    </p>
                </div>
            </section>

            <section
                id="work"
                className="mt-24 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150"
            >
                <h2 className="mb-5 text-sm font-medium">Currently building</h2>

                <div className="divide-y divide-border border-y border-border">
                    {projects.map((project) => (
                        <Project key={project.name} {...project} />
                    ))}
                </div>
            </section>

            <section
                id="about"
                className="mt-20 grid gap-10 sm:grid-cols-2 animate-in fade-in duration-700 delay-300"
            >
                <div>
                    <h2 className="mb-4 text-sm font-medium">How I work</h2>

                    <div className="space-y-2 text-sm leading-6 text-muted-foreground">
                        <p>Build for real problems.</p>
                        <p>Ship the smallest useful version.</p>
                        <p>Keep what works. Rewrite what doesn&apos;t.</p>
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-medium">Interests</h2>

                    <p className="text-sm leading-6 text-muted-foreground">
                        AI · Product · Software · Design · Startups
                    </p>
                </div>
            </section>
        </main>
    )
}

function Project({
    name,
    description,
    href,
}: {
    name: string
    description: string
    href: string
}) {
    return (
        <a
            href={href}
            className="group flex items-center justify-between gap-6 py-4 transition-colors hover:text-muted-foreground"
        >
            <div className="min-w-0">
                <p className="text-sm font-medium transition-transform duration-200 group-hover:translate-x-0.5">
                    {name}
                </p>

                <p className="mt-0.5 text-sm text-muted-foreground">
                    {description}
                </p>
            </div>

            <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </a>
    )
}