import * as React from "react"
import { clx } from "@medusajs/ui"

interface RichTextProps {
  content: string
  className?: string
}

export function RichText({ content, className }: RichTextProps) {
  return (
    <div
      className={clx(
        "prose prose-invert max-w-none",
        // Headings
        "prose-headings:text-white prose-headings:font-bold",
        "prose-h1:text-4xl prose-h1:mb-6",
        "prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10",
        "prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8",
        "prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6",
        // Paragraphs
        "prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4",
        // Links
        "prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 hover:prose-a:underline",
        // Lists
        "prose-ul:text-zinc-300 prose-ol:text-zinc-300",
        "prose-li:mb-2",
        "marker:prose-ul:text-cyan-500 marker:prose-ol:text-cyan-500",
        // Blockquotes
        "prose-blockquote:border-l-cyan-500 prose-blockquote:bg-zinc-900 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg",
        "prose-blockquote:text-zinc-400 prose-blockquote:italic",
        // Code
        "prose-code:text-cyan-400 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm",
        "prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl",
        // Images
        "prose-img:rounded-xl prose-img:border prose-img:border-zinc-800",
        // Tables
        "prose-table:border-collapse",
        "prose-th:border prose-th:border-zinc-700 prose-th:bg-zinc-800 prose-th:px-4 prose-th:py-2 prose-th:text-white",
        "prose-td:border prose-td:border-zinc-700 prose-td:px-4 prose-td:py-2 prose-td:text-zinc-300",
        // Horizontal rules
        "prose-hr:border-zinc-700 prose-hr:my-8",
        // Strong & emphasis
        "prose-strong:text-white prose-strong:font-semibold",
        "prose-em:text-zinc-200",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

// Markdown-like content renderer
interface MarkdownContentProps {
  children: string
  className?: string
}

export function MarkdownContent({ children, className }: MarkdownContentProps) {
  const html = React.useMemo(() => {
    let result = children
    
    // Headers
    result = result.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    result = result.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    result = result.replace(/^# (.*$)/gim, '<h1>$1</h1>')
    
    // Bold
    result = result.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    
    // Italic
    result = result.replace(/\*(.*?)\*/gim, '<em>$1</em>')
    
    // Links
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    
    // Lists
    result = result.replace(/^\- (.*$)/gim, '<li>$1</li>')
    result = result.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    
    // Paragraphs (wrap remaining text)
    result = result.split('\n\n').map(para => {
      if (!para.startsWith('<')) {
        return `<p>${para}</p>`
      }
      return para
    }).join('')
    
    // Line breaks
    result = result.replace(/\n/gim, '<br>')
    
    return result
  }, [children])

  return <RichText content={html} className={className} />
}

// Content block component for CMS-like content
interface ContentBlockProps {
  type: "text" | "image" | "video" | "quote" | "list" | "code"
  content: string
  caption?: string
  language?: string
  className?: string
}

export function ContentBlock({
  type,
  content,
  caption,
  language,
  className
}: ContentBlockProps) {
  switch (type) {
    case "image":
      return (
        <figure className={clx("my-8", className)}>
          <img
            src={content}
            alt={caption || ""}
            className="w-full rounded-xl border border-zinc-800"
          />
          {caption && (
            <figcaption className="text-center text-zinc-500 text-sm mt-3">
              {caption}
            </figcaption>
          )}
        </figure>
      )

    case "video":
      return (
        <figure className={clx("my-8", className)}>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src={content}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
          {caption && (
            <figcaption className="text-center text-zinc-500 text-sm mt-3">
              {caption}
            </figcaption>
          )}
        </figure>
      )

    case "quote":
      return (
        <blockquote
          className={clx(
            "my-8 pl-6 border-l-2 border-cyan-500",
            className
          )}
        >
          <p className="text-xl text-zinc-300 italic mb-2">"{content}"</p>
          {caption && (
            <cite className="text-zinc-500 text-sm not-italic">- {caption}</cite>
          )}
        </blockquote>
      )

    case "list":
      const items = content.split('\n').filter(Boolean)
      return (
        <ul className={clx("my-6 space-y-2", className)}>
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-zinc-300">
              <span className="text-cyan-500 mt-1.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      )

    case "code":
      return (
        <div className={clx("my-8", className)}>
          {language && (
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 rounded-t-xl border border-b-0 border-zinc-700">
              <span className="text-zinc-400 text-sm">{language}</span>
            </div>
          )}
          <pre
            className={clx(
              "p-4 bg-zinc-900 border border-zinc-700 overflow-x-auto",
              language ? "rounded-b-xl" : "rounded-xl"
            )}
          >
            <code className="text-cyan-400 text-sm font-mono">{content}</code>
          </pre>
        </div>
      )

    default:
      return (
        <p className={clx("text-zinc-300 leading-relaxed my-4", className)}>
          {content}
        </p>
      )
  }
}
