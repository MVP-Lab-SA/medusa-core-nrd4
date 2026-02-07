import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowLeft, XMark } from "@medusajs/icons"

type CompareProduct = {
  id: string
  title: string
  thumbnail: string
  price: string
  description: string
  specs: Record<string, string>
}

// Demo products for comparison
const demoProducts: CompareProduct[] = [
  {
    id: "1",
    title: "Urban Sensor Pro X1",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    price: "$299.00",
    description: "Advanced environmental monitoring with AI-powered analytics",
    specs: {
      "Connectivity": "5G / WiFi 6 / LoRa",
      "Battery Life": "5 years",
      "Weather Rating": "IP68",
      "Temperature Range": "-40C to 85C",
      "Sensors": "12 integrated",
      "Data Frequency": "Real-time",
      "Warranty": "3 years",
    }
  },
  {
    id: "2", 
    title: "Urban Sensor Standard S1",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    price: "$149.00",
    description: "Reliable urban monitoring for essential metrics",
    specs: {
      "Connectivity": "WiFi / LoRa",
      "Battery Life": "3 years",
      "Weather Rating": "IP65",
      "Temperature Range": "-20C to 60C",
      "Sensors": "6 integrated",
      "Data Frequency": "5 min intervals",
      "Warranty": "2 years",
    }
  },
  {
    id: "3",
    title: "Urban Sensor Lite L1",
    thumbnail: "https://images.unsplash.com/photo-1597424216809-3ba9864aeb18?w=400",
    price: "$79.00",
    description: "Entry-level monitoring for basic urban applications",
    specs: {
      "Connectivity": "WiFi",
      "Battery Life": "2 years",
      "Weather Rating": "IP54",
      "Temperature Range": "-10C to 50C",
      "Sensors": "3 integrated",
      "Data Frequency": "15 min intervals",
      "Warranty": "1 year",
    }
  }
]

export function ComparePage() {
  const [products, setProducts] = useState<CompareProduct[]>(demoProducts)

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const allSpecs = Array.from(
    new Set(products.flatMap(p => Object.keys(p.specs)))
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/us/store" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
          <h1 className="text-3xl font-bold">Compare Products</h1>
          <p className="text-gray-400 mt-2">Compare specifications side by side</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No products to compare</h2>
            <p className="text-gray-400 mb-6">Add products from the store to compare them</p>
            <Link 
              to="/us/store"
              className="inline-flex px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Product Headers */}
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-900 border border-gray-800 min-w-[200px]">
                    <span className="text-gray-400 text-sm font-normal">Comparing {products.length} products</span>
                  </th>
                  {products.map(product => (
                    <th key={product.id} className="p-4 bg-gray-900 border border-gray-800 min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="absolute -top-2 -right-2 p-1 bg-gray-800 hover:bg-red-500/20 rounded-full transition-colors"
                        >
                          <XMark className="w-4 h-4" />
                        </button>
                        <img 
                          src={product.thumbnail} 
                          alt={product.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-left">{product.title}</h3>
                        <p className="text-cyan-400 font-bold text-xl text-left mt-2">{product.price}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              {/* Description Row */}
              <tbody>
                <tr>
                  <td className="p-4 bg-gray-900/50 border border-gray-800 font-medium">Description</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 border border-gray-800 text-gray-300 text-sm">
                      {product.description}
                    </td>
                  ))}
                </tr>
                
                {/* Spec Rows */}
                {allSpecs.map((spec, index) => (
                  <tr key={spec} className={index % 2 === 0 ? "bg-gray-900/30" : ""}>
                    <td className="p-4 border border-gray-800 font-medium">{spec}</td>
                    {products.map(product => {
                      const value = product.specs[spec]
                      const isBest = products.every(p => {
                        const pVal = p.specs[spec]
                        if (!pVal || !value) return true
                        // Simple comparison for demo - highlight highest values
                        if (spec.includes("years") || spec.includes("Sensors")) {
                          const numVal = parseInt(value)
                          const numPVal = parseInt(pVal)
                          return isNaN(numVal) || isNaN(numPVal) || numVal >= numPVal
                        }
                        return true
                      })
                      return (
                        <td 
                          key={product.id} 
                          className={`p-4 border border-gray-800 ${isBest && products.length > 1 ? "text-cyan-400" : "text-gray-300"}`}
                        >
                          {value || "-"}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                
                {/* Action Row */}
                <tr>
                  <td className="p-4 bg-gray-900/50 border border-gray-800"></td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 border border-gray-800">
                      <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
