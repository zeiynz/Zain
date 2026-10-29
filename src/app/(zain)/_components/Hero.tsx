"use client"

import { TextShimmer } from "@/components/ui/text-shimmer"
import Project from "./Project"
import Experience from "./Experience"
import HowIWork from "./HowIWork"

export default function Hero() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
            {/* Hero */}
            <section className="animate-in fade-in duration-700">
                <div className="flex items-start justify-between gap-8">
                    <div className="space-y-1">
                        <h1 className="text-lg font-medium tracking-tight">
                            Zain S.
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            From Engineer to Founder
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        malang | london
                    </p>
                </div>

                <div className="mt-10 max-w-xl space-y-4 text-[15px] leading-7 sm:text-base">
                    <TextShimmer
                        as="p"
                        duration={4}
                    >
                        I build products and businesses by solving real problems with software.
                    </TextShimmer>

                    <p className="text-muted-foreground">
                        Mostly interested in software, AI, and the space
                        between a good idea and something people actually
                        use.
                    </p>
                </div>
            </section>

            <Project />

            <Experience />

            <HowIWork />
        </main>
    )
}