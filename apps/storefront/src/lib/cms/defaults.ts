/**
 * Default CMS Content
 * 
 * These defaults are used when CMS content is not available.
 * They provide a complete fallback for all dynamic content.
 * 
 * NOTE: These should be generic enough to work for any tenant/vertical.
 * Tenant-specific content should come from the CMS.
 */

import type {
  SiteSettings,
  Navigation,
  Announcement,
  HomePage,
  FAQSection,
  LoyaltyProgram,
  GiftCardConfig,
  Labels,
} from './types'

// =============================================================================
// SITE SETTINGS DEFAULTS
// =============================================================================

export const defaultSiteSettings: SiteSettings = {
  siteName: 'Store',
  tagline: 'Welcome to our store',
  description: 'Your one-stop shop for quality products and services.',
  socialMedia: {
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  },
  contactInfo: {
    email: 'contact@store.com',
    phone: '+1 (555) 000-0000',
    address: '123 Main Street',
    city: 'City',
    country: 'Country',
    postalCode: '00000',
    businessHours: 'Sunday - Thursday: 9AM - 6PM',
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
        { id: 'all-products', label: 'All Products', href: '/store' },
        { id: 'categories', label: 'Categories', href: '/categories' },
        { id: 'new-arrivals', label: 'New Arrivals', href: '/store?sort=newest' },
        { id: 'best-sellers', label: 'Best Sellers', href: '/store?sort=popular' },
      ],
    },
    {
      id: 'services',
      label: 'Services',
      items: [
        { id: 'all-services', label: 'All Services', href: '/services' },
        { id: 'providers', label: 'Service Providers', href: '/providers' },
      ],
    },
    {
      id: 'explore',
      label: 'Explore',
      items: [
        { id: 'about', label: 'About Us', href: '/about' },
        { id: 'blog', label: 'Blog', href: '/blog' },
        { id: 'contact', label: 'Contact', href: '/contact' },
      ],
    },
    {
      id: 'support',
      label: 'Support',
      items: [
        { id: 'help', label: 'Help Center', href: '/help' },
        { id: 'faq', label: 'FAQ', href: '/faq' },
        { id: 'track', label: 'Track Order', href: '/track' },
        { id: 'returns', label: 'Returns', href: '/returns' },
      ],
    },
  ],
  footerMenu: [
    {
      id: 'shop',
      title: 'Shop',
      links: [
        { id: 'all-products', label: 'All Products', href: '/store' },
        { id: 'categories', label: 'Categories', href: '/categories' },
        { id: 'new-arrivals', label: 'New Arrivals', href: '/store?sort=newest' },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      links: [
        { id: 'my-account', label: 'My Account', href: '/account' },
        { id: 'orders', label: 'Orders', href: '/account/orders' },
        { id: 'wishlist', label: 'Wishlist', href: '/wishlist' },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      links: [
        { id: 'help', label: 'Help Center', href: '/help' },
        { id: 'contact', label: 'Contact Us', href: '/contact' },
        { id: 'returns', label: 'Returns', href: '/returns' },
      ],
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { id: 'about', label: 'About Us', href: '/about' },
        { id: 'blog', label: 'Blog', href: '/blog' },
        { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
        { id: 'terms', label: 'Terms of Service', href: '/terms' },
      ],
    },
  ],
  mobileMenu: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'shop', label: 'Shop', href: '/store' },
    { id: 'cart', label: 'Cart', href: '/cart' },
    { id: 'account', label: 'Account', href: '/account' },
  ],
}

// =============================================================================
// ANNOUNCEMENT DEFAULTS
// =============================================================================

export const defaultAnnouncements: Announcement[] = [
  {
    id: 'welcome',
    message: 'Welcome to our store!',
    type: 'info',
    dismissible: true,
    priority: 1,
  },
]

// =============================================================================
// HOME PAGE DEFAULTS
// =============================================================================

