import { createFileRoute } from "@tanstack/react-router"
import { useStatements } from "../../../lib/hooks/use-erpnext"
import { StatementDownload } from "../../../components/finance/StatementDownload"

export const Route = createFileRoute("/$countryCode/account/statements")({
  component: StatementsPage,
})

function StatementsPage() {
  const { data: statements, isLoading } = useStatements()

  const handleDownload = (statementId: string) => {
    console.log("Download statement:", statementId)
    alert("Statement download started")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Account Statements</h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <StatementDownload statements={statements || []} onDownload={handleDownload} />
          </div>
        )}
      </div>
    </div>
  )
}
