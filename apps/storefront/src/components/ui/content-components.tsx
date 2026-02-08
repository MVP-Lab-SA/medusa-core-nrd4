import { Link } from "@tanstack/react-router"
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight, MagnifyingGlass } from "@medusajs/icons"
import type { BlogPost, FAQ, CityEvent, CityService, Announcement } from "@/lib/mock/payloadcms"

// Blog Post Card
interface BlogCardProps {
  post: BlogPost
  countryCode: string
}

export function BlogCard({ post, countryCode }: BlogCardProps) {
  return (
    <Link
      to="/$countryCode/blog/$slug"
      params={{ countryCode, slug: post.slug }}
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="px-2 py-0.5 bg-gray-100 rounded">{post.category.name}</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h3 className="font-semibold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-2 mt-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

// FAQ Accordion
interface FAQAccordionProps {
  faqs: FAQ[]
  searchable?: boolean
}

export function FAQAccordion({ faqs, searchable = false }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs

  return (
    <div>
      {searchable && (
        <div className="relative mb-4">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div className="space-y-2">
        {filteredFaqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  openIndex === index ? "rotate-90" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No FAQs found matching your search.
          </p>
        )}
      </div>
    </div>
  )
}

// Need to import useState
import { useState } from "react"

// Event Card
interface EventCardProps {
  event: CityEvent
  countryCode: string
}

export function EventCard({ event, countryCode }: EventCardProps) {
  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)

  return (
    <Link
      to="/$countryCode/events/$slug"
      params={{ countryCode, slug: event.slug }}
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={event.featuredImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {event.isFree ? (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
            Free
          </span>
        ) : (
          event.price && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded">
              ${event.price}
            </span>
          )
        )}
      </div>
      <div className="p-4">
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
          {event.category}
        </span>
        <h3 className="font-semibold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {startDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
              {startDate.toDateString() !== endDate.toDateString() && (
                <>
                  {" - "}
                  {endDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location.name}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// City Service Card
interface ServiceCardProps {
  service: CityService
  countryCode: string
}

export function ServiceCard({ service, countryCode }: ServiceCardProps) {
  return (
    <Link
      to="/$countryCode/services/$slug"
      params={{ countryCode, slug: service.slug }}
      className="group block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{service.icon === "building" ? "🏢" : "🗑️"}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
          {service.contact && (
            <div className="mt-3 text-sm text-gray-500">
              {service.contact.hours && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.contact.hours}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
    </Link>
  )
}

// Announcement Banner
interface AnnouncementBannerProps {
  announcement: Announcement
  onDismiss?: () => void
}

export function AnnouncementBanner({ announcement, onDismiss }: AnnouncementBannerProps) {
  const typeStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800",
    promo: "bg-purple-50 border-purple-200 text-purple-800",
  }

  return (
    <div
      className={`border-b px-4 py-3 flex items-center justify-between ${
        typeStyles[announcement.type]
      }`}
    >
      <div className="flex items-center gap-3">
        <p className="font-medium">{announcement.title}</p>
        <p className="text-sm opacity-80">{announcement.message}</p>
        {announcement.linkUrl && announcement.linkText && (
          <a
            href={announcement.linkUrl}
            className="text-sm font-medium underline hover:no-underline"
          >
            {announcement.linkText}
          </a>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-black/5 rounded transition-colors"
        >
          <span className="sr-only">Dismiss</span>
          &times;
        </button>
      )}
    </div>
  )
}

// Help Center Search
interface HelpCenterSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function HelpCenterSearch({
  onSearch,
  placeholder = "Search for help...",
}: HelpCenterSearchProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </form>
  )
}