export const defaultHomePage: HomePage = {
  hero: {
    slides: [
      {
        id: 'hero-1',
        title: 'Welcome to Our Store',
        subtitle: 'Discover amazing products',
        description: 'Shop our curated collection of quality products.',
        primaryCTA: { label: 'Shop Now', href: '/store' },
        secondaryCTA: { label: 'Learn More', href: '/about' },
        textPosition: 'center',
        textColor: 'light',
        overlay: true,
        overlayOpacity: 0.5,
      },
    ],
    autoplay: true,
    autoplayInterval: 5000,
  },
  sections: [
    {
      id: 'features',
      sectionType: 'features',
      title: 'Why Choose Us',
      subtitle: 'We are committed to providing the best experience',
      features: [
        {
          id: 'feature-1',
          title: 'Quality Products',
          description: 'Carefully curated selection of premium products.',
          icon: 'check-circle',
        },
        {
          id: 'feature-2',
          title: 'Fast Delivery',
          description: 'Quick and reliable shipping to your doorstep.',
          icon: 'truck',
        },
        {
          id: 'feature-3',
          title: 'Secure Payments',
          description: 'Safe and encrypted payment processing.',
          icon: 'shield-check',
        },
        {
          id: 'feature-4',
          title: '24/7 Support',
          description: 'Our team is always here to help you.',
          icon: 'headphones',
        },
      ],
      layout: 'grid',
      columns: 4,
    },
    {
      id: 'products',
      sectionType: 'product-grid',
      title: 'Featured Products',
      subtitle: 'Check out our most popular items',
      limit: 8,
      layout: 'grid',
    },
    {
      id: 'testimonials',
      sectionType: 'testimonials',
      title: 'What Our Customers Say',
      testimonials: [
        {
          id: 'testimonial-1',
          quote: 'Great products and excellent customer service!',
          author: 'Happy Customer',
          rating: 5,
        },
        {
          id: 'testimonial-2',
          quote: 'Fast shipping and quality items. Highly recommend!',
          author: 'Satisfied Buyer',
          rating: 5,
        },
        {
          id: 'testimonial-3',
          quote: 'Best online shopping experience I have had.',
          author: 'Loyal Customer',
          rating: 5,
        },
      ],
      layout: 'carousel',
    },
    {
      id: 'trust',
      sectionType: 'trust-badges',
      badges: [
        { id: 'badge-1', title: 'Secure Payments', icon: 'shield-check', description: 'Your data is protected' },
        { id: 'badge-2', title: 'Fast Shipping', icon: 'truck', description: 'Quick delivery' },
        { id: 'badge-3', title: 'Easy Returns', icon: 'refresh', description: '30-day return policy' },
        { id: 'badge-4', title: '24/7 Support', icon: 'headphones', description: 'Always here to help' },
      ],
    },
    {
      id: 'cta',
      sectionType: 'cta',
      heading: 'Ready to Get Started?',
      description: 'Join thousands of satisfied customers today.',
      primaryButton: { label: 'Browse Products', href: '/store' },
      secondaryButton: { label: 'Contact Us', href: '/contact' },
      layout: 'center',
    },
  ],
}

// =============================================================================
// FAQ DEFAULTS
// =============================================================================

