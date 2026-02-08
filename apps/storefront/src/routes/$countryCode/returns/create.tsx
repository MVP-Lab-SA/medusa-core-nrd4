import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Package, ChevronRight, Camera, AlertCircle, CheckCircle } from "lucide-react"

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Start a Return</h1>
      <p className="text-gray-600 mb-8">We're sorry to see your items go. Let's get this sorted.</p>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        {[
          { num: 1, label: "Select Order" },
          { num: 2, label: "Choose Items" },
          { num: 3, label: "Return Method" },
          { num: 4, label: "Confirm" },
        ].map((s, index) => (
          <div key={s.num} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step >= s.num ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
            </div>
            <span className={`ml-2 ${step >= s.num ? "text-blue-600" : "text-gray-500"}`}>{s.label}</span>
            {index < 3 && <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Select Order */}
          {step === 1 && (
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Select an Order</h2>
              <div className="space-y-4">
                {eligibleOrders.map((order) => (
                  <label
                    key={order.id}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOrder === order.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="order"
                        value={order.id}
                        checked={selectedOrder === order.id}
                        onChange={() => setSelectedOrder(order.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-500">Ordered on {order.date} - {order.items.length} items</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!selectedOrder}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Choose Items */}
          {step === 2 && selectedOrderData && (
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Select Items to Return</h2>
              <div className="space-y-4">
                {selectedOrderData.items.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedItems.includes(item.id) ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
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
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                    <p className="font-semibold">${item.price}</p>
                  </label>
                ))}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Reason for Return</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
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
                  className="flex-1 border py-3 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedItems.length === 0 || !returnReason}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Return Method */}
          {step === 3 && (
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Choose Return Method</h2>
              <div className="space-y-4">
                <label
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                    returnMethod === "pickup" ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="method"
                      value="pickup"
                      checked={returnMethod === "pickup"}
                      onChange={() => setReturnMethod("pickup")}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <p className="font-semibold">Schedule Pickup</p>
                      <p className="text-sm text-gray-500">We'll come to your location to collect the items</p>
                    </div>
                  </div>
                </label>
                <label
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                    returnMethod === "dropoff" ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="method"
                      value="dropoff"
                      checked={returnMethod === "dropoff"}
                      onChange={() => setReturnMethod("dropoff")}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <p className="font-semibold">Drop Off</p>
                      <p className="text-sm text-gray-500">Drop off at a nearby collection point</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border py-3 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="bg-white border rounded-xl p-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Return Request Submitted</h2>
                <p className="text-gray-600 mb-6">Your return request has been created successfully.</p>
                <p className="text-gray-600">
                  {returnMethod === "pickup" 
                    ? "We'll contact you to schedule a pickup." 
                    : "Print the return label and drop off your package."
                  }
                </p>
              </div>
              <div className="flex gap-4">
                <a href="/returns" className="flex-1 border py-3 rounded-lg hover:bg-gray-50 text-center">
                  View Returns
                </a>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                  Print Label
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div>
          <div className="bg-white border rounded-xl p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Return Summary</h2>
            
            {selectedItemsData.length > 0 ? (
              <>
                <div className="space-y-3 mb-4">
                  {selectedItemsData.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Estimated Refund</span>
                    <span className="text-green-600">${totalRefund}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm">Select items to see refund estimate</p>
            )}

            <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Refunds are processed within 5-7 business days after we receive your return.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
