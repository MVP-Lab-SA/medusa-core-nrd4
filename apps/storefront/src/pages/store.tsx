import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/lib/hooks/use-products"
import { useLoaderData } from "@tanstack/react-router"

const Store = () => {
  const { region } = useLoaderData({ from: "/$countryCode/store" })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useProducts({
    region_id: region?.id,
    query_params: { limit: 12 },
  })

  const products = data?.pages.flatMap((page) => page.products) || []

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

      <div className="content-container py-12">
        {isFetching && products.length === 0 ? (
          <div className="text-city-muted flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-city-cyan/30 border-t-city-cyan rounded-full animate-spin" />
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-city-muted text-lg">No products found</p>
            <p className="text-city-muted/60 mt-2">Check back soon for new arrivals</p>
          </div>
        ) : (
          <>
            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

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
  )
}

export default Store
