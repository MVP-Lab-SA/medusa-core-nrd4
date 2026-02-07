import { useState } from "react"
import { XMark, Users, Check, Link as LinkIcon } from "@medusajs/icons"
import { Button } from "./button"

interface ReferralPopupProps {
  giveAmount: string
  getAmount: string
  referralLink: string
  referralCode: string
  onClose: () => void
}

export function ReferralPopup({
  giveAmount,
  getAmount,
  referralLink,
  referralCode,
  onClose
}: ReferralPopupProps) {
  const [copied, setCopied] = useState<"link" | "code" | null>(null)

  const handleCopy = async (text: string, type: "link" | "code") => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
        >
          <XMark className="w-5 h-5 text-gray-500" />
        </button>

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-center text-white">
          <Users className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Share the Love</h2>
          <p className="text-white/90">Give {giveAmount}, Get {getAmount}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-cyan-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Your friend gets</p>
              <p className="text-2xl font-bold text-cyan-600">{giveAmount}</p>
              <p className="text-xs text-gray-500">on their first order</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">You get</p>
              <p className="text-2xl font-bold text-green-600">{getAmount}</p>
              <p className="text-xs text-gray-500">when they purchase</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Share your link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => handleCopy(referralLink, "link")}
                >
                  {copied === "link" ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Or share your code</label>
              <div className="flex gap-2">
                <code className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono font-bold">
                  {referralCode}
                </code>
                <Button
                  variant="outline"
                  onClick={() => handleCopy(referralCode, "code")}
                >
                  {copied === "code" ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
