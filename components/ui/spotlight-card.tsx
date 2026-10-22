"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"

import { cn } from "@/lib/utils"

// Les pseudo-éléments ::before / ::after du halo sont dans app/globals.css ([data-glow]).

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: "blue" | "purple" | "green" | "red" | "orange"
  size?: "sm" | "md" | "lg"
  width?: string | number
  height?: string | number
  customSize?: boolean // When true, ignores size prop and uses width/height or className
  radius?: number // Rayon des coins en px, aligné sur la classe rounded-* passée en className
}

// spread = variation de teinte selon la position horizontale du pointeur.
// green : spread réduit pour rester vert (sinon la teinte dérive vers le violet / rose).
const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 130, spread: 30 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
}

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
}

const GlowCard = ({
  children,
  className,
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
  radius = 14,
}: GlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Position du pointeur relative à la carte : `background-attachment: fixed` est ignoré
    // sous un parent transformé (animation d'apparition), le halo partait alors en haut à gauche.
    let last: { x: number; y: number } | null = null

    const update = () => {
      const card = cardRef.current
      if (!card || !last) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty("--x", (last.x - rect.left).toFixed(2))
      card.style.setProperty("--y", (last.y - rect.top).toFixed(2))
      card.style.setProperty("--xp", (last.x / window.innerWidth).toFixed(2))
      card.style.setProperty("--yp", (last.y / window.innerHeight).toFixed(2))
    }

    const syncPointer = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY }
      update()
    }

    document.addEventListener("pointermove", syncPointer, { passive: true })
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      document.removeEventListener("pointermove", syncPointer)
      window.removeEventListener("scroll", update)
    }
  }, [])

  const { base, spread } = glowColorMap[glowColor]

  const style = {
    "--base": base,
    "--spread": spread,
    "--radius": radius,
    "--border": "3",
    "--backdrop": "hsl(0 0% 60% / 0.12)",
    "--backup-border": "var(--backdrop)",
    "--size": "200",
    "--outer": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    ...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === "number" ? `${height}px` : height }),
  } as CSSProperties

  return (
    <div
      ref={cardRef}
      data-glow
      style={style}
      className={cn(
        !customSize && [sizeMap[size], "aspect-[3/4]"],
        "relative grid grid-rows-[1fr_auto] gap-4 rounded-2xl p-4 shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px]",
        className,
      )}
    >
      <div data-glow />
      {children}
    </div>
  )
}

export { GlowCard }
