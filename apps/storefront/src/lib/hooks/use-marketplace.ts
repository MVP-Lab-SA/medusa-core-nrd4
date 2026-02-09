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

export function useVendors(options?: { category?: string }) {
  const [data, setData] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Mock vendors list
    const mockVendors: Vendor[] = [
      {
        id: "vendor_1",
        name: "TechGear Pro",
        slug: "techgear-pro",
        description: "Premium electronics and accessories",
        rating: 4.8,
        reviewCount: 256,
        productCount: 89,
        isVerified: true,
        joinedAt: "2022-06-15",
        location: "San Francisco, CA",
        categories: ["Electronics", "Accessories"]
      },
      {
        id: "vendor_2",
        name: "Urban Style Co",
        slug: "urban-style-co",
        description: "Modern fashion and streetwear",
        rating: 4.6,
        reviewCount: 184,
        productCount: 120,
        isVerified: true,
        joinedAt: "2022-08-20",
        location: "Los Angeles, CA",
        categories: ["Fashion", "Streetwear"]
      },
      {
        id: "vendor_3",
        name: "Home Essentials",
        slug: "home-essentials",
        description: "Quality home goods and decor",
        rating: 4.5,
        reviewCount: 92,
        productCount: 65,
        isVerified: false,
        joinedAt: "2023-02-10",
        location: "Chicago, IL",
        categories: ["Home", "Decor"]
      }
    ]

    // Filter by category if provided
    const filtered = options?.category 
      ? mockVendors.filter(v => v.categories?.includes(options.category!))
      : mockVendors
    
    setData(filtered)
    setIsLoading(false)
  }, [options?.category])

  return { data, isLoading, error }
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
