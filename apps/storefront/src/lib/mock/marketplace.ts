/**
 * Marketplace Mock Service
 * Vendor, B2B, Subscriptions, Bookings, Reviews
 * (Medusa extensions that aren't built-in)
 */

import { generateId, mockDelay, pastDate, futureDate } from "./index"

// ==================== VENDOR / MARKETPLACE ====================

export interface Vendor {
  id: string
  handle: string
  name: string
  description: string
  logo: string
  banner: string
  rating: number
  reviewCount: number
  productCount: number
  followerCount: number
  verified: boolean
  joinedAt: string
  categories: string[]
  policies: {
    shipping: string
    returns: string
  }
  contact: {
    email: string
    phone?: string
  }
}

export interface VendorReview {
  id: string
  vendorId: string
  customerId: string
  customerName: string
  rating: number
  title: string
  content: string
  createdAt: string
  helpful: number
}

// ==================== B2B ====================

export interface Company {
  id: string
  name: string
  taxId: string
  industry: string
  size: "small" | "medium" | "large" | "enterprise"
  status: "pending" | "approved" | "suspended"
  creditLimit: number
  currentCredit: number
  paymentTerms: PaymentTerms
  users: CompanyUser[]
  createdAt: string
}

export interface CompanyUser {
  id: string
  companyId: string
  customerId: string
  name: string
  email: string
  role: "admin" | "buyer" | "approver" | "viewer"
  spendingLimit?: number
  status: "active" | "inactive"
}

export interface PaymentTerms {
  id: string
  name: string
  days: number // Net 30, Net 60, etc.
  discount?: {
    percentage: number
    withinDays: number
  }
}

export interface Quote {
  id: string
  companyId: string
  requestedBy: string
  status: "draft" | "submitted" | "reviewing" | "quoted" | "accepted" | "rejected" | "expired"
  items: QuoteItem[]
  subtotal: number
  discount: number
  total: number
  validUntil?: string
  notes?: string
  createdAt: string
  quotedAt?: string
}

export interface QuoteItem {
  id: string
  productId: string
  variantId: string
  productTitle: string
  variantTitle: string
  quantity: number
  unitPrice?: number
  totalPrice?: number
}

export interface PurchaseOrder {
  id: string
  companyId: string
  quoteId?: string
  status: "draft" | "pending_approval" | "approved" | "submitted" | "processing" | "completed" | "cancelled"
  items: PurchaseOrderItem[]
  subtotal: number
  tax: number
  total: number
  shippingAddress: string
  billingAddress: string
  requestedBy: string
  approvedBy?: string
  createdAt: string
}

export interface PurchaseOrderItem {
  id: string
  productId: string
  variantId: string
  productTitle: string
  variantTitle: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface ApprovalRequest {
  id: string
  type: "purchase_order" | "quote" | "user_access"
  referenceId: string
  companyId: string
  requestedBy: string
  status: "pending" | "approved" | "rejected"
  amount?: number
  notes?: string
  createdAt: string
  resolvedAt?: string
  resolvedBy?: string
}

// ==================== SUBSCRIPTIONS ====================

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: "weekly" | "monthly" | "quarterly" | "yearly"
  features: string[]
  productIds?: string[]
  discount?: number
  trialDays?: number
  active: boolean
}

export interface Subscription {
  id: string
  customerId: string
  planId: string
  plan: SubscriptionPlan
  status: "active" | "paused" | "cancelled" | "expired"
  currentPeriodStart: string
  currentPeriodEnd: string
  nextBillingDate: string
  items: SubscriptionItem[]
  pausedAt?: string
  pausedUntil?: string
  cancelledAt?: string
  createdAt: string
}

export interface SubscriptionItem {
  id: string
  productId: string
  variantId: string
  productTitle: string
  variantTitle: string
  quantity: number
  price: number
}

// ==================== BOOKINGS ====================

export interface ServiceProduct {
  id: string
  handle: string
  title: string
  description: string
  duration: number // minutes
  price: number
  currency: string
  images: string[]
  providerId?: string
  category: string
  bufferTime: number // minutes before/after
  maxParticipants: number
}

