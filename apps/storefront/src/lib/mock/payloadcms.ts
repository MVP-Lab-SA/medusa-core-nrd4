/**
 * PayloadCMS Mock Service
 * Content & Configuration Management
 */

import { generateId, mockDelay, pastDate, futureDate } from "./helpers"

// Generated Images
const IMAGES = {
  blog: {
    smartHomeTrends: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQVBQZA7DNZZZ6EJYZZJ9-01KGYZQVBQ44C6ZSF16ZX811BJ.jpeg",
    iotSecurity: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQWVRA767B9BP4YV3VAA5-01KGYZQWVR0VWKRXJ7J2ESDS2D.jpeg",
    energyEfficiency: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQXMSZC6X0HNX0RR7VDY4-01KGYZQXMSNQXGG4P8TQMXWX9Q.jpeg",
  },
  events: {
    techConference: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQQ4YZ0CXDYE7WY3QM9DJ-01KGYZQQ4ZN1EYTXY2V00CXN79.jpeg",
    productLaunch: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQNQEA4B0PS8PKBQHBFP0-01KGYZQNQE6S6W2M8RBYEHF07D.jpeg",
    workshop: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQPDVJNDAG7W0B27XP33D-01KGYZQPDVB8A8KE1BEAW64P0S.jpeg",
  },
  venues: {
    showroom: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQYE7PXHXSGGXWFV1RKRW-01KGYZQYE7J44XBC9DFFBCNBA9.jpeg",
    trainingCenter: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQZKE8Y0CH6J3YNCSHRZF-01KGYZQZKE9JX9A4XN4T6EKFP1.jpeg",
  },
  authors: {
    sarah: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR9T51NKQSMKQ717QY05N-01KGYZR9T5W7ABVAHR6VESAWH2.jpeg",
    david: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZRAKFH6RKHBGYCKF21Q6S-01KGYZRAKF3TW85RT2DYHXGWQE.jpeg",
    michael: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZQBSMRXYZK1MEHXGYYRYJ-01KGYZQBSMYQW16EDS7XJWFT8R.jpeg",
  },
  flashSale: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KGYZR7KVXP1TMCA9CHCWABGW-01KGYZR7KVNKMVKKZV70DVX6N3.jpeg",
}

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
  date: string
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
  type: "restaurant" | "cafe" | "retail" | "service" | "entertainment" | "showroom" | "training"
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
    id: "author_sarah",
    name: "Sarah Mitchell",
    avatar: IMAGES.authors.sarah,
    bio: "Smart home technology expert and installation specialist with 10+ years in the industry. Passionate about making technology accessible to everyone.",
  },
  {
    id: "author_david",
    name: "David Chen",
    avatar: IMAGES.authors.david,
    bio: "Network infrastructure engineer and tech writer covering IoT trends, cybersecurity, and smart building technology.",
  },
  {
    id: "author_michael",
    name: "Michael Torres",
    avatar: IMAGES.authors.michael,
    bio: "Product reviewer and smart home enthusiast. Testing and reviewing the latest gadgets to help you make informed decisions.",
  },
]

