import { HoverPreview } from "@/components/ui/hover-preview"

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

export default function ExperienceSection() {
    return (
        <>
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
        </>
    )
}
