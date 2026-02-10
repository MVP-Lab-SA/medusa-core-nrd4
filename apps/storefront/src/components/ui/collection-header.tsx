interface CollectionHeaderProps {
  title: string
  description?: string
  image?: string
  productCount?: number
  className?: string
}

export function CollectionHeader({
  title,
  description,
  image,
  productCount,
  className = ""
}: CollectionHeaderProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {image ? (
        <div className="relative h-64 md:h-80">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
            {description && (
              <p className="text-white/80 text-lg max-w-2xl">{description}</p>
            )}
            {productCount !== undefined && (
              <p className="text-white/60 text-sm mt-2">{productCount} products</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
          {description && (
            <p className="text-gray-300 text-lg max-w-2xl">{description}</p>
          )}
          {productCount !== undefined && (
            <p className="text-gray-400 text-sm mt-2">{productCount} products</p>
          )}
        </div>
      )}
    </div>
  )
}
