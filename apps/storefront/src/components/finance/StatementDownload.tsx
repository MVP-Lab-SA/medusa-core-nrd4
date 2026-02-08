import { ArrowDownTray, DocumentText, Calendar } from "@medusajs/icons"
import type { AccountStatement } from "../../lib/mock/erpnext"

interface StatementDownloadProps {
  statements: AccountStatement[]
  onDownload: (statementId: string) => void
}

export function StatementDownload({ statements, onDownload }: StatementDownloadProps) {
  if (statements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <DocumentText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No statements available yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {statements.map((statement) => (
        <div
          key={statement.id}
          className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <DocumentText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {statement.period} Statement
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(statement.startDate).toLocaleDateString()} -{" "}
                  {new Date(statement.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDownload(statement.id)}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <ArrowDownTray className="w-4 h-4" />
            <span className="font-medium">Download</span>
          </button>
        </div>
      ))}
    </div>
  )
}
