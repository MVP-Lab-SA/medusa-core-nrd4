/**
 * Additional Commerce Business Models
 * Rentals, Memberships, Auctions, Donations, Pre-orders, Try Before You Buy, Consignment, Trade-In
 */

import { generateId, mockDelay, pastDate, futureDate } from "./helpers"

// ==================== IMAGE ASSETS ====================

const IMAGES = {
  rentals: {
    hero: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W3QFBBAMYG4PR8ETXTQN3-01KH0W3QFBKEAPG2ABVE2N8KNX.jpeg",
    securityCamera: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W484Q762BGTQ0A8Q9CRVF-01KH0W484R9PRJ6K9AECWV4Q2K.jpeg",
    smartDisplay: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W49D14M2E5E8CGJ7XQ7A5-01KH0W49D12CSFD1HPVMY6161G.jpeg",
  },
  memberships: {
    hero: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W3RNB6RVF7H9W0PNT1CFT-01KH0W3RNB940BTTVD7H44CDF6.jpeg",
    bronze: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W4AC9GJ39F3SA3Q1E4DBP-01KH0W4AC9AWNQVFNNVYARYBJ4.jpeg",
    silver: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W4BB1RV7R0EA53WR0Z721-01KH0W4BB1AMND1RH73SK0H708.jpeg",
    gold: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W4BYYJRW8CS3TSNPXWBWR-01KH0W4BYYNBH5AMVBNG7Z2YXK.jpeg",
    platinum: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W4DTSG3QASGPEBY8ZK076-01KH0W4DTS8N9BRX18RM2E6EC5.jpeg",
  },
  auctions: {
    hero: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W3TA67XGQ672JW1J8GMJV-01KH0W3TA79MF7F8JTDAFAZMND.jpeg",
  },
  donations: {
    hero: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W3VTJVM43BKTKNG50B4QC-01KH0W3VTJ7JD9MPPP2RD95GNT.jpeg",
  },
  preorders: {
    hero: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W3XGD8RSEM9VW6Y4NQ1FV-01KH0W3XGD4ATDKZFZ0ESKCQTK.jpeg",
    smartHub: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W4EG3RC1BMTN3C5B4WCMB-01KH0W4EG4CG8TGGG0EG71HYPG.jpeg",
    thermostat: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W4FCS1A84RYNQ28RA3RF3-01KH0W4FCSVTWBJ0TF0K7VCP0Q.jpeg",
  },
  tryBeforeYouBuy: {
    hero: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W3ZN17W4PT9HNKWVTDX02-01KH0W3ZN1Q4JRFES9PPD1BKV5.jpeg",
  },
  consignment: {
    hero: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W41E8ZEE2Y4SBKQ9TZZX1-01KH0W41E877RH364VR1R6P6FH.jpeg",
  },
  tradeIn: {
    hero: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W42DQWEGS6P26XJ9WYVAA-01KH0W42DQ2NCS7XRFXMCM5NDN.jpeg",
  },
}

// ==================== TYPES ====================

// ===== RENTALS =====
export interface RentalProduct {
  id: string
  handle: string
  title: string
  description: string
  images: string[]
  dailyRate: number
  weeklyRate: number
  monthlyRate: number
  currency: string
  deposit: number
  available: boolean
  stock: number
  category: string
  specifications: Record<string, string>
  includes: string[]
  terms: string[]
}

export interface Rental {
  id: string
  customerId: string
  productId: string
  product: RentalProduct
  status: "pending" | "active" | "returned" | "overdue" | "cancelled"
  startDate: string
  endDate: string
  returnedDate?: string
  duration: "daily" | "weekly" | "monthly"
  totalCost: number
  depositPaid: number
  depositReturned?: number
  currency: string
  notes?: string
  createdAt: string
}

// ===== MEMBERSHIPS =====
export interface MembershipTier {
  id: string
  handle: string
  name: string
  description: string
  image: string
  monthlyPrice: number
  annualPrice: number
  currency: string
  features: string[]
  benefits: MembershipBenefit[]
  exclusive: boolean
  popular?: boolean
  maxMembers?: number
  currentMembers: number
}

export interface MembershipBenefit {
  id: string
  name: string
  description: string
  type: "discount" | "access" | "service" | "product" | "priority"
  value?: number
}

export interface Membership {
  id: string
  customerId: string
  tierId: string
  tier: MembershipTier
  status: "active" | "paused" | "cancelled" | "expired"
  billingCycle: "monthly" | "annual"
  startDate: string
  currentPeriodEnd: string
  renewalDate: string
  autoRenew: boolean
  memberSince: string
  createdAt: string
}

// ===== AUCTIONS =====
export interface AuctionItem {
  id: string
  handle: string
  title: string
  description: string
  images: string[]
  category: string
  condition: "new" | "like_new" | "good" | "fair"
  startingPrice: number
  reservePrice?: number
  currentBid?: number
  buyNowPrice?: number
  currency: string
  startTime: string
  endTime: string
  status: "upcoming" | "active" | "ended" | "sold" | "unsold"
  bidCount: number
  watcherCount: number
  winnerId?: string
  sellerId: string
  sellerName: string
  shippingCost: number
  specifications: Record<string, string>
}

export interface Bid {
  id: string
  auctionId: string
  customerId: string
  customerName: string
  amount: number
  currency: string
  isWinning: boolean
  isAutoBid: boolean
  maxAutoBid?: number
  createdAt: string
}

// ===== DONATIONS / CROWDFUNDING =====
export interface Campaign {
  id: string
  handle: string
  title: string
  description: string
  longDescription: string
  images: string[]
  category: "charity" | "community" | "education" | "environment" | "innovation"
  goal: number
  raised: number
  currency: string
  backerCount: number
  status: "active" | "funded" | "ended" | "cancelled"
  startDate: string
  endDate: string
  organizer: {
    id: string
    name: string
    avatar?: string
    verified: boolean
  }
  rewards?: CampaignReward[]
  updates: CampaignUpdate[]
  featured: boolean
}

export interface CampaignReward {
  id: string
  title: string
  description: string
  minAmount: number
  currency: string
  image?: string
  available: number
  claimed: number
  estimatedDelivery?: string
}

