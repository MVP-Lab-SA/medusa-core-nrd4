/**
 * Account Addresses Page
 * 
 * Allows customers to manage their saved addresses.
 * Full CRUD operations with real SDK integration.
 */

import { useState } from "react"
import { useParams } from "@tanstack/react-router"
import { MapPin, Plus, PencilSquare, Trash, Check, BuildingStorefront, House } from "@medusajs/icons"
import { useCustomer } from "@/lib/context/customer-context"
import { sdk } from "@/lib/utils/sdk"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountCard,
  AccountCardHeader,
  AccountButton,
  AccountInput,
  AccountSelect,
  AccountPageHeader,
  AccountAlert,
  AccountModal,
  AccountEmptyState,
  AccountBadge,
} from "@/components/account/AccountUI"

interface AddressFormData {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  province: string
  postal_code: string
  country_code: string
  phone: string
  is_default_shipping: boolean
  is_default_billing: boolean
}

const emptyAddress: AddressFormData = {
  first_name: "",
  last_name: "",
  company: "",
  address_1: "",
  address_2: "",
  city: "",
  province: "",
  postal_code: "",
  country_code: "us",
  phone: "",
  is_default_shipping: false,
  is_default_billing: false,
}

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "au", label: "Australia" },
  { value: "nl", label: "Netherlands" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "jp", label: "Japan" },
]

