/**
 * CMS Content Types
 * 
 * These types define all dynamic content that can be managed via CMS.
 * Each type includes all fields needed for multi-tenant, multi-vertical reuse.
 */

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
  overlay?: 'none' | 'light' | 'dark' | 'gradient'
  textPosition?: 'left' | 'center' | 'right'
}

export interface CTAButton {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  openInNewTab?: boolean
}

// =============================================================================
// PAGE SECTIONS
// =============================================================================

export type PageSection =
  | FeaturesSection
  | TestimonialsSection
  | StatsSection
  | FAQSection
  | CTASection
  | TrustBadgesSection
  | ProductGridSection
  | CategoryGridSection
  | NewsletterSection
  | BannerSection
  | ContentSection
  | TeamSection
  | TimelineSection
  | PricingSection
  | GallerySection

export interface BaseSectionProps {
  id: string
  sectionType: string
  title?: string
  subtitle?: string
  description?: string
  background?: 'default' | 'muted' | 'accent' | 'dark'
  padding?: 'none' | 'small' | 'medium' | 'large'
}

export interface FeaturesSection extends BaseSectionProps {
  sectionType: 'features'
  features: Feature[]
  layout: 'grid' | 'list' | 'cards' | 'icons'
  columns: 2 | 3 | 4
}

export interface Feature {
  id: string
  title: string
  description: string
  icon?: string
  image?: MediaItem
  link?: string
}

export interface TestimonialsSection extends BaseSectionProps {
  sectionType: 'testimonials'
  testimonials: Testimonial[]
  layout: 'carousel' | 'grid' | 'stack'
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

export interface StatsSection extends BaseSectionProps {
  sectionType: 'stats'
  stats: Stat[]
  layout: 'inline' | 'grid'
}

export interface Stat {
  id: string
  value: string
  label: string
  prefix?: string
  suffix?: string
  icon?: string
}

export interface FAQSection extends BaseSectionProps {
  sectionType: 'faq'
  categories: FAQCategory[]
  layout: 'accordion' | 'tabs' | 'list'
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

export interface CTASection extends BaseSectionProps {
  sectionType: 'cta'
  heading: string
  text: string
  primaryButton: CTAButton
  secondaryButton?: CTAButton
  image?: MediaItem
  layout: 'centered' | 'split'
}

export interface TrustBadgesSection extends BaseSectionProps {
  sectionType: 'trust-badges'
  badges: TrustBadge[]
}

export interface TrustBadge {
  id: string
  title: string
  description?: string
  icon: string
}

export interface ProductGridSection extends BaseSectionProps {
  sectionType: 'product-grid'
  source: 'featured' | 'bestsellers' | 'new' | 'sale' | 'collection' | 'category'
  sourceId?: string
  limit: number
  showViewAll: boolean
  viewAllLink?: string
}

export interface CategoryGridSection extends BaseSectionProps {
  sectionType: 'category-grid'
  categories: CategoryItem[]
  layout: 'grid' | 'carousel'
}

export interface CategoryItem {
  id: string
  name: string
  image?: MediaItem
  href: string
  productCount?: number
}

export interface NewsletterSection extends BaseSectionProps {
  sectionType: 'newsletter'
  heading: string
  text: string
  placeholder: string
  buttonText: string
  successMessage: string
  disclaimerText?: string
}

export interface BannerSection extends BaseSectionProps {
  sectionType: 'banner'
  content: string
  link?: string
  linkText?: string
  image?: MediaItem
  variant: 'info' | 'promo' | 'warning' | 'sale'
  countdown?: {
    endDate: string
    showDays: boolean
  }
}

export interface ContentSection extends BaseSectionProps {
  sectionType: 'content'
  content: string // Rich text / markdown
  layout: 'full' | 'narrow' | 'wide'
  media?: MediaItem[]
  mediaPosition?: 'left' | 'right' | 'top' | 'bottom'
}

export interface TeamSection extends BaseSectionProps {
  sectionType: 'team'
  members: TeamMember[]
  layout: 'grid' | 'list'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: MediaItem
  social?: SocialMediaLinks
}

export interface TimelineSection extends BaseSectionProps {
  sectionType: 'timeline'
  items: TimelineItem[]
}

export interface TimelineItem {
  id: string
  date: string
  title: string
  description: string
  image?: MediaItem
}

export interface PricingSection extends BaseSectionProps {
  sectionType: 'pricing'
  plans: PricingPlan[]
  billingToggle: boolean
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  currency: string
  features: string[]
  highlighted: boolean
  ctaText: string
  ctaLink: string
}

export interface GallerySection extends BaseSectionProps {
  sectionType: 'gallery'
  images: MediaItem[]
  layout: 'grid' | 'masonry' | 'carousel'
  columns: 2 | 3 | 4
}

// =============================================================================
// MEDIA
// =============================================================================

export interface MediaItem {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  mimeType?: string
  sizes?: MediaSizes
}

export interface MediaSizes {
  thumbnail?: string
  small?: string
  medium?: string
  large?: string
}

// =============================================================================
// PAGES
// =============================================================================

export interface CMSPage {
  id: string
  slug: string
  title: string
  description?: string
  template: 'default' | 'landing' | 'content' | 'contact' | 'faq'
  hero?: HeroSlide
  sections: PageSection[]
  seo?: SEOConfig
  publishedAt?: string
  status: 'draft' | 'published' | 'archived'
}

export interface SEOConfig {
  metaTitle?: string
  metaDescription?: string
  ogImage?: MediaItem
  noIndex?: boolean
  canonicalUrl?: string
}

// =============================================================================
// LOYALTY & PROGRAMS
// =============================================================================

export interface LoyaltyProgram {
  name: string
  description: string
  tiers: LoyaltyTier[]
  rewards: LoyaltyReward[]
  howItWorks: HowItWorksStep[]
}

export interface LoyaltyTier {
  id: string
  name: string
  minPoints: number
  multiplier: number
  benefits: string[]
  icon?: string
  color?: string
}

export interface LoyaltyReward {
  id: string
  name: string
  description: string
  pointsCost: number
  image?: MediaItem
}

export interface HowItWorksStep {
  id: string
  title: string
  description: string
  icon?: string
}

// =============================================================================
// GIFT CARDS
// =============================================================================

export interface GiftCardConfig {
  amounts: number[]
  customAmountEnabled: boolean
  minCustomAmount: number
  maxCustomAmount: number
  currency: string
  faqs: FAQ[]
}

// =============================================================================
// LEGAL PAGES
// =============================================================================

export interface LegalPage {
  id: string
  slug: string
  title: string
  lastUpdated: string
  content: string // Rich text
  sections: LegalSection[]
}

export interface LegalSection {
  id: string
  title: string
  content: string
}
