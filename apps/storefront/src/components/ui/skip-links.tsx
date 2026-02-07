interface SkipLink {
  href: string
  label: string
}

interface SkipLinksProps {
  links?: SkipLink[]
}

export function SkipLinks({
  links = [
    { href: "#main-content", label: "Skip to main content" },
    { href: "#navigation", label: "Skip to navigation" },
    { href: "#footer", label: "Skip to footer" }
  ]
}: SkipLinksProps) {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-white focus-within:p-4 focus-within:shadow-lg">
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          className="block px-4 py-2 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}

interface LiveRegionProps {
  children: React.ReactNode
  politeness?: "polite" | "assertive" | "off"
}

export function LiveRegion({ children, politeness = "polite" }: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  )
}
