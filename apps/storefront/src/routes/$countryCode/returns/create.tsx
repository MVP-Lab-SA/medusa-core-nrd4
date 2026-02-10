import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { CubeSolid, ChevronRight, ExclamationCircleSolid, CheckCircleSolid } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/returns/create")({
  component: CreateReturnPage,
})

function CreateReturnPage() {
  const [step, setStep] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [returnReason, setReturnReason] = useState("")
  const [returnMethod, setReturnMethod] = useState<"pickup" | "dropoff">("pickup")

  // Mock orders eligible for return
  const eligibleOrders = [
    { 
      id: "ORD-2024-001", 
      date: "2024-01-15", 
      items: [
        { id: "item-1", name: "Premium T-Shirt", size: "L", price: 45, image: "/product1.jpg" },
        { id: "item-2", name: "Casual Pants", size: "32", price: 65, image: "/product2.jpg" },
      ]
    },
    { 
      id: "ORD-2024-002", 
      date: "2024-01-10", 
      items: [
        { id: "item-3", name: "Running Shoes", size: "10", price: 120, image: "/product3.jpg" },
      ]
    },
  ]

  const returnReasons = [
    "Item doesn't fit",
    "Wrong item received",
    "Item is damaged",
    "Item quality not as expected",
    "Changed my mind",
    "Other",
  ]

  const selectedOrderData = eligibleOrders.find(o => o.id === selectedOrder)
  const selectedItemsData = selectedOrderData?.items.filter(i => selectedItems.includes(i.id)) || []
  const totalRefund = selectedItemsData.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Start a Return</h1>
        <p className="text-gray-400 mb-8">We're sorry to see your items go. Let's get this sorted.</p>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
          {[
            { num: 1, label: "Select Order" },
            { num: 2, label: "Choose Items" },
            { num: 3, label: "Return Method" },
            { num: 4, label: "Confirm" },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                step >= s.num ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-500"
              }`}>
                {step > s.num ? <CheckCircleSolid className="w-5 h-5" /> : s.num}
              </div>
              <span className={`ml-2 whitespace-nowrap ${step >= s.num ? "text-cyan-400" : "text-gray-500"}`}>{s.label}</span>
              {index < 3 && <ChevronRight className="w-5 h-5 text-gray-600 mx-4" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Select Order */}
            {step === 1 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Select an Order</h2>
                <div className="space-y-4">
                  {eligibleOrders.map((order) => (
                    <label
                      key={order.id}
                      className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedOrder === order.id ? "border-cyan-500 bg-cyan-500/10" : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="order"
                          value={order.id}
                          checked={selectedOrder === order.id}
                          onChange={() => setSelectedOrder(order.id)}
                          className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-white">{order.id}</p>
                          <p className="text-sm text-gray-400">Ordered on {order.date} - {order.items.length} items</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedOrder}
                  className="mt-6 w-full bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 font-medium"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Choose Items */}
            {step === 2 && selectedOrderData && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Select Items to Return</h2>
                <div className="space-y-4">
                  {selectedOrderData.items.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedItems.includes(item.id) ? "border-cyan-500 bg-cyan-500/10" : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, item.id])
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== item.id))
                          }
                        }}
                        className="w-5 h-5 text-cyan-500 rounded bg-gray-800 border-gray-600"
                      />
                      <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                        <CubeSolid className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-gray-400">Size: {item.size}</p>
                      </div>
                      <p className="font-semibold text-white">${item.price}</p>
                    </label>
                  ))}
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Return</label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
                  >
                    <option value="">Select a reason</option>
                    {returnReasons.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-700 text-white py-3 rounded-lg hover:bg-gray-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={selectedItems.length === 0 || !returnReason}
                    className="flex-1 bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Return Method */}
            {step === 3 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Choose Return Method</h2>
                <div className="space-y-4">
                  <label
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      returnMethod === "pickup" ? "border-cyan-500 bg-cyan-500/10" : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="method"
                        value="pickup"
                        checked={returnMethod === "pickup"}
                        onChange={() => setReturnMethod("pickup")}
                        className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600"
                      />
                      <div>
                        <p className="font-semibold text-white">Schedule Pickup</p>
                        <p className="text-sm text-gray-400">We'll come to your location to collect the items</p>
                      </div>
                    </div>
                  </label>
                  <label
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      returnMethod === "dropoff" ? "border-cyan-500 bg-cyan-500/10" : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="method"
                        value="dropoff"
                        checked={returnMethod === "dropoff"}
                        onChange={() => setReturnMethod("dropoff")}
                        className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600"
                      />
                      <div>
                        <p className="font-semibold text-white">Drop Off</p>
                        <p className="text-sm text-gray-400">Drop off at a nearby collection point</p>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-700 text-white py-3 rounded-lg hover:bg-gray-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleSolid className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Return Request Submitted</h2>
                  <p className="text-gray-400 mb-6">Your return request has been created successfully.</p>
                  <p className="text-gray-400">
                    {returnMethod === "pickup" 
                      ? "We'll contact you to schedule a pickup." 
                      : "Print the return label and drop off your package."
                    }
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href="/returns" className="flex-1 border border-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 text-center">
                    View Returns
                  </a>
                  <button className="flex-1 bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 font-medium">
                    Print Label
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-white mb-4">Return Summary</h2>
              
              {selectedItemsData.length > 0 ? (
                <>
                  <div className="space-y-3 mb-4">
                    {selectedItemsData.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.name}</span>
                        <span className="text-white">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Estimated Refund</span>
                      <span className="text-emerald-400">${totalRefund}</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">Select items to see refund estimate</p>
              )}

              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2">
                <ExclamationCircleSolid className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-300">
                  Refunds are processed within 5-7 business days after we receive your return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
