"use client"

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

// Scène WebGL : uniquement côté client.
const PrismCrystal = dynamic(() => import("@/components/ui/prism-hero").then((m) => m.PrismCrystal), {
  ssr: false,
})

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
            transition: ["filter", "opacity", "transform"].map((p) => `${p} 0.5s ease-out ${i * delay}ms`).join(", "),
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
 * Hero plein écran : nom en très gros en haut à gauche (lettres qui apparaissent en flou),
 * accroche et présentation en dessous, flèche vers la suite de la page.
 */
export function PortfolioHero({
  lines,
  tagline,
  intro,
  scrollTo,
  color = "#86efac",
}: {
  lines: string[]
  tagline: string
  intro?: string
  scrollTo: string
  color?: string
}) {
  const nameClass = "flex flex-nowrap whitespace-nowrap leading-[0.87] font-black tracking-tighter uppercase"

  // Chaque ligne reçoit un facteur de taille pour que toutes aient la même largeur :
  // les courtes grossissent, les longues rétrécissent (largeur cible = moyenne géométrique).
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const [scales, setScales] = useState<number[]>(() => lines.map(() => 1))

  useLayoutEffect(() => {
    const measure = () => {
      // Largeur de chaque ligne pour 1px de police : indépendante du facteur déjà appliqué.
      const natural = lineRefs.current.map((el) =>
        el ? el.getBoundingClientRect().width / parseFloat(getComputedStyle(el).fontSize) : 1,
      )
      const target = Math.exp(natural.reduce((sum, w) => sum + Math.log(w), 0) / natural.length)
      setScales(natural.map((w) => target / w))
    }
    measure()
    // La police web peut arriver après le premier rendu et changer les largeurs.
    document.fonts?.ready.then(measure)
  }, [lines])

  return (
    <section className="relative flex min-h-dvh flex-col items-start justify-center overflow-hidden px-6 pt-24 pb-24 sm:px-10 md:px-14 lg:px-20">
      <h1 className="sr-only">{lines.join(" ")}</h1>
      <div className="flex w-full items-center justify-between gap-8">
      <div className="max-w-full min-w-0 text-left">
        <div
          aria-hidden
          className="font-sans text-[clamp(2.75rem,12vw,11.5rem)] md:text-[clamp(3.5rem,9.5vw,11.5rem)]"
        >
          {lines.map((line, i) => (
            <div
              key={line}
              ref={(el) => {
                lineRefs.current[i] = el
              }}
              className="w-fit"
              style={{ fontSize: `${scales[i] ?? 1}em` }}
            >
              <BlurText
                as="span"
                text={line}
                delay={100}
                animateBy="letters"
                direction="top"
                className={nameClass}
                // Première ligne pleine, les suivantes en contour.
                style={i === 0 ? { color } : { color, filter: "url(#hero-outline)", letterSpacing: "0.01em" }}
              />
            </div>
          ))}
        </div>
        {/* Contour tracé sur la silhouette du texte (text-stroke dessinerait
            aussi les tracés internes qui se chevauchent dans la police). */}
        <svg width="0" height="0" className="absolute">
          <filter id="hero-outline">
            <feMorphology in="SourceGraphic" operator="dilate" radius="2" result="dilated" />
            <feComposite in="dilated" in2="SourceGraphic" operator="out" />
          </filter>
        </svg>
        <BlurText
          text={tagline}
          delay={150}
          animateBy="words"
          direction="top"
          className="mt-8 flex font-mono text-[11px] leading-relaxed tracking-[0.35em] text-white/40 uppercase"
        />
        {intro && (
          <BlurText
            text={intro}
            delay={20}
            animateBy="words"
            direction="bottom"
            className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          />
        )}
      </div>

      {/* Cristal à droite du nom, à partir de la taille tablette */}
      <PrismCrystal className="hidden aspect-square w-[min(34vw,520px)] shrink-0 md:block" />
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
