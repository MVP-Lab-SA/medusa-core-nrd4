/**
 * Content Mock Service
 * Blog, Announcements, Events, Help/FAQ, Venues
 */

import { generateId, mockDelay, pastDate, futureDate } from "./helpers"

// ==================== TYPES ====================

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: Author
  category: string
  tags: string[]
  image: string
  publishedAt: string
  readTime: number
  featured: boolean
}

export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
  role: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: "info" | "warning" | "success" | "promo"
  priority: "low" | "medium" | "high"
  startDate: string
  endDate: string
  dismissible: boolean
  link?: {
    text: string
    url: string
  }
  image?: string
}

export interface Event {
  id: string
  slug: string
  title: string
  description: string
  type: "workshop" | "webinar" | "sale" | "launch" | "community"
  image: string
  startDate: string
  endDate: string
  location: EventLocation
  capacity: number
  registered: number
  price: number
  currency: string
  featured: boolean
  speakers?: Speaker[]
}

export interface EventLocation {
  type: "online" | "in-person" | "hybrid"
  venue?: string
  address?: string
  city?: string
  meetingUrl?: string
}

export interface Speaker {
  id: string
  name: string
  avatar: string
  title: string
  company: string
}

export interface Venue {
  id: string
  slug: string
  name: string
  description: string
  type: "showroom" | "store" | "service-center" | "warehouse"
  image: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  email: string
  hours: VenueHours[]
  coordinates: {
    lat: number
    lng: number
  }
  amenities: string[]
  services: string[]
  featured: boolean
}

