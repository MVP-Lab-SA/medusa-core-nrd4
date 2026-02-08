import { Link, useParams } from "@tanstack/react-router"
import {
  BuildingStorefront,
  Buildings,
  Calendar,
  ShoppingBag,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  CircleStack,
} from "@medusajs/icons"

interface NavCategory {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  links: { label: string; href: string; description?: string }[]
}

export function PlatformNav() {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }

  const categories: NavCategory[] = [
    {
      title: "Marketplace",
      description: "Shop from vendors and businesses",
      icon: <BuildingStorefront className="w-6 h-6" />,
      color: "cyan",
      links: [
        { label: "All Vendors", href: `/${countryCode}/vendors`, description: "Browse marketplace vendors" },
        { label: "Flash Sales", href: `/${countryCode}/flash-sales`, description: "Limited time offers" },
        { label: "Bundles", href: `/${countryCode}/bundles`, description: "Product bundles & deals" },
        { label: "Referral Program", href: `/${countryCode}/referrals`, description: "Earn rewards" },
      ],
    },
    {
      title: "Business Portal",
      description: "B2B purchasing & management",
      icon: <Buildings className="w-6 h-6" />,
      color: "blue",
      links: [
        { label: "Business Home", href: `/${countryCode}/business`, description: "B2B landing page" },
        { label: "Register Business", href: `/${countryCode}/business/register`, description: "Create business account" },
        { label: "Dashboard", href: `/${countryCode}/business/dashboard`, description: "Business dashboard" },
      ],
    },
    {
      title: "Services & Bookings",
      description: "Book appointments & services",
      icon: <Calendar className="w-6 h-6" />,
      color: "purple",
      links: [
        { label: "All Services", href: `/${countryCode}/services`, description: "Browse bookable services" },
        { label: "Service Providers", href: `/${countryCode}/providers`, description: "Find providers" },
      ],
    },
    {
      title: "Subscriptions",
      description: "Recurring delivery plans",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "green",
      links: [
        { label: "Subscription Plans", href: `/${countryCode}/subscriptions`, description: "View all plans" },
      ],
    },
    {
      title: "Delivery & Tracking",
      description: "Track orders & manage returns",
      icon: <CircleStack className="w-6 h-6" />,
      color: "orange",
      links: [
        { label: "Track Order", href: `/${countryCode}/track`, description: "Track your delivery" },
        { label: "Delivery Slots", href: `/${countryCode}/delivery-slots`, description: "Choose delivery time" },
        { label: "Returns", href: `/${countryCode}/returns`, description: "Manage returns" },
      ],
    },
    {
      title: "Identity & Verification",
      description: "Verify your identity",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "red",
      links: [
        { label: "Verification Hub", href: `/${countryCode}/verify`, description: "Identity verification" },
        { label: "KYC Verification", href: `/${countryCode}/verify/kyc`, description: "Complete KYC" },
        { label: "Age Verification", href: `/${countryCode}/verify/age`, description: "Verify your age" },
      ],
    },
    {
      title: "Events & Venues",
      description: "Discover local events",
      icon: <MapPin className="w-6 h-6" />,
      color: "pink",
      links: [
        { label: "Events", href: `/${countryCode}/events`, description: "Upcoming events" },
        { label: "Venues", href: `/${countryCode}/venues`, description: "Browse venues" },
      ],
    },
    {
      title: "Content & Help",
      description: "Resources and support",
      icon: <Sparkles className="w-6 h-6" />,
      color: "yellow",
      links: [
        { label: "Blog", href: `/${countryCode}/blog`, description: "Latest articles" },
        { label: "Help Center", href: `/${countryCode}/help`, description: "FAQs & support" },
        { label: "Announcements", href: `/${countryCode}/announcements`, description: "Platform news" },
      ],
    },
  ]

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400" },
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
    green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" },
    red: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400" },
    yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400" },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => {
        const colors = colorClasses[category.color]
        return (
          <div
            key={category.title}
            className={`${colors.bg} ${colors.border} border rounded-xl p-5`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`${colors.text}`}>{category.icon}</div>
              <div>
                <h3 className="font-semibold text-white">{category.title}</h3>
                <p className="text-xs text-gray-500">{category.description}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {category.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href as any}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

// Mega menu content for header
export function HeaderMegaMenu() {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }

  return (
    <div className="grid grid-cols-4 gap-8 p-6">
      {/* Shop */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Shop</h3>
        <ul className="space-y-2">
          <li><Link to={`/${countryCode}/store` as any} className="text-sm text-gray-400 hover:text-white">All Products</Link></li>
          <li><Link to={`/${countryCode}/vendors` as any} className="text-sm text-gray-400 hover:text-white">Vendors</Link></li>
          <li><Link to={`/${countryCode}/flash-sales` as any} className="text-sm text-gray-400 hover:text-white">Flash Sales</Link></li>
          <li><Link to={`/${countryCode}/bundles` as any} className="text-sm text-gray-400 hover:text-white">Bundles</Link></li>
          <li><Link to={`/${countryCode}/subscriptions` as any} className="text-sm text-gray-400 hover:text-white">Subscriptions</Link></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Services</h3>
        <ul className="space-y-2">
          <li><Link to={`/${countryCode}/services` as any} className="text-sm text-gray-400 hover:text-white">All Services</Link></li>
          <li><Link to={`/${countryCode}/providers` as any} className="text-sm text-gray-400 hover:text-white">Providers</Link></li>
          <li><Link to={`/${countryCode}/events` as any} className="text-sm text-gray-400 hover:text-white">Events</Link></li>
          <li><Link to={`/${countryCode}/venues` as any} className="text-sm text-gray-400 hover:text-white">Venues</Link></li>
        </ul>
      </div>

      {/* Business */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Business</h3>
        <ul className="space-y-2">
          <li><Link to={`/${countryCode}/business` as any} className="text-sm text-gray-400 hover:text-white">B2B Portal</Link></li>
          <li><Link to={`/${countryCode}/business/register` as any} className="text-sm text-gray-400 hover:text-white">Register Business</Link></li>
          <li><Link to={`/${countryCode}/referrals` as any} className="text-sm text-gray-400 hover:text-white">Referral Program</Link></li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Support</h3>
        <ul className="space-y-2">
          <li><Link to={`/${countryCode}/track` as any} className="text-sm text-gray-400 hover:text-white">Track Order</Link></li>
          <li><Link to={`/${countryCode}/returns` as any} className="text-sm text-gray-400 hover:text-white">Returns</Link></li>
          <li><Link to={`/${countryCode}/help` as any} className="text-sm text-gray-400 hover:text-white">Help Center</Link></li>
          <li><Link to={`/${countryCode}/blog` as any} className="text-sm text-gray-400 hover:text-white">Blog</Link></li>
        </ul>
      </div>
    </div>
  )
}
