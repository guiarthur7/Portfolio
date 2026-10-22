"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

// BlurText animation component
interface BlurTextProps {
  text: string
  delay?: number
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  as?: "p" | "h1" | "span"
  className?: string
  style?: React.CSSProperties
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  as: Tag = "p",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("")
  }, [text, animateBy])

  return (
    <Tag
      ref={ref as React.Ref<HTMLParagraphElement & HTMLHeadingElement>}
      aria-label={text}
      className={cn("inline-flex flex-wrap", className)}
      style={style}
    >
      {segments.map((segment, i) => (
        <span
          key={i}
          aria-hidden
          className="motion-reduce:!transition-none"
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  )
}

/**
 * Hero plein écran : nom en très gros au centre (lettres qui apparaissent en flou),
 * accroche en bas et flèche vers la suite de la page.
 */
export function PortfolioHero({
  lines,
  tagline,
  scrollTo,
  color = "#86efac",
}: {
  lines: string[]
  tagline: string
  scrollTo: string
  color?: string
}) {
  const nameClass =
    "w-full justify-center whitespace-nowrap font-code leading-[0.8] font-bold tracking-tighter uppercase"

  // Police à chasse fixe : largeur ∝ nombre de lettres × taille.
  // Chaque ligne est agrandie pour avoir la même largeur que la plus longue.
  const longest = Math.max(...lines.map((l) => l.length))

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4">
      <h1 className="sr-only">{lines.join(" ")}</h1>
      <div aria-hidden className="text-center">
        {lines.map((line) => (
          <BlurText
            key={line}
            as="span"
            text={line}
            delay={100}
            animateBy="letters"
            direction="top"
            className={cn(nameClass, "flex")}
            style={{ color, fontSize: `calc(clamp(3.5rem, 15vw, 13rem) * ${longest / line.length})` }}
          />
        ))}
      </div>

      <div className="absolute bottom-20 left-1/2 w-full -translate-x-1/2 px-6 sm:bottom-24 lg:bottom-28">
        <div className="flex justify-center">
          <BlurText
            text={tagline}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-center text-base text-white/60 sm:text-lg md:text-xl lg:text-2xl"
          />
        </div>
      </div>

      <a
        href={scrollTo}
        aria-label="Défiler vers la suite"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 transition-colors hover:text-white md:bottom-10"
      >
        <ChevronDown className="size-6 animate-bounce motion-reduce:animate-none md:size-8" />
      </a>
    </section>
  )
}
