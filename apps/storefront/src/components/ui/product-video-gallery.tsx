import { useState } from "react"
import { TriangleRightMini, XMark } from "@medusajs/icons"

interface Video {
  id: string
  title: string
  thumbnail: string
  url: string
  duration?: string
  type?: "demo" | "review" | "tutorial" | "unboxing"
}

interface ProductVideoGalleryProps {
  videos: Video[]
  className?: string
}

export function ProductVideoGallery({ videos, className = "" }: ProductVideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)

  if (videos.length === 0) return null

  const typeLabels = {
    demo: "Demo",
    review: "Review",
    tutorial: "Tutorial",
    unboxing: "Unboxing"
  }

  return (
    <div className={className}>
      <h3 className="font-medium text-gray-900 mb-4">Product Videos</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {videos.map(video => (
          <button
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TriangleRightMini className="w-6 h-6 text-gray-900 ml-1" />
              </div>
            </div>

            {/* Duration */}
            {video.duration && (
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                {video.duration}
              </span>
            )}

            {/* Type badge */}
            {video.type && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-cyan-500 text-white text-xs font-medium rounded">
                {typeLabels[video.type]}
              </span>
            )}

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm font-medium truncate">{video.title}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setActiveVideo(null)}
          />
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <XMark className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={activeVideo.url}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-white text-center mt-4">{activeVideo.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}
