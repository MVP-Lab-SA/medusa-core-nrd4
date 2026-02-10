import { useState } from "react"
import { Buildings, MapPin, Check } from "@medusajs/icons"

interface DeliveryInstructionsProps {
  currentInstructions?: string
  preferredLocation?: string
  onSave: (instructions: string, location: string) => void
}

const locationOptions = [
  { id: 'front_door', label: 'Front Door', icon: Buildings },
  { id: 'back_door', label: 'Back Door', icon: Buildings },
  { id: 'side_door', label: 'Side Door', icon: Buildings },
  { id: 'mailroom', label: 'Mailroom/Lobby', icon: Buildings },
  { id: 'concierge', label: 'With Concierge', icon: Buildings },
  { id: 'neighbor', label: 'With Neighbor', icon: MapPin },
  { id: 'safe_place', label: 'Safe Place', icon: MapPin },
]

export function DeliveryInstructions({ currentInstructions = '', preferredLocation = '', onSave }: DeliveryInstructionsProps) {
  const [instructions, setInstructions] = useState(currentInstructions)
  const [location, setLocation] = useState(preferredLocation)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    onSave(instructions, location)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <h3 className="font-medium text-gray-900">Delivery Instructions</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Drop-off Location
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {locationOptions.map((option) => {
            const Icon = option.icon
            const isSelected = location === option.id
            
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setLocation(option.id)}
                className={`flex items-center gap-2 p-3 rounded-lg border text-sm ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4 ml-auto" />}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Instructions
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="E.g., Ring doorbell twice, leave behind the plant pot, call upon arrival..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none h-24 text-sm"
          maxLength={500}
        />
        <p className="text-xs text-gray-400 mt-1">{instructions.length}/500 characters</p>
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-2 rounded-lg font-medium transition-colors ${
          saved 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {saved ? (
          <span className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Saved!
          </span>
        ) : (
          'Save Instructions'
        )}
      </button>
    </div>
  )
}
