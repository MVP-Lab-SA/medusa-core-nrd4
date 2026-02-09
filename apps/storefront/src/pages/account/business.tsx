import { useState } from "react"
import { useParams } from "@tanstack/react-router"
import {
  useCompany,
  useQuotes,
  usePurchaseOrders,
  useApprovalRequests,
  useRegisterCompany,
} from "@/lib/hooks/use-marketplace"
import { useCustomer } from "@/lib/context/customer-context"
import { Buildings, DocumentText, ShoppingCart, Clock, Plus, XMark } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"

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
  const [activeTab, setActiveTab] = useState("overview")
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
      <AccountLayout currentPath={`/${countryCode}/account/business`}>
        <div className="text-center py-12">
          <p className="text-gray-400">Please log in to access B2B features.</p>
        </div>
      </AccountLayout>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Buildings },
    { id: "quotes", label: "Quotes", icon: DocumentText, count: quotes?.length },
    { id: "orders", label: "Purchase Orders", icon: ShoppingCart, count: purchaseOrders?.length },
    { id: "approvals", label: "Approvals", icon: Clock, count: approvals?.filter((a) => a.status === "pending").length },
  ]

  // No company registered
  if (!companyLoading && !company) {
    return (
      <AccountLayout currentPath={`/${countryCode}/account/business`}>
        <h1 className="text-2xl font-bold text-white mb-6">Business Account</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
            <Buildings className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mt-4">
            Register Your Business
          </h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            Create a business account to access bulk pricing, net payment terms,
            purchase orders, and dedicated support.
          </p>
          <button
            onClick={() => setShowRegister(true)}
            className="mt-6 px-6 py-3 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors"
          >
            Register Business
          </button>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { title: "Volume Discounts", description: "Get better pricing on bulk orders" },
            { title: "Net Payment Terms", description: "Pay invoices within 30, 60, or 90 days" },
            { title: "Dedicated Support", description: "Priority customer service for businesses" },
          ].map((benefit, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="font-semibold text-white">{benefit.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Registration Modal */}
        {showRegister && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Register Business</h2>
                <button onClick={() => setShowRegister(false)} className="text-gray-400 hover:text-white">
                  <XMark className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tax ID / VAT Number</label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
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
                  <label className="block text-sm font-medium text-gray-400 mb-2">Company Size</label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value as typeof formData.size })}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
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
                    className="flex-1 py-2.5 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={registerCompany.isPending}
                    className="flex-1 py-2.5 text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 disabled:bg-gray-600 transition-colors font-medium"
                  >
                    {registerCompany.isPending ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AccountLayout>
    )
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/business`}>
      <h1 className="text-2xl font-bold text-white mb-6">Business Account</h1>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-cyan-500 text-black"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? "bg-black/20" : "bg-gray-700"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && company && (
        <div className="space-y-6">
          {/* Company Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Buildings className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{company.name}</h3>
                  <p className="text-gray-400 text-sm">Tax ID: {company.taxId}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                company.status === "verified" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                {company.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
              <div>
                <p className="text-gray-500 text-sm">Credit Limit</p>
                <p className="text-white font-semibold">${company.creditLimit?.toLocaleString() || "0"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Payment Terms</p>
                <p className="text-white font-semibold">{company.paymentTerms || "Net 30"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Industry</p>
                <p className="text-white font-semibold capitalize">{company.industry || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Team Members</h2>
              <button className="text-sm text-cyan-400 hover:underline">Invite Member</button>
            </div>
            {company.users && company.users.length > 0 ? (
              <div className="space-y-3">
                {company.users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded capitalize">
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
            <h2 className="text-lg font-semibold text-white">Quote Requests</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-lg text-sm font-medium hover:bg-cyan-400 transition-colors">
              <Plus className="w-4 h-4" />
              Request Quote
            </button>
          </div>
          {quotes && quotes.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {quotes.map((quote) => (
                <div key={quote.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-white">Quote #{quote.id.slice(-8)}</p>
                      <p className="text-sm text-gray-500">{new Date(quote.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quote.status === "approved" ? "bg-green-500/20 text-green-400" :
                      quote.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {quote.status}
                    </span>
                  </div>
                  <p className="text-cyan-400 font-semibold">${quote.total?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
              <p className="text-gray-500">No quotes yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Purchase Orders</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-lg text-sm font-medium hover:bg-cyan-400 transition-colors">
              <Plus className="w-4 h-4" />
              Create Order
            </button>
          </div>
          {purchaseOrders && purchaseOrders.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {purchaseOrders.map((order) => (
                <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-white">PO #{order.poNumber}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered" ? "bg-green-500/20 text-green-400" :
                      order.status === "processing" ? "bg-cyan-500/20 text-cyan-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-cyan-400 font-semibold">${order.total?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
              <p className="text-gray-500">No purchase orders yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "approvals" && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Pending Approvals</h2>
          {approvals && approvals.filter((a) => a.status === "pending").length > 0 ? (
            <div className="space-y-4">
              {approvals.filter((a) => a.status === "pending").map((approval) => (
                <div key={approval.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{approval.type}</p>
                      <p className="text-sm text-gray-500">Requested by {approval.requestedBy}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
              <p className="text-gray-500">No pending approvals</p>
            </div>
          )}
        </div>
      )}
    </AccountLayout>
  )
}
