import * as React from "react"
import { Star, Upload, X, Loader2 } from "lucide-react"
import { clx } from "@medusajs/ui"

interface ReviewFormProps {
  productId: string
  productName: string
  onSubmit: (review: ReviewData) => Promise<boolean>
  allowImages?: boolean
  maxImages?: number
  className?: string
}

interface ReviewData {
  productId: string
  rating: number
  title: string
  content: string
  name: string
  email: string
  images?: File[]
  recommend?: boolean
}

export function ReviewForm({
  productId,
  productName,
  onSubmit,
  allowImages = true,
  maxImages = 5,
  className
}: ReviewFormProps) {
  const [rating, setRating] = React.useState(0)
  const [hoveredRating, setHoveredRating] = React.useState(0)
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [images, setImages] = React.useState<File[]>([])
  const [recommend, setRecommend] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    setImages((prev) => [...prev, ...newFiles].slice(0, maxImages))
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const success = await onSubmit({
        productId,
        rating,
        title,
        content,
        name,
        email,
        images: images.length > 0 ? images : undefined,
        recommend
      })

      if (success) {
        setIsSubmitted(true)
      } else {
        setError("Failed to submit review. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={clx("text-center py-12", className)}>
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-green-500 fill-current" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank you for your review!</h3>
        <p className="text-zinc-400">Your feedback helps other customers make informed decisions.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={clx("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Write a Review</h3>
        <p className="text-zinc-400 text-sm">Share your experience with {productName}</p>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Overall Rating *
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={clx(
                  "w-8 h-8 transition-colors",
                  (hoveredRating || rating) >= star
                    ? "text-yellow-500 fill-current"
                    : "text-zinc-600"
                )}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-zinc-400 text-sm mt-1">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Review Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sum up your experience"
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Your Review
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you like or dislike? How did you use this product?"
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      {/* Images */}
      {allowImages && (
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Add Photos (optional)
          </label>
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {images.length < maxImages && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-lg border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-zinc-600 hover:text-zinc-400 transition-colors"
              >
                <Upload className="w-6 h-6" />
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Recommend */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={recommend}
            onChange={(e) => setRecommend(e.target.checked)}
            className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-white">I would recommend this product</span>
        </label>
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={clx(
          "w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
          !isLoading
            ? "bg-cyan-500 text-black hover:bg-cyan-400"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  )
}
