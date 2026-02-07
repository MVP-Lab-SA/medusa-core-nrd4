import { clx } from "@medusajs/ui"
import { Check, Clock, ShoppingBag, ArrowRight, MapPin } from "@medusajs/icons"

interface TimelineItem {
  id: string
  title: string
  description?: string
  date?: string
  status: "completed" | "current" | "pending"
  icon?: React.ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  variant?: "vertical" | "horizontal"
  className?: string
}

const defaultIcons: Record<string, React.ReactNode> = {
  order: <ShoppingBag className="w-4 h-4" />,
  processing: <Clock className="w-4 h-4" />,
  shipped: <ArrowRight className="w-4 h-4" />,
  delivered: <MapPin className="w-4 h-4" />,
}

export function Timeline({
  items,
  variant = "vertical",
  className,
}: TimelineProps) {
  const getStatusStyles = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return {
          circle: "bg-emerald-500 text-black",
          line: "bg-emerald-500",
          text: "text-white",
          subtext: "text-neutral-400",
        }
      case "current":
        return {
          circle: "bg-cyan-500 text-black ring-4 ring-cyan-500/30",
          line: "bg-neutral-700",
          text: "text-cyan-400",
          subtext: "text-neutral-300",
        }
      case "pending":
        return {
          circle: "bg-neutral-800 text-neutral-500 border-2 border-neutral-700",
          line: "bg-neutral-800",
          text: "text-neutral-500",
          subtext: "text-neutral-600",
        }
    }
  }

  if (variant === "horizontal") {
    return (
      <div className={clx("overflow-x-auto", className)}>
        <div className="flex items-start min-w-max">
          {items.map((item, index) => {
            const styles = getStatusStyles(item.status)
            const isLast = index === items.length - 1

            return (
              <div key={item.id} className="flex items-start">
                <div className="flex flex-col items-center">
                  <div
                    className={clx(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                      styles.circle
                    )}
                  >
                    {item.status === "completed" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      item.icon || defaultIcons.order
                    )}
                  </div>
                  <div className="mt-3 text-center max-w-[120px]">
                    <p className={clx("text-sm font-medium", styles.text)}>
                      {item.title}
                    </p>
                    {item.date && (
                      <p className={clx("text-xs mt-1", styles.subtext)}>
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={clx("w-20 h-0.5 mt-5 mx-2", styles.line)}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Vertical variant (default)
  return (
    <div className={clx("relative", className)}>
      {items.map((item, index) => {
        const styles = getStatusStyles(item.status)
        const isLast = index === items.length - 1

        return (
          <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Line */}
            {!isLast && (
              <div
                className={clx(
                  "absolute left-5 top-10 w-0.5 h-[calc(100%-2rem)]",
                  styles.line
                )}
              />
            )}

            {/* Circle */}
            <div
              className={clx(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all",
                styles.circle
              )}
            >
              {item.status === "completed" ? (
                <Check className="w-5 h-5" />
              ) : (
                item.icon || defaultIcons.order
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1.5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className={clx("font-medium", styles.text)}>
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className={clx("text-sm mt-1", styles.subtext)}>
                      {item.description}
                    </p>
                  )}
                </div>
                {item.date && (
                  <span className={clx("text-sm whitespace-nowrap", styles.subtext)}>
                    {item.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Pre-built order tracking timeline
export function OrderTrackingTimeline({
  status,
  dates,
  className,
}: {
  status: "placed" | "processing" | "shipped" | "delivered"
  dates?: {
    placed?: string
    processing?: string
    shipped?: string
    delivered?: string
  }
  className?: string
}) {
  const statusIndex = ["placed", "processing", "shipped", "delivered"].indexOf(status)

  const items: TimelineItem[] = [
    {
      id: "placed",
      title: "Order Placed",
      description: "Your order has been confirmed",
      date: dates?.placed,
      status: statusIndex >= 0 ? (statusIndex === 0 ? "current" : "completed") : "pending",
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "processing",
      title: "Processing",
      description: "We're preparing your order",
      date: dates?.processing,
      status: statusIndex >= 1 ? (statusIndex === 1 ? "current" : "completed") : "pending",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "shipped",
      title: "Shipped",
      description: "Your order is on its way",
      date: dates?.shipped,
      status: statusIndex >= 2 ? (statusIndex === 2 ? "current" : "completed") : "pending",
      icon: <Truck className="w-4 h-4" />,
    },
    {
      id: "delivered",
      title: "Delivered",
      description: "Order has been delivered",
      date: dates?.delivered,
      status: statusIndex >= 3 ? "completed" : "pending",
      icon: <MapPin className="w-4 h-4" />,
    },
  ]

  return <Timeline items={items} className={className} />
}
