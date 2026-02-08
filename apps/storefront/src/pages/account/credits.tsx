import { useCreditNotes, useCreditBalance, useAccountStatements, useDownloadStatement } from "@/lib/hooks/use-erpnext"
import { useCustomer } from "@/lib/context/customer-context"
import { CreditCard, ArrowDownTray, Calendar, DocumentText } from "@medusajs/icons"

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
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to view your credits and statements.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Credits & Statements</h1>

      {/* Credit Balance */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <CreditCard className="w-8 h-8" />
          </div>
          <div>
            <p className="text-green-100">Store Credit Balance</p>
            <p className="text-3xl font-bold">
              {creditBalance?.currency || "USD"} {creditBalance?.balance.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>
        <p className="text-green-100 text-sm mt-4">
          Store credits are automatically applied at checkout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Notes */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Credit Notes</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {creditsLoading ? (
              <div className="p-8">
                <div className="h-20 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : creditNotes && creditNotes.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {creditNotes.map((note) => (
                  <div key={note.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{note.reason}</p>
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
                        <p className="font-semibold text-gray-900">
                          {note.currency} {note.balance.toFixed(2)}
                        </p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            note.status === "active"
                              ? "bg-green-100 text-green-700"
                              : note.status === "used"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {note.status}
                        </span>
                      </div>
                    </div>
                    {note.expiresAt && note.status === "active" && (
                      <p className="text-xs text-orange-600 mt-2">
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statements</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {statements && statements.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {statements.map((statement) => (
                  <div key={statement.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <DocumentText className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
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
                        <p className="font-medium text-gray-900">
                          {statement.currency} {statement.closingBalance.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownload(statement.id)}
                        disabled={downloadStatement.isPending}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Reference
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Debit
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Credit
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {statements[0].transactions.slice(0, 10).map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{tx.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                      {tx.reference}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-red-600">
                      {tx.debit > 0 ? `$${tx.debit.toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-green-600">
                      {tx.credit > 0 ? `$${tx.credit.toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
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
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Tax Exemption Certificates</h3>
            <p className="text-sm text-gray-500 mt-1">
              Upload tax exemption certificates for B2B purchases
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            Manage Certificates
          </button>
        </div>
      </div>
    </div>
  )
}
