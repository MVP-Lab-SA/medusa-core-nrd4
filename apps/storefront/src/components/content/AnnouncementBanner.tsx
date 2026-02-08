import { useState } from "react"
import { XMark, InformationCircle, ExclamationCircle, CheckCircle, Sparkles } from "@medusajs/icons"

interface Announcement {
  id: string
  title: string
  content: string
  type: 'info' | 'warning' | 'success' | 'error' | 'promo'
  link?: string
  dismissible?: boolean
}

interface AnnouncementBannerProps {
  announcement: Announcement
  onDismiss?: (id: string) => void
}

const typeConfig: Record<string, {
  bg: string
  border: string
  text: string
  icon: typeof InformationCircle
  iconColor: string
}> = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: InformationCircle,
    iconColor: "text-blue-500",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: ExclamationCircle,
    iconColor: "text-yellow-500",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: ExclamationCircle,
    iconColor: "text-red-500",
  },
  promo: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800",
    icon: Sparkles,
    iconColor: "text-purple-500",
  },
}

export function AnnouncementBanner({ announcement, onDismiss }: AnnouncementBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const config = typeConfig[announcement.type] || typeConfig.info
  const Icon = config.icon

  if (isDismissed) return null

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.(announcement.id)
  }

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className={`font-medium ${config.text}`}>{announcement.title}</h4>
          <p className={`text-sm ${config.text} opacity-90 mt-1`}>{announcement.content}</p>
          {announcement.link && (
            <a
              href={announcement.link}
              className={`text-sm ${config.text} underline mt-2 inline-block`}
            >
              Learn more
            </a>
          )}
        </div>
        {announcement.dismissible && (
          <button
            onClick={handleDismiss}
            className={`p-1 hover:bg-black/5 rounded ${config.text}`}
          >
            <XMark className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
