import { clx } from "@medusajs/ui"
import { ArrowUpMini, ArrowDownMini } from "@medusajs/icons"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label?: string
  }
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  variant?: "default" | "compact" | "detailed"
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) {
  const getTrendColor = () => {
    if (!trend && !change) return "text-neutral-400"
    const effectiveTrend = trend || (change && change.value >= 0 ? "up" : "down")
    switch (effectiveTrend) {
      case "up":
        return "text-emerald-400"
      case "down":
        return "text-red-400"
      default:
        return "text-neutral-400"
    }
  }

  const getTrendIcon = () => {
    if (!trend && !change) return null
    const effectiveTrend = trend || (change && change.value >= 0 ? "up" : "down")
    switch (effectiveTrend) {
      case "up":
        return <ArrowUpMini className="w-4 h-4" />
      case "down":
        return <ArrowDownMini className="w-4 h-4" />
      default:
        return null
    }
  }

  if (variant === "compact") {
    return (
      <div className={clx("flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-xl", className)}>
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        {change && (
          <div className={clx("flex items-center gap-1", getTrendColor())}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>
    )
  }

  if (variant === "detailed") {
    return (
      <div className={clx("p-6 bg-neutral-900 border border-neutral-800 rounded-xl", className)}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-neutral-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
          {icon && (
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
              {icon}
            </div>
          )}
        </div>
        {change && (
          <div className="flex items-center gap-2 pt-4 border-t border-neutral-800">
            <div className={clx("flex items-center gap-1", getTrendColor())}>
              {getTrendIcon()}
              <span className="text-sm font-medium">{Math.abs(change.value)}%</span>
            </div>
            {change.label && (
              <span className="text-sm text-neutral-500">{change.label}</span>
            )}
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={clx("p-5 bg-neutral-900 border border-neutral-800 rounded-xl", className)}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-neutral-500">{title}</p>
        {icon && (
          <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-white">{value}</p>
        {change && (
          <div className={clx("flex items-center gap-1", getTrendColor())}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Grid of stat cards
export function StatGrid({
  stats,
  columns = 4,
  className,
}: {
  stats: StatCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={clx("grid gap-4", gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
