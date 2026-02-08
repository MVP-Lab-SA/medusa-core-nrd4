/**
 * ERPNext Mock Service
 * Back-Office ERP System
 */

import { generateId, mockDelay, pastDate, futureDate } from "./index"

// Types
export interface CreditNote {
  id: string
  customerId: string
  amount: number
  currency: string
  balance: number
  reason: string
  orderId?: string
  status: "active" | "used" | "expired"
  expiresAt?: string
  createdAt: string
}

export interface AccountStatement {
  id: string
  customerId: string
  periodStart: string
  periodEnd: string
  openingBalance: number
  closingBalance: number
  currency: string
  transactions: StatementTransaction[]
  generatedAt: string
}

export interface StatementTransaction {
  id: string
  date: string
  type: "invoice" | "payment" | "credit_note" | "refund"
  reference: string
  description: string
  debit: number
  credit: number
  balance: number
}

export interface TaxCertificate {
  id: string
  customerId: string
  companyId?: string
  type: "exemption" | "resale" | "nonprofit"
  taxId: string
  jurisdiction: string
  status: "pending" | "approved" | "rejected" | "expired"
  documentUrl?: string
  validFrom?: string
  validUntil?: string
  createdAt: string
}

export interface InventoryLevel {
  productId: string
  variantId: string
  locationId: string
  locationName: string
  quantity: number
  reservedQuantity: number
  availableQuantity: number
  reorderPoint: number
  status: "in_stock" | "low_stock" | "out_of_stock"
}

export interface InventoryAlert {
  id: string
  productId: string
  variantId: string
  type: "low_stock" | "out_of_stock" | "overstock"
  message: string
  threshold: number
  currentQuantity: number
  createdAt: string
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  address: string
  country: string
  status: "active" | "inactive"
  rating: number
  leadTime: number // days
}

// Mock Data Storage
const mockCreditNotes: Map<string, CreditNote[]> = new Map()
const mockTaxCertificates: Map<string, TaxCertificate[]> = new Map()
const mockStatements: Map<string, AccountStatement[]> = new Map()

