import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { CheckCircle, XCircle, Clock, Eye, MessageSquare, AlertTriangle } from "lucide-react"

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Approval Requests</h1>
          <p className="text-gray-600">Review and approve team requests</p>
        </div>
        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
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
                ? `bg-${color}-600 text-white` 
                : `bg-gray-100 text-gray-700 hover:bg-gray-200`
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
          <div key={approval.id} className={`bg-white border rounded-xl p-6 ${
            approval.priority === "high" ? "border-l-4 border-l-red-500" : ""
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  approval.status === "pending" ? "bg-amber-100" :
                  approval.status === "approved" ? "bg-green-100" :
                  "bg-red-100"
                }`}>
                  {approval.status === "pending" ? <Clock className="w-6 h-6 text-amber-600" /> :
                   approval.status === "approved" ? <CheckCircle className="w-6 h-6 text-green-600" /> :
                   <XCircle className="w-6 h-6 text-red-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{approval.id}</h3>
                    {approval.priority === "high" && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">High Priority</span>
                    )}
                  </div>
                  <p className="text-gray-600">{approval.type}</p>
                  <p className="text-sm text-gray-500 mt-1">{approval.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${approval.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{approval.date}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Requested by: <strong>{approval.requester}</strong></span>
                {approval.status === "approved" && approval.approvedBy && (
                  <span className="text-green-600">Approved by {approval.approvedBy} on {approval.approvedDate}</span>
                )}
                {approval.status === "rejected" && approval.rejectedReason && (
                  <span className="text-red-600">Reason: {approval.rejectedReason}</span>
                )}
              </div>
              
              {approval.status === "pending" && (
                <div className="flex gap-2">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Comment
                  </button>
                  <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
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
  )
}
