import { useState } from "react"
import {
  useCompany,
  useQuotes,
  usePurchaseOrders,
  useApprovalRequests,
  useRegisterCompany,
} from "@/lib/hooks/use-marketplace"
import { CompanyCard, QuoteCard, PurchaseOrderCard, ApprovalRequestCard } from "@/components/ui/b2b-components"
import { useCustomer } from "@/lib/context/customer-context"
import { Buildings, DocumentText, ShoppingCart, Clock } from "@medusajs/icons"

interface AccountBusinessPageProps {
  countryCode: string
}

export default function AccountBusinessPage({ countryCode }: AccountBusinessPageProps) {
  const { customer } = useCustomer()
  const { data: company, isLoading: companyLoading } = useCompany(customer?.id || "")
  const { data: quotes } = useQuotes(company?.id || "")
  const { data: purchaseOrders } = usePurchaseOrders(company?.id || "")
  const { data: approvals } = useApprovalRequests(company?.id || "")
  const registerCompany = useRegisterCompany()

  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    taxId: "",
    industry: "",
    size: "small" as const,
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerCompany.mutateAsync(formData)
      setShowRegister(false)
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to access B2B features.</p>
      </div>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Buildings },
    { id: "quotes", label: "Quotes", icon: DocumentText, count: quotes?.length },
    { id: "orders", label: "Purchase Orders", icon: ShoppingCart, count: purchaseOrders?.length },
    { id: "approvals", label: "Approvals", icon: Clock, count: approvals?.filter((a) => a.status === "pending").length },
  ]

  const [activeTab, setActiveTab] = useState("overview")

  // No company registered
  if (!companyLoading && !company) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Business Account</h1>

        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Buildings className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mt-4">
            Register Your Business
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Create a business account to access bulk pricing, net payment terms,
            purchase orders, and dedicated support.
          </p>
          <button
            onClick={() => setShowRegister(true)}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Register Business
          </button>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Volume Discounts",
              description: "Get better pricing on bulk orders",
            },
            {
              title: "Net Payment Terms",
              description: "Pay invoices within 30, 60, or 90 days",
            },
            {
              title: "Dedicated Support",
              description: "Priority customer service for businesses",
            },
          ].map((benefit, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Registration Modal */}
        {showRegister && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-semibold text-gray-900">Register Business</h2>

              <form onSubmit={handleRegister} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax ID / VAT Number
                  </label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select industry</option>
                    <option value="retail">Retail</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="construction">Construction</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({ ...formData, size: e.target.value as typeof formData.size })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small (1-50 employees)</option>
                    <option value="medium">Medium (51-200 employees)</option>
                    <option value="large">Large (201-1000 employees)</option>
                    <option value="enterprise">Enterprise (1000+ employees)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegister(false)}
                    className="flex-1 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={registerCompany.isPending}
                    className="flex-1 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                  >
                    {registerCompany.isPending ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Business Account</h1>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-white/20" : "bg-gray-200"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && company && (
        <div className="space-y-6">
          <CompanyCard company={company} />

          {/* Team Members */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
              <button className="text-sm text-blue-600 hover:underline">
                Invite Member
              </button>
            </div>
            {company.users.length > 0 ? (
              <div className="space-y-3">
                {company.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded capitalize">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No team members yet</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "quotes" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quote Requests</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
              Request Quote
            </button>
          </div>
          {quotes && quotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No quotes yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Purchase Orders</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
              Create Order
            </button>
          </div>
          {purchaseOrders && purchaseOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {purchaseOrders.map((order) => (
                <PurchaseOrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No purchase orders yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "approvals" && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h2>
          {approvals && approvals.filter((a) => a.status === "pending").length > 0 ? (
            <div className="space-y-4">
              {approvals
                .filter((a) => a.status === "pending")
                .map((approval) => (
                  <ApprovalRequestCard key={approval.id} request={approval} />
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No pending approvals</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