const mockCategories: BlogCategory[] = [
  { id: "cat_smart_home", name: "Smart Home", slug: "smart-home", description: "Tips and guides for smart home automation", postCount: 24 },
  { id: "cat_security", name: "Security", slug: "security", description: "Home and business security insights", postCount: 18 },
  { id: "cat_iot", name: "IoT & Tech", slug: "iot-tech", description: "Internet of Things and technology trends", postCount: 32 },
  { id: "cat_guides", name: "How-To Guides", slug: "guides", description: "Step-by-step tutorials and guides", postCount: 15 },
  { id: "cat_news", name: "Company News", slug: "news", description: "Latest updates and announcements", postCount: 12 },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "post_smart_home_2025",
    slug: "smart-home-automation-trends-2025",
    title: "Smart Home Automation Trends to Watch in 2025",
    excerpt: "Discover the cutting-edge technologies transforming how we live. From AI-powered assistants to predictive maintenance, these trends are reshaping the smart home landscape.",
    content: `
## The Future of Smart Living

The smart home industry continues to evolve at a rapid pace. As we move into 2025, several key trends are emerging that will fundamentally change how we interact with our living spaces.

### 1. AI-Powered Home Management

Artificial intelligence is no longer just about voice commands. Modern smart home systems now learn your habits, predict your needs, and make autonomous decisions to optimize comfort and efficiency.

**Key Features:**
- Predictive temperature adjustments based on weather and occupancy
- Automated lighting scenes that adapt to time of day and activities
- Energy optimization that reduces bills without sacrificing comfort

### 2. Matter Protocol Adoption

The Matter protocol has finally achieved widespread adoption, making device interoperability a reality. This means your smart devices work together seamlessly, regardless of manufacturer.

### 3. Enhanced Security Integration

Security systems are becoming more sophisticated with:
- AI-powered threat detection
- Facial recognition for family members
- Seamless integration with smart locks and cameras
- Proactive alerts before issues occur

### 4. Sustainable Smart Homes

Energy efficiency is no longer optional. Smart homes now actively contribute to sustainability through:
- Solar integration and battery storage management
- Water usage monitoring and optimization
- Carbon footprint tracking and reduction suggestions

## Getting Started

If you're looking to upgrade your home in 2025, start with a solid foundation:

1. **Invest in a reliable hub** that supports Matter protocol
2. **Start with essentials** - lighting, climate control, and security
3. **Plan for scalability** - choose systems that grow with your needs
4. **Consider professional installation** for complex setups

The future of smart living is here, and it's more accessible than ever.
    `,
    featuredImage: IMAGES.blog.smartHomeTrends,
    author: mockAuthors[0],
    category: mockCategories[0],
    tags: ["smart home", "automation", "AI", "2025", "trends"],
    status: "published",
    publishedAt: pastDate(2).toISOString(),
    readingTime: 8,
    createdAt: pastDate(5).toISOString(),
  },
  {
    id: "post_iot_security",
    slug: "securing-your-iot-devices-complete-guide",
    title: "Securing Your IoT Devices: A Complete Guide",
    excerpt: "With more connected devices in our homes than ever before, security is paramount. Learn how to protect your smart home from cyber threats.",
    content: `
## Why IoT Security Matters

Every connected device in your home is a potential entry point for hackers. From smart cameras to thermostats, these devices often lack robust security features out of the box.

### Common Vulnerabilities

1. **Default Passwords** - Many devices ship with factory-set credentials
2. **Outdated Firmware** - Unpatched devices are easy targets
3. **Insecure Networks** - Weak WiFi security compromises all devices
4. **Lack of Encryption** - Data transmitted in plain text can be intercepted

### Essential Security Measures

#### Network Segmentation
Create a separate network for your IoT devices. This isolates them from your main network where you store sensitive data.

#### Regular Updates
Enable automatic updates whenever possible. Check manufacturer websites monthly for firmware updates.

#### Strong Authentication
- Change all default passwords immediately
- Use unique passwords for each device
- Enable two-factor authentication where available

#### Monitor Your Network
Use network monitoring tools to detect unusual activity. Many routers now include basic intrusion detection features.

### Recommended Security Tools

1. **Network scanners** to identify all connected devices
2. **VPN services** for remote access to your smart home
3. **Password managers** to handle unique credentials
4. **Security cameras** with local storage options

## Building a Secure Foundation

Start with these basics:
- Secure your WiFi with WPA3 encryption
- Use a firewall on your router
- Disable features you don't use
- Research devices before purchasing

A secure smart home is a smart home you can trust.
    `,
    featuredImage: IMAGES.blog.iotSecurity,
    author: mockAuthors[1],
    category: mockCategories[1],
    tags: ["security", "IoT", "cybersecurity", "smart home", "protection"],
    status: "published",
    publishedAt: pastDate(5).toISOString(),
    readingTime: 10,
    createdAt: pastDate(8).toISOString(),
  },
  {
    id: "post_energy_efficiency",
    slug: "smart-sensors-energy-efficiency",
    title: "How Smart Sensors Can Cut Your Energy Bills by 40%",
    excerpt: "Environmental sensors do more than monitor - they actively help reduce energy consumption. Here's how to maximize savings with intelligent automation.",
    content: `
## The Power of Smart Sensing

Modern environmental sensors have evolved far beyond simple temperature readings. Today's devices monitor everything from air quality to occupancy, enabling unprecedented energy optimization.

### Understanding Energy Waste

Most homes waste energy in predictable ways:
- Heating/cooling empty rooms
- Lights left on in unoccupied spaces
- Appliances running during peak rate hours
- HVAC systems fighting open windows

### Smart Solutions

#### Occupancy-Based Climate Control
Motion and presence sensors can automatically adjust HVAC settings based on room occupancy. Studies show this alone can save 15-25% on heating and cooling costs.

#### Intelligent Lighting
Combine ambient light sensors with occupancy detection:
- Lights dim automatically in bright conditions
- Turn off completely when rooms are empty
- Adjust color temperature throughout the day

#### Window and Door Sensors
Simple open/close sensors can:
- Pause HVAC when windows are open
- Alert you to forgotten open doors
- Integrate with security systems

### Real-World Results

Our customers report average savings of:
- **23%** reduction in electricity bills
- **31%** reduction in gas bills
- **18-month** average payback period

### Getting Started

1. **Audit your current usage** - Check utility bills for patterns
2. **Identify high-impact areas** - Focus on HVAC and lighting first
3. **Start small** - Begin with one room as a proof of concept
4. **Measure and optimize** - Use data to refine your approach

The EnviroSense Pro X1 is an excellent starting point, offering comprehensive environmental monitoring with smart home integration.

## The Bottom Line

Smart sensors aren't just gadgets - they're investments that pay for themselves. With rising energy costs, there's never been a better time to make your home intelligent.
    `,
    featuredImage: IMAGES.blog.energyEfficiency,
    author: mockAuthors[2],
    category: mockCategories[0],
    tags: ["energy", "efficiency", "sensors", "savings", "smart home"],
    status: "published",
    publishedAt: pastDate(10).toISOString(),
    readingTime: 7,
    createdAt: pastDate(12).toISOString(),
  },
]

