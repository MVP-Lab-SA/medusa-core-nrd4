import { useState } from "react"
import { Link as LinkIcon, Check, Users } from "@medusajs/icons"
import { Button } from "./button"

interface ReferralWidgetProps {
  referralCode: string
  referralLink: string
  reward: string
  friendReward: string
  referralsCount?: number
  pendingRewards?: string
  className?: string
}

export function ReferralWidget({
  referralCode,
  referralLink,
  reward,
  friendReward,
  referralsCount = 0,
  pendingRewards,
  className = ""
}: ReferralWidgetProps) {
  const [copied, setCopied] = useState<"code" | "link" | null>(null)

  const handleCopy = async (text: string, type: "code" | "link") => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className={`bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Refer Friends, Earn Rewards</h3>
          <p className="text-sm opacity-80">Share the love and get rewarded</p>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/20 rounded-lg p-3">
          <p className="text-sm opacity-80">You get</p>
          <p className="text-xl font-bold">{reward}</p>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <p className="text-sm opacity-80">Friend gets</p>
          <p className="text-xl font-bold">{friendReward}</p>
        </div>
      </div>

      {/* Referral Code */}
      <div className="mb-4">
        <label className="text-sm opacity-80 mb-1 block">Your referral code</label>
        <div className="flex gap-2">
          <div className="flex-1 bg-white/20 rounded-lg px-4 py-2 font-mono font-bold">
            {referralCode}
          </div>
          <Button
            onClick={() => handleCopy(referralCode, "code")}
            className="bg-white text-cyan-600 hover:bg-white/90"
          >
            {copied === "code" ? <Check className="w-4 h-4" /> : "Copy"}
          </Button>
        </div>
      </div>

      {/* Share Link */}
      <div className="mb-6">
        <label className="text-sm opacity-80 mb-1 block">Or share your link</label>
        <div className="flex gap-2">
          <div className="flex-1 bg-white/20 rounded-lg px-4 py-2 text-sm truncate">
            {referralLink}
          </div>
          <Button
            onClick={() => handleCopy(referralLink, "link")}
            className="bg-white text-cyan-600 hover:bg-white/90"
          >
            {copied === "link" ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-2 mb-6">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
          Twitter
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
          Facebook
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          WhatsApp
        </button>
      </div>

      {/* Stats */}
      {(referralsCount > 0 || pendingRewards) && (
        <div className="pt-4 border-t border-white/20 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{referralsCount}</p>
            <p className="text-sm opacity-80">Successful referrals</p>
          </div>
          {pendingRewards && (
            <div className="text-right">
              <p className="text-2xl font-bold">{pendingRewards}</p>
              <p className="text-sm opacity-80">Pending rewards</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