export interface VenueHours {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface HelpCategory {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  articleCount: number
}

export interface HelpArticle {
  id: string
  slug: string
  categoryId: string
  title: string
  content: string
  helpful: number
  notHelpful: number
  views: number
  updatedAt: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

// ==================== SEEDED DATA ====================

const IMAGES = {
  blog: {
    smartHome: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQNCHHES603SQZGZ202RK-01KGYZQNCHW5QT8S1A382HGRS0.jpeg",
    security: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR68BGBJN6KH7C2R68ZN7-01KGYZR68B3CX8JXKR27NWTXAS.jpeg",
    lighting: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR55S15ZZQWJ14CBPW7H6-01KGYZR55SWDFM62K7WG0M0FGC.jpeg",
  },
  events: {
    workshop: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQJY3NTFPBJNJMSR1NKB8-01KGYZQJY313PMD98EHKV0SWN9.jpeg",
    webinar: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQNSY2ANK0BV09RHAKKYD-01KGYZQNSY3GPSSPB2QRHX52Z5.jpeg",
    launch: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR7KVXP1TMCA9CHCWABGW-01KGYZR7KVNKMVKKZV70DVX6N3.jpeg",
  },
  venues: {
    flagship: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR0ZEFNT3CYGMNWEN3GKA-01KGYZR0ZEVGBDW3MS1ZHF9RC.jpeg",
    downtown: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQNCHHES603SQZGZ202RK-01KGYZQNCHW5QT8S1A382HGRS0.jpeg",
  },
  authors: {
    alex: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR8XWDDHKMDVHN10ES67B-01KGYZR8XW8B7JC8MDPGP2JVZB.jpeg",
    sarah: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR9T51NKQSMKQ717QY05N-01KGYZR9T5W7ABVAHR6VESAWH2.jpeg",
    david: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZRAKFH6RKHBGYCKF21Q6S-01KGYZRAKF3TW85RT2DYHXGWQE.jpeg",
  },
}

const mockAuthors: Author[] = [
  {
    id: "author_alex",
    name: "Alex Rivera",
    avatar: IMAGES.authors.alex,
    bio: "Smart home enthusiast and tech writer with 10+ years of experience in home automation.",
    role: "Head of Content",
  },
  {
    id: "author_sarah",
    name: "Sarah Chen",
    avatar: IMAGES.authors.sarah,
    bio: "Security specialist focused on making homes safer through technology.",
    role: "Security Editor",
  },
  {
    id: "author_david",
    name: "David Park",
    avatar: IMAGES.authors.david,
    bio: "Network engineer turned smart home consultant helping families connect their homes.",
    role: "Tech Specialist",
  },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "post_1",
    slug: "complete-guide-smart-home-2024",
    title: "The Complete Guide to Smart Home Technology in 2024",
    excerpt: "Everything you need to know about building a connected home, from sensors to security systems.",
    content: `
# The Complete Guide to Smart Home Technology in 2024

The smart home industry has evolved dramatically over the past few years. What was once a luxury for tech enthusiasts is now an accessible reality for everyday homeowners.

## Getting Started

The foundation of any smart home is a reliable network. Before purchasing devices, ensure your WiFi can handle the load. We recommend a mesh network system for homes over 1,500 square feet.

## Essential Categories

### Environmental Monitoring
Start with temperature and humidity sensors. The EnviroSense Pro X1 offers exceptional accuracy and integrates with all major platforms.

### Security
Modern security isn't just about cameras. Consider motion sensors, smart locks, and integrated alarm systems that work together.

### Lighting
Smart lighting transforms your home's ambiance while saving energy. Look for systems that support scenes and automation.

## Our Recommendations

For beginners, we recommend starting with our Smart Home Starter Kit. It includes everything you need to begin your journey into home automation.
    `,
    author: mockAuthors[0],
    category: "Guides",
    tags: ["smart home", "beginners", "guide", "2024"],
    image: IMAGES.blog.smartHome,
    publishedAt: pastDate(5).toISOString(),
    readTime: 8,
    featured: true,
  },
  {
    id: "post_2",
    slug: "home-security-best-practices",
    title: "Home Security Best Practices: Protecting What Matters Most",
    excerpt: "Learn how to create a comprehensive home security system using modern smart devices.",
    content: `
# Home Security Best Practices

Your home should be your sanctuary. With the right technology, you can protect your family and belongings while maintaining convenience.

## Layer Your Security

The most effective security systems use multiple layers:

1. **Perimeter Protection**: Outdoor cameras and motion sensors
2. **Entry Points**: Smart locks and door/window sensors
3. **Interior Monitoring**: Indoor cameras and motion detection

## Camera Placement

Strategic camera placement is crucial. Focus on:
- Main entrances
- Garage and side doors
- Backyards and driveways

The SecureDome 360 with its 360-degree coverage is ideal for monitoring large areas with a single camera.

## Smart Integration

Connect your security devices to your smart home hub for automated responses like turning on lights when motion is detected.
    `,
    author: mockAuthors[1],
    category: "Security",
    tags: ["security", "cameras", "protection", "tips"],
    image: IMAGES.blog.security,
    publishedAt: pastDate(12).toISOString(),
    readTime: 6,
    featured: true,
  },
  {
    id: "post_3",
    slug: "smart-lighting-energy-savings",
    title: "How Smart Lighting Can Cut Your Energy Bills by 30%",
    excerpt: "Discover how intelligent lighting systems save money while improving your home's atmosphere.",
    content: `
# Smart Lighting and Energy Savings

Smart lighting isn't just about convenience - it's a powerful tool for reducing your energy consumption.

## The Science Behind Savings

Traditional lighting often stays on when rooms are empty. Smart systems with motion sensors and schedules ensure lights only operate when needed.

## Features That Save Money

### Dimming
Dimming lights by 25% can save 20% of energy used by those bulbs.

### Scheduling
Automated schedules prevent lights from being left on accidentally.

### Occupancy Sensing
Motion-activated lighting ensures empty rooms stay dark.

## Our Recommendation

The LumiGrid system offers all these features with seamless integration and easy setup. Most users report savings within the first month.
    `,
    author: mockAuthors[2],
    category: "Energy",
    tags: ["lighting", "energy", "savings", "smart home"],
    image: IMAGES.blog.lighting,
    publishedAt: pastDate(20).toISOString(),
    readTime: 5,
    featured: false,
  },
  {
    id: "post_4",
    slug: "voice-assistant-integration",
    title: "Mastering Voice Assistant Integration for Your Smart Home",
    excerpt: "Get the most out of Alexa, Google Home, and Siri with these expert tips.",
    content: `
# Voice Assistant Integration

Voice control is the ultimate convenience in a smart home. Here's how to set it up effectively.

## Choosing Your Platform

Each major platform has strengths:
- **Alexa**: Best device compatibility
- **Google Home**: Superior natural language processing
- **Apple HomeKit**: Best privacy and Apple ecosystem integration

## Setting Up Routines

Create voice commands that trigger multiple actions:
- "Good morning" - Turns on lights, adjusts thermostat, plays news
- "Goodnight" - Locks doors, arms security, turns off lights

## Tips for Success

1. Place speakers strategically for full home coverage
2. Use consistent naming conventions
3. Create backup manual controls
    `,
    author: mockAuthors[0],
    category: "Guides",
    tags: ["voice control", "alexa", "google home", "integration"],
    image: IMAGES.blog.smartHome,
    publishedAt: pastDate(30).toISOString(),
    readTime: 7,
    featured: false,
  },
]

const mockAnnouncements: Announcement[] = [
  {
    id: "ann_1",
    title: "Summer Sale - Up to 40% Off",
    content: "Our biggest sale of the year is here! Save up to 40% on select smart home devices through the end of the month.",
    type: "promo",
    priority: "high",
    startDate: pastDate(2).toISOString(),
    endDate: futureDate(28).toISOString(),
    dismissible: true,
    link: {
      text: "Shop Now",
      url: "/us/flash-sales",
    },
    image: IMAGES.events.launch,
  },
  {
    id: "ann_2",
    title: "Free Installation Weekend",
    content: "Book a professional installation this weekend and get the service fee waived. Limited spots available!",
    type: "success",
    priority: "medium",
    startDate: pastDate(1).toISOString(),
    endDate: futureDate(5).toISOString(),
    dismissible: true,
    link: {
      text: "Book Now",
      url: "/us/services",
    },
  },
  {
    id: "ann_3",
    title: "New EnviroSense Pro X2 Coming Soon",
    content: "Be the first to know when our next-generation environmental sensor launches. Sign up for notifications.",
    type: "info",
    priority: "low",
    startDate: pastDate(7).toISOString(),
    endDate: futureDate(30).toISOString(),
    dismissible: true,
    link: {
      text: "Get Notified",
      url: "/us/products",
    },
  },
  {
    id: "ann_4",
    title: "Scheduled Maintenance Notice",
    content: "Our online services will undergo maintenance on Sunday from 2-4 AM EST. Some features may be temporarily unavailable.",
    type: "warning",
    priority: "medium",
    startDate: pastDate(1).toISOString(),
    endDate: futureDate(3).toISOString(),
    dismissible: false,
  },
]

const mockEvents: Event[] = [
  {
    id: "event_1",
    slug: "smart-home-workshop-beginners",
    title: "Smart Home 101: Workshop for Beginners",
    description: "Join us for a hands-on workshop where you'll learn the basics of setting up and configuring your first smart home devices. Perfect for anyone just getting started with home automation.",
    type: "workshop",
    image: IMAGES.events.workshop,
    startDate: futureDate(14).toISOString(),
    endDate: futureDate(14).toISOString(),
    location: {
      type: "in-person",
      venue: "NexGen Smart Home Flagship Store",
      address: "100 Innovation Drive",
      city: "San Francisco, CA",
    },
    capacity: 30,
    registered: 22,
    price: 0,
    currency: "USD",
    featured: true,
    speakers: [
      {
        id: "speaker_1",
        name: "Mike Anderson",
        avatar: IMAGES.authors.alex,
        title: "Senior Installation Technician",
        company: "NexGen Smart Home",
      },
    ],
  },
  {
    id: "event_2",
    slug: "security-systems-webinar",
    title: "Securing Your Home: A Deep Dive into Smart Security",
    description: "Our security experts will walk you through best practices for home security, camera placement strategies, and integrating security systems with your smart home.",
    type: "webinar",
    image: IMAGES.events.webinar,
    startDate: futureDate(7).toISOString(),
    endDate: futureDate(7).toISOString(),
    location: {
      type: "online",
      meetingUrl: "https://webinar.example.com/security-systems",
    },
    capacity: 500,
    registered: 287,
    price: 0,
    currency: "USD",
    featured: true,
    speakers: [
      {
        id: "speaker_2",
        name: "Sarah Mitchell",
        avatar: IMAGES.authors.sarah,
        title: "Security Systems Specialist",
        company: "NexGen Smart Home",
      },
    ],
  },
  {
    id: "event_3",
    slug: "product-launch-envirosense-x2",
    title: "EnviroSense Pro X2 Launch Event",
    description: "Be among the first to experience our next-generation environmental sensor. Exclusive demos, early-bird pricing, and refreshments.",
    type: "launch",
    image: IMAGES.events.launch,
    startDate: futureDate(30).toISOString(),
    endDate: futureDate(30).toISOString(),
    location: {
      type: "hybrid",
      venue: "NexGen Smart Home Flagship Store",
      address: "100 Innovation Drive",
      city: "San Francisco, CA",
      meetingUrl: "https://stream.example.com/launch",
    },
    capacity: 200,
    registered: 156,
    price: 25,
    currency: "USD",
    featured: true,
  },
  {
    id: "event_4",
    slug: "community-meetup-smart-home-enthusiasts",
    title: "Smart Home Enthusiasts Meetup",
    description: "Connect with fellow smart home enthusiasts, share tips and tricks, and learn from each other's experiences. Refreshments provided.",
    type: "community",
    image: IMAGES.events.workshop,
    startDate: futureDate(21).toISOString(),
    endDate: futureDate(21).toISOString(),
    location: {
      type: "in-person",
      venue: "TechHub Community Center",
      address: "456 Tech Boulevard",
      city: "San Francisco, CA",
    },
    capacity: 50,
    registered: 34,
    price: 0,
    currency: "USD",
    featured: false,
  },
]

const mockVenues: Venue[] = [
  {
    id: "venue_1",
    slug: "flagship-san-francisco",
    name: "NexGen Flagship Store",
    description: "Our flagship location featuring the complete smart home experience. Explore fully-functional demo rooms, get hands-on with products, and consult with our experts.",
    type: "showroom",
    image: IMAGES.venues.flagship,
    address: "100 Innovation Drive",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "USA",
    phone: "+1 (415) 555-0100",
    email: "sf-flagship@nexgensmarthome.com",
    hours: [
      { day: "Monday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Tuesday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Wednesday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Thursday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Friday", open: "10:00 AM", close: "9:00 PM" },
      { day: "Saturday", open: "9:00 AM", close: "9:00 PM" },
      { day: "Sunday", open: "11:00 AM", close: "6:00 PM" },
    ],
    coordinates: { lat: 37.7749, lng: -122.4194 },
    amenities: ["Free WiFi", "Parking Available", "Wheelchair Accessible", "Coffee Bar"],
    services: ["Product Demos", "Expert Consultations", "Installation Booking", "Returns & Exchanges"],
    featured: true,
  },
  {
    id: "venue_2",
    slug: "downtown-los-angeles",
    name: "NexGen Downtown LA",
    description: "Conveniently located in the heart of downtown Los Angeles. Full product selection and expert staff ready to help you create your perfect smart home.",
    type: "store",
    image: IMAGES.venues.downtown,
    address: "500 Grand Avenue",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    country: "USA",
    phone: "+1 (213) 555-0200",
    email: "dtla@nexgensmarthome.com",
    hours: [
      { day: "Monday", open: "10:00 AM", close: "7:00 PM" },
      { day: "Tuesday", open: "10:00 AM", close: "7:00 PM" },
      { day: "Wednesday", open: "10:00 AM", close: "7:00 PM" },
      { day: "Thursday", open: "10:00 AM", close: "7:00 PM" },
      { day: "Friday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Saturday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Sunday", open: "12:00 PM", close: "5:00 PM" },
    ],
    coordinates: { lat: 34.0522, lng: -118.2437 },
    amenities: ["Free WiFi", "Street Parking", "Wheelchair Accessible"],
    services: ["Product Demos", "Installation Booking", "Returns & Exchanges"],
    featured: true,
  },
  {
    id: "venue_3",
    slug: "service-center-oakland",
    name: "NexGen Service Center",
    description: "Our dedicated service center for repairs, technical support, and professional installation scheduling.",
    type: "service-center",
    image: IMAGES.venues.flagship,
    address: "800 Industrial Way",
    city: "Oakland",
    state: "CA",
    zip: "94612",
    country: "USA",
    phone: "+1 (510) 555-0300",
    email: "service@nexgensmarthome.com",
    hours: [
      { day: "Monday", open: "8:00 AM", close: "5:00 PM" },
      { day: "Tuesday", open: "8:00 AM", close: "5:00 PM" },
      { day: "Wednesday", open: "8:00 AM", close: "5:00 PM" },
      { day: "Thursday", open: "8:00 AM", close: "5:00 PM" },
      { day: "Friday", open: "8:00 AM", close: "5:00 PM" },
      { day: "Saturday", open: "9:00 AM", close: "2:00 PM" },
      { day: "Sunday", open: "", close: "", closed: true },
    ],
    coordinates: { lat: 37.8044, lng: -122.2712 },
    amenities: ["Free Parking", "Wheelchair Accessible"],
    services: ["Repairs", "Technical Support", "Installation Scheduling", "Warranty Claims"],
    featured: false,
  },
]

const mockHelpCategories: HelpCategory[] = [
  {
    id: "cat_orders",
    slug: "orders-shipping",
    name: "Orders & Shipping",
    description: "Track orders, shipping info, and delivery questions",
    icon: "Package",
    articleCount: 12,
  },
  {
    id: "cat_returns",
    slug: "returns-refunds",
    name: "Returns & Refunds",
    description: "Return policies, refund process, and exchanges",
    icon: "ArrowUturnLeft",
    articleCount: 8,
  },
  {
    id: "cat_products",
    slug: "product-support",
    name: "Product Support",
    description: "Setup guides, troubleshooting, and product FAQs",
    icon: "Cog",
    articleCount: 24,
  },
  {
    id: "cat_account",
    slug: "account-billing",
    name: "Account & Billing",
    description: "Account settings, payment methods, and billing",
    icon: "User",
    articleCount: 10,
  },
  {
    id: "cat_installation",
    slug: "installation-services",
    name: "Installation Services",
    description: "Professional installation and setup assistance",
    icon: "Tools",
    articleCount: 6,
  },
]

const mockHelpArticles: HelpArticle[] = [
  {
    id: "article_1",
    slug: "how-to-track-order",
    categoryId: "cat_orders",
    title: "How to Track Your Order",
    content: `
# How to Track Your Order

Tracking your order is easy with NexGen Smart Home.

## Using Your Account

1. Log in to your account
2. Go to "Order History"
3. Click on your order number
4. View real-time tracking information

## Using Your Confirmation Email

You can also track your order using the link in your confirmation email. No login required!

## Delivery Estimates

- Standard Shipping: 5-7 business days
- Express Shipping: 2-3 business days
- Same Day (select areas): Order by 12 PM

If you have questions about your delivery, contact our support team.
    `,
    helpful: 245,
    notHelpful: 12,
    views: 3420,
    updatedAt: pastDate(7).toISOString(),
  },
  {
    id: "article_2",
    slug: "return-policy",
    categoryId: "cat_returns",
    title: "Return Policy & Process",
    content: `
# Return Policy

We want you to be completely satisfied with your purchase.

## 30-Day Return Window

You have 30 days from delivery to return most items for a full refund.

## How to Start a Return

1. Go to your Order History
2. Select the order containing the item
3. Click "Start Return"
4. Print your prepaid shipping label
5. Drop off at any carrier location

## Refund Timeline

- Original payment method: 5-7 business days after we receive the item
- Store credit: Instant upon receipt

## Non-Returnable Items

- Custom installations
- Opened software/digital products
- Items marked final sale
    `,
    helpful: 189,
    notHelpful: 8,
    views: 2890,
    updatedAt: pastDate(14).toISOString(),
  },
  {
    id: "article_3",
    slug: "envirosense-setup-guide",
    categoryId: "cat_products",
    title: "EnviroSense Pro X1 Setup Guide",
    content: `
# EnviroSense Pro X1 Setup Guide

Get your EnviroSense up and running in minutes.

## What's in the Box

- EnviroSense Pro X1 sensor
- USB-C power cable
- Quick start guide
- Mounting hardware

## Step-by-Step Setup

### 1. Download the App
Download the NexGen Home app from the App Store or Google Play.

### 2. Create/Log In to Account
Open the app and sign in or create a new account.

### 3. Add Device
Tap the "+" button and select "EnviroSense Pro X1"

### 4. Power On
Connect the USB-C cable and wait for the LED to pulse blue.

### 5. Connect
Follow the in-app prompts to connect to your WiFi network.

### 6. Place Your Sensor
Mount or place your sensor in the desired location. Avoid direct sunlight and air vents.

## Troubleshooting

If the LED doesn't pulse blue, try resetting by holding the button for 10 seconds.
    `,
    helpful: 312,
    notHelpful: 15,
    views: 4560,
    updatedAt: pastDate(3).toISOString(),
  },
]

const mockFAQs: FAQ[] = [
  {
    id: "faq_1",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For business customers, we also offer invoice payment with Net 30 terms.",
    category: "Payment",
    order: 1,
  },
  {
    id: "faq_2",
    question: "Do you offer international shipping?",
    answer: "Currently, we ship to the United States and Canada. We're working on expanding to more countries. Sign up for our newsletter to be notified when we launch in your region.",
    category: "Shipping",
    order: 2,
  },
  {
    id: "faq_3",
    question: "How do I set up my smart home devices?",
    answer: "All our devices come with easy setup guides. Simply download our NexGen Home app, create an account, and follow the step-by-step instructions. Most devices are ready within 10 minutes. For complex setups, we offer professional installation services.",
    category: "Products",
    order: 3,
  },
  {
    id: "faq_4",
    question: "What is your warranty policy?",
    answer: "All products come with a 2-year manufacturer warranty covering defects in materials and workmanship. Extended warranty options are available at checkout. Subscription members receive an additional year of coverage.",
    category: "Warranty",
    order: 4,
  },
  {
    id: "faq_5",
    question: "Can I return a product if I'm not satisfied?",
    answer: "Yes! We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, you can return it for a full refund. Items must be in original packaging with all accessories.",
    category: "Returns",
    order: 5,
  },
  {
    id: "faq_6",
    question: "Do your products work with Alexa/Google Home/Apple HomeKit?",
    answer: "Most of our products are compatible with all three major platforms. Check the product page for specific compatibility information. Our EnviroSense and SecureDome lines work with all platforms.",
    category: "Products",
    order: 6,
  },
  {
    id: "faq_7",
    question: "How do I contact customer support?",
    answer: "You can reach us via live chat on our website (24/7), email at support@nexgensmarthome.com, or phone at 1-800-NEXGEN-1. Our support team is available Monday-Friday 8 AM - 8 PM EST.",
    category: "Support",
    order: 7,
  },
  {
    id: "faq_8",
    question: "Do you offer professional installation?",
    answer: "Yes! We offer professional installation services in most major metro areas. Our certified technicians can install, configure, and train you on your new smart home devices. Book through our Services page or during checkout.",
    category: "Services",
    order: 8,
  },
]

// ==================== API FUNCTIONS ====================

export const contentService = {
  // ========== BLOG ==========
  async getBlogPosts(options?: { category?: string; tag?: string; limit?: number; featured?: boolean }): Promise<BlogPost[]> {
    await mockDelay(300)
    let posts = [...mockBlogPosts]
    
    if (options?.category) {
      posts = posts.filter(p => p.category.toLowerCase() === options.category!.toLowerCase())
    }
    if (options?.tag) {
      posts = posts.filter(p => p.tags.some(t => t.toLowerCase() === options.tag!.toLowerCase()))
    }
    if (options?.featured) {
      posts = posts.filter(p => p.featured)
    }
    if (options?.limit) {
      posts = posts.slice(0, options.limit)
    }
    
    return posts
  },

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    await mockDelay(200)
    return mockBlogPosts.find(p => p.slug === slug) || null
  },