export interface ServiceProvider {
  id: string
  name: string
  description: string
  avatar: string
  specialties: string[]
  rating: number
  reviewCount: number
  availability: Availability[]
}

export interface Availability {
  id: string
  providerId: string
  dayOfWeek: number // 0-6
  startTime: string // HH:mm
  endTime: string // HH:mm
}

export interface Booking {
  id: string
  customerId: string
  serviceId: string
  serviceName: string
  providerId?: string
  providerName?: string
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no_show"
  startTime: string
  endTime: string
  participants: number
  price: number
  currency: string
  notes?: string
  createdAt: string
}

export interface BookingSlot {
  id: string
  startTime: string
  endTime: string
  available: boolean
  providerId?: string
  providerName?: string
}

// ==================== REVIEWS ====================

export interface ProductReview {
  id: string
  productId: string
  customerId: string
  customerName: string
  orderId?: string
  rating: number
  title: string
  content: string
  pros?: string[]
  cons?: string[]
  images?: string[]
  verified: boolean
  helpful: number
  createdAt: string
  response?: {
    content: string
    createdAt: string
  }
}

export interface ReviewStats {
  productId: string
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  recommendationRate: number
}

// ==================== WISHLISTS ====================

export interface Wishlist {
  id: string
  customerId: string
  name: string
  isDefault: boolean
  isPublic: boolean
  shareToken?: string
  items: WishlistItem[]
  createdAt: string
}

export interface WishlistItem {
  id: string
  productId: string
  variantId?: string
  productTitle: string
  productImage: string
  price: number
  currency: string
  addedAt: string
  inStock: boolean
}

// ==================== MOCK DATA ====================

const mockVendors: Vendor[] = [
  {
    id: "vendor_1",
    handle: "premium-fashion",
    name: "Premium Fashion Co.",
    description: "High-quality fashion and accessories for the modern consumer.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=PF",
    banner: "https://placehold.co/1200x400?text=Premium+Fashion",
    rating: 4.8,
    reviewCount: 1234,
    productCount: 156,
    followerCount: 5420,
    verified: true,
    joinedAt: pastDate(365).toISOString(),
    categories: ["Clothing", "Accessories"],
    policies: {
      shipping: "Free shipping on orders over $50",
      returns: "30-day hassle-free returns",
    },
    contact: {
      email: "support@premiumfashion.com",
    },
  },
  {
    id: "vendor_2",
    handle: "tech-gadgets",
    name: "Tech Gadgets World",
    description: "Latest electronics and gadgets at competitive prices.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TG",
    banner: "https://placehold.co/1200x400?text=Tech+Gadgets",
    rating: 4.5,
    reviewCount: 876,
    productCount: 89,
    followerCount: 3210,
    verified: true,
    joinedAt: pastDate(200).toISOString(),
    categories: ["Electronics", "Accessories"],
    policies: {
      shipping: "Standard shipping 3-5 days",
      returns: "14-day returns with receipt",
    },
    contact: {
      email: "hello@techgadgets.com",
      phone: "+1-555-TECH",
    },
  },
  {
    id: "vendor_3",
    handle: "home-essentials",
    name: "Home Essentials",
    description: "Everything you need for a beautiful home.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=HE",
    banner: "https://placehold.co/1200x400?text=Home+Essentials",
    rating: 4.6,
    reviewCount: 543,
    productCount: 234,
    followerCount: 2100,
    verified: false,
    joinedAt: pastDate(90).toISOString(),
    categories: ["Home", "Decor", "Kitchen"],
    policies: {
      shipping: "Flat rate $5.99",
      returns: "60-day returns",
    },
    contact: {
      email: "care@homeessentials.com",
    },
  },
]

