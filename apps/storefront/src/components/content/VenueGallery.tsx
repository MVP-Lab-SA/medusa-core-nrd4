import { useState } from "react"
import { XMark, ChevronLeft, ChevronRight } from "@medusajs/icons"

interface VenueGalleryProps {
  images: {
    id: string
    url: string
    alt?: string
    caption?: string
  }[]
}

export function VenueGallery({ images }: VenueGalleryProps) {
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.slice(0, 8).map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className={`relative overflow-hidden rounded-lg ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img 
              src={image.url} 
              alt={image.alt || 'Venue image'}
              className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform"
            />
            {index === 7 && images.length > 8 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium">+{images.length - 8} more</span>
              </div>
            )}
          </button>
        ))}
      </div>

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
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-5xl max-h-[80vh] px-16">
            <img
              src={images[selectedIndex].url}
              alt={images[selectedIndex].alt || 'Venue image'}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {images[selectedIndex].caption && (
              <p className="text-center text-white mt-4">{images[selectedIndex].caption}</p>
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
