/**
 * Walt.id Mock Service
 * Identity & Credentials System
 */

import { generateId, mockDelay, pastDate, futureDate } from "./helpers"

// Types
export interface DecentralizedIdentity {
  id: string
  did: string
  createdAt: string
  status: "active" | "suspended" | "revoked"
}

export interface VerifiableCredential {
  id: string
  type: CredentialType
  issuer: string
  issuedAt: string
  expiresAt?: string
  status: "valid" | "expired" | "revoked"
  claims: Record<string, unknown>
}

export type CredentialType =
  | "age_verification"
  | "residency_proof"
  | "business_license"
  | "professional_certification"
  | "municipal_permit"
  | "kyc_verification"

export interface KYCVerification {
  id: string
  customerId: string
  status: "pending" | "in_review" | "approved" | "rejected"
  level: "basic" | "enhanced" | "full"
  documents: KYCDocument[]
  submittedAt: string
  reviewedAt?: string
  rejectionReason?: string
}

export interface KYCDocument {
  id: string
  type: "passport" | "national_id" | "drivers_license" | "utility_bill" | "bank_statement"
  status: "pending" | "verified" | "rejected"
  uploadedAt: string
  fileUrl: string
}

export interface IdentityWallet {
  id: string
  customerId: string
  did: string
  credentials: VerifiableCredential[]
  createdAt: string
}

export interface AgeVerification {
  id: string
  verified: boolean
  minimumAge: number
  actualAge?: number
  method: "document" | "third_party" | "self_declared"
  verifiedAt?: string
}

export interface ConsentRecord {
  id: string
  customerId: string
  purpose: string
  granted: boolean
  grantedAt?: string
  revokedAt?: string
  expiresAt?: string
}

export interface AccessPolicy {
  id: string
  name: string
  description: string
  requiredCredentials: CredentialType[]
  minimumKYCLevel?: "basic" | "enhanced" | "full"
}

// Mock Data Storage
const mockWallets: Map<string, IdentityWallet> = new Map()
const mockKYCVerifications: Map<string, KYCVerification> = new Map()
const mockConsents: Map<string, ConsentRecord[]> = new Map()

// Sample credentials
const sampleCredentials: VerifiableCredential[] = [
  {
    id: "cred_1",
    type: "age_verification",
    issuer: "CityOS Identity Service",
    issuedAt: pastDate(30).toISOString(),
    expiresAt: futureDate(335).toISOString(),
    status: "valid",
    claims: { ageOver18: true, ageOver21: true },
  },
  {
    id: "cred_2",
    type: "residency_proof",
    issuer: "Municipality of Riyadh",
    issuedAt: pastDate(60).toISOString(),
    expiresAt: futureDate(305).toISOString(),
    status: "valid",
    claims: { city: "Riyadh", district: "Al Olaya", verified: true },
  },
]

