/**
 * CMS React Hooks
 * 
 * React hooks for consuming CMS content with automatic loading states and fallbacks.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCityOS } from '../cityos'
import {
  getSiteSettings,
  getNavigation,
  getAnnouncements,
  getHomePage,
  getCMSPage,
  getFAQs,
  getLoyaltyProgram,
  getGiftCardConfig,
  clearCMSCache,
} from './service'
import {
  defaultSiteSettings,
  defaultNavigation,
  defaultAnnouncements,
  defaultHomePage,
  defaultFAQSection,
  defaultLoyaltyProgram,
  defaultGiftCardConfig,
} from './defaults'
import type {
  SiteSettings,
  Navigation,
  Announcement,
  HomePage,
  CMSPage,
  FAQCategory,
  LoyaltyProgram,
  GiftCardConfig,
} from './types'

// Query keys
const QUERY_KEYS = {
  siteSettings: (tenant?: string) => ['cms', 'site-settings', tenant],
  navigation: (tenant?: string) => ['cms', 'navigation', tenant],
  announcements: (tenant?: string) => ['cms', 'announcements', tenant],
  homePage: (tenant?: string) => ['cms', 'home-page', tenant],
  page: (slug: string, tenant?: string) => ['cms', 'page', slug, tenant],
  faqs: (tenant?: string) => ['cms', 'faqs', tenant],
  loyalty: (tenant?: string) => ['cms', 'loyalty', tenant],
  giftCards: (tenant?: string) => ['cms', 'gift-cards', tenant],
}

// Stale times
const STALE_TIME = 5 * 60 * 1000 // 5 minutes
const CACHE_TIME = 30 * 60 * 1000 // 30 minutes

/**
 * Get current tenant slug from CityOS context
 */
function useTenantSlug(): string | undefined {
  try {
    const { context } = useCityOS()
    return context?.tenant?.slug
  } catch {
    return undefined
  }
}

// =============================================================================
// SITE SETTINGS
// =============================================================================

export function useSiteSettings() {
  const tenantSlug = useTenantSlug()

  return useQuery({
    queryKey: QUERY_KEYS.siteSettings(tenantSlug),
    queryFn: () => getSiteSettings(tenantSlug),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    placeholderData: defaultSiteSettings,
  })
}

// =============================================================================
// NAVIGATION
// =============================================================================

export function useNavigation() {
  const tenantSlug = useTenantSlug()

  return useQuery({
    queryKey: QUERY_KEYS.navigation(tenantSlug),
    queryFn: () => getNavigation(tenantSlug),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    placeholderData: defaultNavigation,
  })
}

/**
 * Get main menu items
 */
export function useMainMenu() {
  const { data: navigation, ...rest } = useNavigation()
  return {
    ...rest,
    data: navigation?.mainMenu || defaultNavigation.mainMenu,
  }
}

/**
 * Get footer menu items
 */
export function useFooterMenu() {
  const { data: navigation, ...rest } = useNavigation()
  return {
    ...rest,
    data: navigation?.footerMenu || defaultNavigation.footerMenu,
  }
}

// =============================================================================
// ANNOUNCEMENTS
// =============================================================================

export function useAnnouncements() {
  const tenantSlug = useTenantSlug()

  return useQuery({
    queryKey: QUERY_KEYS.announcements(tenantSlug),
    queryFn: () => getAnnouncements(tenantSlug),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    placeholderData: defaultAnnouncements,
  })
}

// =============================================================================
// HOME PAGE
// =============================================================================

export function useHomePage() {
  const tenantSlug = useTenantSlug()

  return useQuery({
    queryKey: QUERY_KEYS.homePage(tenantSlug),
    queryFn: () => getHomePage(tenantSlug),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    placeholderData: defaultHomePage,
  })
}

/**
 * Get hero section from home page
 */
export function useHeroSection() {
  const { data: homePage, ...rest } = useHomePage()
  return {
    ...rest,
    data: homePage?.hero || defaultHomePage.hero,
  }
}

