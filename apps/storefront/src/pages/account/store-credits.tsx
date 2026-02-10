import { useState } from "react"
import { CurrencyDollar, Gift, Plus, ArrowDownTray, ArrowRightMini, Tag } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountCardHeader,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
  AccountModal,
  AccountInput,
  AccountStatCard,
} from "@/components/account/AccountUI"

interface StoreCreditsPageProps {
  countryCode: string
}

// Mock data
const creditData = {
  balance: 125.50,
  pending: 25.00,
  lifetime: 450.00,
  credits: [
    {
      id: "cred_1",
      type: "reward",
      amount: 50.00,
      source: "Loyalty reward",
      status: "active",
      expiresAt: "2024-12-31",
      createdAt: "2024-03-15",
    },
    {
      id: "cred_2",
      type: "refund",
      amount: 45.50,
      source: "Order #1225 refund",
      status: "active",
      expiresAt: null,
      createdAt: "2024-03-10",
    },
    {
      id: "cred_3",
      type: "gift",
      amount: 30.00,
      source: "Gift card redeemed",
      status: "active",
      expiresAt: "2025-03-05",
      createdAt: "2024-03-05",
    },
    {
      id: "cred_4",
      type: "promo",
      amount: 25.00,
      source: "New customer bonus",
      status: "pending",
      expiresAt: "2024-06-01",
      createdAt: "2024-03-01",
    },
    {
      id: "cred_5",
      type: "spent",
      amount: -75.00,
      source: "Used on Order #1230",
      status: "used",
      expiresAt: null,
      createdAt: "2024-02-28",
    },
  ],
}

const typeConfig = {
  reward: { icon: Gift, color: "text-purple-400", bg: "bg-purple-500/10" },
  refund: { icon: ArrowDownTray, color: "text-green-400", bg: "bg-green-500/10" },
  gift: { icon: Tag, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  promo: { icon: CurrencyDollar, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  spent: { icon: ArrowRightMini, color: "text-red-400", bg: "bg-red-500/10" },
}

export function AccountStoreCreditsPage({ countryCode }: StoreCreditsPageProps) {
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [giftCardCode, setGiftCardCode] = useState("")
  const isLoading = false

  const activeCredits = creditData.credits.filter(c => c.status === "active" || c.status === "pending")
  const usedCredits = creditData.credits.filter(c => c.status === "used")

  const handleRedeem = () => {
    console.log("Redeem code:", giftCardCode)
    setShowRedeemModal(false)
    setGiftCardCode("")
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/store-credits`}>
      <AccountPageHeader
        title="Store Credits"
        description="Manage your credits and gift cards"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Store Credits" },
        ]}
        action={
          <AccountButton onClick={() => setShowRedeemModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Redeem Gift Card
          </AccountButton>
        }
      />

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <AccountSkeleton height="h-24" />
            <AccountSkeleton height="h-24" />
            <AccountSkeleton height="h-24" />
          </div>
          <AccountSkeleton height="h-64" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AccountCard className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Available Balance</span>
                  <CurrencyDollar className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-3xl font-bold text-white">${creditData.balance.toFixed(2)}</p>
              </div>
            </AccountCard>

            <AccountStatCard
              title="Pending Credits"
              value={`$${creditData.pending.toFixed(2)}`}
              icon={<Gift className="w-5 h-5" />}
              description="Awaiting activation"
            />

            <AccountStatCard
              title="Lifetime Earned"
              value={`$${creditData.lifetime.toFixed(2)}`}
              icon={<CurrencyDollar className="w-5 h-5" />}
              trend="up"
            />
          </div>

          {/* Active Credits */}
          <AccountCard>
            <AccountCardHeader
              title="Your Credits"
              description="Active and pending store credits"
            />
            {activeCredits.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {activeCredits.map((credit) => {
                  const config = typeConfig[credit.type as keyof typeof typeConfig]
                  const TypeIcon = config.icon

                  return (
                    <div key={credit.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}>
                          <TypeIcon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{credit.source}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(credit.createdAt).toLocaleDateString()}
                            {credit.expiresAt && (
                              <> - Expires {new Date(credit.expiresAt).toLocaleDateString()}</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-cyan-400">
                          +${credit.amount.toFixed(2)}
                        </span>
                        {credit.status === "pending" && (
                          <AccountBadge variant="warning">Pending</AccountBadge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No active credits</p>
              </div>
            )}
          </AccountCard>

          {/* Recent Activity */}
          {usedCredits.length > 0 && (
            <AccountCard>
              <AccountCardHeader
                title="Recent Activity"
                description="Credits used on purchases"
              />
              <div className="divide-y divide-gray-800">
                {usedCredits.map((credit) => {
                  const config = typeConfig[credit.type as keyof typeof typeConfig]
                  const TypeIcon = config.icon

                  return (
                    <div key={credit.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}>
                          <TypeIcon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{credit.source}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(credit.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-semibold text-gray-400">
                        ${credit.amount.toFixed(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </AccountCard>
          )}
        </div>
      )}

      {/* Redeem Gift Card Modal */}
      <AccountModal
        isOpen={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
        title="Redeem Gift Card"
      >
        <div className="space-y-4">
          <p className="text-gray-400">
            Enter your gift card code to add the balance to your store credit.
          </p>
          <AccountInput
            label="Gift Card Code"
            value={giftCardCode}
            onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
          <div className="flex gap-3 justify-end pt-2">
            <AccountButton variant="secondary" onClick={() => setShowRedeemModal(false)}>
              Cancel
            </AccountButton>
            <AccountButton onClick={handleRedeem} disabled={!giftCardCode.trim()}>
              Redeem
            </AccountButton>
          </div>
        </div>
      </AccountModal>
    </AccountLayout>
  )
}
