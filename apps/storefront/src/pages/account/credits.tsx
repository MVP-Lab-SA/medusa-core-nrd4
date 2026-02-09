import { useCreditNotes, useCreditBalance, useAccountStatements, useDownloadStatement } from "@/lib/hooks/use-erpnext"
import { useCustomer } from "@/lib/context/customer-context"
import { CreditCard, ArrowDownTray, DocumentText } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"

interface AccountCreditsPageProps {
  countryCode: string
}

export default function AccountCreditsPage({ countryCode }: AccountCreditsPageProps) {
  const { customer } = useCustomer()
  const { data: creditNotes, isLoading: creditsLoading } = useCreditNotes(customer?.id || "")
  const { data: creditBalance } = useCreditBalance(customer?.id || "")
  const { data: statements } = useAccountStatements(customer?.id || "")
  const downloadStatement = useDownloadStatement()

  const handleDownload = async (statementId: string) => {
    try {
      const result = await downloadStatement.mutateAsync(statementId)
      window.open(result.url, "_blank")
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  if (!customer) {
    return (
      <AccountLayout currentPath={`/${countryCode}/account/credits`}>
        <div className="text-center py-12">
          <p className="text-gray-400">Please log in to view your credits and statements.</p>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/credits`}>
      <h1 className="text-2xl font-bold text-white mb-6">Credits & Statements</h1>

      {/* Credit Balance */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <CreditCard className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-cyan-100 text-sm">Store Credit Balance</p>
            <p className="text-3xl font-bold text-white">
              {creditBalance?.currency || "USD"} {creditBalance?.balance.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>
        <p className="text-cyan-100 text-sm mt-4">
          Store credits are automatically applied at checkout
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Credit Notes */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Credit Notes</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {creditsLoading ? (
              <div className="p-6">
                <div className="h-20 bg-gray-800 rounded animate-pulse" />
              </div>
            ) : creditNotes && creditNotes.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {creditNotes.map((note) => (
                  <div key={note.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-white">{note.reason}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                        {note.orderId && (
                          <p className="text-sm text-gray-500">
                            Order: #{note.orderId.slice(-8)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-cyan-400">
                          {note.currency} {note.balance.toFixed(2)}
                        </p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                          note.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : note.status === "used"
                            ? "bg-gray-500/20 text-gray-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {note.status}
                        </span>
                      </div>
                    </div>
                    {note.expiresAt && note.status === "active" && (
                      <p className="text-xs text-amber-400 mt-2">
                        Expires {new Date(note.expiresAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No credit notes</p>
              </div>
            )}
          </div>
        </div>

        {/* Account Statements */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Account Statements</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {statements && statements.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {statements.map((statement) => (
                  <div key={statement.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <DocumentText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {new Date(statement.periodStart).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-500">
                          {statement.transactions.length} transactions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Closing Balance</p>
                        <p className="font-medium text-white">
                          {statement.currency} {statement.closingBalance.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownload(statement.id)}
                        disabled={downloadStatement.isPending}
                        className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <ArrowDownTray className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No statements available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      {statements && statements.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Transactions</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Reference</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Debit</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Credit</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {statements[0].transactions.slice(0, 10).map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{tx.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{tx.reference}</td>
                    <td className="px-4 py-3 text-sm text-right text-red-400">
                      {tx.debit > 0 ? `$${tx.debit.toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-green-400">
                      {tx.credit > 0 ? `$${tx.credit.toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-white">
                      ${tx.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tax Certificates Link */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">Tax Exemption Certificates</h3>
            <p className="text-sm text-gray-400 mt-1">
              Upload tax exemption certificates for B2B purchases
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors">
            Manage Certificates
          </button>
        </div>
      </div>
    </AccountLayout>
  )
}
