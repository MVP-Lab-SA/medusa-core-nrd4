import { useState } from "react"
import { Star, Plus } from "@medusajs/icons"

interface ReviewFormProps {
  productName?: string
  onSubmit: (data: { rating: number; title: string; content: string; images?: File[] }) => void
  isSubmitting?: boolean
}

export function ReviewForm({ productName, onSubmit, isSubmitting }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return
    onSubmit({ rating, title, content, images: images.length > 0 ? images : undefined })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setImages([...images, ...Array.from(files).slice(0, 5 - images.length)])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {productName && (
        <p className="text-gray-600">
          Reviewing: <span className="font-medium text-gray-900">{productName}</span>
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  i <= (hoverRating || rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {rating > 0 && ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Review Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Share your experience with this product..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Photos (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(img)}
                alt={`Upload ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs"
              >
                X
              </button>
            </div>
          ))}
          {images.length < 5 && (
            <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
              <Plus className="w-6 h-6 text-gray-400" />
            </label>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || rating === 0}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  )
}
