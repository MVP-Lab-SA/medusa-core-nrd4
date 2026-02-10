import { useState } from "react"
import { ChevronDownMini } from "@medusajs/icons"

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
  order?: number
}

export interface FAQAccordionProps {
  faqs?: FAQItem[]
  question?: string
  answer?: string
}

export function FAQAccordion({ faqs, question, answer }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // If single question/answer provided, convert to array format
  const faqItems: FAQItem[] = faqs || (question && answer ? [{ id: "single", question, answer }] : [])

  if (faqItems.length === 0) return null

  return (
    <div className="divide-y divide-city-steel/30 border-t border-b border-city-steel/30">
      {faqItems.map((faq, index) => (
        <div key={faq.id || index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full py-4 flex items-center justify-between text-left"
          >
            <span className="font-medium text-city-white pr-4">{faq.question}</span>
            <ChevronDownMini
              className={`w-5 h-5 text-city-muted transition-transform flex-shrink-0 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-city-gray whitespace-pre-wrap">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
