import { useState, useRef, useEffect } from "react"
import { Link } from "@tanstack/react-router"
import { clx } from "@medusajs/ui"
import { ChevronDown } from "@medusajs/icons"

interface MegaMenuItem {
  label: string
  href?: string
  description?: string
  image?: string
  children?: MegaMenuColumn[]
  featured?: {
    title: string
    description: string
    image: string
    href: string
  }
}

interface MegaMenuColumn {
  title: string
  items: {
    label: string
    href: string
    badge?: string
  }[]
}

interface MegaMenuProps {
  items: MegaMenuItem[]
  className?: string
}

export function MegaMenu({ items, className }: MegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <nav ref={menuRef} className={clx("relative", className)}>
      <ul className="flex items-center gap-1">
        {items.map((item, index) => (
          <li
            key={item.label}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            {item.children ? (
              <button
                className={clx(
                  "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeIndex === index
                    ? "text-cyan-400 bg-neutral-800"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/50"
                )}
              >
                {item.label}
                <ChevronDown
                  className={clx(
                    "w-4 h-4 transition-transform",
                    activeIndex === index && "rotate-180"
                  )}
                />
              </button>
            ) : (
              <Link
                to={item.href || "#"}
                className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800/50 transition-colors"
              >
                {item.label}
              </Link>
            )}

            {item.children && activeIndex === index && (
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="absolute left-0 top-full pt-2 z-50"
              >
                <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-6 min-w-[600px]">
                  <div className="flex gap-8">
                    <div className="flex-1 grid grid-cols-2 gap-8">
                      {item.children.map((column) => (
                        <div key={column.title}>
                          <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                            {column.title}
                          </h3>
                          <ul className="space-y-2">
                            {column.items.map((subItem) => (
                              <li key={subItem.label}>
                                <Link
                                  to={subItem.href}
                                  className="flex items-center gap-2 text-sm text-neutral-300 hover:text-cyan-400 transition-colors"
                                >
                                  {subItem.label}
                                  {subItem.badge && (
                                    <span className="px-1.5 py-0.5 text-[10px] font-medium bg-cyan-500/20 text-cyan-400 rounded">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {item.featured && (
                      <div className="w-64">
                        <Link
                          to={item.featured.href}
                          className="block group"
                        >
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                            <img
                              src={item.featured.image}
                              alt={item.featured.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                          <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                            {item.featured.title}
                          </h4>
                          <p className="text-sm text-neutral-400 mt-1">
                            {item.featured.description}
                          </p>
                        </Link>
                      </div>
                    )}
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
