import { useState } from "react"
import { useBlogPosts, useBlogCategories } from "@/lib/hooks/use-payloadcms"
import { BlogCard } from "@/components/content/BlogCard"
import { MagnifyingGlass } from "@medusajs/icons"

interface BlogListPageProps {
  countryCode: string
  initialCategory?: string
}

export default function BlogListPage({ countryCode, initialCategory }: BlogListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory)
  const [searchQuery, setSearchQuery] = useState("")

  const { data: postsData, isLoading } = useBlogPosts({
    category: selectedCategory,
    limit: 20,
  })
  const { data: categories } = useBlogCategories()

  const posts = postsData?.posts || []

  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
          <p className="text-cyan-100 mt-4 text-lg max-w-2xl mx-auto">
            Stories, tips, and inspiration for your lifestyle
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800"
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-cyan-500 text-black"
                    : "bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800"
                }`}
              >
                {category.name} ({category.postCount})
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            <p className="text-gray-400 mb-6">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} countryCode={countryCode} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400">No articles found.</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold">Stay Updated</h2>
          <p className="text-cyan-100 mt-2 max-w-lg mx-auto">
            Subscribe to our newsletter for the latest articles, tips, and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
