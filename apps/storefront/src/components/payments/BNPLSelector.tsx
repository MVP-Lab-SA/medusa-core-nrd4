import { useState } from "react"
import { Check, Calendar } from "@medusajs/icons"

interface BNPLOption {
  id: string
  provider: string
  logo?: string
  installments: number
  interestRate: number
  monthlyPayment: number
  totalAmount: number
  firstPaymentDue: string
}

interface BNPLSelectorProps {
  orderTotal: number
  options: BNPLOption[]
  onSelect: (optionId: string) => void
  selectedId?: string
}

export function BNPLSelector({ orderTotal, options, onSelect, selectedId }: BNPLSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Pay in Installments</h3>
        <span className="text-sm text-gray-500">Order Total: ${orderTotal.toFixed(2)}</span>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          const savings = orderTotal - option.totalAmount

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`w-full p-4 rounded-lg border text-left transition-colors ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {option.logo ? (
                    <img src={option.logo} alt={option.provider} className="h-6" />
                  ) : (
                    <span className="font-medium text-gray-900">{option.provider}</span>
                  )}
                  {option.interestRate === 0 && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      0% Interest
                    </span>
                  )}
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Installments</p>
                  <p className="font-medium text-gray-900">{option.installments}x</p>
                </div>
                <div>
                  <p className="text-gray-500">Monthly</p>
                  <p className="font-medium text-gray-900">${option.monthlyPayment.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className={`font-medium ${option.interestRate > 0 ? 'text-gray-900' : 'text-green-600'}`}>
                    ${option.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>First payment: {new Date(option.firstPaymentDue).toLocaleDateString()}</span>
              </div>
            </button>
          )
        })}
      </div>

      <p className="text-xs text-gray-500 text-center">
        Subject to credit approval. See terms for details.
      </p>
    </div>
  )
}
