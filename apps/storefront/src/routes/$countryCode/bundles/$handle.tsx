import { createFileRoute, Link } from "@tanstack/react-router"
import { ShoppingBag, Check, ArrowLeft, ShoppingCart, Tag } from "@medusajs/icons"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/bundles/$handle")({
  component: BundleDetailPage,
})

function BundleDetailPage() {
  const { handle, countryCode } = Route.useParams()
  const [quantity, setQuantity] = useState(1)

  // Mock bundle data based on handle
  const bundleData: Record<string, any> = {
    "smart-home-starter-kit": {
      name: "Smart Home Starter Kit",
      description: "Everything you need to start your smart home journey. This curated bundle includes our most popular devices at an unbeatable price.",
      originalPrice: 299,
      bundlePrice: 199,
      savings: 100,
      savingsPercent: 33,
      items: [
        { name: "EnviroSense Hub", price: 99 },
        { name: "Motion Sensor (2-pack)", price: 59 },
        { name: "Smart Plug (3-pack)", price: 45 },
        { name: "Door/Window Sensor", price: 35 },
        { name: "Temperature Sensor", price: 29 },
        { name: "Setup Guide", price: 32 },
      ],
      features: [
        "Easy 15-minute setup with our app",
        "Compatible with Alexa and Google Home",
        "2-year warranty on all devices",
        "Free shipping included",
      ],
      rating: 4.8,
      reviewCount: 234,
      stock: 15,
    },
    "security-essentials": {
      name: "Security Essentials Bundle",
      description: "Complete home security solution with cameras, sensors, and monitoring hub for total peace of mind.",
      originalPrice: 499,
      bundlePrice: 349,
      savings: 150,
      savingsPercent: 30,
      items: [
        { name: "SecureDome Pro Camera", price: 149 },
        { name: "Indoor Camera (2-pack)", price: 129 },
        { name: "Motion Detector (4-pack)", price: 79 },
        { name: "Entry Sensor (6-pack)", price: 89 },
        { name: "Security Hub", price: 53 },
      ],
      features: [
        "24/7 professional monitoring available",
        "Instant mobile alerts",
        "Night vision and 2-way audio",
        "Cloud storage included for 30 days",
      ],
      rating: 4.9,
      reviewCount: 156,
      stock: 8,
    },
    "automation-pro": {
      name: "Automation Pro Bundle",
      description: "Advanced automation bundle for the tech enthusiast. Control lighting, climate, and appliances with one touch.",
      originalPrice: 699,
      bundlePrice: 499,
      savings: 200,
      savingsPercent: 29,
      items: [
        { name: "LumiGrid Controller", price: 199 },
        { name: "Smart Dimmer (4-pack)", price: 159 },
        { name: "Thermostat Pro", price: 149 },
        { name: "Smart Blinds Controller", price: 99 },
        { name: "Voice Assistant Hub", price: 93 },
      ],
      features: [
        "Create custom automation scenes",
        "Energy monitoring and optimization",
        "Voice control with any assistant",
        "Scheduling and geofencing support",
      ],
      rating: 4.7,
      reviewCount: 89,
      stock: 12,
    },
  }

  const bundle = bundleData[handle] || bundleData["smart-home-starter-kit"]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/$countryCode/bundles" 
          params={{ countryCode }} 
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bundles
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-4 relative">
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                Save {bundle.savingsPercent}%
              </div>
              <ShoppingBag className="w-32 h-32 text-white/50" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {bundle.items.map((item: any, index: number) => (
                <div key={index} className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-gray-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-amber-400">&#9733;</span>
                <span className="font-semibold text-white">{bundle.rating}</span>
              </div>
              <span className="text-gray-500">({bundle.reviewCount} reviews)</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{bundle.name}</h1>
            <p className="text-gray-400 mb-6">{bundle.description}</p>

            {/* Pricing */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-emerald-400">${bundle.bundlePrice}</span>
                <span className="text-xl text-gray-500 line-through">${bundle.originalPrice}</span>
              </div>
              <p className="text-emerald-400 flex items-center gap-1">
                <Tag className="w-4 h-4" />
                You save ${bundle.savings} ({bundle.savingsPercent}% off)
              </p>
            </div>

            {/* Bundle Items */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">What's Included ({bundle.items.length} items)</h2>
              <div className="space-y-3">
                {bundle.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-gray-500" />
                      </div>
                      <span className="text-white">{item.name}</span>
                    </div>
                    <span className="text-gray-500">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">Why This Bundle?</h2>
              <div className="space-y-2">
                {bundle.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-700 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500">{bundle.stock} bundles in stock</p>
            </div>

            <button className="w-full bg-cyan-500 text-black py-4 rounded-xl hover:bg-cyan-400 flex items-center justify-center gap-2 text-lg font-semibold transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Add Bundle to Cart - ${(bundle.bundlePrice * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