export interface CampaignUpdate {
  id: string
  title: string
  content: string
  createdAt: string
}

export interface Donation {
  id: string
  customerId: string
  campaignId: string
  campaign: Campaign
  amount: number
  currency: string
  rewardId?: string
  reward?: CampaignReward
  anonymous: boolean
  message?: string
  status: "pending" | "completed" | "refunded"
  createdAt: string
}

// ===== PRE-ORDERS =====
export interface PreorderProduct {
  id: string
  handle: string
  title: string
  description: string
  longDescription: string
  images: string[]
  price: number
  depositAmount: number
  depositPercent: number
  currency: string
  releaseDate: string
  status: "announced" | "preorder_open" | "preorder_closed" | "shipping" | "released"
  totalSlots?: number
  remainingSlots?: number
  category: string
  features: string[]
  specifications: Record<string, string>
  faqs: { question: string; answer: string }[]
}

export interface Preorder {
  id: string
  customerId: string
  productId: string
  product: PreorderProduct
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "refunded"
  depositPaid: number
  remainingBalance: number
  totalPrice: number
  currency: string
  estimatedShipDate: string
  shippedDate?: string
  trackingNumber?: string
  queuePosition?: number
  createdAt: string
}

// ===== TRY BEFORE YOU BUY =====
export interface TrialProduct {
  id: string
  handle: string
  title: string
  description: string
  images: string[]
  price: number
  currency: string
  trialDays: number
  trialFee: number
  category: string
  available: boolean
  specifications: Record<string, string>
  returnPolicy: string
}

export interface Trial {
  id: string
  customerId: string
  productId: string
  product: TrialProduct
  status: "pending" | "shipped" | "in_trial" | "kept" | "returned" | "charged"
  trialStartDate?: string
  trialEndDate?: string
  returnByDate?: string
  decision?: "keep" | "return"
  shippedDate?: string
  returnedDate?: string
  chargedDate?: string
  trialFee: number
  productPrice: number
  amountCharged?: number
  currency: string
  trackingNumber?: string
  returnTrackingNumber?: string
  createdAt: string
}

// ===== CONSIGNMENT =====
export interface ConsignmentItem {
  id: string
  handle: string
  title: string
  description: string
  images: string[]
  category: string
  condition: "new" | "like_new" | "good" | "fair" | "poor"
  askingPrice: number
  listedPrice: number
  currency: string
  status: "pending_review" | "approved" | "listed" | "sold" | "returned" | "rejected"
  sellerId: string
  sellerName: string
  consignmentRate: number // percentage store takes
  payoutAmount: number
  listedDate?: string
  soldDate?: string
  specifications: Record<string, string>
  verificationStatus: "pending" | "verified" | "failed"
  verificationNotes?: string
  createdAt: string
}

export interface ConsignmentSeller {
  id: string
  customerId: string
  name: string
  email: string
  status: "pending" | "approved" | "suspended"
  totalItems: number
  soldItems: number
  totalEarnings: number
  pendingPayout: number
  currency: string
  rating?: number
  reviewCount: number
  joinedAt: string
}

// ===== TRADE-IN =====
export interface TradeInProgram {
  id: string
  handle: string
  title: string
  description: string
  image: string
  category: string
  eligibleProducts: string[]
  maxValue: number
  currency: string
  active: boolean
}

export interface TradeInItem {
  id: string
  programId: string
  program: TradeInProgram
  customerId: string
  productName: string
  productModel: string
  condition: "excellent" | "good" | "fair" | "poor"
  estimatedValue: number
  finalValue?: number
  currency: string
  status: "quote_pending" | "quote_received" | "shipped" | "inspected" | "completed" | "rejected" | "cancelled"
  images: string[]
  description: string
  shippingLabel?: string
  trackingNumber?: string
  creditIssued?: number
  creditExpiresAt?: string
  inspectionNotes?: string
  createdAt: string
}

// ==================== MOCK DATA ====================

// ===== RENTALS =====
const mockRentalProducts: RentalProduct[] = [
  {
    id: "rental_1",
    handle: "security-camera-rental",
    title: "SecureDome Pro Camera Rental",
    description: "4K outdoor security camera with night vision and AI motion detection. Perfect for events, construction sites, or temporary monitoring needs.",
    images: [IMAGES.rentals.securityCamera],
    dailyRate: 15,
    weeklyRate: 75,
    monthlyRate: 200,
    currency: "usd",
    deposit: 150,
    available: true,
    stock: 10,
    category: "Security",
    specifications: {
      "Resolution": "4K Ultra HD",
      "Night Vision": "Up to 100ft",
      "Storage": "Cloud + Local SD",
      "Connectivity": "WiFi + Ethernet",
    },
    includes: ["Camera unit", "Power adapter", "Mounting bracket", "Ethernet cable", "Quick start guide"],
    terms: ["Minimum 1-day rental", "Deposit refunded upon return in good condition", "Late returns charged at daily rate"],
  },
  {
    id: "rental_2",
    handle: "smart-display-rental",
    title: "LumiGrid Smart Display Rental",
    description: "10-inch smart display hub for home automation. Great for testing smart home setups or temporary installations.",
    images: [IMAGES.rentals.smartDisplay],
    dailyRate: 12,
    weeklyRate: 60,
    monthlyRate: 160,
    currency: "usd",
    deposit: 100,
    available: true,
    stock: 8,
    category: "Smart Home",
    specifications: {
      "Display": "10.1\" HD Touchscreen",
      "Voice Assistant": "Multi-platform compatible",
      "Connectivity": "WiFi, Bluetooth, Zigbee",
      "Speakers": "Stereo with smart sound",
    },
    includes: ["Display unit", "Power adapter", "Wall mount option", "Setup guide"],
    terms: ["Minimum 1-day rental", "Factory reset required before return", "Damage fees may apply"],
  },
  {
    id: "rental_3",
    handle: "smart-lock-rental",
    title: "EnviroSense Smart Lock Kit Rental",
    description: "Complete smart lock system with keypad and app control. Ideal for Airbnb hosts, property managers, or temporary access needs.",
    images: [IMAGES.rentals.hero],
    dailyRate: 10,
    weeklyRate: 50,
    monthlyRate: 120,
    currency: "usd",
    deposit: 200,
    available: true,
    stock: 15,
    category: "Security",
    specifications: {
      "Lock Type": "Deadbolt replacement",
      "Access Methods": "Code, App, Key, Fingerprint",
      "Battery Life": "Up to 12 months",
      "Codes": "Up to 250 unique codes",
    },
    includes: ["Smart lock unit", "Strike plate", "Installation hardware", "2 physical keys", "Batteries"],
    terms: ["Professional installation available", "Must return all components", "Re-keying fee if keys lost"],
  },
]