const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan_1",
    name: "Essentials Box",
    description: "Monthly curated selection of everyday essentials",
    price: 29.99,
    currency: "USD",
    interval: "monthly",
    features: ["4-6 curated products", "Free shipping", "Exclusive discounts", "Cancel anytime"],
    discount: 15,
    active: true,
  },
  {
    id: "plan_2",
    name: "Premium Box",
    description: "Premium products delivered to your door quarterly",
    price: 79.99,
    currency: "USD",
    interval: "quarterly",
    features: ["8-10 premium products", "Free express shipping", "25% off store", "Early access to new products"],
    discount: 25,
    trialDays: 7,
    active: true,
  },
  {
    id: "plan_3",
    name: "VIP Annual",
    description: "The ultimate subscription experience",
    price: 249.99,
    currency: "USD",
    interval: "yearly",
    features: ["All Premium benefits", "Exclusive VIP products", "Personal stylist", "Free returns", "Birthday gift"],
    discount: 35,
    active: true,
  },
]

const mockServices: ServiceProduct[] = [
  {
    id: "service_1",
    handle: "personal-styling",
    title: "Personal Styling Session",
    description: "One-on-one consultation with our expert stylists",
    duration: 60,
    price: 99,
    currency: "USD",
    images: ["https://placehold.co/600x400?text=Styling"],
    category: "Fashion",
    bufferTime: 15,
    maxParticipants: 1,
  },
  {
    id: "service_2",
    handle: "wardrobe-audit",
    title: "Wardrobe Audit",
    description: "Complete review of your wardrobe with recommendations",
    duration: 120,
    price: 199,
    currency: "USD",
    images: ["https://placehold.co/600x400?text=Wardrobe"],
    category: "Fashion",
    bufferTime: 30,
    maxParticipants: 1,
  },
  {
    id: "service_3",
    handle: "group-shopping",
    title: "Group Shopping Experience",
    description: "Private shopping event for you and your friends",
    duration: 180,
    price: 299,
    currency: "USD",
    images: ["https://placehold.co/600x400?text=Group+Shopping"],
    category: "Events",
    bufferTime: 30,
    maxParticipants: 6,
  },
]

