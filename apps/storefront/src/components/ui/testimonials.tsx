import * as React from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { clx } from "@medusajs/ui"

interface Testimonial {
  id: string
  content: string
  author: string
  role?: string
  company?: string
  avatar?: string
  rating?: number
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  variant?: "carousel" | "grid" | "masonry"
  columns?: 2 | 3
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function Testimonials({
  testimonials,
  variant = "carousel",
  columns = 3,
  autoPlay = true,
  autoPlayInterval = 5000,
  className
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (!autoPlay || variant !== "carousel" || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, testimonials.length, variant])

  const goToPrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  if (variant === "carousel") {
    return (
      <div className={clx("relative", className)}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <TestimonialCard testimonial={testimonial} centered />
              </div>
            ))}
          </div>
        </div>

        {testimonials.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={clx(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-8 bg-cyan-500"
                      : "bg-zinc-600 hover:bg-zinc-500"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === "masonry") {
    return (
      <div className={clx("columns-1 md:columns-2 lg:columns-3 gap-4", className)}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="break-inside-avoid mb-4">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    )
  }

  // Grid variant
  return (
    <div
      className={clx(
        "grid gap-6",
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  )
}

interface TestimonialCardProps {
  testimonial: Testimonial
  centered?: boolean
}

function TestimonialCard({ testimonial, centered = false }: TestimonialCardProps) {
  return (
    <div
      className={clx(
        "p-6 rounded-xl bg-zinc-900 border border-zinc-800",
        centered && "text-center max-w-2xl mx-auto"
      )}
    >
      <Quote className={clx(
        "w-10 h-10 text-cyan-500/30 mb-4",
        centered && "mx-auto"
      )} />

      {testimonial.rating && (
        <div className={clx("flex gap-1 mb-4", centered && "justify-center")}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={clx(
                "w-5 h-5",
                star <= testimonial.rating!
                  ? "text-yellow-500 fill-current"
                  : "text-zinc-600"
              )}
            />
          ))}
        </div>
      )}

      <p className="text-zinc-300 mb-6 leading-relaxed">
        "{testimonial.content}"
      </p>

      <div className={clx("flex items-center gap-4", centered && "justify-center")}>
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
            {testimonial.author.charAt(0)}
          </div>
        )}
        <div className={centered ? "text-left" : ""}>
          <p className="text-white font-medium">{testimonial.author}</p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-zinc-500 text-sm">
              {testimonial.role}
              {testimonial.role && testimonial.company && " at "}
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface TestimonialQuoteProps {
  content: string
  author: string
  className?: string
}

export function TestimonialQuote({ content, author, className }: TestimonialQuoteProps) {
  return (
    <blockquote className={clx("relative pl-6 border-l-2 border-cyan-500", className)}>
      <p className="text-zinc-300 italic mb-2">"{content}"</p>
      <cite className="text-zinc-500 text-sm not-italic">- {author}</cite>
    </blockquote>
  )
}