const mockFAQs: FAQ[] = [
  { id: "faq_1", question: "How do I set up my smart home devices?", answer: "Most of our devices use our companion app for setup. Download the app, create an account, and follow the in-app instructions. For complex installations, we recommend our professional setup service.", category: "Setup", order: 1 },
  { id: "faq_2", question: "Are your devices compatible with Alexa/Google Home?", answer: "Yes! All our devices support major smart home platforms including Amazon Alexa, Google Home, Apple HomeKit, and Samsung SmartThings. They also support the new Matter protocol.", category: "Compatibility", order: 1 },
  { id: "faq_3", question: "What is your return policy?", answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied, return the product in its original packaging for a full refund. Defective products are covered by our 2-year warranty.", category: "Orders", order: 1 },
  { id: "faq_4", question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days within the continental US. Express shipping (1-2 days) is available at checkout. International shipping typically takes 7-14 business days.", category: "Shipping", order: 1 },
  { id: "faq_5", question: "Do your devices work without internet?", answer: "Most basic functions work offline via local network control. However, remote access, voice control, and cloud features require an internet connection. We recommend a stable WiFi connection for best experience.", category: "Setup", order: 2 },
  { id: "faq_6", question: "How do I update firmware on my devices?", answer: "Firmware updates are delivered automatically through our app. You'll receive a notification when an update is available. We recommend enabling automatic updates for security and feature improvements.", category: "Setup", order: 3 },
  { id: "faq_7", question: "Is professional installation available?", answer: "Yes! We partner with certified installers nationwide. Professional installation is recommended for security systems, network infrastructure, and whole-home automation projects. Book through our app or website.", category: "Services", order: 1 },
  { id: "faq_8", question: "How secure are your smart home devices?", answer: "Security is our top priority. All devices use AES-256 encryption, support two-factor authentication, and receive regular security updates. We never sell your data and all recordings are stored locally by default.", category: "Security", order: 1 },
  { id: "faq_9", question: "Can I control devices when I'm away from home?", answer: "Absolutely! Our app provides full remote control from anywhere with an internet connection. You can monitor sensors, view camera feeds, control lights, and receive alerts in real-time.", category: "Features", order: 1 },
  { id: "faq_10", question: "Do you offer bulk/business pricing?", answer: "Yes, we offer volume discounts for businesses and large installations. Contact our B2B team or register for a business account to access special pricing, NET-30 terms, and dedicated support.", category: "Business", order: 1 },
]

const mockEvents: CityEvent[] = [
  {
    id: "event_tech_summit",
    slug: "smart-home-tech-summit-2025",
    title: "Smart Home Tech Summit 2025",
    description: "Join industry leaders, innovators, and enthusiasts for the premier smart home technology conference. Featuring keynotes, hands-on demos, and exclusive product reveals.",
    content: `
## About the Event

The Smart Home Tech Summit is the year's most anticipated event for smart home enthusiasts and professionals. This three-day conference brings together the brightest minds in home automation, IoT, and connected living.

### What to Expect

**Day 1: Innovation Showcase**
- Opening keynote from industry pioneers
- New product announcements from major brands
- Networking reception

**Day 2: Deep Dives**
- Technical workshops and hands-on labs
- Panel discussions on emerging trends
- Partner exhibitions

**Day 3: Future Forward**
- Startup pitches and innovation awards
- Integration masterclasses
- Closing ceremony and prizes

### Featured Speakers
- CEOs from leading smart home companies
- Security experts and researchers
- Award-winning product designers
- Smart home influencers and reviewers

All attendees receive a welcome kit with exclusive product samples and discounts.
    `,
    featuredImage: IMAGES.events.techConference,
    date: futureDate(45).toISOString(),
    startDate: futureDate(45).toISOString(),
    endDate: futureDate(47).toISOString(),
    location: {
      name: "Silicon Valley Convention Center",
      address: "1234 Innovation Drive, San Jose, CA 95110",
      coordinates: { lat: 37.3382, lng: -121.8863 },
    },
    category: "Conference",
    ticketUrl: "https://tickets.example.com/tech-summit",
    isFree: false,
    price: 299,
  },
  {
    id: "event_product_launch",
    slug: "envirosense-v2-launch",
    title: "EnviroSense V2 Product Launch",
    description: "Be the first to experience the next generation of environmental monitoring. Live demos, Q&A with engineers, and exclusive early-bird pricing.",
    content: `
## Introducing EnviroSense V2

We're thrilled to unveil the next evolution in environmental monitoring technology. The EnviroSense V2 represents two years of engineering innovation and customer feedback.

### Event Highlights

- **Live Product Demo**: See the V2 in action with real-world scenarios
- **Meet the Engineers**: Ask questions directly to our R&D team
- **Hands-On Experience**: Test the new features yourself
- **Early Access**: Pre-order with exclusive launch pricing
- **Refreshments**: Complimentary food and beverages

### New Features Preview

- 40% more accurate sensors
- Thread and Matter support
- Local AI processing
- 3-year battery life
- Redesigned mobile app

### Limited Seating

This is an intimate launch event with limited capacity. RSVP early to secure your spot.
    `,
    featuredImage: IMAGES.events.productLaunch,
    date: futureDate(21).toISOString(),
    startDate: futureDate(21).toISOString(),
    endDate: futureDate(21).toISOString(),
    location: {
      name: "TechNova Headquarters",
      address: "500 Smart Way, Palo Alto, CA 94301",
      coordinates: { lat: 37.4419, lng: -122.1430 },
    },
    category: "Product Launch",
    ticketUrl: "https://tickets.example.com/v2-launch",
    isFree: true,
  },
  {
    id: "event_workshop",
    slug: "smart-home-diy-workshop",
    title: "Smart Home DIY Workshop",
    description: "Hands-on workshop for beginners. Learn to set up, configure, and automate your home with expert guidance. All materials provided.",
    content: `
## Learn Smart Home Basics

Perfect for beginners! This half-day workshop covers everything you need to start your smart home journey.

### What You'll Learn

1. **Fundamentals**: Understanding smart home ecosystems
2. **Setup Basics**: Installing and configuring devices
3. **Automation 101**: Creating your first automation routines
4. **Security Best Practices**: Keeping your smart home safe
5. **Troubleshooting**: Common issues and solutions

### Hands-On Practice

Each participant receives a starter kit to work with:
- Smart plug
- Motion sensor
- Smart bulb
- Hub controller

Keep your kit after the workshop!

### Who Should Attend

- Homeowners interested in smart technology
- Renters looking for portable solutions
- Anyone curious about home automation
- Gift-givers wanting to help family members

### Requirements

- No technical experience needed
- Bring a smartphone (iOS or Android)
- Laptop optional but helpful

Light refreshments provided. Parking validated.
    `,
    featuredImage: IMAGES.events.workshop,
    date: futureDate(14).toISOString(),
    startDate: futureDate(14).toISOString(),
    endDate: futureDate(14).toISOString(),
    location: {
      name: "TechNova Training Center",
      address: "100 Learning Lane, San Francisco, CA 94105",
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    category: "Workshop",
    ticketUrl: "https://tickets.example.com/diy-workshop",
    isFree: false,
    price: 49,
  },
]

const mockCityServices: CityService[] = [
  {
    id: "service_installation",
    slug: "professional-installation",
    title: "Professional Installation",
    description: "Expert installation services for all smart home devices. Certified technicians ensure optimal performance.",
    content: "Our certified technicians handle everything from simple device setup to complex whole-home installations. We guarantee professional results and provide training on how to use your new system.",
    icon: "wrench",
    category: "Installation",
    url: "/services/installation",
    contact: { phone: "1-800-INSTALL", email: "install@technova.com", hours: "Mon-Sat 8am-6pm" },
  },
  {
    id: "service_support",
    slug: "technical-support",
    title: "Technical Support",
    description: "24/7 technical support for all your smart home questions and troubleshooting needs.",
    content: "Our expert support team is available around the clock to help with setup, configuration, and troubleshooting. Access support via phone, chat, or email.",
    icon: "headset",
    category: "Support",
    url: "/help",
    contact: { phone: "1-800-SUPPORT", email: "support@technova.com", hours: "24/7" },
  },
]

const mockVenues: VenueProfile[] = [
  {
    id: "venue_showroom",
    slug: "technova-experience-center",
    name: "TechNova Experience Center",
    description: "Immerse yourself in the future of smart living. Our flagship showroom features fully functional smart home environments where you can see, touch, and experience our products in action.",
    type: "showroom",
    images: [
      IMAGES.venues.showroom,
      IMAGES.events.productLaunch,
    ],
    address: "500 Smart Way, Palo Alto, CA 94301",
    coordinates: { lat: 37.4419, lng: -122.1430 },
    phone: "+1 (650) 555-TECH",
    website: "https://experience.technova.com",
    hours: [
      { day: "Monday-Friday", open: "10:00", close: "19:00" },
      { day: "Saturday", open: "10:00", close: "18:00" },
      { day: "Sunday", open: "12:00", close: "17:00" },
    ],
    rating: 4.9,
    reviewCount: 847,
    priceRange: "$$",
    features: ["Free Parking", "Expert Staff", "Live Demos", "Private Consultations", "Kid-Friendly"],
  },
  {
    id: "venue_training",
    slug: "technova-training-center",
    name: "TechNova Training Center",
    description: "State-of-the-art training facility for installers, integrators, and enthusiasts. Hands-on labs with the latest equipment and certified instruction.",
    type: "training",
    images: [
      IMAGES.venues.trainingCenter,
      IMAGES.events.workshop,
    ],
    address: "100 Learning Lane, San Francisco, CA 94105",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    phone: "+1 (415) 555-LEARN",
    website: "https://training.technova.com",
    hours: [
      { day: "Monday-Friday", open: "09:00", close: "18:00" },
      { day: "Saturday", open: "09:00", close: "14:00" },
    ],
    rating: 4.8,
    reviewCount: 312,
    priceRange: "$$$",
    features: ["Hands-On Labs", "Certification Programs", "Corporate Training", "Online Options", "Catering Available"],
  },
]

const mockAnnouncements: Announcement[] = [
  {
    id: "ann_flash_sale",
    title: "Flash Sale: 30% Off All Sensors",
    message: "Limited time offer! Get 30% off our entire sensor lineup. Use code SENSOR30 at checkout.",
    type: "promo",
    linkText: "Shop Now",
    linkUrl: "/flash-sales",
    startDate: new Date().toISOString(),
    endDate: futureDate(3).toISOString(),
    active: true,
  },
  {
    id: "ann_new_product",
    title: "New: SecureDome 360 Pro Now Available",
    message: "Our most advanced security camera yet. 4K resolution, AI detection, and local storage.",
    type: "info",
    linkText: "Learn More",
    linkUrl: "/products/securedome-360",
    startDate: new Date().toISOString(),
    endDate: futureDate(14).toISOString(),
    active: true,
  },
]

const mockBanners: Banner[] = [
  {
    id: "banner_hero",
    name: "Smart Home Hero",
    type: "hero",
    image: IMAGES.blog.smartHomeTrends,
    mobileImage: IMAGES.blog.smartHomeTrends,
    title: "Welcome to the Future of Living",
    subtitle: "Discover smart home solutions that make life easier, safer, and more efficient",
    ctaText: "Shop Now",
    ctaUrl: "/store",
    active: true,
  },
  {
    id: "banner_flash",
    name: "Flash Sale Promo",
    type: "promo",
    image: IMAGES.flashSale,
    title: "Flash Sale",
    subtitle: "Up to 50% off select smart home devices",
    ctaText: "View Deals",
    ctaUrl: "/flash-sales",
    active: true,
  },
]

// API Functions
export const payloadcmsService = {
  // Pages
  async getPage(slug: string): Promise<Page | null> {
    await mockDelay(300)

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
            subtitle: "Smart home technology for modern living",
            image: IMAGES.blog.smartHomeTrends,
          },
        },
        {
          id: generateId(),
          type: "text",
          data: {
            content: "We're passionate about making smart home technology accessible to everyone. Our products are designed for simplicity, reliability, and seamless integration.",
          },
        },
      ],
      seo: {
        title: `${slug} | TechNova`,
        description: `Learn more about ${slug} at TechNova`,
        keywords: [slug, "smart home", "technology"],
        ogImage: IMAGES.blog.smartHomeTrends,
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
      return mockCityServices.filter((s) => s.category === category)
    }

    return mockCityServices
  },

  async getService(slug: string): Promise<CityService | null> {
    await mockDelay(200)
    return mockCityServices.find((s) => s.slug === slug) || null
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
          { id: "nav_2", label: "Services", url: "/services" },
          { id: "nav_3", label: "Blog", url: "/blog" },
          { id: "nav_4", label: "Events", url: "/events" },
          { id: "nav_5", label: "Help", url: "/help" },
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
              { id: "nav_f1b", label: "Sensors", url: "/store?category=sensors" },
              { id: "nav_f1c", label: "Security", url: "/store?category=security" },
              { id: "nav_f1d", label: "Lighting", url: "/store?category=lighting" },
            ],
          },
          {
            id: "nav_f2",
            label: "Support",
            url: "#",
            children: [
              { id: "nav_f2a", label: "Help Center", url: "/help" },
              { id: "nav_f2b", label: "Contact Us", url: "/contact" },
              { id: "nav_f2c", label: "Track Order", url: "/track" },
              { id: "nav_f2d", label: "Returns", url: "/returns" },
            ],
          },
          {
            id: "nav_f3",
            label: "Company",
            url: "#",
            children: [
              { id: "nav_f3a", label: "About Us", url: "/about" },
              { id: "nav_f3b", label: "Blog", url: "/blog" },
              { id: "nav_f3c", label: "Events", url: "/events" },
              { id: "nav_f3d", label: "Careers", url: "/careers" },
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
