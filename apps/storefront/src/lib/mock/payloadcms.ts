/**
 * PayloadCMS Mock Service
 * Content & Configuration Management
 */

import { generateId, mockDelay, pastDate, futureDate } from "./index"

// Types
export interface Page {
  id: string
  slug: string
  title: string
  content: ContentBlock[]
  seo: SEOMetadata
  status: "draft" | "published"
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface ContentBlock {
  id: string
  type: "hero" | "text" | "image" | "gallery" | "cta" | "features" | "testimonials" | "faq"
  data: Record<string, unknown>
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  author: Author
  category: BlogCategory
  tags: string[]
  status: "draft" | "published"
  publishedAt?: string
  readingTime: number
  createdAt: string
}

export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

export interface Announcement {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "promo"
  linkText?: string
  linkUrl?: string
  startDate: string
  endDate: string
  active: boolean
}

export interface CityEvent {
  id: string
  slug: string
  title: string
  description: string
  content: string
  featuredImage: string
  startDate: string
  endDate: string
  location: {
    name: string
    address: string
    coordinates: { lat: number; lng: number }
  }
  category: string
  ticketUrl?: string
  isFree: boolean
  price?: number
}

export interface CityService {
  id: string
  slug: string
  title: string
  description: string
  content: string
  icon: string
  category: string
  url?: string
  contact?: {
    phone?: string
    email?: string
    hours?: string
  }
}

export interface VenueProfile {
  id: string
  slug: string
  name: string
  description: string
  type: "restaurant" | "cafe" | "retail" | "service" | "entertainment"
  images: string[]
  address: string
  coordinates: { lat: number; lng: number }
  phone: string
  website?: string
  hours: {
    day: string
    open: string
    close: string
  }[]
  rating: number
  reviewCount: number
  priceRange: "$" | "$$" | "$$$" | "$$$$"
  features: string[]
}

export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

export interface Navigation {
  id: string
  name: string
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  label: string
  url: string
  target?: "_blank" | "_self"
  children?: MenuItem[]
}

export interface Banner {
  id: string
  name: string
  type: "hero" | "promo" | "announcement"
  image: string
  mobileImage?: string
  title?: string
  subtitle?: string
  ctaText?: string
  ctaUrl?: string
  backgroundColor?: string
  textColor?: string
  active: boolean
  startDate?: string
  endDate?: string
}

// Mock Data
const mockAuthors: Author[] = [
  {
    id: "author_1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Fashion & lifestyle editor with 10 years of experience",
  },
  {
    id: "author_2",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    bio: "Tech and innovation writer covering retail trends",
  },
]

const mockCategories: BlogCategory[] = [
  { id: "cat_1", name: "Fashion", slug: "fashion", description: "Latest fashion trends and tips", postCount: 12 },
  { id: "cat_2", name: "Lifestyle", slug: "lifestyle", description: "Living your best life", postCount: 8 },
  { id: "cat_3", name: "Sustainability", slug: "sustainability", description: "Eco-friendly choices", postCount: 5 },
  { id: "cat_4", name: "News", slug: "news", description: "Company and industry news", postCount: 15 },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "post_1",
    slug: "spring-fashion-trends-2025",
    title: "Spring Fashion Trends 2025: What to Wear This Season",
    excerpt: "Discover the hottest trends for spring 2025 and how to incorporate them into your wardrobe.",
    content: `
## The Colors of Spring

This season, we're seeing a beautiful palette of soft pastels mixed with bold, vibrant hues. Think lavender, mint green, and coral paired with classic neutrals.

### Key Trends

1. **Oversized Blazers** - The power suit is back, but bigger and more relaxed than ever.
2. **Sustainable Fabrics** - Eco-conscious materials are no longer optional.
3. **Statement Accessories** - Bold jewelry and bags that make an impact.

## How to Style

The key to mastering spring 2025 fashion is balance. Pair oversized pieces with fitted items, and don't be afraid to mix prints and textures.
    `,
    featuredImage: "https://placehold.co/1200x600?text=Spring+Fashion",
    author: mockAuthors[0],
    category: mockCategories[0],
    tags: ["fashion", "trends", "spring", "2025"],
    status: "published",
    publishedAt: pastDate(3).toISOString(),
    readingTime: 5,
    createdAt: pastDate(5).toISOString(),
  },
  {
    id: "post_2",
    slug: "sustainable-shopping-guide",
    title: "Your Guide to Sustainable Shopping in 2025",
    excerpt: "Learn how to make eco-friendly choices without compromising on style.",
    content: `
## Why Sustainable Shopping Matters

Every purchase we make has an impact on our planet. Here's how to shop more consciously.

### Tips for Sustainable Shopping

1. **Quality Over Quantity** - Invest in pieces that last.
2. **Research Brands** - Look for certifications and transparency.
3. **Second-Hand First** - Consider pre-loved items before buying new.

## Our Commitment

We're proud to offer a growing selection of sustainable products and partner with eco-conscious brands.
    `,
    featuredImage: "https://placehold.co/1200x600?text=Sustainable+Shopping",
    author: mockAuthors[1],
    category: mockCategories[2],
    tags: ["sustainability", "eco-friendly", "shopping", "guide"],
    status: "published",
    publishedAt: pastDate(7).toISOString(),
    readingTime: 4,
    createdAt: pastDate(10).toISOString(),
  },
  {
    id: "post_3",
    slug: "summer-essentials-checklist",
    title: "Summer Essentials: Your Complete Checklist",
    excerpt: "Everything you need for the perfect summer wardrobe and beyond.",
    content: `
## Summer is Coming

Get ready for the warmest season with our comprehensive checklist.

### Wardrobe Must-Haves

- Lightweight linen shirts
- Comfortable shorts
- Versatile sundresses
- Quality sandals
- Sun protection accessories

## Beach Ready

Don't forget swimwear, cover-ups, and a great beach bag!
    `,
    featuredImage: "https://placehold.co/1200x600?text=Summer+Essentials",
    author: mockAuthors[0],
    category: mockCategories[1],
    tags: ["summer", "essentials", "checklist", "wardrobe"],
    status: "published",
    publishedAt: pastDate(14).toISOString(),
    readingTime: 3,
    createdAt: pastDate(15).toISOString(),
  },
]

