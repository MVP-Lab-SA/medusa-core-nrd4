/**
 * Marketplace Mock Service
 * Vendor, B2B, Subscriptions, Bookings, Reviews
 * (Medusa extensions that aren't built-in)
 */

import { generateId, mockDelay, pastDate, futureDate } from "./helpers"

// ==================== TYPES ====================

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
  customerAvatar?: string
  rating: number
  title: string
  content: string
  createdAt: string
  helpful: number
}

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
  days: number
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
  image?: string
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

export interface ServiceProduct {
  id: string
  handle: string
  title: string
  description: string
  duration: number
  price: number
  currency: string
  images: string[]
  providerId?: string
  category: string
  bufferTime: number
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
  dayOfWeek: number
  startTime: string
  endTime: string
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

export interface ProductReview {
  id: string
  productId: string
  customerId: string
  customerName: string
  customerAvatar?: string
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

export interface Bundle {
  id: string
  handle: string
  name: string
  description: string
  image: string
  products: BundleProduct[]
  originalPrice: number
  bundlePrice: number
  savings: number
  savingsPercent: number
  currency: string
  stock: number
  featured: boolean
}

export interface BundleProduct {
  id: string
  productId: string
  title: string
  image: string
  quantity: number
  price: number
}

export interface FlashSale {
  id: string
  name: string
  description: string
  image: string
  startTime: string
  endTime: string
  discountPercent: number
  products: FlashSaleProduct[]
  status: "upcoming" | "active" | "ended"
}

export interface FlashSaleProduct {
  id: string
  productId: string
  title: string
  image: string
  originalPrice: number
  salePrice: number
  stock: number
  sold: number
  limit: number
}

export interface ReferralProgram {
  id: string
  name: string
  description: string
  rewardType: "credit" | "discount" | "points"
  referrerReward: number
  refereeReward: number
  currency: string
  termsUrl: string
  active: boolean
}

export interface Referral {
  id: string
  referrerId: string
  refereeId: string
  refereeName: string
  refereeEmail: string
  status: "pending" | "signed_up" | "first_purchase" | "rewarded"
  rewardAmount: number
  rewardCurrency: string
  createdAt: string
  convertedAt?: string
  rewardedAt?: string
}

// ==================== SEEDED DATA ====================

// Generated Images
const IMAGES = {
  vendors: {
    techNova: {
      owner: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQ2GCR6H6M1PN85JGD486-01KGYZQ2GCYQK341DS9TYYEJNS.jpeg",
      logo: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQ3GM66A0R0VMC2R67QD5-01KGYZQ3GMZK45K36QW7RXF4KP.jpeg",
    },
    smartLiving: {
      owner: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQ4PJT3EN4A0QCKC3NC2X-01KGYZQ4PK2829XCMB8X19PFDX.jpeg",
      logo: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQ678ZYMSXM0JP1MTJRTK-01KGYZQ678ENE7X60HNDE9V8T1.jpeg",
    },
    secureGuard: {
      owner: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQBSMRXYZK1MEHXGYYRYJ-01KGYZQBSMYQW16EDS7XJWFT8R.jpeg",
      logo: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQ82GKWEB4XHE3XTM7A0E-01KGYZQ82GWHP58F970BG2WNP3.jpeg",
    },
  },
  services: {
    installation: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQNCHHES603SQZGZ202RK-01KGYZQNCHW5QT8S1A382HGRS0.jpeg",
    consultation: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQJY3NTFPBJNJMSR1NKB8-01KGYZQJY313PMD98EHKV0SWN9.jpeg",
    network: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQNSY2ANK0BV09RHAKKYD-01KGYZQNSY3GPSSPB2QRHX52Z5.jpeg",
  },
  providers: {
    mike: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR8XWDDHKMDVHN10ES67B-01KGYZR8XW8B7JC8MDPGP2JVZB.jpeg",
    sarah: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR9T51NKQSMKQ717QY05N-01KGYZR9T5W7ABVAHR6VESAWH2.jpeg",
    david: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZRAKFH6RKHBGYCKF21Q6S-01KGYZRAKF3TW85RT2DYHXGWQE.jpeg",
  },
  subscriptions: {
    box: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR0ZEFNT3CYGMNWEN3GKA-01KGYZR0ZEVGBDW3MS1ZHF9RC.jpeg",
  },
  bundles: {
    smartHome: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR55S15ZZQWJ14CBPW7H6-01KGYZR55SWDFM62K7WG0M0FGC.jpeg",
    security: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR68BGBJN6KH7C2R68ZN7-01KGYZR68B3CX8JXKR27NWTXAS.jpeg",
  },
  flashSale: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR7KVXP1TMCA9CHCWABGW-01KGYZR7KVNKMVKKZV70DVX6N3.jpeg",
  products: {
    enviroSense: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGWY7QZZSD11Q6YGTGT7HG8J-01KGWY7QZZS6Y8V88D8RXX6FHT.jpeg",
    secureDome: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGWY7V99P3YY500HV2TYV84R-01KGWY7V99QE807PDEXJTNZJDV.jpeg",
    lumiGrid: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGWY7T0J6F0RK4FFSSHBQNYV-01KGWY7T0K4DACMSRGNEYWQZDS.jpeg",
  },
}

// Vendors
const mockVendors: Vendor[] = [
  {
    id: "vendor_technova",
    handle: "technova-electronics",
    name: "TechNova Electronics",
    description: "Leading provider of cutting-edge smart home technology and IoT devices. We specialize in environmental sensors, automation systems, and connected home solutions that make your life easier and more efficient.",
    logo: IMAGES.vendors.techNova.logo,
    banner: IMAGES.services.installation,
    rating: 4.9,
    reviewCount: 2847,
    productCount: 156,
    followerCount: 12450,
    verified: true,
    joinedAt: pastDate(730).toISOString(),
    categories: ["Smart Home", "Sensors", "Automation"],
    policies: {
      shipping: "Free shipping on orders over $75. Express delivery available.",
      returns: "30-day hassle-free returns. Free return shipping on defective items.",
    },
    contact: {
      email: "support@technova.com",
      phone: "+1 (555) 123-4567",
    },
  },
  {
    id: "vendor_smartliving",
    handle: "smart-living-co",
    name: "Smart Living Co.",
    description: "Transform your home into an intelligent living space. We offer premium smart lighting, climate control, and home automation products designed for seamless integration and energy efficiency.",
    logo: IMAGES.vendors.smartLiving.logo,
    banner: IMAGES.services.consultation,
    rating: 4.7,
    reviewCount: 1923,
    productCount: 89,
    followerCount: 8760,
    verified: true,
    joinedAt: pastDate(540).toISOString(),
    categories: ["Lighting", "Climate Control", "Energy"],
    policies: {
      shipping: "Standard shipping 3-5 business days. Expedited options available.",
      returns: "45-day return policy with original packaging.",
    },
    contact: {
      email: "hello@smartliving.co",
      phone: "+1 (555) 987-6543",
    },
  },
  {
    id: "vendor_secureguard",
    handle: "secureguard-systems",
    name: "SecureGuard Systems",
    description: "Professional-grade security solutions for homes and businesses. Our products include advanced surveillance cameras, smart locks, alarm systems, and 24/7 monitoring services.",
    logo: IMAGES.vendors.secureGuard.logo,
    banner: IMAGES.services.network,
    rating: 4.8,
    reviewCount: 3156,
    productCount: 67,
    followerCount: 15230,
    verified: true,
    joinedAt: pastDate(1095).toISOString(),
    categories: ["Security", "Surveillance", "Access Control"],
    policies: {
      shipping: "Free shipping on all orders. White-glove installation available.",
      returns: "60-day satisfaction guarantee. Extended warranty options.",
    },
    contact: {
      email: "security@secureguard.com",
      phone: "+1 (555) 911-SAFE",
    },
  },
]

// Vendor Reviews
const mockVendorReviews: VendorReview[] = [
  {
    id: "vr_1",
    vendorId: "vendor_technova",
    customerId: "cust_1",
    customerName: "Michael Chen",
    customerAvatar: IMAGES.vendors.techNova.owner,
    rating: 5,
    title: "Exceptional quality and service!",
    content: "I've ordered multiple times from TechNova and they never disappoint. Products arrive well-packaged, work flawlessly, and their customer support is top-notch. Highly recommend!",
    createdAt: pastDate(7).toISOString(),
    helpful: 47,
  },
  {
    id: "vr_2",
    vendorId: "vendor_technova",
    customerId: "cust_2",
    customerName: "Sarah Williams",
    customerAvatar: IMAGES.providers.sarah,
    rating: 5,
    title: "Best smart home vendor",
    content: "TechNova has the best selection of smart home products. Their EnviroSense sensors have transformed how I monitor my home. Fast shipping and great prices!",
    createdAt: pastDate(14).toISOString(),
    helpful: 32,
  },
  {
    id: "vr_3",
    vendorId: "vendor_smartliving",
    customerId: "cust_3",
    customerName: "James Rodriguez",
    rating: 4,
    title: "Great products, slight shipping delay",
    content: "Love the LumiGrid lights - they're exactly what I needed for my smart home setup. Shipping took a bit longer than expected but the quality made up for it.",
    createdAt: pastDate(21).toISOString(),
    helpful: 18,
  },
  {
    id: "vr_4",
    vendorId: "vendor_secureguard",
    customerId: "cust_4",
    customerName: "Emily Thompson",
    rating: 5,
    title: "Peace of mind delivered",
    content: "SecureGuard's cameras and sensors have given me complete peace of mind. Easy setup, crystal clear video, and their app is intuitive. Worth every penny!",
    createdAt: pastDate(5).toISOString(),
    helpful: 56,
  },
]

// Subscription Plans
const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan_starter",
    name: "Smart Home Starter",
    description: "Perfect for beginners. Get a curated selection of essential smart home devices delivered monthly.",
    price: 39.99,
    currency: "USD",
    interval: "monthly",
    features: [
      "2-3 smart devices monthly",
      "Free standard shipping",
      "10% off additional purchases",
      "Setup guides included",
      "Cancel anytime",
    ],
    discount: 15,
    active: true,
    image: IMAGES.subscriptions.box,
  },
  {
    id: "plan_pro",
    name: "Smart Home Pro",
    description: "For the serious smart home enthusiast. Premium devices and exclusive early access to new products.",
    price: 89.99,
    currency: "USD",
    interval: "monthly",
    features: [
      "4-5 premium devices monthly",
      "Free express shipping",
      "25% off all store purchases",
      "Early access to new products",
      "Priority customer support",
      "Exclusive member events",
    ],
    discount: 25,
    trialDays: 14,
    active: true,
    image: IMAGES.bundles.smartHome,
  },
  {
    id: "plan_enterprise",
    name: "Business Annual",
    description: "Complete smart building solution for businesses. Includes installation and dedicated support.",
    price: 999.99,
    currency: "USD",
    interval: "yearly",
    features: [
      "Full smart building kit",
      "Professional installation",
      "Dedicated account manager",
      "24/7 priority support",
      "Quarterly hardware upgrades",
      "Staff training included",
      "Extended 3-year warranty",
    ],
    discount: 35,
    active: true,
    image: IMAGES.bundles.security,
  },
]

