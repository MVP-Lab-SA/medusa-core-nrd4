import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "@medusajs/icons"
import { useWishlists } from "../../../lib/hooks/use-marketplace"
import { WishlistCard } from "../../../components/wishlists/WishlistCard"
import { AccountLayout } from "../../../components/account/AccountSidebar"

export const Route = createFileRoute("/$countryCode/account/wishlists")({
  component: WishlistsPage,
})

function WishlistsPage() {
  const { countryCode } = Route.useParams()
  const { data: wishlists, isLoading } = useWishlists()

  return (
    <AccountLayout currentPath={`/${countryCode}/account/wishlists`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">My Wishlists</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400">
          <Plus className="w-4 h-4" />
          Create Wishlist
        </button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : wishlists && wishlists.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
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
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <p className="text-gray-400 mb-4">You haven't created any wishlists yet</p>
          <button className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400">
            Create Your First Wishlist
          </button>
        </div>
      )}
    </AccountLayout>
  )
}
