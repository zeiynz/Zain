"use client"

import { ArrowUpRight } from "lucide-react"
import { HoverPreview } from "@/components/ui/hover-preview"

export interface Project {
    title: string
    description: string
    year: string
    href: string
}

interface ProjectShowcaseProps {
    projects: Project[]
    title?: string
}

export function ProjectShowcase({
    projects,
    title = "Selected Work",
}: ProjectShowcaseProps) {
    return (
        <section className="relative w-full">
            <h2 className="mb-5 text-sm font-medium">
                {title}
            </h2>

            <div className="divide-y divide-border border-y border-border">
                {projects.map((project) => {
                    return (
                        <a
                            key={project.title}
                            href={project.href}
                            className="group relative flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-muted-foreground"
                        >
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <HoverPreview
                                        title={project.title}
                                        url={project.href}
                                    >
                                        <span className="text-sm font-medium tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                                            {project.title}
                                        </span>
                                    </HoverPreview>

                                    <ArrowUpRight
                                        className="size-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                                    />
                                </div>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {project.description}
                                </p>
                            </div>

                            <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                                {project.year}
                            </span>

                            <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-transparent transition-colors duration-300 group-hover:bg-foreground/[0.025]" />
                        </a>
                    )
                })}
            </div>
        </section>
    )
}