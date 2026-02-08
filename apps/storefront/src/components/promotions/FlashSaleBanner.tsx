import { Link } from "@tanstack/react-router"
import { Bolt } from "@medusajs/icons"
import { CountdownTimer } from "./CountdownTimer"
import type { FlashSale } from "../../lib/mock/marketplace"

interface FlashSaleBannerProps {
  sale: FlashSale
  countryCode: string
}

export function FlashSaleBanner({ sale, countryCode }: FlashSaleBannerProps) {
  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Bolt className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{sale.name}</h2>
            <p className="text-white/80">{sale.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-sm text-white/80 mb-1">Ends in</p>
            <CountdownTimer endDate={sale.endDate} variant="light" />
          </div>
          <Link
            to={`/${countryCode}/flash-sales/${sale.id}`}
            className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}
