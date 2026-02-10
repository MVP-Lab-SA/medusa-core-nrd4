import { createFileRoute } from "@tanstack/react-router"
import { useStatements } from "../../../lib/hooks/use-erpnext"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { DocumentText, ArrowDownTray, Calendar } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/statements")({
  component: StatementsPage,
})

function StatementsPage() {
  const { countryCode } = Route.useParams()
  const { data: statements, isLoading } = useStatements()

  const handleDownload = (statementId: string) => {
    console.log("Download statement:", statementId)
    alert("Statement download started")
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/statements`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Account Statements</h1>
          <p className="text-gray-400 mt-1">Download your monthly account statements</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : statements && statements.length > 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-800">
            {statements.map((statement) => (
              <div key={statement.id} className="flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <DocumentText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{statement.title || statement.period}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {statement.startDate} - {statement.endDate}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(statement.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-cyan-400 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowDownTray className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
          <DocumentText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No statements available</p>
          <p className="text-sm text-gray-500 mt-2">
            Statements are generated monthly and will appear here
          </p>
        </div>
      )}
    </AccountLayout>
  )
}