const mockRentals: Map<string, Rental[]> = new Map()

// ===== MEMBERSHIPS =====
const mockMembershipTiers: MembershipTier[] = [
  {
    id: "tier_bronze",
    handle: "bronze",
    name: "Bronze",
    description: "Essential smart home benefits for casual enthusiasts",
    image: IMAGES.memberships.bronze,
    monthlyPrice: 9.99,
    annualPrice: 99,
    currency: "usd",
    features: [
      "5% discount on all products",
      "Free standard shipping",
      "Member-only deals",
      "Priority email support",
    ],
    benefits: [
      { id: "b1", name: "Product Discount", description: "5% off all purchases", type: "discount", value: 5 },
      { id: "b2", name: "Free Shipping", description: "Free standard shipping on all orders", type: "service" },
      { id: "b3", name: "Exclusive Deals", description: "Access to member-only promotions", type: "access" },
    ],
    exclusive: false,
    currentMembers: 2847,
  },
  {
    id: "tier_silver",
    handle: "silver",
    name: "Silver",
    description: "Enhanced benefits for the connected home builder",
    image: IMAGES.memberships.silver,
    monthlyPrice: 19.99,
    annualPrice: 199,
    currency: "usd",
    features: [
      "10% discount on all products",
      "Free express shipping",
      "Early access to new products",
      "Priority phone support",
      "Free installation on one device/year",
      "Extended 2-year warranty",
    ],
    benefits: [
      { id: "s1", name: "Product Discount", description: "10% off all purchases", type: "discount", value: 10 },
      { id: "s2", name: "Express Shipping", description: "Free 2-day shipping on all orders", type: "service" },
      { id: "s3", name: "Early Access", description: "48-hour early access to new releases", type: "access" },
      { id: "s4", name: "Free Installation", description: "One free professional installation per year", type: "service" },
    ],
    exclusive: false,
    popular: true,
    currentMembers: 1523,
  },
  {
    id: "tier_gold",
    handle: "gold",
    name: "Gold",
    description: "Premium benefits for the smart home power user",
    image: IMAGES.memberships.gold,
    monthlyPrice: 39.99,
    annualPrice: 399,
    currency: "usd",
    features: [
      "15% discount on all products",
      "Free next-day shipping",
      "First access to limited editions",
      "Dedicated account manager",
      "Free installation on 3 devices/year",
      "Extended 3-year warranty",
      "Exclusive product bundles",
      "Beta testing opportunities",
    ],
    benefits: [
      { id: "g1", name: "Product Discount", description: "15% off all purchases", type: "discount", value: 15 },
      { id: "g2", name: "Next-Day Shipping", description: "Free next-day delivery", type: "service" },
      { id: "g3", name: "Dedicated Support", description: "Personal account manager", type: "priority" },
      { id: "g4", name: "Free Installations", description: "3 free professional installations per year", type: "service" },
      { id: "g5", name: "Beta Access", description: "Test new products before anyone else", type: "access" },
    ],
    exclusive: false,
    currentMembers: 842,
  },
  {
    id: "tier_platinum",
    handle: "platinum",
    name: "Platinum",
    description: "The ultimate smart home experience - by invitation only",
    image: IMAGES.memberships.platinum,
    monthlyPrice: 99.99,
    annualPrice: 999,
    currency: "usd",
    features: [
      "20% discount on all products",
      "Same-day shipping in select cities",
      "Exclusive limited edition access",
      "Personal smart home consultant",
      "Unlimited free installations",
      "Lifetime warranty on all purchases",
      "Annual smart home audit",
      "VIP event invitations",
      "Complimentary product replacements",
    ],
    benefits: [
      { id: "p1", name: "Product Discount", description: "20% off all purchases", type: "discount", value: 20 },
      { id: "p2", name: "Same-Day Delivery", description: "Same-day shipping in major cities", type: "service" },
      { id: "p3", name: "Personal Consultant", description: "Dedicated smart home expert", type: "priority" },
      { id: "p4", name: "Unlimited Installations", description: "Free professional installation anytime", type: "service" },
      { id: "p5", name: "Lifetime Warranty", description: "Full coverage on all member purchases", type: "service" },
      { id: "p6", name: "VIP Events", description: "Exclusive invitations to launches and events", type: "access" },
    ],
    exclusive: true,
    maxMembers: 100,
    currentMembers: 73,
  },
]

const mockMemberships: Map<string, Membership[]> = new Map()

