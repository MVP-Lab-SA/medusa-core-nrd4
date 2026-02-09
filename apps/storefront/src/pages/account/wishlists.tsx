import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { href } from "@/lib/utils/link"
import { Plus, Heart, Trash, PencilSquare, XMark, ShoppingBag } from "@medusajs/icons"
import { useWishlist, Wishlist, WishlistItem } from "@/components/wishlist"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountButton,
  AccountEmptyState,
  AccountModal,
  AccountInput,
  AccountBadge,
} from "@/components/account/AccountUI"
import { formatPrice } from "@/lib/utils/price"

interface WishlistsPageProps {
  countryCode: string
}

export function AccountWishlistsPage({ countryCode }: WishlistsPageProps) {
  const { 
    wishlists, 
    createWishlist, 
    deleteWishlist, 
    renameWishlist,
    removeItem,
    totalItemCount 
  } = useWishlist()
  
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null)
  const [newWishlistName, setNewWishlistName] = useState("")
  const [expandedWishlist, setExpandedWishlist] = useState<string | null>(null)

  const handleCreateWishlist = () => {
    if (newWishlistName.trim()) {
      createWishlist(newWishlistName.trim())
      setShowCreateModal(false)
      setNewWishlistName("")
    }
  }

  const handleRenameWishlist = () => {
    if (selectedWishlist && newWishlistName.trim()) {
      renameWishlist(selectedWishlist.id, newWishlistName.trim())
      setShowRenameModal(false)
      setSelectedWishlist(null)
      setNewWishlistName("")
    }
  }

  const handleDeleteWishlist = () => {
    if (selectedWishlist) {
      deleteWishlist(selectedWishlist.id)
      setShowDeleteModal(false)
      setSelectedWishlist(null)
    }
  }

  const openRenameModal = (wishlist: Wishlist) => {
    setSelectedWishlist(wishlist)
    setNewWishlistName(wishlist.name)
    setShowRenameModal(true)
  }

  const openDeleteModal = (wishlist: Wishlist) => {
    setSelectedWishlist(wishlist)
    setShowDeleteModal(true)
  }

  const toggleExpanded = (wishlistId: string) => {
    setExpandedWishlist(expandedWishlist === wishlistId ? null : wishlistId)
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/wishlists`}>
      <AccountPageHeader
        title="My Wishlists"
        description={`${totalItemCount} items saved across ${wishlists.length} ${wishlists.length === 1 ? 'list' : 'lists'}`}
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

      {wishlists.length === 0 ? (
        <AccountEmptyState
          icon={<Heart className="w-12 h-12" />}
          title="No wishlists yet"
          description="Create a wishlist to save items you love for later"
          action={{
            label: "Create Wishlist",
            onClick: () => setShowCreateModal(true),
          }}
        />
      ) : (
        <div className="space-y-6">
          {wishlists.map((wishlist) => (
            <AccountCard key={wishlist.id} className="overflow-hidden">
              {/* Wishlist Header */}
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800/50 transition-colors"
                onClick={() => toggleExpanded(wishlist.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Preview thumbnails */}
                  <div className="w-16 h-16 bg-gray-800 grid grid-cols-2 gap-0.5 rounded overflow-hidden flex-shrink-0">
                    {wishlist.items.slice(0, 4).map((item, index) => (
                      <div key={index} className="bg-gray-900 flex items-center justify-center">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Heart className="w-3 h-3 text-gray-700" />
                        )}
                      </div>
                    ))}
                    {wishlist.items.length < 4 && 
                      Array(4 - wishlist.items.length).fill(0).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-gray-900 flex items-center justify-center">
                          <Heart className="w-3 h-3 text-gray-700" />
                        </div>
                      ))
                    }
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold">{wishlist.name}</h3>
                      {wishlist.id === "default" && (
                        <AccountBadge variant="info">Default</AccountBadge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {wishlist.items.length} {wishlist.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); openRenameModal(wishlist); }}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title="Rename"
                  >
                    <PencilSquare className="w-4 h-4" />
                  </button>
                  {wishlists.length > 1 && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); openDeleteModal(wishlist); }}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                  <div className={`transform transition-transform ${expandedWishlist === wishlist.id ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded Items List */}
              {expandedWishlist === wishlist.id && (
                <div className="border-t border-gray-800">
                  {wishlist.items.length === 0 ? (
                    <div className="p-8 text-center">
                      <Heart className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">This wishlist is empty</p>
                      <Link 
                        to={href(`/${countryCode}/store`)}
                        className="text-cyan-400 hover:text-cyan-300 text-sm mt-2 inline-block"
                      >
                        Browse products
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-800">
                      {wishlist.items.map((item) => (
                        <WishlistItemRow 
                          key={item.id} 
                          item={item} 
                          countryCode={countryCode}
                          onRemove={() => removeItem(item.id, wishlist.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </AccountCard>
          ))}
        </div>
      )}

      {/* Create Wishlist Modal */}
      <AccountModal
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setNewWishlistName(""); }}
        title="Create Wishlist"
      >
        <div className="space-y-4">
          <AccountInput
            label="Wishlist Name"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            placeholder="My Favorites"
            autoFocus
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

      {/* Rename Wishlist Modal */}
      <AccountModal
        isOpen={showRenameModal}
        onClose={() => { setShowRenameModal(false); setSelectedWishlist(null); setNewWishlistName(""); }}
        title="Rename Wishlist"
      >
        <div className="space-y-4">
          <AccountInput
            label="New Name"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            placeholder="Enter new name"
            autoFocus
          />
          <div className="flex gap-3 justify-end">
            <AccountButton variant="secondary" onClick={() => setShowRenameModal(false)}>
              Cancel
            </AccountButton>
            <AccountButton onClick={handleRenameWishlist} disabled={!newWishlistName.trim()}>
              Save
            </AccountButton>
          </div>
        </div>
      </AccountModal>

      {/* Delete Wishlist Modal */}
      <AccountModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setSelectedWishlist(null); }}
        title="Delete Wishlist"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete "{selectedWishlist?.name}"? 
            {selectedWishlist && selectedWishlist.items.length > 0 && (
              <span className="text-gray-500 block mt-1">
                This will remove {selectedWishlist.items.length} {selectedWishlist.items.length === 1 ? 'item' : 'items'}.
              </span>
            )}
          </p>
          <div className="flex gap-3 justify-end">
            <AccountButton variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </AccountButton>
            <AccountButton variant="danger" onClick={handleDeleteWishlist}>
              Delete
            </AccountButton>
          </div>
        </div>
      </AccountModal>
    </AccountLayout>
  )
}

// Individual wishlist item row
function WishlistItemRow({ 
  item, 
  countryCode, 
  onRemove 
}: { 
  item: WishlistItem; 
  countryCode: string;
  onRemove: () => void;
}) {
  return (
    <div className="p-4 flex items-center gap-4 hover:bg-gray-800/30 transition-colors">
      {/* Thumbnail */}
      <Link
        to={href(`/${countryCode}/products/${item.handle}`)}
        className="w-16 h-16 bg-gray-900 flex-shrink-0 rounded overflow-hidden"
      >
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          to={href(`/${countryCode}/products/${item.handle}`)}
          className="text-white font-medium hover:text-cyan-400 transition-colors block truncate"
        >
          {item.title}
        </Link>
        {item.price && (
          <p className="text-cyan-400 text-sm mt-1">
            {formatPrice({
              amount: item.price.amount,
              currency_code: item.price.currency_code,
            })}
          </p>
        )}
        {item.addedAt && (
          <p className="text-gray-600 text-xs mt-1">
            Added {new Date(item.addedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          to={href(`/${countryCode}/products/${item.handle}`)}
          className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-sm font-medium rounded transition-colors"
        >
          View
        </Link>
        <button
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"
          title="Remove from wishlist"
        >
          <XMark className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
