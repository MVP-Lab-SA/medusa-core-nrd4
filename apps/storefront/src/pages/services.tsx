import { Link } from "@tanstack/react-router"
import { useBookingServices, useServiceProviders } from "@/lib/hooks/use-marketplace"
import { Clock, Users, Star, ArrowRight, Wrench, ShieldCheck, LightBulb, Buildings } from "@medusajs/icons"
import { Badge } from "@/components/ui/badge"

interface ServicesPageProps {
  countryCode: string
}

export default function ServicesPage({ countryCode }: ServicesPageProps) {
  const { data: services, isLoading } = useBookingServices()
  const { data: providers } = useServiceProviders()

  return (
    <div className="min-h-screen bg-city-dark">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden border-b border-city-steel/30">
        <div className="absolute inset-0 bg-gradient-to-b from-city-cyan/5 to-transparent" />
        <div className="content-container relative">
          <div className="max-w-3xl">
            <Badge variant="cyan" className="mb-4">Professional Services</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-city-white mb-4">
              Expert Installation &
              <span className="text-city-cyan"> Support</span>
            </h1>
            <p className="text-xl text-city-gray">
              From professional installation to ongoing support, our certified technicians 
              ensure your smart home system works flawlessly.
            </p>
          </div>
        </div>
      </section>

      <div className="content-container py-12">
        {/* Services Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-city-cyan/20 border border-city-cyan/30 rounded flex items-center justify-center">
              <Wrench className="w-5 h-5 text-city-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-city-white">Our Services</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-city-navy rounded-lg h-80 animate-pulse border border-city-steel/30" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.map((service) => (
                <Link
                  key={service.id}
                  to="/$countryCode/services/$handle"
                  params={{ countryCode, handle: service.handle }}
                  className="group bg-city-navy border border-city-steel/30 rounded-lg overflow-hidden hover:border-city-cyan/50 transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-city-slate">
                    <img
                      src={service.images[0]}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-city-slate text-city-cyan text-xs font-semibold uppercase tracking-wider rounded mb-3">
                      {service.category}
                    </span>
                    <h3 className="text-lg font-bold text-city-white group-hover:text-city-cyan transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-city-gray line-clamp-2 mb-4">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-city-steel/30">
                      <div className="flex items-center gap-4 text-sm text-city-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-city-cyan" />
                          {service.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-city-cyan" />
                          Up to {service.maxParticipants}
                        </span>
                      </div>
                      <span className="font-bold text-city-white">
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
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-city-cyan/20 border border-city-cyan/30 rounded flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-city-cyan" />
              </div>
              <h2 className="text-2xl font-bold text-city-white">Certified Technicians</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-city-navy border border-city-steel/30 rounded-lg p-6 hover:border-city-cyan/50 transition-all"
                >
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-20 h-20 rounded-full mx-auto border-2 border-city-cyan/30"
                  />
                  <div className="text-center mt-4">
                    <h3 className="font-bold text-city-white">{provider.name}</h3>
                    <p className="text-sm text-city-gray mt-1">{provider.description}</p>
                    <div className="flex items-center justify-center gap-1 mt-3">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-city-white">{provider.rating}</span>
                      <span className="text-city-muted">({provider.reviewCount})</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {provider.specialties.slice(0, 2).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-city-slate text-city-gray text-xs rounded"
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
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-city-cyan/20 border border-city-cyan/30 rounded flex items-center justify-center">
              <LightBulb className="w-5 h-5 text-city-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-city-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose a Service",
                description: "Browse our services and select the one that fits your smart home needs",
              },
              {
                step: "2",
                title: "Pick Your Technician",
                description: "Select from our team of certified smart home professionals",
              },
              {
                step: "3",
                title: "Book Your Time",
                description: "Choose a date and time slot that works for your schedule",
              },
              {
                step: "4",
                title: "Get Connected",
                description: "Our expert will arrive and transform your home into a smart hub",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-city-cyan/20 border border-city-cyan/30 rounded-full flex items-center justify-center mx-auto text-city-cyan font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-bold text-city-white mt-4">{item.title}</h3>
                <p className="text-sm text-city-gray mt-2">{item.description}</p>
                {i < 3 && (
                  <div className="hidden md:flex items-center justify-center mt-6">
                    <ArrowRight className="w-6 h-6 text-city-steel" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-city-cyan/20 to-city-slate border border-city-cyan/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-city-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-city-gray mb-8 max-w-2xl mx-auto">
            For complex installations, whole-home automation, or enterprise projects, 
            our team will create a customized plan tailored to your specific needs.
          </p>
          <Link
            to={`/${countryCode}/contact` as any}
            className="inline-flex items-center justify-center px-8 py-4 bg-city-cyan text-city-dark font-bold hover:bg-city-cyan-light transition-colors rounded"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
