import * as React from "react"
import { Bell, X, Check, Package, Tag, Clock, Trash2 } from "lucide-react"
import { clx } from "@medusajs/ui"

type NotificationType = "order" | "promotion" | "reminder" | "info"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  link?: string
  image?: string
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onDelete?: (id: string) => void
  onClearAll?: () => void
  className?: string
}

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
  className
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <Package className="w-5 h-5" />
      case "promotion":
        return <Tag className="w-5 h-5" />
      case "reminder":
        return <Clock className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case "order":
        return "text-blue-400 bg-blue-500/10"
      case "promotion":
        return "text-green-400 bg-green-500/10"
      case "reminder":
        return "text-orange-400 bg-orange-500/10"
      default:
        return "text-cyan-400 bg-cyan-500/10"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div ref={containerRef} className={clx("relative", className)}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center rounded-full bg-cyan-500 text-black text-xs font-bold">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <h3 className="text-white font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && onMarkAllAsRead && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && onClearAll && (
                <button
                  onClick={onClearAll}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-400">No notifications yet</p>
                <p className="text-zinc-500 text-sm">
                  We'll notify you when something happens
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={clx(
                    "flex gap-3 p-4 border-b border-zinc-800 last:border-0 transition-colors",
                    !notification.read && "bg-cyan-500/5",
                    notification.link && "cursor-pointer hover:bg-zinc-800/50"
                  )}
                  onClick={() => {
                    if (!notification.read) onMarkAsRead?.(notification.id)
                    if (notification.link) window.location.href = notification.link
                  }}
                >
                  {/* Icon or Image */}
                  {notification.image ? (
                    <img
                      src={notification.image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className={clx("p-2 rounded-lg", getIconColor(notification.type))}>
                      {getIcon(notification.type)}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={clx(
                        "text-sm font-medium truncate",
                        notification.read ? "text-zinc-300" : "text-white"
                      )}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-zinc-500 text-sm line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-zinc-600 text-xs mt-1">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>

                  {/* Actions */}
                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(notification.id)
                      }}
                      className="p-1 rounded hover:bg-zinc-800 text-zinc-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Hook for managing notifications
export function useNotifications(initialNotifications: Notification[] = []) {
  const [notifications, setNotifications] = React.useState(initialNotifications)

  const addNotification = React.useCallback((notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      timestamp: new Date()
    }
    setNotifications((prev) => [newNotification, ...prev])
    return newNotification.id
  }, [])

  const markAsRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllAsRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const deleteNotification = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAll = React.useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  }
}
