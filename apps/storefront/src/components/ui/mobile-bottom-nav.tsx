import * as React from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { Home, Search, ShoppingBag, User, Heart } from "lucide-react"
import { clx } from "@medusajs/ui"

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
  className
}: MobileBottomNavProps) {
  const location = useLocation()

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: `/${countryCode}`,
      icon: <Home className="w-6 h-6" />
    },
    {
      label: "Search",
      href: `/${countryCode}/store`,
      icon: <Search className="w-6 h-6" />
    },
    {
      label: "Wishlist",
      href: `/${countryCode}/wishlist`,
      icon: <Heart className="w-6 h-6" />,
      badge: wishlistCount
    },
    {
      label: "Cart",
      href: `/${countryCode}/cart`,
      icon: <ShoppingBag className="w-6 h-6" />,
      badge: cartCount
    },
    {
      label: "Account",
      href: `/${countryCode}/account`,
      icon: <User className="w-6 h-6" />
    }
  ]

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/")
  }

  return (
    <nav
      className={clx(
        "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
        "bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800",
        "safe-area-bottom",
        className
      )}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={clx(
              "flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-xl transition-all",
              isActive(item.href)
                ? "text-cyan-400 bg-cyan-500/10"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <div className="relative">
              {item.icon}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-cyan-500 text-black text-xs font-bold">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