// ===== AUCTIONS =====
const mockAuctions: AuctionItem[] = [
  {
    id: "auction_1",
    handle: "rare-prototype-hub",
    title: "Rare Prototype: First-Gen EnviroSense Hub",
    description: "Own a piece of smart home history. This is one of only 50 first-generation EnviroSense Hub prototypes ever made. Fully functional with original packaging and documentation.",
    images: [IMAGES.auctions.hero],
    category: "Collectibles",
    condition: "like_new",
    startingPrice: 500,
    reservePrice: 1000,
    currentBid: 750,
    buyNowPrice: 2500,
    currency: "usd",
    startTime: pastDate(2).toISOString(),
    endTime: futureDate(5).toISOString(),
    status: "active",
    bidCount: 12,
    watcherCount: 45,
    sellerId: "seller_1",
    sellerName: "TechCollector",
    shippingCost: 25,
    specifications: {
      "Serial Number": "ES-001-0023",
      "Year": "2019",
      "Condition": "Like New",
      "Original Box": "Yes",
    },
  },
  {
    id: "auction_2",
    handle: "limited-edition-camera-set",
    title: "Limited Edition SecureDome Camera Set (1 of 100)",
    description: "Complete set of 4 SecureDome cameras in exclusive matte black finish. Limited edition release with numbered certificate of authenticity.",
    images: [IMAGES.rentals.securityCamera],
    category: "Security",
    condition: "new",
    startingPrice: 800,
    currentBid: 1200,
    buyNowPrice: 2000,
    currency: "usd",
    startTime: pastDate(1).toISOString(),
    endTime: futureDate(3).toISOString(),
    status: "active",
    bidCount: 8,
    watcherCount: 32,
    sellerId: "seller_2",
    sellerName: "SmartHomeDeals",
    shippingCost: 0,
    specifications: {
      "Edition": "#47 of 100",
      "Finish": "Matte Black",
      "Certificate": "Included",
      "Warranty": "Extended 5-year",
    },
  },
  {
    id: "auction_3",
    handle: "smart-home-bundle-auction",
    title: "Complete Smart Home Starter Bundle",
    description: "Everything you need to get started with a smart home. Includes hub, 4 sensors, 2 cameras, smart lock, and thermostat. All new in original packaging.",
    images: [IMAGES.rentals.smartDisplay],
    category: "Bundles",
    condition: "new",
    startingPrice: 300,
    currentBid: 450,
    currency: "usd",
    startTime: new Date().toISOString(),
    endTime: futureDate(7).toISOString(),
    status: "active",
    bidCount: 5,
    watcherCount: 67,
    sellerId: "seller_3",
    sellerName: "HomeAutoPro",
    shippingCost: 15,
    specifications: {
      "Items": "10 devices total",
      "Retail Value": "$1,200+",
      "Compatibility": "All major platforms",
    },
  },
]

const mockBids: Map<string, Bid[]> = new Map([
  ["auction_1", [
    { id: "bid_1", auctionId: "auction_1", customerId: "cust_1", customerName: "John D.", amount: 750, currency: "usd", isWinning: true, isAutoBid: false, createdAt: pastDate(0.5).toISOString() },
    { id: "bid_2", auctionId: "auction_1", customerId: "cust_2", customerName: "Sarah M.", amount: 700, currency: "usd", isWinning: false, isAutoBid: true, maxAutoBid: 800, createdAt: pastDate(0.6).toISOString() },
    { id: "bid_3", auctionId: "auction_1", customerId: "cust_3", customerName: "Mike R.", amount: 650, currency: "usd", isWinning: false, isAutoBid: false, createdAt: pastDate(1).toISOString() },
  ]],
])

// ===== DONATIONS / CROWDFUNDING =====
const mockCampaigns: Campaign[] = [
  {
    id: "campaign_1",
    handle: "smart-home-education",
    title: "Smart Home Education for Seniors",
    description: "Help us teach seniors how to use smart home technology to live independently and safely.",
    longDescription: "Our mission is to bridge the digital divide by providing hands-on smart home education to seniors in our community. With your support, we'll conduct workshops, provide starter kits, and offer ongoing support to help seniors maintain independence through technology. Each $50 raised provides one senior with a complete workshop experience and starter kit.",
    images: [IMAGES.donations.hero],
    category: "education",
    goal: 25000,
    raised: 18750,
    currency: "usd",
    backerCount: 312,
    status: "active",
    startDate: pastDate(30).toISOString(),
    endDate: futureDate(30).toISOString(),
    organizer: {
      id: "org_1",
      name: "TechForAll Foundation",
      verified: true,
    },
    rewards: [
      { id: "r1", title: "Supporter", description: "Thank you email and name on our website", minAmount: 10, currency: "usd", available: 1000, claimed: 150 },
      { id: "r2", title: "Contributor", description: "Supporter rewards + exclusive project updates", minAmount: 25, currency: "usd", available: 500, claimed: 89 },
      { id: "r3", title: "Champion", description: "All above + branded t-shirt", minAmount: 50, currency: "usd", available: 200, claimed: 52, estimatedDelivery: "March 2025" },
      { id: "r4", title: "Hero", description: "All above + invitation to a workshop event", minAmount: 100, currency: "usd", available: 50, claimed: 21, estimatedDelivery: "April 2025" },
    ],
    updates: [
      { id: "u1", title: "We're 75% there!", content: "Thanks to your amazing support, we've reached 75% of our goal. We've already conducted 5 workshops!", createdAt: pastDate(5).toISOString() },
      { id: "u2", title: "Campaign Launch", content: "We're thrilled to launch our smart home education initiative. Thank you for being part of this journey.", createdAt: pastDate(30).toISOString() },
    ],
    featured: true,
  },
  {
    id: "campaign_2",
    handle: "eco-smart-homes",
    title: "Eco-Smart Homes Initiative",
    description: "Funding smart thermostats and energy monitors for low-income families to reduce energy costs.",
    longDescription: "High energy bills disproportionately affect low-income families. Our initiative provides smart thermostats and energy monitoring systems to help these families reduce their energy consumption by up to 30%, saving hundreds of dollars annually while reducing environmental impact.",
    images: [IMAGES.donations.hero],
    category: "environment",
    goal: 50000,
    raised: 32500,
    currency: "usd",
    backerCount: 489,
    status: "active",
    startDate: pastDate(45).toISOString(),
    endDate: futureDate(15).toISOString(),
    organizer: {
      id: "org_2",
      name: "Green Future Alliance",
      verified: true,
    },
    rewards: [
      { id: "e1", title: "Seed Planter", description: "Digital thank you card", minAmount: 15, currency: "usd", available: 2000, claimed: 234 },
      { id: "e2", title: "Tree Grower", description: "Seed Planter + monthly impact report", minAmount: 50, currency: "usd", available: 500, claimed: 156 },
      { id: "e3", title: "Forest Builder", description: "All above + eco-friendly smart plug", minAmount: 100, currency: "usd", available: 100, claimed: 78, estimatedDelivery: "February 2025" },
    ],
    updates: [
      { id: "eu1", title: "65% Funded!", content: "We've installed smart devices in 50 homes so far. The average family is saving $45/month!", createdAt: pastDate(10).toISOString() },
    ],
    featured: true,
  },
  {
    id: "campaign_3",
    handle: "community-safety-network",
    title: "Community Safety Network",
    description: "Creating a neighborhood-wide smart security network with shared monitoring.",
    longDescription: "Help us create a connected community safety network. We're installing shared security cameras at key neighborhood locations, creating a safer environment for everyone. Contributors get access to the community monitoring app.",
    images: [IMAGES.donations.hero],
    category: "community",
    goal: 15000,
    raised: 15000,
    currency: "usd",
    backerCount: 178,
    status: "funded",
    startDate: pastDate(60).toISOString(),
    endDate: pastDate(5).toISOString(),
    organizer: {
      id: "org_3",
      name: "Riverside Neighborhood Association",
      verified: true,
    },
    updates: [
      { id: "cu1", title: "Fully Funded!", content: "Thanks to all 178 backers, we've reached our goal! Installation begins next month.", createdAt: pastDate(5).toISOString() },
    ],
    featured: false,
  },
]

