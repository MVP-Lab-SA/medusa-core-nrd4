import { ChevronRightMini } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"
import { clsx } from "clsx"
import { Fragment } from "react"

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={clsx("flex items-center", className)}>
      <ol className="flex items-center gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <Fragment key={`breadcrumb-${index}-${item.label}`}>
              <li className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="text-city-muted hover:text-city-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={clsx(
                      isLast ? "text-city-white font-medium" : "text-city-muted"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="text-city-steel">
                  <ChevronRightMini className="w-4 h-4" />
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumbs }
export type { BreadcrumbItem }
export default Breadcrumbs
