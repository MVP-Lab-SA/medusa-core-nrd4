/**
 * CMS Module
 * 
 * Centralized CMS content management for the storefront.
 * Fetches from Payload CMS with automatic fallback to defaults.
 */

// Types
export * from './types'

// Default content
export * from './defaults'

// Service (for server-side usage)
export {
  getSiteSettings,
  getNavigation,
  getAnnouncements,
  getHomePage,
  getCMSPage,
  getFAQs,
  getLoyaltyProgram,
  getGiftCardConfig,
  clearCMSCache,
  invalidateCacheKey,
} from './service'

// React hooks (for client-side usage)
export {
  useSiteSettings,
  useNavigation,
  useMainMenu,
  useFooterMenu,
  useAnnouncements,
  useHomePage,
  useHeroSection,
  useHomePageSections,
  useCMSPage,
  useFAQs,
  useLoyaltyProgram,
  useGiftCardConfig,
  useCMSCache,
  useLayoutCMS,
} from './hooks'
