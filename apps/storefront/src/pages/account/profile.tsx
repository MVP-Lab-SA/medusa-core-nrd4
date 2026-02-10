/**
 * Account Profile Page
 * 
 * Allows customers to view and edit their profile information.
 * Uses real SDK integration for updating customer data.
 */

import { useState } from "react"
import { useParams } from "@tanstack/react-router"
import { User, Check, Camera } from "@medusajs/icons"
import { useCustomer } from "@/lib/context/customer-context"
import { sdk } from "@/lib/utils/sdk"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountCard,
  AccountCardHeader,
  AccountButton,
  AccountInput,
  AccountPageHeader,
  AccountAlert,
  AccountSkeleton,
} from "@/components/account/AccountUI"

export default function AccountProfilePage() {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }
  const { customer, refetch: refetchCustomer } = useCustomer()
  
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    company_name: "",
  })

  // Initialize form data when customer loads
  const initializeForm = () => {
    if (customer) {
      setFormData({
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        phone: customer.phone || "",
        company_name: customer.company_name || "",
      })
    }
  }

  const handleEdit = () => {
    initializeForm()
    setIsEditing(true)
    setSuccess(false)
    setError(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
  }

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await sdk.store.customer.update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone || undefined,
        company_name: formData.company_name || undefined,
      })
      
      await refetchCustomer()
      setIsEditing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err?.message || "Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  // Get initials for avatar
  const getInitials = () => {
    if (!customer) return "?"
    const first = customer.first_name?.[0] || ""
    const last = customer.last_name?.[0] || ""
    return (first + last).toUpperCase() || customer.email?.[0]?.toUpperCase() || "?"
  }

  if (!customer) {
    return (
      <AccountLayout currentPath={`/${countryCode}/account/profile`}>
        <AccountPageHeader title="Profile" description="Manage your personal information" />
        <AccountCard>
          <div className="space-y-4">
            <AccountSkeleton className="h-24 w-24 rounded-full mx-auto" />
            <AccountSkeleton className="h-6 w-1/2 mx-auto" />
            <AccountSkeleton className="h-4 w-1/3 mx-auto" />
          </div>
        </AccountCard>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/profile`}>
      <AccountPageHeader 
        title="Profile" 
        description="Manage your personal information"
        action={
          !isEditing ? (
            <AccountButton onClick={handleEdit}>Edit Profile</AccountButton>
          ) : null
        }
      />

      {success && (
        <div className="mb-6">
          <AccountAlert type="success">
            Your profile has been updated successfully.
          </AccountAlert>
        </div>
      )}

      {error && (
        <div className="mb-6">
          <AccountAlert type="error">{error}</AccountAlert>
        </div>
      )}

      <div className="space-y-6">
        {/* Avatar Section */}
        <AccountCard>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                {getInitials()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-gray-800 border border-gray-700 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {customer.first_name || customer.last_name 
                  ? `${customer.first_name || ""} ${customer.last_name || ""}`.trim()
                  : "Your Name"}
              </h2>
              <p className="text-gray-400">{customer.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(customer.created_at || Date.now()).toLocaleDateString("en-US", { 
                  month: "long", 
                  year: "numeric" 
                })}
              </p>
            </div>
          </div>
        </AccountCard>

        {/* Profile Information */}
        <AccountCard>
          <AccountCardHeader
            title="Personal Information"
            description="Update your personal details"
            icon={<User className="w-5 h-5" />}
          />

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <AccountInput
                  label="First Name"
                  value={formData.first_name}
                  onChange={handleChange("first_name")}
                  placeholder="Enter your first name"
                />
                <AccountInput
                  label="Last Name"
                  value={formData.last_name}
                  onChange={handleChange("last_name")}
                  placeholder="Enter your last name"
                />
              </div>
              
              <AccountInput
                label="Email"
                type="email"
                value={customer.email}
                disabled
                hint="Email cannot be changed"
              />
              
              <AccountInput
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange("phone")}
                placeholder="+1 (555) 000-0000"
              />
              
              <AccountInput
                label="Company"
                value={formData.company_name}
                onChange={handleChange("company_name")}
                placeholder="Your company name (optional)"
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <AccountButton variant="secondary" onClick={handleCancel} disabled={loading}>
                  Cancel
                </AccountButton>
                <AccountButton onClick={handleSave} loading={loading} icon={<Check className="w-4 h-4" />}>
                  Save Changes
                </AccountButton>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">First Name</p>
                  <p className="text-white">{customer.first_name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="text-white">{customer.last_name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-white">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-white">{customer.phone || "-"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Company</p>
                  <p className="text-white">{customer.company_name || "-"}</p>
                </div>
              </div>
            </div>
          )}
        </AccountCard>

        {/* Account Status */}
        <AccountCard>
          <AccountCardHeader
            title="Account Status"
            description="Your account verification and status"
          />
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Email Verified</p>
              <p className="text-emerald-400 font-medium flex items-center gap-2">
                <Check className="w-4 h-4" />
                Verified
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Account Type</p>
              <p className="text-white font-medium">Standard</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Account ID</p>
              <p className="text-white font-medium font-mono text-sm truncate" title={customer.id}>
                {customer.id.slice(0, 12)}...
              </p>
            </div>
          </div>
        </AccountCard>
      </div>
    </AccountLayout>
  )
}
