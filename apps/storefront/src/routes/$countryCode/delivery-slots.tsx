import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { DeliverySlotPicker } from "~/components/delivery"
import { Calendar, Clock, Truck, MapPin, CheckCircle } from "lucide-react"

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Choose Delivery</h1>
      <p className="text-gray-600 mb-8">Select your preferred delivery option and time slot</p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Delivery Address
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
              <button className="text-blue-600 text-sm hover:underline">
                Use current location
              </button>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Delivery Speed
            </h2>
            <div className="space-y-3">
              {deliveryOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedOption === option.id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => setSelectedOption(option.id)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <p className="font-medium">{option.name}</p>
                      <p className="text-sm text-gray-500">{option.time}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {option.price === 0 ? "Free" : `$${option.price}`}
                  </p>
                </label>
              ))}
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Select Time Slot
            </h2>
            <DeliverySlotPicker
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onDateChange={setSelectedDate}
              onSlotChange={setSelectedSlot}
            />
          </div>
        </div>

        {/* Summary Sidebar */}
        <div>
          <div className="bg-white border rounded-xl p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Delivery Summary</h2>
            
            <div className="space-y-4 mb-6">
              {address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Deliver to</p>
                    <p className="font-medium">{address}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery method</p>
                  <p className="font-medium">
                    {deliveryOptions.find(o => o.id === selectedOption)?.name}
                  </p>
                </div>
              </div>

              {selectedDate && selectedSlot && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled for</p>
                    <p className="font-medium">{selectedDate}, {selectedSlot}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivery fee</span>
                <span className="font-semibold">
                  {deliveryOptions.find(o => o.id === selectedOption)?.price === 0 
                    ? "Free" 
                    : `$${deliveryOptions.find(o => o.id === selectedOption)?.price}`
                  }
                </span>
              </div>
            </div>

            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:bg-gray-300"
              disabled={!address || !selectedDate || !selectedSlot}
            >
              <CheckCircle className="w-5 h-5" />
              Confirm Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
