import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "@medusajs/icons"
import { useWishlists } from "../../../lib/hooks/use-marketplace"
import { WishlistCard } from "../../../components/wishlists/WishlistCard"

export const Route = createFileRoute("/$countryCode/account/wishlists")({
  component: WishlistsPage,
})

function WishlistsPage() {
  const { countryCode } = Route.useParams()
  const { data: wishlists, isLoading } = useWishlists()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlists</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Create Wishlist
          </button>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : wishlists && wishlists.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map((wishlist) => (
              <WishlistCard
                key={wishlist.id}
                wishlist={wishlist}
                countryCode={countryCode}
                onEdit={(id) => console.log("Edit:", id)}
                onDelete={(id) => console.log("Delete:", id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">You haven't created any wishlists yet</p>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
              Create Your First Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
