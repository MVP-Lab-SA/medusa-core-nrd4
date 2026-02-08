import { ArrowLeft, Calendar, Clock, User } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"

interface BlogPostProps {
  post: {
    id: string
    slug: string
    title: string
    content: string
    coverImage?: string
    author: { name: string; avatar?: string; bio?: string }
    publishedAt: string
    category?: string
    readTime?: number
    tags?: string[]
  }
  countryCode: string
}

export function BlogPost({ post, countryCode }: BlogPostProps) {
  return (
    <article className="max-w-3xl mx-auto">
      <Link 
        to={`/${countryCode}/blog` as any}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {post.coverImage && (
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      )}

      {post.category && (
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
          {post.category}
        </span>
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {post.author.avatar ? (
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
          )}
          <span>{post.author.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
        {post.readTime && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime} min read
          </div>
        )}
      </div>

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {post.author.bio && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-3">About the Author</h3>
          <div className="flex items-start gap-4">
            {post.author.avatar ? (
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-600 mt-1">{post.author.bio}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
