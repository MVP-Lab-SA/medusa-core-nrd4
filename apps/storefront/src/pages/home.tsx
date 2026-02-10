import { Link, useLocation } from "@tanstack/react-router"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import { useHomePage, useAnnouncements, defaultHomePage } from "@/lib/cms"
import { ArrowRight, BuildingsSolid, LightBulbSolid, ShieldCheck, Star } from "@medusajs/icons"
import { useState, useEffect } from "react"

// Countdown Timer Component
const CountdownTimer = ({ endDate }: { endDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [endDate])
  
  return (
    <div className="flex gap-2">
      {[
        { value: timeLeft.days, label: "D" },
        { value: timeLeft.hours, label: "H" },
        { value: timeLeft.minutes, label: "M" },
        { value: timeLeft.seconds, label: "S" },
      ].map((item, i) => (
        <div key={i} className="bg-city-dark/50 px-3 py-2 rounded">
          <span className="text-city-white font-bold text-lg">{String(item.value).padStart(2, "0")}</span>
          <span className="text-city-muted text-xs ml-1">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// Testimonial Component
const TestimonialCard = ({ name, role, company, content }: { name: string; role: string; company: string; content: string }) => (
  <div className="bg-city-navy border border-city-steel/30 p-6 rounded-lg">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-city-cyan fill-current" />
      ))}
    </div>
    <p className="text-city-gray mb-6 italic">"{content}"</p>
    <div>
      <div className="text-city-white font-semibold">{name}</div>
      <div className="text-city-muted text-sm">{role}, {company}</div>
    </div>
  </div>
)

// Sale end date - 7 days from now
const saleEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

// Default slides used when CMS is unavailable
const defaultSlides = [
  { id: 'slide-1', title: "Smart City Infrastructure", subtitle: "Precision sensors and monitoring systems", image: { url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=800&fit=crop", alt: "Smart City" } },
  { id: 'slide-2', title: "New Urban Tech Collection", subtitle: "Advanced IoT devices for modern cities", image: { url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&h=800&fit=crop", alt: "Urban Tech" } },
  { id: 'slide-3', title: "Enterprise Solutions", subtitle: "Scalable infrastructure for government projects", image: { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop", alt: "Enterprise" } },
]

const Home = () => {
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname) || "us"
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // CMS data with automatic fallback
  const { data: homePage } = useHomePage()
  
  // Use CMS slides if available, otherwise use defaults
  const slides = (homePage?.hero?.slides?.length ? homePage.hero.slides : defaultSlides).map(slide => ({
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    image: typeof slide.image === 'string' ? slide.image : slide.image?.url || '',
  }))
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Banner Carousel */}
      <section className="relative h-[60vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            {slide.image && <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-r from-city-dark/90 via-city-dark/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="content-container">
                <h2 className="text-4xl md:text-6xl font-bold text-city-white mb-4">{slide.title}</h2>
                <p className="text-xl text-city-gray mb-8 max-w-xl">{slide.subtitle}</p>
                <Link 
                  to="/$countryCode/store" 
                  params={{ countryCode }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-city-cyan text-city-dark font-semibold hover:bg-city-cyan-light transition-colors"
                >
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-city-cyan" : "bg-city-white/30"}`}
            />
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-8 bg-gradient-to-r from-city-navy via-city-slate to-city-navy border-y border-city-cyan/20">
        <div className="content-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-city-white">
                Flash Sale: <span className="text-city-cyan">20% OFF</span> All Sensors
              </h2>
              <p className="text-city-gray mt-1">Limited time offer on our best-selling products</p>
            </div>
            <div className="flex items-center gap-6">
              <CountdownTimer endDate={saleEndDate} />
              <Link 
                to="/$countryCode/store" 
                params={{ countryCode }}
                className="px-6 py-3 bg-city-cyan text-city-dark font-semibold hover:bg-city-cyan-light transition-colors"
              >
                Shop Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-city-dark">
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "150+", label: "Cities Connected" },
              { value: "50,000+", label: "Products Deployed" },
              { value: "99.9%", label: "System Uptime" },
              { value: "< 2hrs", label: "Support Response" },
            ].map((stat, i) => (
              <div key={i} className="bg-city-navy border border-city-steel/30 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-city-cyan mb-2">{stat.value}</div>
                <div className="text-city-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-city-dark via-city-navy to-city-slate" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-city-dark to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-city-cyan/10 rounded-full blur-3xl animate-pulse-glow" />

        <div className="content-container relative z-10 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-city-cyan/30 bg-city-cyan/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-city-cyan animate-pulse" />
              <span className="text-city-cyan text-sm font-medium tracking-wide">SMART CITY INFRASTRUCTURE</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-city-white mb-6 leading-[0.95]">
              DAKKAH
              <span className="block text-city-cyan">CITY<span className="text-city-gray/40">OS</span></span>
            </h1>

            <p className="text-xl md:text-2xl text-city-gray max-w-2xl mb-10 leading-relaxed font-light">
              Precision infrastructure for the cities of tomorrow. Smart sensors, monitoring systems, and urban technology designed for Saudi Arabia's vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/$countryCode/store" 
                params={{ countryCode }}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-city-cyan text-city-dark font-semibold text-lg transition-all duration-300 hover:bg-city-cyan-light hover:shadow-lg hover:shadow-city-cyan/20"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/$countryCode/about"
                params={{ countryCode }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-city-steel text-city-white font-medium text-lg transition-all duration-300 hover:border-city-cyan hover:text-city-cyan"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-city-navy relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="content-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-city-cyan tracking-widest uppercase mb-4">WHY DAKKAH</h2>
            <p className="text-3xl md:text-4xl font-bold text-city-white max-w-2xl mx-auto">
              Infrastructure that powers intelligent cities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BuildingsSolid className="w-8 h-8" />}
              title="Urban Sensors"
              description="High-precision environmental monitoring and traffic sensors built for extreme conditions."
            />
            <FeatureCard 
              icon={<LightBulbSolid className="w-8 h-8" />}
              title="Smart Lighting"
              description="Adaptive LED systems with integrated IoT connectivity for real-time city management."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Security Systems"
              description="Enterprise-grade surveillance and access control designed for public infrastructure."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-city-dark relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="content-container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-city-cyan tracking-widest uppercase mb-4">TESTIMONIALS</h2>
            <p className="text-3xl md:text-4xl font-bold text-city-white">
              Trusted by industry leaders
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Ahmed Al-Rashid"
              role="Infrastructure Director"
              company="Riyadh Municipality"
              content="Dakkah's sensor network has transformed how we monitor and manage city infrastructure."
            />
            <TestimonialCard 
              name="Sarah Chen"
              role="Smart City Lead"
              company="NEOM Project"
              content="The quality and reliability of Dakkah products exceed all expectations."
            />
            <TestimonialCard 
              name="Mohammed Al-Harbi"
              role="CTO"
              company="Urban Tech Solutions"
              content="We've deployed Dakkah systems across multiple projects. Consistent performance every time."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-city-navy border-y border-city-steel/30">
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[
              { icon: "shield", label: "Secure Payments" },
              { icon: "truck", label: "Fast Shipping" },
              { icon: "refresh", label: "Easy Returns" },
              { icon: "headset", label: "24/7 Support" },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-city-muted">
                <div className="w-12 h-12 rounded-full bg-city-slate flex items-center justify-center text-city-cyan">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-city-dark relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
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

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="group p-8 bg-city-slate/50 border border-city-steel/50 transition-all duration-300 hover:border-city-cyan/50 hover:bg-city-slate/70">
    <div className="w-14 h-14 flex items-center justify-center bg-city-cyan/10 text-city-cyan mb-6 transition-colors group-hover:bg-city-cyan/20">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-city-white mb-3">{title}</h3>
    <p className="text-city-gray leading-relaxed">{description}</p>
  </div>
)

export default Home
