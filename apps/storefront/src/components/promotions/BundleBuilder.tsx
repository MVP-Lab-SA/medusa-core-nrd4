import { useState } from "react"
import { Plus, Minus, Check, ShoppingCart } from "@medusajs/icons"

interface BundleItem {
  id: string
  productId: string
  productName: string
  productImage: string
  originalPrice: number
  bundlePrice: number
  required: boolean
  selected: boolean
}

interface BundleBuilderProps {
  bundleName: string
  items: BundleItem[]
  totalOriginalPrice: number
  totalBundlePrice: number
  savings: number
  onToggleItem: (itemId: string) => void
  onAddToCart: () => void
}

export function BundleBuilder({ 
  bundleName,
  items, 
  totalOriginalPrice,
  totalBundlePrice,
  savings,
  onToggleItem,
  onAddToCart 
}: BundleBuilderProps) {
  const selectedItems = items.filter(item => item.selected || item.required)
  const canAddToCart = selectedItems.length >= 2

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <h2 className="text-xl font-bold text-gray-900">{bundleName}</h2>
        <p className="text-sm text-gray-600 mt-1">Select items to build your bundle and save!</p>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`p-4 flex items-center gap-4 ${
              item.selected || item.required ? 'bg-green-50' : ''
            }`}
          >
            <button
              onClick={() => !item.required && onToggleItem(item.id)}
              disabled={item.required}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                item.selected || item.required
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-gray-400'
              } ${item.required ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {(item.selected || item.required) && <Check className="w-4 h-4" />}
            </button>

            <img 
              src={item.productImage} 
              alt={item.productName}
              className="w-16 h-16 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.productName}</h3>
              {item.required && (
                <span className="text-xs text-green-600">Required item</span>
              )}
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</p>
              <p className="font-semibold text-gray-900">${item.bundlePrice.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Original Price</span>
          <span className="text-gray-400 line-through">${totalOriginalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Bundle Price</span>
          <span className="font-medium text-gray-900">${totalBundlePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
          <span className="text-green-600 font-medium">You Save</span>
          <span className="text-green-600 font-bold">${savings.toFixed(2)} ({Math.round((savings / totalOriginalPrice) * 100)}%)</span>
        </div>

        <button
          onClick={onAddToCart}
          disabled={!canAddToCart}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5" />
          Add Bundle to Cart
        </button>

        {!canAddToCart && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Select at least 2 items to create a bundle
          </p>
        )}
      </div>
    </div>
  )
}
