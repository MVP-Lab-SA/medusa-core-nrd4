import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { Calendar, ShieldCheck, CheckCircle, ExclamationCircle } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/verify/age")({
  component: AgeVerificationPage,
})

function AgeVerificationPage() {
  const { countryCode } = Route.useParams()
  const [verificationMethod, setVerificationMethod] = useState<"dob" | "id" | null>(null)
  const [dateOfBirth, setDateOfBirth] = useState({ day: "", month: "", year: "" })
  const [verified, setVerified] = useState(false)

  const handleVerify = () => {
    setVerified(true)
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Age Verified</h1>
            <p className="text-gray-400 mb-8">
              Your age has been successfully verified. You can now access age-restricted content and products.
            </p>
            <Link 
              to="/$countryCode/store"
              params={{ countryCode }}
              className="inline-block bg-cyan-500 text-black px-8 py-3 rounded-lg hover:bg-cyan-400 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Age Verification Required</h1>
            <p className="text-gray-400">
              Some products require age verification. Please confirm your age to continue.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Choose Verification Method</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setVerificationMethod("dob")}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  verificationMethod === "dob" 
                    ? "border-cyan-500 bg-cyan-500/10" 
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <Calendar className="w-6 h-6 text-cyan-400 mb-2" />
                <p className="font-semibold text-white">Date of Birth</p>
                <p className="text-sm text-gray-400">Quick verification by entering your birth date</p>
              </button>
              <button
                onClick={() => setVerificationMethod("id")}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  verificationMethod === "id" 
                    ? "border-cyan-500 bg-cyan-500/10" 
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <ShieldCheck className="w-6 h-6 text-cyan-400 mb-2" />
                <p className="font-semibold text-white">ID Verification</p>
                <p className="text-sm text-gray-400">Upload a government-issued ID for verification</p>
              </button>
            </div>
          </div>

          {verificationMethod === "dob" && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Enter Your Date of Birth</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Day</label>
                  <input
                    type="text"
                    placeholder="DD"
                    maxLength={2}
                    value={dateOfBirth.day}
                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, day: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Month</label>
                  <input
                    type="text"
                    placeholder="MM"
                    maxLength={2}
                    value={dateOfBirth.month}
                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, month: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="YYYY"
                    maxLength={4}
                    value={dateOfBirth.year}
                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, year: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleVerify}
                disabled={!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year}
                className="w-full bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 font-medium"
              >
                Verify Age
              </button>
            </div>
          )}

          {verificationMethod === "id" && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Upload ID Document</h2>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center mb-6">
                <ShieldCheck className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Drag and drop your ID here, or click to browse</p>
                <p className="text-sm text-gray-500">Accepted: Passport, Driver's License, National ID</p>
                <input type="file" className="hidden" id="id-upload" accept="image/*" />
                <label 
                  htmlFor="id-upload"
                  className="mt-4 inline-block px-4 py-2 bg-gray-800 text-gray-300 rounded-lg cursor-pointer hover:bg-gray-700"
                >
                  Choose File
                </label>
              </div>
              <button
                onClick={handleVerify}
                className="w-full bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 font-medium"
              >
                Submit for Verification
              </button>
            </div>
          )}

          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
            <ExclamationCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200">
              <p className="font-medium">Privacy Notice</p>
              <p className="text-amber-300/80">Your information is only used for age verification and is not stored or shared with third parties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
