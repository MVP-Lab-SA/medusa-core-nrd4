import { useState } from "react"
import { clx } from "@medusajs/ui"
import { Star, Spinner, Check } from "@medusajs/icons"

interface ReviewFormProps {
  productId: string
  productTitle?: string
  onSubmit: (review: ReviewData) => Promise<boolean>
  className?: string
}

interface ReviewData {
  productId: string
  rating: number
  title: string
  content: string
  name: string
  email: string
  recommend: boolean
}

export function ReviewForm({
  productId,
  productTitle,
  onSubmit,
  className,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [recommend, setRecommend] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (!title.trim() || !content.trim()) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const success = await onSubmit({
        productId,
        rating,
        title: title.trim(),
        content: content.trim(),
        name: name.trim(),
        email: email.trim(),
        recommend,
      })

      if (success) {
        setIsSuccess(true)
      } else {
        setError("Failed to submit review. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={clx("p-8 bg-neutral-900 border border-neutral-800 rounded-xl text-center", className)}>
        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Thank you for your review!</h3>
        <p className="text-neutral-400">Your feedback helps other customers make informed decisions.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={clx("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Write a Review</h3>
        {productTitle && (
          <p className="text-sm text-neutral-400">for {productTitle}</p>
        )}
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Rating *
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={clx(
                  "w-7 h-7 transition-colors",
                  (hoverRating || rating) >= star
                    ? "text-amber-400"
                    : "text-neutral-600"
                )}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-neutral-400">
            {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : "Select rating"}
          </span>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          Review Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          Your Review *
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell us what you liked or disliked about this product"
          rows={4}
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email (optional)"
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Recommend */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setRecommend(!recommend)}
          className={clx(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
            recommend
              ? "bg-cyan-500 border-cyan-500"
              : "border-neutral-600"
          )}
        >
          {recommend && <Check className="w-3 h-3 text-black" />}
        </button>
        <label className="text-sm text-neutral-300">
          I would recommend this product
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Spinner className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  )
}
