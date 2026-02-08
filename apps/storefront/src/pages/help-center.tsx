import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { useFAQs, useFAQCategories } from "@/lib/hooks/use-payloadcms"
import { FAQAccordion, HelpCenterSearch } from "@/components/ui/content-components"
import { Envelope, Phone, ChatBubble, BookOpen, ShoppingBag, CreditCard, ArrowRightOnRectangle, ArrowPath } from "@medusajs/icons"

interface HelpCenterPageProps {
  countryCode: string
}

export default function HelpCenterPage({ countryCode }: HelpCenterPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState("")

  const { data: faqs, isLoading } = useFAQs(selectedCategory)
  const { data: categories } = useFAQCategories()

  const filteredFaqs = searchQuery
    ? faqs?.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs

  const topicIcons: Record<string, React.ReactNode> = {
    Orders: <Package className="w-6 h-6" />,
    Shipping: <Truck className="w-6 h-6" />,
    Returns: <RotateCcw className="w-6 h-6" />,
    Payments: <CreditCard className="w-6 h-6" />,
    Support: <ChatBubble className="w-6 h-6" />,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Help Center</h1>
          <p className="text-blue-100 mt-4 text-lg max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mt-8">
            <HelpCenterSearch
              onSearch={setSearchQuery}
              placeholder="Search for help articles..."
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <ShoppingBag className="w-6 h-6" />, label: "Track Order", href: `/${countryCode}/track` },
            { icon: <ArrowPath className="w-6 h-6" />, label: "Returns", href: `/${countryCode}/returns` },
            { icon: <CreditCard className="w-6 h-6" />, label: "Payment", href: "#payment" },
            { icon: <ArrowRightOnRectangle className="w-6 h-6" />, label: "Shipping", href: "#shipping" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.href}
              className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                {item.icon}
              </div>
              <span className="font-medium text-gray-900">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Topics</h2>
              <nav className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    !selectedCategory
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  All Topics
                </button>
                {categories?.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {topicIcons[category] || <BookOpen className="w-5 h-5" />}
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedCategory
                  ? `${selectedCategory} FAQs`
                  : searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "Frequently Asked Questions"}
              </h2>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredFaqs && filteredFaqs.length > 0 ? (
                <FAQAccordion faqs={filteredFaqs} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No FAQs found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Still Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <ChatBubble className="w-6 h-6" />,
                title: "Live Chat",
                description: "Chat with our support team in real-time",
                action: "Start Chat",
                available: "Available 24/7",
              },
              {
                icon: <Envelope className="w-6 h-6" />,
                title: "Email Support",
                description: "Send us an email and we'll respond within 24 hours",
                action: "Send Email",
                available: "support@store.com",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Phone Support",
                description: "Call us for immediate assistance",
                action: "Call Now",
                available: "1-800-STORE",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-200 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mt-4">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  {item.action}
                </button>
                <p className="text-xs text-gray-400 mt-2">{item.available}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
