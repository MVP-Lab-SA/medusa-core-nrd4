import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { FileText, Clock, CheckCircle, XCircle, Eye, Plus, Send } from "lucide-react"

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
    pending: { label: "Awaiting Quote", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    quoted: { label: "Quote Received", color: "bg-blue-100 text-blue-700", icon: FileText },
    accepted: { label: "Accepted", color: "bg-green-100 text-green-700", icon: CheckCircle },
    expired: { label: "Expired", color: "bg-gray-100 text-gray-700", icon: XCircle },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quote Requests</h1>
          <p className="text-gray-600">Request and manage bulk pricing quotes</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Quote Request
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "requests" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          My Requests
        </button>
        <button
          onClick={() => setActiveTab("received")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "received" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
            <div key={quote.id} className="bg-white border rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{quote.id}</h3>
                    <p className="text-gray-600 text-sm">Requested on {quote.date}</p>
                    <p className="text-gray-600 text-sm mt-1">{quote.items} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${status.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {status.label}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-gray-500">Estimated Value</p>
                    <p className="font-semibold">${quote.estimatedValue.toLocaleString()}</p>
                  </div>
                  {quote.quotedPrice && (
                    <div>
                      <p className="text-sm text-gray-500">Quoted Price</p>
                      <p className="font-semibold text-green-600">${quote.quotedPrice.toLocaleString()}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {quote.status === "quoted" && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Accept Quote
                    </button>
                  )}
                  {quote.status === "pending" && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                      <Send className="w-4 h-4" />
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
  )
}
