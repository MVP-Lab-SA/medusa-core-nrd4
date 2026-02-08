/**
 * Payment Gateway Mock Service
 * Stripe / Tap / HyperPay integration mock
 */

import { generateId, mockDelay, pastDate, futureDate } from "./helpers"

// Types
export interface PaymentMethod {
  id: string
  type: "card" | "bank_account" | "wallet" | "bnpl"
  brand?: string
  last4: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  createdAt: string
}

export interface Wallet {
  id: string
  customerId: string
  balance: number
  currency: string
  status: "active" | "suspended"
  transactions: WalletTransaction[]
}

export interface WalletTransaction {
  id: string
  type: "credit" | "debit"
  amount: number
  currency: string
  description: string
  reference?: string
  createdAt: string
}

export interface PaymentTransaction {
  id: string
  orderId?: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  createdAt: string
}

export interface Refund {
  id: string
  transactionId: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  reason: string
  createdAt: string
}

export interface Dispute {
  id: string
  transactionId: string
  amount: number
  currency: string
  status: "open" | "under_review" | "won" | "lost"
  reason: string
  evidence?: DisputeEvidence[]
  createdAt: string
  dueDate: string
}

export interface DisputeEvidence {
  id: string
  type: "receipt" | "tracking" | "communication" | "other"
  fileUrl: string
  description: string
  uploadedAt: string
}

export interface InstallmentPlan {
  id: string
  orderId: string
  totalAmount: number
  currency: string
  numberOfInstallments: number
  installments: Installment[]
  status: "active" | "completed" | "defaulted"
  createdAt: string
}

export interface Installment {
  id: string
  number: number
  amount: number
  dueDate: string
  status: "pending" | "paid" | "overdue"
  paidAt?: string
}

export interface LoyaltyAccount {
  id: string
  customerId: string
  points: number
  tier: "bronze" | "silver" | "gold" | "platinum"
  tierProgress: number
  nextTierAt: number
  lifetimePoints: number
  transactions: LoyaltyTransaction[]
}

export interface LoyaltyTransaction {
  id: string
  type: "earn" | "redeem" | "expire" | "bonus"
  points: number
  description: string
  orderId?: string
  createdAt: string
}

export interface Escrow {
  id: string
  orderId: string
  vendorId: string
  amount: number
  currency: string
  status: "held" | "released" | "refunded"
  releaseDate?: string
  createdAt: string
}

// Mock Data Storage
const mockPaymentMethods: Map<string, PaymentMethod[]> = new Map()
const mockWallets: Map<string, Wallet> = new Map()
const mockTransactions: Map<string, PaymentTransaction[]> = new Map()
const mockDisputes: Map<string, Dispute[]> = new Map()
const mockInstallments: Map<string, InstallmentPlan[]> = new Map()
const mockLoyalty: Map<string, LoyaltyAccount> = new Map()

// Default payment methods
const createDefaultPaymentMethods = (): PaymentMethod[] => [
  {
    id: generateId(),
    type: "card",
    brand: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true,
    createdAt: pastDate(60).toISOString(),
  },
  {
    id: generateId(),
    type: "card",
    brand: "mastercard",
    last4: "8888",
    expiryMonth: 6,
    expiryYear: 2026,
    isDefault: false,
    createdAt: pastDate(30).toISOString(),
  },
]

