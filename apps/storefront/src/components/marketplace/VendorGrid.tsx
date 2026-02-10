import type { Vendor } from "../../lib/mock/marketplace"
import { VendorCard } from "./VendorCard"

interface VendorGridProps {
  vendors: Vendor[]
  countryCode: string
}

export function VendorGrid({ vendors, countryCode }: VendorGridProps) {
  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No vendors found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} countryCode={countryCode} />
      ))}
    </div>
  )
}
