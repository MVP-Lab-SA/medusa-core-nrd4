import { Link, useParams } from "@tanstack/react-router"
import {
  Buildings,
  ShoppingCart,
  DocumentText,
  User,
  CheckCircle,
  CurrencyDollar,
  ChevronRight,
  ShieldCheck,
  ChartBar,
} from "@medusajs/icons"
import { clsx } from "clsx"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
}

export function BusinessSidebar({ currentPath }: { currentPath?: string }) {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }

  const navItems: NavItem[] = [
    { label: "Dashboard", href: `/${countryCode}/business/dashboard`, icon: <ChartBar className="w-4 h-4" /> },
    { label: "Orders", href: `/${countryCode}/business/orders`, icon: <ShoppingCart className="w-4 h-4" /> },
    { label: "Quotes", href: `/${countryCode}/business/quotes`, icon: <DocumentText className="w-4 h-4" /> },
    { label: "Invoices", href: `/${countryCode}/business/invoices`, icon: <CurrencyDollar className="w-4 h-4" /> },
    { label: "Team", href: `/${countryCode}/business/team`, icon: <User className="w-4 h-4" /> },
    { label: "Approvals", href: `/${countryCode}/business/approvals`, icon: <CheckCircle className="w-4 h-4" /> },
    { label: "Licenses", href: `/${countryCode}/business/licenses`, icon: <ShieldCheck className="w-4 h-4" /> },
  ]

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sticky top-24">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            <Buildings className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Business Portal</h2>
            <p className="text-xs text-gray-500">Acme Corporation</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.href || currentPath?.startsWith(item.href + "/")
              return (
                <li key={item.href}>
                  <Link
                    to={item.href as any}
                    className={clsx(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-cyan-500 text-black text-xs px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="mt-6 pt-4 border-t border-gray-800">
          <Link
            to={`/${countryCode}/business` as any}
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Back to Business Home
          </Link>
        </div>
      </div>
    </aside>
  )
}

export function BusinessLayout({ children, title, currentPath }: { children: React.ReactNode; title?: string; currentPath?: string }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <BusinessSidebar currentPath={currentPath} />
          <main className="flex-1 min-w-0">
            {title && (
              <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
            )}
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
