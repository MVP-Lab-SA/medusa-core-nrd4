/**
 * Commerce Extras Mock Service
 * Loyalty, Gift Cards, Digital Products, Delivery Tracking, Store Credits
 */

import { generateId, mockDelay, pastDate, futureDate } from "./helpers"

// ==================== TYPES ====================

// Loyalty
export interface LoyaltyProgram {
  id: string
  name: string
  description: string
  tiers: LoyaltyTier[]
  pointsPerDollar: number
  pointsValue: number // Points needed for $1 reward
}

export interface LoyaltyTier {
  id: string
  name: string
  minPoints: number
  benefits: string[]
  multiplier: number
  badge: string
  color: string
}

export interface LoyaltyAccount {
  id: string
  customerId: string
  points: number
  lifetimePoints: number
  currentTier: LoyaltyTier
  nextTier?: LoyaltyTier
  pointsToNextTier?: number
  memberSince: string
  transactions: LoyaltyTransaction[]
}

export interface LoyaltyTransaction {
  id: string
  type: "earned" | "redeemed" | "expired" | "bonus"
  points: number
  description: string
  orderId?: string
  createdAt: string
}

export interface LoyaltyReward {
  id: string
  name: string
  description: string
  pointsCost: number
  type: "discount" | "product" | "service" | "experience"
  value?: number
  productId?: string
  image?: string
  available: boolean
  limitedQuantity?: number
}

// Gift Cards
export interface GiftCard {
  id: string
  code: string
  initialBalance: number
  currentBalance: number
  currency: string
  status: "active" | "redeemed" | "expired" | "disabled"
  expiresAt?: string
  purchasedBy?: string
  recipientEmail?: string
  recipientName?: string
  message?: string
  design: string
  createdAt: string
}

export interface GiftCardDesign {
  id: string
  name: string
  image: string
  category: "birthday" | "holiday" | "thank-you" | "general"
}

// Digital Products
export interface DigitalProduct {
  id: string
  productId: string
  type: "download" | "license" | "subscription"
  name: string
  description: string
  fileSize?: string
  version?: string
  format?: string
}

export interface DigitalDownload {
  id: string
  customerId: string
  productId: string
  productName: string
  orderId: string
  downloadUrl: string
  fileName: string
  fileSize: string
  downloadsRemaining: number
  maxDownloads: number
  expiresAt: string
  createdAt: string
}

export interface License {
  id: string
  customerId: string
  productId: string
  productName: string
  licenseKey: string
  status: "active" | "expired" | "revoked"
  type: "perpetual" | "subscription" | "trial"
  activations: number
  maxActivations: number
  expiresAt?: string
  features: string[]
  createdAt: string
}

// Delivery Tracking
export interface Delivery {
  id: string
  orderId: string
  trackingNumber: string
  carrier: string
  status: DeliveryStatus
  estimatedDelivery: string
  actualDelivery?: string
  shippingAddress: ShippingAddress
  events: DeliveryEvent[]
  signature?: string
  photo?: string
}

export type DeliveryStatus =
  | "processing"
  | "shipped"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed_attempt"
  | "returned"

export interface DeliveryEvent {
  id: string
  status: DeliveryStatus
  location: string
  timestamp: string
  description: string
}

export interface ShippingAddress {
  name: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
  phone?: string
}

export interface DeliverySlot {
  id: string
  date: string
  startTime: string
  endTime: string
  available: boolean
  price: number
  type: "standard" | "express" | "evening" | "weekend"
}

// Store Credits
export interface StoreCredit {
  id: string
  customerId: string
  balance: number
  currency: string
  transactions: StoreCreditTransaction[]
}

export interface StoreCreditTransaction {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  orderId?: string
  referralId?: string
  createdAt: string
}

// ==================== SEEDED DATA ====================

