import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { CheckCircle, XCircle, Clock, Eye, ChatBubble, ExclamationCircle } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/business/approvals")({
  component: BusinessApprovals,
})

function BusinessApprovals() {
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending")

  const approvals = [
    { 
      id: "APR-001", 
      type: "Purchase Order", 
      requester: "John Smith", 
      date: "2024-01-15", 
      amount: 4500, 
      status: "pending",
      description: "Office supplies for Q1",
      priority: "normal"
    },
    { 
      id: "APR-002", 
      type: "Quote Request", 
      requester: "Jane Doe", 
      date: "2024-01-14", 
      amount: 8000, 
      status: "pending",
      description: "Bulk product order for new project",
      priority: "high"
    },
    { 
      id: "APR-003", 
      type: "Purchase Order", 
      requester: "Bob Wilson", 
      date: "2024-01-12", 
      amount: 2500, 
      status: "approved",
      description: "Marketing materials",
      approvedBy: "Admin",
      approvedDate: "2024-01-13"
    },
    { 
      id: "APR-004", 
      type: "Credit Increase", 
      requester: "Alice Brown", 
      date: "2024-01-10", 
      amount: 10000, 
      status: "rejected",
      description: "Request for credit limit increase",
      rejectedReason: "Insufficient credit history"
    },
  ]

  const filteredApprovals = filter === "all" ? approvals : approvals.filter(a => a.status === filter)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Approval Requests</h1>
            <p className="text-gray-400">Review and approve team requests</p>
          </div>
          <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-lg">
            <ExclamationCircle className="w-5 h-5" />
            <span className="font-medium">{approvals.filter(a => a.status === "pending").length} pending</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "pending", label: "Pending", icon: Clock, color: "amber" },
            { key: "approved", label: "Approved", icon: CheckCircle, color: "green" },
            { key: "rejected", label: "Rejected", icon: XCircle, color: "red" },
            { key: "all", label: "All", icon: Eye, color: "gray" },
          ].map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === key 
                  ? color === "amber" ? "bg-amber-500 text-black" 
                    : color === "green" ? "bg-green-500 text-black"
                    : color === "red" ? "bg-red-500 text-white"
                    : "bg-gray-700 text-white"
                  : "bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Approval Cards */}
        <div className="space-y-4">
          {filteredApprovals.map((approval) => (
            <div key={approval.id} className={`bg-gray-900 border border-gray-800 rounded-xl p-6 ${
              approval.priority === "high" ? "border-l-4 border-l-red-500" : ""
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    approval.status === "pending" ? "bg-amber-500/20" :
                    approval.status === "approved" ? "bg-green-500/20" :
                    "bg-red-500/20"
                  }`}>
                    {approval.status === "pending" ? <Clock className="w-6 h-6 text-amber-400" /> :
                     approval.status === "approved" ? <CheckCircle className="w-6 h-6 text-green-400" /> :
                     <XCircle className="w-6 h-6 text-red-400" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-white">{approval.id}</h3>
                      {approval.priority === "high" && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">High Priority</span>
                      )}
                    </div>
                    <p className="text-gray-400">{approval.type}</p>
                    <p className="text-sm text-gray-500 mt-1">{approval.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${approval.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{approval.date}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Requested by: <strong className="text-white">{approval.requester}</strong></span>
                  {approval.status === "approved" && approval.approvedBy && (
                    <span className="text-green-400">Approved by {approval.approvedBy} on {approval.approvedDate}</span>
                  )}
                  {approval.status === "rejected" && approval.rejectedReason && (
                    <span className="text-red-400">Reason: {approval.rejectedReason}</span>
                  )}
                </div>
                
                {approval.status === "pending" && (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                      <ChatBubble className="w-4 h-4" />
                      Comment
                    </button>
                    <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
