import { Star, Fire, Sparkles } from "@medusajs/icons"

interface BadgeProps {
  className?: string
}

export function NewArrivalBadge({ className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium rounded ${className}`}>
      <Sparkles className="w-3 h-3" />
      New
    </span>
  )
}

export function BestsellerBadge({ className = "", rank }: BadgeProps & { rank?: number }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs font-medium rounded ${className}`}>
      <Star className="w-3 h-3" />
      {rank ? `#${rank} Bestseller` : "Bestseller"}
    </span>
  )
}

export function SaleBadge({ className = "", percentage, amount }: BadgeProps & { percentage?: number; amount?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded ${className}`}>
      {percentage ? `-${percentage}%` : amount ? `Save ${amount}` : "Sale"}
    </span>
  )
}

export function TrendingBadge({ className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded ${className}`}>
      <Fire className="w-3 h-3" />
      Trending
    </span>
  )
}

export function LimitedBadge({ className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded ${className}`}>
      Limited Edition
    </span>
  )
}

export function ExclusiveBadge({ className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-medium rounded ${className}`}>
      Exclusive
    </span>
  )
}

export function PreOrderBadge({ className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-1 bg-cyan-500 text-white text-xs font-medium rounded ${className}`}>
      Pre-Order
    </span>
  )
}

export function FreeShippingBadge({ className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-1 bg-green-500 text-white text-xs font-medium rounded ${className}`}>
      Free Shipping
    </span>
  )
}

interface ProductBadgesProps {
  isNew?: boolean
  isBestseller?: boolean
  bestsellerRank?: number
  salePercentage?: number
  saleAmount?: string
  isTrending?: boolean
  isLimited?: boolean
  isExclusive?: boolean
  isPreOrder?: boolean
  hasFreeShipping?: boolean
  className?: string
  maxBadges?: number
}

export function ProductBadges({
  isNew,
  isBestseller,
  bestsellerRank,
  salePercentage,
  saleAmount,
  isTrending,
  isLimited,
  isExclusive,
  isPreOrder,
  hasFreeShipping,
  className = "",
  maxBadges = 3
}: ProductBadgesProps) {
  const badges: React.ReactNode[] = []

  if (salePercentage || saleAmount) {
    badges.push(<SaleBadge key="sale" percentage={salePercentage} amount={saleAmount} />)
  }
  if (isNew) badges.push(<NewArrivalBadge key="new" />)
  if (isBestseller) badges.push(<BestsellerBadge key="bestseller" rank={bestsellerRank} />)
  if (isTrending) badges.push(<TrendingBadge key="trending" />)
  if (isLimited) badges.push(<LimitedBadge key="limited" />)
  if (isExclusive) badges.push(<ExclusiveBadge key="exclusive" />)
  if (isPreOrder) badges.push(<PreOrderBadge key="preorder" />)
  if (hasFreeShipping) badges.push(<FreeShippingBadge key="freeshipping" />)

  const displayBadges = badges.slice(0, maxBadges)

  if (displayBadges.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayBadges}
    </div>
  )
}