// API Functions
export const paymentService = {
  // Payment Methods
  async getPaymentMethods(customerId: string): Promise<PaymentMethod[]> {
    await mockDelay(300)

    if (!mockPaymentMethods.has(customerId)) {
      mockPaymentMethods.set(customerId, createDefaultPaymentMethods())
    }

    return mockPaymentMethods.get(customerId)!
  },

  async addPaymentMethod(
    customerId: string,
    data: {
      type: PaymentMethod["type"]
      token: string
      setDefault?: boolean
    }
  ): Promise<PaymentMethod> {
    await mockDelay(600)

    const methods = await this.getPaymentMethods(customerId)

    const newMethod: PaymentMethod = {
      id: generateId(),
      type: data.type,
      brand: data.type === "card" ? "visa" : undefined,
      last4: Math.random().toString().slice(2, 6),
      expiryMonth: data.type === "card" ? 12 : undefined,
      expiryYear: data.type === "card" ? 2028 : undefined,
      isDefault: data.setDefault || methods.length === 0,
      createdAt: new Date().toISOString(),
    }

    if (newMethod.isDefault) {
      methods.forEach((m) => (m.isDefault = false))
    }

    methods.push(newMethod)
    return newMethod
  },

  async removePaymentMethod(customerId: string, methodId: string): Promise<void> {
    await mockDelay(400)

    const methods = mockPaymentMethods.get(customerId)
    if (methods) {
      const index = methods.findIndex((m) => m.id === methodId)
      if (index > -1) {
        methods.splice(index, 1)
      }
    }
  },

  async setDefaultPaymentMethod(customerId: string, methodId: string): Promise<void> {
    await mockDelay(300)

    const methods = mockPaymentMethods.get(customerId)
    if (methods) {
      methods.forEach((m) => {
        m.isDefault = m.id === methodId
      })
    }
  },

  // Wallet
  async getWallet(customerId: string): Promise<Wallet> {
    await mockDelay(300)

    if (!mockWallets.has(customerId)) {
      const wallet: Wallet = {
        id: generateId(),
        customerId,
        balance: 150.0,
        currency: "USD",
        status: "active",
        transactions: [
          {
            id: generateId(),
            type: "credit",
            amount: 100,
            currency: "USD",
            description: "Welcome bonus",
            createdAt: pastDate(30).toISOString(),
          },
          {
            id: generateId(),
            type: "credit",
            amount: 50,
            currency: "USD",
            description: "Refund for order #12345",
            reference: "ord_12345",
            createdAt: pastDate(15).toISOString(),
          },
        ],
      }
      mockWallets.set(customerId, wallet)
    }

    return mockWallets.get(customerId)!
  },

  async topUpWallet(
    customerId: string,
    amount: number,
    paymentMethodId: string
  ): Promise<WalletTransaction> {
    await mockDelay(800)

    const wallet = await this.getWallet(customerId)

    const transaction: WalletTransaction = {
      id: generateId(),
      type: "credit",
      amount,
      currency: wallet.currency,
      description: "Wallet top-up",
      createdAt: new Date().toISOString(),
    }

    wallet.balance += amount
    wallet.transactions.unshift(transaction)

    return transaction
  },

  async withdrawFromWallet(customerId: string, amount: number): Promise<WalletTransaction> {
    await mockDelay(600)

    const wallet = await this.getWallet(customerId)

    if (wallet.balance < amount) {
      throw new Error("Insufficient balance")
    }

    const transaction: WalletTransaction = {
      id: generateId(),
      type: "debit",
      amount,
      currency: wallet.currency,
      description: "Withdrawal",
      createdAt: new Date().toISOString(),
    }

    wallet.balance -= amount
    wallet.transactions.unshift(transaction)

    return transaction
  },

  // Transactions
  async getTransactions(customerId: string): Promise<PaymentTransaction[]> {
    await mockDelay(300)

    if (!mockTransactions.has(customerId)) {
      const transactions: PaymentTransaction[] = [
        {
          id: generateId(),
          orderId: "order_12345",
          amount: 129.99,
          currency: "USD",
          status: "completed",
          paymentMethod: "visa ****4242",
          createdAt: pastDate(7).toISOString(),
        },
        {
          id: generateId(),
          orderId: "order_12344",
          amount: 89.5,
          currency: "USD",
          status: "completed",
          paymentMethod: "visa ****4242",
          createdAt: pastDate(14).toISOString(),
        },
        {
          id: generateId(),
          orderId: "order_12343",
          amount: 45.0,
          currency: "USD",
          status: "refunded",
          paymentMethod: "mastercard ****8888",
          createdAt: pastDate(30).toISOString(),
        },
      ]
      mockTransactions.set(customerId, transactions)
    }

    return mockTransactions.get(customerId)!
  },

  // Refunds
  async requestRefund(transactionId: string, amount: number, reason: string): Promise<Refund> {
    await mockDelay(600)

    const refund: Refund = {
      id: generateId(),
      transactionId,
      amount,
      currency: "USD",
      status: "pending",
      reason,
      createdAt: new Date().toISOString(),
    }

    return refund
  },

  // Disputes
  async getDisputes(customerId: string): Promise<Dispute[]> {
    await mockDelay(300)
    return mockDisputes.get(customerId) || []
  },

  async createDispute(transactionId: string, reason: string): Promise<Dispute> {
    await mockDelay(600)

    const dispute: Dispute = {
      id: generateId(),
      transactionId,
      amount: 50.0,
      currency: "USD",
      status: "open",
      reason,
      createdAt: new Date().toISOString(),
      dueDate: futureDate(14).toISOString(),
    }

    return dispute
  },

  async submitDisputeEvidence(
    disputeId: string,
    evidence: Omit<DisputeEvidence, "id" | "uploadedAt">
  ): Promise<DisputeEvidence> {
    await mockDelay(500)

    return {
      id: generateId(),
      ...evidence,
      uploadedAt: new Date().toISOString(),
    }
  },

  // Installments (BNPL)
  async getInstallmentPlans(customerId: string): Promise<InstallmentPlan[]> {
    await mockDelay(300)

    if (!mockInstallments.has(customerId)) {
      const plan: InstallmentPlan = {
        id: generateId(),
        orderId: "order_12340",
        totalAmount: 299.99,
        currency: "USD",
        numberOfInstallments: 4,
        installments: [
          {
            id: generateId(),
            number: 1,
            amount: 75.0,
            dueDate: pastDate(30).toISOString(),
            status: "paid",
            paidAt: pastDate(30).toISOString(),
          },
          {
            id: generateId(),
            number: 2,
            amount: 75.0,
            dueDate: new Date().toISOString(),
            status: "pending",
          },
          {
            id: generateId(),
            number: 3,
            amount: 75.0,
            dueDate: futureDate(30).toISOString(),
            status: "pending",
          },
          {
            id: generateId(),
            number: 4,
            amount: 74.99,
            dueDate: futureDate(60).toISOString(),
            status: "pending",
          },
        ],
        status: "active",
        createdAt: pastDate(30).toISOString(),
      }
      mockInstallments.set(customerId, [plan])
    }

    return mockInstallments.get(customerId)!
  },

  async calculateInstallments(
    amount: number,
    numberOfInstallments: number
  ): Promise<{ installmentAmount: number; totalAmount: number; fee: number }> {
    await mockDelay(200)

    const fee = amount * 0.05 // 5% fee
    const totalAmount = amount + fee
    const installmentAmount = Math.ceil((totalAmount / numberOfInstallments) * 100) / 100

    return {
      installmentAmount,
      totalAmount,
      fee,
    }
  },

  // Loyalty
  async getLoyaltyAccount(customerId: string): Promise<LoyaltyAccount> {
    await mockDelay(300)

    if (!mockLoyalty.has(customerId)) {
      const account: LoyaltyAccount = {
        id: generateId(),
        customerId,
        points: 2450,
        tier: "silver",
        tierProgress: 65,
        nextTierAt: 5000,
        lifetimePoints: 12450,
        transactions: [
          {
            id: generateId(),
            type: "earn",
            points: 130,
            description: "Purchase - Order #12345",
            orderId: "order_12345",
            createdAt: pastDate(7).toISOString(),
          },
          {
            id: generateId(),
            type: "earn",
            points: 90,
            description: "Purchase - Order #12344",
            orderId: "order_12344",
            createdAt: pastDate(14).toISOString(),
          },
          {
            id: generateId(),
            type: "redeem",
            points: -500,
            description: "Redeemed for $5 discount",
            createdAt: pastDate(21).toISOString(),
          },
          {
            id: generateId(),
            type: "bonus",
            points: 1000,
            description: "Silver tier welcome bonus",
            createdAt: pastDate(60).toISOString(),
          },
        ],
      }
      mockLoyalty.set(customerId, account)
    }

    return mockLoyalty.get(customerId)!
  },

  async earnPoints(
    customerId: string,
    points: number,
    description: string,
    orderId?: string
  ): Promise<LoyaltyTransaction> {
    await mockDelay(300)

    const account = await this.getLoyaltyAccount(customerId)

    const transaction: LoyaltyTransaction = {
      id: generateId(),
      type: "earn",
      points,
      description,
      orderId,
      createdAt: new Date().toISOString(),
    }

    account.points += points
    account.lifetimePoints += points
    account.transactions.unshift(transaction)

    // Check tier upgrade
    if (account.lifetimePoints >= 25000 && account.tier !== "platinum") {
      account.tier = "platinum"
    } else if (account.lifetimePoints >= 10000 && account.tier === "silver") {
      account.tier = "gold"
    } else if (account.lifetimePoints >= 2500 && account.tier === "bronze") {
      account.tier = "silver"
    }

    return transaction
  },

  async redeemPoints(
    customerId: string,
    points: number,
    description: string
  ): Promise<LoyaltyTransaction> {
    await mockDelay(300)

    const account = await this.getLoyaltyAccount(customerId)

    if (account.points < points) {
      throw new Error("Insufficient points")
    }

    const transaction: LoyaltyTransaction = {
      id: generateId(),
      type: "redeem",
      points: -points,
      description,
      createdAt: new Date().toISOString(),
    }

    account.points -= points
    account.transactions.unshift(transaction)

    return transaction
  },

  async getRedemptionOptions(points: number): Promise<
    Array<{
      id: string
      name: string
      pointsCost: number
      value: number
      type: "discount" | "gift_card" | "product"
    }>
  > {
    await mockDelay(200)

    const options: Array<{
      id: string
      name: string
      pointsCost: number
      value: number
      type: "discount" | "gift_card" | "product"
    }> = [
      { id: "opt_1", name: "$5 Store Credit", pointsCost: 500, value: 5, type: "discount" },
      { id: "opt_2", name: "$10 Store Credit", pointsCost: 900, value: 10, type: "discount" },
      { id: "opt_3", name: "$25 Store Credit", pointsCost: 2000, value: 25, type: "discount" },
      { id: "opt_4", name: "$50 Gift Card", pointsCost: 3500, value: 50, type: "gift_card" },
      { id: "opt_5", name: "Free Shipping", pointsCost: 300, value: 10, type: "discount" },
    ]
    return options.filter((opt) => opt.pointsCost <= points)
  },
}
