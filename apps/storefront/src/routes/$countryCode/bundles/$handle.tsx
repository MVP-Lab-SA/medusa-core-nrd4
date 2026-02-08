import { createFileRoute } from "@tanstack/react-router"
import { BundleCard } from "~/components/promotions"
import { Package, Check, ArrowLeft, ShoppingCart, Tag, Star } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/bundles/$handle")({
  component: BundleDetailPage,
})

function BundleDetailPage() {
  const { handle } = Route.useParams()
  const [quantity, setQuantity] = useState(1)

  // Mock bundle data
  const bundle = {
    handle,
    name: "Summer Essentials Bundle",
    description: "Everything you need for the perfect summer. This curated bundle includes our best-selling items at an unbeatable price.",
    originalPrice: 180,
    bundlePrice: 129,
    savings: 51,
    savingsPercent: 28,
    items: [
      { name: "Classic Cotton T-Shirt", price: 35, image: "/product1.jpg" },
      { name: "Lightweight Shorts", price: 45, image: "/product2.jpg" },
      { name: "Summer Sandals", price: 55, image: "/product3.jpg" },
      { name: "Beach Towel", price: 25, image: "/product4.jpg" },
      { name: "Sunscreen SPF 50", price: 20, image: "/product5.jpg" },
    ],
    features: [
      "Hand-picked by our style experts",
      "Perfect for beach or poolside",
      "Mix and match versatility",
      "Premium quality materials",
    ],
    rating: 4.8,
    reviewCount: 234,
    stock: 15,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <a href="/bundles" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Bundles
      </a>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 relative">
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
              Save {bundle.savingsPercent}%
            </div>
            <Package className="w-32 h-32 text-white/50" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {bundle.items.map((item, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{bundle.rating}</span>
            </div>
            <span className="text-gray-500">({bundle.reviewCount} reviews)</span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{bundle.name}</h1>
          <p className="text-gray-600 mb-6">{bundle.description}</p>

          {/* Pricing */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-bold text-green-600">${bundle.bundlePrice}</span>
              <span className="text-xl text-gray-400 line-through">${bundle.originalPrice}</span>
            </div>
            <p className="text-green-700">
              <Tag className="w-4 h-4 inline mr-1" />
              You save ${bundle.savings} ({bundle.savingsPercent}% off)
            </p>
          </div>

          {/* Bundle Items */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">What's Included ({bundle.items.length} items)</h2>
            <div className="space-y-3">
              {bundle.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-gray-500">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Why This Bundle?</h2>
            <div className="space-y-2">
              {bundle.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500">{bundle.stock} bundles in stock</p>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 text-lg font-semibold">
            <ShoppingCart className="w-5 h-5" />
            Add Bundle to Cart - ${(bundle.bundlePrice * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}
