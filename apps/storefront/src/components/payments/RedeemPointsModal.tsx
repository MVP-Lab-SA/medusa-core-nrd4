import { useState } from "react"
import { XMark, Star, Gift, Tag } from "@medusajs/icons"

interface RewardOption {
  id: string
  type: 'discount' | 'product' | 'gift_card'
  name: string
  description: string
  pointsCost: number
  value: number
}

interface RedeemPointsModalProps {
  isOpen: boolean
  onClose: () => void
  availablePoints: number
  rewardOptions: RewardOption[]
  onRedeem: (rewardId: string) => Promise<void>
}

export function RedeemPointsModal({ isOpen, onClose, availablePoints, rewardOptions, onRedeem }: RedeemPointsModalProps) {
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [isRedeeming, setIsRedeeming] = useState(false)

  if (!isOpen) return null

  const handleRedeem = async () => {
    if (!selectedReward) return
    setIsRedeeming(true)
    try {
      await onRedeem(selectedReward)
      onClose()
    } finally {
      setIsRedeeming(false)
    }
  }

  const getIcon = (type: RewardOption['type']) => {
    switch (type) {
      case 'discount': return <Tag className="w-5 h-5" />
      case 'product': return <Gift className="w-5 h-5" />
      case 'gift_card': return <Star className="w-5 h-5" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Redeem Points</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XMark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <p className="text-sm opacity-80">Available Points</p>
          <p className="text-3xl font-bold">{availablePoints.toLocaleString()}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-medium text-gray-900 mb-3">Choose a Reward</h3>
          <div className="space-y-3">
            {rewardOptions.map((reward) => {
              const canAfford = availablePoints >= reward.pointsCost
              const isSelected = selectedReward === reward.id

              return (
                <button
                  key={reward.id}
                  onClick={() => canAfford && setSelectedReward(reward.id)}
                  disabled={!canAfford}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    isSelected 
                      ? 'border-purple-500 bg-purple-50' 
                      : canAfford
                      ? 'border-gray-200 hover:border-gray-300'
                      : 'border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${isSelected ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                      {getIcon(reward.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{reward.name}</p>
                      <p className="text-sm text-gray-500">{reward.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{reward.pointsCost.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleRedeem}
            disabled={!selectedReward || isRedeeming}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRedeeming ? 'Redeeming...' : 'Redeem Reward'}
          </button>
        </div>
      </div>
    </div>
  )
}
