import { createFileRoute } from "@tanstack/react-router"
import { useVendor, useVendorProducts } from "~/lib/hooks/use-marketplace"
import { VendorHeader } from "~/components/marketplace/VendorHeader"
import { VendorProducts } from "~/components/marketplace/VendorProducts"

export const Route = createFileRoute("/$countryCode/vendors/$handle/products")({
  component: VendorProductsPage,
})

function VendorProductsPage() {
  const { handle } = Route.useParams()
  const { data: vendor, isLoading: vendorLoading } = useVendor(handle)
  const { data: products, isLoading: productsLoading } = useVendorProducts(handle)

  if (vendorLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-48 bg-gray-800 rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-800 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-white">Vendor not found</h1>
          <p className="mt-2 text-gray-400">The vendor you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <VendorHeader vendor={vendor} activeTab="products" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            All Products ({products?.length || 0})
          </h2>
          
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Selling</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 sticky top-4">
              <h3 className="font-semibold text-white mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded text-sm"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Availability</h4>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded bg-gray-800 border-gray-700" />
                    <span className="text-sm text-gray-400">In Stock</span>
                  </label>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded bg-gray-800 border-gray-700" />
                        <span className="text-sm text-gray-400">{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg text-sm font-medium hover:bg-cyan-400">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <VendorProducts products={products || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
