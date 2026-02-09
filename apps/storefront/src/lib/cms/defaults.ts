/**
 * Default Content
 * 
 * Fallback content when CMS is unavailable.
 * This ensures the site remains functional even if Payload CMS is down.
 * 
 * IMPORTANT: These defaults are designed to be generic and reusable.
 * Tenant-specific content should come from the CMS.
 */

import type {
  SiteSettings,
  Navigation,
  Announcement,
  HomePage,
  HeroSlide,
  FeaturesSection,
  TestimonialsSection,
  StatsSection,
  TrustBadgesSection,
  FAQSection,
  LoyaltyProgram,
  GiftCardConfig,
} from './types'

// =============================================================================
// SITE SETTINGS DEFAULTS
// =============================================================================

export const defaultSiteSettings: SiteSettings = {
  siteName: 'CityOS Store',
  tagline: 'Smart City Solutions',
  description: 'Your destination for smart city infrastructure and IoT solutions.',
  socialMedia: {
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  },
  contactInfo: {
    email: 'contact@example.com',
    phone: '+1 (555) 000-0000',
    address: '123 Main Street',
    city: 'City',
    country: 'Country',
    postalCode: '00000',
    businessHours: 'Mon-Fri: 9AM - 6PM',
  },
  defaultCurrency: 'USD',
  defaultLocale: 'en',
  supportedLocales: ['en', 'ar'],
  timezone: 'UTC',
}

// =============================================================================
// NAVIGATION DEFAULTS
// =============================================================================

export const defaultNavigation: Navigation = {
  mainMenu: [
    {
      id: 'shop',
      label: 'Shop',
      items: [
        { id: 'all-products', label: 'All Products', href: '/products' },
        { id: 'categories', label: 'Categories', href: '/categories' },
        { id: 'new-arrivals', label: 'New Arrivals', href: '/products?sort=newest' },
        { id: 'best-sellers', label: 'Best Sellers', href: '/products?sort=bestselling' },
        { id: 'sale', label: 'Sale', href: '/products?sale=true', badge: 'Sale' },
      ],
    },
    {
      id: 'services',
      label: 'Services',
      items: [
        { id: 'installation', label: 'Installation', href: '/services/installation' },
        { id: 'support', label: 'Support', href: '/services/support' },
        { id: 'consulting', label: 'Consulting', href: '/services/consulting' },
      ],
    },
    {
      id: 'about',
      label: 'About',
      items: [
        { id: 'about-us', label: 'About Us', href: '/about' },
        { id: 'contact', label: 'Contact', href: '/contact' },
        { id: 'faq', label: 'FAQ', href: '/faq' },
      ],
    },
  ],
  footerMenu: [
    {
      id: 'shop',
      title: 'Shop',
      links: [
        { id: 'all-products', label: 'All Products', href: '/products' },
        { id: 'categories', label: 'Categories', href: '/categories' },
        { id: 'new-arrivals', label: 'New Arrivals', href: '/products?sort=newest' },
        { id: 'sale', label: 'Sale', href: '/products?sale=true' },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      links: [
        { id: 'sign-in', label: 'Sign In', href: '/account/login' },
        { id: 'my-account', label: 'My Account', href: '/account' },
        { id: 'orders', label: 'Order History', href: '/account/orders' },
        { id: 'wishlist', label: 'Wishlist', href: '/wishlist' },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      links: [
        { id: 'help', label: 'Help Center', href: '/help' },
        { id: 'contact', label: 'Contact Us', href: '/contact' },
        { id: 'shipping', label: 'Shipping Info', href: '/shipping' },
        { id: 'returns', label: 'Returns', href: '/returns' },
      ],
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { id: 'about', label: 'About Us', href: '/about' },
        { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
        { id: 'terms', label: 'Terms of Service', href: '/terms' },
      ],
    },
  ],
  topBar: {
    enabled: true,
    announcements: [],
    showSocialLinks: false,
    showContactInfo: true,
  },
}

// =============================================================================
// ANNOUNCEMENTS DEFAULTS
// =============================================================================

export const defaultAnnouncements: Announcement[] = [
  {
    id: 'welcome',
    message: 'Welcome! Free shipping on orders over $100',
    type: 'promo',
    dismissible: true,
    priority: 1,
  },
]

// =============================================================================
// HOME PAGE DEFAULTS
// =============================================================================

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'Welcome to Our Store',
    subtitle: 'Discover our products',
    description: 'Quality products for modern living.',
    textPosition: 'center',
    overlay: 'dark',
    primaryCTA: {
      label: 'Shop Now',
      href: '/products',
      variant: 'primary',
    },
    secondaryCTA: {
      label: 'Learn More',
      href: '/about',
      variant: 'outline',
    },
  },
]

export const defaultFeaturesSection: FeaturesSection = {
  id: 'features',
  sectionType: 'features',
  title: 'Why Choose Us',
  subtitle: 'What makes us different',
  features: [
    {
      id: 'feature-1',
      title: 'Quality Products',
      description: 'We source only the best quality products for our customers.',
      icon: 'shield-check',
    },
    {
      id: 'feature-2',
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep.',
      icon: 'truck',
    },
    {
      id: 'feature-3',
      title: 'Expert Support',
      description: '24/7 customer support to help you with any questions.',
      icon: 'headphones',
    },
  ],
  layout: 'grid',
  columns: 3,
}

