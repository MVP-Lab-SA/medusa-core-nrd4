import { useState } from "react"
import { Check, Clock, XMark, DocumentText, LockClosedSolid, User, ArrowUpTray } from "@medusajs/icons"
import type { VerifiableCredential, KYCVerification, KYCDocument, ConsentRecord } from "@/lib/mock/waltid"

// Credential Card
interface CredentialCardProps {
  credential: VerifiableCredential
  onVerify?: () => void
}

export function CredentialCard({ credential, onVerify }: CredentialCardProps) {
  const statusColors = {
    valid: "bg-emerald-500/20 text-emerald-400",
    expired: "bg-gray-500/20 text-gray-400",
    revoked: "bg-red-500/20 text-red-400",
  }

  const statusIcons = {
    valid: <Check className="w-4 h-4" />,
    expired: <Clock className="w-4 h-4" />,
    revoked: <XMark className="w-4 h-4" />,
  }

  const typeLabels: Record<string, string> = {
    age_verification: "Age Verification",
    residency_proof: "Residency Proof",
    business_license: "Business License",
    professional_certification: "Professional Certification",
    municipal_permit: "Municipal Permit",
    kyc_verification: "KYC Verification",
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
          <LockClosedSolid className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-white">
              {typeLabels[credential.type] || credential.type}
            </h4>
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                statusColors[credential.status]
              }`}
            >
              {statusIcons[credential.status]}
              {credential.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Issued by {credential.issuer}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span>Issued: {new Date(credential.issuedAt).toLocaleDateString()}</span>
            {credential.expiresAt && (
              <span>Expires: {new Date(credential.expiresAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>

      {/* Claims */}
      {Object.keys(credential.claims).length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-xs font-medium text-gray-500 mb-2">Verified Claims</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(credential.claims).map(([key, value]) => (
              <span
                key={key}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
              >
                {key}: {String(value)}
              </span>
            ))}
          </div>
        </div>
      )}

      {onVerify && credential.status === "valid" && (
        <button
          onClick={onVerify}
          className="mt-4 w-full py-2 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors"
        >
          Verify Credential
        </button>
      )}
    </div>
  )
}

// KYC Status Card
interface KYCStatusCardProps {
  kyc: KYCVerification
  onUploadDocument?: (type: KYCDocument["type"]) => void
  onSubmit?: () => void
}

export function KYCStatusCard({ kyc, onUploadDocument, onSubmit }: KYCStatusCardProps) {
  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400",
    in_review: "bg-cyan-500/20 text-cyan-400",
    approved: "bg-emerald-500/20 text-emerald-400",
    rejected: "bg-red-500/20 text-red-400",
  }

  const levelLabels = {
    basic: "Basic Verification",
    enhanced: "Enhanced Verification",
    full: "Full Verification",
  }

  const requiredDocs: Record<string, KYCDocument["type"][]> = {
    basic: ["national_id"],
    enhanced: ["national_id", "utility_bill"],
    full: ["national_id", "utility_bill", "bank_statement"],
  }

  const docLabels: Record<string, string> = {
    passport: "Passport",
    national_id: "National ID",
    drivers_license: "Driver's License",
    utility_bill: "Utility Bill",
    bank_statement: "Bank Statement",
  }

  const uploadedTypes = kyc.documents.map((d) => d.type)
  const required = requiredDocs[kyc.level]

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">KYC Verification</h3>
          <p className="text-sm text-gray-500 mt-1">{levelLabels[kyc.level]}</p>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            statusColors[kyc.status]
          }`}
        >
          {kyc.status.replace("_", " ")}
        </span>
      </div>

      {/* Required Documents */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Required Documents</h4>
        <div className="space-y-3">
          {required.map((docType) => {
            const uploaded = kyc.documents.find((d) => d.type === docType)
            const isUploaded = !!uploaded

            return (
              <div
                key={docType}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isUploaded ? "bg-emerald-500/20" : "bg-gray-700"
                    }`}
                  >
                    {isUploaded ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <DocumentText className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{docLabels[docType]}</p>
                    {uploaded && (
                      <p className="text-xs text-gray-500">
                        Uploaded {new Date(uploaded.uploadedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {!isUploaded && onUploadDocument && (
                  <button
                    onClick={() => onUploadDocument(docType)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors"
                  >
                    <ArrowUpTray className="w-4 h-4" />
                    Upload
                  </button>
                )}
                {uploaded && (
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      uploaded.status === "verified"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : uploaded.status === "rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {uploaded.status}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Rejection Reason */}
      {kyc.status === "rejected" && kyc.rejectionReason && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm font-medium text-red-400">Rejection Reason:</p>
          <p className="text-sm text-red-300 mt-1">{kyc.rejectionReason}</p>
        </div>
      )}

      {/* Submit Button */}
      {kyc.status === "pending" &&
        required.every((r) => uploadedTypes.includes(r)) &&
        onSubmit && (
          <button
            onClick={onSubmit}
            className="mt-6 w-full py-2.5 text-sm font-medium text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Submit for Review
          </button>
        )}
    </div>
  )
}

// Consent Manager
interface ConsentManagerProps {
  consents: ConsentRecord[]
  onToggle: (purpose: string, granted: boolean) => void
}

export function ConsentManager({ consents, onToggle }: ConsentManagerProps) {
  const purposeLabels: Record<string, { label: string; description: string }> = {
    marketing_emails: {
      label: "Marketing Emails",
      description: "Receive promotional emails and newsletters",
    },
    analytics: {
      label: "Analytics",
      description: "Help us improve by collecting usage data",
    },
    third_party_sharing: {
      label: "Third-Party Sharing",
      description: "Share data with trusted partners",
    },
    personalization: {
      label: "Personalization",
      description: "Personalized recommendations and content",
    },
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-semibold text-white">Privacy Preferences</h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage how we use your data
        </p>
      </div>
      <div className="divide-y divide-gray-800">
        {consents.map((consent) => {
          const info = purposeLabels[consent.purpose] || {
            label: consent.purpose,
            description: "",
          }

          return (
            <div key={consent.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-white">{info.label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{info.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent.granted}
                  onChange={(e) => onToggle(consent.purpose, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500 peer-checked:after:bg-white"></div>
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Age Gate Component
interface AgeGateProps {
  minimumAge: number
  onVerify: () => void
  onDecline: () => void
}

export function AgeGate({ minimumAge, onVerify, onDecline }: AgeGateProps) {
  const [birthYear, setBirthYear] = useState("")

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const handleSubmit = () => {
    const age = currentYear - parseInt(birthYear)
    if (age >= minimumAge) {
      onVerify()
    } else {
      onDecline()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mt-4">
            Age Verification Required
          </h2>
          <p className="text-gray-400 mt-2">
            You must be at least {minimumAge} years old to access this content.
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select your birth year
          </label>
          <select
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="">Select year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 py-2.5 text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!birthYear}
            className="flex-1 py-2.5 text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Verify
          </button>
        </div>

        <p className="text-xs text-gray-600 text-center mt-4">
          By clicking Verify, you confirm that you are {minimumAge} years or older.
        </p>
      </div>
    </div>
  )
}
