import { Link, useParams } from "@tanstack/react-router"
import {
  User,
  ShoppingBag,
  Heart,
  CreditCard,
  MapPin,
  CogSixTooth,
  ArrowDownTray,
  Key,
  Calendar,
  ArrowPath,
  Star,
  Gift,
  BuildingStorefront,
  DocumentText,
  ExclamationCircle,
  ShieldCheck,
  Clock,
  ChevronRight,
  Sparkles,
  CurrencyDollar,
  BellAlert,
} from "@medusajs/icons"
import { clsx } from "clsx"

interface NavSection {
  title: string
  items: NavItem[]
}

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
}

export function AccountSidebar({ currentPath }: { currentPath?: string }) {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }

  const navSections: NavSection[] = [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", href: `/${countryCode}/account`, icon: <User className="w-4 h-4" /> },
        { label: "Profile", href: `/${countryCode}/account/profile`, icon: <User className="w-4 h-4" /> },
        { label: "Addresses", href: `/${countryCode}/account/addresses`, icon: <MapPin className="w-4 h-4" /> },
      ],
    },
    {
      title: "Shopping",
      items: [
        { label: "Orders", href: `/${countryCode}/account/orders`, icon: <ShoppingBag className="w-4 h-4" /> },
        { label: "Wishlists", href: `/${countryCode}/account/wishlists`, icon: <Heart className="w-4 h-4" /> },
        { label: "Reviews", href: `/${countryCode}/account/reviews`, icon: <Star className="w-4 h-4" /> },
        { label: "Referrals", href: `/${countryCode}/account/referrals`, icon: <Gift className="w-4 h-4" /> },
      ],
    },
    {
      title: "Subscriptions & Bookings",
      items: [
        { label: "Subscriptions", href: `/${countryCode}/account/subscriptions`, icon: <ArrowPath className="w-4 h-4" /> },
        { label: "Bookings", href: `/${countryCode}/account/bookings`, icon: <Calendar className="w-4 h-4" /> },
      ],
    },
    {
      title: "Digital Products",
      items: [
        { label: "Downloads", href: `/${countryCode}/account/downloads`, icon: <ArrowDownTray className="w-4 h-4" /> },
        { label: "Licenses", href: `/${countryCode}/account/licenses`, icon: <Key className="w-4 h-4" /> },
      ],
    },
    {
      title: "Delivery & Returns",
      items: [
        { label: "Deliveries", href: `/${countryCode}/account/deliveries`, icon: <BuildingStorefront className="w-4 h-4" /> },
      ],
    },
    {
      title: "Payments & Wallet",
      items: [
        { label: "Payment Methods", href: `/${countryCode}/account/payment-methods`, icon: <CreditCard className="w-4 h-4" /> },
        { label: "Wallet", href: `/${countryCode}/account/wallet`, icon: <CurrencyDollar className="w-4 h-4" /> },
        { label: "Transactions", href: `/${countryCode}/account/transactions`, icon: <DocumentText className="w-4 h-4" /> },
        { label: "Installments", href: `/${countryCode}/account/installments`, icon: <Clock className="w-4 h-4" /> },
        { label: "Disputes", href: `/${countryCode}/account/disputes`, icon: <ExclamationCircle className="w-4 h-4" /> },
        { label: "Loyalty Points", href: `/${countryCode}/account/loyalty`, icon: <Sparkles className="w-4 h-4" /> },
        { label: "Store Credits", href: `/${countryCode}/account/credits`, icon: <CurrencyDollar className="w-4 h-4" /> },
      ],
    },
    {
      title: "Settings",
      items: [
        { label: "Notifications", href: `/${countryCode}/account/notifications`, icon: <BellAlert className="w-4 h-4" /> },
        { label: "Security", href: `/${countryCode}/account/security`, icon: <ShieldCheck className="w-4 h-4" /> },
        { label: "Preferences", href: `/${countryCode}/account/settings`, icon: <CogSixTooth className="w-4 h-4" /> },
      ],
    },
    {
      title: "Identity & Compliance",
      items: [
        { label: "Credentials", href: `/${countryCode}/account/credentials`, icon: <ShieldCheck className="w-4 h-4" /> },
        { label: "Consents", href: `/${countryCode}/account/consents`, icon: <DocumentText className="w-4 h-4" /> },
      ],
    },
    {
      title: "Finance",
      items: [
        { label: "Statements", href: `/${countryCode}/account/statements`, icon: <DocumentText className="w-4 h-4" /> },
        { label: "Tax Certificates", href: `/${countryCode}/account/tax-certificates`, icon: <DocumentText className="w-4 h-4" /> },
      ],
    },
  ]

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sticky top-24">
        <h2 className="text-lg font-semibold text-white mb-4">My Account</h2>
        <nav className="space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
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
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export function AccountLayout({ children, title, currentPath }: { children: React.ReactNode; title?: string; currentPath?: string }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar currentPath={currentPath} />
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
