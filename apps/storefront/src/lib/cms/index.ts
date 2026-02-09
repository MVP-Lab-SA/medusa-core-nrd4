/**
 * CMS Module
 * 
 * Central export for all CMS functionality.
 * This is the main entry point for CMS data in the storefront.
 */

// Types
export type {
  // Media
  MediaItem,
  // Site Settings
  SiteSettings,
  SocialMediaLinks,
  ContactInfo,
  AnalyticsConfig,
  // Navigation
  Navigation,
  NavSection,
  NavItem,
  FeaturedItem,
  FooterSection,
  FooterLink,
  TopBarConfig,
  // Announcements
  Announcement,
  // Home Page
  HomePage,
  HeroSection,
  HeroSlide,
  CTAButton,
  // Page Sections
  PageSectionType,
  PageSection,
  BannerSection,
  ContentSection,
  FeaturesSection,
  Feature,
  TestimonialsSection,
  Testimonial,
  StatsSection,
  Stat,
  FAQSection,
  FAQCategory,
  FAQ,
  CTASection,
  TrustBadgesSection,
  TrustBadge,
  ProductGridSection,
  CategoryGridSection,
  NewsletterSection,
  TeamSection,
  TeamMember,
  TimelineSection,
  TimelineEvent,
  PricingSection,
  PricingPlan,
  GallerySection,
  // CMS Pages
  CMSPage,
  SEOConfig,
  // Loyalty Program
  LoyaltyProgram,
  LoyaltyTier,
  LoyaltyReward,
  // Gift Cards
  GiftCardConfig,
  GiftCardDesign,
  // Forms
  FormConfig,
  FormField,
  // Cookies & Consent
  CookieConsent,
  CookieCategory,
  // Chat Widget
  ChatWidget,
  // Labels
  Labels,
} from './types'

// Service Functions
export {
  getSiteSettings,
  getNavigation,
  getAnnouncements,
  getHomePage,
  getFAQPage,
  getLoyaltyProgram,
  getGiftCardConfig,
  getCMSPage,
  getLabels,
  invalidateCache,
} from './service'

// Defaults
export {
  defaultSiteSettings,
  defaultNavigation,
  defaultAnnouncements,
  defaultHomePage,
  defaultFAQSection,
  defaultLoyaltyProgram,
  defaultGiftCardConfig,
  defaultLabels,
} from './defaults'

// Hooks
export {
  useSiteSettings,
  useNavigation,
  useMainMenu,
  useFooterMenu,
  useAnnouncements,
  useHomePage,
  useHeroSection,
  useFAQs,
  useLoyaltyProgram,
  useGiftCardConfig,
  useCMSPage,
  useLabels,
} from './hooks'
