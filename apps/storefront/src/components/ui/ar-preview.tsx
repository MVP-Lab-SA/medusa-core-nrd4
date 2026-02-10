import { useState } from "react"
import { CubeSolid } from "@medusajs/icons"
import { Button } from "./button"

interface ARPreviewProps {
  iosUrl?: string
  androidUrl?: string
  fallbackImage?: string
  productName?: string
  className?: string
}

export function ARPreview({
  iosUrl,
  androidUrl,
  fallbackImage,
  productName = "Product",
  className = ""
}: ARPreviewProps) {
  const [showInstructions, setShowInstructions] = useState(false)

  const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = typeof window !== "undefined" && /android/i.test(navigator.userAgent)
  const arUrl = isIOS ? iosUrl : isAndroid ? androidUrl : null
  const isSupported = arUrl !== null

  const handleARClick = () => {
    if (arUrl) {
      window.location.href = arUrl
    } else {
      setShowInstructions(true)
    }
  }

  return (
    <div className={className}>
      <button
        onClick={handleARClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
      >
        <CubeSolid className="w-5 h-5" />
        <span className="font-medium">View in Your Space</span>
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        {isSupported
          ? "Experience this product in augmented reality"
          : "AR available on iOS and Android devices"}
      </p>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowInstructions(false)} />
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              View {productName} in AR
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-semibold">1</span>
                </div>
                <p className="text-sm text-gray-600">
                  Scan the QR code below with your iPhone or Android phone
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-semibold">2</span>
                </div>
                <p className="text-sm text-gray-600">
                  Point your camera at a flat surface
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-semibold">3</span>
                </div>
                <p className="text-sm text-gray-600">
                  Place the 3D model and explore from all angles
                </p>
              </div>
            </div>

            {/* QR Code placeholder */}
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <CubeSolid className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">QR Code</p>
                </div>
              </div>
            </div>

            <Button onClick={() => setShowInstructions(false)} className="w-full">
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
