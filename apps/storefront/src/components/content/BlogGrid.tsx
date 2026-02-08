import { BlogCard } from "./BlogCard"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage?: string
  author: { name: string; avatar?: string }
  publishedAt: string
  category?: string
  readTime?: number
}

interface BlogGridProps {
  posts: BlogPost[]
  columns?: 2 | 3 | 4
  showAuthor?: boolean
  showCategory?: boolean
}

export function BlogGrid({ posts, columns = 3, showAuthor = true, showCategory = true }: BlogGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No posts found</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          post={post}
          showAuthor={showAuthor}
          showCategory={showCategory}
        />
      ))}
    </div>
  )
}
