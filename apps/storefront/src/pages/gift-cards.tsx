import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { href } from "@/lib/utils/link"
import { ArrowLeft, Gift } from "@medusajs/icons"

const giftCardAmounts = [25, 50, 75, 100, 150, 200, 500]

export function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(50)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [checkCode, setCheckCode] = useState("")
  const [checkResult, setCheckResult] = useState<{balance: number, valid: boolean} | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleCheckBalance = async () => {
    if (!checkCode) return
    setIsChecking(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Demo response
    if (checkCode.toUpperCase().startsWith("GIFT")) {
      setCheckResult({ balance: 75.50, valid: true })
    } else {
      setCheckResult({ balance: 0, valid: false })
    }
    setIsChecking(false)
  }

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={href("/us/store")} 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
          <h1 className="text-3xl font-bold">Gift Cards</h1>
          <p className="text-gray-400 mt-2">Give the gift of smart city technology</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Purchase Gift Card */}
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Purchase Gift Card</h2>
                  <p className="text-gray-400 text-sm">Send instantly via email</p>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Select Amount</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {giftCardAmounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount("") }}
                      className={`py-3 rounded-lg font-semibold transition-all ${
                        selectedAmount === amount && !customAmount
                          ? "bg-cyan-500 text-black"
                          : "bg-gray-800 hover:bg-gray-700 text-white"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                  <div className="col-span-1">
                    <input
                      type="number"
                      placeholder="Custom"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full py-3 px-3 bg-gray-800 border border-gray-700 rounded-lg text-center focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Email</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="friend@example.com"
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Name</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Friend's name"
                      className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your name"
                      className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Personal Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a personal message..."
                    rows={3}
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Date</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to send immediately</p>
                </div>
              </div>

              {/* Purchase Button */}
              <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                Purchase Gift Card - ${finalAmount.toFixed(2)}
              </button>
            </div>
          </div>

          {/* Check Balance & Preview */}
          <div className="space-y-8">
            {/* Gift Card Preview */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-4">Gift Card Preview</h3>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">CityOS Store</p>
                    <p className="text-2xl font-bold text-cyan-400 mt-1">${finalAmount.toFixed(2)}</p>
                  </div>
                  <Gift className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="space-y-2">
                  {recipientName && (
                    <p className="text-sm text-gray-300">To: {recipientName}</p>
                  )}
                  {senderName && (
                    <p className="text-sm text-gray-400">From: {senderName}</p>
                  )}
                  {message && (
                    <p className="text-sm text-gray-400 italic mt-4">"{message}"</p>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 font-mono">GIFT-XXXX-XXXX-XXXX</p>
                </div>
              </div>
            </div>

            {/* Check Balance */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-4">Check Gift Card Balance</h3>
              <p className="text-gray-400 text-sm mb-4">Enter your gift card code to check the remaining balance</p>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={checkCode}
                  onChange={(e) => setCheckCode(e.target.value)}
                  placeholder="GIFT-XXXX-XXXX-XXXX"
                  className="flex-1 py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none font-mono uppercase"
                />
                <button
                  onClick={handleCheckBalance}
                  disabled={isChecking || !checkCode}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                >
                  {isChecking ? "Checking..." : "Check"}
                </button>
              </div>

              {checkResult && (
                <div className={`mt-4 p-4 rounded-lg ${checkResult.valid ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
                  {checkResult.valid ? (
                    <div>
                      <p className="text-green-400 font-semibold">Gift Card Valid</p>
                      <p className="text-2xl font-bold text-white mt-1">Balance: ${checkResult.balance.toFixed(2)}</p>
                    </div>
                  ) : (
                    <p className="text-red-400">Invalid gift card code. Please check and try again.</p>
                  )}
                </div>
              )}
            </div>

            {/* FAQ */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Gift Card FAQ</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-300">Do gift cards expire?</p>
                  <p className="text-gray-500">No, our gift cards never expire.</p>
                </div>
                <div>
                  <p className="text-gray-300">Can I use multiple gift cards?</p>
                  <p className="text-gray-500">Yes, you can combine multiple gift cards at checkout.</p>
                </div>
                <div>
                  <p className="text-gray-300">Can gift cards be refunded?</p>
                  <p className="text-gray-500">Gift cards are non-refundable once purchased.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
