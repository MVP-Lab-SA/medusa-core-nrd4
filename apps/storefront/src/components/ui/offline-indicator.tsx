import { useState, useEffect } from "react"
import { WifiOff, ArrowPath } from "@medusajs/icons"

interface OfflineIndicatorProps {
  className?: string
}

export function OfflineIndicator({ className = "" }: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShowReconnected(true)
      setTimeout(() => setShowReconnected(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline && !showReconnected) return null

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${className}`}>
      {!isOnline ? (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg shadow-lg">
          <WifiOff className="w-5 h-5" />
          <span className="font-medium">You're offline</span>
        </div>
      ) : showReconnected ? (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in">
          <ArrowPath className="w-5 h-5" />
          <span className="font-medium">Back online</span>
        </div>
      ) : null}
    </div>
  )
}
