import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { ConsentToggle } from "~/components/identity"
import { Shield, Clock, Eye, Trash2, AlertTriangle } from "lucide-react"

export const Route = createFileRoute("/$countryCode/account/consents")({
  component: ConsentsPage,
})

function ConsentsPage() {
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Consent Management</h1>
          <p className="text-gray-600">Control how your data is used and shared</p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-blue-900 mb-2">Your Privacy Matters</h2>
            <p className="text-blue-800 text-sm">
              We respect your privacy and give you full control over your data. You can update your preferences at any time. 
              Changes take effect immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Consent Toggles */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6">Data Usage Preferences</h2>
        <div className="space-y-6">
          {consents.map((consent) => (
            <div key={consent.id} className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0">
              <div className="flex-1">
                <h3 className="font-medium mb-1">{consent.label}</h3>
                <p className="text-sm text-gray-500">{consent.description}</p>
                <p className="text-xs text-gray-400 mt-1">Last updated: {consent.lastUpdated}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={consent.enabled}
                  onChange={() => toggleConsent(consent.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sharing */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6">Data Sharing with Partners</h2>
        <div className="space-y-4">
          {dataSharing.map((partner, index) => (
            <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">{partner.partner}</h3>
                <p className="text-sm text-gray-500">{partner.purpose}</p>
                <div className="flex gap-2 mt-2">
                  {partner.dataTypes.map((type) => (
                    <span key={type} className="px-2 py-1 bg-white border rounded text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {partner.lastAccess}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Actions */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-6">Data Rights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 text-left">
            <Eye className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-medium">View My Data</p>
              <p className="text-sm text-gray-500">See all data we have about you</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 text-left">
            <Shield className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-gray-500">Download a copy of your data</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-red-200 rounded-lg hover:bg-red-50 text-left">
            <Trash2 className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-medium text-red-600">Delete My Data</p>
              <p className="text-sm text-gray-500">Permanently delete your data</p>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium">Important Notice</p>
          <p>Some data sharing is required for core services like order processing and delivery. Disabling these may affect your ability to use certain features.</p>
        </div>
      </div>
    </div>
  )
}
