import { useState } from "react"
import { ArrowRightMini, ArrowDownTray, CurrencyDollar, Funnel } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountCardHeader,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
  AccountTabs,
  AccountSelect,
} from "@/components/account/AccountUI"

interface TransactionsPageProps {
  countryCode: string
}

// Mock data
const mockTransactions = [
  {
    id: "txn_1",
    type: "credit",
    amount: 50.00,
    description: "Store credit added",
    source: "Referral reward",
    date: "2024-03-15T10:30:00",
    status: "completed",
  },
  {
    id: "txn_2",
    type: "debit",
    amount: 25.99,
    description: "Order #1234",
    source: "Purchase",
    date: "2024-03-14T15:45:00",
    status: "completed",
  },
  {
    id: "txn_3",
    type: "credit",
    amount: 10.00,
    description: "Loyalty points conversion",
    source: "Loyalty program",
    date: "2024-03-12T09:00:00",
    status: "completed",
  },
  {
    id: "txn_4",
    type: "debit",
    amount: 49.99,
    description: "Order #1230",
    source: "Purchase",
    date: "2024-03-10T14:20:00",
    status: "completed",
  },
  {
    id: "txn_5",
    type: "credit",
    amount: 15.00,
    description: "Refund - Order #1225",
    source: "Refund",
    date: "2024-03-08T11:15:00",
    status: "completed",
  },
  {
    id: "txn_6",
    type: "credit",
    amount: 20.00,
    description: "Gift card redeemed",
    source: "Gift card",
    date: "2024-03-05T16:30:00",
    status: "pending",
  },
]

const walletBalance = 69.02

export function AccountTransactionsPage({ countryCode }: TransactionsPageProps) {
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("30")
  const isLoading = false

  const filteredTransactions = mockTransactions.filter((txn) => {
    if (filter === "all") return true
    return txn.type === filter
  })

  const totalCredits = mockTransactions
    .filter(t => t.type === "credit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalDebits = mockTransactions
    .filter(t => t.type === "debit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const tabs = [
    { id: "all", label: "All" },
    { id: "credit", label: "Credits" },
    { id: "debit", label: "Debits" },
  ]

  return (
    <AccountLayout currentPath={`/${countryCode}/account/transactions`}>
      <AccountPageHeader
        title="Transaction History"
        description="View your wallet and store credit activity"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Transactions" },
        ]}
        action={
          <AccountButton variant="secondary">
            <ArrowDownTray className="w-4 h-4 mr-2" />
            Export
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
          <AccountSkeleton height="h-96" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AccountCard className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Current Balance</span>
                  <CurrencyDollar className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-2xl font-bold text-white">${walletBalance.toFixed(2)}</p>
              </div>
            </AccountCard>

            <AccountCard>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Credits</span>
                  <ArrowDownTray className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-green-400">+${totalCredits.toFixed(2)}</p>
              </div>
            </AccountCard>

            <AccountCard>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Spent</span>
                  <ArrowRightMini className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-2xl font-bold text-red-400">-${totalDebits.toFixed(2)}</p>
              </div>
            </AccountCard>
          </div>

          {/* Transactions List */}
          <AccountCard>
            <AccountCardHeader
              title="Transactions"
              action={
                <div className="flex items-center gap-3">
                  <AccountSelect
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-auto"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                    <option value="365">Last year</option>
                  </AccountSelect>
                </div>
              }
            />

            <div className="px-6">
              <AccountTabs
                tabs={tabs}
                activeTab={filter}
                onChange={setFilter}
              />
            </div>

            {filteredTransactions.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {filteredTransactions.map((txn) => (
                  <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        txn.type === "credit" 
                          ? "bg-green-500/10" 
                          : "bg-red-500/10"
                      }`}>
                        {txn.type === "credit" ? (
                          <ArrowDownTray className="w-5 h-5 text-green-400" />
                        ) : (
                          <ArrowRightMini className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{txn.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{txn.source}</span>
                          <span className="w-1 h-1 bg-gray-600 rounded-full" />
                          <span>
                            {new Date(txn.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        txn.type === "credit" ? "text-green-400" : "text-white"
                      }`}>
                        {txn.type === "credit" ? "+" : "-"}${txn.amount.toFixed(2)}
                      </p>
                      {txn.status === "pending" && (
                        <AccountBadge variant="warning" className="mt-1">Pending</AccountBadge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No transactions found</p>
              </div>
            )}
          </AccountCard>
        </div>
      )}
    </AccountLayout>
  )
}