const IMAGES = {
  giftCards: {
    birthday: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR7KVXP1TMCA9CHCWABGW-01KGYZR7KVNKMVKKZV70DVX6N3.jpeg",
    holiday: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR55S15ZZQWJ14CBPW7H6-01KGYZR55SWDFM62K7WG0M0FGC.jpeg",
    thankYou: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR68BGBJN6KH7C2R68ZN7-01KGYZR68B3CX8JXKR27NWTXAS.jpeg",
    general: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR0ZEFNT3CYGMNWEN3GKA-01KGYZR0ZEVGBDW3MS1ZHF9RC.jpeg",
  },
  rewards: {
    discount: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQNCHHES603SQZGZ202RK-01KGYZQNCHW5QT8S1A382HGRS0.jpeg",
    product: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGWY7QZZSD11Q6YGTGT7HG8J-01KGWY7QZZS6Y8V88D8RXX6FHT.jpeg",
  },
}

// Loyalty Program
const mockLoyaltyProgram: LoyaltyProgram = {
  id: "loyalty_program_1",
  name: "NexGen Rewards",
  description: "Earn points on every purchase and unlock exclusive benefits as you level up.",
  tiers: [
    {
      id: "tier_bronze",
      name: "Bronze",
      minPoints: 0,
      benefits: [
        "Earn 1 point per $1 spent",
        "Birthday bonus points",
        "Early access to sales",
      ],
      multiplier: 1,
      badge: "Bronze",
      color: "#CD7F32",
    },
    {
      id: "tier_silver",
      name: "Silver",
      minPoints: 500,
      benefits: [
        "Earn 1.5 points per $1 spent",
        "Free standard shipping",
        "Exclusive member discounts",
        "Early access to new products",
      ],
      multiplier: 1.5,
      badge: "Silver",
      color: "#C0C0C0",
    },
    {
      id: "tier_gold",
      name: "Gold",
      minPoints: 2000,
      benefits: [
        "Earn 2 points per $1 spent",
        "Free express shipping",
        "Priority customer support",
        "Exclusive Gold member events",
        "Extended return window (60 days)",
      ],
      multiplier: 2,
      badge: "Gold",
      color: "#FFD700",
    },
    {
      id: "tier_platinum",
      name: "Platinum",
      minPoints: 5000,
      benefits: [
        "Earn 3 points per $1 spent",
        "Free same-day shipping (where available)",
        "Dedicated account manager",
        "Annual gift",
        "VIP access to all events",
        "Price match guarantee",
      ],
      multiplier: 3,
      badge: "Platinum",
      color: "#E5E4E2",
    },
  ],
  pointsPerDollar: 1,
  pointsValue: 100, // 100 points = $1
}

const mockLoyaltyRewards: LoyaltyReward[] = [
  {
    id: "reward_1",
    name: "$10 Off Your Next Order",
    description: "Redeem points for $10 off any purchase of $50 or more.",
    pointsCost: 1000,
    type: "discount",
    value: 10,
    image: IMAGES.rewards.discount,
    available: true,
  },
  {
    id: "reward_2",
    name: "$25 Off Your Next Order",
    description: "Redeem points for $25 off any purchase of $100 or more.",
    pointsCost: 2500,
    type: "discount",
    value: 25,
    image: IMAGES.rewards.discount,
    available: true,
  },
  {
    id: "reward_3",
    name: "Free EnviroSense Mini",
    description: "Redeem your points for a free EnviroSense Mini sensor.",
    pointsCost: 5000,
    type: "product",
    productId: "prod_mini",
    image: IMAGES.rewards.product,
    available: true,
    limitedQuantity: 50,
  },
  {
    id: "reward_4",
    name: "Free Installation Service",
    description: "Get a free professional installation worth $199.",
    pointsCost: 15000,
    type: "service",
    value: 199,
    available: true,
  },
  {
    id: "reward_5",
    name: "VIP Factory Tour Experience",
    description: "Exclusive behind-the-scenes tour of our manufacturing facility.",
    pointsCost: 25000,
    type: "experience",
    available: true,
    limitedQuantity: 10,
  },
]

