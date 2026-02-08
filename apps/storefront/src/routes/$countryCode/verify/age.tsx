import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { AgeGate } from "~/components/identity"
import { Calendar, Shield, CheckCircle, AlertTriangle } from "lucide-react"

export const Route = createFileRoute("/$countryCode/verify/age")({
  component: AgeVerificationPage,
})

function AgeVerificationPage() {
  const [verificationMethod, setVerificationMethod] = useState<"dob" | "id" | null>(null)
  const [dateOfBirth, setDateOfBirth] = useState({ day: "", month: "", year: "" })
  const [verified, setVerified] = useState(false)

  const handleVerify = () => {
    // Mock verification - in reality would validate against requirements
    setVerified(true)
  }

  if (verified) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Age Verified</h1>
          <p className="text-gray-600 mb-8">
            Your age has been successfully verified. You can now access age-restricted content and products.
          </p>
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Age Verification Required</h1>
          <p className="text-gray-600">
            Some products require age verification. Please confirm your age to continue.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Choose Verification Method</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setVerificationMethod("dob")}
              className={`p-4 border rounded-lg text-left transition-colors ${
                verificationMethod === "dob" ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
              }`}
            >
              <Calendar className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-semibold">Date of Birth</p>
              <p className="text-sm text-gray-500">Quick verification by entering your birth date</p>
            </button>
            <button
              onClick={() => setVerificationMethod("id")}
              className={`p-4 border rounded-lg text-left transition-colors ${
                verificationMethod === "id" ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
              }`}
            >
              <Shield className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-semibold">ID Verification</p>
              <p className="text-sm text-gray-500">Upload a government-issued ID for verification</p>
            </button>
          </div>
        </div>

        {verificationMethod === "dob" && (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Enter Your Date of Birth</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Day</label>
                <input
                  type="text"
                  placeholder="DD"
                  maxLength={2}
                  value={dateOfBirth.day}
                  onChange={(e) => setDateOfBirth({ ...dateOfBirth, day: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Month</label>
                <input
                  type="text"
                  placeholder="MM"
                  maxLength={2}
                  value={dateOfBirth.month}
                  onChange={(e) => setDateOfBirth({ ...dateOfBirth, month: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="text"
                  placeholder="YYYY"
                  maxLength={4}
                  value={dateOfBirth.year}
                  onChange={(e) => setDateOfBirth({ ...dateOfBirth, year: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg text-center"
                />
              </div>
            </div>
            <button
              onClick={handleVerify}
              disabled={!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              Verify Age
            </button>
          </div>
        )}

        {verificationMethod === "id" && (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Upload ID Document</h2>
            <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your ID here, or click to browse</p>
              <p className="text-sm text-gray-400">Accepted: Passport, Driver's License, National ID</p>
              <input type="file" className="hidden" id="id-upload" accept="image/*" />
              <label 
                htmlFor="id-upload"
                className="mt-4 inline-block px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                Choose File
              </label>
            </div>
            <button
              onClick={handleVerify}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Submit for Verification
            </button>
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Privacy Notice</p>
            <p>Your information is only used for age verification and is not stored or shared with third parties.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
