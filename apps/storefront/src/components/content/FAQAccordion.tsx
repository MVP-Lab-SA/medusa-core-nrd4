import { useState } from "react"
import { ChevronDownMini } from "@medusajs/icons"
import type { FAQ } from "../../lib/mock/payloadcms"

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {faqs.map((faq, index) => (
        <div key={faq.id}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full py-4 flex items-center justify-between text-left"
          >
            <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
            <ChevronDownMini
              className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-gray-600 whitespace-pre-wrap">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
