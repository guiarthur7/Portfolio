"use client"

import { useCallback, useEffect, useState } from "react"

/**
 * Callback ref + visibility flag. The ref is stable, so it can be merged with
 * other refs without re-subscribing on every render.
 */
export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(true)
  const observe = useCallback((el: T | null) => setNode(el), [])
  const rootMargin = options?.rootMargin
  const threshold = options?.threshold

  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin, threshold })
    io.observe(node)
    return () => io.disconnect()
  }, [node, rootMargin, threshold])

  return [observe, inView] as const
}
