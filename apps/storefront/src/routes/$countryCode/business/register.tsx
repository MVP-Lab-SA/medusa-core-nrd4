import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/business/register")({
  component: BusinessRegister,
})

function BusinessRegister() {
  const { countryCode } = Route.useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    taxId: "",
    industry: "",
    employees: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    annualRevenue: "",
    expectedVolume: "",
  })

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit form
      alert("Application submitted! We will review and contact you within 2 business days.")
      navigate({ to: `/${countryCode}/business` })
    }
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Register Your Business
        </h1>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`w-20 h-1 ${s < step ? "bg-cyan-500" : "bg-gray-800"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Company Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tax ID / EIN</label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => updateField("taxId", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                    required
                  >
                    <option value="">Select industry</option>
                    <option value="retail">Retail</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Number of Employees</label>
                <select
                  value={formData.employees}
                  onChange={(e) => updateField("employees", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                  required
                >
                  <option value="">Select range</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Business Address</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => updateField("zip", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Contact Name</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => updateField("contactEmail", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => updateField("contactPhone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-700 text-white rounded-lg hover:bg-gray-800"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
            >
              {step === 3 ? "Submit Application" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
