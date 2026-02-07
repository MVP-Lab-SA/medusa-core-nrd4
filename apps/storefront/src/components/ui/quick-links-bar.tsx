import { Link } from "@tanstack/react-router"

interface QuickLink {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: string
}

interface QuickLinksBarProps {
  links: QuickLink[]
  className?: string
}

export function QuickLinksBar({ links, className = "" }: QuickLinksBarProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${className}`}>
      {links.map((link, idx) => (
        <Link
          key={idx}
          to={link.href}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
        >
          {link.icon}
          <span className="text-sm font-medium text-gray-700">{link.label}</span>
          {link.badge && (
            <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
              {link.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}
