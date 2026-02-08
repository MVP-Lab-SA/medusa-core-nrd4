import { createFileRoute } from "@tanstack/react-router"
import { AnnouncementBanner } from "~/components/content"
import { Bell, AlertTriangle, Info, CheckCircle, Clock, Filter } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/announcements")({
  component: AnnouncementsPage,
})

function AnnouncementsPage() {
  const [filter, setFilter] = useState("all")

  const announcements = [
    {
      id: 1,
      type: "alert",
      title: "Scheduled Maintenance - January 25th",
      content: "Our platform will undergo scheduled maintenance on January 25th from 2:00 AM to 4:00 AM UTC. During this time, you may experience intermittent service disruptions. We apologize for any inconvenience.",
      date: "2024-01-20",
      pinned: true,
    },
    {
      id: 2,
      type: "info",
      title: "New Payment Options Available",
      content: "We're excited to announce that we now support Apple Pay and Google Pay for faster, more convenient checkout. Enable these options in your account settings.",
      date: "2024-01-18",
      pinned: false,
    },
    {
      id: 3,
      type: "success",
      title: "Free Shipping Extended Through February",
      content: "Great news! We've extended our free shipping promotion through the end of February for all orders over $50. No code needed - discount applies automatically at checkout.",
      date: "2024-01-15",
      pinned: false,
    },
    {
      id: 4,
      type: "info",
      title: "New Vendor Onboarding Program",
      content: "Are you a local business looking to expand your reach? Join our marketplace! Our new vendor onboarding program offers reduced fees for the first 3 months.",
      date: "2024-01-12",
      pinned: false,
    },
    {
      id: 5,
      type: "alert",
      title: "Weather Advisory - Delivery Delays",
      content: "Due to severe weather conditions in some areas, deliveries may be delayed by 1-2 days. We're working with our logistics partners to minimize disruptions. Thank you for your patience.",
      date: "2024-01-10",
      pinned: false,
    },
    {
      id: 6,
      type: "success",
      title: "Mobile App Now Available",
      content: "Download our new mobile app for iOS and Android! Enjoy exclusive app-only deals, faster checkout, and real-time order tracking right from your phone.",
      date: "2024-01-05",
      pinned: false,
    },
  ]

  const typeConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
    alert: { icon: AlertTriangle, color: "text-amber-600", bgColor: "bg-amber-100" },
    info: { icon: Info, color: "text-blue-600", bgColor: "bg-blue-100" },
    success: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
  }

  const filteredAnnouncements = filter === "all" 
    ? announcements 
    : announcements.filter(a => a.type === filter)

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned)
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-gray-600">Stay updated with the latest news and updates</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Bell className="w-5 h-5" />
          <span>{announcements.length} announcements</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8">
        <Filter className="w-5 h-5 text-gray-400" />
        {[
          { key: "all", label: "All" },
          { key: "alert", label: "Alerts" },
          { key: "info", label: "Updates" },
          { key: "success", label: "Good News" },
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

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Pinned
          </h2>
          <div className="space-y-4">
            {pinnedAnnouncements.map((announcement) => {
              const config = typeConfig[announcement.type]
              const Icon = config.icon

              return (
                <div key={announcement.id} className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{announcement.title}</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Pinned</span>
                      </div>
                      <p className="text-gray-600 mb-3">{announcement.content}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        {announcement.date}
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
          const config = typeConfig[announcement.type]
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
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {announcement.date}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No announcements in this category</p>
        </div>
      )}
    </div>
  )
}
