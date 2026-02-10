import { useState } from "react"
import { CreditCard, Plus, Trash, Check, EllipsisHorizontal } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
  AccountModal,
  AccountInput,
  AccountSelect,
} from "@/components/account/AccountUI"

interface PaymentMethodsPageProps {
  countryCode: string
}

// Mock data
const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2026,
    isDefault: false,
  },
  {
    id: "pm_3",
    type: "card",
    brand: "amex",
    last4: "0005",
    expMonth: 3,
    expYear: 2025,
    isDefault: false,
  },
]

const brandLogos: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
}

export function AccountPaymentMethodsPage({ countryCode }: PaymentMethodsPageProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const isLoading = false
  const paymentMethods = mockPaymentMethods

  const handleDelete = (methodId: string) => {
    setSelectedMethod(methodId)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    console.log("Delete payment method:", selectedMethod)
    setShowDeleteModal(false)
    setSelectedMethod(null)
  }

  const handleSetDefault = (methodId: string) => {
    console.log("Set default:", methodId)
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/payment-methods`}>
      <AccountPageHeader
        title="Payment Methods"
        description="Manage your saved payment methods"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Payment Methods" },
        ]}
        action={
          <AccountButton onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </AccountButton>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          <AccountSkeleton height="h-24" />
          <AccountSkeleton height="h-24" />
          <AccountSkeleton height="h-24" />
        </div>
      ) : paymentMethods.length > 0 ? (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <AccountCard key={method.id}>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <CardBrandIcon brand={method.brand} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {brandLogos[method.brand] || method.brand} ending in {method.last4}
                      </span>
                      {method.isDefault && (
                        <AccountBadge variant="info">Default</AccountBadge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Expires {method.expMonth.toString().padStart(2, "0")}/{method.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <AccountButton 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      Set as Default
                    </AccountButton>
                  )}
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </AccountCard>
          ))}

          {/* Security Note */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-medium mb-1">Your payment information is secure</p>
                <p className="text-sm text-gray-500">
                  We use industry-standard encryption to protect your payment details. 
                  Your full card number is never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AccountEmptyState
          icon={<CreditCard className="w-12 h-12" />}
          title="No payment methods saved"
          description="Add a payment method for faster checkout"
          action={{
            label: "Add Payment Method",
            onClick: () => setShowAddModal(true),
          }}
        />
      )}

      {/* Add Payment Method Modal */}
      <AccountModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Payment Method"
        size="md"
      >
        <div className="space-y-4">
          <AccountInput
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            type="text"
          />
          <div className="grid grid-cols-2 gap-4">
            <AccountInput
              label="Expiry Date"
              placeholder="MM/YY"
              type="text"
            />
            <AccountInput
              label="CVC"
              placeholder="123"
              type="text"
            />
          </div>
          <AccountInput
            label="Name on Card"
            placeholder="John Doe"
            type="text"
          />
          <AccountSelect label="Country">
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="gb">United Kingdom</option>
          </AccountSelect>
          <AccountInput
            label="Billing ZIP Code"
            placeholder="12345"
            type="text"
          />
          
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="setDefault" className="rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-cyan-500" />
            <label htmlFor="setDefault" className="text-sm text-gray-400">
              Set as default payment method
            </label>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <AccountButton variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </AccountButton>
            <AccountButton>
              Add Card
            </AccountButton>
          </div>
        </div>
      </AccountModal>

      {/* Delete Confirmation Modal */}
      <AccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Remove Payment Method"
      >
        <div className="space-y-4">
          <p className="text-gray-400">
            Are you sure you want to remove this payment method? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <AccountButton variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </AccountButton>
            <AccountButton variant="danger" onClick={confirmDelete}>
              Remove
            </AccountButton>
          </div>
        </div>
      </AccountModal>
    </AccountLayout>
  )
}

function CardBrandIcon({ brand }: { brand: string }) {
  // Simple text-based brand display - in production, use actual card brand logos
  const brandColors: Record<string, string> = {
    visa: "text-blue-400",
    mastercard: "text-orange-400",
    amex: "text-cyan-400",
    discover: "text-orange-500",
  }

  return (
    <span className={`text-xs font-bold uppercase ${brandColors[brand] || "text-gray-400"}`}>
      {brand.slice(0, 4)}
    </span>
  )
}