export default function AccountAddressesPage() {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }
  const { customer, refetch: refetchCustomer } = useCustomer()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [formData, setFormData] = useState<AddressFormData>(emptyAddress)
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const addresses = customer?.addresses || []

  const openAddModal = () => {
    setFormData(emptyAddress)
    setEditingAddressId(null)
    setIsModalOpen(true)
    setError(null)
  }

  const openEditModal = (address: any) => {
    setFormData({
      first_name: address.first_name || "",
      last_name: address.last_name || "",
      company: address.company || "",
      address_1: address.address_1 || "",
      address_2: address.address_2 || "",
      city: address.city || "",
      province: address.province || "",
      postal_code: address.postal_code || "",
      country_code: address.country_code || "us",
      phone: address.phone || "",
      is_default_shipping: address.is_default_shipping || false,
      is_default_billing: address.is_default_billing || false,
    })
    setEditingAddressId(address.id)
    setIsModalOpen(true)
    setError(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingAddressId(null)
    setFormData(emptyAddress)
    setError(null)
  }

  const handleSave = async () => {
    // Validation
    if (!formData.first_name || !formData.last_name || !formData.address_1 || !formData.city || !formData.postal_code) {
      setError("Please fill in all required fields.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (editingAddressId) {
        // Update existing address
        await sdk.store.customer.updateAddress(editingAddressId, {
          first_name: formData.first_name,
          last_name: formData.last_name,
          company: formData.company || undefined,
          address_1: formData.address_1,
          address_2: formData.address_2 || undefined,
          city: formData.city,
          province: formData.province || undefined,
          postal_code: formData.postal_code,
          country_code: formData.country_code,
          phone: formData.phone || undefined,
          is_default_shipping: formData.is_default_shipping,
          is_default_billing: formData.is_default_billing,
        })
        setSuccess("Address updated successfully.")
      } else {
        // Create new address
        await sdk.store.customer.createAddress({
          first_name: formData.first_name,
          last_name: formData.last_name,
          company: formData.company || undefined,
          address_1: formData.address_1,
          address_2: formData.address_2 || undefined,
          city: formData.city,
          province: formData.province || undefined,
          postal_code: formData.postal_code,
          country_code: formData.country_code,
          phone: formData.phone || undefined,
          is_default_shipping: formData.is_default_shipping,
          is_default_billing: formData.is_default_billing,
        })
        setSuccess("Address added successfully.")
      }

      await refetchCustomer()
      closeModal()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err?.message || "Failed to save address. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (addressId: string) => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return
    }

    setDeleteLoading(addressId)
    setError(null)

    try {
      await sdk.store.customer.deleteAddress(addressId)
      await refetchCustomer()
      setSuccess("Address deleted successfully.")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err?.message || "Failed to delete address. Please try again.")
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleChange = (field: keyof AddressFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getCountryName = (code: string) => {
    return countries.find((c) => c.value === code)?.label || code.toUpperCase()
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/addresses`}>
      <AccountPageHeader 
        title="Addresses" 
        description="Manage your shipping and billing addresses"
        action={
          <AccountButton onClick={openAddModal} icon={<Plus className="w-4 h-4" />}>
            Add Address
          </AccountButton>
        }
      />

      {success && (
        <div className="mb-6">
          <AccountAlert type="success">{success}</AccountAlert>
        </div>
      )}

      {error && !isModalOpen && (
        <div className="mb-6">
          <AccountAlert type="error">{error}</AccountAlert>
        </div>
      )}

      {addresses.length === 0 ? (
        <AccountCard>
          <AccountEmptyState
            icon={<MapPin className="w-8 h-8" />}
            title="No addresses saved"
            description="Add your first address to make checkout faster and easier."
            action={
              <AccountButton onClick={openAddModal} icon={<Plus className="w-4 h-4" />}>
                Add Address
              </AccountButton>
            }
          />
        </AccountCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address: any) => (
            <AccountCard key={address.id} className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                    {address.company ? (
                      <BuildingStorefront className="w-5 h-5" />
                    ) : (
                      <House className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {address.first_name} {address.last_name}
                    </p>
                    {address.company && (
                      <p className="text-sm text-gray-400">{address.company}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(address)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title="Edit address"
                  >
                    <PencilSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    disabled={deleteLoading === address.id}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete address"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-300 space-y-1">
                <p>{address.address_1}</p>
                {address.address_2 && <p>{address.address_2}</p>}
                <p>
                  {address.city}{address.province ? `, ${address.province}` : ""} {address.postal_code}
                </p>
                <p>{getCountryName(address.country_code)}</p>
                {address.phone && <p className="text-gray-400">{address.phone}</p>}
              </div>

              {(address.is_default_shipping || address.is_default_billing) && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                  {address.is_default_shipping && (
                    <AccountBadge variant="accent">Default Shipping</AccountBadge>
                  )}
                  {address.is_default_billing && (
                    <AccountBadge variant="success">Default Billing</AccountBadge>
                  )}
                </div>
              )}
            </AccountCard>
          ))}
        </div>
      )}

      {/* Add/Edit Address Modal */}
      <AccountModal
        open={isModalOpen}
        onClose={closeModal}
        title={editingAddressId ? "Edit Address" : "Add New Address"}
        size="lg"
        footer={
          <>
            <AccountButton variant="secondary" onClick={closeModal} disabled={loading}>
              Cancel
            </AccountButton>
            <AccountButton onClick={handleSave} loading={loading} icon={<Check className="w-4 h-4" />}>
              {editingAddressId ? "Save Changes" : "Add Address"}
            </AccountButton>
          </>
        }
      >
        {error && (
          <div className="mb-4">
            <AccountAlert type="error">{error}</AccountAlert>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <AccountInput
              label="First Name *"
              value={formData.first_name}
              onChange={handleChange("first_name")}
              placeholder="John"
            />
            <AccountInput
              label="Last Name *"
              value={formData.last_name}
              onChange={handleChange("last_name")}
              placeholder="Doe"
            />
          </div>

          <AccountInput
            label="Company"
            value={formData.company}
            onChange={handleChange("company")}
            placeholder="Company name (optional)"
          />

          <AccountInput
            label="Address Line 1 *"
            value={formData.address_1}
            onChange={handleChange("address_1")}
            placeholder="123 Main Street"
          />

          <AccountInput
            label="Address Line 2"
            value={formData.address_2}
            onChange={handleChange("address_2")}
            placeholder="Apt, suite, unit, etc. (optional)"
          />

          <div className="grid grid-cols-2 gap-4">
            <AccountInput
              label="City *"
              value={formData.city}
              onChange={handleChange("city")}
              placeholder="New York"
            />
            <AccountInput
              label="State / Province"
              value={formData.province}
              onChange={handleChange("province")}
              placeholder="NY"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AccountInput
              label="Postal Code *"
              value={formData.postal_code}
              onChange={handleChange("postal_code")}
              placeholder="10001"
            />
            <AccountSelect
              label="Country *"
              value={formData.country_code}
              onChange={handleChange("country_code")}
              options={countries}
            />
          </div>

          <AccountInput
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange("phone")}
            placeholder="+1 (555) 000-0000"
          />

          <div className="pt-4 border-t border-gray-800 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_default_shipping}
                onChange={handleChange("is_default_shipping")}
                className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
              />
              <span className="text-sm text-gray-300">Set as default shipping address</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_default_billing}
                onChange={handleChange("is_default_billing")}
                className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
              />
              <span className="text-sm text-gray-300">Set as default billing address</span>
            </label>
          </div>
        </div>
      </AccountModal>
    </AccountLayout>
  )
}
