import { Badge } from "@/components/ui/badge"
import { Buildings, Globe, LightBulb, Users } from "@medusajs/icons"

const stats = [
  { label: "Cities Connected", value: "50+" },
  { label: "Sensors Deployed", value: "100K+" },
  { label: "Data Points Daily", value: "1B+" },
  { label: "Partners Worldwide", value: "200+" },
]

const values = [
  {
    icon: <LightBulb className="w-6 h-6" />,
    title: "Innovation",
    description: "Pushing the boundaries of what's possible in urban infrastructure through cutting-edge technology.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Sustainability",
    description: "Building solutions that reduce environmental impact and create more livable cities for future generations.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaboration",
    description: "Working closely with municipalities, businesses, and communities to solve real urban challenges.",
  },
  {
    icon: <Buildings className="w-6 h-6" />,
    title: "Precision",
    description: "Delivering accurate, reliable data that enables smarter decision-making at every level.",
  },
]

const AboutPage = () => {
  return (
    <div className="bg-city-dark">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-city-cyan/5 to-transparent" />
        <div className="content-container relative">
          <div className="max-w-3xl">
            <Badge variant="cyan" className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-city-white mb-6">
              Building the Infrastructure for
              <span className="text-city-cyan"> Tomorrow's Cities</span>
            </h1>
            <p className="text-xl text-city-gray">
              Dakkah CityOS is pioneering the smart city revolution, providing municipalities 
              and businesses with the hardware and software they need to create more efficient, 
              sustainable, and connected urban environments.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-city-steel">
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-black text-city-cyan mb-2">{stat.value}</div>
                <div className="text-city-gray text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-city-white mb-6">Our Mission</h2>
              <p className="text-city-gray mb-4">
                At Dakkah, we believe that cities can be smarter, more efficient, and more 
                responsive to the needs of their citizens. Our mission is to provide the 
                technological foundation that makes this possible.
              </p>
              <p className="text-city-gray mb-4">
                Through our integrated platform of sensors, analytics, and control systems, 
                we help cities optimize everything from traffic flow and energy consumption 
                to public safety and environmental monitoring.
              </p>
              <p className="text-city-gray">
                The name "Dakkah" comes from the Arabic word for "precision" - a principle 
                that guides everything we do, from the accuracy of our sensors to the 
                reliability of our infrastructure.
              </p>
            </div>
            <div className="bg-city-navy border border-city-steel p-8">
              <div className="aspect-video bg-city-slate flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-city-cyan/20 border border-city-cyan/30 flex items-center justify-center">
                    <Buildings className="w-8 h-8 text-city-cyan" />
                  </div>
                  <p className="text-city-muted">CityOS Platform Overview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-city-navy">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-city-white mb-4">Our Values</h2>
            <p className="text-city-gray max-w-2xl mx-auto">
              These principles guide our work and define who we are as a company.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-city-slate border border-city-steel p-6 hover:border-city-cyan/50 transition-colors"
              >
                <div className="w-12 h-12 bg-city-cyan/20 border border-city-cyan/30 flex items-center justify-center text-city-cyan mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-city-white mb-2">{value.title}</h3>
                <p className="text-city-gray text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="content-container">
          <div className="bg-gradient-to-r from-city-cyan/20 to-city-slate border border-city-cyan/30 p-12 text-center">
            <h2 className="text-3xl font-bold text-city-white mb-4">
              Ready to Transform Your City?
            </h2>
            <p className="text-city-gray mb-8 max-w-2xl mx-auto">
              Join the hundreds of municipalities and businesses already using Dakkah CityOS 
              to build smarter, more sustainable urban environments.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-city-cyan text-city-dark font-bold hover:bg-city-cyan-light transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
