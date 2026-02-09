import { useVendors } from "@/lib/hooks/use-marketplace"
import { VendorCard } from "@/components/ui/vendor-card"
import { MagnifyingGlass } from "@medusajs/icons"
import { useState } from "react"

interface VendorsPageProps {
  countryCode: string
}

export default function VendorsPage({ countryCode }: VendorsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  const { data: vendors, isLoading } = useVendors({ category: selectedCategory })

  const categories = ["Clothing", "Accessories", "Electronics", "Home", "Decor", "Kitchen"]

  const filteredVendors = vendors?.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Marketplace Vendors</h1>
          <p className="text-cyan-100 text-center mt-2 text-lg">
            Discover trusted sellers and unique products
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              !selectedCategory
                ? "bg-cyan-500 text-black"
                : "bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800"
            }`}
          >
            All Vendors
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-lg border border-gray-800 h-72 animate-pulse"
              />
            ))}
          </div>
        ) : filteredVendors && filteredVendors.length > 0 ? (
          <>
            <p className="text-gray-400 mb-4">
              {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} countryCode={countryCode} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400">No vendors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