// API Functions
export const waltidService = {
  // Identity Wallet
  async getWallet(customerId: string): Promise<IdentityWallet | null> {
    await mockDelay(300)

    if (mockWallets.has(customerId)) {
      return mockWallets.get(customerId)!
    }

    // Create a default wallet for demo
    const wallet: IdentityWallet = {
      id: generateId(),
      customerId,
      did: `did:key:z${generateId().slice(0, 32)}`,
      credentials: sampleCredentials,
      createdAt: pastDate(90).toISOString(),
    }

    mockWallets.set(customerId, wallet)
    return wallet
  },

  async createWallet(customerId: string): Promise<IdentityWallet> {
    await mockDelay(500)

    const wallet: IdentityWallet = {
      id: generateId(),
      customerId,
      did: `did:key:z${generateId().slice(0, 32)}`,
      credentials: [],
      createdAt: new Date().toISOString(),
    }

    mockWallets.set(customerId, wallet)
    return wallet
  },

  // Credentials
  async getCredentials(customerId: string): Promise<VerifiableCredential[]> {
    await mockDelay(300)
    const wallet = await this.getWallet(customerId)
    return wallet?.credentials || []
  },

  async getCredential(credentialId: string): Promise<VerifiableCredential | null> {
    await mockDelay(200)
    for (const wallet of Array.from(mockWallets.values())) {
      const cred = wallet.credentials.find((c: VerifiableCredential) => c.id === credentialId)
      if (cred) return cred
    }
    return sampleCredentials.find((c) => c.id === credentialId) || null
  },

  async requestCredential(
    customerId: string,
    type: CredentialType
  ): Promise<{ requestId: string; status: "pending" }> {
    await mockDelay(400)
    return {
      requestId: generateId(),
      status: "pending",
    }
  },

  async verifyCredential(credentialId: string): Promise<{ valid: boolean; reason?: string }> {
    await mockDelay(300)
    const cred = await this.getCredential(credentialId)
    if (!cred) return { valid: false, reason: "Credential not found" }
    if (cred.status === "revoked") return { valid: false, reason: "Credential has been revoked" }
    if (cred.status === "expired") return { valid: false, reason: "Credential has expired" }
    if (cred.expiresAt && new Date(cred.expiresAt) < new Date()) {
      return { valid: false, reason: "Credential has expired" }
    }
    return { valid: true }
  },

  // KYC Verification
  async getKYCStatus(customerId: string): Promise<KYCVerification | null> {
    await mockDelay(300)

    if (mockKYCVerifications.has(customerId)) {
      return mockKYCVerifications.get(customerId)!
    }

    return null
  },

  async startKYC(customerId: string, level: "basic" | "enhanced" | "full"): Promise<KYCVerification> {
    await mockDelay(500)

    const kyc: KYCVerification = {
      id: generateId(),
      customerId,
      status: "pending",
      level,
      documents: [],
      submittedAt: new Date().toISOString(),
    }

    mockKYCVerifications.set(customerId, kyc)
    return kyc
  },

  async uploadKYCDocument(
    customerId: string,
    documentType: KYCDocument["type"],
    fileUrl: string
  ): Promise<KYCDocument> {
    await mockDelay(600)

    const doc: KYCDocument = {
      id: generateId(),
      type: documentType,
      status: "pending",
      uploadedAt: new Date().toISOString(),
      fileUrl,
    }

    const kyc = mockKYCVerifications.get(customerId)
    if (kyc) {
      kyc.documents.push(doc)
      kyc.status = "in_review"
    }

    return doc
  },

  async submitKYC(customerId: string): Promise<KYCVerification> {
    await mockDelay(400)

    const kyc = mockKYCVerifications.get(customerId)
    if (!kyc) throw new Error("No KYC verification found")

    kyc.status = "in_review"
    return kyc
  },

  // Age Verification
  async verifyAge(customerId: string, minimumAge: number): Promise<AgeVerification> {
    await mockDelay(300)

    const wallet = await this.getWallet(customerId)
    const ageCred = wallet?.credentials.find((c) => c.type === "age_verification")

    if (ageCred && ageCred.status === "valid") {
      const claims = ageCred.claims as { ageOver18?: boolean; ageOver21?: boolean }
      const verified =
        (minimumAge <= 18 && claims.ageOver18) || (minimumAge <= 21 && claims.ageOver21)

      return {
        id: generateId(),
        verified: !!verified,
        minimumAge,
        method: "document",
        verifiedAt: verified ? new Date().toISOString() : undefined,
      }
    }

    return {
      id: generateId(),
      verified: false,
      minimumAge,
      method: "document",
    }
  },

  // Consent Management
  async getConsents(customerId: string): Promise<ConsentRecord[]> {
    await mockDelay(300)

    if (!mockConsents.has(customerId)) {
      // Create default consents
      const defaults: ConsentRecord[] = [
        {
          id: generateId(),
          customerId,
          purpose: "marketing_emails",
          granted: true,
          grantedAt: pastDate(30).toISOString(),
        },
        {
          id: generateId(),
          customerId,
          purpose: "analytics",
          granted: true,
          grantedAt: pastDate(30).toISOString(),
        },
        {
          id: generateId(),
          customerId,
          purpose: "third_party_sharing",
          granted: false,
        },
        {
          id: generateId(),
          customerId,
          purpose: "personalization",
          granted: true,
          grantedAt: pastDate(30).toISOString(),
        },
      ]
      mockConsents.set(customerId, defaults)
    }

    return mockConsents.get(customerId)!
  },

  async updateConsent(
    customerId: string,
    purpose: string,
    granted: boolean
  ): Promise<ConsentRecord> {
    await mockDelay(300)

    const consents = await this.getConsents(customerId)
    let consent = consents.find((c) => c.purpose === purpose)

    if (consent) {
      consent.granted = granted
      consent.grantedAt = granted ? new Date().toISOString() : undefined
      consent.revokedAt = !granted ? new Date().toISOString() : undefined
    } else {
      consent = {
        id: generateId(),
        customerId,
        purpose,
        granted,
        grantedAt: granted ? new Date().toISOString() : undefined,
      }
      consents.push(consent)
    }

    return consent
  },

  // Access Policies
  async checkAccess(
    customerId: string,
    policyId: string
  ): Promise<{ allowed: boolean; missingRequirements: string[] }> {
    await mockDelay(300)

    // Mock policy check
    const wallet = await this.getWallet(customerId)
    const credentialTypes = wallet?.credentials.map((c) => c.type) || []

    // Simple mock logic
    if (policyId === "age_restricted") {
      const hasAgeVerification = credentialTypes.includes("age_verification")
      return {
        allowed: hasAgeVerification,
        missingRequirements: hasAgeVerification ? [] : ["Age verification required"],
      }
    }

    return { allowed: true, missingRequirements: [] }
  },
}