  async getBlogCategories(): Promise<string[]> {
    await mockDelay(100)
    return [...new Set(mockBlogPosts.map(p => p.category))]
  },

  // ========== ANNOUNCEMENTS ==========
  async getAnnouncements(options?: { type?: string; active?: boolean }): Promise<Announcement[]> {
    await mockDelay(200)
    let announcements = [...mockAnnouncements]
    
    const now = new Date()
    if (options?.active !== false) {
      announcements = announcements.filter(a => {
        const start = new Date(a.startDate)
        const end = new Date(a.endDate)
        return now >= start && now <= end
      })
    }
    if (options?.type) {
      announcements = announcements.filter(a => a.type === options.type)
    }
    
    return announcements.sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 }
      return priority[b.priority] - priority[a.priority]
    })
  },

  async dismissAnnouncement(announcementId: string): Promise<void> {
    await mockDelay(100)
    // In a real app, this would store the dismissal in user preferences
  },

  // ========== EVENTS ==========
  async getEvents(options?: { type?: string; upcoming?: boolean; featured?: boolean; limit?: number }): Promise<Event[]> {
    await mockDelay(300)
    let events = [...mockEvents]
    
    if (options?.upcoming !== false) {
      const now = new Date()
      events = events.filter(e => new Date(e.startDate) >= now)
    }
    if (options?.type) {
      events = events.filter(e => e.type === options.type)
    }
    if (options?.featured) {
      events = events.filter(e => e.featured)
    }
    
    events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    
    if (options?.limit) {
      events = events.slice(0, options.limit)
    }
    
    return events
  },

  async getEvent(slug: string): Promise<Event | null> {
    await mockDelay(200)
    return mockEvents.find(e => e.slug === slug) || null
  },

  async registerForEvent(eventId: string, customerId: string): Promise<{ success: boolean; ticketId: string }> {
    await mockDelay(500)
    const event = mockEvents.find(e => e.id === eventId)
    if (event && event.registered < event.capacity) {
      event.registered++
      return { success: true, ticketId: generateId() }
    }
    return { success: false, ticketId: "" }
  },

  // ========== VENUES ==========
  async getVenues(options?: { type?: string; city?: string; featured?: boolean }): Promise<Venue[]> {
    await mockDelay(300)
    let venues = [...mockVenues]
    
    if (options?.type) {
      venues = venues.filter(v => v.type === options.type)
    }
    if (options?.city) {
      venues = venues.filter(v => v.city.toLowerCase().includes(options.city!.toLowerCase()))
    }
    if (options?.featured) {
      venues = venues.filter(v => v.featured)
    }
    
    return venues
  },

  async getVenue(slug: string): Promise<Venue | null> {
    await mockDelay(200)
    return mockVenues.find(v => v.slug === slug) || null
  },

  async findNearestVenue(lat: number, lng: number): Promise<Venue | null> {
    await mockDelay(300)
    // Simple distance calculation (not accurate for long distances)
    let nearest: Venue | null = null
    let minDistance = Infinity
    
    for (const venue of mockVenues) {
      const distance = Math.sqrt(
        Math.pow(venue.coordinates.lat - lat, 2) +
        Math.pow(venue.coordinates.lng - lng, 2)
      )
      if (distance < minDistance) {
        minDistance = distance
        nearest = venue
      }
    }
    
    return nearest
  },

  // ========== HELP ==========
  async getHelpCategories(): Promise<HelpCategory[]> {
    await mockDelay(200)
    return mockHelpCategories
  },

  async getHelpCategory(slug: string): Promise<HelpCategory | null> {
    await mockDelay(100)
    return mockHelpCategories.find(c => c.slug === slug) || null
  },

  async getHelpArticles(categoryId?: string): Promise<HelpArticle[]> {
    await mockDelay(300)
    if (categoryId) {
      return mockHelpArticles.filter(a => a.categoryId === categoryId)
    }
    return mockHelpArticles
  },

  async getHelpArticle(slug: string): Promise<HelpArticle | null> {
    await mockDelay(200)
    return mockHelpArticles.find(a => a.slug === slug) || null
  },

  async searchHelp(query: string): Promise<HelpArticle[]> {
    await mockDelay(400)
    const q = query.toLowerCase()
    return mockHelpArticles.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q)
    )
  },

  async markArticleHelpful(articleId: string, helpful: boolean): Promise<void> {
    await mockDelay(200)
    const article = mockHelpArticles.find(a => a.id === articleId)
    if (article) {
      if (helpful) {
        article.helpful++
      } else {
        article.notHelpful++
      }
    }
  },

  // ========== FAQ ==========
  async getFAQs(category?: string): Promise<FAQ[]> {
    await mockDelay(200)
    let faqs = [...mockFAQs]
    if (category) {
      faqs = faqs.filter(f => f.category.toLowerCase() === category.toLowerCase())
    }
    return faqs.sort((a, b) => a.order - b.order)
  },
}