const mockProviders: ServiceProvider[] = [
  {
    id: "provider_1",
    name: "Emma Thompson",
    description: "Senior stylist with 10 years experience in high fashion",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    specialties: ["Personal Styling", "Wardrobe Consulting"],
    rating: 4.9,
    reviewCount: 156,
    availability: [
      { id: "av_1", providerId: "provider_1", dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
      { id: "av_2", providerId: "provider_1", dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
      { id: "av_3", providerId: "provider_1", dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
      { id: "av_4", providerId: "provider_1", dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
      { id: "av_5", providerId: "provider_1", dayOfWeek: 5, startTime: "09:00", endTime: "15:00" },
    ],
  },
  {
    id: "provider_2",
    name: "James Wilson",
    description: "Menswear specialist and fashion consultant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    specialties: ["Menswear", "Business Attire"],
    rating: 4.7,
    reviewCount: 89,
    availability: [
      { id: "av_6", providerId: "provider_2", dayOfWeek: 2, startTime: "10:00", endTime: "18:00" },
      { id: "av_7", providerId: "provider_2", dayOfWeek: 3, startTime: "10:00", endTime: "18:00" },
      { id: "av_8", providerId: "provider_2", dayOfWeek: 4, startTime: "10:00", endTime: "18:00" },
      { id: "av_9", providerId: "provider_2", dayOfWeek: 5, startTime: "10:00", endTime: "18:00" },
      { id: "av_10", providerId: "provider_2", dayOfWeek: 6, startTime: "10:00", endTime: "14:00" },
    ],
  },
]

const mockProductReviews: ProductReview[] = [
  {
    id: "review_1",
    productId: "prod_1",
    customerId: "cust_1",
    customerName: "Sarah M.",
    orderId: "order_123",
    rating: 5,
    title: "Absolutely love it!",
    content: "This product exceeded my expectations. The quality is amazing and it fits perfectly.",
    pros: ["Great quality", "Perfect fit", "Fast shipping"],
    cons: [],
    verified: true,
    helpful: 24,
    createdAt: pastDate(14).toISOString(),
  },
  {
    id: "review_2",
    productId: "prod_1",
    customerId: "cust_2",
    customerName: "Michael T.",
    orderId: "order_124",
    rating: 4,
    title: "Good but not perfect",
    content: "Nice product overall. The material is good but sizing runs a bit small.",
    pros: ["Good material", "Nice design"],
    cons: ["Runs small"],
    verified: true,
    helpful: 12,
    createdAt: pastDate(21).toISOString(),
    response: {
      content: "Thank you for your feedback! We recommend sizing up for a more relaxed fit.",
      createdAt: pastDate(20).toISOString(),
    },
  },
  {
    id: "review_3",
    productId: "prod_1",
    customerId: "cust_3",
    customerName: "Emily R.",
    rating: 5,
    title: "Best purchase ever",
    content: "I've bought many similar products and this one is by far the best. Will definitely buy again!",
    images: ["https://placehold.co/400x400?text=Review+Photo"],
    verified: false,
    helpful: 8,
    createdAt: pastDate(7).toISOString(),
  },
]

// Mock Storage
const mockSubscriptions: Map<string, Subscription[]> = new Map()
const mockBookings: Map<string, Booking[]> = new Map()
const mockWishlists: Map<string, Wishlist[]> = new Map()
const mockCompanies: Map<string, Company> = new Map()
const mockQuotes: Map<string, Quote[]> = new Map()
const mockPurchaseOrders: Map<string, PurchaseOrder[]> = new Map()

// ==================== API FUNCTIONS ====================

export const marketplaceService = {
  // ========== VENDORS ==========
  async getVendors(options?: { category?: string; limit?: number }): Promise<Vendor[]> {
    await mockDelay(300)
    let vendors = [...mockVendors]
    if (options?.category) {
      vendors = vendors.filter((v) => v.categories.includes(options.category!))
    }
    if (options?.limit) {
      vendors = vendors.slice(0, options.limit)
    }
    return vendors
  },

  async getVendor(handle: string): Promise<Vendor | null> {
    await mockDelay(200)
    return mockVendors.find((v) => v.handle === handle) || null
  },

  async getVendorReviews(vendorId: string): Promise<VendorReview[]> {
    await mockDelay(300)
    return [
      {
        id: generateId(),
        vendorId,
        customerId: "cust_1",
        customerName: "John D.",
        rating: 5,
        title: "Great seller!",
        content: "Fast shipping and excellent quality products.",
        createdAt: pastDate(10).toISOString(),
        helpful: 15,
      },
    ]
  },

  async followVendor(vendorId: string): Promise<{ following: boolean }> {
    await mockDelay(300)
    return { following: true }
  },

  // ========== B2B ==========
  async getCompany(customerId: string): Promise<Company | null> {
    await mockDelay(300)
    return mockCompanies.get(customerId) || null
  },

  async registerCompany(data: {
    name: string
    taxId: string
    industry: string
    size: Company["size"]
  }): Promise<Company> {
    await mockDelay(600)
    const company: Company = {
      id: generateId(),
      ...data,
      status: "pending",
      creditLimit: 10000,
      currentCredit: 0,
      paymentTerms: {
        id: "terms_1",
        name: "Net 30",
        days: 30,
      },
      users: [],
      createdAt: new Date().toISOString(),
    }
    return company
  },

  async getQuotes(companyId: string): Promise<Quote[]> {
    await mockDelay(300)
    return mockQuotes.get(companyId) || []
  },

  async createQuote(companyId: string, items: Omit<QuoteItem, "id">[]): Promise<Quote> {
    await mockDelay(500)
    const quote: Quote = {
      id: generateId(),
      companyId,
      requestedBy: "current_user",
      status: "submitted",
      items: items.map((item) => ({ ...item, id: generateId() })),
      subtotal: 0,
      discount: 0,
      total: 0,
      createdAt: new Date().toISOString(),
    }
    return quote
  },

  async getPurchaseOrders(companyId: string): Promise<PurchaseOrder[]> {
    await mockDelay(300)
    return mockPurchaseOrders.get(companyId) || []
  },

  async createPurchaseOrder(
    companyId: string,
    data: {
      items: Omit<PurchaseOrderItem, "id">[]
      shippingAddress: string
      billingAddress: string
    }
  ): Promise<PurchaseOrder> {
    await mockDelay(500)
    const subtotal = data.items.reduce((sum, item) => sum + item.totalPrice, 0)
    const po: PurchaseOrder = {
      id: generateId(),
      companyId,
      status: "pending_approval",
      items: data.items.map((item) => ({ ...item, id: generateId() })),
      subtotal,
      tax: subtotal * 0.1,
      total: subtotal * 1.1,
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      requestedBy: "current_user",
      createdAt: new Date().toISOString(),
    }
    return po
  },

  async getApprovalRequests(companyId: string): Promise<ApprovalRequest[]> {
    await mockDelay(300)
    return [
      {
        id: generateId(),
        type: "purchase_order",
        referenceId: "po_123",
        companyId,
        requestedBy: "John Doe",
        status: "pending",
        amount: 5000,
        createdAt: pastDate(1).toISOString(),
      },
    ]
  },

  // ========== SUBSCRIPTIONS ==========
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    await mockDelay(300)
    return mockSubscriptionPlans.filter((p) => p.active)
  },

  async getSubscriptionPlan(planId: string): Promise<SubscriptionPlan | null> {
    await mockDelay(200)
    return mockSubscriptionPlans.find((p) => p.id === planId) || null
  },

  async getSubscriptions(customerId: string): Promise<Subscription[]> {
    await mockDelay(300)
    if (!mockSubscriptions.has(customerId)) {
      // Create a sample subscription
      const plan = mockSubscriptionPlans[0]
      const subscription: Subscription = {
        id: generateId(),
        customerId,
        planId: plan.id,
        plan,
        status: "active",
        currentPeriodStart: pastDate(15).toISOString(),
        currentPeriodEnd: futureDate(15).toISOString(),
        nextBillingDate: futureDate(15).toISOString(),
        items: [
          {
            id: generateId(),
            productId: "prod_sub_1",
            variantId: "var_sub_1",
            productTitle: "Monthly Essentials Kit",
            variantTitle: "Standard",
            quantity: 1,
            price: plan.price,
          },
        ],
        createdAt: pastDate(45).toISOString(),
      }
      mockSubscriptions.set(customerId, [subscription])
    }
    return mockSubscriptions.get(customerId)!
  },

  async createSubscription(customerId: string, planId: string): Promise<Subscription> {
    await mockDelay(600)
    const plan = mockSubscriptionPlans.find((p) => p.id === planId)
    if (!plan) throw new Error("Plan not found")

    const subscription: Subscription = {
      id: generateId(),
      customerId,
      planId,
      plan,
      status: "active",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: futureDate(30).toISOString(),
      nextBillingDate: futureDate(30).toISOString(),
      items: [],
      createdAt: new Date().toISOString(),
    }

    const subs = mockSubscriptions.get(customerId) || []
    subs.push(subscription)
    mockSubscriptions.set(customerId, subs)

    return subscription
  },

  async pauseSubscription(subscriptionId: string, until?: string): Promise<Subscription> {
    await mockDelay(400)
    // Find and update subscription
    for (const subs of Array.from(mockSubscriptions.values())) {
      const sub = subs.find((s: Subscription) => s.id === subscriptionId)
      if (sub) {
        sub.status = "paused"
        sub.pausedAt = new Date().toISOString()
        sub.pausedUntil = until
        return sub
      }
    }
    throw new Error("Subscription not found")
  },

  async cancelSubscription(subscriptionId: string): Promise<Subscription> {
    await mockDelay(400)
    for (const subs of Array.from(mockSubscriptions.values())) {
      const sub = subs.find((s: Subscription) => s.id === subscriptionId)
      if (sub) {
        sub.status = "cancelled"
        sub.cancelledAt = new Date().toISOString()
        return sub
      }
    }
    throw new Error("Subscription not found")
  },

  // ========== BOOKINGS ==========
  async getServices(category?: string): Promise<ServiceProduct[]> {
    await mockDelay(300)
    if (category) {
      return mockServices.filter((s) => s.category === category)
    }
    return mockServices
  },

  async getService(handle: string): Promise<ServiceProduct | null> {
    await mockDelay(200)
    return mockServices.find((s) => s.handle === handle) || null
  },

  async getProviders(serviceId?: string): Promise<ServiceProvider[]> {
    await mockDelay(300)
    return mockProviders
  },

  async getProvider(providerId: string): Promise<ServiceProvider | null> {
    await mockDelay(200)
    return mockProviders.find((p) => p.id === providerId) || null
  },

  async getAvailableSlots(
    serviceId: string,
    date: string,
    providerId?: string
  ): Promise<BookingSlot[]> {
    await mockDelay(400)

    const slots: BookingSlot[] = []
    const baseDate = new Date(date)

    // Generate slots from 9am to 5pm
    for (let hour = 9; hour < 17; hour++) {
      const startTime = new Date(baseDate)
      startTime.setHours(hour, 0, 0, 0)

      const endTime = new Date(startTime)
      endTime.setHours(hour + 1)

      slots.push({
        id: generateId(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        available: Math.random() > 0.3,
        providerId: providerId || mockProviders[0].id,
        providerName: providerId
          ? mockProviders.find((p) => p.id === providerId)?.name
          : mockProviders[0].name,
      })
    }

    return slots
  },

  async getBookings(customerId: string): Promise<Booking[]> {
    await mockDelay(300)

    if (!mockBookings.has(customerId)) {
      const booking: Booking = {
        id: generateId(),
        customerId,
        serviceId: mockServices[0].id,
        serviceName: mockServices[0].title,
        providerId: mockProviders[0].id,
        providerName: mockProviders[0].name,
        status: "confirmed",
        startTime: futureDate(7).toISOString(),
        endTime: futureDate(7).toISOString(),
        participants: 1,
        price: mockServices[0].price,
        currency: "USD",
        createdAt: pastDate(3).toISOString(),
      }
      mockBookings.set(customerId, [booking])
    }

    return mockBookings.get(customerId)!
  },

  async createBooking(data: {
    customerId: string
    serviceId: string
    providerId?: string
    slotId: string
    participants: number
    notes?: string
  }): Promise<Booking> {
    await mockDelay(600)

    const service = mockServices.find((s) => s.id === data.serviceId)
    const provider = data.providerId
      ? mockProviders.find((p) => p.id === data.providerId)
      : undefined

    const booking: Booking = {
      id: generateId(),
      customerId: data.customerId,
      serviceId: data.serviceId,
      serviceName: service?.title || "Service",
      providerId: data.providerId,
      providerName: provider?.name,
      status: "pending",
      startTime: futureDate(7).toISOString(),
      endTime: futureDate(7).toISOString(),
      participants: data.participants,
      price: (service?.price || 0) * data.participants,
      currency: "USD",
      notes: data.notes,
      createdAt: new Date().toISOString(),
    }

    const bookings = mockBookings.get(data.customerId) || []
    bookings.push(booking)
    mockBookings.set(data.customerId, bookings)

    return booking
  },

  async cancelBooking(bookingId: string): Promise<Booking> {
    await mockDelay(400)
    for (const bookings of Array.from(mockBookings.values())) {
      const booking = bookings.find((b: Booking) => b.id === bookingId)
      if (booking) {
        booking.status = "cancelled"
        return booking
      }
    }
    throw new Error("Booking not found")
  },

  // ========== REVIEWS ==========
  async getProductReviews(
    productId: string,
    options?: { limit?: number; offset?: number; sort?: "newest" | "helpful" | "rating" }
  ): Promise<{ reviews: ProductReview[]; total: number }> {
    await mockDelay(300)

    let reviews = mockProductReviews.filter((r) => r.productId === productId)

    if (options?.sort === "newest") {
      reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (options?.sort === "helpful") {
      reviews.sort((a, b) => b.helpful - a.helpful)
    } else if (options?.sort === "rating") {
      reviews.sort((a, b) => b.rating - a.rating)
    }

    const total = reviews.length
    const offset = options?.offset || 0
    const limit = options?.limit || 10

    reviews = reviews.slice(offset, offset + limit)

    return { reviews, total }
  },

  async getReviewStats(productId: string): Promise<ReviewStats> {
    await mockDelay(200)

    const reviews = mockProductReviews.filter((r) => r.productId === productId)
    const total = reviews.length

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    let sum = 0

    reviews.forEach((r) => {
      distribution[r.rating as keyof typeof distribution]++
      sum += r.rating
    })

    return {
      productId,
      averageRating: total > 0 ? Math.round((sum / total) * 10) / 10 : 0,
      totalReviews: total,
      ratingDistribution: distribution,
      recommendationRate: 85, // Mock value
    }
  },

  async createReview(data: {
    productId: string
    customerId: string
    customerName: string
    orderId?: string
    rating: number
    title: string
    content: string
    pros?: string[]
    cons?: string[]
    images?: string[]
  }): Promise<ProductReview> {
    await mockDelay(500)

    const review: ProductReview = {
      id: generateId(),
      ...data,
      verified: !!data.orderId,
      helpful: 0,
      createdAt: new Date().toISOString(),
    }

    mockProductReviews.push(review)
    return review
  },

  async markReviewHelpful(reviewId: string): Promise<{ helpful: number }> {
    await mockDelay(200)
    const review = mockProductReviews.find((r) => r.id === reviewId)
    if (review) {
      review.helpful++
      return { helpful: review.helpful }
    }
    throw new Error("Review not found")
  },

  // ========== WISHLISTS ==========
  async getWishlists(customerId: string): Promise<Wishlist[]> {
    await mockDelay(300)

    if (!mockWishlists.has(customerId)) {
      const defaultWishlist: Wishlist = {
        id: generateId(),
        customerId,
        name: "My Wishlist",
        isDefault: true,
        isPublic: false,
        items: [
          {
            id: generateId(),
            productId: "prod_1",
            productTitle: "Sample Product",
            productImage: "https://placehold.co/400x400?text=Product",
            price: 49.99,
            currency: "USD",
            addedAt: pastDate(7).toISOString(),
            inStock: true,
          },
        ],
        createdAt: pastDate(30).toISOString(),
      }
      mockWishlists.set(customerId, [defaultWishlist])
    }

    return mockWishlists.get(customerId)!
  },

  async createWishlist(
    customerId: string,
    name: string,
    isPublic: boolean = false
  ): Promise<Wishlist> {
    await mockDelay(400)

    const wishlist: Wishlist = {
      id: generateId(),
      customerId,
      name,
      isDefault: false,
      isPublic,
      shareToken: isPublic ? generateId() : undefined,
      items: [],
      createdAt: new Date().toISOString(),
    }

    const lists = mockWishlists.get(customerId) || []
    lists.push(wishlist)
    mockWishlists.set(customerId, lists)

    return wishlist
  },

  async addToWishlist(
    wishlistId: string,
    item: Omit<WishlistItem, "id" | "addedAt">
  ): Promise<WishlistItem> {
    await mockDelay(300)

    const wishlistItem: WishlistItem = {
      id: generateId(),
      ...item,
      addedAt: new Date().toISOString(),
    }

    for (const lists of Array.from(mockWishlists.values())) {
      const list = lists.find((l: Wishlist) => l.id === wishlistId)
      if (list) {
        list.items.push(wishlistItem)
        return wishlistItem
      }
    }

    throw new Error("Wishlist not found")
  },

  async removeFromWishlist(wishlistId: string, itemId: string): Promise<void> {
    await mockDelay(300)

    for (const lists of Array.from(mockWishlists.values())) {
      const list = lists.find((l: Wishlist) => l.id === wishlistId)
      if (list) {
        list.items = list.items.filter((i: WishlistItem) => i.id !== itemId)
        return
      }
    }
  },

  async getSharedWishlist(shareToken: string): Promise<Wishlist | null> {
    await mockDelay(300)

    for (const lists of Array.from(mockWishlists.values())) {
      const list = lists.find((l: Wishlist) => l.shareToken === shareToken && l.isPublic)
      if (list) return list
    }

    return null
  },
}
