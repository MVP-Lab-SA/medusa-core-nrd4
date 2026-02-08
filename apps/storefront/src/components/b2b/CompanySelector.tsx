import { useState } from "react"
import { ChevronDownMini, Buildings } from "@medusajs/icons"
import type { Company } from "../../lib/mock/marketplace"

interface CompanySelectorProps {
  companies: Company[]
  selectedCompany: Company | null
  onSelect: (company: Company) => void
}

export function CompanySelector({ companies, selectedCompany, onSelect }: CompanySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full"
      >
        <Buildings className="w-5 h-5 text-gray-500" />
        <span className="flex-1 text-left truncate">
          {selectedCompany ? selectedCompany.name : "Select Company"}
        </span>
        <ChevronDownMini className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => {
                onSelect(company)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 ${
                selectedCompany?.id === company.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="font-medium text-gray-900">{company.name}</div>
              <div className="text-sm text-gray-500">{company.taxId}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
