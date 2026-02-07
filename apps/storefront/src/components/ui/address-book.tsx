import { useState } from "react"
import { MapPin, Plus, PencilSquare, Trash, Check, Star } from "@medusajs/icons"
import { Button } from "./button"

interface Address {
  id: string
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
  type?: "shipping" | "billing" | "both"
}

interface AddressBookProps {
  addresses: Address[]
  onAdd: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
  selectable?: boolean
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
}

export function AddressBook({
  addresses,
  onAdd,
  onEdit,
  onDelete,
  onSetDefault,
  selectable = false,
  selectedId,
  onSelect,
  className = ""
}: AddressBookProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  if (addresses.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved addresses</h3>
        <p className="text-gray-500 mb-6">Add an address for faster checkout</p>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Saved Addresses</h3>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map(address => {
          const isSelected = selectable && selectedId === address.id

          return (
            <div
              key={address.id}
              onClick={() => selectable && onSelect?.(address.id)}
              className={`relative p-4 border rounded-xl ${
                isSelected
                  ? "border-cyan-500 bg-cyan-50"
                  : "border-gray-200 hover:border-gray-300"
              } ${selectable ? "cursor-pointer" : ""}`}
            >
              {/* Default Badge */}
              {address.isDefault && (
                <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs font-medium rounded">
                  <Star className="w-3 h-3" />
                  Default
                </span>
              )}

              {/* Selection Indicator */}
              {selectable && (
                <div className={`absolute top-4 left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-300"
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              )}

              <div className={selectable ? "ml-8" : ""}>
                <p className="font-medium text-gray-900">{address.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {address.line1}
                  {address.line2 && <>, {address.line2}</>}
                </p>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-sm text-gray-600">{address.country}</p>
                {address.phone && (
                  <p className="text-sm text-gray-500 mt-1">{address.phone}</p>
                )}

                {/* Actions */}
                {!selectable && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => onEdit(address.id)}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-cyan-600"
                    >
                      <PencilSquare className="w-4 h-4" />
                      Edit
                    </button>
                    {!address.isDefault && (
                      <>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => onSetDefault(address.id)}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-cyan-600"
                        >
                          <Star className="w-4 h-4" />
                          Set as Default
                        </button>
                      </>
                    )}
                    <span className="text-gray-300">|</span>
                    {deleteConfirm === address.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-red-600">Delete?</span>
                        <button
                          onClick={() => {
                            onDelete(address.id)
                            setDeleteConfirm(null)
                          }}
                          className="text-sm text-red-600 font-medium"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-sm text-gray-500"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(address.id)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
