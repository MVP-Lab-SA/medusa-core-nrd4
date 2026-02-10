import { Link } from "@tanstack/react-router"
import { Calendar, Clock, User } from "@medusajs/icons"

interface BlogCardProps {
  title: string
  excerpt: string
  slug: string
  image?: string
  author?: {
    name: string
    avatar?: string
  }
  date: string
  readTime?: string
  category?: string
  featured?: boolean
  className?: string
}

export function BlogCard({
  title,
  excerpt,
  slug,
  image,
  author,
  date,
  readTime,
  category,
  featured = false,
  className = ""
}: BlogCardProps) {
  if (featured) {
    return (
      <Link
        to={`/us/blog/${slug}` as any}
        className={`group block ${className}`}
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-4">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {category && (
              <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-sm font-medium rounded-full mb-3">
                {category}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {title}
            </h2>
            <p className="text-white/80 mb-4 line-clamp-2">{excerpt}</p>
            
            <div className="flex items-center gap-4 text-white/70 text-sm">
              {author && (
                <div className="flex items-center gap-2">
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span>{author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              {readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/us/blog/${slug}` as any}
      className={`group block ${className}`}
    >
      <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
      </div>

      {category && (
        <span className="inline-block px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs font-medium rounded mb-2">
          {category}
        </span>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{excerpt}</p>

      <div className="flex items-center gap-3 text-gray-500 text-xs">
        <span>{date}</span>
        {readTime && (
          <>
            <span>-</span>
            <span>{readTime}</span>
          </>
        )}
      </div>
    </Link>
  )
}
