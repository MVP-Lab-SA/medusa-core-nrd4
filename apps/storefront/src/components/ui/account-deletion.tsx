import { useState } from "react"
import { ExclamationCircleSolid, Trash, Check } from "@medusajs/icons"
import { Button } from "./button"

interface AccountDeletionProps {
  email: string
  onDelete: (reason: string, feedback?: string) => Promise<void>
  onCancel: () => void
}

export function AccountDeletion({ email, onDelete, onCancel }: AccountDeletionProps) {
  const [step, setStep] = useState<"reason" | "confirm" | "processing" | "done">("reason")
  const [reason, setReason] = useState("")
  const [feedback, setFeedback] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [error, setError] = useState("")

  const reasons = [
    { id: "not_using", label: "I'm not using the account anymore" },
    { id: "privacy", label: "Privacy concerns" },
    { id: "too_many_emails", label: "I receive too many emails" },
    { id: "bad_experience", label: "I had a bad experience" },
    { id: "other", label: "Other reason" }
  ]

  const handleConfirm = async () => {
    if (confirmEmail.toLowerCase() !== email.toLowerCase()) {
      setError("Email doesn't match")
      return
    }

    setStep("processing")
    try {
      await onDelete(reason, feedback)
      setStep("done")
    } catch (err) {
      setError("Failed to delete account. Please try again.")
      setStep("confirm")
    }
  }

  if (step === "done") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Deleted</h2>
        <p className="text-gray-600 mb-6">
          Your account has been scheduled for deletion. You'll receive a confirmation email shortly.
        </p>
        <p className="text-sm text-gray-500">
          Note: Some data may be retained for legal or regulatory purposes.
        </p>
      </div>
    )
  }

  if (step === "processing") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-cyan-500 rounded-full animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Deleting Account...</h2>
        <p className="text-gray-600">Please wait while we process your request.</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <ExclamationCircleSolid className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800">This action cannot be undone</h3>
            <p className="text-sm text-red-700 mt-1">
              Deleting your account will permanently remove all your data, including order history, 
              saved addresses, and payment methods.
            </p>
          </div>
        </div>
      </div>

      {step === "reason" && (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">We're sorry to see you go</h2>
          <p className="text-gray-600 mb-6">
            Please tell us why you're deleting your account. This helps us improve.
          </p>

          <div className="space-y-3 mb-6">
            {reasons.map(r => (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${
                  reason === r.id ? "border-cyan-500 bg-cyan-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={r.id}
                  checked={reason === r.id}
                  onChange={() => setReason(r.id)}
                  className="w-4 h-4 text-cyan-500"
                />
                <span className="text-gray-700">{r.label}</span>
              </label>
            ))}
          </div>

          {reason === "other" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tell us more (optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => setStep("confirm")}
              disabled={!reason}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Continue
            </Button>
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirm Account Deletion</h2>
          <p className="text-gray-600 mb-6">
            To confirm, please type your email address: <strong>{email}</strong>
          </p>

          <div className="mb-6">
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => {
                setConfirmEmail(e.target.value)
                setError("")
              }}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                error ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-cyan-500"
              }`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep("reason")} className="flex-1">
              Back
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!confirmEmail}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
