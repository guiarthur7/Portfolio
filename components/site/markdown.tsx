import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

// Le HTML brut écrit dans le Markdown n'est pas interprété (pas de rehype-raw) : pas de XSS via un write-up.
export function MarkdownContent({ content, className }: { content: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-3xl first:prose-h2:mt-0 prose-a:text-white prose-a:decoration-white/30 hover:prose-a:decoration-white prose-p:text-white/75 prose-li:text-white/75 prose-code:rounded-md prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/70 prose-blockquote:border-white/20 prose-blockquote:text-white/60 prose-blockquote:not-italic prose-hr:border-white/10 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
        className,
      )}
    >
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>
        {content}
      </Markdown>
    </div>
  )
}
