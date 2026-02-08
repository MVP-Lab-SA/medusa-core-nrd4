import { Link } from "@tanstack/react-router"
import { useBookingServices, useServiceProviders } from "@/lib/hooks/use-marketplace"
import { Clock, Users, Star, ArrowRight } from "@medusajs/icons"

interface ServicesPageProps {
  countryCode: string
}

export default function ServicesPage({ countryCode }: ServicesPageProps) {
  const { data: services, isLoading } = useBookingServices()
  const { data: providers } = useServiceProviders()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Book a Service</h1>
          <p className="text-teal-100 mt-4 text-lg max-w-2xl mx-auto">
            Schedule appointments with our expert stylists, consultants, and service providers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.map((service) => (
                <Link
                  key={service.id}
                  to="/$countryCode/services/$handle"
                  params={{ countryCode, handle: service.handle }}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={service.images[0]}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {service.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2 group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Up to {service.maxParticipants}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${service.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Providers Section */}
        {providers && providers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Experts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-20 h-20 rounded-full mx-auto"
                  />
                  <div className="text-center mt-4">
                    <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{provider.description}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-gray-400">({provider.reviewCount})</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 mt-3">
                      {provider.specialties.slice(0, 2).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose a Service",
                description: "Browse our services and select the one that fits your needs",
              },
              {
                step: "2",
                title: "Pick Your Expert",
                description: "Select from our team of qualified professionals",
              },
              {
                step: "3",
                title: "Book Your Time",
                description: "Choose a date and time that works for your schedule",
              },
              {
                step: "4",
                title: "Enjoy",
                description: "Meet with your expert and enjoy your personalized experience",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto text-teal-600 font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mt-4">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                {i < 3 && (
                  <ArrowRight className="w-6 h-6 text-gray-300 mx-auto mt-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
