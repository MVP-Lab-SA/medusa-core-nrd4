// Marketplace vendor hooks
import { useState, useEffect } from "react"

export interface Vendor {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  banner?: string
  rating: number
  reviewCount: number
  productCount: number
  isVerified: boolean
  joinedAt: string
  location?: string
  categories?: string[]
}

export interface VendorProduct {
  id: string
  title: string
  handle: string
  thumbnail?: string
  price: number
  currencyCode: string
  rating?: number
  reviewCount?: number
}

export interface VendorReview {
  id: string
  rating: number
  title?: string
  content: string
  author: string
  createdAt: string
  isVerified: boolean
}

export function useVendor(handle: string) {
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Mock vendor data
    const mockVendor: Vendor = {
      id: `vendor_${handle}`,
      name: handle.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      slug: handle,
      description: "Premium quality products and excellent customer service.",
      rating: 4.7,
      reviewCount: 128,
      productCount: 45,
      isVerified: true,
      joinedAt: "2023-01-15",
      location: "New York, NY"
    }

    setVendor(mockVendor)
    setIsLoading(false)
  }, [handle])

  return { vendor, isLoading, error }
}

export function useVendorProducts(vendorId: string) {
  const [products, setProducts] = useState<VendorProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock products
    setProducts([])
    setIsLoading(false)
  }, [vendorId])

  return { products, isLoading }
}

export function useVendorReviews(vendorId: string) {
  const [reviews, setReviews] = useState<VendorReview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock reviews
    const mockReviews: VendorReview[] = [
      {
        id: "rev_1",
        rating: 5,
        title: "Great seller!",
        content: "Fast shipping and excellent product quality.",
        author: "John D.",
        createdAt: "2024-01-15",
        isVerified: true
      },
      {
        id: "rev_2",
        rating: 4,
        title: "Good experience",
        content: "Product as described, would buy again.",
        author: "Sarah M.",
        createdAt: "2024-01-10",
        isVerified: true
      }
    ]

    setReviews(mockReviews)
    setIsLoading(false)
  }, [vendorId])

  return { reviews, isLoading }
}
