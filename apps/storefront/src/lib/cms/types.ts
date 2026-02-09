/**
 * CMS Content Types
 * 
 * These types define all dynamic content that can be managed via CMS.
 * Each type includes all fields needed for multi-tenant, multi-vertical reuse.
 * 
 * IMPORTANT: All fields that might be undefined from CMS should be optional.
 * Components should handle undefined gracefully with fallbacks.
 */

// =============================================================================
// MEDIA
// =============================================================================

export interface MediaItem {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
}

// =============================================================================
// SITE SETTINGS
// =============================================================================

export interface SiteSettings {
  siteName: string
  tagline: string
  description: string
  logo?: MediaItem
  favicon?: MediaItem
  socialMedia: SocialMediaLinks
  contactInfo: ContactInfo
  defaultCurrency: string
  defaultLocale: string
  supportedLocales: string[]
  timezone: string
  analytics?: AnalyticsConfig
}

export interface SocialMediaLinks {
  twitter?: string
  facebook?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  tiktok?: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  businessHours: string
  supportEmail?: string
  salesEmail?: string
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string
  facebookPixelId?: string
  gtmId?: string
}

// =============================================================================
// NAVIGATION
// =============================================================================

export interface Navigation {
  mainMenu: NavSection[]
  footerMenu: FooterSection[]
  mobileMenu?: NavItem[]
  topBar?: TopBarConfig
}

export interface NavSection {
  id: string
  label: string
  items: NavItem[]
  featured?: FeaturedItem[]
  columns?: number
}

export interface NavItem {
  id: string
  label: string
  href: string
  description?: string
  icon?: string
  badge?: string
  children?: NavItem[]
  openInNewTab?: boolean
}

export interface FeaturedItem {
  id: string
  title: string
  description: string
  image?: MediaItem
  href: string
  badge?: string
}

export interface FooterSection {
  id: string
  title: string
  links: FooterLink[]
}

export interface FooterLink {
  id: string
  label: string
  href: string
  openInNewTab?: boolean
}

export interface TopBarConfig {
  enabled: boolean
  announcements: Announcement[]
  showSocialLinks: boolean
  showContactInfo: boolean
}

// =============================================================================
// ANNOUNCEMENTS
// =============================================================================

export interface Announcement {
  id: string
  message: string
  link?: string
  linkText?: string
  type: 'info' | 'warning' | 'success' | 'promo'
  dismissible: boolean
  startDate?: string
  endDate?: string
  priority: number
}

// =============================================================================
// HOME PAGE
// =============================================================================

export interface HomePage {
  hero: HeroSection
  sections: PageSection[]
}

export interface HeroSection {
  slides: HeroSlide[]
  autoplay: boolean
  autoplayInterval: number
}

export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description?: string
  image?: MediaItem
  video?: MediaItem
  primaryCTA?: CTAButton
  secondaryCTA?: CTAButton
  overlay?: boolean
  overlayOpacity?: number
  textPosition?: 'left' | 'center' | 'right'
  textColor?: 'light' | 'dark'
}

export interface CTAButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  icon?: string
}

// =============================================================================
// PAGE SECTIONS
// =============================================================================

export type PageSectionType =
  | 'banner'
  | 'content'
  | 'features'
  | 'testimonials'
  | 'stats'
  | 'faq'
  | 'cta'
  | 'trust-badges'
  | 'product-grid'
  | 'category-grid'
  | 'newsletter'
  | 'team'
  | 'timeline'
  | 'pricing'
  | 'gallery'

export type PageSection =
  | BannerSection
  | ContentSection
  | FeaturesSection
  | TestimonialsSection
  | StatsSection
  | FAQSection
  | CTASection
  | TrustBadgesSection
  | ProductGridSection
  | CategoryGridSection
  | NewsletterSection
  | TeamSection
  | TimelineSection
  | PricingSection
  | GallerySection

