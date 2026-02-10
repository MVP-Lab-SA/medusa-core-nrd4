import { createFileRoute, Link } from "@tanstack/react-router"
import { User, DocumentText, Calendar, MapPin, Buildings } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/verify/")({
  component: VerifyLanding,
})

function VerifyLanding() {
  const { countryCode } = Route.useParams()

  const verificationTypes = [
    {
      id: "kyc",
      icon: User,
      title: "Identity Verification (KYC)",
      description: "Verify your identity with government-issued ID",
      required: true,
    },
    {
      id: "age",
      icon: Calendar,
      title: "Age Verification",
      description: "Confirm your age for age-restricted products",
      required: false,
    },
    {
      id: "residency",
      icon: MapPin,
      title: "Residency Verification",
      description: "Verify your residential address",
      required: false,
    },
    {
      id: "business",
      icon: Buildings,
      title: "Business Verification",
      description: "Verify your business for B2B features",
      required: false,
    },
  ]

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <DocumentText className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Verification Center</h1>
          <p className="text-xl text-gray-400">
            Complete verification to unlock additional features and ensure a secure experience
          </p>
        </div>

        <div className="space-y-4">
          {verificationTypes.map((type) => {
            const Icon = type.icon
            return (
              <Link
                key={type.id}
                to={"/$countryCode/verify/$type" as any}
                params={{ countryCode, type: type.id } as any}
                className="block bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{type.title}</h3>
                      {type.required && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400">{type.description}</p>
                  </div>
                  <div className="text-cyan-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <h3 className="font-bold text-cyan-400 mb-2">Why Verify?</h3>
          <ul className="text-gray-300 space-y-2">
            <li>- Access age-restricted products and services</li>
            <li>- Unlock higher purchase limits</li>
            <li>- Enable faster checkout</li>
            <li>- Secure your account</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
