import { useState } from "react"
import { GiftSolid, Check } from "@medusajs/icons"

interface GiftOptionsProps {
  giftWrapPrice?: number
  onGiftOptionsChange: (options: {
    isGift: boolean
    giftWrap: boolean
    giftMessage: string
    hidePrice: boolean
  }) => void
  currency?: string
  className?: string
}

export function GiftOptions({
  giftWrapPrice = 5,
  onGiftOptionsChange,
  currency = "USD",
  className = ""
}: GiftOptionsProps) {
  const [isGift, setIsGift] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)
  const [giftMessage, setGiftMessage] = useState("")
  const [hidePrice, setHidePrice] = useState(true)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const handleChange = (updates: Partial<{
    isGift: boolean
    giftWrap: boolean
    giftMessage: string
    hidePrice: boolean
  }>) => {
    const newIsGift = updates.isGift ?? isGift
    const newGiftWrap = updates.giftWrap ?? giftWrap
    const newGiftMessage = updates.giftMessage ?? giftMessage
    const newHidePrice = updates.hidePrice ?? hidePrice

    if (updates.isGift !== undefined) setIsGift(updates.isGift)
    if (updates.giftWrap !== undefined) setGiftWrap(updates.giftWrap)
    if (updates.giftMessage !== undefined) setGiftMessage(updates.giftMessage)
    if (updates.hidePrice !== undefined) setHidePrice(updates.hidePrice)

    onGiftOptionsChange({
      isGift: newIsGift,
      giftWrap: newGiftWrap,
      giftMessage: newGiftMessage,
      hidePrice: newHidePrice
    })
  }

  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      {/* Toggle */}
      <button
        onClick={() => handleChange({ isGift: !isGift })}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isGift ? "bg-pink-100" : "bg-gray-100"}`}>
            <GiftSolid className={`w-5 h-5 ${isGift ? "text-pink-500" : "text-gray-400"}`} />
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900">This is a gift</p>
            <p className="text-sm text-gray-500">Add gift wrap and a personal message</p>
          </div>
        </div>
        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${isGift ? "bg-cyan-500 border-cyan-500" : "border-gray-300"}`}>
          {isGift && <Check className="w-4 h-4 text-white" />}
        </div>
      </button>

      {/* Gift Options */}
      {isGift && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* Gift Wrap */}
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => handleChange({ giftWrap: e.target.checked })}
                className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
              />
              <div>
                <p className="font-medium text-gray-900">Add gift wrap</p>
                <p className="text-sm text-gray-500">Beautifully wrapped with a ribbon</p>
              </div>
            </div>
            <span className="font-medium text-gray-900">+{formatPrice(giftWrapPrice)}</span>
          </label>

          {/* Hide Price */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hidePrice}
              onChange={(e) => handleChange({ hidePrice: e.target.checked })}
              className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Hide prices on packing slip</p>
              <p className="text-xs text-gray-500">Price won't be shown on the receipt</p>
            </div>
          </label>

          {/* Gift Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gift message (optional)
            </label>
            <textarea
              value={giftMessage}
              onChange={(e) => handleChange({ giftMessage: e.target.value })}
              placeholder="Write a personal message for the recipient..."
              rows={3}
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {giftMessage.length}/200 characters
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