const mockDonations: Map<string, Donation[]> = new Map()

// ===== PRE-ORDERS =====
const mockPreorderProducts: PreorderProduct[] = [
  {
    id: "preorder_1",
    handle: "nexgen-hub-pro",
    title: "NexGen Hub Pro",
    description: "The future of smart home control. Our most advanced hub yet with AI-powered automation.",
    longDescription: "Introducing the NexGen Hub Pro - a revolutionary smart home hub featuring on-device AI processing, Matter 2.0 support, and seamless integration with over 10,000 devices. Pre-order now to be among the first to experience the next generation of home automation.",
    images: [IMAGES.preorders.smartHub],
    price: 399,
    depositAmount: 99,
    depositPercent: 25,
    currency: "usd",
    releaseDate: futureDate(90).toISOString(),
    status: "preorder_open",
    totalSlots: 1000,
    remainingSlots: 342,
    category: "Smart Hubs",
    features: [
      "On-device AI processing - no cloud required",
      "Matter 2.0 certified",
      "Thread border router built-in",
      "10,000+ compatible devices",
      "Voice control with local processing",
      "7-inch touchscreen display",
      "Automatic routine learning",
    ],
    specifications: {
      "Processor": "Custom Neural Engine",
      "Display": "7\" HD Touchscreen",
      "Connectivity": "WiFi 6E, Thread, Zigbee, Z-Wave, Bluetooth 5.3",
      "Storage": "128GB local",
      "Dimensions": "8\" x 6\" x 2\"",
    },
    faqs: [
      { question: "When will it ship?", answer: "Expected to ship in Q2 2025. Pre-order customers ship first." },
      { question: "Is the deposit refundable?", answer: "Yes, you can cancel and receive a full refund until 30 days before shipping." },
      { question: "What's included?", answer: "Hub unit, power adapter, wall mount kit, quick start guide, and premium support for 1 year." },
    ],
  },
  {
    id: "preorder_2",
    handle: "climasense-ultra",
    title: "ClimaSense Ultra Thermostat",
    description: "AI-powered climate control that learns your preferences and optimizes for comfort and savings.",
    longDescription: "The ClimaSense Ultra represents the pinnacle of smart climate control. Using advanced sensors and AI, it creates personalized comfort zones while reducing energy consumption by up to 40%. Features include room-by-room temperature mapping, air quality monitoring, and predictive heating/cooling.",
    images: [IMAGES.preorders.thermostat],
    price: 299,
    depositAmount: 59,
    depositPercent: 20,
    currency: "usd",
    releaseDate: futureDate(60).toISOString(),
    status: "preorder_open",
    totalSlots: 2000,
    remainingSlots: 1247,
    category: "Climate Control",
    features: [
      "AI-powered temperature optimization",
      "Room occupancy detection",
      "Air quality monitoring (PM2.5, CO2, VOC)",
      "Energy usage analytics",
      "Geofencing auto-adjust",
      "Integration with all major HVAC systems",
    ],
    specifications: {
      "Display": "4\" Color Touchscreen",
      "Sensors": "Temperature, Humidity, Motion, Air Quality",
      "Connectivity": "WiFi, Thread, Bluetooth",
      "Compatibility": "24V HVAC systems",
      "Installation": "DIY or professional",
    },
    faqs: [
      { question: "Is professional installation required?", answer: "No, most users can install in under 30 minutes. Professional installation is available." },
      { question: "Will it work with my HVAC system?", answer: "Compatible with most 24V systems. Check our compatibility tool on the website." },
    ],
  },
]

const mockPreorders: Map<string, Preorder[]> = new Map()

// ===== TRY BEFORE YOU BUY =====
const mockTrialProducts: TrialProduct[] = [
  {
    id: "trial_1",
    handle: "securedome-pro-trial",
    title: "SecureDome Pro Camera",
    description: "Try our flagship 4K security camera for 14 days. Experience crystal-clear video and AI detection.",
    images: [IMAGES.tryBeforeYouBuy.hero],
    price: 249,
    currency: "usd",
    trialDays: 14,
    trialFee: 19,
    category: "Security",
    available: true,
    specifications: {
      "Resolution": "4K Ultra HD",
      "Field of View": "160 degrees",
      "Night Vision": "Color night vision up to 40ft",
      "Audio": "Two-way audio",
    },
    returnPolicy: "Return in original packaging within trial period for full refund of trial fee. Keep it and we'll charge the remaining balance.",
  },
  {
    id: "trial_2",
    handle: "envirosense-lock-trial",
    title: "EnviroSense Smart Lock",
    description: "Experience keyless convenience for 14 days. Easy installation, no permanent modifications.",
    images: [IMAGES.tryBeforeYouBuy.hero],
    price: 199,
    currency: "usd",
    trialDays: 14,
    trialFee: 15,
    category: "Security",
    available: true,
    specifications: {
      "Lock Type": "Deadbolt",
      "Access": "App, Code, Key, Fingerprint",
      "Battery": "AA batteries (included)",
      "Finish": "Satin Nickel",
    },
    returnPolicy: "Professional re-keying service included with returns. Return within trial period for full trial fee refund.",
  },
  {
    id: "trial_3",
    handle: "lumigrid-display-trial",
    title: "LumiGrid Smart Display",
    description: "Try the ultimate smart home control center for 14 days. See how it transforms your daily routine.",
    images: [IMAGES.rentals.smartDisplay],
    price: 179,
    currency: "usd",
    trialDays: 14,
    trialFee: 12,
    category: "Smart Home",
    available: true,
    specifications: {
      "Display": "10.1\" HD Touchscreen",
      "Audio": "Dual 2\" speakers",
      "Camera": "5MP with privacy shutter",
      "Voice": "Built-in voice assistant",
    },
    returnPolicy: "Factory reset required before return. Return in original packaging for full trial fee refund.",
  },
]

