import { StackHover } from "@/components/ui/stack-hover"

export default function HowIWork() {
    return (
        <>
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
                                name: "React.js",
                                description: "Component-based UI",
                            },
                            {
                                name: "TypeScript",
                                description: "Type-safe development",
                            },
                            {
                                name: "Tailwind CSS",
                                description: "Utility-first styling",
                            },
                            {
                                name: "shadcn/ui",
                                description: "Reusable UI components",
                            },
                            {
                                name: "Python",
                                description: "Backend & AI development",
                            },
                            {
                                name: "Claude",
                                description: "AI-powered coding",
                            },
                            {
                                name: "Figma",
                                description: "UI/UX design",
                            },
                            {
                                name: "GCP",
                                description: "Cloud infrastructure",
                            },
                        ]}
                    />
                </div>
            </section>
        </>
    )
}
