import { NextRequest, NextResponse } from "next/server"

const USER_AGENT =
    "Mozilla/5.0 (compatible; ZainPortfolio/1.0; +https://example.com)"

function getOgImage(html: string) {
    const patterns = [
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
        /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i,
    ]

    for (const pattern of patterns) {
        const match = html.match(pattern)

        if (match?.[1]) {
            return match[1]
        }
    }

    return null
}

function matchesFrameAncestor(
    source: string,
    resourceOrigin: string,
    parentOrigin: string,
) {
    const normalizedSource = source.toLowerCase()
    const parent = new URL(parentOrigin)
    const resource = new URL(resourceOrigin)

    if (normalizedSource === "*") {
        return true
    }

    if (normalizedSource === "'self'") {
        return resource.origin === parent.origin
    }

    if (normalizedSource === "http:" || normalizedSource === "https:") {
        return parent.protocol === normalizedSource
    }

    const sourceWithScheme = normalizedSource.includes("://")
        ? normalizedSource
        : `${parent.protocol}//${normalizedSource.replace(/^\/\//, "")}`
    const match = sourceWithScheme.match(
        /^(https?):\/\/(\*\.)?([^/:]+)(?::(\d+))?(?:\/.*)?$/,
    )

    if (!match) {
        return false
    }

    const [, scheme, wildcard, hostname, port] = match
    const path = sourceWithScheme.match(/^(?:https?):\/\/[^/]+(\/.*)?$/)?.[1]

    if (path && path !== "/") {
        return false
    }

    const hostMatches = wildcard
        ? parent.hostname === hostname || parent.hostname.endsWith(`.${hostname}`)
        : parent.hostname === hostname
    const expectedPort = port || (scheme === "https" ? "443" : "80")
    const parentPort = parent.port || (parent.protocol === "https:" ? "443" : "80")

    return hostMatches && parent.protocol === `${scheme}:` && parentPort === expectedPort
}

function isFrameable(
    headers: Headers,
    resourceOrigin: string,
    parentOrigin: string,
) {
    const frameOptions = headers.get("x-frame-options")?.toLowerCase()

    if (frameOptions?.split(",").some((value) => value.trim() === "deny")) {
        return false
    }

    if (
        frameOptions?.split(",").some((value) => value.trim() === "sameorigin") &&
        resourceOrigin !== parentOrigin
    ) {
        return false
    }

    const contentSecurityPolicy = headers.get("content-security-policy")

    if (!contentSecurityPolicy) {
        return true
    }

    return contentSecurityPolicy.split(",").every((policy) => {
        const frameAncestors = policy
            .split(";")
            .map((directive) => directive.trim().split(/\s+/))
            .find(([name]) => name?.toLowerCase() === "frame-ancestors")

        if (!frameAncestors) {
            return true
        }

        const sources = frameAncestors.slice(1)

        return sources.some((source) =>
            matchesFrameAncestor(source, resourceOrigin, parentOrigin),
        )
    })
}

export async function GET(request: NextRequest) {
    const target = request.nextUrl.searchParams.get("url")
    const mode = request.nextUrl.searchParams.get("mode")

    if (!target) {
        return new NextResponse("Missing URL", {
            status: 400,
        })
    }

    let websiteUrl: URL

    try {
        websiteUrl = new URL(target)
    } catch {
        return new NextResponse("Invalid URL", {
            status: 400,
        })
    }

    if (websiteUrl.protocol !== "https:") {
        return new NextResponse("Only HTTPS URLs are allowed", {
            status: 400,
        })
    }

    try {
        const pageResponse = await fetch(websiteUrl, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "text/html",
            },
            signal: AbortSignal.timeout(8000),
            next: {
                revalidate: 86400,
            },
        })

        if (!pageResponse.ok) {
            if (mode === "check") {
                return NextResponse.json(
                    { error: "Unable to check website frame policy" },
                    { status: 502 },
                )
            }

            return new NextResponse("Unable to fetch website", {
                status: 404,
            })
        }

        if (mode === "check") {
            const resourceUrl = new URL(pageResponse.url || websiteUrl.toString())

            return NextResponse.json(
                {
                    embeddable: isFrameable(
                        pageResponse.headers,
                        resourceUrl.origin,
                        request.nextUrl.origin,
                    ),
                },
                {
                    headers: {
                        "Cache-Control": "no-store",
                    },
                },
            )
        }

        const html = await pageResponse.text()
        const image = getOgImage(html)

        if (!image) {
            return new NextResponse("OG image not found", {
                status: 404,
            })
        }

        const imageUrl = new URL(image, websiteUrl)

        if (imageUrl.protocol !== "https:") {
            return new NextResponse("Invalid image URL", {
                status: 400,
            })
        }

        const imageResponse = await fetch(imageUrl, {
            headers: {
                "User-Agent": USER_AGENT,
            },
            signal: AbortSignal.timeout(8000),
            next: {
                revalidate: 86400,
            },
        })

        if (!imageResponse.ok) {
            return new NextResponse("Unable to fetch image", {
                status: 404,
            })
        }

        const contentType =
            imageResponse.headers.get("content-type") || ""

        if (!contentType.startsWith("image/")) {
            return new NextResponse("URL is not an image", {
                status: 400,
            })
        }

        const imageBuffer = await imageResponse.arrayBuffer()

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control":
                    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
            },
        })
    } catch {
        if (mode === "check") {
            return NextResponse.json(
                { error: "Failed to check frame policy" },
                { status: 502 },
            )
        }

        return new NextResponse("Failed to fetch preview", {
            status: 500,
        })
    }
}