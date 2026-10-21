import { HoverPreview } from "@/components/ui/hover-preview"

type Project = {
    title: string
    description: string
    year: string
    href: string
}

const projects: Project[] = [
    {
        title: "Launch Fast",
        description: "A Next.js SaaS starter built to ship faster.",
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
]

export default function ProjectsSection() {
    return (
        <>
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
        </>
    )
}