// API Functions
export const erpnextService = {
  // Credit Notes / Store Credits
  async getCreditNotes(customerId: string): Promise<CreditNote[]> {
    await mockDelay(300)

    if (!mockCreditNotes.has(customerId)) {
      const notes: CreditNote[] = [
        {
          id: generateId(),
          customerId,
          amount: 50.0,
          currency: "USD",
          balance: 50.0,
          reason: "Product return - Order #12340",
          orderId: "order_12340",
          status: "active",
          expiresAt: futureDate(365).toISOString(),
          createdAt: pastDate(30).toISOString(),
        },
        {
          id: generateId(),
          customerId,
          amount: 25.0,
          currency: "USD",
          balance: 0,
          reason: "Compensation - Delayed delivery",
          status: "used",
          createdAt: pastDate(60).toISOString(),
        },
      ]
      mockCreditNotes.set(customerId, notes)
    }

    return mockCreditNotes.get(customerId)!
  },

  async getCreditBalance(customerId: string): Promise<{ balance: number; currency: string }> {
    await mockDelay(200)

    const notes = await this.getCreditNotes(customerId)
    const activeNotes = notes.filter((n) => n.status === "active")
    const balance = activeNotes.reduce((sum, note) => sum + note.balance, 0)

    return { balance, currency: "USD" }
  },

  async applyCreditNote(
    customerId: string,
    creditNoteId: string,
    amount: number
  ): Promise<CreditNote> {
    await mockDelay(400)

    const notes = await this.getCreditNotes(customerId)
    const note = notes.find((n) => n.id === creditNoteId)

    if (!note) throw new Error("Credit note not found")
    if (note.status !== "active") throw new Error("Credit note is not active")
    if (note.balance < amount) throw new Error("Insufficient credit balance")

    note.balance -= amount
    if (note.balance === 0) {
      note.status = "used"
    }

    return note
  },

  // Account Statements
  async getStatements(customerId: string): Promise<AccountStatement[]> {
    await mockDelay(300)

    if (!mockStatements.has(customerId)) {
      const now = new Date()
      const statements: AccountStatement[] = []

      // Generate last 3 months of statements
      for (let i = 0; i < 3; i++) {
        const periodEnd = new Date(now.getFullYear(), now.getMonth() - i, 0)
        const periodStart = new Date(periodEnd.getFullYear(), periodEnd.getMonth(), 1)

        const openingBalance = Math.random() * 200
        const transactions: StatementTransaction[] = []
        let runningBalance = openingBalance

        // Add some sample transactions
        const numTransactions = Math.floor(Math.random() * 5) + 2
        for (let j = 0; j < numTransactions; j++) {
          const txDate = new Date(
            periodStart.getTime() +
              Math.random() * (periodEnd.getTime() - periodStart.getTime())
          )

          const isDebit = Math.random() > 0.4
          const amount = Math.round(Math.random() * 150 * 100) / 100

          if (isDebit) {
            runningBalance += amount
          } else {
            runningBalance -= amount
          }

          transactions.push({
            id: generateId(),
            date: txDate.toISOString(),
            type: isDebit ? "invoice" : "payment",
            reference: `INV-${Math.random().toString().slice(2, 8)}`,
            description: isDebit ? "Order purchase" : "Payment received",
            debit: isDebit ? amount : 0,
            credit: !isDebit ? amount : 0,
            balance: Math.round(runningBalance * 100) / 100,
          })
        }

        // Sort transactions by date
        transactions.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        statements.push({
          id: generateId(),
          customerId,
          periodStart: periodStart.toISOString(),
          periodEnd: periodEnd.toISOString(),
          openingBalance: Math.round(openingBalance * 100) / 100,
          closingBalance: Math.round(runningBalance * 100) / 100,
          currency: "USD",
          transactions,
          generatedAt: new Date().toISOString(),
        })
      }

      mockStatements.set(customerId, statements)
    }

    return mockStatements.get(customerId)!
  },

  async downloadStatement(statementId: string): Promise<{ url: string }> {
    await mockDelay(500)
    return { url: `https://placehold.co/800x1100?text=Statement+${statementId}` }
  },

  // Tax Certificates
  async getTaxCertificates(customerId: string): Promise<TaxCertificate[]> {
    await mockDelay(300)
    return mockTaxCertificates.get(customerId) || []
  },

  async uploadTaxCertificate(
    customerId: string,
    data: {
      type: TaxCertificate["type"]
      taxId: string
      jurisdiction: string
      documentUrl: string
    }
  ): Promise<TaxCertificate> {
    await mockDelay(600)

    const certificate: TaxCertificate = {
      id: generateId(),
      customerId,
      type: data.type,
      taxId: data.taxId,
      jurisdiction: data.jurisdiction,
      status: "pending",
      documentUrl: data.documentUrl,
      createdAt: new Date().toISOString(),
    }

    if (!mockTaxCertificates.has(customerId)) {
      mockTaxCertificates.set(customerId, [])
    }
    mockTaxCertificates.get(customerId)!.push(certificate)

    return certificate
  },

  async getTaxExemptionStatus(
    customerId: string
  ): Promise<{ exempt: boolean; certificate?: TaxCertificate }> {
    await mockDelay(200)

    const certificates = await this.getTaxCertificates(customerId)
    const validCertificate = certificates.find(
      (c) =>
        c.status === "approved" &&
        (!c.validUntil || new Date(c.validUntil) > new Date())
    )

    return {
      exempt: !!validCertificate,
      certificate: validCertificate,
    }
  },

  // Inventory (read-only for storefront)
  async checkInventory(
    variantId: string,
    quantity: number
  ): Promise<{
    available: boolean
    quantity: number
    locations: InventoryLevel[]
  }> {
    await mockDelay(300)

    // Mock inventory data
    const mockQuantity = Math.floor(Math.random() * 50) + 5
    const available = mockQuantity >= quantity

    return {
      available,
      quantity: mockQuantity,
      locations: [
        {
          productId: "prod_1",
          variantId,
          locationId: "loc_1",
          locationName: "Main Warehouse",
          quantity: mockQuantity,
          reservedQuantity: Math.floor(Math.random() * 5),
          availableQuantity: mockQuantity - Math.floor(Math.random() * 5),
          reorderPoint: 10,
          status: mockQuantity > 10 ? "in_stock" : mockQuantity > 0 ? "low_stock" : "out_of_stock",
        },
      ],
    }
  },

  async getInventoryAlerts(productIds: string[]): Promise<InventoryAlert[]> {
    await mockDelay(300)

    // Return empty for now - in real app would check actual inventory
    return []
  },

  // Suppliers (for B2B)
  async getSuppliers(): Promise<Supplier[]> {
    await mockDelay(300)

    return [
      {
        id: "sup_1",
        name: "Premium Textile Co.",
        email: "orders@premiumtextile.com",
        phone: "+1-555-0123",
        address: "123 Industrial Park",
        country: "USA",
        status: "active",
        rating: 4.8,
        leadTime: 14,
      },
      {
        id: "sup_2",
        name: "Global Fashion Supply",
        email: "sales@globalfashion.com",
        phone: "+1-555-0456",
        address: "456 Commerce St",
        country: "China",
        status: "active",
        rating: 4.5,
        leadTime: 21,
      },
    ]
  },
}
