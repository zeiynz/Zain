const socials = [
    {
        label: "GitHub",
        href: "https://github.com/zeiynz",
    },
    {
        label: "Instagram",
        href: "https://instagram.com/iamzeiyn",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/zeiyn/",
    },
    {
        label: "Email",
        href: "mailto:z3eiyn@gmail.com",
    },
]

export function Footer() {
    return (
        <footer className="mt-auto border-t border-border">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-5 text-xs text-muted-foreground sm:px-8">
                <span>© {new Date().getFullYear()} Iamzeiyn</span>

                <nav className="flex items-center gap-4" aria-label="Social links">
                    {socials.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                            className="transition-colors hover:text-foreground"
                        >
                            {label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    )
}