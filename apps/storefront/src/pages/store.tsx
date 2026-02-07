import { useState } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/lib/hooks/use-products"
import { useLoaderData, Link } from "@tanstack/react-router"
import { XMark, Eye, AdjustmentsDone } from "@medusajs/icons"

// Inline SVG icons
const GridIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
)

const ListIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
)

const Store = () => {
  const { region } = useLoaderData({ from: "/$countryCode/store" })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useProducts({
    region_id: region?.id,
    query_params: { limit: 12 },
  })

  const products = data?.pages.flatMap((page) => page.products) || []

  // Demo categories for filter
  const categories = [
    { id: "sensors", name: "Sensors", count: 24 },
    { id: "controllers", name: "Controllers", count: 12 },
    { id: "lighting", name: "Smart Lighting", count: 8 },
    { id: "security", name: "Security", count: 15 },
  ]

  return (
    <div className="min-h-screen bg-city-dark">
      {/* Header section */}
      <div className="border-b border-city-steel/30 bg-city-navy/50">
        <div className="content-container py-12">
          <span className="text-city-cyan text-sm font-semibold uppercase tracking-widest mb-2 block">
            Catalog
          </span>
          <h1 className="text-4xl font-bold text-city-white">All Products</h1>
          <p className="text-city-gray mt-3 text-lg">
            Smart city infrastructure and IoT solutions
          </p>
        </div>
      </div>

      <div className="content-container py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters ? "bg-cyan-500 text-black" : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
            >
              <AdjustmentsDone className="w-5 h-5" />
              Filters
              {selectedCategories.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-black/20 rounded text-xs">
                  {selectedCategories.length}
                </span>
              )}
            </button>

            {/* Results count */}
            <span className="text-gray-400 text-sm">
              {products.length} products
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-700 text-cyan-400" : "text-gray-400 hover:text-white"}`}
              >
                <GridIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-gray-700 text-cyan-400" : "text-gray-400 hover:text-white"}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Compare Link */}
            <Link
              to="/us/compare"
              className="px-4 py-2 border border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-lg transition-colors text-sm"
            >
              Compare
            </Link>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Filters</h3>
                  <button
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange([0, 1000])
                    }}
                    className="text-cyan-400 text-sm hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Price Range Slider */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-4">Price Range</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-cyan-500"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">${priceRange[0]}</span>
                      <span className="text-cyan-400 font-medium">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-4">Categories</h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedCategories.includes(category.id)
                            ? "bg-cyan-500 border-cyan-500"
                            : "border-gray-600 group-hover:border-gray-500"
                        }`}>
                          {selectedCategories.includes(category.id) && (
                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, category.id])
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== category.id))
                            }
                          }}
                          className="sr-only"
                        />
                        <span className="text-gray-300 group-hover:text-white">{category.name}</span>
                        <span className="text-gray-500 text-xs ml-auto">({category.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* In Stock Filter */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-5 bg-gray-700 rounded-full relative">
                      <div className="w-4 h-4 bg-cyan-500 rounded-full absolute left-0.5 top-0.5" />
                    </div>
                    <span className="text-gray-300">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            {isFetching && products.length === 0 ? (
              <div className="text-city-muted flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-city-cyan/30 border-t-city-cyan rounded-full animate-spin" />
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-city-muted text-lg">No products found</p>
                <p className="text-city-muted/60 mt-2">Check back soon for new arrivals</p>
              </div>
            ) : (
              <>
                {/* Product grid or list */}
                {viewMode === "grid" ? (
                  <div className={`grid gap-6 ${showFilters ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
                    {products.map((product) => (
                      <div key={product.id} className="group relative">
                        <ProductCard product={product} />
                        {/* Quick View Button */}
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex gap-6 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                        <img
                          src={product.thumbnail || ""}
                          alt={product.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg hover:text-cyan-400 transition-colors">
                            <Link to={`/us/products/${product.handle}`}>{product.title}</Link>
                          </h3>
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-cyan-400 font-bold text-xl">
                              ${((product.variants?.[0]?.calculated_price?.calculated_amount || 0) / 100).toFixed(2)}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setQuickViewProduct(product)}
                                className="px-4 py-2 border border-gray-700 hover:border-cyan-500 rounded-lg transition-colors"
                              >
                                Quick View
                              </button>
                              <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Load more */}
                {hasNextPage && (
                  <div className="flex justify-center mt-12">
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      variant="secondary"
                      size="fit"
                      className="px-8"
                    >
                      {isFetchingNextPage ? "Loading..." : "Load More Products"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setQuickViewProduct(null)}
          />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <XMark className="w-6 h-6" />
            </button>
            
            <div className="grid md:grid-cols-2 gap-8">
              <img
                src={quickViewProduct.thumbnail || ""}
                alt={quickViewProduct.title}
                className="w-full aspect-square object-cover rounded-xl"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{quickViewProduct.title}</h2>
                <p className="text-cyan-400 text-2xl font-bold mb-4">
                  ${((quickViewProduct.variants?.[0]?.calculated_price?.calculated_amount || 0) / 100).toFixed(2)}
                </p>
                <p className="text-gray-400 mb-6">{quickViewProduct.description}</p>
                
                {/* Quick Options */}
                {quickViewProduct.options?.map((option: any) => (
                  <div key={option.id} className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">{option.title}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values?.map((value: any) => (
                        <button
                          key={value.id}
                          className="px-4 py-2 border border-gray-700 hover:border-cyan-500 rounded-lg transition-colors"
                        >
                          {value.value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                    Add to Cart
                  </button>
                  <Link
                    to={`/us/products/${quickViewProduct.handle}`}
                    className="px-6 py-3 border border-gray-700 hover:border-cyan-500 rounded-lg transition-colors"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Store
