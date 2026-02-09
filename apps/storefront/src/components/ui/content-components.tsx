// Content Components for Help Center and FAQ
import { useState } from "react"
import { MagnifyingGlass, ChevronDownMini, ChevronUpMini } from "@medusajs/icons"

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-800 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between p-4 text-left bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <span className="font-medium text-white">{item.question}</span>
            {openId === item.id ? (
              <ChevronUpMini className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDownMini className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {openId === item.id && (
            <div className="p-4 bg-gray-800/50 border-t border-gray-800">
              <p className="text-gray-300">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

interface FAQSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function FAQSearch({ onSearch, placeholder = "Search help articles...", className = "" }: FAQSearchProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
      />
    </form>
  )
}

interface HelpCategory {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  articleCount: number
}

interface HelpCategoriesProps {
  categories: HelpCategory[]
  onSelect: (categoryId: string) => void
  className?: string
}

export function HelpCategories({ categories, onSelect, className = "" }: HelpCategoriesProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className="p-6 bg-gray-900 border border-gray-800 rounded-lg text-left hover:border-cyan-500/50 transition-colors group"
        >
          <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500/20 transition-colors">
            {category.icon}
          </div>
          <h3 className="font-semibold text-white mb-1">{category.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{category.description}</p>
          <span className="text-xs text-gray-500">{category.articleCount} articles</span>
        </button>
      ))}
    </div>
  )
}

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; subject: string; message: string }) => void
  className?: string
}

export function ContactForm({ onSubmit, className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
      >
        Send Message
      </button>
    </form>
  )
}
