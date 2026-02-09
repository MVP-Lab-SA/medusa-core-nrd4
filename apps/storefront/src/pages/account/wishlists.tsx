import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Plus, Heart, Trash, PencilSquare, EllipsisHorizontal } from "@medusajs/icons"
import { useWishlists } from "@/lib/hooks/use-marketplace"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountModal,
  AccountInput,
} from "@/components/account/AccountUI"

interface WishlistsPageProps {
  countryCode: string
}

export function AccountWishlistsPage({ countryCode }: WishlistsPageProps) {
  const { data: wishlists, isLoading } = useWishlists()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newWishlistName, setNewWishlistName] = useState("")

  const handleCreateWishlist = () => {
    console.log("Create wishlist:", newWishlistName)
    setShowCreateModal(false)
    setNewWishlistName("")
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/wishlists`}>
      <AccountPageHeader
        title="My Wishlists"
        description="Save items you love for later"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Wishlists" },
        ]}
        action={
          <AccountButton onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Wishlist
          </AccountButton>
        }
      />

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          <AccountSkeleton height="h-64" />
          <AccountSkeleton height="h-64" />
          <AccountSkeleton height="h-64" />
        </div>
      ) : wishlists && wishlists.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {wishlists.map((wishlist) => (
            <AccountCard key={wishlist.id} className="overflow-hidden">
              {/* Wishlist preview images */}
              <div className="h-32 bg-gray-800 grid grid-cols-4 gap-0.5">
                {wishlist.items?.slice(0, 4).map((item, index) => (
                  <div key={index} className="bg-gray-900 flex items-center justify-center">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Heart className="w-6 h-6 text-gray-700" />
                    )}
                  </div>
                ))}
                {(!wishlist.items || wishlist.items.length < 4) && 
                  Array(4 - (wishlist.items?.length || 0)).fill(0).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-gray-900 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-gray-700" />
                    </div>
                  ))
                }
              </div>

              {/* Wishlist info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold">{wishlist.name}</h3>
                    <p className="text-sm text-gray-500">
                      {wishlist.items?.length || 0} items
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                      <PencilSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Link
                  to={`/${countryCode}/account/wishlists/${wishlist.id}`}
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 text-sm font-medium mt-2"
                >
                  View Wishlist
                </Link>
              </div>
            </AccountCard>
          ))}
        </div>
      ) : (
        <AccountEmptyState
          icon={<Heart className="w-12 h-12" />}
          title="No wishlists yet"
          description="Create a wishlist to save items you love for later"
          action={{
            label: "Create Wishlist",
            onClick: () => setShowCreateModal(true),
          }}
        />
      )}

      {/* Create Wishlist Modal */}
      <AccountModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Wishlist"
      >
        <div className="space-y-4">
          <AccountInput
            label="Wishlist Name"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            placeholder="My Favorites"
          />
          <div className="flex gap-3 justify-end">
            <AccountButton variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </AccountButton>
            <AccountButton onClick={handleCreateWishlist} disabled={!newWishlistName.trim()}>
              Create
            </AccountButton>
          </div>
        </div>
      </AccountModal>
    </AccountLayout>
  )
}
