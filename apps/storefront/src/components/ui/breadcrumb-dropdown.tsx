import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ChevronRightMini, ChevronDownMini, House } from "@medusajs/icons"

interface BreadcrumbItem {
  label: string
  href: string
  children?: BreadcrumbItem[]
}

interface BreadcrumbDropdownProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbDropdown({ items, className = "" }: BreadcrumbDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  return (
    <nav className={`flex items-center gap-1 text-sm ${className}`}>
      <Link to="/us" className="p-1 text-gray-400 hover:text-gray-600">
        <House className="w-4 h-4" />
      </Link>

      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1">
          <ChevronRightMini className="w-4 h-4 text-gray-300" />
          
          {item.children && item.children.length > 0 ? (
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              >
                {item.label}
                <ChevronDownMini className={`w-4 h-4 transition-transform ${openDropdown === idx ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === idx && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    {item.children.map((child, childIdx) => (
                      <Link
                        key={childIdx}
                        to={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : idx === items.length - 1 ? (
            <span className="px-2 py-1 text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link to={item.href} className="px-2 py-1 text-gray-600 hover:text-gray-900">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
