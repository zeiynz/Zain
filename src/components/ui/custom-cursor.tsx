"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface CustomCursorProps {
    children: React.ReactNode
    cursorSize?: number
    cursorColor?: string
    magneticFactor?: number
    hoverPadding?: number
    hoverSelector?: string
    disableOnTouch?: boolean
}

interface CursorPosition {
    x: number
    y: number
}

export function CustomCursor({
    children,
    cursorSize = 24,
    cursorColor = "white",
    magneticFactor = 0.2,
    hoverPadding = 12,
    hoverSelector = "[data-magnetic]",
    disableOnTouch = true,
}: CustomCursorProps) {
    const cursorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cursor = cursorRef.current

        if (!cursor) return

        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0

        if (disableOnTouch && isTouchDevice) {
            cursor.style.display = "none"
            return
        }

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches

        const current: CursorPosition = {
            x: -100,
            y: -100,
        }

        const target: CursorPosition = {
            x: -100,
            y: -100,
        }

        let visible = false
        let hoveredElement: HTMLElement | null = null

        gsap.set(cursor, {
            x: -100,
            y: -100,
            opacity: 0,
            scale: 1,
            width: cursorSize,
            height: cursorSize,
        })

        const moveCursor = () => {
            if (prefersReducedMotion) {
                current.x = target.x
                current.y = target.y
            } else {
                current.x += (target.x - current.x) * 0.18
                current.y += (target.y - current.y) * 0.18
            }

            gsap.set(cursor, {
                x: current.x,
                y: current.y,
            })
        }

        const ticker = () => {
            moveCursor()
        }

        const handlePointerMove = (event: PointerEvent) => {
            target.x = event.clientX
            target.y = event.clientY

            if (!visible) {
                visible = true

                gsap.to(cursor, {
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: true,
                })
            }

            if (
                hoveredElement &&
                hoveredElement.matches(hoverSelector)
            ) {
                const rect = hoveredElement.getBoundingClientRect()

                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2

                const offsetX =
                    (event.clientX - centerX) * magneticFactor

                const offsetY =
                    (event.clientY - centerY) * magneticFactor

                gsap.to(hoveredElement, {
                    x: offsetX,
                    y: offsetY,
                    duration: 0.45,
                    ease: "elastic.out(1, 0.35)",
                    overwrite: true,
                })
            }
        }

        const handlePointerLeave = () => {
            visible = false

            gsap.to(cursor, {
                opacity: 0,
                duration: 0.25,
                ease: "power2.out",
                overwrite: true,
            })

            if (hoveredElement) {
                gsap.to(hoveredElement, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.35)",
                    overwrite: true,
                })

                hoveredElement = null
            }
        }

        const handleMagneticEnter = (
            event: PointerEvent,
        ) => {
            const element = event.currentTarget as HTMLElement

            hoveredElement = element

            const rect = element.getBoundingClientRect()

            const width = rect.width + hoverPadding * 2
            const height = rect.height + hoverPadding * 2

            gsap.killTweensOf(cursor)

            gsap.to(cursor, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                width,
                height,
                borderRadius:
                    getComputedStyle(element).borderRadius,
                scale: 1,
                opacity: 1,
                duration: 0.45,
                ease: "expo.out",
                overwrite: true,
            })
        }

        const handleMagneticLeave = (
            event: PointerEvent,
        ) => {
            const element = event.currentTarget as HTMLElement

            if (hoveredElement === element) {
                hoveredElement = null
            }

            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.65,
                ease: "elastic.out(1, 0.35)",
                overwrite: true,
            })

            gsap.to(cursor, {
                width: cursorSize,
                height: cursorSize,
                borderRadius: "999px",
                scale: 1,
                duration: 0.4,
                ease: "expo.out",
                overwrite: true,
            })
        }

        const magneticElements = Array.from(
            document.querySelectorAll<HTMLElement>(
                hoverSelector,
            ),
        )

        magneticElements.forEach((element) => {
            element.addEventListener(
                "pointerenter",
                handleMagneticEnter,
            )

            element.addEventListener(
                "pointerleave",
                handleMagneticLeave,
            )
        })

        gsap.ticker.add(ticker)

        window.addEventListener(
            "pointermove",
            handlePointerMove,
            { passive: true },
        )

        document.documentElement.addEventListener(
            "mouseleave",
            handlePointerLeave,
        )

        return () => {
            gsap.ticker.remove(ticker)

            window.removeEventListener(
                "pointermove",
                handlePointerMove,
            )

            document.documentElement.removeEventListener(
                "mouseleave",
                handlePointerLeave,
            )

            magneticElements.forEach((element) => {
                element.removeEventListener(
                    "pointerenter",
                    handleMagneticEnter,
                )

                element.removeEventListener(
                    "pointerleave",
                    handleMagneticLeave,
                )

                gsap.killTweensOf(element)
                gsap.set(element, {
                    x: 0,
                    y: 0,
                })
            })

            gsap.killTweensOf(cursor)
        }
    }, [
        cursorSize,
        magneticFactor,
        hoverPadding,
        hoverSelector,
        disableOnTouch,
    ])

    return (
        <>
            <div
                ref={cursorRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[99999] hidden -translate-x-1/2 -translate-y-1/2 md:block"
                style={{
                    width: cursorSize,
                    height: cursorSize,
                    borderRadius: "999px",
                    background: cursorColor,
                    mixBlendMode: "difference",
                    willChange:
                        "transform, width, height, border-radius, opacity",
                }}
            />

            {children}
        </>
    )
}