/**
 * Get home page sections
 */
export function useHomePageSections() {
  const { data: homePage, ...rest } = useHomePage()
  return {
    ...rest,
    data: homePage?.sections || defaultHomePage.sections,
  }
}

// =============================================================================
// CMS PAGES
// =============================================================================

export function useCMSPage(slug: string) {
  const tenantSlug = useTenantSlug()

  return useQuery({
    queryKey: QUERY_KEYS.page(slug, tenantSlug),
    queryFn: () => getCMSPage(slug, tenantSlug),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!slug,
  })
}

// =============================================================================
// FAQ
// =============================================================================

export function useFAQs() {
  const tenantSlug = useTenantSlug()

  return useQuery({
    queryKey: QUERY_KEYS.faqs(tenantSlug),
    queryFn: () => getFAQs(tenantSlug),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    placeholderData: defaultFAQSection.categories,
  })
}

// =============================================================================
// LOYALTY
// =============================================================================

export function useLoyaltyProgram() {
  const tenantSlug = useTenantSlug()

  return useQuery({
    queryKey: QUERY_KEYS.loyalty(tenantSlug),
    queryFn: () => getLoyaltyProgram(tenantSlug),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    placeholderData: defaultLoyaltyProgram,
  })
}

// =============================================================================
// GIFT CARDS
// =============================================================================

export function useGiftCardConfig() {
  const tenantSlug = useTenantSlug()

  return useQuery({
    queryKey: QUERY_KEYS.giftCards(tenantSlug),
    queryFn: () => getGiftCardConfig(tenantSlug),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    placeholderData: defaultGiftCardConfig,
  })
}

// =============================================================================
// CACHE MANAGEMENT
// =============================================================================

/**
 * Hook to manage CMS cache
 */
export function useCMSCache() {
  const queryClient = useQueryClient()
  const tenantSlug = useTenantSlug()

  return {
    /**
     * Invalidate all CMS queries
     */
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: ['cms'] })
      clearCMSCache()
    },

    /**
     * Invalidate specific query
     */
    invalidate: (type: 'site-settings' | 'navigation' | 'announcements' | 'home-page' | 'faqs' | 'loyalty' | 'gift-cards') => {
      const keyMap = {
        'site-settings': QUERY_KEYS.siteSettings(tenantSlug),
        'navigation': QUERY_KEYS.navigation(tenantSlug),
        'announcements': QUERY_KEYS.announcements(tenantSlug),
        'home-page': QUERY_KEYS.homePage(tenantSlug),
        'faqs': QUERY_KEYS.faqs(tenantSlug),
        'loyalty': QUERY_KEYS.loyalty(tenantSlug),
        'gift-cards': QUERY_KEYS.giftCards(tenantSlug),
      }
      queryClient.invalidateQueries({ queryKey: keyMap[type] })
    },

    /**
     * Invalidate a specific page
     */
    invalidatePage: (slug: string) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.page(slug, tenantSlug) })
    },

    /**
     * Prefetch content for faster navigation
     */
    prefetch: async (type: 'navigation' | 'home-page') => {
      if (type === 'navigation') {
        await queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.navigation(tenantSlug),
          queryFn: () => getNavigation(tenantSlug),
        })
      } else if (type === 'home-page') {
        await queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.homePage(tenantSlug),
          queryFn: () => getHomePage(tenantSlug),
        })
      }
    },
  }
}

// =============================================================================
// COMPOSITE HOOKS (Convenience)
// =============================================================================

/**
 * Get all layout-related CMS data at once
 */
export function useLayoutCMS() {
  const settings = useSiteSettings()
  const navigation = useNavigation()
  const announcements = useAnnouncements()

  return {
    settings: settings.data || defaultSiteSettings,
    navigation: navigation.data || defaultNavigation,
    announcements: announcements.data || defaultAnnouncements,
    isLoading: settings.isLoading || navigation.isLoading || announcements.isLoading,
    isError: settings.isError || navigation.isError || announcements.isError,
  }
}
