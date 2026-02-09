import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { href } from "@/lib/utils/link"
import { ExclamationCircle, Clock, Check, XCircle, ChatBubbleLeftRight, Plus, ArrowRight } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
  AccountModal,
  AccountInput,
  AccountSelect,
  AccountTabs,
} from "@/components/account/AccountUI"

interface DisputesPageProps {
  countryCode: string
}

// Mock data
const mockDisputes = [
  {
    id: "disp_1",
    orderId: "1234",
    orderTotal: 149.99,
    reason: "Item not received",
    status: "open",
    createdAt: "2024-03-15",
    lastUpdate: "2024-03-16",
    messages: 3,
  },
  {
    id: "disp_2",
    orderId: "1220",
    orderTotal: 79.99,
    reason: "Item damaged",
    status: "in_progress",
    createdAt: "2024-03-10",
    lastUpdate: "2024-03-14",
    messages: 5,
  },
  {
    id: "disp_3",
    orderId: "1198",
    orderTotal: 299.99,
    reason: "Wrong item received",
    status: "resolved",
    createdAt: "2024-02-20",
    lastUpdate: "2024-03-01",
    resolution: "Full refund issued",
    messages: 8,
  },
]

const statusConfig = {
  open: { color: "warning" as const, label: "Open", icon: ExclamationCircle },
  in_progress: { color: "info" as const, label: "In Progress", icon: Clock },
  resolved: { color: "success" as const, label: "Resolved", icon: Check },
  closed: { color: "default" as const, label: "Closed", icon: XCircle },
}

export function AccountDisputesPage({ countryCode }: DisputesPageProps) {
  const [showNewDisputeModal, setShowNewDisputeModal] = useState(false)
  const [activeTab, setActiveTab] = useState("active")
  const isLoading = false
  const disputes = mockDisputes

  const activeDisputes = disputes.filter(d => d.status === "open" || d.status === "in_progress")
  const closedDisputes = disputes.filter(d => d.status === "resolved" || d.status === "closed")

  const tabs = [
    { id: "active", label: "Active", count: activeDisputes.length },
    { id: "closed", label: "Resolved", count: closedDisputes.length },
  ]

  const currentDisputes = activeTab === "active" ? activeDisputes : closedDisputes

  return (
    <AccountLayout currentPath={`/${countryCode}/account/disputes`}>
      <AccountPageHeader
        title="Disputes & Returns"
        description="Manage order issues and return requests"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Disputes" },
        ]}
        action={
          <AccountButton onClick={() => setShowNewDisputeModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Open Dispute
          </AccountButton>
        }
      />

      <AccountTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {isLoading ? (
        <div className="space-y-4">
          <AccountSkeleton height="h-32" />
          <AccountSkeleton height="h-32" />
        </div>
      ) : currentDisputes.length > 0 ? (
        <div className="space-y-4">
          {currentDisputes.map((dispute) => {
            const status = statusConfig[dispute.status as keyof typeof statusConfig]
            const StatusIcon = status.icon

            return (
              <AccountCard key={dispute.id}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white font-semibold">
                          Dispute #{dispute.id.split("_")[1]}
                        </span>
                        <AccountBadge variant={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </AccountBadge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Order #{dispute.orderId} - ${dispute.orderTotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-gray-400">Opened {new Date(dispute.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-500">Updated {new Date(dispute.lastUpdate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-1">Reason</p>
                    <p className="text-white">{dispute.reason}</p>
                    {dispute.resolution && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Resolution</p>
                        <p className="text-green-400">{dispute.resolution}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <ChatBubbleLeftRight className="w-4 h-4" />
                      <span>{dispute.messages} messages</span>
                    </div>
                    <Link
                      to={href(`/${countryCode}/account/disputes/${dispute.id}`)}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AccountCard>
            )
          })}
        </div>
      ) : (
        <AccountEmptyState
          icon={<ExclamationCircle className="w-12 h-12" />}
          title={activeTab === "active" ? "No active disputes" : "No resolved disputes"}
          description={activeTab === "active" 
            ? "You don't have any open disputes or return requests"
            : "Your resolved disputes will appear here"
          }
        />
      )}

      {/* New Dispute Modal */}
      <AccountModal
        isOpen={showNewDisputeModal}
        onClose={() => setShowNewDisputeModal(false)}
        title="Open New Dispute"
        size="md"
      >
        <div className="space-y-4">
          <AccountSelect label="Select Order">
            <option value="">Choose an order...</option>
            <option value="1240">Order #1240 - $89.99</option>
            <option value="1235">Order #1235 - $149.99</option>
            <option value="1230">Order #1230 - $59.99</option>
          </AccountSelect>

          <AccountSelect label="Reason for Dispute">
            <option value="">Select a reason...</option>
            <option value="not_received">Item not received</option>
            <option value="damaged">Item arrived damaged</option>
            <option value="wrong_item">Wrong item received</option>
            <option value="not_as_described">Item not as described</option>
            <option value="quality">Quality issues</option>
            <option value="other">Other</option>
          </AccountSelect>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Describe the Issue
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="Please provide details about your issue..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <AccountButton variant="secondary" onClick={() => setShowNewDisputeModal(false)}>
              Cancel
            </AccountButton>
            <AccountButton>
              Submit Dispute
            </AccountButton>
          </div>
        </div>
      </AccountModal>
    </AccountLayout>
  )
}
