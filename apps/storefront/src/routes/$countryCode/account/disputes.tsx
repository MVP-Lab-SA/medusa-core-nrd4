import { createFileRoute } from "@tanstack/react-router"
import { DisputeForm } from "~/components/payments"
import { AlertTriangle, Clock, CheckCircle, XCircle, MessageSquare, Upload, Plus } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/account/disputes")({
  component: DisputesPage,
})

function DisputesPage() {
  const [showNewDispute, setShowNewDispute] = useState(false)

  const disputes = [
    {
      id: "DSP-001",
      orderId: "ORD-2024-001",
      type: "Item Not Received",
      status: "under_review",
      amount: 150,
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      description: "Order was marked as delivered but I never received it.",
    },
    {
      id: "DSP-002",
      orderId: "ORD-2024-002",
      type: "Damaged Item",
      status: "resolved",
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
      status: "rejected",
      amount: 200,
      createdDate: "2023-12-20",
      lastUpdate: "2023-12-28",
      reason: "Item matches order description",
      description: "Received different color than what was ordered.",
    },
  ]

  const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    under_review: { label: "Under Review", color: "bg-amber-100 text-amber-700", icon: Clock },
    resolved: { label: "Resolved", color: "bg-green-100 text-green-700", icon: CheckCircle },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
    pending_info: { label: "Info Needed", color: "bg-blue-100 text-blue-700", icon: AlertTriangle },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Disputes</h1>
          <p className="text-gray-600">Manage order disputes and claims</p>
        </div>
        <button
          onClick={() => setShowNewDispute(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Dispute
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Active Disputes</p>
          <p className="text-2xl font-bold text-amber-600">
            {disputes.filter(d => d.status === "under_review").length}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-2xl font-bold text-green-600">
            {disputes.filter(d => d.status === "resolved").length}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Disputes</p>
          <p className="text-2xl font-bold">{disputes.length}</p>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((dispute) => {
          const status = statusConfig[dispute.status]
          const StatusIcon = status.icon

          return (
            <div key={dispute.id} className="bg-white border rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg">{dispute.id}</h3>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-gray-600">Order: {dispute.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${dispute.amount}</p>
                  <p className="text-sm text-gray-500">{dispute.type}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{dispute.description}</p>

              {dispute.status === "resolved" && dispute.resolution && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-800 text-sm">
                    <strong>Resolution:</strong> {dispute.resolution}
                  </p>
                </div>
              )}

              {dispute.status === "rejected" && dispute.reason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-800 text-sm">
                    <strong>Reason:</strong> {dispute.reason}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-500">
                  <span>Created: {dispute.createdDate}</span>
                  <span className="mx-2">|</span>
                  <span>Updated: {dispute.lastUpdate}</span>
                </div>
                <div className="flex gap-2">
                  {dispute.status === "under_review" && (
                    <>
                      <button className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                        <Upload className="w-4 h-4" />
                        Add Evidence
                      </button>
                      <button className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>
                    </>
                  )}
                  <button className="px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {disputes.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">No disputes. All your orders are in good standing!</p>
        </div>
      )}

      {/* New Dispute Modal */}
      {showNewDispute && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Open New Dispute</h2>
            <DisputeForm onClose={() => setShowNewDispute(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
