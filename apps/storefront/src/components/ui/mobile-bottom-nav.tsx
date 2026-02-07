import { Link, useLocation } from "@tanstack/react-router"
import { clx } from "@medusajs/ui"
import { House, ShoppingBag, MagnifyingGlass, User, Heart } from "@medusajs/icons"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

interface MobileBottomNavProps {
  countryCode?: string
  cartCount?: number
  wishlistCount?: number
  className?: string
}

export function MobileBottomNav({
  countryCode = "us",
  cartCount = 0,
  wishlistCount = 0,
  className,
}: MobileBottomNavProps) {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: `/${countryCode}`,
      icon: <House className="w-5 h-5" />,
    },
    {
      label: "Search",
      href: `/${countryCode}/search`,
      icon: <MagnifyingGlass className="w-5 h-5" />,
    },
    {
      label: "Wishlist",
      href: `/${countryCode}/wishlist`,
      icon: <Heart className="w-5 h-5" />,
      badge: wishlistCount,
    },
    {
      label: "Cart",
      href: `/${countryCode}/cart`,
      icon: <ShoppingBag className="w-5 h-5" />,
      badge: cartCount,
    },
    {
      label: "Account",
      href: `/${countryCode}/account`,
      icon: <User className="w-5 h-5" />,
    },
  ]

  const isActive = (href: string) => {
    if (href === `/${countryCode}`) {
      return currentPath === href
    }
    return currentPath.startsWith(href)
  }

  return (
    <nav
      className={clx(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-800",
        "safe-area-pb",
        className
      )}
    >
      <ul className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.href}
              className={clx(
                "flex flex-col items-center gap-1 px-4 py-2 transition-colors relative",
                isActive(item.href)
                  ? "text-cyan-400"
                  : "text-neutral-500 active:text-neutral-300"
              )}
            >
              <span className="relative">
                {item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center px-1 text-[10px] font-bold bg-cyan-500 text-black rounded-full">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