const mockTrials: Map<string, Trial[]> = new Map()

// ===== CONSIGNMENT =====
const mockConsignmentItems: ConsignmentItem[] = [
  {
    id: "consign_1",
    handle: "nest-thermostat-gen3",
    title: "Nest Learning Thermostat (3rd Gen)",
    description: "Gently used Nest thermostat in excellent condition. Original owner, all accessories included. Works perfectly with Google Home ecosystem.",
    images: [IMAGES.consignment.hero],
    category: "Climate Control",
    condition: "like_new",
    askingPrice: 150,
    listedPrice: 129,
    currency: "usd",
    status: "listed",
    sellerId: "seller_cons_1",
    sellerName: "SmartHomeUpgrader",
    consignmentRate: 15,
    payoutAmount: 109.65,
    listedDate: pastDate(7).toISOString(),
    specifications: {
      "Model": "T3007ES",
      "Color": "Stainless Steel",
      "Age": "2 years",
      "Includes": "All original accessories",
    },
    verificationStatus: "verified",
    verificationNotes: "Device tested and verified functional. Original purchase confirmed.",
    createdAt: pastDate(10).toISOString(),
  },
  {
    id: "consign_2",
    handle: "ring-doorbell-pro2",
    title: "Ring Video Doorbell Pro 2",
    description: "Like new Ring Pro 2. Upgraded to a different system. Includes all mounting hardware and original faceplate.",
    images: [IMAGES.consignment.hero],
    category: "Security",
    condition: "like_new",
    askingPrice: 180,
    listedPrice: 159,
    currency: "usd",
    status: "listed",
    sellerId: "seller_cons_2",
    sellerName: "TechRefresher",
    consignmentRate: 15,
    payoutAmount: 135.15,
    listedDate: pastDate(3).toISOString(),
    specifications: {
      "Resolution": "1536p HD",
      "Features": "3D Motion Detection",
      "Power": "Hardwired",
      "Color": "Satin Nickel",
    },
    verificationStatus: "verified",
    createdAt: pastDate(5).toISOString(),
  },
  {
    id: "consign_3",
    handle: "philips-hue-starter",
    title: "Philips Hue Starter Kit (4 bulbs + Bridge)",
    description: "Complete Hue starter kit. Bulbs have minimal use. Bridge and all bulbs work perfectly. Great entry into smart lighting.",
    images: [IMAGES.consignment.hero],
    category: "Lighting",
    condition: "good",
    askingPrice: 120,
    listedPrice: 99,
    currency: "usd",
    status: "listed",
    sellerId: "seller_cons_3",
    sellerName: "LightingLover",
    consignmentRate: 15,
    payoutAmount: 84.15,
    listedDate: pastDate(14).toISOString(),
    specifications: {
      "Bulbs": "4x A19 Color",
      "Bridge": "Gen 2",
      "Age": "18 months",
    },
    verificationStatus: "verified",
    createdAt: pastDate(18).toISOString(),
  },
]

const mockConsignmentSellers: Map<string, ConsignmentSeller> = new Map()

// ===== TRADE-IN =====
const mockTradeInPrograms: TradeInProgram[] = [
  {
    id: "tradein_1",
    handle: "smart-thermostat-tradein",
    title: "Smart Thermostat Trade-In",
    description: "Trade in your old smart thermostat and get credit toward a new ClimaSense. We accept Nest, Ecobee, Honeywell, and more.",
    image: IMAGES.tradeIn.hero,
    category: "Climate Control",
    eligibleProducts: ["Nest Learning Thermostat", "Nest Thermostat E", "Ecobee Smart", "Ecobee3 Lite", "Honeywell Home T9", "Honeywell T6"],
    maxValue: 150,
    currency: "usd",
    active: true,
  },
  {
    id: "tradein_2",
    handle: "security-camera-tradein",
    title: "Security Camera Trade-In",
    description: "Upgrade your security setup. Trade in old cameras from any brand for credit toward SecureDome products.",
    image: IMAGES.tradeIn.hero,
    category: "Security",
    eligibleProducts: ["Ring Cameras", "Nest Cameras", "Arlo Cameras", "Wyze Cameras", "Blink Cameras", "Eufy Cameras"],
    maxValue: 100,
    currency: "usd",
    active: true,
  },
  {
    id: "tradein_3",
    handle: "smart-speaker-tradein",
    title: "Smart Speaker & Display Trade-In",
    description: "Trade in your smart speakers and displays. Get credit for Echo, Google Home, HomePod, and more.",
    image: IMAGES.tradeIn.hero,
    category: "Smart Home",
    eligibleProducts: ["Amazon Echo", "Echo Dot", "Echo Show", "Google Home", "Google Nest Hub", "Apple HomePod"],
    maxValue: 75,
    currency: "usd",
    active: true,
  },
]

const mockTradeIns: Map<string, TradeInItem[]> = new Map()

// ==================== SERVICE FUNCTIONS ====================

