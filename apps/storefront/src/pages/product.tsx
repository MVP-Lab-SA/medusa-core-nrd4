import ProductActions from "@/components/product-actions"
import { ImageGallery } from "@/components/ui/image-gallery"
import { useLoaderData } from "@tanstack/react-router"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Rating } from "@/components/ui/rating"
import { useEffect, useState } from "react"
import { Link, Facebook, XMark } from "@medusajs/icons"

// Sample reviews data
const sampleReviews = [
  { id: "1", author: "Alex M.", rating: 5, date: "2024-01-15", title: "Excellent quality", content: "The material quality is outstanding. Fits perfectly.", verified: true },
  { id: "2", author: "Jordan K.", rating: 4, date: "2024-01-10", title: "Great product", content: "Very happy with my purchase.", verified: true },
  { id: "3", author: "Sam R.", rating: 5, date: "2024-01-05", title: "Love it!", content: "Exactly what I was looking for.", verified: false },
]

const ProductDetails = () => {
  const { product, region } = useLoaderData({
    from: "/$countryCode/products/$handle",
  })
  
  const [showShareMenu, setShowShareMenu] = useState(false)

  // Track recently viewed products
  useEffect(() => {
    if (product && typeof window !== "undefined") {
      const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
      const productData = {
        id: product.id,
        title: product.title,
        handle: product.handle,
        thumbnail: product.thumbnail,
        price: product.variants?.[0]?.calculated_price?.calculated_amount,
        currencyCode: region?.currency_code || "usd",
      }
      const filtered = recentlyViewed.filter((p: any) => p.id !== product.id)
      const updated = [productData, ...filtered].slice(0, 10)
      localStorage.setItem("recentlyViewed", JSON.stringify(updated))
    }
  }, [product, region])

  // Stock status
  const firstVariant = product.variants?.[0]
  const inventoryQuantity = firstVariant?.inventory_quantity || 0
  const stockStatus = inventoryQuantity > 10 ? "in_stock" : inventoryQuantity > 0 ? "low_stock" : "out_of_stock"

  const breadcrumbItems = [
    { label: "Home", href: "/us" },
    { label: "Store", href: "/us/store" },
    ...(product.collection ? [{ label: product.collection.title, href: `/us/store?collection=${product.collection.handle}` }] : []),
    { label: product.title },
  ]

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="content-container py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image gallery */}
          <div className="bg-city-slate/30 p-4 lg:p-8 relative">
            <ImageGallery images={product.images || []} />
          </div>

          {/* Right: Product info */}
          <div className="flex flex-col">
            {/* Category badge */}
            {product.collection && (
              <span className="text-city-cyan text-sm font-semibold uppercase tracking-widest mb-4">
                {product.collection.title}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-city-white mb-4 leading-tight">
              {product.title}
            </h1>

            {/* Stock Indicator */}
            <div className="mb-4">
              {stockStatus === "in_stock" && (
                <span className="inline-flex items-center gap-2 text-green-400 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  In Stock
                </span>
              )}
              {stockStatus === "low_stock" && (
                <span className="inline-flex items-center gap-2 text-amber-400 text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Only {inventoryQuantity} left
                </span>
              )}
              {stockStatus === "out_of_stock" && (
                <span className="inline-flex items-center gap-2 text-red-400 text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-city-gray text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {/* Share Buttons */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-city-muted text-sm">Share:</span>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="p-2 bg-city-slate hover:bg-city-steel text-city-gray hover:text-city-white rounded transition-colors"
                title="Copy link"
              >
                <Link className="w-4 h-4" />
              </button>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-city-slate hover:bg-city-steel text-city-gray hover:text-city-white rounded transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            {/* Product Actions */}
            <div className="mb-8">
              <ProductActions product={product} region={region} />
            </div>

            {/* Trust Badges */}
            <div className="mb-8 grid grid-cols-3 gap-4 py-6 border-y border-city-steel/30">
              <div className="text-center">
                <div className="text-city-cyan font-bold">Free Shipping</div>
                <div className="text-city-muted text-xs">Orders over $100</div>
              </div>
              <div className="text-center">
                <div className="text-city-cyan font-bold">2 Year Warranty</div>
                <div className="text-city-muted text-xs">Full coverage</div>
              </div>
              <div className="text-center">
                <div className="text-city-cyan font-bold">24/7 Support</div>
                <div className="text-city-muted text-xs">Always here to help</div>
              </div>
            </div>

            {/* Product Details Accordion */}
            <Accordion type="multiple" defaultValue={["details"]}>
              <AccordionItem value="details">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    {product.material && (
                      <div className="flex justify-between">
                        <span className="text-city-muted">Material</span>
                        <span className="text-city-white">{product.material}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between">
                        <span className="text-city-muted">Weight</span>
                        <span className="text-city-white">{product.weight}g</span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-city-gray">
                    <p>Free standard shipping on orders over $100.</p>
                    <p>Express shipping available at checkout.</p>
                    <p>30-day return policy for unworn items.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-city-steel/30 pt-12">
          <Tabs defaultValue="reviews">
            <TabsList className="mb-8">
              <TabsTrigger value="reviews">Reviews ({sampleReviews.length})</TabsTrigger>
              <TabsTrigger value="write">Write a Review</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews">
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-4xl font-bold text-city-white">4.7</div>
                  <div>
                    <Rating value={4.7} readonly size="lg" />
                    <p className="text-city-muted text-sm mt-1">Based on {sampleReviews.length} reviews</p>
                  </div>
                </div>
                
                {/* Reviews List */}
                {sampleReviews.map((review) => (
                  <div key={review.id} className="bg-city-navy border border-city-steel/30 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-city-slate flex items-center justify-center text-city-cyan font-semibold">
                          {review.author[0]}
                        </div>
                        <div>
                          <div className="text-city-white font-medium">{review.author}</div>
                          <div className="text-city-muted text-xs">{review.date}</div>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-green-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <Rating value={review.rating} readonly size="sm" className="mb-2" />
                    <h4 className="text-city-white font-medium mb-2">{review.title}</h4>
                    <p className="text-city-gray text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="write">
              <div className="max-w-2xl bg-city-navy border border-city-steel/30 p-6 rounded-lg">
                <h3 className="text-city-white font-semibold mb-4">Write a Review</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-city-gray text-sm mb-2">Your Rating</label>
                    <Rating value={0} size="lg" />
                  </div>
                  <div>
                    <label className="block text-city-gray text-sm mb-2">Review Title</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-city-slate border border-city-steel/50 text-city-white rounded focus:outline-none focus:border-city-cyan"
                      placeholder="Summarize your experience"
                    />
                  </div>
                  <div>
                    <label className="block text-city-gray text-sm mb-2">Your Review</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-city-slate border border-city-steel/50 text-city-white rounded focus:outline-none focus:border-city-cyan h-32"
                      placeholder="Tell us about your experience with this product"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-city-cyan text-city-dark font-semibold hover:bg-city-cyan-light transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recently Viewed */}
        <RecentlyViewedSection currentProductId={product.id} />
      </div>
    </div>
  )
}

// Recently Viewed inline component
const RecentlyViewedSection = ({ currentProductId }: { currentProductId: string }) => {
  const [products, setProducts] = useState<any[]>([])
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
      setProducts(stored.filter((p: any) => p.id !== currentProductId).slice(0, 4))
    }
  }, [currentProductId])
  
  if (products.length === 0) return null
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-city-white mb-8">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <a 
            key={product.id} 
            href={`/us/products/${product.handle}`}
            className="group bg-city-navy border border-city-steel/30 p-4 rounded-lg hover:border-city-cyan/50 transition-colors"
          >
            {product.thumbnail && (
              <div className="aspect-square bg-city-slate rounded mb-4 overflow-hidden">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}
            <h3 className="text-city-white text-sm font-medium truncate">{product.title}</h3>
            {product.price && (
              <p className="text-city-cyan text-sm mt-1">
                ${(product.price / 100).toFixed(2)}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}

export default ProductDetails
