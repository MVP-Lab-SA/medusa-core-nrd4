/**
 * CMS Service
 * 
 * Fetches content from Payload CMS with automatic fallback to defaults.
 * This service is the single source of truth for all CMS content in the storefront.
 */

import { PayloadClient } from '../payload/client'

const payloadClient = new PayloadClient()
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
} from './types'
import {
  defaultSiteSettings,
  defaultNavigation,
  defaultAnnouncements,
  defaultHomePage,
  defaultFAQSection,
  defaultLoyaltyProgram,
  defaultGiftCardConfig,
} from './defaults'

// Cache for CMS data
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 60 * 1000 // 1 minute

function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T
  }
  return null
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}

// =============================================================================
// SITE SETTINGS
// =============================================================================

export async function getSiteSettings(tenantSlug?: string): Promise<SiteSettings> {
  const cacheKey = `site-settings:${tenantSlug || 'default'}`
  const cached = getCached<SiteSettings>(cacheKey)
  if (cached) return cached

  try {
    const response = await payloadClient.getSiteSettings({ tenant: tenantSlug })
    if (response) {
      const settings = transformSiteSettings(response)
      setCache(cacheKey, settings)
      return settings
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch site settings, using defaults:', error)
  }

  return defaultSiteSettings
}

function transformSiteSettings(data: any): SiteSettings {
  return {
    siteName: data.siteName || defaultSiteSettings.siteName,
    tagline: data.tagline || defaultSiteSettings.tagline,
    description: data.description || defaultSiteSettings.description,
    logo: data.logo ? { id: data.logo.id, url: data.logo.url, alt: data.logo.alt || '' } : undefined,
    favicon: data.favicon ? { id: data.favicon.id, url: data.favicon.url, alt: '' } : undefined,
    socialMedia: data.socialMedia || defaultSiteSettings.socialMedia,
    contactInfo: data.contactInfo || defaultSiteSettings.contactInfo,
    defaultCurrency: data.defaultCurrency || defaultSiteSettings.defaultCurrency,
    defaultLocale: data.defaultLocale || defaultSiteSettings.defaultLocale,
    supportedLocales: data.supportedLocales || defaultSiteSettings.supportedLocales,
    timezone: data.timezone || defaultSiteSettings.timezone,
    analytics: data.analytics,
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
    const response = await payloadClient.getNavigation({ tenant: tenantSlug })
    if (response) {
      const navigation = transformNavigation(response)
      setCache(cacheKey, navigation)
      return navigation
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch navigation, using defaults:', error)
  }

  return defaultNavigation
}

function transformNavigation(data: any): Navigation {
  const mainMenu: NavSection[] = (data.mainMenu || []).map((section: any) => ({
    id: section.id || section.label?.toLowerCase().replace(/\s+/g, '-'),
    label: section.label,
    items: (section.items || []).map((item: any) => ({
      id: item.id || item.label?.toLowerCase().replace(/\s+/g, '-'),
      label: item.label,
      href: resolveHref(item),
      description: item.description,
      icon: item.icon,
      badge: item.badge,
      children: item.children?.map((child: any) => ({
        id: child.id || child.label?.toLowerCase().replace(/\s+/g, '-'),
        label: child.label,
        href: resolveHref(child),
      })),
      openInNewTab: item.openInNewTab,
    })),
    featured: section.featured,
    columns: section.columns,
  }))

  const footerMenu: FooterSection[] = (data.footerMenu || []).map((section: any) => ({
    id: section.id || section.title?.toLowerCase().replace(/\s+/g, '-'),
    title: section.title || section.label,
    links: (section.links || section.items || []).map((link: any) => ({
      id: link.id || link.label?.toLowerCase().replace(/\s+/g, '-'),
      label: link.label,
      href: resolveHref(link),
      openInNewTab: link.openInNewTab,
    })),
  }))

  return {
    mainMenu: mainMenu.length > 0 ? mainMenu : defaultNavigation.mainMenu,
    footerMenu: footerMenu.length > 0 ? footerMenu : defaultNavigation.footerMenu,
    mobileMenu: data.mobileMenu,
    topBar: data.topBar || defaultNavigation.topBar,
  }
}

function resolveHref(item: any): string {
  if (item.url) return item.url
  if (item.href) return item.href
  if (item.page?.slug) return `/${item.page.slug}`
  if (item.type === 'page' && item.page) {
    return typeof item.page === 'string' ? `/${item.page}` : `/${item.page.slug}`
  }
  return '#'
}

// =============================================================================
// ANNOUNCEMENTS
// =============================================================================

export async function getAnnouncements(tenantSlug?: string): Promise<Announcement[]> {
  const cacheKey = `announcements:${tenantSlug || 'default'}`
  const cached = getCached<Announcement[]>(cacheKey)
  if (cached) return cached

  try {
    // Try to get from site settings
    const settings = await payloadClient.getSiteSettings({ tenant: tenantSlug })
    if (settings?.announcements?.length) {
      const announcements = transformAnnouncements(settings.announcements)
      setCache(cacheKey, announcements)
      return announcements
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch announcements, using defaults:', error)
  }

  return defaultAnnouncements
}

function transformAnnouncements(data: any[]): Announcement[] {
  return data.map((item, index) => ({
    id: item.id || `announcement-${index}`,
    message: item.message || item.text || '',
    link: item.link || item.url,
    linkText: item.linkText,
    type: item.type || 'info',
    dismissible: item.dismissible ?? true,
    startDate: item.startDate,
    endDate: item.endDate,
    priority: item.priority || index,
  })).filter(a => {
    // Filter by date if applicable
    const now = new Date()
    if (a.startDate && new Date(a.startDate) > now) return false
    if (a.endDate && new Date(a.endDate) < now) return false
    return true
  })
}

// =============================================================================
// HOME PAGE
// =============================================================================

export async function getHomePage(tenantSlug?: string): Promise<HomePage> {
  const cacheKey = `home-page:${tenantSlug || 'default'}`
  const cached = getCached<HomePage>(cacheKey)
  if (cached) return cached

  try {
    // Try to fetch home page from CMS
    const pages = await payloadClient.getPages({
      tenant: tenantSlug,
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (pages?.docs?.[0]) {
      const homePage = transformHomePage(pages.docs[0])
      setCache(cacheKey, homePage)
      return homePage
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch home page, using defaults:', error)
  }

  return defaultHomePage
}

function transformHomePage(data: any): HomePage {
  const hero = data.hero || data.layout?.find((b: any) => b.blockType === 'hero')
  
  return {
    hero: {
      slides: hero?.slides?.map(transformHeroSlide) || 
              (hero ? [transformHeroSlide(hero)] : defaultHomePage.hero.slides),
      autoplay: hero?.autoplay ?? true,
      autoplayInterval: hero?.autoplayInterval || 5000,
    },
    sections: transformSections(data.layout || data.sections || []),
  }
}

function transformHeroSlide(data: any): HeroSlide {
  return {
    id: data.id || `slide-${Math.random().toString(36).slice(2)}`,
    title: data.title || data.heading || '',
    subtitle: data.subtitle || data.subheading || '',
    description: data.description,
    image: data.image ? {
      id: data.image.id || data.image,
      url: data.image.url || data.image,
      alt: data.image.alt || data.title || '',
    } : undefined,
    video: data.video ? {
      id: data.video.id,
      url: data.video.url,
      alt: '',
    } : undefined,
    primaryCTA: data.primaryCTA || data.ctaText ? {
      label: data.primaryCTA?.label || data.ctaText || 'Learn More',
      href: data.primaryCTA?.href || data.ctaLink || '#',
      variant: data.primaryCTA?.variant || 'primary',
    } : undefined,
    secondaryCTA: data.secondaryCTA,
    overlay: data.overlay || 'dark',
    textPosition: data.textPosition || data.variant || 'center',
  }
}

function transformSections(blocks: any[]): PageSection[] {
  return blocks.map((block) => {
    switch (block.blockType) {
      case 'features':
      case 'card-grid':
        return {
          id: block.id || `features-${Math.random().toString(36).slice(2)}`,
          sectionType: 'features' as const,
          title: block.title || block.heading,
          subtitle: block.subtitle,
          features: (block.features || block.cards || []).map((f: any, i: number) => ({
            id: f.id || `feature-${i}`,
            title: f.title,
            description: f.description,
            icon: f.icon,
            image: f.image ? { id: f.image.id, url: f.image.url, alt: f.image.alt || '' } : undefined,
            link: f.link,
          })),
          layout: block.layout || 'grid',
          columns: (parseInt(block.columns) || 3) as 2 | 3 | 4,
        }

      case 'testimonial':
      case 'testimonials':
        return {
          id: block.id || `testimonials-${Math.random().toString(36).slice(2)}`,
          sectionType: 'testimonials' as const,
          title: block.title || block.heading,
          testimonials: (block.testimonials || block.quotes || []).map((t: any, i: number) => ({
            id: t.id || `testimonial-${i}`,
            quote: t.quote || t.text,
            author: t.author,
            role: t.role,
            company: t.company,
            avatar: t.avatar ? { id: t.avatar.id, url: t.avatar.url, alt: '' } : undefined,
            rating: t.rating,
          })),
          layout: block.layout || block.variant || 'carousel',
        }

      case 'stats':
        return {
          id: block.id || `stats-${Math.random().toString(36).slice(2)}`,
          sectionType: 'stats' as const,
          title: block.title,
          stats: (block.stats || block.items || []).map((s: any, i: number) => ({
            id: s.id || `stat-${i}`,
            value: s.value,
            label: s.label,
            prefix: s.prefix,
            suffix: s.suffix,
            icon: s.icon,
          })),
          layout: block.layout || 'inline',
        }

      case 'faq':
        return {
          id: block.id || `faq-${Math.random().toString(36).slice(2)}`,
          sectionType: 'faq' as const,
          title: block.title || block.heading,
          categories: block.categories || [{
            id: 'general',
            title: 'General',
            faqs: (block.items || block.faqs || []).map((f: any, i: number) => ({
              id: f.id || `faq-${i}`,
              question: f.question || f.title,
              answer: typeof f.answer === 'string' ? f.answer : f.answer?.root?.children?.[0]?.children?.[0]?.text || '',
            })),
          }],
          layout: block.layout || 'accordion',
        }

      case 'cta':
        return {
          id: block.id || `cta-${Math.random().toString(36).slice(2)}`,
          sectionType: 'cta' as const,
          heading: block.heading || block.title,
          text: block.description || block.text,
          primaryButton: {
            label: block.buttonText || block.primaryButton?.label || 'Learn More',
            href: block.buttonLink || block.primaryButton?.href || '#',
            variant: block.variant || 'primary',
          },
          secondaryButton: block.secondaryButton,
          image: block.image ? { id: block.image.id, url: block.image.url, alt: '' } : undefined,
          layout: block.layout || 'centered',
        }

      case 'newsletter':
        return {
          id: block.id || `newsletter-${Math.random().toString(36).slice(2)}`,
          sectionType: 'newsletter' as const,
          heading: block.heading || block.title || 'Subscribe to Our Newsletter',
          text: block.text || block.description || 'Get the latest updates and offers.',
          placeholder: block.placeholder || 'Enter your email',
          buttonText: block.buttonText || 'Subscribe',
          successMessage: block.successMessage || 'Thank you for subscribing!',
          disclaimerText: block.disclaimerText,
        }

      case 'banner':
        return {
          id: block.id || `banner-${Math.random().toString(36).slice(2)}`,
          sectionType: 'banner' as const,
          title: block.title,
          content: block.message || block.content,
          link: block.link,
          linkText: block.linkText,
          image: block.image ? { id: block.image.id, url: block.image.url, alt: '' } : undefined,
          variant: block.type || 'info',
          countdown: block.countdown,
        }

      default:
        // Return content section for unknown blocks
        return {
          id: block.id || `content-${Math.random().toString(36).slice(2)}`,
          sectionType: 'content' as const,
          title: block.title,
          content: block.content || '',
          layout: 'full',
        }
    }
  })
}

// =============================================================================
// CMS PAGES
// =============================================================================

export async function getCMSPage(slug: string, tenantSlug?: string): Promise<CMSPage | null> {
  const cacheKey = `page:${slug}:${tenantSlug || 'default'}`
  const cached = getCached<CMSPage | null>(cacheKey)
  if (cached !== null) return cached

  try {
    const pages = await payloadClient.getPages({
      tenant: tenantSlug,
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (pages?.docs?.[0]) {
      const page = transformCMSPage(pages.docs[0])
      setCache(cacheKey, page)
      return page
    }
  } catch (error) {
    console.warn(`[CMS] Failed to fetch page "${slug}":`, error)
  }

  setCache(cacheKey, null)
  return null
}

function transformCMSPage(data: any): CMSPage {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    template: data.template || 'default',
    hero: data.hero ? transformHeroSlide(data.hero) : undefined,
    sections: transformSections(data.layout || data.sections || []),
    seo: data.meta ? {
      metaTitle: data.meta.title,
      metaDescription: data.meta.description,
      ogImage: data.meta.image ? { id: data.meta.image.id, url: data.meta.image.url, alt: '' } : undefined,
    } : undefined,
    publishedAt: data.lastPublishedAt || data.publishedAt,
    status: data.status || 'published',
  }
}

// =============================================================================
// FAQ
// =============================================================================

export async function getFAQs(tenantSlug?: string): Promise<FAQCategory[]> {
  const cacheKey = `faqs:${tenantSlug || 'default'}`
  const cached = getCached<FAQCategory[]>(cacheKey)
  if (cached) return cached

  try {
    // Try to get FAQ page
    const page = await getCMSPage('faq', tenantSlug)
    if (page?.sections) {
      const faqSection = page.sections.find(s => s.sectionType === 'faq') as any
      if (faqSection?.categories) {
        setCache(cacheKey, faqSection.categories)
        return faqSection.categories
      }
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch FAQs, using defaults:', error)
  }

  return defaultFAQSection.categories
}

// =============================================================================
// LOYALTY PROGRAM
// =============================================================================

export async function getLoyaltyProgram(tenantSlug?: string): Promise<LoyaltyProgram> {
  const cacheKey = `loyalty:${tenantSlug || 'default'}`
  const cached = getCached<LoyaltyProgram>(cacheKey)
  if (cached) return cached

  try {
    // Try to get loyalty page or settings
    const page = await getCMSPage('loyalty', tenantSlug)
    if (page) {
      // Extract loyalty data from page sections if available
      const program = extractLoyaltyFromPage(page)
      if (program) {
        setCache(cacheKey, program)
        return program
      }
    }
  } catch (error) {
    console.warn('[CMS] Failed to fetch loyalty program, using defaults:', error)
  }

  return defaultLoyaltyProgram
}

function extractLoyaltyFromPage(page: CMSPage): LoyaltyProgram | null {
  // This would parse the page content for loyalty-specific sections
  // For now, return null to use defaults
  return null
}

// =============================================================================
// GIFT CARDS
// =============================================================================

export async function getGiftCardConfig(tenantSlug?: string): Promise<GiftCardConfig> {
  const cacheKey = `gift-cards:${tenantSlug || 'default'}`
  const cached = getCached<GiftCardConfig>(cacheKey)
  if (cached) return cached

  try {
    const settings = await payloadClient.getSiteSettings({ tenant: tenantSlug })
    if (settings?.giftCards) {
      const config = {
        ...defaultGiftCardConfig,
        ...settings.giftCards,
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
// UTILITY: Clear Cache
// =============================================================================

export function clearCMSCache(): void {
  cache.clear()
}

export function invalidateCacheKey(key: string): void {
  cache.delete(key)
}
