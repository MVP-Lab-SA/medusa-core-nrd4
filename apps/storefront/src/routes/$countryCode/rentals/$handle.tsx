import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowLeft, Check, Clock, Spinner, ShieldCheck } from "@medusajs/icons"
import { useRentalProduct, useCreateRental } from "../../../lib/hooks/use-commerce-models"
import { useCustomer } from "@/lib/context/customer-context"

export const Route = createFileRoute("/$countryCode/rentals/$handle")({
  component: RentalDetailPage,
})

function RentalDetailPage() {
  const { countryCode, handle } = Route.useParams()
  const { data: product, isLoading } = useRentalProduct(handle)
  const { customer } = useCustomer()
  const createRental = useCreateRental()
  
  const [duration, setDuration] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [startDate, setStartDate] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-city-cyan border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/$countryCode/rentals" params={{ countryCode }} className="text-city-cyan hover:underline">
            Back to Rentals
          </Link>
        </div>
      </div>
    )
  }

  const rate = duration === "daily" ? product.dailyRate : duration === "weekly" ? product.weeklyRate : product.monthlyRate
  const total = rate + product.deposit

  const handleBook = async () => {
    if (!customer || !startDate) return
    setIsBooking(true)
    try {
      const days = duration === "daily" ? 1 : duration === "weekly" ? 7 : 30
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + days)
      
      await createRental.mutateAsync({
        customerId: customer.id,
        productId: product.id,
        startDate,
        endDate: endDate.toISOString().split("T")[0],
        duration,
      })
      alert("Rental booked successfully!")
    } catch (error) {
      alert("Failed to book rental")
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="min-h-screen bg-city-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/$countryCode/rentals"
          params={{ countryCode }}
          className="inline-flex items-center gap-2 text-city-gray hover:text-city-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Rentals
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-video rounded-xl overflow-hidden bg-city-slate/30">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Specifications */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-city-slate/30 p-4 rounded-lg">
                    <div className="text-city-gray text-sm">{key}</div>
                    <div className="text-white font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <span className="text-city-cyan text-sm font-medium">{product.category}</span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">{product.title}</h1>
            <p className="text-city-gray mb-6">{product.description}</p>

            {/* Availability */}
            <div className="flex items-center gap-2 mb-8">
              {product.available ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400">{product.stock} units available</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-red-400">Currently unavailable</span>
                </>
              )}
            </div>

            {/* Duration Selection */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Rental Duration</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "daily", label: "Daily", rate: product.dailyRate },
                  { value: "weekly", label: "Weekly", rate: product.weeklyRate },
                  { value: "monthly", label: "Monthly", rate: product.monthlyRate },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDuration(option.value as typeof duration)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      duration === option.value
                        ? "border-city-cyan bg-city-cyan/10"
                        : "border-city-slate/50 hover:border-city-slate"
                    }`}
                  >
                    <div className="text-white font-semibold">${option.rate}</div>
                    <div className="text-city-gray text-sm">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-city-slate/30 border border-city-slate/50 rounded-lg text-white focus:outline-none focus:border-city-cyan"
              />
            </div>

            {/* Price Summary */}
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-6 mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-city-gray">Rental Rate ({duration})</span>
                <span className="text-white">${rate}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-city-gray">Refundable Deposit</span>
                <span className="text-white">${product.deposit}</span>
              </div>
              <div className="border-t border-city-slate/50 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total Due Now</span>
                  <span className="text-city-cyan font-bold text-xl">${total}</span>
                </div>
              </div>
            </div>

            {/* Book Button */}
            {customer ? (
              <button
                onClick={handleBook}
                disabled={!product.available || !startDate || isBooking}
                className="w-full py-4 bg-city-cyan text-city-navy font-semibold rounded-lg hover:bg-city-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? "Booking..." : "Book Rental"}
              </button>
            ) : (
              <Link
                to="/$countryCode/account/login"
                params={{ countryCode }}
                className="block w-full py-4 bg-city-cyan text-city-navy font-semibold rounded-lg text-center hover:bg-city-cyan/90 transition-colors"
              >
                Sign In to Book
              </Link>
            )}

            {/* What's Included */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">What's Included</h3>
              <ul className="space-y-2">
                {product.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-city-gray">
                    <Check className="w-5 h-5 text-city-cyan flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Rental Terms</h3>
              <ul className="space-y-2">
                {product.terms.map((term, i) => (
                  <li key={i} className="flex items-start gap-3 text-city-gray">
                    <ShieldCheck className="w-5 h-5 text-city-cyan flex-shrink-0 mt-0.5" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
