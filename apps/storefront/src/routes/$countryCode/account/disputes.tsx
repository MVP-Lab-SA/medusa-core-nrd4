import { createFileRoute } from "@tanstack/react-router"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { ExclamationCircle, Clock, Check, XCircle, ChatBubbleLeftRight, ArrowUpTray, Plus } from "@medusajs/icons"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/account/disputes")({
  component: DisputesPage,
})

function DisputesPage() {
  const { countryCode } = Route.useParams()
  const [showNewDispute, setShowNewDispute] = useState(false)

  const disputes = [
    {
      id: "DSP-001",
      orderId: "ORD-2024-001",
      type: "Item Not Received",
      status: "under_review" as const,
      amount: 150,
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      description: "Order was marked as delivered but I never received it.",
    },
    {
      id: "DSP-002",
      orderId: "ORD-2024-002",
      type: "Damaged Item",
      status: "resolved" as const,
      amount: 75,
      createdDate: "2024-01-10",
      lastUpdate: "2024-01-14",
      resolution: "Full refund issued",
      description: "Product arrived with visible damage to packaging and item.",
    },
    {
      id: "DSP-003",
      orderId: "ORD-2023-050",
      type: "Wrong Item",
      status: "rejected" as const,
      amount: 200,
      createdDate: "2023-12-20",
      lastUpdate: "2023-12-28",
      reason: "Item matches order description",
      description: "Received different color than what was ordered.",
    },
  ]

  const statusConfig = {
    under_review: { label: "Under Review", color: "bg-amber-500/20 text-amber-400", icon: Clock },
    resolved: { label: "Resolved", color: "bg-green-500/20 text-green-400", icon: Check },
    rejected: { label: "Rejected", color: "bg-red-500/20 text-red-400", icon: XCircle },
    pending_info: { label: "Info Needed", color: "bg-cyan-500/20 text-cyan-400", icon: ExclamationCircle },
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/disputes`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Disputes</h1>
          <p className="text-gray-400 mt-1">Manage order disputes and claims</p>
        </div>
        <button
          onClick={() => setShowNewDispute(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
        >
          <Plus className="w-4 h-4" />
          New Dispute
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Active Disputes</p>
          <p className="text-2xl font-bold text-amber-400">
            {disputes.filter(d => d.status === "under_review").length}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-2xl font-bold text-green-400">
            {disputes.filter(d => d.status === "resolved").length}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Disputes</p>
          <p className="text-2xl font-bold text-white">{disputes.length}</p>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((dispute) => {
          const status = statusConfig[dispute.status]
          const StatusIcon = status.icon

          return (
            <div key={dispute.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg text-white">{dispute.id}</h3>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-gray-500">Order: {dispute.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">${dispute.amount}</p>
                  <p className="text-sm text-gray-500">{dispute.type}</p>
                </div>
              </div>

              <p className="text-gray-400 mb-4">{dispute.description}</p>

              {dispute.status === "resolved" && dispute.resolution && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                  <p className="text-green-400 text-sm">
                    <strong>Resolution:</strong> {dispute.resolution}
                  </p>
                </div>
              )}

              {dispute.status === "rejected" && dispute.reason && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm">
                    <strong>Reason:</strong> {dispute.reason}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-500">
                  <span>Created: {dispute.createdDate}</span>
                  <span className="mx-2">|</span>
                  <span>Updated: {dispute.lastUpdate}</span>
                </div>
                <div className="flex gap-2">
                  {dispute.status === "under_review" && (
                    <>
                      <button className="flex items-center gap-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm">
                        <ArrowUpTray className="w-4 h-4" />
                        Add Evidence
                      </button>
                      <button className="flex items-center gap-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm">
                        <ChatBubbleLeftRight className="w-4 h-4" />
                        Message
                      </button>
                    </>
                  )}
                  <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {disputes.length === 0 && (
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">No disputes. All your orders are in good standing!</p>
        </div>
      )}

      {/* New Dispute Modal */}
      {showNewDispute && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
            <h2 className="text-xl font-semibold text-white mb-4">Open New Dispute</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Order ID</label>
                <input
                  type="text"
                  placeholder="Enter order ID"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Dispute Type</label>
                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="">Select type</option>
                  <option value="not_received">Item Not Received</option>
                  <option value="damaged">Damaged Item</option>
                  <option value="wrong_item">Wrong Item</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewDispute(false)}
                className="flex-1 py-2.5 text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2.5 text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  )
}
