import { useState } from "react"
import { Link as LinkIcon, Check, Users, XMark } from "@medusajs/icons"
import { Button } from "./button"

interface ShareWishlistProps {
  wishlistId: string
  wishlistName: string
  itemCount: number
  shareLink: string
  isPublic: boolean
  onTogglePublic: (isPublic: boolean) => void
  className?: string
}

export function ShareWishlist({
  wishlistId,
  wishlistName,
  itemCount,
  shareLink,
  isPublic,
  onTogglePublic,
  className = ""
}: ShareWishlistProps) {
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Button variant="outline" onClick={() => setShowModal(true)} className={className}>
        <Users className="w-4 h-4 mr-2" />
        Share Wishlist
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <XMark className="w-5 h-5 text-gray-500" />
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Share "{wishlistName}"</h3>
            <p className="text-gray-600 mb-6">{itemCount} items in this wishlist</p>

            {/* Privacy Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
              <div>
                <p className="font-medium text-gray-900">Make wishlist public</p>
                <p className="text-sm text-gray-500">Anyone with the link can view</p>
              </div>
              <button
                onClick={() => onTogglePublic(!isPublic)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isPublic ? "bg-cyan-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isPublic ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            {isPublic && (
              <>
                {/* Share Link */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Share link</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                    />
                    <Button onClick={handleCopy}>
                      {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5 text-[#4267B2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
