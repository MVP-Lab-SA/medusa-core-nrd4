import * as React from "react"
import { Link } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { clx } from "@medusajs/ui"

interface MegaMenuItem {
  label: string
  href: string
  description?: string
  image?: string
  children?: MegaMenuItem[]
  featured?: boolean
}

interface MegaMenuProps {
  items: MegaMenuItem[]
  className?: string
}

export function MegaMenu({ items, className }: MegaMenuProps) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveItem(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null)
    }, 150)
  }

  return (
    <nav className={clx("relative", className)}>
      <ul className="flex items-center gap-1">
        {items.map((item) => (
          <li
            key={item.label}
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Link
              to={item.href}
              className={clx(
                "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                activeItem === item.label
                  ? "text-cyan-400 bg-zinc-800"
                  : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
              )}
            >
              {item.label}
            </Link>

            {item.children && activeItem === item.label && (
              <div
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full left-0 mt-2 w-[800px] p-6 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl z-50"
              >
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-3">
                    <div className="grid grid-cols-3 gap-6">
                      {item.children.filter(c => !c.featured).map((child) => (
                        <div key={child.label}>
                          <Link
                            to={child.href}
                            className="text-white font-medium hover:text-cyan-400 transition-colors"
                          >
                            {child.label}
                          </Link>
                          {child.children && (
                            <ul className="mt-3 space-y-2">
                              {child.children.map((subChild) => (
                                <li key={subChild.label}>
                                  <Link
                                    to={subChild.href}
                                    className="text-zinc-400 text-sm hover:text-cyan-400 transition-colors flex items-center gap-1 group"
                                  >
                                    {subChild.label}
                                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-1">
                    {item.children.filter(c => c.featured).map((featured) => (
                      <Link
                        key={featured.label}
                        to={featured.href}
                        className="block group"
                      >
                        {featured.image && (
                          <div className="relative rounded-lg overflow-hidden mb-3">
                            <img
                              src={featured.image}
                              alt={featured.label}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        )}
                        <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                          {featured.label}
                        </p>
                        {featured.description && (
                          <p className="text-zinc-500 text-sm mt-1">
                            {featured.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface MegaMenuMobileProps {
  items: MegaMenuItem[]
  isOpen: boolean
  onClose: () => void
}

export function MegaMenuMobile({ items, isOpen, onClose }: MegaMenuMobileProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-80 bg-zinc-900 border-r border-zinc-700 overflow-y-auto">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white">Menu</h2>
        </div>
        
        <nav className="p-4">
          {items.map((item) => (
            <div key={item.label} className="mb-2">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="w-full flex items-center justify-between p-3 rounded-lg text-white hover:bg-zinc-800 transition-colors"
                  >
                    {item.label}
                    <ChevronRight
                      className={clx(
                        "w-5 h-5 transition-transform",
                        expandedItems.includes(item.label) && "rotate-90"
                      )}
                    />
                  </button>
                  
                  {expandedItems.includes(item.label) && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={onClose}
                          className="block p-2 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800/50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block p-3 rounded-lg text-white hover:bg-zinc-800 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
