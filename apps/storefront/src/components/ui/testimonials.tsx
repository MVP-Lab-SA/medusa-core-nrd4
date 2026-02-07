import { useState, useEffect, useRef } from "react"
import { clx } from "@medusajs/ui"
import { ChevronLeft, ChevronRight, Star } from "@medusajs/icons"

interface Testimonial {
  id: string
  content: string
  author: string
  role?: string
  avatar?: string
  rating?: number
  company?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  variant?: "carousel" | "grid" | "single"
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function Testimonials({
  testimonials,
  variant = "carousel",
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (variant === "carousel" && autoPlay && !isPaused && testimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, autoPlayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [variant, autoPlay, isPaused, autoPlayInterval, testimonials.length])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const TestimonialCard = ({ testimonial, featured = false }: { testimonial: Testimonial; featured?: boolean }) => (
    <div
      className={clx(
        "p-6 bg-neutral-900 border border-neutral-800 rounded-xl",
        featured && "p-8"
      )}
    >
      {testimonial.rating && (
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={clx(
                "w-4 h-4",
                star <= testimonial.rating! ? "text-amber-400" : "text-neutral-600"
              )}
            />
          ))}
        </div>
      )}

      <blockquote className={clx(
        "text-neutral-300 mb-6",
        featured ? "text-lg" : "text-sm"
      )}>
        "{testimonial.content}"
      </blockquote>

      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <span className="text-cyan-400 font-semibold">
              {testimonial.author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-white font-medium text-sm">{testimonial.author}</p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-neutral-500 text-xs">
              {testimonial.role}
              {testimonial.role && testimonial.company && " at "}
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  if (variant === "grid") {
    return (
      <div className={clx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    )
  }

  if (variant === "single" && testimonials.length > 0) {
    return (
      <div className={clx("max-w-2xl mx-auto", className)}>
        <TestimonialCard testimonial={testimonials[0]} featured />
      </div>
    )
  }

  // Carousel variant (default)
  return (
    <div
      className={clx("relative", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="max-w-2xl mx-auto">
                <TestimonialCard testimonial={testimonial} featured />
              </div>
            </div>
          ))}
        </div>
      </div>

      {testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={clx(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-cyan-500 w-6"
                    : "bg-neutral-700 hover:bg-neutral-600"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
