/**
 * CMS React Hooks
 * 
 * React Query hooks for fetching CMS content with caching and fallbacks.
 * All hooks are tenant-aware and use the current CityOS context.
 */

import { useQuery } from '@tanstack/react-query'
import { useCityOS } from '../cityos'
import {
  getSiteSettings,
  getNavigation,
  getAnnouncements,
  getHomePage,
  getFAQPage,
  getLoyaltyProgram,
  getGiftCardConfig,
  getCMSPage,
  getLabels,
} from './service'
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
import type {
  SiteSettings,
  Navigation,
  Announcement,
  HomePage,
  FAQCategory,
  LoyaltyProgram,
  GiftCardConfig,
  CMSPage,
  NavSection,
  FooterSection,
  Labels,
} from './types'

// Query key factory
const cmsKeys = {
  all: ['cms'] as const,
  siteSettings: (tenant?: string) => [...cmsKeys.all, 'site-settings', tenant] as const,
  navigation: (tenant?: string) => [...cmsKeys.all, 'navigation', tenant] as const,
  announcements: (tenant?: string) => [...cmsKeys.all, 'announcements', tenant] as const,
  homePage: (tenant?: string) => [...cmsKeys.all, 'home-page', tenant] as const,
  faqPage: (tenant?: string) => [...cmsKeys.all, 'faq-page', tenant] as const,
  loyaltyProgram: (tenant?: string) => [...cmsKeys.all, 'loyalty-program', tenant] as const,
  giftCardConfig: (tenant?: string) => [...cmsKeys.all, 'gift-card-config', tenant] as const,
  page: (slug: string, tenant?: string) => [...cmsKeys.all, 'page', slug, tenant] as const,
  labels: (tenant?: string, locale?: string) => [...cmsKeys.all, 'labels', tenant, locale] as const,
}

/**
 * Hook to get current tenant slug from CityOS context
 */
function useTenantSlug(): string | undefined {
  try {
    const cityos = useCityOS()
    return cityos?.tenant?.slug
  } catch {
    return undefined
  }
}

/**
 * Hook for site settings (site name, description, contact info, etc.)
 */
export function useSiteSettings() {
  const tenantSlug = useTenantSlug()
  
  return useQuery<SiteSettings>({
    queryKey: cmsKeys.siteSettings(tenantSlug),
    queryFn: () => getSiteSettings(tenantSlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: defaultSiteSettings,
  })
}

/**
 * Hook for full navigation (main menu, footer menu, mobile menu)
 */
export function useNavigation() {
  const tenantSlug = useTenantSlug()
  
  return useQuery<Navigation>({
    queryKey: cmsKeys.navigation(tenantSlug),
    queryFn: () => getNavigation(tenantSlug),
    staleTime: 5 * 60 * 1000,
    placeholderData: defaultNavigation,
  })
}

/**
 * Hook for just the main menu
 */
export function useMainMenu() {
  const { data: navigation, ...rest } = useNavigation()
  return {
    data: navigation?.mainMenu || defaultNavigation.mainMenu,
    ...rest,
  }
}

/**
 * Hook for just the footer menu
 */
export function useFooterMenu() {
  const { data: navigation, ...rest } = useNavigation()
  return {
    data: navigation?.footerMenu || defaultNavigation.footerMenu,
    ...rest,
  }
}

/**
 * Hook for announcements
 */
export function useAnnouncements() {
  const tenantSlug = useTenantSlug()
  
  return useQuery<Announcement[]>({
    queryKey: cmsKeys.announcements(tenantSlug),
    queryFn: () => getAnnouncements(tenantSlug),
    staleTime: 60 * 1000, // 1 minute (announcements can change often)
    placeholderData: defaultAnnouncements,
  })
}

/**
 * Hook for home page content
 */
export function useHomePage() {
  const tenantSlug = useTenantSlug()
  
  return useQuery<HomePage>({
    queryKey: cmsKeys.homePage(tenantSlug),
    queryFn: () => getHomePage(tenantSlug),
    staleTime: 5 * 60 * 1000,
    placeholderData: defaultHomePage,
  })
}

/**
 * Hook for just the hero section
 */
export function useHeroSection() {
  const { data: homePage, ...rest } = useHomePage()
  return {
    data: homePage?.hero || defaultHomePage.hero,
    ...rest,
  }
}

/**
 * Hook for FAQ page content
 */
export function useFAQs() {
  const tenantSlug = useTenantSlug()
  
  return useQuery<FAQCategory[]>({
    queryKey: cmsKeys.faqPage(tenantSlug),
    queryFn: () => getFAQPage(tenantSlug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: defaultFAQSection.categories,
  })
}

/**
 * Hook for loyalty program configuration
 */
export function useLoyaltyProgram() {
  const tenantSlug = useTenantSlug()
  
  return useQuery<LoyaltyProgram>({
    queryKey: cmsKeys.loyaltyProgram(tenantSlug),
    queryFn: () => getLoyaltyProgram(tenantSlug),
    staleTime: 10 * 60 * 1000,
    placeholderData: defaultLoyaltyProgram,
  })
}

/**
 * Hook for gift card configuration
 */
export function useGiftCardConfig() {
  const tenantSlug = useTenantSlug()
  
  return useQuery<GiftCardConfig>({
    queryKey: cmsKeys.giftCardConfig(tenantSlug),
    queryFn: () => getGiftCardConfig(tenantSlug),
    staleTime: 10 * 60 * 1000,
    placeholderData: defaultGiftCardConfig,
  })
}

/**
 * Hook for a generic CMS page by slug
 */
export function useCMSPage(slug: string) {
  const tenantSlug = useTenantSlug()
  
  return useQuery<CMSPage | null>({
    queryKey: cmsKeys.page(slug, tenantSlug),
    queryFn: () => getCMSPage(slug, tenantSlug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  })
}

/**
 * Hook for labels/translations
 */
export function useLabels(locale?: string) {
  const tenantSlug = useTenantSlug()
  
  return useQuery<Labels>({
    queryKey: cmsKeys.labels(tenantSlug, locale),
    queryFn: () => getLabels(tenantSlug, locale),
    staleTime: 30 * 60 * 1000, // 30 minutes
    placeholderData: defaultLabels,
  })
}
