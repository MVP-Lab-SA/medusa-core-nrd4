import { Link, useParams } from "@tanstack/react-router"
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Users,
  CheckSquare,
  Receipt,
  Shield,
  Building2,
  ChevronRight,
  Plus,
} from "lucide-react"
import { cn } from "../../lib/util/cn"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
}

export function BusinessSidebar({ currentPath }: { currentPath?: string }) {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }

  const navItems: NavItem[] = [
    { label: "Dashboard", href: `/${countryCode}/business/dashboard`, icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Purchase Orders", href: `/${countryCode}/business/orders`, icon: <ShoppingCart className="w-4 h-4" /> },
    { label: "Quotes", href: `/${countryCode}/business/quotes`, icon: <FileText className="w-4 h-4" /> },
    { label: "Team Members", href: `/${countryCode}/business/team`, icon: <Users className="w-4 h-4" /> },
    { label: "Approvals", href: `/${countryCode}/business/approvals`, icon: <CheckSquare className="w-4 h-4" />, badge: 3 },
    { label: "Invoices", href: `/${countryCode}/business/invoices`, icon: <Receipt className="w-4 h-4" /> },
    { label: "Licenses", href: `/${countryCode}/business/licenses`, icon: <Shield className="w-4 h-4" /> },
  ]

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sticky top-24">
        {/* Company Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Acme Corp</h2>
            <p className="text-xs text-gray-500">Business Account</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href || currentPath?.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </span>
                {item.badge ? (
                  <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight className="w-4 h-4" />
                ) : null}
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </p>
          <div className="space-y-2">
            <Link
              to={`/${countryCode}/business/quotes`}
              search={{ action: "new" }}
              className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Request Quote
            </Link>
            <Link
              to={`/${countryCode}/business/orders`}
              search={{ action: "new" }}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Order
            </Link>
          </div>
        </div>

        {/* Account Status */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Credit Limit</span>
              <span className="text-xs text-green-400">Good Standing</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-white">$12,500</span>
              <span className="text-xs text-gray-500">/ $50,000</span>
            </div>
            <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "25%" }} />
            </div>
          </div>
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
