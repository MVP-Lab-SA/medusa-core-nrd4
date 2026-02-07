import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { BellAlert, XMark, ArrowDownMini, Check } from "@medusajs/icons"
import { Button } from "./button"
import { Thumbnail } from "./thumbnail"

interface PriceAlert {
  id: string
  product: {
    id: string
    title: string
    handle: string
    thumbnail?: string
    currentPrice: string
  }
  targetPrice: number
  createdAt: string
  triggered?: boolean
  newPrice?: string
}

interface PriceAlertsProps {
  alerts: PriceAlert[]
  onDelete: (id: string) => void
  onAddToCart?: (productId: string) => void
  currency?: string
  className?: string
}

export function PriceAlerts({
  alerts,
  onDelete,
  onAddToCart,
  currency = "USD",
  className = ""
}: PriceAlertsProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const triggeredAlerts = alerts.filter(a => a.triggered)
  const activeAlerts = alerts.filter(a => !a.triggered)

  if (alerts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <BellAlert className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No price alerts</h3>
        <p className="text-gray-500 mb-6">Set alerts on products to get notified when prices drop</p>
        <Link to="/us/store">
          <Button variant="outline">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Price Dropped!
          </h3>
          <div className="space-y-3">
            {triggeredAlerts.map(alert => (
              <div
                key={alert.id}
                className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <Link to={`/us/products/${alert.product.handle}`} className="w-16 h-16 flex-shrink-0">
                  <Thumbnail
                    src={alert.product.thumbnail}
                    alt={alert.product.title}
                    className="w-full h-full object-cover rounded"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/us/products/${alert.product.handle}`}
                    className="font-medium text-gray-900 hover:text-cyan-600 line-clamp-1"
                  >
                    {alert.product.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-green-600">{alert.newPrice}</span>
                    <span className="text-sm text-gray-400 line-through">{alert.product.currentPrice}</span>
                    <ArrowDownMini className="w-4 h-4 text-green-600" />
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => onAddToCart?.(alert.product.id)}
                >
                  Add to Cart
                </Button>

                <button
                  onClick={() => onDelete(alert.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <XMark className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-4">
            Active Alerts ({activeAlerts.length})
          </h3>
          <div className="space-y-3">
            {activeAlerts.map(alert => (
              <div
                key={alert.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <Link to={`/us/products/${alert.product.handle}`} className="w-16 h-16 flex-shrink-0">
                  <Thumbnail
                    src={alert.product.thumbnail}
                    alt={alert.product.title}
                    className="w-full h-full object-cover rounded"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/us/products/${alert.product.handle}`}
                    className="font-medium text-gray-900 hover:text-cyan-600 line-clamp-1"
                  >
                    {alert.product.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    Current: <span className="font-medium">{alert.product.currentPrice}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Alert when below: <span className="font-medium text-cyan-600">{formatPrice(alert.targetPrice)}</span>
                  </p>
                </div>

                <button
                  onClick={() => onDelete(alert.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                >
                  <XMark className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface SetPriceAlertProps {
  currentPrice: number
  productId: string
  onSet: (targetPrice: number) => void
  currency?: string
}

export function SetPriceAlert({
  currentPrice,
  productId,
  onSet,
  currency = "USD"
}: SetPriceAlertProps) {
  const [targetPrice, setTargetPrice] = useState(Math.floor(currentPrice * 0.9))
  const [isSet, setIsSet] = useState(false)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const handleSet = () => {
    onSet(targetPrice)
    setIsSet(true)
  }

  if (isSet) {
    return (
      <div className="flex items-center gap-2 p-3 bg-cyan-50 rounded-lg">
        <Check className="w-5 h-5 text-cyan-600" />
        <p className="text-sm text-cyan-700">
          We'll notify you when the price drops below {formatPrice(targetPrice)}
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <BellAlert className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-900">Set Price Alert</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Get notified when the price drops below your target
      </p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(Number(e.target.value))}
            max={currentPrice - 1}
            className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <Button onClick={handleSet}>Set Alert</Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Current price: {formatPrice(currentPrice)}
      </p>
    </div>
  )
}