export const defaultTestimonialsSection: TestimonialsSection = {
  id: 'testimonials',
  sectionType: 'testimonials',
  title: 'What Our Customers Say',
  testimonials: [
    {
      id: 'testimonial-1',
      quote: 'Excellent products and outstanding customer service. Highly recommended!',
      author: 'Customer Name',
      role: 'Verified Buyer',
      rating: 5,
    },
    {
      id: 'testimonial-2',
      quote: 'Fast shipping and great quality. Will definitely order again.',
      author: 'Customer Name',
      role: 'Verified Buyer',
      rating: 5,
    },
    {
      id: 'testimonial-3',
      quote: 'The best shopping experience I have had. Professional and reliable.',
      author: 'Customer Name',
      role: 'Verified Buyer',
      rating: 5,
    },
  ],
  layout: 'carousel',
}

export const defaultStatsSection: StatsSection = {
  id: 'stats',
  sectionType: 'stats',
  stats: [
    { id: 'stat-1', value: '10K+', label: 'Happy Customers' },
    { id: 'stat-2', value: '5K+', label: 'Products Sold' },
    { id: 'stat-3', value: '99%', label: 'Satisfaction Rate' },
    { id: 'stat-4', value: '24/7', label: 'Customer Support' },
  ],
  layout: 'inline',
}

export const defaultTrustBadgesSection: TrustBadgesSection = {
  id: 'trust-badges',
  sectionType: 'trust-badges',
  badges: [
    { id: 'badge-1', title: 'Secure Payments', icon: 'shield-check' },
    { id: 'badge-2', title: 'Fast Shipping', icon: 'truck' },
    { id: 'badge-3', title: 'Easy Returns', icon: 'refresh' },
    { id: 'badge-4', title: '24/7 Support', icon: 'headphones' },
  ],
}

export const defaultHomePage: HomePage = {
  hero: {
    slides: defaultHeroSlides,
    autoplay: true,
    autoplayInterval: 5000,
  },
  sections: [
    defaultStatsSection,
    defaultFeaturesSection,
    defaultTestimonialsSection,
    defaultTrustBadgesSection,
  ],
}

// =============================================================================
// FAQ DEFAULTS
// =============================================================================

export const defaultFAQSection: FAQSection = {
  id: 'faq',
  sectionType: 'faq',
  title: 'Frequently Asked Questions',
  categories: [
    {
      id: 'general',
      title: 'General',
      faqs: [
        {
          id: 'faq-1',
          question: 'How do I place an order?',
          answer: 'Browse our products, add items to your cart, and proceed to checkout.',
        },
        {
          id: 'faq-2',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, and digital payment methods.',
        },
      ],
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      faqs: [
        {
          id: 'faq-3',
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days. Express options are available.',
        },
        {
          id: 'faq-4',
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to many countries worldwide. Shipping costs vary by location.',
        },
      ],
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      faqs: [
        {
          id: 'faq-5',
          question: 'What is your return policy?',
          answer: 'We offer 30-day returns for unused items in original packaging.',
        },
        {
          id: 'faq-6',
          question: 'How do I request a refund?',
          answer: 'Contact our support team with your order number to initiate a refund.',
        },
      ],
    },
  ],
  layout: 'accordion',
}

// =============================================================================
// LOYALTY PROGRAM DEFAULTS
// =============================================================================

export const defaultLoyaltyProgram: LoyaltyProgram = {
  name: 'Rewards Program',
  description: 'Earn points on every purchase and unlock exclusive benefits.',
  tiers: [
    {
      id: 'bronze',
      name: 'Bronze',
      minPoints: 0,
      multiplier: 1,
      benefits: ['Earn 1 point per $1 spent', 'Member-only offers'],
    },
    {
      id: 'silver',
      name: 'Silver',
      minPoints: 500,
      multiplier: 1.5,
      benefits: ['Earn 1.5 points per $1 spent', 'Free shipping on orders over $50', 'Early access to sales'],
    },
    {
      id: 'gold',
      name: 'Gold',
      minPoints: 2000,
      multiplier: 2,
      benefits: ['Earn 2 points per $1 spent', 'Free shipping on all orders', 'Exclusive member events'],
    },
    {
      id: 'platinum',
      name: 'Platinum',
      minPoints: 5000,
      multiplier: 3,
      benefits: ['Earn 3 points per $1 spent', 'Priority support', 'Birthday rewards'],
    },
  ],
  rewards: [
    { id: 'reward-1', name: '$5 Off', description: 'Redeem for $5 discount', pointsCost: 500 },
    { id: 'reward-2', name: '$10 Off', description: 'Redeem for $10 discount', pointsCost: 1000 },
    { id: 'reward-3', name: '$25 Off', description: 'Redeem for $25 discount', pointsCost: 2500 },
    { id: 'reward-4', name: 'Free Shipping', description: 'Free shipping on next order', pointsCost: 300 },
  ],
  howItWorks: [
    { id: 'step-1', title: 'Shop', description: 'Make purchases to earn points', icon: 'shopping-bag' },
    { id: 'step-2', title: 'Earn', description: 'Accumulate points with every order', icon: 'star' },
    { id: 'step-3', title: 'Redeem', description: 'Use points for rewards and discounts', icon: 'gift' },
  ],
}

// =============================================================================
// GIFT CARD DEFAULTS
// =============================================================================

export const defaultGiftCardConfig: GiftCardConfig = {
  amounts: [25, 50, 75, 100, 150, 200],
  customAmountEnabled: true,
  minCustomAmount: 10,
  maxCustomAmount: 500,
  currency: 'USD',
  faqs: [
    {
      id: 'gc-faq-1',
      question: 'Do gift cards expire?',
      answer: 'No, our gift cards never expire.',
    },
    {
      id: 'gc-faq-2',
      question: 'Can I use multiple gift cards?',
      answer: 'Yes, you can combine multiple gift cards on a single order.',
    },
    {
      id: 'gc-faq-3',
      question: 'Can gift cards be refunded?',
      answer: 'Gift cards are non-refundable once purchased.',
    },
  ],
}
