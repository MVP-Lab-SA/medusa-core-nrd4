import { Megaphone, ArrowRight, ExclamationCircle, InformationCircle } from "@medusajs/icons"

interface AnnouncementCardProps {
  announcement: {
    id: string
    title: string
    content: string
    type: 'info' | 'warning' | 'promo' | 'update'
    publishedAt: string
    link?: string
    linkText?: string
  }
  onClick?: () => void
}

export function AnnouncementCard({ announcement, onClick }: AnnouncementCardProps) {
  const typeConfig = {
    info: {
      icon: InformationCircle,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-900'
    },
    warning: {
      icon: ExclamationCircle,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      iconColor: 'text-yellow-500',
      titleColor: 'text-yellow-900'
    },
    promo: {
      icon: Megaphone,
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      iconColor: 'text-purple-500',
      titleColor: 'text-purple-900'
    },
    update: {
      icon: InformationCircle,
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconColor: 'text-green-500',
      titleColor: 'text-green-900'
    }
  }

  const config = typeConfig[announcement.type]
  const Icon = config.icon

  return (
    <div 
      className={`rounded-lg border p-4 ${config.bg} ${config.border} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full bg-white`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className={`font-medium ${config.titleColor}`}>{announcement.title}</h3>
            <time className="text-xs text-gray-500">
              {new Date(announcement.publishedAt).toLocaleDateString()}
            </time>
          </div>
          <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
          
          {announcement.link && (
            <a 
              href={announcement.link}
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              {announcement.linkText || 'Learn more'}
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
