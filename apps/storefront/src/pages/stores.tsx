import { useState } from "react"
import { StoreLocator } from "@/components/ui/store-locator"

interface StoresPageProps {
  countryCode: string
}

export default function StoresPage({ countryCode }: StoresPageProps) {
  const stores = [
    {
      id: "1",
      name: "CityOS Flagship - San Francisco",
      address: "123 Market Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      phone: "(415) 555-0100",
      hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
      distance: "0.5 mi",
      lat: 37.7749,
      lng: -122.4194,
      services: ["Demo Center", "Installation", "Support"]
    },
    {
      id: "2",
      name: "CityOS - Palo Alto",
      address: "456 University Avenue",
      city: "Palo Alto",
      state: "CA",
      postalCode: "94301",
      phone: "(650) 555-0200",
      hours: "Mon-Sat: 10am-7pm, Sun: 12pm-5pm",
      distance: "12.3 mi",
      lat: 37.4419,
      lng: -122.143,
      services: ["Demo Center", "Consultation"]
    },
    {
      id: "3",
      name: "CityOS - San Jose",
      address: "789 Innovation Drive",
      city: "San Jose",
      state: "CA",
      postalCode: "95112",
      phone: "(408) 555-0300",
      hours: "Mon-Sat: 9am-8pm, Sun: 10am-6pm",
      distance: "45.2 mi",
      lat: 37.3382,
      lng: -121.8863,
      services: ["Demo Center", "Installation", "Training"]
    },
    {
      id: "4",
      name: "CityOS - Oakland",
      address: "321 Broadway",
      city: "Oakland",
      state: "CA",
      postalCode: "94607",
      phone: "(510) 555-0400",
      hours: "Mon-Fri: 10am-7pm, Sat: 10am-6pm",
      distance: "8.1 mi",
      lat: 37.8044,
      lng: -122.2712,
      services: ["Pickup", "Support"]
    }
  ]

  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Find a Store</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Visit one of our experience centers to see CityOS products in action
          </p>
        </div>

        {/* Store Locator */}
        <StoreLocator
          stores={stores}
          onSearch={handleSearch}
          className="mb-16"
        />

        {/* Store Services */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Services Available at Our Stores
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Demo Center",
                description: "Experience our products hands-on with expert guidance",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Expert Consultation",
                description: "Get personalized advice from our IoT specialists",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                )
              },
              {
                title: "Installation Services",
                description: "Professional installation by certified technicians",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
              {
                title: "Technical Support",
                description: "Get help troubleshooting and optimizing your setup",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((service, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
