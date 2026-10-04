"use client"

import { HoverPreview } from "@/components/ui/hover-preview"
import { TextShimmer } from "@/components/ui/text-shimmer"
import { StackHover } from "@/components/ui/stack-hover"

type Project = {
    title: string
    description: string
    year: string
    href: string
}

const projects: Project[] = [
    {
        title: "Launch Fast",
        description:
            "Something is coming.",
        year: "2026",
        href: "https://getlaunchfast.vercel.app/",
    },
    {
        title: "ClyveAI",
        description:
            "The Memory Layer for Your Investment Thesis.",
        year: "2026",
        href: "https://clyveai.vercel.app/",
    },
    {
        title: "Lazain Bleu",
        description:
            "Fine Fragrances and Modern Perfumery.",
        year: "2025",
        href: "https://bio.site/lazainbleu/",
    },
]

const experience = [
    {
        role: "Cloud Computing Cohort",
        company: "Bangkit Academy led by Google",
        url: "https://grow.google/intl/id_id/",
        period: "2024",
        description:
            "Completed the Cloud Computing learning path through Bangkit Academy.",
    },
]

export default function Hero() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
            {/* Hero */}
            <section className="animate-in fade-in duration-700">
                <div className="flex items-start justify-between gap-8">
                    <div className="space-y-1">
                        <h1 className="text-lg font-medium tracking-tight">
                            Zain
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Founder &amp; Builder
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Malang | London
                    </p>
                </div>

                <div className="mt-10 max-w-xl space-y-4 text-[15px] leading-7 sm:text-base">
                    <TextShimmer
                        as="p"
                        duration={4}
                    >
                        I build products, businesses, and occasionally
                        things that probably didn&apos;t need to exist.
                    </TextShimmer>

                    <p className="text-muted-foreground">
                        Mostly interested in software, AI, and the space
                        between a good idea and something people actually
                        use.
                    </p>
                </div>
            </section>

            {/* Currently Building */}
            <section
                id="work"
                className="mt-24 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150"
            >
                <h2 className="mb-8 text-sm font-medium">
                    Currently building
                </h2>

                <div className="divide-y divide-border/60">
                    {projects.map((project) => {
                        const isExternal =
                            project.href.startsWith(
                                "http",
                            )

                        const content = (
                            <div className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground">
                                            {project.title}
                                        </span>
                                    </div>

                                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                        {project.description}
                                    </p>
                                </div>

                                <span className="text-sm tabular-nums text-muted-foreground sm:text-right">
                                    {project.year}
                                </span>
                            </div>
                        )

                        if (
                            !isExternal ||
                            project.href === "#"
                        ) {
                            return (
                                <div
                                    key={`${project.title}-${project.year}`}
                                >
                                    {content}
                                </div>
                            )
                        }

                        return (
                            <HoverPreview
                                key={`${project.title}-${project.year}`}
                                title={project.title}
                                url={project.href}
                                fullWidth
                            >
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block"
                                >
                                    {content}
                                </a>
                            </HoverPreview>
                        )
                    })}
                </div>
            </section>

            {/* Work / Experience */}
            <section
                id="experience"
                className="mt-24 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200"
            >
                <h2 className="mb-8 text-sm font-medium">
                    Work / Experience
                </h2>

                <div className="divide-y divide-border/60">
                    {experience.map((item) => (
                        <div
                            key={`${item.company}-${item.period}`}
                            className="grid gap-4 py-6 first:pt-0 sm:grid-cols-[1fr_auto] sm:gap-8"
                        >
                            <div>
                                <div className="flex items-baseline gap-2 text-sm">
                                    <span className="text-foreground">
                                        {item.role}
                                    </span>

                                    <span className="text-muted-foreground">
                                        ·
                                    </span>

                                    <HoverPreview
                                        title={item.company}
                                        url={item.url}
                                    >
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-foreground underline-offset-4 hover:underline"
                                        >
                                            {item.company}
                                        </a>
                                    </HoverPreview>
                                </div>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>

                            <span className="text-sm tabular-nums text-muted-foreground sm:text-right">
                                {item.period}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* About */}
            <section
                id="about"
                className="mt-20 grid gap-10 animate-in fade-in duration-700 delay-300 sm:grid-cols-2"
            >
                <div>
                    <h2 className="mb-4 text-sm font-medium">
                        How I work
                    </h2>

                    <div className="space-y-2 text-sm leading-6 text-muted-foreground">
                        <p>Build for real problems.</p>
                        <p>Ship the smallest useful version.</p>
                        <p>
                            Keep what works. Rewrite what doesn&apos;t.
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-medium">
                        Favorite tools and stack
                    </h2>

                    <StackHover
                        items={[
                            {
                                name: "Next.js",
                                description: "App Router",
                            },
                            {
                                name: "TypeScript",
                                description: "Product development",
                            },
                            {
                                name: "Tailwind",
                                description: "UI styling",
                            },
                            {
                                name: "Claude",
                                description: "Claude Code",
                            },
                            {
                                name: "Figma",
                                description: "Product design",
                            },
                            {
                                name: "GCP",
                                description: "Deployment",
                            },
                        ]}
                    />
                </div>
            </section>
        </main>
    )
}