import { createFileRoute } from "@tanstack/react-router"
import { Calendar, Clock, ArrowLeft, Tag, Link as ShareIcon } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/blog/$slug")({
  component: BlogPostPage,
})

function BlogPostPage() {
  const { slug } = Route.useParams()

  // Mock blog post data
  const post = {
    title: "The Future of City Commerce: How Technology is Transforming Local Businesses",
    slug,
    author: { name: "Sarah Johnson", avatar: "SJ", role: "Commerce Editor" },
    publishedDate: "2024-01-15",
    readTime: "8 min read",
    category: "Technology",
    tags: ["E-commerce", "Local Business", "Innovation"],
    image: "/blog-hero.jpg",
    content: `
      <p>The landscape of city commerce is undergoing a dramatic transformation. Local businesses are embracing new technologies to reach customers in ways that were unimaginable just a decade ago.</p>
      
      <h2>The Rise of Hybrid Commerce</h2>
      <p>Today's consumers expect seamless experiences across online and offline channels. They might discover a product on social media, research it on a mobile app, and purchase it in-store—or vice versa. This hybrid approach to commerce is reshaping how local businesses operate.</p>
      
      <h2>Key Trends Driving Change</h2>
      <ul>
        <li><strong>Same-Day Delivery:</strong> Customers now expect rapid fulfillment, pushing businesses to optimize their logistics.</li>
        <li><strong>Personalization:</strong> AI-driven recommendations are helping businesses serve customers better.</li>
        <li><strong>Digital Payments:</strong> Mobile wallets and buy-now-pay-later options are becoming standard.</li>
        <li><strong>Sustainability:</strong> Eco-conscious consumers are driving demand for sustainable practices.</li>
      </ul>
      
      <h2>What This Means for Local Businesses</h2>
      <p>For local businesses, these changes present both challenges and opportunities. Those who adapt quickly can gain a competitive advantage, while those who resist change risk being left behind.</p>
      
      <blockquote>
        "The businesses that thrive will be those that combine the convenience of digital commerce with the personal touch that only local establishments can provide."
      </blockquote>
      
      <h2>Looking Ahead</h2>
      <p>As we look to the future, the integration of technology into city commerce will only deepen. From drone deliveries to augmented reality shopping experiences, the possibilities are endless.</p>
    `,
    relatedPosts: [
      { title: "5 Ways to Boost Your Online Presence", slug: "boost-online-presence" },
      { title: "Understanding Customer Behavior in 2024", slug: "customer-behavior-2024" },
      { title: "Sustainable Packaging Solutions", slug: "sustainable-packaging" },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <a href="/blog" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </a>

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                {post.author.avatar}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.publishedDate}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-8 flex items-center justify-center">
          <span className="text-white/50 text-lg">Featured Image</span>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex items-center gap-2 mb-8 pt-8 border-t">
          <Tag className="w-4 h-4 text-gray-400" />
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-8">
          <p className="font-medium">Found this article helpful?</p>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <ShareIcon className="w-4 h-4" />
            Share Article
          </button>
        </div>

        {/* Author Box */}
        <div className="bg-white border rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-medium">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-sm text-gray-500">Written by</p>
              <p className="font-semibold text-lg">{post.author.name}</p>
              <p className="text-gray-600">{post.author.role}</p>
              <p className="text-sm text-gray-500 mt-2">
                Passionate about the intersection of technology and local commerce.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {post.relatedPosts.map((related) => (
              <a
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="p-4 border rounded-xl hover:border-blue-500 transition-colors"
              >
                <p className="font-medium">{related.title}</p>
              </a>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
