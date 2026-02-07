import { useState } from "react"
import { BlogCard } from "@/components/ui/blog-card"
import { Button } from "@/components/ui/button"
import { MagnifyingGlass } from "@medusajs/icons"

interface BlogPageProps {
  countryCode: string
}

export default function BlogPage({ countryCode }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["All", "Technology", "Smart Cities", "Sustainability", "Innovation"]

  const posts = [
    {
      title: "The Future of Smart City Infrastructure",
      excerpt: "Discover how IoT sensors and connected devices are transforming urban environments and improving quality of life for millions.",
      slug: "future-smart-city-infrastructure",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
      author: { name: "Alex Chen" },
      date: "Jan 15, 2026",
      readTime: "8 min read",
      category: "Smart Cities",
      featured: true
    },
    {
      title: "5 Ways IoT is Revolutionizing Urban Lighting",
      excerpt: "From energy savings to improved safety, smart lighting systems are changing how cities operate at night.",
      slug: "iot-urban-lighting",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
      author: { name: "Maria Santos" },
      date: "Jan 12, 2026",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      title: "Sustainable Sensor Solutions for Green Buildings",
      excerpt: "How modern sensors help buildings reduce their carbon footprint while improving occupant comfort.",
      slug: "sustainable-sensor-solutions",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      author: { name: "James Wilson" },
      date: "Jan 10, 2026",
      readTime: "6 min read",
      category: "Sustainability"
    },
    {
      title: "Getting Started with Smart Home Integration",
      excerpt: "A beginner's guide to connecting your CityOS devices with popular smart home platforms.",
      slug: "smart-home-integration-guide",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      author: { name: "Sarah Kim" },
      date: "Jan 8, 2026",
      readTime: "10 min read",
      category: "Technology"
    },
    {
      title: "The Role of AI in Predictive Maintenance",
      excerpt: "Machine learning algorithms are helping cities predict equipment failures before they happen.",
      slug: "ai-predictive-maintenance",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
      author: { name: "David Park" },
      date: "Jan 5, 2026",
      readTime: "7 min read",
      category: "Innovation"
    },
    {
      title: "Case Study: Barcelona's Smart Traffic System",
      excerpt: "How one of Europe's most innovative cities reduced congestion by 25% using connected sensors.",
      slug: "barcelona-smart-traffic",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
      author: { name: "Carlos Rodriguez" },
      date: "Jan 3, 2026",
      readTime: "12 min read",
      category: "Smart Cities"
    }
  ]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = filteredPosts.find(p => p.featured)
  const regularPosts = filteredPosts.filter(p => !p.featured)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CityOS Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and news about smart city technology and IoT innovation
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  (category === "All" && !selectedCategory) || selectedCategory === category
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <BlogCard {...featuredPost} featured />
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found matching your criteria</p>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Get the latest insights on smart city technology delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-cyan-600 hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
