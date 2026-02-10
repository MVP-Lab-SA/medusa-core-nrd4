/**
 * Dynamic Link Component
 * 
 * Wraps TanStack Router's Link to handle dynamic paths that may not be
 * statically known at compile time. This is needed for paths like:
 * - `/${countryCode}/products/${handle}`
 * - `/${countryCode}/account/orders/${orderId}`
 * 
 * Using `as any` to bypass strict route type checking for dynamic paths.
 */

import { Link, type LinkProps } from "@tanstack/react-router"
import { type ReactNode, forwardRef } from "react"

interface DynamicLinkProps extends Omit<LinkProps, 'to'> {
  to: string
  children: ReactNode
  className?: string
}

export const DynamicLink = forwardRef<HTMLAnchorElement, DynamicLinkProps>(
  ({ to, children, ...props }, ref) => {
    return (
      <Link ref={ref} to={to as any} {...props}>
        {children}
      </Link>
    )
  }
)

DynamicLink.displayName = "DynamicLink"

export default DynamicLink
