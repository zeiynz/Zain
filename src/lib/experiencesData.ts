// experiencesData.ts
export interface ExperienceItem {
    role: string
    company: string
    year: string
    description: string
    tags: string[]
    link: string
}

export const experiences: ExperienceItem[] = [
    {
        role: "Founder",
        company: "Lazain Bleu",
        year: "2025 — Present",
        description:
            "Building Lazain Bleu from the ground up, defining its brand identity, strategy, and market presence. The brand combines French perfumery with Islamic and Andalusian heritage, delivering refined and contemporary fragrance experiences.",
        tags: ["Brand Strategist"],
        link: "https://www.instagram.com/lazainbleu/",
    },
    {
        role: "Cloud Computing",
        company: "Bangkit Academy led by Google, GoTo, and Traveloka",
        year: "2024",
        description:
            "Completed a cloud computing program, mastering GCP, Kubernetes, and Terraform. Built scalable applications and deployed microservices.",
        tags: ["Google Cloud", "Kubernetes", "Docker", "Terraform"],
        link: "https://grow.google/intl/id_id/bangkit/",
    },
]