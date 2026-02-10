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
    warning: { icon: ExclamationCircle, color: "text-amber-400", bgColor: "bg-amber-500/20" },
    info: { icon: InformationCircle, color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
    success: { icon: CheckCircle, color: "text-emerald-400", bgColor: "bg-emerald-500/20" },
    promo: { icon: BellAlert, color: "text-purple-400", bgColor: "bg-purple-500/20" },
  }

  const filteredAnnouncements = filter === "all" 
    ? announcements 
    : announcements.filter(a => a.type === filter)

  const highPriority = filteredAnnouncements.filter(a => a.priority === "high")
  const regularAnnouncements = filteredAnnouncements.filter(a => a.priority !== "high")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-800 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-800 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Announcements</h1>
            <p className="text-gray-400">Stay updated with the latest news and updates</p>
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
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* High Priority Announcements */}
        {highPriority.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Important
            </h2>
            <div className="space-y-4">
              {highPriority.map((announcement) => {
                const config = typeConfig[announcement.type] || typeConfig.info
                const Icon = config.icon

                return (
                  <div key={announcement.id} className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${config.bgColor}`}>
                        <Icon className={`w-6 h-6 ${config.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-white">{announcement.title}</h3>
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Important</span>
                        </div>
                        <p className="text-gray-400 mb-3">{announcement.content}</p>
                        {announcement.link && (
                          <a 
                            href={announcement.link.url}
                            className="inline-block px-4 py-2 bg-cyan-500 text-black rounded-lg text-sm font-medium hover:bg-cyan-400 transition-colors mb-3"
                          >
                            {announcement.link.text}
                          </a>
                        )}
                        <div className="flex items-center gap-1 text-sm text-gray-500">
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
              <div key={announcement.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <Icon className={`w-6 h-6 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white mb-2">{announcement.title}</h3>
                    <p className="text-gray-400 mb-3">{announcement.content}</p>
                    {announcement.link && (
                      <a 
                        href={announcement.link.url}
                        className="inline-block px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors mb-3"
                      >
                        {announcement.link.text}
                      </a>
                    )}
                    <div className="flex items-center gap-1 text-sm text-gray-500">
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
            <BellAlert className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">No announcements in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
