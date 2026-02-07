import * as React from "react"
import { Check, Circle, Clock } from "lucide-react"
import { clx } from "@medusajs/ui"

type TimelineItemStatus = "completed" | "current" | "upcoming"

interface TimelineItem {
  id: string
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
  status?: TimelineItemStatus
}

interface TimelineProps {
  items: TimelineItem[]
  orientation?: "vertical" | "horizontal"
  variant?: "default" | "compact" | "detailed"
  className?: string
}

export function Timeline({
  items,
  orientation = "vertical",
  variant = "default",
  className
}: TimelineProps) {
  if (orientation === "horizontal") {
    return (
      <div className={clx("overflow-x-auto", className)}>
        <div className="flex items-start min-w-max">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col items-center"
              style={{ minWidth: "160px" }}
            >
              {/* Connector */}
              <div className="flex items-center w-full">
                <div
                  className={clx(
                    "flex-1 h-0.5",
                    index === 0 ? "bg-transparent" : "bg-zinc-700",
                    item.status === "completed" && index > 0 && "bg-cyan-500"
                  )}
                />
                
                {/* Node */}
                <div
                  className={clx(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    item.status === "completed"
                      ? "bg-cyan-500 text-black"
                      : item.status === "current"
                      ? "bg-cyan-500/20 text-cyan-500 border-2 border-cyan-500"
                      : "bg-zinc-800 text-zinc-500 border-2 border-zinc-700"
                  )}
                >
                  {item.icon || (
                    item.status === "completed" ? (
                      <Check className="w-5 h-5" />
                    ) : item.status === "current" ? (
                      <Circle className="w-3 h-3 fill-current" />
                    ) : (
                      <Circle className="w-3 h-3" />
                    )
                  )}
                </div>

                <div
                  className={clx(
                    "flex-1 h-0.5",
                    index === items.length - 1 ? "bg-transparent" : "bg-zinc-700",
                    item.status === "completed" && index < items.length - 1 && "bg-cyan-500"
                  )}
                />
              </div>

              {/* Content */}
              <div className="text-center mt-3 px-2">
                <p
                  className={clx(
                    "font-medium text-sm",
                    item.status === "completed" || item.status === "current"
                      ? "text-white"
                      : "text-zinc-500"
                  )}
                >
                  {item.title}
                </p>
                {item.date && (
                  <p className="text-zinc-500 text-xs mt-1">{item.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Vertical orientation
  return (
    <div className={clx("relative", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={clx(
            "flex gap-4",
            index !== items.length - 1 && "pb-8"
          )}
        >
          {/* Timeline Line & Node */}
          <div className="flex flex-col items-center">
            <div
              className={clx(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10",
                item.status === "completed"
                  ? "bg-cyan-500 text-black"
                  : item.status === "current"
                  ? "bg-cyan-500/20 text-cyan-500 border-2 border-cyan-500"
                  : "bg-zinc-800 text-zinc-500 border-2 border-zinc-700"
              )}
            >
              {item.icon || (
                item.status === "completed" ? (
                  <Check className="w-5 h-5" />
                ) : item.status === "current" ? (
                  <Circle className="w-3 h-3 fill-current" />
                ) : (
                  <Circle className="w-3 h-3" />
                )
              )}
            </div>
            {index !== items.length - 1 && (
              <div
                className={clx(
                  "w-0.5 flex-1 mt-2",
                  item.status === "completed" ? "bg-cyan-500" : "bg-zinc-700"
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className={clx("flex-1 pt-1.5", variant === "detailed" && "pb-2")}>
            <div className="flex items-start justify-between gap-2">
              <h3
                className={clx(
                  "font-medium",
                  item.status === "completed" || item.status === "current"
                    ? "text-white"
                    : "text-zinc-500"
                )}
              >
                {item.title}
              </h3>
              {item.date && (
                <span className="text-zinc-500 text-sm flex-shrink-0">
                  {item.date}
                </span>
              )}
            </div>
            {item.description && variant !== "compact" && (
              <p className="text-zinc-400 text-sm mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Order Timeline specific component
interface OrderTimelineProps {
  status: "processing" | "shipped" | "out_for_delivery" | "delivered"
  trackingNumber?: string
  estimatedDelivery?: string
  className?: string
}

export function OrderTimeline({
  status,
  trackingNumber,
  estimatedDelivery,
  className
}: OrderTimelineProps) {
  const steps: TimelineItem[] = [
    {
      id: "processing",
      title: "Order Processing",
      description: "Your order has been received",
      status: status === "processing" ? "current" : "completed"
    },
    {
      id: "shipped",
      title: "Shipped",
      description: trackingNumber ? `Tracking: ${trackingNumber}` : "Package handed to carrier",
      status: status === "shipped" ? "current" : status === "processing" ? "upcoming" : "completed"
    },
    {
      id: "out_for_delivery",
      title: "Out for Delivery",
      description: "Package is on its way",
      status: status === "out_for_delivery" ? "current" : ["processing", "shipped"].includes(status) ? "upcoming" : "completed"
    },
    {
      id: "delivered",
      title: "Delivered",
      description: estimatedDelivery ? `Est. ${estimatedDelivery}` : "Package delivered",
      status: status === "delivered" ? "completed" : "upcoming"
    }
  ]

  return <Timeline items={steps} className={className} />
}
