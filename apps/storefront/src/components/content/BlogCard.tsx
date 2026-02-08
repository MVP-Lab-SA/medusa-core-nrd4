import { Link } from "@tanstack/react-router"
import { Calendar, User } from "@medusajs/icons"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  featuredImage?: string
  category?: string
  author?: string
  publishedAt?: string
}

interface BlogCardProps {
  post: BlogPost
  countryCode: string
}

export function BlogCard({ post, countryCode }: BlogCardProps) {
  return (
    <Link
      to={"/$countryCode/blog/$slug" as any}
      params={{ countryCode, slug: post.slug } as any}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
        )}
      </div>
      <div className="p-5">
        {post.category && (
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            {typeof post.category === 'object' ? (post.category as any).name : post.category}
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {post.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{typeof post.author === 'object' ? (post.author as any).name : post.author}</span>
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
