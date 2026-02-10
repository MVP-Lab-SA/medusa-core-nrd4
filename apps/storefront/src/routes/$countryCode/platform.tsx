import { createFileRoute } from "@tanstack/react-router"
import { PlatformNav } from "@/components/navigation"

export const Route = createFileRoute("/$countryCode/platform")({
  component: PlatformPage,
})

function PlatformPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Platform Directory
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore all features and services available on our platform. From shopping and services to business tools and support.
          </p>
        </div>

        {/* Navigation Grid */}
        <PlatformNav />

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">100+</div>
            <div className="text-sm text-gray-500">Vendors</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
            <div className="text-sm text-gray-500">Services</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-sm text-gray-500">Support</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">5</div>
            <div className="text-sm text-gray-500">Countries</div>
          </div>
        </div>
      </div>
    </div>
  )
}
