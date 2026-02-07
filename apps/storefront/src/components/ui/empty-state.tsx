import { clx } from "@medusajs/ui"
import { Link } from "@tanstack/react-router"
import { 
  ShoppingBag, 
  MagnifyingGlass, 
  Heart, 
  DocumentText, 
  MapPin, 
  ShoppingCart,
  ExclamationCircle 
} from "@medusajs/icons"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  variant?: "default" | "compact" | "large"
  className?: string
}

const presetIcons = {
  cart: <ShoppingBag className="w-12 h-12" />,
  search: <MagnifyingGlass className="w-12 h-12" />,
  wishlist: <Heart className="w-12 h-12" />,
  orders: <DocumentText className="w-12 h-12" />,
  addresses: <MapPin className="w-12 h-12" />,
  products: <ShoppingCart className="w-12 h-12" />,
  error: <ExclamationCircle className="w-12 h-12" />,
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "default",
  className,
}: EmptyStateProps) {
  const renderIcon = () => {
    if (typeof icon === "string" && icon in presetIcons) {
      return presetIcons[icon as keyof typeof presetIcons]
    }
    return icon || presetIcons.cart
  }

  if (variant === "compact") {
    return (
      <div className={clx("flex items-center gap-4 p-4", className)}>
        <div className="text-neutral-600 flex-shrink-0">
          {renderIcon()}
        </div>
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-neutral-500 mt-0.5">{description}</p>
          )}
        </div>
        {action && (
          action.href ? (
            <Link
              to={action.href}
              className="ml-auto px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="ml-auto px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
            >
              {action.label}
            </button>
          )
        )}
      </div>
    )
  }

  if (variant === "large") {
    return (
      <div className={clx("text-center py-20", className)}>
        <div className="w-24 h-24 mx-auto mb-6 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600">
          {renderIcon()}
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        {description && (
          <p className="text-neutral-400 max-w-md mx-auto mb-8">{description}</p>
        )}
        {action && (
          action.href ? (
            <Link
              to={action.href}
              className="inline-flex px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
            >
              {action.label}
            </button>
          )
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={clx("text-center py-12", className)}>
      <div className="w-16 h-16 mx-auto mb-4 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
          {description}
        </p>
      )}
      {action && (
        action.href ? (
          <Link
            to={action.href}
            className="inline-flex px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  )
}

// Pre-built empty states
export const EmptyCart = ({ countryCode = "us" }: { countryCode?: string }) => (
  <EmptyState
    icon={presetIcons.cart}
    title="Your cart is empty"
    description="Looks like you haven't added any items to your cart yet."
    action={{ label: "Start Shopping", href: `/${countryCode}/store` }}
  />
)

export const EmptyWishlist = ({ countryCode = "us" }: { countryCode?: string }) => (
  <EmptyState
    icon={presetIcons.wishlist}
    title="Your wishlist is empty"
    description="Save items you love by clicking the heart icon on any product."
    action={{ label: "Browse Products", href: `/${countryCode}/store` }}
  />
)

export const EmptySearch = ({ query }: { query?: string }) => (
  <EmptyState
    icon={presetIcons.search}
    title="No results found"
    description={
      query
        ? `We couldn't find anything matching "${query}". Try a different search term.`
        : "Try searching for something else."
    }
  />
)

export const EmptyOrders = () => (
  <EmptyState
    icon={presetIcons.orders}
    title="No orders yet"
    description="When you place an order, it will appear here."
  />
)
