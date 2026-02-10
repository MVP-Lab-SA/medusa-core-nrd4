import { createFileRoute, Link } from "@tanstack/react-router"
import { Buildings, DocumentText, User, ShoppingCart, CheckCircle } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/business/")({
  component: BusinessLanding,
})

function BusinessLanding() {
  const { countryCode } = Route.useParams()

  const features = [
    {
      icon: DocumentText,
      title: "Request Quotes",
      description: "Get custom quotes for bulk orders with competitive pricing",
    },
    {
      icon: ShoppingCart,
      title: "Purchase Orders",
      description: "Streamline procurement with dedicated purchase order management",
    },
    {
      icon: User,
      title: "Team Management",
      description: "Add team members with role-based access and approval workflows",
    },
    {
      icon: CheckCircle,
      title: "Net Payment Terms",
      description: "Flexible payment terms including Net 30, 60, and 90 days",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Buildings className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Portal</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Unlock exclusive B2B pricing, streamlined procurement, and dedicated account management for your business.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to={`/${countryCode}/business/register` as any}
              className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900"
            >
              Register Your Business
            </Link>
            <Link
              to={`/${countryCode}/account/business` as any}
              className="px-8 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why Choose B2B?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 border-t border-gray-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of businesses already benefiting from our B2B program.
          </p>
          <Link
            to={`/${countryCode}/business/register` as any}
            className="inline-block px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  )
}
