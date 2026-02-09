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

// =============================================================================
// B2B / BUSINESS HOOKS
// =============================================================================

export interface Company {
  id: string
  name: string
  registrationNumber?: string
  taxId?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  industry?: string
  size?: string
  status: 'pending' | 'active' | 'suspended'
  createdAt: string
  users: CompanyUser[]
  creditLimit?: number
  paymentTerms?: string
}

export interface CompanyUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'buyer' | 'approver' | 'viewer'
  status: 'active' | 'invited' | 'disabled'
}

export interface Quote {
  id: string
  companyId: string
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'expired'
  items: QuoteItem[]
  total: number
  currencyCode: string
  validUntil: string
  createdAt: string
  notes?: string
}

export interface QuoteItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface PurchaseOrder {
  id: string
  companyId: string
  quoteId?: string
  status: 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: PurchaseOrderItem[]
  subtotal: number
  tax: number
  total: number
  currencyCode: string
  createdAt: string
  approvedAt?: string
  approvedBy?: string
}

export interface PurchaseOrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface ApprovalRequest {
  id: string
  type: 'quote' | 'purchase_order' | 'user_invite'
  referenceId: string
  requestedBy: string
  requestedAt: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approvedAt?: string
  notes?: string
  details: Record<string, unknown>
}

export function useCompany() {
  const [data, setData] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Mock company data
    const mockCompany: Company = {
      id: "company_1",
      name: "Acme Corporation",
      registrationNumber: "REG-12345",
      taxId: "TAX-67890",
      address: "123 Business Ave, Suite 100, Enterprise City, EC 12345",
      phone: "+1 (555) 123-4567",
      email: "procurement@acme.com",
      website: "https://acme.com",
      industry: "Technology",
      size: "100-500",
      status: "active",
      createdAt: "2023-01-15",
      users: [
        { id: "user_1", email: "john@acme.com", name: "John Smith", role: "admin", status: "active" },
        { id: "user_2", email: "jane@acme.com", name: "Jane Doe", role: "buyer", status: "active" },
        { id: "user_3", email: "bob@acme.com", name: "Bob Wilson", role: "approver", status: "active" },
      ],
      creditLimit: 50000,
      paymentTerms: "Net 30",
    }

    setData(mockCompany)
    setIsLoading(false)
  }, [])

  return { data, isLoading, error }
}

export function useQuotes(companyId?: string) {
  const [data, setData] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Mock quotes
    const mockQuotes: Quote[] = [
      {
        id: "quote_1",
        companyId: "company_1",
        status: "pending",
        items: [
          { id: "qi_1", productId: "prod_1", productName: "Smart Sensor Pro", quantity: 50, unitPrice: 199, total: 9950 },
          { id: "qi_2", productId: "prod_2", productName: "IoT Gateway", quantity: 10, unitPrice: 499, total: 4990 },
        ],
        total: 14940,
        currencyCode: "USD",
        validUntil: "2024-03-31",
        createdAt: "2024-02-15",
        notes: "Bulk order discount requested",
      },
      {
        id: "quote_2",
        companyId: "company_1",
        status: "approved",
        items: [
          { id: "qi_3", productId: "prod_3", productName: "Industrial Camera", quantity: 5, unitPrice: 1299, total: 6495 },
        ],
        total: 6495,
        currencyCode: "USD",
        validUntil: "2024-04-15",
        createdAt: "2024-02-01",
      },
    ]

    setData(mockQuotes)
    setIsLoading(false)
  }, [companyId])

  return { data, isLoading, error }
}

export function usePurchaseOrders(companyId?: string) {
  const [data, setData] = useState<PurchaseOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Mock purchase orders
    const mockOrders: PurchaseOrder[] = [
      {
        id: "po_1",
        companyId: "company_1",
        quoteId: "quote_2",
        status: "processing",
        items: [
          { id: "poi_1", productId: "prod_3", productName: "Industrial Camera", quantity: 5, unitPrice: 1299, total: 6495 },
        ],
        subtotal: 6495,
        tax: 649.50,
        total: 7144.50,
        currencyCode: "USD",
        createdAt: "2024-02-05",
        approvedAt: "2024-02-06",
        approvedBy: "Bob Wilson",
      },
      {
        id: "po_2",
        companyId: "company_1",
        status: "delivered",
        items: [
          { id: "poi_2", productId: "prod_1", productName: "Smart Sensor Pro", quantity: 20, unitPrice: 199, total: 3980 },
        ],
        subtotal: 3980,
        tax: 398,
        total: 4378,
        currencyCode: "USD",
        createdAt: "2024-01-10",
        approvedAt: "2024-01-11",
        approvedBy: "Bob Wilson",
      },
    ]

    setData(mockOrders)
    setIsLoading(false)
  }, [companyId])

  return { data, isLoading, error }
}

export function useApprovalRequests(companyId?: string) {
  const [data, setData] = useState<ApprovalRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Mock approval requests
    const mockRequests: ApprovalRequest[] = [
      {
        id: "ar_1",
        type: "quote",
        referenceId: "quote_1",
        requestedBy: "Jane Doe",
        requestedAt: "2024-02-15T10:30:00Z",
        status: "pending",
        details: { quoteTotal: 14940, itemCount: 2 },
      },
      {
        id: "ar_2",
        type: "user_invite",
        referenceId: "invite_1",
        requestedBy: "John Smith",
        requestedAt: "2024-02-14T14:00:00Z",
        status: "pending",
        details: { inviteeEmail: "newuser@acme.com", role: "buyer" },
      },
    ]

    setData(mockRequests)
    setIsLoading(false)
  }, [companyId])

  return { data, isLoading, error }
}

export function useRegisterCompany() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const register = async (companyData: Partial<Company>) => {
    setIsLoading(true)
    setError(null)

    try {
      // Mock registration - in real implementation, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Company registration submitted:', companyData)
      
      return {
        success: true,
        message: 'Company registration submitted successfully. Our team will review your application within 2-3 business days.',
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Registration failed')
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading, error }
}
