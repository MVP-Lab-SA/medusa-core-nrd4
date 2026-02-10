import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import { useLocation } from "@tanstack/react-router"

const faqCategories = [
  {
    title: "Products & Technology",
    faqs: [
      {
        question: "What types of sensors does Dakkah CityOS offer?",
        answer: "We offer a comprehensive range of IoT sensors including environmental monitors (air quality, temperature, humidity), traffic sensors, security cameras, smart lighting controllers, and utility meters. All our sensors are designed for outdoor urban deployment with IP67+ ratings.",
      },
      {
        question: "How do your sensors connect to the CityOS platform?",
        answer: "Our sensors support multiple connectivity options including LoRaWAN, NB-IoT, 4G/5G cellular, and WiFi. All data is encrypted end-to-end and transmitted to our secure cloud platform where it can be accessed through our dashboard or API.",
      },
      {
        question: "What is the typical lifespan of your hardware?",
        answer: "Our sensors are built for durability with an expected operational lifespan of 10+ years. They feature ruggedized enclosures, wide temperature tolerance (-40C to +85C), and low-power designs with solar charging options.",
      },
      {
        question: "Can your products integrate with existing city infrastructure?",
        answer: "Yes, our CityOS platform is designed for interoperability. We support standard protocols like MQTT, REST APIs, and can integrate with existing SCADA systems, traffic management platforms, and municipal databases.",
      },
    ],
  },
  {
    title: "Orders & Shipping",
    faqs: [
      {
        question: "What is the typical lead time for orders?",
        answer: "Standard products ship within 2-4 weeks. Custom configurations or large volume orders may require 6-8 weeks. We recommend contacting our sales team for accurate timelines on specific requirements.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 50 countries worldwide. International orders are handled by our logistics partners with full customs documentation. Shipping costs and delivery times vary by destination.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards, bank transfers, and purchase orders for qualified organizations. Government and municipal customers may qualify for net-30 or net-60 payment terms.",
      },
      {
        question: "Is there a minimum order quantity?",
        answer: "For most products, there is no minimum order. However, volume discounts are available for orders of 50+ units. Contact our sales team for enterprise pricing.",
      },
    ],
  },
  {
    title: "Support & Warranty",
    faqs: [
      {
        question: "What warranty do you provide?",
        answer: "All Dakkah CityOS products come with a 3-year manufacturer warranty covering defects in materials and workmanship. Extended warranty options up to 10 years are available for purchase.",
      },
      {
        question: "How do I get technical support?",
        answer: "Technical support is available 24/7 through our support portal, email, and phone. Enterprise customers receive dedicated support engineers and priority response times under 4 hours.",
      },
      {
        question: "Do you offer installation services?",
        answer: "Yes, we offer professional installation services through our certified partner network. We can also provide training for your technical staff to handle installations independently.",
      },
      {
        question: "What training resources are available?",
        answer: "We provide comprehensive documentation, video tutorials, and live training sessions. Enterprise customers receive on-site training as part of their deployment package.",
      },
    ],
  },
]

const FAQPage = () => {
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname) || "us"

  return (
    <div className="bg-city-dark py-20">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">FAQ</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-city-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-city-gray max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and platform.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-xl font-bold text-city-cyan mb-6 border-b border-city-steel pb-2">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="bg-city-navy border border-city-steel px-4"
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center">
          <div className="bg-city-navy border border-city-steel p-8 max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-city-white mb-2">
              Still have questions?
            </h3>
            <p className="text-city-gray mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <Link to="/$countryCode/contact" params={{ countryCode }}>
              <Button variant="primary">Contact Support</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
