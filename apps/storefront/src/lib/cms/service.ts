/**
 * CMS Service
 * 
 * Fetches content from Payload CMS with automatic fallback to defaults.
 * This service is the single source of truth for all CMS content in the storefront.
 */

import { PayloadClient, createTenantClient } from '../payload/client'
import type {
  SiteSettings,
  Navigation,
  Announcement,
  HomePage,
  HeroSlide,
  Feature,
  Testimonial,
  Stat,
  TrustBadge,
  FAQ,
  FAQCategory,
  CMSPage,
  PageSection,
  LoyaltyProgram,
  GiftCardConfig,
  NavSection,
  FooterSection,
  NavItem,
  FeaturesSection,
  TestimonialsSection,
  StatsSection,
  TrustBadgesSection,
  CTASection,
  FAQSection,
  ProductGridSection,
  Labels,
} from './types'
import {
  defaultSiteSettings,
  defaultNavigation,
  defaultAnnouncements,
  defaultHomePage,
  defaultFAQSection,
  defaultLoyaltyProgram,
  defaultGiftCardConfig,
  defaultLabels,
} from './defaults'

// Cache for CMS data
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 60 * 1000 // 1 minute

function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T
  }
  return null
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() })
}

export function invalidateCache(pattern?: string): void {
  if (!pattern) {
    cache.clear()
    return
  }
  for (const key of Array.from(cache.keys())) {
    if (key.includes(pattern)) {
      cache.delete(key)
    }
  }
}

function getClient(tenantSlug?: string): PayloadClient {
  if (tenantSlug) {
    return createTenantClient(tenantSlug)
  }
  return new PayloadClient()
}

// =============================================================================
// SITE SETTINGS
// =============================================================================

