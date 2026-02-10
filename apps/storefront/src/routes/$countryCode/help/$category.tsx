import { createFileRoute } from "@tanstack/react-router"
import { FAQAccordion } from "@/components/content"
import { MagnifyingGlass, ArrowLeftMini, ChatBubble, Phone, EnvelopeSolid } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/help/$category")({
  component: HelpCategoryPage,
})

function HelpCategoryPage() {
  const { category } = Route.useParams()

  const categories: Record<string, { title: string; description: string; faqs: Array<{ question: string; answer: string }> }> = {
    orders: {
      title: "Orders & Shipping",
      description: "Everything about placing orders, tracking shipments, and delivery",
      faqs: [
        { question: "How do I track my order?", answer: "You can track your order by going to your account and clicking on 'Orders'. Each order has a tracking number that you can use to see the current status and location of your package." },
        { question: "What are the shipping options?", answer: "We offer Standard (3-5 business days), Express (1-2 business days), and Same-Day delivery for select areas. Shipping costs vary based on the option selected and delivery location." },
        { question: "Can I change my delivery address after placing an order?", answer: "Yes, you can change your delivery address within 1 hour of placing your order. Go to your order details and click 'Edit Address'. After this window, please contact customer support." },
        { question: "What happens if I'm not home for delivery?", answer: "Our delivery partner will attempt to deliver twice. If unsuccessful, the package will be held at a nearby pickup point for 7 days. You'll receive SMS notifications with pickup instructions." },
        { question: "Do you offer international shipping?", answer: "Currently, we ship within the country only. International shipping is coming soon. Sign up for our newsletter to be notified when it launches." },
      ],
    },
    returns: {
      title: "Returns & Refunds",
      description: "Information about our return policy and refund process",
      faqs: [
        { question: "What is your return policy?", answer: "You can return most items within 14 days of delivery for a full refund. Items must be unused, in original packaging, with all tags attached." },
        { question: "How do I start a return?", answer: "Go to your Orders, find the item you want to return, and click 'Start Return'. Follow the prompts to select a return reason and choose pickup or drop-off." },
        { question: "How long does a refund take?", answer: "Once we receive your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method." },
        { question: "Can I exchange an item instead of returning it?", answer: "Yes! During the return process, select 'Exchange' instead of 'Refund'. Choose the new size/color and we'll ship it once we receive your return." },
        { question: "What items cannot be returned?", answer: "Personalized items, intimate wear, perishable goods, and items marked as 'Final Sale' cannot be returned. Please check the product page for return eligibility." },
      ],
    },
    payments: {
      title: "Payments & Billing",
      description: "Payment methods, billing questions, and invoices",
      faqs: [
        { question: "What payment methods do you accept?", answer: "We accept credit/debit cards (Visa, Mastercard, Amex), digital wallets (Apple Pay, Google Pay), and Buy Now Pay Later options through our partners." },
        { question: "Is my payment information secure?", answer: "Absolutely. We use bank-level encryption and never store your full card details. All transactions are processed through PCI-compliant payment providers." },
        { question: "How does Buy Now Pay Later work?", answer: "Select BNPL at checkout to split your purchase into 4 interest-free payments. You'll pay the first installment at checkout, then the remaining 3 over 6 weeks." },
        { question: "Can I get an invoice for my order?", answer: "Yes, invoices are automatically generated for all orders. You can download them from your order details page or your Account > Invoices section." },
        { question: "Why was my payment declined?", answer: "Common reasons include insufficient funds, incorrect card details, or bank security flags. Please verify your details and try again, or contact your bank." },
      ],
    },
    account: {
      title: "Account & Security",
      description: "Managing your account, privacy, and security settings",
      faqs: [
        { question: "How do I reset my password?", answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive a link to create a new password. The link expires in 24 hours." },
        { question: "How do I update my personal information?", answer: "Go to Account > Settings to update your name, email, phone number, and addresses. Changes take effect immediately." },
        { question: "Can I delete my account?", answer: "Yes, go to Account > Settings > Privacy and click 'Delete Account'. This action is permanent and will remove all your data after 30 days." },
        { question: "How do I enable two-factor authentication?", answer: "Go to Account > Security and toggle on Two-Factor Authentication. You can use SMS or an authenticator app for added security." },
        { question: "Why am I logged out automatically?", answer: "For security, sessions expire after 30 days of inactivity. Enable 'Remember Me' at login to stay signed in for longer on trusted devices." },
      ],
    },
  }

  const categoryData = categories[category] || {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: "Help articles for this category",
    faqs: [],
  }

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/help" className="inline-flex items-center gap-2 text-city-gray hover:text-city-white transition-colors mb-6">
          <ArrowLeftMini className="w-4 h-4" />
          Back to Help Center
        </a>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-city-white mb-2">{categoryData.title}</h1>
          <p className="text-city-gray mb-8">{categoryData.description}</p>

          {/* Search */}
          <div className="relative mb-8">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-city-muted" />
            <input
              type="text"
              placeholder={`Search in ${categoryData.title}...`}
              className="w-full pl-12 pr-4 py-3 bg-city-navy border border-city-steel rounded-xl text-city-white placeholder-city-muted focus:outline-none focus:border-city-cyan transition-colors"
            />
          </div>

          {/* FAQs */}
          <div className="space-y-4 mb-8">
            {categoryData.faqs.map((faq, index) => (
              <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Still need help */}
          <div className="bg-city-navy border border-city-steel rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-city-white mb-2">Still need help?</h2>
            <p className="text-city-gray mb-6">Our support team is ready to assist you</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-city-cyan text-city-dark rounded-lg hover:bg-city-cyan-light transition-colors font-medium">
                <ChatBubble className="w-5 h-5" />
                Start Live Chat
              </button>
              <a href="tel:+1234567890" className="flex items-center justify-center gap-2 px-6 py-3 border border-city-steel text-city-white rounded-lg hover:bg-city-slate transition-colors">
                <Phone className="w-5 h-5" />
                Call Support
              </a>
              <a href="mailto:support@example.com" className="flex items-center justify-center gap-2 px-6 py-3 border border-city-steel text-city-white rounded-lg hover:bg-city-slate transition-colors">
                <EnvelopeSolid className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
