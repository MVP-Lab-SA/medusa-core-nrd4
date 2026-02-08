import { createFileRoute } from "@tanstack/react-router"
import { BellAlert, ExclamationCircle, InformationCircle, CheckCircle, Clock } from "@medusajs/icons"
import { useState } from "react"
import { useAnnouncements } from "../../lib/hooks/use-content"

export const Route = createFileRoute("/$countryCode/announcements")({
  component: AnnouncementsPage,
})

function AnnouncementsPage() {
  const [filter, setFilter] = useState("all")
  const { data: announcements = [], isLoading } = useAnnouncements({ active: true })

  const typeConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
    warning: { icon: ExclamationCircle, color: "text-amber-600", bgColor: "bg-amber-100" },
    info: { icon: InformationCircle, color: "text-blue-600", bgColor: "bg-blue-100" },
    success: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
    promo: { icon: BellAlert, color: "text-purple-600", bgColor: "bg-purple-100" },
  }

  const filteredAnnouncements = filter === "all" 
    ? announcements 
    : announcements.filter(a => a.type === filter)

  const highPriority = filteredAnnouncements.filter(a => a.priority === "high")
  const regularAnnouncements = filteredAnnouncements.filter(a => a.priority !== "high")

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-gray-600">Stay updated with the latest news and updates</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <BellAlert className="w-5 h-5" />
          <span>{announcements.length} announcements</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {[
          { key: "all", label: "All" },
          { key: "promo", label: "Promotions" },
          { key: "info", label: "Updates" },
          { key: "success", label: "Good News" },
          { key: "warning", label: "Alerts" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* High Priority Announcements */}
      {highPriority.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Important
          </h2>
          <div className="space-y-4">
            {highPriority.map((announcement) => {
              const config = typeConfig[announcement.type] || typeConfig.info
              const Icon = config.icon

              return (
                <div key={announcement.id} className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{announcement.title}</h3>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Important</span>
                      </div>
                      <p className="text-gray-600 mb-3">{announcement.content}</p>
                      {announcement.link && (
                        <a 
                          href={announcement.link.url}
                          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors mb-3"
                        >
                          {announcement.link.text}
                        </a>
                      )}
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        Ends {new Date(announcement.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Regular Announcements */}
      <div className="space-y-4">
        {regularAnnouncements.map((announcement) => {
          const config = typeConfig[announcement.type] || typeConfig.info
          const Icon = config.icon

          return (
            <div key={announcement.id} className="bg-white border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
                  <p className="text-gray-600 mb-3">{announcement.content}</p>
                  {announcement.link && (
                    <a 
                      href={announcement.link.url}
                      className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors mb-3"
                    >
                      {announcement.link.text}
                    </a>
                  )}
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    Ends {new Date(announcement.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <BellAlert className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No announcements in this category</p>
        </div>
      )}
    </div>
  )
}