export const defaultFAQSection: FAQSection = {
  id: 'faq',
  sectionType: 'faq',
  title: 'Frequently Asked Questions',
  subtitle: 'Find answers to common questions',
  categories: [
    {
      id: 'orders',
      title: 'Orders & Shipping',
      faqs: [
        {
          id: 'faq-1',
          question: 'How can I track my order?',
          answer: 'You can track your order by visiting the Track Order page and entering your order number.',
        },
        {
          id: 'faq-2',
          question: 'What shipping options are available?',
          answer: 'We offer standard and express shipping options. Delivery times vary by location.',
        },
        {
          id: 'faq-3',
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by destination.',
        },
      ],
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      faqs: [
        {
          id: 'faq-4',
          question: 'What is your return policy?',
          answer: 'We accept returns within 30 days of purchase. Items must be unused and in original packaging.',
        },
        {
          id: 'faq-5',
          question: 'How long does a refund take?',
          answer: 'Refunds are typically processed within 5-7 business days after we receive your return.',
        },
      ],
    },
    {
      id: 'products',
      title: 'Products',
      faqs: [
        {
          id: 'faq-6',
          question: 'Are your products authentic?',
          answer: 'Yes, all our products are 100% authentic and sourced directly from manufacturers.',
        },
        {
          id: 'faq-7',
          question: 'Do you offer product warranties?',
          answer: 'Many of our products come with manufacturer warranties. Check individual product pages for details.',
        },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      faqs: [
        {
          id: 'faq-8',
          question: 'How do I create an account?',
          answer: 'Click on "Sign In" and then "Create Account" to register. You can also checkout as a guest.',
        },
        {
          id: 'faq-9',
          question: 'I forgot my password. What should I do?',
          answer: 'Click on "Forgot Password" on the login page to reset your password via email.',
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
  enabled: true,
  name: 'Rewards Program',
  description: 'Earn points with every purchase and redeem them for exclusive rewards.',
  pointsPerDollar: 1,
  welcomeBonus: 100,
  referralBonus: 500,
  tiers: [
    {
      id: 'bronze',
      name: 'Bronze',
      minPoints: 0,
      benefits: ['1x points on purchases', 'Birthday reward', 'Member-only offers'],
      multiplier: 1,
      icon: 'medal',
      color: '#CD7F32',
    },
    {
      id: 'silver',
      name: 'Silver',
      minPoints: 1000,
      benefits: ['1.5x points on purchases', 'Free shipping', 'Early access to sales'],
      multiplier: 1.5,
      icon: 'medal',
      color: '#C0C0C0',
    },
    {
      id: 'gold',
      name: 'Gold',
      minPoints: 5000,
      benefits: ['2x points on purchases', 'Priority support', 'Exclusive products'],
      multiplier: 2,
      icon: 'medal',
      color: '#FFD700',
    },
    {
      id: 'platinum',
      name: 'Platinum',
      minPoints: 10000,
      benefits: ['3x points on purchases', 'Personal shopper', 'VIP events'],
      multiplier: 3,
      icon: 'crown',
      color: '#E5E4E2',
    },
  ],
  rewards: [
    {
      id: 'reward-1',
      name: '$5 Off',
      description: 'Get $5 off your next purchase',
      pointsCost: 500,
      available: true,
    },
    {
      id: 'reward-2',
      name: '$10 Off',
      description: 'Get $10 off your next purchase',
      pointsCost: 1000,
      available: true,
    },
    {
      id: 'reward-3',
      name: 'Free Shipping',
      description: 'Free shipping on your next order',
      pointsCost: 300,
      available: true,
    },
    {
      id: 'reward-4',
      name: '$25 Off',
      description: 'Get $25 off your next purchase',
      pointsCost: 2500,
      available: true,
    },
  ],
}

// =============================================================================
// GIFT CARD DEFAULTS
// =============================================================================

export const defaultGiftCardConfig: GiftCardConfig = {
  defaultAmounts: [25, 50, 75, 100, 150, 200],
  allowCustomAmount: true,
  minCustomAmount: 10,
  maxCustomAmount: 500,
  designs: [
    {
      id: 'default',
      name: 'Classic',
      image: { id: 'default', url: '', alt: 'Classic gift card design' },
    },
    {
      id: 'birthday',
      name: 'Birthday',
      image: { id: 'birthday', url: '', alt: 'Birthday gift card design' },
      occasion: 'birthday',
    },
    {
      id: 'holiday',
      name: 'Holiday',
      image: { id: 'holiday', url: '', alt: 'Holiday gift card design' },
      occasion: 'holiday',
    },
  ],
}

// =============================================================================
// LABELS DEFAULTS
// =============================================================================

export const defaultLabels: Labels = {
  nav: {
    shop: 'Shop',
    categories: 'Categories',
    allProducts: 'All Products',
    services: 'Services',
    programs: 'Programs',
    explore: 'Explore',
    support: 'Support',
    account: 'Account',
    cart: 'Cart',
    search: 'Search',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    createAccount: 'Create Account',
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    clearAll: 'Clear All',
    viewAll: 'View All',
    learnMore: 'Learn More',
    readMore: 'Read More',
    showMore: 'Show More',
    showLess: 'Show Less',
  },
  product: {
    addToCart: 'Add to Cart',
    addToWishlist: 'Add to Wishlist',
    removeFromWishlist: 'Remove from Wishlist',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    freeShipping: 'Free Shipping',
    reviews: 'Reviews',
    specifications: 'Specifications',
    description: 'Description',
    relatedProducts: 'Related Products',
    recentlyViewed: 'Recently Viewed',
  },
  cart: {
    title: 'Shopping Cart',
    empty: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    checkout: 'Checkout',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax',
    total: 'Total',
    applyCoupon: 'Apply Coupon',
    removeCoupon: 'Remove',
    updateQuantity: 'Update Quantity',
  },
  account: {
    myAccount: 'My Account',
    orders: 'Orders',
    addresses: 'Addresses',
    profile: 'Profile',
    settings: 'Settings',
    wishlist: 'Wishlist',
    logout: 'Log Out',
  },
  footer: {
    copyright: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
  },
}