export async function getSiteSettings(tenantSlug?: string): Promise<SiteSettings> {
  const cacheKey = `site-settings:${tenantSlug || 'default'}`
  const cached = getCached<SiteSettings>(cacheKey)
  if (cached) return cached

  try {
    const client = getClient(tenantSlug)
    const response = await client.getSiteSettings()
    if (response) {
      const settings = transformSiteSettings(response as Record<string, unknown>)
      setCache(cacheKey, settings)
      return settings
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch site settings, using defaults:', error)
  }

  return defaultSiteSettings
}

function transformSiteSettings(data: Record<string, unknown>): SiteSettings {
  return {
    siteName: (data.siteName as string) || defaultSiteSettings.siteName,
    tagline: (data.tagline as string) || defaultSiteSettings.tagline,
    description: (data.siteDescription as string) || (data.description as string) || defaultSiteSettings.description,
    logo: data.logo ? { 
      id: (data.logo as Record<string, unknown>).id as string, 
      url: (data.logo as Record<string, unknown>).url as string, 
      alt: ((data.logo as Record<string, unknown>).alt as string) || '' 
    } : undefined,
    favicon: data.favicon ? { 
      id: (data.favicon as Record<string, unknown>).id as string, 
      url: (data.favicon as Record<string, unknown>).url as string, 
      alt: '' 
    } : undefined,
    socialMedia: (data.socialLinks as SiteSettings['socialMedia']) || defaultSiteSettings.socialMedia,
    contactInfo: transformContactInfo(data.contactInfo as Record<string, unknown> | undefined),
    defaultCurrency: (data.defaultCurrency as string) || defaultSiteSettings.defaultCurrency,
    defaultLocale: (data.defaultLocale as string) || defaultSiteSettings.defaultLocale,
    supportedLocales: (data.supportedLocales as string[]) || defaultSiteSettings.supportedLocales,
    timezone: (data.timezone as string) || defaultSiteSettings.timezone,
    analytics: data.analytics as SiteSettings['analytics'],
  }
}

function transformContactInfo(data?: Record<string, unknown>): SiteSettings['contactInfo'] {
  if (!data) return defaultSiteSettings.contactInfo
  return {
    email: (data.email as string) || defaultSiteSettings.contactInfo.email,
    phone: (data.phone as string) || defaultSiteSettings.contactInfo.phone,
    address: (data.address as string) || defaultSiteSettings.contactInfo.address,
    city: (data.city as string) || defaultSiteSettings.contactInfo.city,
    country: (data.country as string) || defaultSiteSettings.contactInfo.country,
    postalCode: (data.postalCode as string) || defaultSiteSettings.contactInfo.postalCode,
    businessHours: (data.businessHours as string) || defaultSiteSettings.contactInfo.businessHours,
    supportEmail: data.supportEmail as string | undefined,
    salesEmail: data.salesEmail as string | undefined,
  }
}

// =============================================================================
// NAVIGATION
// =============================================================================

export async function getNavigation(tenantSlug?: string): Promise<Navigation> {
  const cacheKey = `navigation:${tenantSlug || 'default'}`
  const cached = getCached<Navigation>(cacheKey)
  if (cached) return cached

  try {
    const client = getClient(tenantSlug)
    const response = await client.getNavigation()
    if (response) {
      const nav = transformNavigation(response as Record<string, unknown>)
      setCache(cacheKey, nav)
      return nav
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch navigation, using defaults:', error)
  }

  return defaultNavigation
}

function transformNavigation(data: Record<string, unknown>): Navigation {
  const mainMenu = data.mainMenu as Array<Record<string, unknown>> | undefined
  const footerMenu = data.footerMenu as Array<Record<string, unknown>> | undefined
  const mobileMenu = data.mobileMenu as Array<Record<string, unknown>> | undefined

  return {
    mainMenu: mainMenu ? mainMenu.map(transformNavSection) : defaultNavigation.mainMenu,
    footerMenu: footerMenu ? footerMenu.map(transformFooterSection) : defaultNavigation.footerMenu,
    mobileMenu: mobileMenu ? mobileMenu.map(transformNavItem) : defaultNavigation.mobileMenu,
    topBar: data.topBar as Navigation['topBar'],
  }
}

function transformNavSection(data: Record<string, unknown>): NavSection {
  const items = data.items as Array<Record<string, unknown>> | undefined
  return {
    id: (data.id as string) || String(Math.random()),
    label: (data.label as string) || (data.title as string) || '',
    items: items ? items.map(transformNavItem) : [],
    featured: data.featured as NavSection['featured'],
    columns: data.columns as number | undefined,
  }
}

function transformNavItem(data: Record<string, unknown>): NavItem {
  const children = data.children as Array<Record<string, unknown>> | undefined
  return {
    id: (data.id as string) || String(Math.random()),
    label: (data.label as string) || (data.title as string) || '',
    href: (data.href as string) || (data.url as string) || (data.link as string) || '#',
    description: data.description as string | undefined,
    icon: data.icon as string | undefined,
    badge: data.badge as string | undefined,
    children: children ? children.map(transformNavItem) : undefined,
    openInNewTab: data.openInNewTab as boolean | undefined,
  }
}

function transformFooterSection(data: Record<string, unknown>): FooterSection {
  const links = data.links as Array<Record<string, unknown>> | undefined
  return {
    id: (data.id as string) || String(Math.random()),
    title: (data.title as string) || (data.label as string) || '',
    links: links ? links.map(link => ({
      id: (link.id as string) || String(Math.random()),
      label: (link.label as string) || (link.title as string) || '',
      href: (link.href as string) || (link.url as string) || '#',
      openInNewTab: link.openInNewTab as boolean | undefined,
    })) : [],
  }
}

// =============================================================================
// ANNOUNCEMENTS
// =============================================================================

export async function getAnnouncements(tenantSlug?: string): Promise<Announcement[]> {
  const cacheKey = `announcements:${tenantSlug || 'default'}`
  const cached = getCached<Announcement[]>(cacheKey)
  if (cached) return cached

  try {
    const client = getClient(tenantSlug)
    const response = await client.getAnnouncements()
    if (response && Array.isArray(response)) {
      const announcements = response.map(transformAnnouncement)
      setCache(cacheKey, announcements)
      return announcements
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch announcements, using defaults:', error)
  }

  return defaultAnnouncements
}

function transformAnnouncement(data: Record<string, unknown>): Announcement {
  return {
    id: (data.id as string) || String(Math.random()),
    message: (data.message as string) || (data.text as string) || '',
    link: data.link as string | undefined,
    linkText: data.linkText as string | undefined,
    type: (data.type as Announcement['type']) || 'info',
    dismissible: (data.dismissible as boolean) ?? true,
    startDate: data.startDate as string | undefined,
    endDate: data.endDate as string | undefined,
    priority: (data.priority as number) || 0,
  }
}

// =============================================================================
// HOME PAGE
// =============================================================================

export async function getHomePage(tenantSlug?: string): Promise<HomePage> {
  const cacheKey = `home-page:${tenantSlug || 'default'}`
  const cached = getCached<HomePage>(cacheKey)
  if (cached) return cached

  try {
    const client = getClient(tenantSlug)
    // Try to get home page from Payload CMS pages collection
    const response = await client.getPageBySlug('home')
    if (response) {
      const homePage = transformHomePage(response as unknown as Record<string, unknown>)
      setCache(cacheKey, homePage)
      return homePage
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch home page, using defaults:', error)
  }

  return defaultHomePage
}

function transformHomePage(data: Record<string, unknown>): HomePage {
  const hero = data.hero as Record<string, unknown> | undefined
  const sections = data.sections as Array<Record<string, unknown>> | undefined
  const layout = data.layout as Array<Record<string, unknown>> | undefined

  return {
    hero: hero ? transformHeroSection(hero) : defaultHomePage.hero,
    sections: sections ? sections.map(transformPageSection) : 
              layout ? layout.map(transformPageSection) : 
              defaultHomePage.sections,
  }
}

function transformHeroSection(data: Record<string, unknown>): HomePage['hero'] {
  const slides = data.slides as Array<Record<string, unknown>> | undefined
  return {
    slides: slides ? slides.map(transformHeroSlide) : defaultHomePage.hero.slides,
    autoplay: (data.autoplay as boolean) ?? true,
    autoplayInterval: (data.autoplayInterval as number) || 5000,
  }
}

function transformHeroSlide(data: Record<string, unknown>): HeroSlide {
  return {
    id: (data.id as string) || String(Math.random()),
    title: (data.title as string) || '',
    subtitle: (data.subtitle as string) || '',
    description: data.description as string | undefined,
    image: data.image ? {
      id: (data.image as Record<string, unknown>).id as string || '',
      url: (data.image as Record<string, unknown>).url as string || '',
      alt: ((data.image as Record<string, unknown>).alt as string) || '',
    } : undefined,
    video: data.video ? {
      id: (data.video as Record<string, unknown>).id as string || '',
      url: (data.video as Record<string, unknown>).url as string || '',
      alt: '',
    } : undefined,
    primaryCTA: data.primaryCTA as HeroSlide['primaryCTA'],
    secondaryCTA: data.secondaryCTA as HeroSlide['secondaryCTA'],
    overlay: data.overlay as boolean | undefined,
    overlayOpacity: data.overlayOpacity as number | undefined,
    textPosition: data.textPosition as HeroSlide['textPosition'],
    textColor: data.textColor as HeroSlide['textColor'],
  }
}

function transformPageSection(data: Record<string, unknown>): PageSection {
  const sectionType = (data.sectionType as string) || (data.blockType as string) || (data.type as string) || 'content'
  
  const baseSection = {
    id: (data.id as string) || String(Math.random()),
    title: data.title as string | undefined,
    subtitle: data.subtitle as string | undefined,
    background: data.background as PageSection['background'],
    spacing: data.spacing as PageSection['spacing'],
  }

  switch (sectionType) {
    case 'features':
      return transformFeaturesSection(data, baseSection)
    case 'testimonials':
      return transformTestimonialsSection(data, baseSection)
    case 'stats':
      return transformStatsSection(data, baseSection)
    case 'trust-badges':
    case 'trust':
      return transformTrustBadgesSection(data, baseSection)
    case 'cta':
      return transformCTASection(data, baseSection)
    case 'faq':
      return transformFAQPageSection(data, baseSection)
    case 'product-grid':
    case 'products':
      return transformProductGridSection(data, baseSection)
    default:
      return {
        ...baseSection,
        sectionType: 'content',
        content: (data.content as string) || '',
        layout: data.layout as 'full' | 'left' | 'right' | 'center' | undefined,
      }
  }
}

function transformFeaturesSection(data: Record<string, unknown>, base: Record<string, unknown>): FeaturesSection {
  const features = data.features as Array<Record<string, unknown>> | undefined
  return {
    ...base,
    sectionType: 'features',
    features: features ? features.map((f): Feature => ({
      id: (f.id as string) || String(Math.random()),
      title: (f.title as string) || '',
      description: (f.description as string) || '',
      icon: f.icon as string | undefined,
      image: f.image ? {
        id: (f.image as Record<string, unknown>).id as string || '',
        url: (f.image as Record<string, unknown>).url as string || '',
        alt: ((f.image as Record<string, unknown>).alt as string) || '',
      } : undefined,
      link: f.link as string | undefined,
    })) : [],
    layout: data.layout as FeaturesSection['layout'],
    columns: data.columns as FeaturesSection['columns'],
  } as FeaturesSection
}

function transformTestimonialsSection(data: Record<string, unknown>, base: Record<string, unknown>): TestimonialsSection {
  const testimonials = data.testimonials as Array<Record<string, unknown>> | undefined
  return {
    ...base,
    sectionType: 'testimonials',
    testimonials: testimonials ? testimonials.map((t): Testimonial => ({
      id: (t.id as string) || String(Math.random()),
      quote: (t.quote as string) || (t.text as string) || '',
      author: (t.author as string) || (t.name as string) || '',
      role: t.role as string | undefined,
      company: t.company as string | undefined,
      avatar: t.avatar ? {
        id: (t.avatar as Record<string, unknown>).id as string || '',
        url: (t.avatar as Record<string, unknown>).url as string || '',
        alt: ((t.avatar as Record<string, unknown>).alt as string) || '',
      } : undefined,
      rating: t.rating as number | undefined,
    })) : [],
    layout: (data.layout as TestimonialsSection['layout']) || 'carousel',
  } as TestimonialsSection
}

function transformStatsSection(data: Record<string, unknown>, base: Record<string, unknown>): StatsSection {
  const stats = data.stats as Array<Record<string, unknown>> | undefined
  return {
    ...base,
    sectionType: 'stats',
    stats: stats ? stats.map((s): Stat => ({
      id: (s.id as string) || String(Math.random()),
      value: (s.value as string) || '',
      label: (s.label as string) || '',
      icon: s.icon as string | undefined,
      prefix: s.prefix as string | undefined,
      suffix: s.suffix as string | undefined,
    })) : [],
    layout: (data.layout as StatsSection['layout']) || 'inline',
  } as StatsSection
}

function transformTrustBadgesSection(data: Record<string, unknown>, base: Record<string, unknown>): TrustBadgesSection {
  const badges = (data.badges as Array<Record<string, unknown>>) || (data.items as Array<Record<string, unknown>>) || []
  return {
    ...base,
    sectionType: 'trust-badges',
    badges: badges.map((b): TrustBadge => ({
      id: (b.id as string) || String(Math.random()),
      title: (b.title as string) || (b.label as string) || '',
      description: b.description as string | undefined,
      icon: b.icon as string | undefined,
      image: b.image ? {
        id: (b.image as Record<string, unknown>).id as string || '',
        url: (b.image as Record<string, unknown>).url as string || '',
        alt: ((b.image as Record<string, unknown>).alt as string) || '',
      } : undefined,
    })),
  } as TrustBadgesSection
}

function transformCTASection(data: Record<string, unknown>, base: Record<string, unknown>): CTASection {
  return {
    ...base,
    sectionType: 'cta',
    heading: (data.heading as string) || (data.title as string) || '',
    description: data.description as string | undefined,
    primaryButton: data.primaryCTA as CTASection['primaryButton'] || data.primaryButton as CTASection['primaryButton'],
    secondaryButton: data.secondaryCTA as CTASection['secondaryButton'] || data.secondaryButton as CTASection['secondaryButton'],
    image: data.image ? {
      id: (data.image as Record<string, unknown>).id as string || '',
      url: (data.image as Record<string, unknown>).url as string || '',
      alt: ((data.image as Record<string, unknown>).alt as string) || '',
    } : undefined,
    layout: data.layout as CTASection['layout'],
  } as CTASection
}

function transformFAQPageSection(data: Record<string, unknown>, base: Record<string, unknown>): FAQSection {
  const faqs = data.faqs as Array<Record<string, unknown>> | undefined
  const categories = data.categories as Array<Record<string, unknown>> | undefined
  
  if (categories) {
    return {
      ...base,
      sectionType: 'faq',
      categories: categories.map((cat): FAQCategory => ({
        id: (cat.id as string) || String(Math.random()),
        title: (cat.title as string) || (cat.name as string) || '',
        faqs: ((cat.faqs as Array<Record<string, unknown>>) || []).map((f): FAQ => ({
          id: (f.id as string) || String(Math.random()),
          question: (f.question as string) || '',
          answer: (f.answer as string) || '',
        })),
      })),
      layout: data.layout as FAQSection['layout'],
    } as FAQSection
  }
  
  // If no categories, wrap all FAQs in a single category
  return {
    ...base,
    sectionType: 'faq',
    categories: [{
      id: 'default',
      title: 'General',
      faqs: faqs ? faqs.map((f): FAQ => ({
        id: (f.id as string) || String(Math.random()),
        question: (f.question as string) || '',
        answer: (f.answer as string) || '',
      })) : [],
    }],
    layout: data.layout as FAQSection['layout'],
  } as FAQSection
}

function transformProductGridSection(data: Record<string, unknown>, base: Record<string, unknown>): ProductGridSection {
  return {
    ...base,
    sectionType: 'product-grid',
    productIds: data.productIds as string[] | undefined,
    categoryHandle: data.categoryHandle as string | undefined,
    collectionHandle: data.collectionHandle as string | undefined,
    limit: (data.limit as number) || 8,
    layout: data.layout as ProductGridSection['layout'],
  } as ProductGridSection
}

// =============================================================================
// FAQ PAGE
// =============================================================================

export async function getFAQPage(tenantSlug?: string): Promise<FAQCategory[]> {
  const cacheKey = `faq-page:${tenantSlug || 'default'}`
  const cached = getCached<FAQCategory[]>(cacheKey)
  if (cached) return cached

  try {
    const client = getClient(tenantSlug)
    const response = await client.getPageBySlug('faq')
    if (response) {
      const data = response as unknown as Record<string, unknown>
      const categories = data.categories as Array<Record<string, unknown>> | undefined
      if (categories) {
        const faqCategories = categories.map((cat): FAQCategory => ({
          id: (cat.id as string) || String(Math.random()),
          title: (cat.title as string) || (cat.name as string) || '',
          faqs: ((cat.faqs as Array<Record<string, unknown>>) || []).map((f): FAQ => ({
            id: (f.id as string) || String(Math.random()),
            question: (f.question as string) || '',
            answer: (f.answer as string) || '',
          })),
        }))
        setCache(cacheKey, faqCategories)
        return faqCategories
      }
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch FAQ page, using defaults:', error)
  }

  return defaultFAQSection.categories
}

// =============================================================================
// LOYALTY PROGRAM
// =============================================================================

export async function getLoyaltyProgram(tenantSlug?: string): Promise<LoyaltyProgram> {
  const cacheKey = `loyalty-program:${tenantSlug || 'default'}`
  const cached = getCached<LoyaltyProgram>(cacheKey)
  if (cached) return cached

  try {
    const client = getClient(tenantSlug)
    const response = await client.getPageBySlug('loyalty')
    if (response) {
      const data = response as unknown as Record<string, unknown>
      const program: LoyaltyProgram = {
        enabled: (data.enabled as boolean) ?? true,
        name: (data.name as string) || defaultLoyaltyProgram.name,
        description: (data.description as string) || defaultLoyaltyProgram.description,
        tiers: (data.tiers as LoyaltyProgram['tiers']) || defaultLoyaltyProgram.tiers,
        rewards: (data.rewards as LoyaltyProgram['rewards']) || defaultLoyaltyProgram.rewards,
        pointsPerDollar: (data.pointsPerDollar as number) || defaultLoyaltyProgram.pointsPerDollar,
        welcomeBonus: data.welcomeBonus as number | undefined,
        referralBonus: data.referralBonus as number | undefined,
        termsAndConditions: data.termsAndConditions as string | undefined,
      }
      setCache(cacheKey, program)
      return program
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch loyalty program, using defaults:', error)
  }

  return defaultLoyaltyProgram
}

// =============================================================================
// GIFT CARDS
// =============================================================================

export async function getGiftCardConfig(tenantSlug?: string): Promise<GiftCardConfig> {
  const cacheKey = `gift-cards:${tenantSlug || 'default'}`
  const cached = getCached<GiftCardConfig>(cacheKey)
  if (cached) return cached

  try {
    const client = getClient(tenantSlug)
    const response = await client.getPageBySlug('gift-cards')
    if (response) {
      const data = response as unknown as Record<string, unknown>
      const config: GiftCardConfig = {
        defaultAmounts: (data.denominations as number[]) || (data.defaultAmounts as number[]) || defaultGiftCardConfig.defaultAmounts,
        allowCustomAmount: (data.allowCustomAmount as boolean) ?? defaultGiftCardConfig.allowCustomAmount,
        minCustomAmount: (data.minAmount as number) || (data.minCustomAmount as number) || defaultGiftCardConfig.minCustomAmount,
        maxCustomAmount: (data.maxAmount as number) || (data.maxCustomAmount as number) || defaultGiftCardConfig.maxCustomAmount,
        designs: (data.designs as GiftCardConfig['designs']) || defaultGiftCardConfig.designs,
        termsAndConditions: data.termsAndConditions as string | undefined,
      }
      setCache(cacheKey, config)
      return config
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch gift card config, using defaults:', error)
  }

  return defaultGiftCardConfig
}

// =============================================================================
// GENERIC CMS PAGE
// =============================================================================

export async function getCMSPage(slug: string, tenantSlug?: string): Promise<CMSPage | null> {
  const cacheKey = `page:${slug}:${tenantSlug || 'default'}`
  const cached = getCached<CMSPage | null>(cacheKey)
  if (cached !== null) return cached

  try {
    const client = getClient(tenantSlug)
    const response = await client.getPageBySlug(slug)
    if (response) {
      const data = response as unknown as Record<string, unknown>
      const page: CMSPage = {
        id: (data.id as string) || '',
        slug: (data.slug as string) || slug,
        title: (data.title as string) || '',
        description: data.description as string | undefined,
        sections: ((data.layout as Array<Record<string, unknown>>) || (data.sections as Array<Record<string, unknown>>) || []).map(transformPageSection),
        seo: data.meta as CMSPage['seo'],
        publishedAt: data.publishedAt as string | undefined,
        template: data.template as CMSPage['template'],
      }
      setCache(cacheKey, page)
      return page
    }
  } catch (error) {
    console.warn(`[CMS] Failed to fetch page "${slug}":`, error)
  }

  setCache(cacheKey, null)
  return null
}

// =============================================================================
// LABELS (TRANSLATIONS)
// =============================================================================

export async function getLabels(tenantSlug?: string, locale?: string): Promise<Labels> {
  const cacheKey = `labels:${tenantSlug || 'default'}:${locale || 'en'}`
  const cached = getCached<Labels>(cacheKey)
  if (cached) return cached

  try {
    const client = getClient(tenantSlug)
    const response = await client.getLabels?.(locale)
    if (response) {
      // Merge with defaults to ensure all fields are present
      const labels: Labels = {
        nav: { ...defaultLabels.nav, ...(response.nav as Labels['nav'] || {}) },
        common: { ...defaultLabels.common, ...(response.common as Labels['common'] || {}) },
        product: { ...defaultLabels.product, ...(response.product as Labels['product'] || {}) },
        cart: { ...defaultLabels.cart, ...(response.cart as Labels['cart'] || {}) },
        account: { ...defaultLabels.account, ...(response.account as Labels['account'] || {}) },
        footer: { ...defaultLabels.footer, ...(response.footer as Labels['footer'] || {}) },
      }
      setCache(cacheKey, labels)
      return labels
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch labels, using defaults:', error)
  }

  return defaultLabels
}