interface BaseSection {
  id: string
  title?: string
  subtitle?: string
  background?: 'default' | 'muted' | 'accent' | 'dark'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface BannerSection extends BaseSection {
  sectionType: 'banner'
  message: string
  link?: string
  linkText?: string
  dismissible?: boolean
  variant?: 'info' | 'warning' | 'success' | 'promo'
}

export interface ContentSection extends BaseSection {
  sectionType: 'content'
  content: string // HTML or markdown
  layout?: 'full' | 'left' | 'right' | 'center'
  image?: MediaItem
}

export interface FeaturesSection extends BaseSection {
  sectionType: 'features'
  features: Feature[]
  layout?: 'grid' | 'list' | 'cards'
  columns?: 2 | 3 | 4
}

export interface Feature {
  id: string
  title: string
  description: string
  icon?: string
  image?: MediaItem
  link?: string
}

export interface TestimonialsSection extends BaseSection {
  sectionType: 'testimonials'
  testimonials: Testimonial[]
  layout?: 'carousel' | 'grid' | 'masonry'
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: MediaItem
  rating?: number
}

export interface StatsSection extends BaseSection {
  sectionType: 'stats'
  stats: Stat[]
  layout?: 'inline' | 'grid'
}

export interface Stat {
  id: string
  value: string
  label: string
  icon?: string
  prefix?: string
  suffix?: string
}

export interface FAQSection extends BaseSection {
  sectionType: 'faq'
  categories: FAQCategory[]
  layout?: 'accordion' | 'tabs'
}

export interface FAQCategory {
  id: string
  title: string
  faqs: FAQ[]
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface CTASection extends BaseSection {
  sectionType: 'cta'
  heading: string
  description?: string
  primaryButton?: CTAButton
  secondaryButton?: CTAButton
  image?: MediaItem
  layout?: 'center' | 'left' | 'split'
}

export interface TrustBadgesSection extends BaseSection {
  sectionType: 'trust-badges'
  badges: TrustBadge[]
}

export interface TrustBadge {
  id: string
  title: string
  description?: string
  icon?: string
  image?: MediaItem
}

export interface ProductGridSection extends BaseSection {
  sectionType: 'product-grid'
  productIds?: string[]
  categoryHandle?: string
  collectionHandle?: string
  limit: number
  layout?: 'grid' | 'carousel'
}

export interface CategoryGridSection extends BaseSection {
  sectionType: 'category-grid'
  categoryHandles?: string[]
  layout?: 'grid' | 'carousel'
}

export interface NewsletterSection extends BaseSection {
  sectionType: 'newsletter'
  heading: string
  description?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
  privacyNote?: string
}

export interface TeamSection extends BaseSection {
  sectionType: 'team'
  members: TeamMember[]
  layout?: 'grid' | 'carousel'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: MediaItem
  socialLinks?: SocialMediaLinks
}

export interface TimelineSection extends BaseSection {
  sectionType: 'timeline'
  events: TimelineEvent[]
  layout?: 'vertical' | 'horizontal'
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  icon?: string
  image?: MediaItem
}

export interface PricingSection extends BaseSection {
  sectionType: 'pricing'
  plans: PricingPlan[]
  billingToggle?: boolean
}

export interface PricingPlan {
  id: string
  name: string
  description?: string
  monthlyPrice?: number
  yearlyPrice?: number
  currency: string
  features: string[]
  ctaText: string
  ctaHref: string
  highlighted?: boolean
}

export interface GallerySection extends BaseSection {
  sectionType: 'gallery'
  images: MediaItem[]
  layout?: 'grid' | 'masonry' | 'carousel'
  columns?: 2 | 3 | 4 | 5
}

// =============================================================================
// CMS PAGES
// =============================================================================

export interface CMSPage {
  id: string
  slug: string
  title: string
  description?: string
  sections: PageSection[]
  seo?: SEOConfig
  publishedAt?: string
  template?: 'default' | 'landing' | 'article' | 'contact' | 'faq'
}

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: MediaItem
  noIndex?: boolean
  noFollow?: boolean
  canonicalUrl?: string
}

// =============================================================================
// LOYALTY PROGRAM
// =============================================================================

export interface LoyaltyProgram {
  enabled: boolean
  name: string
  description: string
  tiers: LoyaltyTier[]
  rewards: LoyaltyReward[]
  pointsPerDollar: number
  welcomeBonus?: number
  referralBonus?: number
  termsAndConditions?: string
}

export interface LoyaltyTier {
  id: string
  name: string
  minPoints: number
  benefits: string[]
  multiplier: number
  icon?: string
  color?: string
}

export interface LoyaltyReward {
  id: string
  name: string
  description: string
  pointsCost: number
  image?: MediaItem
  available: boolean
}

// =============================================================================
// GIFT CARDS
// =============================================================================

export interface GiftCardConfig {
  defaultAmounts: number[]
  allowCustomAmount: boolean
  minCustomAmount: number
  maxCustomAmount: number
  designs: GiftCardDesign[]
  termsAndConditions?: string
}

export interface GiftCardDesign {
  id: string
  name: string
  image: MediaItem
  occasion?: string
}

// =============================================================================
// FORMS
// =============================================================================

export interface FormConfig {
  id: string
  title: string
  description?: string
  fields: FormField[]
  submitText: string
  successMessage: string
  errorMessage: string
  redirectUrl?: string
}

export interface FormField {
  id: string
  name: string
  label: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file'
  placeholder?: string
  required: boolean
  options?: { value: string; label: string }[]
  validation?: {
    pattern?: string
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }
}

// =============================================================================
// COOKIES & CONSENT
// =============================================================================

export interface CookieConsent {
  enabled: boolean
  message: string
  acceptButtonText: string
  declineButtonText?: string
  privacyPolicyLink: string
  cookiePolicyLink?: string
  categories?: CookieCategory[]
}

export interface CookieCategory {
  id: string
  name: string
  description: string
  required: boolean
  defaultEnabled: boolean
}

// =============================================================================
// CHAT WIDGET
// =============================================================================

export interface ChatWidget {
  enabled: boolean
  title: string
  subtitle: string
  welcomeMessage: string
  placeholder: string
  sendButtonText: string
  offlineMessage?: string
  avatarUrl?: string
  position: 'left' | 'right'
}

// =============================================================================
// LABELS & TRANSLATIONS
// =============================================================================

export interface Labels {
  // Navigation
  nav: {
    shop: string
    categories: string
    allProducts: string
    services: string
    programs: string
    explore: string
    support: string
    account: string
    cart: string
    search: string
    signIn: string
    signOut: string
    createAccount: string
  }
  // Common
  common: {
    loading: string
    error: string
    retry: string
    cancel: string
    save: string
    delete: string
    edit: string
    add: string
    remove: string
    close: string
    back: string
    next: string
    previous: string
    submit: string
    search: string
    filter: string
    sort: string
    clearAll: string
    viewAll: string
    learnMore: string
    readMore: string
    showMore: string
    showLess: string
  }
  // Product
  product: {
    addToCart: string
    addToWishlist: string
    removeFromWishlist: string
    outOfStock: string
    inStock: string
    lowStock: string
    freeShipping: string
    reviews: string
    specifications: string
    description: string
    relatedProducts: string
    recentlyViewed: string
  }
  // Cart
  cart: {
    title: string
    empty: string
    continueShopping: string
    checkout: string
    subtotal: string
    shipping: string
    tax: string
    total: string
    applyCoupon: string
    removeCoupon: string
    updateQuantity: string
  }
  // Account
  account: {
    myAccount: string
    orders: string
    addresses: string
    profile: string
    settings: string
    wishlist: string
    logout: string
  }
  // Footer
  footer: {
    copyright: string
    privacyPolicy: string
    termsOfService: string
    cookiePolicy: string
  }
}
