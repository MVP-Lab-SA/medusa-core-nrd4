import { useState } from "react"
import { SquareTwoStack, User, Gift } from "@medusajs/icons"
import type { ReferralProgram } from "../../lib/mock/marketplace"

interface ReferralCardProps {
  program: ReferralProgram
  referralCode: string
  referralCount: number
  totalEarned: number
}

export function ReferralCard({ program, referralCode, referralCount, totalEarned }: ReferralCardProps) {
  const [copied, setCopied] = useState(false)
  const referralUrl = `${window.location.origin}?ref=${referralCode}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white/20 rounded-lg">
          <Gift className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{program.name}</h3>
          <p className="text-white/80 text-sm">{program.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <User className="w-6 h-6 mx-auto mb-2" />
          <div className="text-2xl font-bold">{referralCount}</div>
          <div className="text-sm text-white/80">Referrals</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Gift className="w-6 h-6 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: program.currency,
            }).format(totalEarned)}
          </div>
          <div className="text-sm text-white/80">Earned</div>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-4">
        <p className="text-sm text-white/80 mb-2">Your referral link</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralUrl}
            readOnly
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 flex items-center gap-2"
          >
            <SquareTwoStack className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-white/80">
        Get {program.referrerReward} for each friend who signs up! They get {program.refereeReward} too.
      </div>
    </div>
  )
}
