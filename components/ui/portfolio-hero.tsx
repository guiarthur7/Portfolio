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
    "flex w-full justify-center whitespace-nowrap font-sans text-[clamp(3.5rem,9.5vw,11.5rem)] leading-[0.87] font-black tracking-tighter uppercase"

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4">
      <h1 className="sr-only">{lines.join(" ")}</h1>
      <div aria-hidden className="text-center">
        {lines.map((line, i) => (
          <BlurText
            key={line}
            as="span"
            text={line}
            delay={100}
            animateBy="letters"
            direction="top"
            className={nameClass}
            // Première ligne pleine, les suivantes en contour.
            style={i === 0 ? { color } : { color, filter: "url(#hero-outline)", letterSpacing: "0.01em" }}
          />
        ))}
        {/* Contour tracé sur la silhouette du texte (text-stroke dessinerait
            aussi les tracés internes qui se chevauchent dans la police). */}
        <svg width="0" height="0" className="absolute">
          <filter id="hero-outline">
            <feMorphology in="SourceGraphic" operator="dilate" radius="2" result="dilated" />
            <feComposite in="dilated" in2="SourceGraphic" operator="out" />
          </filter>
        </svg>
        <div className="mt-8 flex justify-center">
          <BlurText
            text={tagline}
            delay={150}
            animateBy="words"
            direction="top"
            className="max-w-sm justify-center text-center font-mono text-[11px] leading-relaxed tracking-[0.35em] text-white/40 uppercase"
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
