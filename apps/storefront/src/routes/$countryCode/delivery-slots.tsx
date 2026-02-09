import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { DeliverySlots } from "~/components/ui/delivery-slots"
import { Calendar, Clock, Truck, MapPin, CheckCircleSolid } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/delivery-slots")({
  component: DeliverySlotsPage,
})

function DeliverySlotsPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [address, setAddress] = useState("")

  const deliveryOptions = [
    { id: "standard", name: "Standard Delivery", price: 0, time: "3-5 business days" },
    { id: "express", name: "Express Delivery", price: 25, time: "1-2 business days" },
    { id: "same-day", name: "Same Day Delivery", price: 50, time: "Within 24 hours" },
  ]

  const [selectedOption, setSelectedOption] = useState("standard")

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-city-white mb-2">Choose Delivery</h1>
        <p className="text-city-gray mb-8">Select your preferred delivery option and time slot</p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-city-navy border border-city-steel rounded-xl p-6">
              <h2 className="text-lg font-semibold text-city-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-city-cyan" />
                Delivery Address
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-city-slate border border-city-steel rounded-lg text-city-white placeholder-city-muted focus:outline-none focus:border-city-cyan transition-colors"
                />
                <button className="text-city-cyan text-sm hover:text-city-cyan-light transition-colors">
                  Use current location
                </button>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-city-navy border border-city-steel rounded-xl p-6">
              <h2 className="text-lg font-semibold text-city-white mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-city-cyan" />
                Delivery Speed
              </h2>
              <div className="space-y-3">
                {deliveryOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOption === option.id
                        ? "border-city-cyan bg-city-cyan/10"
                        : "border-city-steel hover:border-city-cyan/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => setSelectedOption(option.id)}
                        className="w-4 h-4 text-city-cyan bg-city-slate border-city-steel focus:ring-city-cyan"
                      />
                      <div>
                        <p className="font-medium text-city-white">{option.name}</p>
                        <p className="text-sm text-city-muted">{option.time}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-city-white">
                      {option.price === 0 ? "Free" : `$${option.price}`}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="bg-city-navy border border-city-steel rounded-xl p-6">
              <h2 className="text-lg font-semibold text-city-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-city-cyan" />
                Select Time Slot
              </h2>
              <div className="text-city-gray">Select a delivery time slot to continue</div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div>
            <div className="bg-city-navy border border-city-steel rounded-xl p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-city-white mb-4">Delivery Summary</h2>
              
              <div className="space-y-4 mb-6">
                {address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-city-muted mt-0.5" />
                    <div>
                      <p className="text-sm text-city-muted">Deliver to</p>
                      <p className="font-medium text-city-white">{address}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-city-muted mt-0.5" />
                  <div>
                    <p className="text-sm text-city-muted">Delivery method</p>
                    <p className="font-medium text-city-white">
                      {deliveryOptions.find(o => o.id === selectedOption)?.name}
                    </p>
                  </div>
                </div>

                {selectedDate && selectedSlot && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-city-muted mt-0.5" />
                    <div>
                      <p className="text-sm text-city-muted">Scheduled for</p>
                      <p className="font-medium text-city-white">{selectedDate}, {selectedSlot}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-city-steel pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-city-gray">Delivery fee</span>
                  <span className="font-semibold text-city-white">
                    {deliveryOptions.find(o => o.id === selectedOption)?.price === 0 
                      ? "Free" 
                      : `$${deliveryOptions.find(o => o.id === selectedOption)?.price}`
                    }
                  </span>
                </div>
              </div>

              <button 
                className="w-full bg-city-cyan text-city-dark py-3 rounded-lg hover:bg-city-cyan-light transition-colors flex items-center justify-center gap-2 font-medium disabled:bg-city-steel disabled:text-city-muted disabled:cursor-not-allowed"
                disabled={!address || !selectedDate || !selectedSlot}
              >
                <CheckCircleSolid className="w-5 h-5" />
                Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
