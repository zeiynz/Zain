const PREVIEW_HOSTS = new Set([
    "launchfast-site.pages.dev",
    "clyveai.vercel.app",
    "grow.google",
])

const CHECK_TIMEOUT_MS = 2500

function parsePreviewUrl(value: string | null) {
    if (!value) {
        return null
    }

    try {
        const url = new URL(value)

        if (
            url.protocol !== "https:" ||
            !PREVIEW_HOSTS.has(url.hostname)
        ) {
            return null
        }

        return url
    } catch {
        return null
    }
}

function sourceAllowsOrigin(source: string, origin: URL) {
    if (source === "*") {
        return true
    }

    if (source === "'self'") {
        return false
    }

    try {
        const allowed = new URL(source)

        if (allowed.origin === origin.origin) {
            return true
        }

        if (allowed.hostname.startsWith("*.")) {
            const baseDomain = allowed.hostname.slice(2)

            return (
                origin.hostname.endsWith(`.${baseDomain}`) &&
                allowed.protocol === origin.protocol
            )
        }
    } catch {
        return source === "https:" && origin.protocol === "https:"
    }

    return false
}

function canEmbed(response: Response, target: URL, appOrigin: URL) {
    const frameOptions = response.headers
        .get("x-frame-options")
        ?.toLowerCase()

    if (frameOptions?.includes("deny")) {
        return false
    }

    if (
        frameOptions?.includes("sameorigin") &&
        target.origin !== appOrigin.origin
    ) {
        return false
    }

    const policy = response.headers
        .get("content-security-policy")
        ?.match(/(?:^|;)\s*frame-ancestors\s+([^;]+)/i)?.[1]

    if (!policy) {
        return response.ok
    }

    return policy
        .trim()
        .split(/\s+/)
        .some((source) => sourceAllowsOrigin(source, appOrigin))
}

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const target = parsePreviewUrl(requestUrl.searchParams.get("url"))

    if (!target) {
        return Response.json(
            { error: "Unsupported preview URL" },
            { status: 400 },
        )
    }

    if (requestUrl.searchParams.get("mode") === "check") {
        let embeddable = false

        try {
            const response = await fetch(target, {
                method: "HEAD",
                redirect: "follow",
                signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
            })

            embeddable = canEmbed(response, target, requestUrl)
        } catch {
            embeddable = false
        }

        return Response.json(
            { embeddable },
            {
                headers: {
                    "Cache-Control": "private, max-age=300",
                },
            },
        )
    }

    const imageUrl =
        `https://s.wordpress.com/mshots/v1/${encodeURIComponent(target.href)}?w=720`

    return Response.redirect(imageUrl, 302)
}