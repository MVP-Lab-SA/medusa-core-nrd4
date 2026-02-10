import { useState } from "react"
import { XMark, ArrowLeft, ArrowRight } from "@medusajs/icons"

interface ReviewImage {
  id: string
  url: string
  reviewId: string
  reviewerName: string
}

interface ReviewGalleryProps {
  images: ReviewImage[]
}

export function ReviewGallery({ images }: ReviewGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)
  
  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
    }
  }
  
  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
    }
  }

  if (images.length === 0) return null

  return (
    <>
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Customer Photos ({images.length})</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
            >
              <img 
                src={image.url} 
                alt={`Review by ${image.reviewerName}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <XMark className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToPrevious}
            className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl max-h-[80vh] px-16">
            <img 
              src={images[selectedIndex].url}
              alt={`Review by ${images[selectedIndex].reviewerName}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="text-center text-white mt-4 text-sm">
              Photo by {images[selectedIndex].reviewerName}
            </p>
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
