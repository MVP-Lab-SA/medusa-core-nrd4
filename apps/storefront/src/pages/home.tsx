import { Link, useLocation } from "@tanstack/react-router"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import { ArrowRight, BuildingsSolid, LightBulbSolid, ShieldCheck } from "@medusajs/icons"

const Home = () => {
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname) || "us"

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 grid-pattern opacity-60" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-city-dark via-city-navy to-city-slate" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-city-dark to-transparent" />
        
        {/* Glowing orb effect */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-city-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-city-cyan/5 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="content-container relative z-10 py-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-city-cyan/30 bg-city-cyan/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-city-cyan animate-pulse" />
              <span className="text-city-cyan text-sm font-medium tracking-wide">SMART CITY INFRASTRUCTURE</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-city-white mb-6 leading-[0.95]">
              DAKKAH
              <span className="block text-city-cyan">CITY<span className="text-city-gray/40">OS</span></span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-city-gray max-w-2xl mb-10 leading-relaxed font-light">
              Precision infrastructure for the cities of tomorrow. Smart sensors, monitoring systems, and urban technology designed for Saudi Arabia's vision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/$countryCode/store" 
                params={{ countryCode }}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-city-cyan text-city-dark font-semibold text-lg transition-all duration-300 hover:bg-city-cyan-light hover:shadow-lg hover:shadow-city-cyan/20"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-city-steel text-city-white font-medium text-lg transition-all duration-300 hover:border-city-cyan hover:text-city-cyan">
                Learn More
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl">
              <div className="border-l-2 border-city-cyan/30 pl-4">
                <div className="text-3xl md:text-4xl font-bold text-city-white">150+</div>
                <div className="text-city-muted text-sm mt-1">Cities Connected</div>
              </div>
              <div className="border-l-2 border-city-cyan/30 pl-4">
                <div className="text-3xl md:text-4xl font-bold text-city-white">99.9%</div>
                <div className="text-city-muted text-sm mt-1">Uptime</div>
              </div>
              <div className="border-l-2 border-city-cyan/30 pl-4">
                <div className="text-3xl md:text-4xl font-bold text-city-white">24/7</div>
                <div className="text-city-muted text-sm mt-1">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="w-32 h-32 border border-city-cyan/20 relative">
            <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-city-cyan" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-city-cyan" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-city-navy relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="content-container relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-city-cyan tracking-widest uppercase mb-4">WHY DAKKAH</h2>
            <p className="text-3xl md:text-4xl font-bold text-city-white max-w-2xl mx-auto">
              Infrastructure that powers intelligent cities
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BuildingsSolid className="w-8 h-8" viewBox="0 0 15 15" />}
              title="Urban Sensors"
              description="High-precision environmental monitoring and traffic sensors built for extreme conditions."
            />
            <FeatureCard 
              icon={<LightBulbSolid className="w-8 h-8" viewBox="0 0 15 15" />}
              title="Smart Lighting"
              description="Adaptive LED systems with integrated IoT connectivity for real-time city management."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8" viewBox="0 0 15 15" />}
              title="Security Systems"
              description="Enterprise-grade surveillance and access control designed for public infrastructure."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-city-dark relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        {/* Large glowing element */}
        <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-96 h-96 bg-city-cyan/10 rounded-full blur-3xl" />
        
        <div className="content-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-city-white mb-6">
              Ready to build smarter?
            </h2>
            <p className="text-xl text-city-gray mb-10">
              Join the network of cities transforming their infrastructure with Dakkah CityOS technology.
            </p>
            <Link 
              to="/$countryCode/store" 
              params={{ countryCode }}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-city-cyan text-city-dark font-semibold text-lg transition-all duration-300 hover:bg-city-cyan-light glow-cyan"
            >
              Browse Catalog
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) => {
  return (
    <div className="group p-8 bg-city-slate/50 border border-city-steel/50 transition-all duration-300 hover:border-city-cyan/50 hover:bg-city-slate/70">
      <div className="w-14 h-14 flex items-center justify-center bg-city-cyan/10 text-city-cyan mb-6 transition-colors group-hover:bg-city-cyan/20">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-city-white mb-3">{title}</h3>
      <p className="text-city-gray leading-relaxed">{description}</p>
    </div>
  )
}

export default Home