// Bundles
const mockBundles: Bundle[] = [
  {
    id: "bundle_1",
    handle: "smart-home-starter-kit",
    name: "Smart Home Starter Kit",
    description: "Everything you need to get started with home automation. Perfect for beginners looking to make their home smarter.",
    image: IMAGES.bundles.smartHome,
    products: [
      { id: "bp_1", productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6", title: "EnviroSense Pro X1", image: IMAGES.products.enviroSense, quantity: 2, price: 129.99 },
      { id: "bp_2", productId: "prod_01KGWY8KH8SQ4PVHC0SCKKFRHZ", title: "LumiGrid Panel", image: IMAGES.products.lumiGrid, quantity: 4, price: 79.99 },
    ],
    originalPrice: 579.94,
    bundlePrice: 449.99,
    savings: 129.95,
    savingsPercent: 22,
    currency: "USD",
    stock: 50,
    featured: true,
  },
  {
    id: "bundle_2",
    handle: "security-essentials-pack",
    name: "Security Essentials Pack",
    description: "Complete home security solution with professional-grade cameras and sensors to keep your family safe.",
    image: IMAGES.bundles.security,
    products: [
      { id: "bp_3", productId: "prod_01KGWY8KH89M5P8FTGKKVGT9RN", title: "SecureDome 360", image: IMAGES.products.secureDome, quantity: 2, price: 249.99 },
      { id: "bp_4", productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6", title: "EnviroSense Pro X1", image: IMAGES.products.enviroSense, quantity: 3, price: 129.99 },
    ],
    originalPrice: 889.95,
    bundlePrice: 699.99,
    savings: 189.96,
    savingsPercent: 21,
    currency: "USD",
    stock: 30,
    featured: true,
  },
  {
    id: "bundle_3",
    handle: "whole-home-automation",
    name: "Whole Home Automation",
    description: "The complete smart home experience. Control lighting, security, and environment from anywhere.",
    image: IMAGES.services.installation,
    products: [
      { id: "bp_5", productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6", title: "EnviroSense Pro X1", image: IMAGES.products.enviroSense, quantity: 4, price: 129.99 },
      { id: "bp_6", productId: "prod_01KGWY8KH8SQ4PVHC0SCKKFRHZ", title: "LumiGrid Panel", image: IMAGES.products.lumiGrid, quantity: 8, price: 79.99 },
      { id: "bp_7", productId: "prod_01KGWY8KH89M5P8FTGKKVGT9RN", title: "SecureDome 360", image: IMAGES.products.secureDome, quantity: 2, price: 249.99 },
    ],
    originalPrice: 1659.86,
    bundlePrice: 1299.99,
    savings: 359.87,
    savingsPercent: 22,
    currency: "USD",
    stock: 15,
    featured: false,
  },
]

// Flash Sales
const mockFlashSales: FlashSale[] = [
  {
    id: "flash_1",
    name: "Weekend Smart Home Blitz",
    description: "48-hour flash sale on our most popular smart home devices. Don't miss these incredible deals!",
    image: IMAGES.flashSale,
    startTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
    discountPercent: 30,
    products: [
      { id: "fsp_1", productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6", title: "EnviroSense Pro X1", image: IMAGES.products.enviroSense, originalPrice: 129.99, salePrice: 90.99, stock: 100, sold: 67, limit: 2 },
      { id: "fsp_2", productId: "prod_01KGWY8KH8SQ4PVHC0SCKKFRHZ", title: "LumiGrid Panel", image: IMAGES.products.lumiGrid, originalPrice: 79.99, salePrice: 55.99, stock: 200, sold: 145, limit: 5 },
    ],
    status: "active",
  },
  {
    id: "flash_2",
    name: "Security Camera Clearance",
    description: "Limited time offer on security cameras. Protect your home for less!",
    image: IMAGES.bundles.security,
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    discountPercent: 25,
    products: [
      { id: "fsp_3", productId: "prod_01KGWY8KH89M5P8FTGKKVGT9RN", title: "SecureDome 360", image: IMAGES.products.secureDome, originalPrice: 249.99, salePrice: 187.49, stock: 50, sold: 0, limit: 2 },
    ],
    status: "upcoming",
  },
]

// Referral Program
const mockReferralProgram: ReferralProgram = {
  id: "ref_program_1",
  name: "Smart Friends Rewards",
  description: "Share the smart home love! Give your friends $25 off their first order and earn $25 in store credit when they make a purchase.",
  rewardType: "credit",
  referrerReward: 25,
  refereeReward: 25,
  currency: "USD",
  termsUrl: "/terms/referral-program",
  active: true,
}

// Referrals
const mockReferrals: Referral[] = [
  {
    id: "ref_1",
    referrerId: "cust_demo",
    refereeId: "cust_friend_1",
    refereeName: "Alex Johnson",
    refereeEmail: "alex.j@example.com",
    status: "rewarded",
    rewardAmount: 25,
    rewardCurrency: "USD",
    createdAt: pastDate(30).toISOString(),
    convertedAt: pastDate(28).toISOString(),
    rewardedAt: pastDate(25).toISOString(),
  },
  {
    id: "ref_2",
    referrerId: "cust_demo",
    refereeId: "cust_friend_2",
    refereeName: "Maria Garcia",
    refereeEmail: "maria.g@example.com",
    status: "first_purchase",
    rewardAmount: 25,
    rewardCurrency: "USD",
    createdAt: pastDate(14).toISOString(),
    convertedAt: pastDate(10).toISOString(),
  },
  {
    id: "ref_3",
    referrerId: "cust_demo",
    refereeId: "",
    refereeName: "",
    refereeEmail: "pending@example.com",
    status: "pending",
    rewardAmount: 25,
    rewardCurrency: "USD",
    createdAt: pastDate(3).toISOString(),
  },
]

// Services
const mockServices: ServiceProduct[] = [
  {
    id: "service_installation",
    handle: "smart-home-installation",
    title: "Smart Home Installation",
    description: "Professional installation service for all your smart home devices. Our certified technicians will set up, configure, and integrate your devices for optimal performance. Includes network optimization and user training.",
    duration: 120,
    price: 199,
    currency: "USD",
    images: [IMAGES.services.installation],
    category: "Installation",
    bufferTime: 30,
    maxParticipants: 1,
  },
  {
    id: "service_consultation",
    handle: "security-consultation",
    title: "Security System Consultation",
    description: "One-on-one consultation with our security experts. We'll assess your property, identify vulnerabilities, and create a customized security plan tailored to your needs and budget.",
    duration: 60,
    price: 99,
    currency: "USD",
    images: [IMAGES.services.consultation],
    category: "Consultation",
    bufferTime: 15,
    maxParticipants: 2,
  },
  {
    id: "service_network",
    handle: "network-setup",
    title: "Network Infrastructure Setup",
    description: "Complete network infrastructure setup for smart homes and businesses. Includes router configuration, mesh network installation, and IoT device optimization for maximum coverage and speed.",
    duration: 180,
    price: 349,
    currency: "USD",
    images: [IMAGES.services.network],
    category: "Installation",
    bufferTime: 30,
    maxParticipants: 1,
  },
]

// Service Providers
const mockProviders: ServiceProvider[] = [
  {
    id: "provider_mike",
    name: "Mike Anderson",
    description: "Senior Installation Technician with 8+ years of experience in smart home systems. Certified by Google, Amazon, and Apple for their respective smart home ecosystems.",
    avatar: IMAGES.providers.mike,
    specialties: ["Smart Home Installation", "Network Setup", "Automation"],
    rating: 4.9,
    reviewCount: 312,
    availability: [
      { id: "av_1", providerId: "provider_mike", dayOfWeek: 1, startTime: "08:00", endTime: "17:00" },
      { id: "av_2", providerId: "provider_mike", dayOfWeek: 2, startTime: "08:00", endTime: "17:00" },
      { id: "av_3", providerId: "provider_mike", dayOfWeek: 3, startTime: "08:00", endTime: "17:00" },
      { id: "av_4", providerId: "provider_mike", dayOfWeek: 4, startTime: "08:00", endTime: "17:00" },
      { id: "av_5", providerId: "provider_mike", dayOfWeek: 5, startTime: "08:00", endTime: "15:00" },
    ],
  },
  {
    id: "provider_sarah",
    name: "Sarah Mitchell",
    description: "Security Systems Specialist with background in enterprise security. Expert in surveillance systems, access control, and home security integration.",
    avatar: IMAGES.providers.sarah,
    specialties: ["Security Consultation", "Surveillance Setup", "Access Control"],
    rating: 4.8,
    reviewCount: 245,
    availability: [
      { id: "av_6", providerId: "provider_sarah", dayOfWeek: 1, startTime: "09:00", endTime: "18:00" },
      { id: "av_7", providerId: "provider_sarah", dayOfWeek: 2, startTime: "09:00", endTime: "18:00" },
      { id: "av_8", providerId: "provider_sarah", dayOfWeek: 3, startTime: "09:00", endTime: "18:00" },
      { id: "av_9", providerId: "provider_sarah", dayOfWeek: 4, startTime: "09:00", endTime: "18:00" },
      { id: "av_10", providerId: "provider_sarah", dayOfWeek: 6, startTime: "10:00", endTime: "14:00" },
    ],
  },
  {
    id: "provider_david",
    name: "David Chen",
    description: "Network Infrastructure Expert specializing in smart building technology. Former IT director with extensive experience in commercial and residential deployments.",
    avatar: IMAGES.providers.david,
    specialties: ["Network Setup", "Commercial Installation", "System Integration"],
    rating: 4.9,
    reviewCount: 189,
    availability: [
      { id: "av_11", providerId: "provider_david", dayOfWeek: 2, startTime: "07:00", endTime: "16:00" },
      { id: "av_12", providerId: "provider_david", dayOfWeek: 3, startTime: "07:00", endTime: "16:00" },
      { id: "av_13", providerId: "provider_david", dayOfWeek: 4, startTime: "07:00", endTime: "16:00" },
      { id: "av_14", providerId: "provider_david", dayOfWeek: 5, startTime: "07:00", endTime: "16:00" },
    ],
  },
]

// Product Reviews
const mockProductReviews: ProductReview[] = [
  {
    id: "review_1",
    productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6",
    customerId: "cust_1",
    customerName: "Robert Martinez",
    customerAvatar: IMAGES.providers.mike,
    orderId: "order_12345",
    rating: 5,
    title: "Game changer for home monitoring!",
    content: "The EnviroSense Pro X1 has completely transformed how I monitor my home environment. The accuracy of the sensors is incredible - I can see real-time temperature, humidity, and air quality data from anywhere. Setup took less than 10 minutes and the app is beautifully designed.",
    pros: ["Extremely accurate sensors", "Easy setup", "Great mobile app", "Long battery life"],
    cons: [],
    images: [IMAGES.products.enviroSense],
    verified: true,
    helpful: 89,
    createdAt: pastDate(5).toISOString(),
    response: {
      content: "Thank you for the wonderful review, Robert! We're thrilled the EnviroSense Pro X1 is exceeding your expectations. Don't forget to check out our automation features in the app!",
      createdAt: pastDate(4).toISOString(),
    },
  },
  {
    id: "review_2",
    productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6",
    customerId: "cust_2",
    customerName: "Jennifer Lee",
    customerAvatar: IMAGES.providers.sarah,
    orderId: "order_12346",
    rating: 4,
    title: "Great device, minor app issues",
    content: "The hardware is fantastic and the readings are very precise. Had some initial connection issues with the app but customer support helped resolve it quickly. Would recommend for anyone serious about home monitoring.",
    pros: ["Precise readings", "Build quality", "Helpful support"],
    cons: ["Initial app connectivity issues"],
    verified: true,
    helpful: 45,
    createdAt: pastDate(12).toISOString(),
  },
  {
    id: "review_3",
    productId: "prod_01KGWY8KH89M5P8FTGKKVGT9RN",
    customerId: "cust_3",
    customerName: "Thomas Wright",
    customerAvatar: IMAGES.providers.david,
    orderId: "order_12347",
    rating: 5,
    title: "Best security camera I've owned",
    content: "The SecureDome 360 offers incredible coverage and the night vision is crystal clear. I can monitor my entire property from a single camera. The AI motion detection actually works - no more false alerts from cats or cars driving by!",
    pros: ["360-degree coverage", "Excellent night vision", "Smart AI detection", "Easy installation"],
    cons: [],
    images: [IMAGES.products.secureDome],
    verified: true,
    helpful: 124,
    createdAt: pastDate(8).toISOString(),
  },
  {
    id: "review_4",
    productId: "prod_01KGWY8KH8SQ4PVHC0SCKKFRHZ",
    customerId: "cust_4",
    customerName: "Amanda Foster",
    orderId: "order_12348",
    rating: 5,
    title: "Perfect lighting for any mood",
    content: "LumiGrid has transformed my home lighting. The colors are vibrant, dimming is smooth, and it integrates perfectly with my existing smart home setup. I love being able to set different scenes for different times of day.",
    pros: ["Vibrant colors", "Smooth dimming", "Great integration", "Energy efficient"],
    cons: [],
    images: [IMAGES.products.lumiGrid],
    verified: true,
    helpful: 67,
    createdAt: pastDate(3).toISOString(),
  },
  {
    id: "review_5",
    productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6",
    customerId: "cust_5",
    customerName: "Daniel Kim",
    rating: 5,
    title: "Worth every penny",
    content: "As someone who suffers from allergies, being able to monitor air quality in real-time has been invaluable. The EnviroSense alerts me when pollen or pollutant levels rise so I can take action. Excellent product!",
    pros: ["Air quality monitoring", "Timely alerts", "Health benefits"],
    cons: [],
    verified: false,
    helpful: 38,
    createdAt: pastDate(15).toISOString(),
  },
]

// B2B Mock Companies
const mockCompanyData: Company = {
  id: "company_acme",
  name: "Acme Corporation",
  taxId: "12-3456789",
  industry: "Technology",
  size: "large",
  status: "approved",
  creditLimit: 50000,
  currentCredit: 12500,
  paymentTerms: {
    id: "terms_net30",
    name: "Net 30",
    days: 30,
    discount: { percentage: 2, withinDays: 10 },
  },
  users: [
    {
      id: "user_1",
      companyId: "company_acme",
      customerId: "cust_corp_1",
      name: "John Smith",
      email: "john.smith@acme.com",
      role: "admin",
      status: "active",
    },
    {
      id: "user_2",
      companyId: "company_acme",
      customerId: "cust_corp_2",
      name: "Lisa Johnson",
      email: "lisa.johnson@acme.com",
      role: "buyer",
      spendingLimit: 5000,
      status: "active",
    },
    {
      id: "user_3",
      companyId: "company_acme",
      customerId: "cust_corp_3",
      name: "Mark Davis",
      email: "mark.davis@acme.com",
      role: "approver",
      status: "active",
    },
  ],
  createdAt: pastDate(365).toISOString(),
}

// Mock Quotes
const mockQuoteData: Quote[] = [
  {
    id: "quote_001",
    companyId: "company_acme",
    requestedBy: "Lisa Johnson",
    status: "quoted",
    items: [
      {
        id: "qi_1",
        productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6",
        variantId: "var_1",
        productTitle: "EnviroSense Pro X1",
        variantTitle: "Standard",
        quantity: 50,
        unitPrice: 159.99,
        totalPrice: 7999.50,
      },
      {
        id: "qi_2",
        productId: "prod_01KGWY8KH89M5P8FTGKKVGT9RN",
        variantId: "var_2",
        productTitle: "SecureDome 360",
        variantTitle: "Pro Edition",
        quantity: 25,
        unitPrice: 299.99,
        totalPrice: 7499.75,
      },
    ],
    subtotal: 15499.25,
    discount: 1549.93,
    total: 13949.32,
    validUntil: futureDate(14).toISOString(),
    notes: "Volume discount applied. Installation services available upon request.",
    createdAt: pastDate(3).toISOString(),
    quotedAt: pastDate(1).toISOString(),
  },
]

// Mock Purchase Orders
const mockPOData: PurchaseOrder[] = [
  {
    id: "po_001",
    companyId: "company_acme",
    quoteId: "quote_001",
    status: "processing",
    items: [
      {
        id: "poi_1",
        productId: "prod_01KGWY8KH8SQ4PVHC0SCKKFRHZ",
        variantId: "var_3",
        productTitle: "LumiGrid Smart Light",
        variantTitle: "4-Pack",
        quantity: 100,
        unitPrice: 79.99,
        totalPrice: 7999.00,
      },
    ],
    subtotal: 7999.00,
    tax: 799.90,
    total: 8798.90,
    shippingAddress: "123 Corporate Plaza, Suite 500, San Francisco, CA 94105",
    billingAddress: "123 Corporate Plaza, Suite 500, San Francisco, CA 94105",
    requestedBy: "Lisa Johnson",
    approvedBy: "Mark Davis",
    createdAt: pastDate(7).toISOString(),
  },
]

// Mock Approval Requests
const mockApprovalData: ApprovalRequest[] = [
  {
    id: "approval_001",
    type: "purchase_order",
    referenceId: "po_002",
    companyId: "company_acme",
    requestedBy: "Lisa Johnson",
    status: "pending",
    amount: 12500,
    notes: "Urgent order for new office expansion",
    createdAt: pastDate(1).toISOString(),
  },
  {
    id: "approval_002",
    type: "quote",
    referenceId: "quote_002",
    companyId: "company_acme",
    requestedBy: "Lisa Johnson",
    status: "pending",
    amount: 25000,
    notes: "Annual supply contract renewal",
    createdAt: pastDate(2).toISOString(),
  },
]

// Mock Storage
const mockSubscriptions: Map<string, Subscription[]> = new Map()
const mockBookings: Map<string, Booking[]> = new Map()
const mockWishlists: Map<string, Wishlist[]> = new Map()

// ==================== API FUNCTIONS ====================

export const marketplaceService = {
  // ========== VENDORS ==========
  async getVendors(options?: { category?: string; limit?: number }): Promise<Vendor[]> {
    await mockDelay(300)
    let vendors = [...mockVendors]
    if (options?.category) {
      vendors = vendors.filter((v) => v.categories.some(c => c.toLowerCase().includes(options.category!.toLowerCase())))
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
    return mockVendorReviews.filter(r => r.vendorId === vendorId)
  },

  async followVendor(vendorId: string): Promise<{ following: boolean }> {
    await mockDelay(300)
    return { following: true }
  },

  // ========== B2B ==========
  async getCompany(customerId: string): Promise<Company | null> {
    await mockDelay(300)
    return mockCompanyData
  },

  async registerCompany(data: {
    name: string
    taxId: string
    industry: string
    size: Company["size"]
  }): Promise<Company> {
    await mockDelay(600)
    return {
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
  },

  async getQuotes(companyId: string): Promise<Quote[]> {
    await mockDelay(300)
    return mockQuoteData
  },

  async createQuote(companyId: string, items: Omit<QuoteItem, "id">[]): Promise<Quote> {
    await mockDelay(500)
    return {
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
  },

  async getPurchaseOrders(companyId: string): Promise<PurchaseOrder[]> {
    await mockDelay(300)
    return mockPOData
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
    return {
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
  },

  async getApprovalRequests(companyId: string): Promise<ApprovalRequest[]> {
    await mockDelay(300)
    return mockApprovalData
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
            productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6",
            variantId: "var_1",
            productTitle: "EnviroSense Pro X1",
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
      return mockServices.filter((s) => s.category.toLowerCase() === category.toLowerCase())
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

  async getAvailableSlots(serviceId: string, date: string, providerId?: string): Promise<BookingSlot[]> {
    await mockDelay(400)

    const slots: BookingSlot[] = []
    const baseDate = new Date(date)
    const provider = providerId ? mockProviders.find(p => p.id === providerId) : mockProviders[0]

    for (let hour = 8; hour < 18; hour++) {
      const startTime = new Date(baseDate)
      startTime.setHours(hour, 0, 0, 0)

      const endTime = new Date(startTime)
      endTime.setHours(hour + 1)

      slots.push({
        id: generateId(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        available: Math.random() > 0.3,
        providerId: provider?.id,
        providerName: provider?.name,
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
    const provider = data.providerId ? mockProviders.find((p) => p.id === data.providerId) : undefined

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

    const distribution = { 1: 0, 2: 1, 3: 2, 4: 8, 5: 15 }
    let sum = reviews.reduce((acc, r) => acc + r.rating, 0)

    return {
      productId,
      averageRating: total > 0 ? Math.round((sum / total) * 10) / 10 : 4.7,
      totalReviews: total || 26,
      ratingDistribution: distribution,
      recommendationRate: 94,
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
            productId: "prod_01KGWY8KH87T32KHV2W3NSG4Y6",
            productTitle: "EnviroSense Pro X1",
            productImage: IMAGES.products.enviroSense,
            price: 179.99,
            currency: "USD",
            addedAt: pastDate(7).toISOString(),
            inStock: true,
          },
          {
            id: generateId(),
            productId: "prod_01KGWY8KH89M5P8FTGKKVGT9RN",
            productTitle: "SecureDome 360",
            productImage: IMAGES.products.secureDome,
            price: 299.99,
            currency: "USD",
            addedAt: pastDate(14).toISOString(),
            inStock: true,
          },
        ],
        createdAt: pastDate(30).toISOString(),
      }
      mockWishlists.set(customerId, [defaultWishlist])
    }

    return mockWishlists.get(customerId)!
  },

  async createWishlist(customerId: string, name: string, isPublic: boolean = false): Promise<Wishlist> {
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

  async addToWishlist(wishlistId: string, item: Omit<WishlistItem, "id" | "addedAt">): Promise<WishlistItem> {
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

  // ==================== BUNDLES ====================

  async getBundles(): Promise<Bundle[]> {
    await mockDelay(300)
    return mockBundles
  },

  async getBundle(handle: string): Promise<Bundle | null> {
    await mockDelay(200)
    return mockBundles.find((b) => b.handle === handle) || null
  },

  // ==================== FLASH SALES ====================

  async getFlashSales(): Promise<FlashSale[]> {
    await mockDelay(300)
    return mockFlashSales
  },

  async getFlashSale(id: string): Promise<FlashSale | null> {
    await mockDelay(200)
    return mockFlashSales.find((s) => s.id === id) || null
  },

  // ==================== REFERRALS ====================

  async getReferralProgram(): Promise<ReferralProgram> {
    await mockDelay(200)
    return mockReferralProgram
  },

  async getReferrals(customerId: string): Promise<Referral[]> {
    await mockDelay(300)
    return mockReferrals.filter((r) => r.referrerId === customerId)
  },
}
