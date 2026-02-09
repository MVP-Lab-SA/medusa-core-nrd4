import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { ShieldCheck, Clock, Eye, Trash, ExclamationCircle, ArrowDownTray } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/consents")({
  component: ConsentsPage,
})

function ConsentsPage() {
  const { countryCode } = Route.useParams()

  const [consents, setConsents] = useState([
    { id: "marketing", label: "Marketing Communications", description: "Receive promotional emails and offers", enabled: true, lastUpdated: "2024-01-15" },
    { id: "analytics", label: "Analytics & Performance", description: "Help us improve by sharing usage data", enabled: true, lastUpdated: "2024-01-15" },
    { id: "personalization", label: "Personalized Experience", description: "Get recommendations based on your preferences", enabled: true, lastUpdated: "2024-01-15" },
    { id: "third-party", label: "Third-Party Sharing", description: "Share data with trusted partners", enabled: false, lastUpdated: "2024-01-10" },
    { id: "location", label: "Location Services", description: "Use location for delivery and local offers", enabled: true, lastUpdated: "2024-01-15" },
  ])

  const dataSharing = [
    { partner: "Payment Processor", purpose: "Process transactions", dataTypes: ["Name", "Payment info"], lastAccess: "2024-01-18" },
    { partner: "Shipping Provider", purpose: "Deliver orders", dataTypes: ["Name", "Address", "Phone"], lastAccess: "2024-01-17" },
    { partner: "Analytics Service", purpose: "Improve platform", dataTypes: ["Usage data"], lastAccess: "2024-01-18" },
  ]

  const toggleConsent = (id: string) => {
    setConsents(consents.map(c => 
      c.id === id ? { ...c, enabled: !c.enabled, lastUpdated: new Date().toISOString().split('T')[0] } : c
    ))
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/consents`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Consent Management</h1>
          <p className="text-gray-400 mt-1">Control how your data is used and shared</p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-cyan-400 mb-2">Your Privacy Matters</h2>
            <p className="text-gray-300 text-sm">
              We respect your privacy and give you full control over your data. You can update your preferences at any time. 
              Changes take effect immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Consent Toggles */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-6">Data Usage Preferences</h2>
        <div className="space-y-6">
          {consents.map((consent) => (
            <div key={consent.id} className="flex items-start justify-between pb-4 border-b border-gray-800 last:border-0 last:pb-0">
              <div className="flex-1">
                <h3 className="font-medium text-white mb-1">{consent.label}</h3>
                <p className="text-sm text-gray-500">{consent.description}</p>
                <p className="text-xs text-gray-600 mt-1">Last updated: {consent.lastUpdated}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={consent.enabled}
                  onChange={() => toggleConsent(consent.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sharing */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-6">Data Sharing with Partners</h2>
        <div className="space-y-4">
          {dataSharing.map((partner, index) => (
            <div key={index} className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <h3 className="font-medium text-white">{partner.partner}</h3>
                <p className="text-sm text-gray-500">{partner.purpose}</p>
                <div className="flex gap-2 mt-2">
                  {partner.dataTypes.map((type) => (
                    <span key={type} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {partner.lastAccess}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Data Rights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 text-left transition-colors">
            <Eye className="w-6 h-6 text-cyan-400" />
            <div>
              <p className="font-medium text-white">View My Data</p>
              <p className="text-sm text-gray-500">See all data we have about you</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 text-left transition-colors">
            <ArrowDownTray className="w-6 h-6 text-green-400" />
            <div>
              <p className="font-medium text-white">Export Data</p>
              <p className="text-sm text-gray-500">Download a copy of your data</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 text-left transition-colors">
            <Trash className="w-6 h-6 text-red-400" />
            <div>
              <p className="font-medium text-red-400">Delete My Data</p>
              <p className="text-sm text-gray-500">Permanently delete your data</p>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
        <ExclamationCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-200">
          <p className="font-medium">Important Notice</p>
          <p className="text-amber-300/70">Some data sharing is required for core services like order processing and delivery. Disabling these may affect your ability to use certain features.</p>
        </div>
      </div>
    </AccountLayout>
  )
}