export const commerceModelsService = {
  // ===== RENTALS =====
  async getRentalProducts(): Promise<RentalProduct[]> {
    await mockDelay(300)
    return [...mockRentalProducts]
  },

  async getRentalProduct(handle: string): Promise<RentalProduct | null> {
    await mockDelay(200)
    return mockRentalProducts.find(p => p.handle === handle) || null
  },

  async getCustomerRentals(customerId: string): Promise<Rental[]> {
    await mockDelay(300)
    return mockRentals.get(customerId) || []
  },

  async createRental(customerId: string, productId: string, startDate: string, endDate: string, duration: "daily" | "weekly" | "monthly"): Promise<Rental> {
    await mockDelay(500)
    const product = mockRentalProducts.find(p => p.id === productId)
    if (!product) throw new Error("Product not found")
    
    const rate = duration === "daily" ? product.dailyRate : duration === "weekly" ? product.weeklyRate : product.monthlyRate
    const rental: Rental = {
      id: generateId(),
      customerId,
      productId,
      product,
      status: "pending",
      startDate,
      endDate,
      duration,
      totalCost: rate,
      depositPaid: product.deposit,
      currency: product.currency,
      createdAt: new Date().toISOString(),
    }
    
    const rentals = mockRentals.get(customerId) || []
    rentals.push(rental)
    mockRentals.set(customerId, rentals)
    return rental
  },

  // ===== MEMBERSHIPS =====
  async getMembershipTiers(): Promise<MembershipTier[]> {
    await mockDelay(300)
    return [...mockMembershipTiers]
  },

  async getMembershipTier(handle: string): Promise<MembershipTier | null> {
    await mockDelay(200)
    return mockMembershipTiers.find(t => t.handle === handle) || null
  },

  async getCustomerMembership(customerId: string): Promise<Membership | null> {
    await mockDelay(300)
    const memberships = mockMemberships.get(customerId)
    return memberships?.[0] || null
  },

  async createMembership(customerId: string, tierId: string, billingCycle: "monthly" | "annual"): Promise<Membership> {
    await mockDelay(500)
    const tier = mockMembershipTiers.find(t => t.id === tierId)
    if (!tier) throw new Error("Tier not found")
    
    const membership: Membership = {
      id: generateId(),
      customerId,
      tierId,
      tier,
      status: "active",
      billingCycle,
      startDate: new Date().toISOString(),
      currentPeriodEnd: billingCycle === "monthly" ? futureDate(30).toISOString() : futureDate(365).toISOString(),
      renewalDate: billingCycle === "monthly" ? futureDate(30).toISOString() : futureDate(365).toISOString(),
      autoRenew: true,
      memberSince: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    
    mockMemberships.set(customerId, [membership])
    return membership
  },

  // ===== AUCTIONS =====
  async getAuctions(options?: { status?: string; category?: string }): Promise<AuctionItem[]> {
    await mockDelay(300)
    let auctions = [...mockAuctions]
    if (options?.status) {
      auctions = auctions.filter(a => a.status === options.status)
    }
    if (options?.category) {
      auctions = auctions.filter(a => a.category === options.category)
    }
    return auctions
  },

  async getAuction(handle: string): Promise<AuctionItem | null> {
    await mockDelay(200)
    return mockAuctions.find(a => a.handle === handle) || null
  },

  async getAuctionBids(auctionId: string): Promise<Bid[]> {
    await mockDelay(200)
    return mockBids.get(auctionId) || []
  },

  async placeBid(auctionId: string, customerId: string, customerName: string, amount: number, isAutoBid: boolean = false, maxAutoBid?: number): Promise<Bid> {
    await mockDelay(500)
    const auction = mockAuctions.find(a => a.id === auctionId)
    if (!auction) throw new Error("Auction not found")
    if (amount <= (auction.currentBid || auction.startingPrice)) throw new Error("Bid must be higher than current bid")
    
    // Update previous winning bid
    const bids = mockBids.get(auctionId) || []
    bids.forEach(b => b.isWinning = false)
    
    const bid: Bid = {
      id: generateId(),
      auctionId,
      customerId,
      customerName,
      amount,
      currency: auction.currency,
      isWinning: true,
      isAutoBid,
      maxAutoBid,
      createdAt: new Date().toISOString(),
    }
    
    bids.unshift(bid)
    mockBids.set(auctionId, bids)
    
    // Update auction
    auction.currentBid = amount
    auction.bidCount++
    
    return bid
  },

  // ===== DONATIONS / CROWDFUNDING =====
  async getCampaigns(options?: { status?: string; category?: string; featured?: boolean }): Promise<Campaign[]> {
    await mockDelay(300)
    let campaigns = [...mockCampaigns]
    if (options?.status) {
      campaigns = campaigns.filter(c => c.status === options.status)
    }
    if (options?.category) {
      campaigns = campaigns.filter(c => c.category === options.category)
    }
    if (options?.featured !== undefined) {
      campaigns = campaigns.filter(c => c.featured === options.featured)
    }
    return campaigns
  },

  async getCampaign(handle: string): Promise<Campaign | null> {
    await mockDelay(200)
    return mockCampaigns.find(c => c.handle === handle) || null
  },

  async getCustomerDonations(customerId: string): Promise<Donation[]> {
    await mockDelay(300)
    return mockDonations.get(customerId) || []
  },

  async createDonation(customerId: string, campaignId: string, amount: number, rewardId?: string, anonymous: boolean = false, message?: string): Promise<Donation> {
    await mockDelay(500)
    const campaign = mockCampaigns.find(c => c.id === campaignId)
    if (!campaign) throw new Error("Campaign not found")
    
    const reward = rewardId ? campaign.rewards?.find(r => r.id === rewardId) : undefined
    
    const donation: Donation = {
      id: generateId(),
      customerId,
      campaignId,
      campaign,
      amount,
      currency: campaign.currency,
      rewardId,
      reward,
      anonymous,
      message,
      status: "completed",
      createdAt: new Date().toISOString(),
    }
    
    // Update campaign stats
    campaign.raised += amount
    campaign.backerCount++
    if (reward) reward.claimed++
    
    const donations = mockDonations.get(customerId) || []
    donations.push(donation)
    mockDonations.set(customerId, donations)
    
    return donation
  },

  // ===== PRE-ORDERS =====
  async getPreorderProducts(): Promise<PreorderProduct[]> {
    await mockDelay(300)
    return [...mockPreorderProducts]
  },

  async getPreorderProduct(handle: string): Promise<PreorderProduct | null> {
    await mockDelay(200)
    return mockPreorderProducts.find(p => p.handle === handle) || null
  },

  async getCustomerPreorders(customerId: string): Promise<Preorder[]> {
    await mockDelay(300)
    return mockPreorders.get(customerId) || []
  },

  async createPreorder(customerId: string, productId: string): Promise<Preorder> {
    await mockDelay(500)
    const product = mockPreorderProducts.find(p => p.id === productId)
    if (!product) throw new Error("Product not found")
    if (product.remainingSlots !== undefined && product.remainingSlots <= 0) throw new Error("No slots available")
    
    const preorder: Preorder = {
      id: generateId(),
      customerId,
      productId,
      product,
      status: "confirmed",
      depositPaid: product.depositAmount,
      remainingBalance: product.price - product.depositAmount,
      totalPrice: product.price,
      currency: product.currency,
      estimatedShipDate: product.releaseDate,
      queuePosition: product.totalSlots ? product.totalSlots - (product.remainingSlots || 0) + 1 : undefined,
      createdAt: new Date().toISOString(),
    }
    
    if (product.remainingSlots !== undefined) {
      product.remainingSlots--
    }
    
    const preorders = mockPreorders.get(customerId) || []
    preorders.push(preorder)
    mockPreorders.set(customerId, preorders)
    
    return preorder
  },

  // ===== TRY BEFORE YOU BUY =====
  async getTrialProducts(): Promise<TrialProduct[]> {
    await mockDelay(300)
    return [...mockTrialProducts]
  },

  async getTrialProduct(handle: string): Promise<TrialProduct | null> {
    await mockDelay(200)
    return mockTrialProducts.find(p => p.handle === handle) || null
  },

  async getCustomerTrials(customerId: string): Promise<Trial[]> {
    await mockDelay(300)
    return mockTrials.get(customerId) || []
  },

  async createTrial(customerId: string, productId: string): Promise<Trial> {
    await mockDelay(500)
    const product = mockTrialProducts.find(p => p.id === productId)
    if (!product) throw new Error("Product not found")
    
    const trial: Trial = {
      id: generateId(),
      customerId,
      productId,
      product,
      status: "pending",
      trialFee: product.trialFee,
      productPrice: product.price,
      currency: product.currency,
      createdAt: new Date().toISOString(),
    }
    
    const trials = mockTrials.get(customerId) || []
    trials.push(trial)
    mockTrials.set(customerId, trials)
    
    return trial
  },

  async updateTrialDecision(customerId: string, trialId: string, decision: "keep" | "return"): Promise<Trial> {
    await mockDelay(500)
    const trials = mockTrials.get(customerId)
    const trial = trials?.find(t => t.id === trialId)
    if (!trial) throw new Error("Trial not found")
    
    trial.decision = decision
    trial.status = decision === "keep" ? "charged" : "returned"
    trial.amountCharged = decision === "keep" ? trial.productPrice : 0
    if (decision === "keep") trial.chargedDate = new Date().toISOString()
    if (decision === "return") trial.returnedDate = new Date().toISOString()
    
    return trial
  },

  // ===== CONSIGNMENT =====
  async getConsignmentItems(options?: { category?: string; status?: string }): Promise<ConsignmentItem[]> {
    await mockDelay(300)
    let items = [...mockConsignmentItems]
    if (options?.category) {
      items = items.filter(i => i.category === options.category)
    }
    if (options?.status) {
      items = items.filter(i => i.status === options.status)
    }
    return items
  },

  async getConsignmentItem(handle: string): Promise<ConsignmentItem | null> {
    await mockDelay(200)
    return mockConsignmentItems.find(i => i.handle === handle) || null
  },

  async getConsignmentSeller(customerId: string): Promise<ConsignmentSeller | null> {
    await mockDelay(300)
    return mockConsignmentSellers.get(customerId) || null
  },

  async submitConsignmentItem(customerId: string, item: Partial<ConsignmentItem>): Promise<ConsignmentItem> {
    await mockDelay(500)
    const newItem: ConsignmentItem = {
      id: generateId(),
      handle: item.title?.toLowerCase().replace(/\s+/g, "-") || generateId(),
      title: item.title || "",
      description: item.description || "",
      images: item.images || [],
      category: item.category || "Other",
      condition: item.condition || "good",
      askingPrice: item.askingPrice || 0,
      listedPrice: 0,
      currency: "usd",
      status: "pending_review",
      sellerId: customerId,
      sellerName: "Seller",
      consignmentRate: 15,
      payoutAmount: 0,
      specifications: item.specifications || {},
      verificationStatus: "pending",
      createdAt: new Date().toISOString(),
    }
    
    mockConsignmentItems.push(newItem)
    return newItem
  },

  // ===== TRADE-IN =====
  async getTradeInPrograms(): Promise<TradeInProgram[]> {
    await mockDelay(300)
    return [...mockTradeInPrograms]
  },

  async getTradeInProgram(handle: string): Promise<TradeInProgram | null> {
    await mockDelay(200)
    return mockTradeInPrograms.find(p => p.handle === handle) || null
  },

  async getCustomerTradeIns(customerId: string): Promise<TradeInItem[]> {
    await mockDelay(300)
    return mockTradeIns.get(customerId) || []
  },

  async submitTradeIn(customerId: string, programId: string, productName: string, productModel: string, condition: "excellent" | "good" | "fair" | "poor", images: string[], description: string): Promise<TradeInItem> {
    await mockDelay(500)
    const program = mockTradeInPrograms.find(p => p.id === programId)
    if (!program) throw new Error("Program not found")
    
    // Estimate value based on condition
    const conditionMultiplier = { excellent: 1, good: 0.75, fair: 0.5, poor: 0.25 }
    const estimatedValue = Math.round(program.maxValue * conditionMultiplier[condition])
    
    const tradeIn: TradeInItem = {
      id: generateId(),
      programId,
      program,
      customerId,
      productName,
      productModel,
      condition,
      estimatedValue,
      currency: program.currency,
      status: "quote_pending",
      images,
      description,
      createdAt: new Date().toISOString(),
    }
    
    const tradeIns = mockTradeIns.get(customerId) || []
    tradeIns.push(tradeIn)
    mockTradeIns.set(customerId, tradeIns)
    
    return tradeIn
  },

  async acceptTradeInQuote(customerId: string, tradeInId: string): Promise<TradeInItem> {
    await mockDelay(500)
    const tradeIns = mockTradeIns.get(customerId)
    const tradeIn = tradeIns?.find(t => t.id === tradeInId)
    if (!tradeIn) throw new Error("Trade-in not found")
    
    tradeIn.status = "quote_received"
    tradeIn.finalValue = tradeIn.estimatedValue
    tradeIn.shippingLabel = "https://example.com/shipping-label.pdf"
    
    return tradeIn
  },
}

export default commerceModelsService
