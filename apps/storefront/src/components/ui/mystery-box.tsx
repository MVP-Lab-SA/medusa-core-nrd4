import { useState } from "react"
import { GiftSolid, Sparkles } from "@medusajs/icons"
import { Button } from "./button"
import { Thumbnail } from "./thumbnail"

interface MysteryProduct {
  id: string
  title: string
  thumbnail?: string
  value: string
  category?: string
}

interface MysteryBoxProps {
  price: string
  possibleProducts: MysteryProduct[]
  minValue: string
  maxValue: string
  onPurchase: () => Promise<MysteryProduct>
  className?: string
}

export function MysteryBox({
  price,
  possibleProducts,
  minValue,
  maxValue,
  onPurchase,
  className = ""
}: MysteryBoxProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [revealedProduct, setRevealedProduct] = useState<MysteryProduct | null>(null)
  const [showProducts, setShowProducts] = useState(false)

  const handlePurchase = async () => {
    setIsOpening(true)
    
    // Simulate suspenseful reveal
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const product = await onPurchase()
    setRevealedProduct(product)
    setIsOpening(false)
  }

  if (revealedProduct) {
    return (
      <div className={`text-center ${className}`}>
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-2xl blur-lg opacity-50 animate-pulse" />
          <div className="relative bg-white rounded-xl p-6">
            <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-2">You got:</p>
            <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
              <Thumbnail
                src={revealedProduct.thumbnail}
                alt={revealedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{revealedProduct.title}</h3>
            <p className="text-cyan-600 font-semibold">Value: {revealedProduct.value}</p>
          </div>
        </div>
        <Button onClick={() => setRevealedProduct(null)}>
          Try Another Box
        </Button>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white ${className}`}>
      <div className="text-center mb-6">
        <div className={`inline-block p-4 bg-white/20 rounded-xl mb-4 ${isOpening ? "animate-bounce" : ""}`}>
          <GiftSolid className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Mystery Box</h2>
        <p className="text-white/80">Guaranteed value between {minValue} - {maxValue}</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80">Price</span>
          <span className="text-2xl font-bold">{price}</span>
        </div>
        <p className="text-sm text-white/60">
          {possibleProducts.length} possible products
        </p>
      </div>

      <Button
        onClick={handlePurchase}
        disabled={isOpening}
        className="w-full bg-white text-purple-600 hover:bg-white/90"
        size="lg"
      >
        {isOpening ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            Opening...
          </span>
        ) : (
          "Open Mystery Box"
        )}
      </Button>

      <button
        onClick={() => setShowProducts(!showProducts)}
        className="w-full mt-4 text-sm text-white/80 hover:text-white"
      >
        {showProducts ? "Hide" : "See"} possible products
      </button>

      {showProducts && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {possibleProducts.slice(0, 6).map(product => (
            <div
              key={product.id}
              className="bg-white/10 rounded-lg p-2 text-center"
            >
              <div className="w-full aspect-square bg-white/20 rounded mb-1 overflow-hidden">
                <Thumbnail
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs truncate">{product.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
