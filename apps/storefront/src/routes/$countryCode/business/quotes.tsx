import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { DocumentText, Clock, CheckCircleSolid, XCircleSolid, Eye, Plus, PaperPlane } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/business/quotes")({
  component: BusinessQuotes,
})

function BusinessQuotes() {
  const [activeTab, setActiveTab] = useState<"requests" | "received">("requests")

  const quoteRequests = [
    { id: "QR-2024-001", date: "2024-01-15", status: "pending", items: 10, estimatedValue: 5000 },
    { id: "QR-2024-002", date: "2024-01-12", status: "quoted", items: 5, estimatedValue: 2500, quotedPrice: 2200 },
    { id: "QR-2024-003", date: "2024-01-10", status: "accepted", items: 8, estimatedValue: 4000, quotedPrice: 3800 },
    { id: "QR-2024-004", date: "2024-01-08", status: "expired", items: 3, estimatedValue: 1500 },
  ]

  const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    pending: { label: "Awaiting Quote", color: "bg-amber-500/10 text-amber-400", icon: Clock },
    quoted: { label: "Quote Received", color: "bg-city-cyan/10 text-city-cyan", icon: DocumentText },
    accepted: { label: "Accepted", color: "bg-emerald-500/10 text-emerald-400", icon: CheckCircleSolid },
    expired: { label: "Expired", color: "bg-city-slate text-city-muted", icon: XCircleSolid },
  }

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-city-white">Quote Requests</h1>
            <p className="text-city-gray">Request and manage bulk pricing quotes</p>
          </div>
          <button className="bg-city-cyan text-city-dark px-4 py-2 rounded-lg hover:bg-city-cyan-light transition-colors flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" />
            New Quote Request
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "requests" ? "bg-city-cyan text-city-dark" : "bg-city-slate text-city-gray hover:bg-city-steel"
            }`}
          >
            My Requests
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "received" ? "bg-city-cyan text-city-dark" : "bg-city-slate text-city-gray hover:bg-city-steel"
            }`}
          >
            Received Quotes
          </button>
        </div>

        {/* Quote Cards */}
        <div className="grid gap-4">
          {quoteRequests.map((quote) => {
            const status = statusConfig[quote.status]
            const StatusIcon = status.icon
            
            return (
              <div key={quote.id} className="bg-city-navy border border-city-steel rounded-xl p-6 hover:border-city-cyan/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-city-slate rounded-lg">
                      <DocumentText className="w-6 h-6 text-city-gray" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-city-white">{quote.id}</h3>
                      <p className="text-city-muted text-sm">Requested on {quote.date}</p>
                      <p className="text-city-muted text-sm mt-1">{quote.items} items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {status.label}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-city-steel/50 flex items-center justify-between">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-sm text-city-muted">Estimated Value</p>
                      <p className="font-semibold text-city-white">${quote.estimatedValue.toLocaleString()}</p>
                    </div>
                    {quote.quotedPrice && (
                      <div>
                        <p className="text-sm text-city-muted">Quoted Price</p>
                        <p className="font-semibold text-emerald-400">${quote.quotedPrice.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-city-steel text-city-white rounded-lg hover:bg-city-slate transition-colors flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    {quote.status === "quoted" && (
                      <button className="px-4 py-2 bg-emerald-500 text-city-dark rounded-lg hover:bg-emerald-400 transition-colors flex items-center gap-2 font-medium">
                        <CheckCircleSolid className="w-4 h-4" />
                        Accept Quote
                      </button>
                    )}
                    {quote.status === "pending" && (
                      <button className="px-4 py-2 bg-city-cyan text-city-dark rounded-lg hover:bg-city-cyan-light transition-colors flex items-center gap-2 font-medium">
                        <PaperPlane className="w-4 h-4" />
                        Send Reminder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