// Gift Card Designs
const mockGiftCardDesigns: GiftCardDesign[] = [
  { id: "design_1", name: "Birthday Celebration", image: IMAGES.giftCards.birthday, category: "birthday" },
  { id: "design_2", name: "Holiday Cheer", image: IMAGES.giftCards.holiday, category: "holiday" },
  { id: "design_3", name: "Thank You", image: IMAGES.giftCards.thankYou, category: "thank-you" },
  { id: "design_4", name: "Smart Home Style", image: IMAGES.giftCards.general, category: "general" },
]

// Mock Storage
const mockLoyaltyAccounts: Map<string, LoyaltyAccount> = new Map()
const mockGiftCards: Map<string, GiftCard[]> = new Map()
const mockDownloads: Map<string, DigitalDownload[]> = new Map()
const mockLicenses: Map<string, License[]> = new Map()
const mockDeliveries: Map<string, Delivery[]> = new Map()
const mockStoreCredits: Map<string, StoreCredit> = new Map()

// ==================== API FUNCTIONS ====================

export const commerceExtrasService = {
  // ========== LOYALTY ==========
  async getLoyaltyProgram(): Promise<LoyaltyProgram> {
    await mockDelay(200)
    return mockLoyaltyProgram
  },

  async getLoyaltyAccount(customerId: string): Promise<LoyaltyAccount> {
    await mockDelay(300)
    
    if (!mockLoyaltyAccounts.has(customerId)) {
      const silverTier = mockLoyaltyProgram.tiers[1]
      const goldTier = mockLoyaltyProgram.tiers[2]
      
      const account: LoyaltyAccount = {
        id: generateId(),
        customerId,
        points: 1250,
        lifetimePoints: 3450,
        currentTier: silverTier,
        nextTier: goldTier,
        pointsToNextTier: 750, // 2000 - 1250
        memberSince: pastDate(365).toISOString(),
        transactions: [
          {
            id: generateId(),
            type: "earned",
            points: 180,
            description: "Purchase - Order #12345",
            orderId: "order_12345",
            createdAt: pastDate(3).toISOString(),
          },
          {
            id: generateId(),
            type: "earned",
            points: 250,
            description: "Purchase - Order #12340",
            orderId: "order_12340",
            createdAt: pastDate(14).toISOString(),
          },
          {
            id: generateId(),
            type: "bonus",
            points: 500,
            description: "Welcome bonus",
            createdAt: pastDate(365).toISOString(),
          },
          {
            id: generateId(),
            type: "redeemed",
            points: -1000,
            description: "Redeemed: $10 Off Coupon",
            createdAt: pastDate(30).toISOString(),
          },
        ],
      }
      mockLoyaltyAccounts.set(customerId, account)
    }
    
    return mockLoyaltyAccounts.get(customerId)!
  },

  async getLoyaltyRewards(): Promise<LoyaltyReward[]> {
    await mockDelay(200)
    return mockLoyaltyRewards
  },

  async redeemReward(customerId: string, rewardId: string): Promise<{ success: boolean; code?: string }> {
    await mockDelay(500)
    const account = await this.getLoyaltyAccount(customerId)
    const reward = mockLoyaltyRewards.find(r => r.id === rewardId)
    
    if (!reward || account.points < reward.pointsCost) {
      return { success: false }
    }
    
    account.points -= reward.pointsCost
    account.transactions.unshift({
      id: generateId(),
      type: "redeemed",
      points: -reward.pointsCost,
      description: `Redeemed: ${reward.name}`,
      createdAt: new Date().toISOString(),
    })
    
    return { success: true, code: `REWARD-${generateId().slice(0, 8).toUpperCase()}` }
  },

  // ========== GIFT CARDS ==========
  async getGiftCardDesigns(): Promise<GiftCardDesign[]> {
    await mockDelay(200)
    return mockGiftCardDesigns
  },

  async purchaseGiftCard(data: {
    amount: number
    designId: string
    recipientEmail?: string
    recipientName?: string
    message?: string
    purchasedBy: string
  }): Promise<GiftCard> {
    await mockDelay(600)
    
    const design = mockGiftCardDesigns.find(d => d.id === data.designId)
    const giftCard: GiftCard = {
      id: generateId(),
      code: `GC-${generateId().slice(0, 8).toUpperCase()}`,
      initialBalance: data.amount,
      currentBalance: data.amount,
      currency: "USD",
      status: "active",
      expiresAt: futureDate(365).toISOString(),
      purchasedBy: data.purchasedBy,
      recipientEmail: data.recipientEmail,
      recipientName: data.recipientName,
      message: data.message,
      design: design?.image || IMAGES.giftCards.general,
      createdAt: new Date().toISOString(),
    }
    
    const cards = mockGiftCards.get(data.purchasedBy) || []
    cards.push(giftCard)
    mockGiftCards.set(data.purchasedBy, cards)
    
    return giftCard
  },

  async getGiftCards(customerId: string): Promise<GiftCard[]> {
    await mockDelay(300)
    
    if (!mockGiftCards.has(customerId)) {
      // Create sample gift cards for demo
      const cards: GiftCard[] = [
        {
          id: generateId(),
          code: "GC-DEMO1234",
          initialBalance: 100,
          currentBalance: 75.50,
          currency: "USD",
          status: "active",
          expiresAt: futureDate(180).toISOString(),
          design: IMAGES.giftCards.general,
          createdAt: pastDate(60).toISOString(),
        },
        {
          id: generateId(),
          code: "GC-BDAY5678",
          initialBalance: 50,
          currentBalance: 50,
          currency: "USD",
          status: "active",
          expiresAt: futureDate(365).toISOString(),
          recipientName: "You",
          message: "Happy Birthday! Enjoy your smart home journey!",
          design: IMAGES.giftCards.birthday,
          createdAt: pastDate(7).toISOString(),
        },
      ]
      mockGiftCards.set(customerId, cards)
    }
    
    return mockGiftCards.get(customerId)!
  },

  async checkGiftCardBalance(code: string): Promise<GiftCard | null> {
    await mockDelay(300)
    
    for (const cards of mockGiftCards.values()) {
      const card = cards.find(c => c.code === code)
      if (card) return card
    }
    
    return null
  },

  // ========== DIGITAL DOWNLOADS ==========
  async getDownloads(customerId: string): Promise<DigitalDownload[]> {
    await mockDelay(300)
    
    if (!mockDownloads.has(customerId)) {
      const downloads: DigitalDownload[] = [
        {
          id: generateId(),
          customerId,
          productId: "prod_software_1",
          productName: "NexGen Home Pro Software",
          orderId: "order_12345",
          downloadUrl: "/downloads/nexgen-home-pro-v2.5.0.zip",
          fileName: "nexgen-home-pro-v2.5.0.zip",
          fileSize: "245 MB",
          downloadsRemaining: 3,
          maxDownloads: 5,
          expiresAt: futureDate(365).toISOString(),
          createdAt: pastDate(14).toISOString(),
        },
        {
          id: generateId(),
          customerId,
          productId: "prod_manual_1",
          productName: "EnviroSense Complete User Guide (PDF)",
          orderId: "order_12340",
          downloadUrl: "/downloads/envirosense-user-guide.pdf",
          fileName: "envirosense-user-guide.pdf",
          fileSize: "12 MB",
          downloadsRemaining: 10,
          maxDownloads: 10,
          expiresAt: futureDate(365).toISOString(),
          createdAt: pastDate(30).toISOString(),
        },
      ]
      mockDownloads.set(customerId, downloads)
    }
    
    return mockDownloads.get(customerId)!
  },

  async downloadFile(downloadId: string): Promise<{ url: string }> {
    await mockDelay(500)
    // In real app, this would generate a signed URL
    return { url: `/api/downloads/${downloadId}` }
  },

  // ========== LICENSES ==========
  async getLicenses(customerId: string): Promise<License[]> {
    await mockDelay(300)
    
    if (!mockLicenses.has(customerId)) {
      const licenses: License[] = [
        {
          id: generateId(),
          customerId,
          productId: "prod_software_1",
          productName: "NexGen Home Pro",
          licenseKey: "NXGN-PRO-XXXX-XXXX-XXXX",
          status: "active",
          type: "subscription",
          activations: 2,
          maxActivations: 5,
          expiresAt: futureDate(180).toISOString(),
          features: [
            "Unlimited device connections",
            "Advanced automation rules",
            "Priority cloud sync",
            "Premium support",
          ],
          createdAt: pastDate(180).toISOString(),
        },
        {
          id: generateId(),
          customerId,
          productId: "prod_firmware_1",
          productName: "EnviroSense Firmware Pack",
          licenseKey: "ENVS-FW-XXXX-XXXX-XXXX",
          status: "active",
          type: "perpetual",
          activations: 1,
          maxActivations: 3,
          features: [
            "Lifetime firmware updates",
            "Beta features access",
            "Extended sensor calibration",
          ],
          createdAt: pastDate(90).toISOString(),
        },
      ]
      mockLicenses.set(customerId, licenses)
    }
    
    return mockLicenses.get(customerId)!
  },

  async activateLicense(licenseId: string, deviceId: string): Promise<{ success: boolean }> {
    await mockDelay(500)
    
    for (const licenses of mockLicenses.values()) {
      const license = licenses.find(l => l.id === licenseId)
      if (license && license.activations < license.maxActivations) {
        license.activations++
        return { success: true }
      }
    }
    
    return { success: false }
  },

  // ========== DELIVERY TRACKING ==========
  async getDeliveries(customerId: string): Promise<Delivery[]> {
    await mockDelay(300)
    
    if (!mockDeliveries.has(customerId)) {
      const deliveries: Delivery[] = [
        {
          id: generateId(),
          orderId: "order_12345",
          trackingNumber: "1Z999AA10123456784",
          carrier: "UPS",
          status: "in_transit",
          estimatedDelivery: futureDate(2).toISOString(),
          shippingAddress: {
            name: "John Doe",
            address1: "123 Main Street",
            address2: "Apt 4B",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "USA",
          },
          events: [
            {
              id: generateId(),
              status: "in_transit",
              location: "Oakland, CA",
              timestamp: pastDate(0).toISOString(),
              description: "In transit to destination",
            },
            {
              id: generateId(),
              status: "in_transit",
              location: "Phoenix, AZ",
              timestamp: pastDate(1).toISOString(),
              description: "Departed facility",
            },
            {
              id: generateId(),
              status: "shipped",
              location: "Dallas, TX",
              timestamp: pastDate(2).toISOString(),
              description: "Package picked up",
            },
            {
              id: generateId(),
              status: "processing",
              location: "NexGen Warehouse",
              timestamp: pastDate(3).toISOString(),
              description: "Order processed and ready for shipment",
            },
          ],
        },
        {
          id: generateId(),
          orderId: "order_12340",
          trackingNumber: "9400111899223033206500",
          carrier: "USPS",
          status: "delivered",
          estimatedDelivery: pastDate(5).toISOString(),
          actualDelivery: pastDate(5).toISOString(),
          shippingAddress: {
            name: "John Doe",
            address1: "123 Main Street",
            address2: "Apt 4B",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "USA",
          },
          events: [
            {
              id: generateId(),
              status: "delivered",
              location: "San Francisco, CA",
              timestamp: pastDate(5).toISOString(),
              description: "Delivered - Left at front door",
            },
            {
              id: generateId(),
              status: "out_for_delivery",
              location: "San Francisco, CA",
              timestamp: pastDate(5).toISOString(),
              description: "Out for delivery",
            },
            {
              id: generateId(),
              status: "in_transit",
              location: "San Francisco, CA",
              timestamp: pastDate(6).toISOString(),
              description: "Arrived at local facility",
            },
          ],
          photo: IMAGES.giftCards.general,
        },
      ]
      mockDeliveries.set(customerId, deliveries)
    }
    
    return mockDeliveries.get(customerId)!
  },

  async getDelivery(trackingNumber: string): Promise<Delivery | null> {
    await mockDelay(300)
    
    for (const deliveries of mockDeliveries.values()) {
      const delivery = deliveries.find(d => d.trackingNumber === trackingNumber)
      if (delivery) return delivery
    }
    
    return null
  },

  async getDeliverySlots(date: string, zip: string): Promise<DeliverySlot[]> {
    await mockDelay(400)
    
    const baseDate = new Date(date)
    const slots: DeliverySlot[] = []
    
    // Morning slots
    slots.push({
      id: generateId(),
      date: date,
      startTime: "8:00 AM",
      endTime: "12:00 PM",
      available: Math.random() > 0.3,
      price: 0,
      type: "standard",
    })
    
    // Afternoon slots
    slots.push({
      id: generateId(),
      date: date,
      startTime: "12:00 PM",
      endTime: "5:00 PM",
      available: Math.random() > 0.2,
      price: 0,
      type: "standard",
    })
    
    // Express slot
    slots.push({
      id: generateId(),
      date: date,
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      available: Math.random() > 0.5,
      price: 9.99,
      type: "express",
    })
    
    // Evening slot
    slots.push({
      id: generateId(),
      date: date,
      startTime: "5:00 PM",
      endTime: "9:00 PM",
      available: Math.random() > 0.4,
      price: 4.99,
      type: "evening",
    })
    
    return slots
  },

  async scheduleDelivery(deliveryId: string, slotId: string): Promise<{ success: boolean }> {
    await mockDelay(500)
    return { success: true }
  },

  // ========== STORE CREDITS ==========
  async getStoreCredit(customerId: string): Promise<StoreCredit> {
    await mockDelay(300)
    
    if (!mockStoreCredits.has(customerId)) {
      const credit: StoreCredit = {
        id: generateId(),
        customerId,
        balance: 47.50,
        currency: "USD",
        transactions: [
          {
            id: generateId(),
            type: "credit",
            amount: 25,
            description: "Referral bonus - Alex Johnson",
            referralId: "ref_1",
            createdAt: pastDate(25).toISOString(),
          },
          {
            id: generateId(),
            type: "credit",
            amount: 32.50,
            description: "Return refund - Order #12330",
            orderId: "order_12330",
            createdAt: pastDate(45).toISOString(),
          },
          {
            id: generateId(),
            type: "debit",
            amount: -10,
            description: "Applied to Order #12340",
            orderId: "order_12340",
            createdAt: pastDate(14).toISOString(),
          },
        ],
      }
      mockStoreCredits.set(customerId, credit)
    }
    
    return mockStoreCredits.get(customerId)!
  },

  async applyStoreCredit(customerId: string, amount: number, orderId: string): Promise<{ success: boolean; newBalance: number }> {
    await mockDelay(400)
    
    const credit = await this.getStoreCredit(customerId)
    if (amount > credit.balance) {
      return { success: false, newBalance: credit.balance }
    }
    
    credit.balance -= amount
    credit.transactions.unshift({
      id: generateId(),
      type: "debit",
      amount: -amount,
      description: `Applied to Order #${orderId}`,
      orderId,
      createdAt: new Date().toISOString(),
    })
    
    return { success: true, newBalance: credit.balance }
  },
}
