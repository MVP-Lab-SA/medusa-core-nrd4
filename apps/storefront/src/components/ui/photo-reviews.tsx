import { useState } from "react"
import { Star, XMark, ChevronLeft, ChevronRight, ThumbUp } from "@medusajs/icons"

interface PhotoReview {
  id: string
  author: string
  rating: number
  date: string
  content: string
  photos: string[]
  helpful: number
  verified?: boolean
}

interface PhotoReviewsProps {
  reviews: PhotoReview[]
  title?: string
  className?: string
}

export function PhotoReviews({
  reviews,
  title = "Customer Photos",
  className = ""
}: PhotoReviewsProps) {
  const [selectedReview, setSelectedReview] = useState<PhotoReview | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const allPhotos = reviews.flatMap(review => 
    review.photos.map(photo => ({ photo, review }))
  )

  const handlePrev = () => {
    setCurrentPhotoIndex(prev => (prev > 0 ? prev - 1 : allPhotos.length - 1))
    const { review } = allPhotos[currentPhotoIndex > 0 ? currentPhotoIndex - 1 : allPhotos.length - 1]
    setSelectedReview(review)
  }

  const handleNext = () => {
    setCurrentPhotoIndex(prev => (prev < allPhotos.length - 1 ? prev + 1 : 0))
    const { review } = allPhotos[currentPhotoIndex < allPhotos.length - 1 ? currentPhotoIndex + 1 : 0]
    setSelectedReview(review)
  }

  if (allPhotos.length === 0) return null

  return (
    <div className={className}>
      <h3 className="font-medium text-gray-900 mb-4">
        {title} ({allPhotos.length})
      </h3>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {allPhotos.slice(0, 8).map(({ photo, review }, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedReview(review)
              setCurrentPhotoIndex(idx)
            }}
            className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden hover:opacity-90"
          >
            <img src={photo} alt="Customer photo" className="w-full h-full object-cover" />
          </button>
        ))}
        {allPhotos.length > 8 && (
          <button
            onClick={() => {
              setSelectedReview(reviews.find(r => r.photos.length > 0) || null)
              setCurrentPhotoIndex(8)
            }}
            className="w-20 h-20 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <span className="text-sm font-medium text-gray-600">+{allPhotos.length - 8}</span>
          </button>
        )}
      </div>

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedReview(null)} />
          
          <div className="relative max-w-5xl w-full flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <XMark className="w-8 h-8" />
            </button>

            {/* Photo */}
            <div className="relative md:w-2/3">
              <img
                src={allPhotos[currentPhotoIndex].photo}
                alt="Review photo"
                className="w-full rounded-lg"
              />
              
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                {currentPhotoIndex + 1} / {allPhotos.length}
              </div>
            </div>

            {/* Review Details */}
            <div className="md:w-1/3 bg-white rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < selectedReview.rating ? "text-yellow-400 fill-current" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                {selectedReview.verified && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Verified
                  </span>
                )}
              </div>

              <p className="font-medium text-gray-900">{selectedReview.author}</p>
              <p className="text-sm text-gray-500 mb-4">{selectedReview.date}</p>

              <p className="text-gray-700">{selectedReview.content}</p>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                  <ThumbUp className="w-4 h-4" />
                  Helpful ({selectedReview.helpful})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