const mockFAQs: FAQ[] = [
  { id: "faq_1", question: "How do I track my order?", answer: "You can track your order by logging into your account and visiting the Orders section. You'll also receive tracking updates via email.", category: "Orders", order: 1 },
  { id: "faq_2", question: "What is your return policy?", answer: "We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and with original tags attached.", category: "Returns", order: 1 },
  { id: "faq_3", question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout.", category: "Shipping", order: 1 },
  { id: "faq_4", question: "Do you ship internationally?", answer: "Yes! We ship to over 50 countries. International shipping typically takes 7-14 business days.", category: "Shipping", order: 2 },
  { id: "faq_5", question: "How do I use a promo code?", answer: "Enter your promo code at checkout in the discount code field. The discount will be applied to your order total.", category: "Orders", order: 2 },
  { id: "faq_6", question: "Can I change or cancel my order?", answer: "Orders can be modified or cancelled within 1 hour of placing them. Contact our support team for assistance.", category: "Orders", order: 3 },
  { id: "faq_7", question: "How do I contact customer support?", answer: "You can reach us via email at support@store.com, live chat, or phone at 1-800-STORE.", category: "Support", order: 1 },
  { id: "faq_8", question: "Is my payment information secure?", answer: "Yes, we use industry-standard SSL encryption and never store your full payment details.", category: "Support", order: 2 },
]

const mockEvents: CityEvent[] = [
  {
    id: "event_1",
    slug: "summer-fashion-festival",
    title: "Summer Fashion Festival 2025",
    description: "The biggest fashion event of the season featuring local designers and international brands.",
    content: "Join us for three days of runway shows, workshops, and exclusive shopping experiences.",
    featuredImage: "https://placehold.co/1200x600?text=Fashion+Festival",
    startDate: futureDate(30).toISOString(),
    endDate: futureDate(32).toISOString(),
    location: {
      name: "City Convention Center",
      address: "123 Main Street",
      coordinates: { lat: 24.7136, lng: 46.6753 },
    },
    category: "Fashion",
    ticketUrl: "https://tickets.example.com",
    isFree: false,
    price: 50,
  },
  {
    id: "event_2",
    slug: "artisan-market-weekend",
    title: "Artisan Market Weekend",
    description: "Discover handcrafted goods from local artisans and makers.",
    content: "Over 100 vendors showcasing unique handmade products, food, and entertainment.",
    featuredImage: "https://placehold.co/1200x600?text=Artisan+Market",
    startDate: futureDate(14).toISOString(),
    endDate: futureDate(15).toISOString(),
    location: {
      name: "Downtown Plaza",
      address: "456 Commerce Ave",
      coordinates: { lat: 24.72, lng: 46.68 },
    },
    category: "Market",
    isFree: true,
  },
]

const mockServices: CityService[] = [
  {
    id: "service_1",
    slug: "business-licensing",
    title: "Business Licensing",
    description: "Apply for and manage your business licenses online.",
    content: "Our streamlined digital process makes it easy to start and maintain your business.",
    icon: "building",
    category: "Business",
    url: "/services/licensing",
    contact: { phone: "1-800-CITY", email: "licensing@city.gov", hours: "Mon-Fri 8am-5pm" },
  },
  {
    id: "service_2",
    slug: "waste-collection",
    title: "Waste Collection Schedule",
    description: "Find your waste collection days and recycling information.",
    content: "Enter your address to see your personalized collection schedule.",
    icon: "trash",
    category: "Utilities",
    contact: { phone: "311", hours: "24/7" },
  },
]

const mockVenues: VenueProfile[] = [
  {
    id: "venue_1",
    slug: "cafe-arabica",
    name: "Cafe Arabica",
    description: "Premium coffee and pastries in a modern setting",
    type: "cafe",
    images: [
      "https://placehold.co/800x600?text=Cafe+Interior",
      "https://placehold.co/800x600?text=Coffee",
    ],
    address: "789 Coffee Lane",
    coordinates: { lat: 24.71, lng: 46.67 },
    phone: "+966-555-1234",
    website: "https://cafearabica.com",
    hours: [
      { day: "Monday-Friday", open: "07:00", close: "22:00" },
      { day: "Saturday-Sunday", open: "08:00", close: "23:00" },
    ],
    rating: 4.7,
    reviewCount: 234,
    priceRange: "$$",
    features: ["WiFi", "Outdoor Seating", "Takeaway"],
  },
]

const mockAnnouncements: Announcement[] = [
  {
    id: "ann_1",
    title: "Free Shipping Weekend",
    message: "Enjoy free shipping on all orders this weekend only!",
    type: "promo",
    linkText: "Shop Now",
    linkUrl: "/store",
    startDate: new Date().toISOString(),
    endDate: futureDate(3).toISOString(),
    active: true,
  },
]

const mockBanners: Banner[] = [
  {
    id: "banner_1",
    name: "Summer Sale Hero",
    type: "hero",
    image: "https://placehold.co/1920x800?text=Summer+Sale",
    mobileImage: "https://placehold.co/800x600?text=Summer+Sale+Mobile",
    title: "Summer Sale",
    subtitle: "Up to 50% off select items",
    ctaText: "Shop Now",
    ctaUrl: "/store?sale=true",
    active: true,
  },
]

// API Functions
export const payloadcmsService = {
  // Pages
  async getPage(slug: string): Promise<Page | null> {
    await mockDelay(300)

    // Return a mock page
    return {
      id: generateId(),
      slug,
      title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
      content: [
        {
          id: generateId(),
          type: "hero",
          data: {
            title: `Welcome to ${slug}`,
            subtitle: "This is a dynamically generated page",
          },
        },
      ],
      seo: {
        title: `${slug} | Store`,
        description: `Learn more about ${slug}`,
        keywords: [slug],
      },
      status: "published",
      publishedAt: pastDate(30).toISOString(),
      createdAt: pastDate(60).toISOString(),
      updatedAt: pastDate(7).toISOString(),
    }
  },

  // Blog
  async getBlogPosts(options?: {
    category?: string
    tag?: string
    limit?: number
    offset?: number
  }): Promise<{ posts: BlogPost[]; total: number }> {
    await mockDelay(300)

    let posts = [...mockBlogPosts]

    if (options?.category) {
      posts = posts.filter((p) => p.category.slug === options.category)
    }

    if (options?.tag) {
      posts = posts.filter((p) => p.tags.includes(options.tag!))
    }

    const total = posts.length
    const offset = options?.offset || 0
    const limit = options?.limit || 10

    posts = posts.slice(offset, offset + limit)

    return { posts, total }
  },

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    await mockDelay(200)
    return mockBlogPosts.find((p) => p.slug === slug) || null
  },

  async getBlogCategories(): Promise<BlogCategory[]> {
    await mockDelay(200)
    return mockCategories
  },

  // FAQ
  async getFAQs(category?: string): Promise<FAQ[]> {
    await mockDelay(200)

    if (category) {
      return mockFAQs.filter((f) => f.category === category)
    }

    return mockFAQs
  },

  async getFAQCategories(): Promise<string[]> {
    await mockDelay(100)
    return Array.from(new Set(mockFAQs.map((f) => f.category)))
  },

  // Announcements
  async getActiveAnnouncements(): Promise<Announcement[]> {
    await mockDelay(200)

    const now = new Date()
    return mockAnnouncements.filter(
      (a) =>
        a.active &&
        new Date(a.startDate) <= now &&
        new Date(a.endDate) >= now
    )
  },

  // Events
  async getEvents(options?: {
    category?: string
    upcoming?: boolean
    limit?: number
  }): Promise<CityEvent[]> {
    await mockDelay(300)

    let events = [...mockEvents]

    if (options?.category) {
      events = events.filter((e) => e.category === options.category)
    }

    if (options?.upcoming) {
      events = events.filter((e) => new Date(e.startDate) >= new Date())
    }

    if (options?.limit) {
      events = events.slice(0, options.limit)
    }

    return events
  },

  async getEvent(slug: string): Promise<CityEvent | null> {
    await mockDelay(200)
    return mockEvents.find((e) => e.slug === slug) || null
  },

  // City Services
  async getServices(category?: string): Promise<CityService[]> {
    await mockDelay(300)

    if (category) {
      return mockServices.filter((s) => s.category === category)
    }

    return mockServices
  },

  async getService(slug: string): Promise<CityService | null> {
    await mockDelay(200)
    return mockServices.find((s) => s.slug === slug) || null
  },

  // Venues
  async getVenues(options?: {
    type?: VenueProfile["type"]
    limit?: number
  }): Promise<VenueProfile[]> {
    await mockDelay(300)

    let venues = [...mockVenues]

    if (options?.type) {
      venues = venues.filter((v) => v.type === options.type)
    }

    if (options?.limit) {
      venues = venues.slice(0, options.limit)
    }

    return venues
  },

  async getVenue(slug: string): Promise<VenueProfile | null> {
    await mockDelay(200)
    return mockVenues.find((v) => v.slug === slug) || null
  },

  // Navigation
  async getNavigation(name: string): Promise<Navigation | null> {
    await mockDelay(200)

    if (name === "main") {
      return {
        id: "nav_main",
        name: "Main Navigation",
        items: [
          { id: "nav_1", label: "Shop", url: "/store" },
          { id: "nav_2", label: "Blog", url: "/blog" },
          { id: "nav_3", label: "Events", url: "/events" },
          { id: "nav_4", label: "Help", url: "/help" },
        ],
      }
    }

    if (name === "footer") {
      return {
        id: "nav_footer",
        name: "Footer Navigation",
        items: [
          {
            id: "nav_f1",
            label: "Shop",
            url: "#",
            children: [
              { id: "nav_f1a", label: "All Products", url: "/store" },
              { id: "nav_f1b", label: "New Arrivals", url: "/store?sort=newest" },
              { id: "nav_f1c", label: "Sale", url: "/store?sale=true" },
            ],
          },
          {
            id: "nav_f2",
            label: "Support",
            url: "#",
            children: [
              { id: "nav_f2a", label: "Help Center", url: "/help" },
              { id: "nav_f2b", label: "Contact Us", url: "/contact" },
              { id: "nav_f2c", label: "Returns", url: "/returns" },
            ],
          },
          {
            id: "nav_f3",
            label: "Company",
            url: "#",
            children: [
              { id: "nav_f3a", label: "About Us", url: "/about" },
              { id: "nav_f3b", label: "Blog", url: "/blog" },
              { id: "nav_f3c", label: "Careers", url: "/careers" },
            ],
          },
        ],
      }
    }

    return null
  },

  // Banners
  async getBanners(type?: Banner["type"]): Promise<Banner[]> {
    await mockDelay(200)

    let banners = mockBanners.filter((b) => b.active)

    if (type) {
      banners = banners.filter((b) => b.type === type)
    }

    return banners
  },
}
