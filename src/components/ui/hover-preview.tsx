"use client"

import {
    useEffect,
    useRef,
    useState,
    type PointerEvent,
    type ReactNode,
} from "react"

import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from "motion/react"

interface HoverPreviewProps {
    children: ReactNode
    title: string
    url: string
    fullWidth?: boolean
}

const PREVIEW_WIDTH = 360
const PREVIEW_ASPECT = 16 / 9
const PREVIEW_HEIGHT = PREVIEW_WIDTH / PREVIEW_ASPECT

const VIRTUAL_WIDTH = 1440
const VIRTUAL_HEIGHT = 810
const VIRTUAL_SCALE = PREVIEW_WIDTH / VIRTUAL_WIDTH

const CURSOR_OFFSET = 20
const VIEWPORT_GUTTER = 16

function isPreviewableUrl(url: string) {
    try {
        return new URL(url).protocol === "https:"
    } catch {
        return false
    }
}

export function HoverPreview({
    children,
    title,
    url,
    fullWidth = false,
}: HoverPreviewProps) {
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const [fallback, setFallback] = useState(false)

    const pointer = useRef({
        x: 0,
        y: 0,
    })

    const frame = useRef<number | null>(null)

    const hideTimeout = useRef<
        ReturnType<typeof setTimeout> | null
    >(null)

    const controller = useRef<AbortController | null>(null)

    const reducedMotion = useReducedMotion()

    const targetX = useMotionValue(0)
    const targetY = useMotionValue(0)

    const x = useSpring(targetX, {
        stiffness: reducedMotion ? 1000 : 320,
        damping: reducedMotion ? 100 : 32,
        mass: 0.4,
    })

    const y = useSpring(targetY, {
        stiffness: reducedMotion ? 1000 : 320,
        damping: reducedMotion ? 100 : 32,
        mass: 0.4,
    })

    const fallbackUrl =
        `/api/og-image?url=${encodeURIComponent(url)}`

    useEffect(() => {
        return () => {
            if (frame.current !== null) {
                cancelAnimationFrame(frame.current)
            }

            if (hideTimeout.current !== null) {
                clearTimeout(hideTimeout.current)
            }

            controller.current?.abort()
        }
    }, [])

    function updatePosition() {
        frame.current = null

        const width = Math.min(
            PREVIEW_WIDTH,
            window.innerWidth - VIEWPORT_GUTTER * 2,
        )

        const height = width / PREVIEW_ASPECT

        const cursorX = pointer.current.x
        const cursorY = pointer.current.y

        let left = cursorX - width / 2

        left = Math.max(
            VIEWPORT_GUTTER,
            Math.min(
                left,
                window.innerWidth -
                width -
                VIEWPORT_GUTTER,
            ),
        )

        let top =
            cursorY -
            height -
            CURSOR_OFFSET

        if (top < VIEWPORT_GUTTER) {
            top = cursorY + CURSOR_OFFSET
        }

        top = Math.max(
            VIEWPORT_GUTTER,
            Math.min(
                top,
                window.innerHeight -
                height -
                VIEWPORT_GUTTER,
            ),
        )

        targetX.set(left)
        targetY.set(top)
    }

    function movePreview(
        clientX: number,
        clientY: number,
    ) {
        pointer.current = {
            x: clientX,
            y: clientY,
        }

        if (frame.current === null) {
            frame.current =
                requestAnimationFrame(updatePosition)
        }
    }

    function handlePointerEnter(
        event: PointerEvent<HTMLSpanElement>,
    ) {
        if (
            event.pointerType !== "mouse" &&
            event.pointerType !== "pen"
        ) {
            return
        }

        if (!isPreviewableUrl(url)) {
            return
        }

        if (hideTimeout.current !== null) {
            clearTimeout(hideTimeout.current)
            hideTimeout.current = null
        }

        movePreview(
            event.clientX,
            event.clientY,
        )

        setFallback(false)
        setVisible(true)
        setOpen(true)

        controller.current?.abort()

        const requestController =
            new AbortController()

        controller.current = requestController

        void fetch(
            `/api/og-image?mode=check&url=${encodeURIComponent(url)}`,
            {
                signal: requestController.signal,
            },
        )
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        `Preview check failed: ${response.status}`,
                    )
                }

                const result: {
                    embeddable: boolean
                } = await response.json()

                if (
                    !result.embeddable &&
                    !requestController.signal.aborted
                ) {
                    setFallback(true)
                }
            })
            .catch((error: unknown) => {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return
                }

                setFallback(true)
            })
    }

    function handlePointerMove(
        event: PointerEvent<HTMLSpanElement>,
    ) {
        if (!open) {
            return
        }

        movePreview(
            event.clientX,
            event.clientY,
        )
    }

    function handlePointerLeave() {
        controller.current?.abort()
        controller.current = null

        setOpen(false)

        hideTimeout.current = setTimeout(
            () => {
                setVisible(false)
            },
            reducedMotion ? 0 : 140,
        )
    }

    return (
        <>
            <span
                className={
                    fullWidth
                        ? "block"
                        : "inline-block"
                }
                onPointerEnter={handlePointerEnter}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
            >
                {children}
            </span>

            {visible && (
                <motion.div
                    className="pointer-events-none fixed left-0 top-0 z-[9999] overflow-hidden rounded-xl border border-border/60 bg-background shadow-2xl"
                    style={{
                        x,
                        y,
                        width: PREVIEW_WIDTH,
                        height: PREVIEW_HEIGHT,
                    }}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: open ? 1 : 0,
                    }}
                    transition={{
                        opacity: {
                            duration: reducedMotion
                                ? 0
                                : 0.12,
                            ease: "easeOut",
                        },
                    }}
                >
                    <div
                        className="relative overflow-hidden"
                        style={{
                            width: PREVIEW_WIDTH,
                            height: PREVIEW_HEIGHT,
                        }}
                    >
                        {fallback ? (
                            <div
                                role="img"
                                aria-label={`${title} preview`}
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        `url("${fallbackUrl}")`,
                                }}
                            />
                        ) : open ? (
                            <div
                                className="absolute left-0 top-0 origin-top-left"
                                style={{
                                    width: VIRTUAL_WIDTH,
                                    height: VIRTUAL_HEIGHT,
                                    transform: `scale(${VIRTUAL_SCALE})`,
                                }}
                            >
                                <iframe
                                    src={url}
                                    title={`${title} live preview`}
                                    loading="lazy"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    referrerPolicy="no-referrer"
                                    className="block border-0"
                                    style={{
                                        width: VIRTUAL_WIDTH,
                                        height: VIRTUAL_HEIGHT,
                                    }}
                                    onError={() =>
                                        setFallback(true)
                                    }
                                />
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            )}
        </>
    )
}

export default HoverPreview