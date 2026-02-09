import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowPath, Clock, Check, XCircle, ArrowRight, Calendar, CreditCard } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
  AccountModal,
} from "@/components/account/AccountUI"

interface SubscriptionsPageProps {
  countryCode: string
}

// Mock data
const mockSubscriptions = [
  {
    id: "sub_1",
    productName: "Coffee Club - Monthly",
    productImage: null,
    status: "active",
    price: 29.99,
    interval: "month",
    nextBilling: "2024-04-15",
    startedAt: "2023-06-15",
  },
  {
    id: "sub_2",
    productName: "Vitamin Pack - Quarterly",
    productImage: null,
    status: "active",
    price: 79.99,
    interval: "quarter",
    nextBilling: "2024-05-01",
    startedAt: "2024-02-01",
  },
  {
    id: "sub_3",
    productName: "Snack Box - Monthly",
    productImage: null,
    status: "paused",
    price: 24.99,
    interval: "month",
    nextBilling: null,
    startedAt: "2023-09-01",
    pausedUntil: "2024-05-01",
  },
  {
    id: "sub_4",
    productName: "Meal Kit - Weekly",
    productImage: null,
    status: "cancelled",
    price: 49.99,
    interval: "week",
    nextBilling: null,
    startedAt: "2023-03-15",
    cancelledAt: "2024-01-15",
  },
]

const statusConfig = {
  active: { color: "success" as const, label: "Active", icon: Check },
  paused: { color: "warning" as const, label: "Paused", icon: Clock },
  cancelled: { color: "error" as const, label: "Cancelled", icon: XCircle },
}

export function AccountSubscriptionsPage({ countryCode }: SubscriptionsPageProps) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const isLoading = false
  const subscriptions = mockSubscriptions

  const activeSubscriptions = subscriptions.filter(s => s.status === "active" || s.status === "paused")
  const cancelledSubscriptions = subscriptions.filter(s => s.status === "cancelled")

  const handleCancel = (subId: string) => {
    setSelectedSub(subId)
    setCancelModalOpen(true)
  }

  const confirmCancel = () => {
    console.log("Cancel subscription:", selectedSub)
    setCancelModalOpen(false)
    setSelectedSub(null)
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/subscriptions`}>
      <AccountPageHeader
        title="My Subscriptions"
        description="Manage your recurring orders"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Subscriptions" },
        ]}
      />

      {isLoading ? (
        <div className="space-y-4">
          <AccountSkeleton height="h-48" />
          <AccountSkeleton height="h-48" />
        </div>
      ) : subscriptions.length > 0 ? (
        <div className="space-y-8">
          {/* Active Subscriptions */}
          {activeSubscriptions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Active Subscriptions</h2>
              <div className="space-y-4">
                {activeSubscriptions.map((sub) => (
                  <SubscriptionCard
                    key={sub.id}
                    subscription={sub}
                    countryCode={countryCode}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Cancelled Subscriptions */}
          {cancelledSubscriptions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Past Subscriptions</h2>
              <div className="space-y-4">
                {cancelledSubscriptions.map((sub) => (
                  <SubscriptionCard
                    key={sub.id}
                    subscription={sub}
                    countryCode={countryCode}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <AccountEmptyState
          icon={<ArrowPath className="w-12 h-12" />}
          title="No subscriptions yet"
          description="Subscribe to products for regular deliveries"
          action={{
            label: "Browse Subscriptions",
            href: `/${countryCode}/products?type=subscription`,
          }}
        />
      )}

      {/* Cancel Modal */}
      <AccountModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel Subscription"
      >
        <div className="space-y-4">
          <p className="text-gray-400">
            Are you sure you want to cancel this subscription? You can resubscribe anytime.
          </p>
          <div className="flex gap-3 justify-end">
            <AccountButton variant="secondary" onClick={() => setCancelModalOpen(false)}>
              Keep Subscription
            </AccountButton>
            <AccountButton variant="danger" onClick={confirmCancel}>
              Cancel Subscription
            </AccountButton>
          </div>
        </div>
      </AccountModal>
    </AccountLayout>
  )
}

interface SubscriptionCardProps {
  subscription: typeof mockSubscriptions[0]
  countryCode: string
  onCancel: (id: string) => void
}

function SubscriptionCard({ subscription, countryCode, onCancel }: SubscriptionCardProps) {
  const status = statusConfig[subscription.status as keyof typeof statusConfig]
  const StatusIcon = status.icon

  return (
    <AccountCard>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center">
              {subscription.productImage ? (
                <img src={subscription.productImage} alt={subscription.productName} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <ArrowPath className="w-8 h-8 text-gray-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white">{subscription.productName}</h3>
              <p className="text-cyan-400 font-medium">
                ${subscription.price.toFixed(2)} / {subscription.interval}
              </p>
            </div>
          </div>
          <AccountBadge variant={status.color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </AccountBadge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Started</p>
            <p className="text-white">{new Date(subscription.startedAt).toLocaleDateString()}</p>
          </div>
          {subscription.nextBilling && (
            <div>
              <p className="text-gray-500 mb-1">Next Billing</p>
              <p className="text-white">{new Date(subscription.nextBilling).toLocaleDateString()}</p>
            </div>
          )}
          {subscription.pausedUntil && (
            <div>
              <p className="text-gray-500 mb-1">Paused Until</p>
              <p className="text-yellow-400">{new Date(subscription.pausedUntil).toLocaleDateString()}</p>
            </div>
          )}
          {subscription.cancelledAt && (
            <div>
              <p className="text-gray-500 mb-1">Cancelled</p>
              <p className="text-gray-400">{new Date(subscription.cancelledAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            {subscription.status === "active" && (
              <>
                <AccountButton variant="secondary" size="sm">
                  <Clock className="w-4 h-4 mr-1" />
                  Pause
                </AccountButton>
                <AccountButton variant="ghost" size="sm" onClick={() => onCancel(subscription.id)}>
                  Cancel
                </AccountButton>
              </>
            )}
            {subscription.status === "paused" && (
              <AccountButton size="sm">
                Resume
              </AccountButton>
            )}
            {subscription.status === "cancelled" && (
              <AccountButton variant="secondary" size="sm">
                Resubscribe
              </AccountButton>
            )}
          </div>
          <Link
            to={`/${countryCode}/account/subscriptions/${subscription.id}`}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AccountCard>
  )
}
