/**
 * Payload CMS React Hooks
 * 
 * Provides hooks for fetching CMS data with automatic fallback to defaults
 * when the CMS is unavailable.
 */

import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getPayloadClient } from "./client"

// Get the singleton client instance
const payloadClient = getPayloadClient()
import type { 
  Page as PayloadPage, 
  POI as PayloadPOI, 
  Navigation as PayloadNavigation,
  PlatformContext,
  POIPrimaryCategory as POICategory 
} from "./types"

// Query keys for React Query
export const cmsQueryKeys = {
  platformContext: (tenant: string) => ["cms", "platform-context", tenant] as const,
  navigation: (tenant?: string, locale?: string) => ["cms", "navigation", tenant, locale] as const,
  siteSettings: (tenant?: string, locale?: string) => ["cms", "site-settings", tenant, locale] as const,
  page: (slug: string, tenant?: string, locale?: string) => ["cms", "page", slug, tenant, locale] as const,
  pages: (tenant?: string, status?: string) => ["cms", "pages", tenant, status] as const,
  poi: (slug: string, tenant?: string, locale?: string) => ["cms", "poi", slug, tenant, locale] as const,
  pois: (params: { category?: string; nodeId?: string; tenant?: string }) => ["cms", "pois", params] as const,
  tenantHierarchy: () => ["cms", "tenant-hierarchy"] as const,
}

// Default fallback data
const defaultNavigation: PayloadNavigation = {
  mainMenu: [
    { label: "Shop", type: "link", url: "/store" },
    { label: "Explore", type: "link", url: "/explore" },
    { label: "About", type: "link", url: "/about" },
    { label: "Contact", type: "link", url: "/contact" },
  ],
  footerMenu: [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Terms of Service", url: "/terms" },
    { label: "Help", url: "/help" },
  ],
}

const defaultPlatformContext: PlatformContext = {
  tenant: {
    id: "0",
    name: "Default",
    slug: "default",
    tenantTier: "CITY",
    status: "active",
    settings: {
      defaultLocale: "en",
      supportedLocales: [{ locale: "en" }],
      timezone: "UTC",
      currency: "USD",
    },
  },
  tenantAncestry: [],
  nodeHierarchy: [],
  governanceChain: {
    policies: {
      dataResidency: { zone: "GLOBAL", crossBorderAllowed: true },
      compliance: { frameworks: [], auditFrequency: "annual" },
      classification: { levels: ["public"] },
    },
    authorities: [],
  },
  capabilities: {
    plugins: { official: [], community: [], custom: [] },
    features: {
      multiTenancy: false,
      hierarchicalTenancy: false,
      localization: { locales: ["en"], defaultLocale: "en" },
    },
    endpoints: {},
  },
  systems: { total: 0, active: 0, external: 0, registry: [] },
  contextHeaders: [],
  hierarchyLevels: [],
  tenantTiers: [],
  resolvedAt: new Date().toISOString(),
  isDefaultTenant: true,
}

/**
 * Hook to fetch platform context with fallback
 */
export function usePlatformContext(
  tenant: string = "platform",
  options?: Partial<UseQueryOptions<PlatformContext>>
) {
  return useQuery({
    queryKey: cmsQueryKeys.platformContext(tenant),
    queryFn: async () => {
      try {
        const context = await payloadClient.getPlatformContext(tenant)
        return context
      } catch (error) {
        console.warn("[CMS] Platform context fetch failed, using default:", error)
        return defaultPlatformContext
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    ...options,
  })
}

/**
 * Hook to fetch navigation from CMS with fallback
 */
export function useNavigation(
  tenant?: string,
  locale?: string,
  options?: Partial<UseQueryOptions<PayloadNavigation>>
) {
  return useQuery({
    queryKey: cmsQueryKeys.navigation(tenant, locale),
    queryFn: async () => {
      try {
        const navigation = await payloadClient.getNavigation({ tenant, locale })
        // Return CMS navigation if it has items, otherwise use default
        if (navigation.mainMenu && navigation.mainMenu.length > 0) {
          return navigation
        }
        return defaultNavigation
      } catch (error) {
        console.warn("[CMS] Navigation fetch failed, using default:", error)
        return defaultNavigation
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    ...options,
  })
}

/**
 * Hook to fetch a page by slug with fallback to null
 */
export function usePage(
  slug: string,
  tenant?: string,
  locale?: string,
  options?: Partial<UseQueryOptions<PayloadPage | null>>
) {
  return useQuery({
    queryKey: cmsQueryKeys.page(slug, tenant, locale),
    queryFn: async () => {
      try {
        const page = await payloadClient.getPageBySlug(slug, { tenant, locale })
        return page
      } catch (error) {
        console.warn(`[CMS] Page "${slug}" fetch failed:`, error)
        return null
      }
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
    ...options,
  })
}

/**
 * Hook to fetch pages list
 */
export function usePages(
  tenant?: string,
  status: string = "published",
  options?: Partial<UseQueryOptions<PayloadPage[]>>
) {
  return useQuery({
    queryKey: cmsQueryKeys.pages(tenant, status),
    queryFn: async () => {
      try {
        const response = await payloadClient.getPages({ 
          tenant, 
          status: status as "draft" | "published" | "archived",
          limit: 100 
        })
        return response.docs
      } catch (error) {
        console.warn("[CMS] Pages fetch failed:", error)
        return []
      }
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    ...options,
  })
}

/**
 * Hook to fetch a POI by slug
 */
export function usePOI(
  slug: string,
  tenant?: string,
  locale?: string,
  options?: Partial<UseQueryOptions<PayloadPOI | null>>
) {
  return useQuery({
    queryKey: cmsQueryKeys.poi(slug, tenant, locale),
    queryFn: async () => {
      try {
        const poi = await payloadClient.getPOIBySlug(slug, { tenant, locale })
        return poi
      } catch (error) {
        console.warn(`[CMS] POI "${slug}" fetch failed:`, error)
        return null
      }
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
    ...options,
  })
}

/**
 * Hook to fetch POIs list
 */
export function usePOIs(
  params: {
    category?: POICategory
    nodeId?: string | number
    tenant?: string
    limit?: number
  } = {},
  options?: Partial<UseQueryOptions<PayloadPOI[]>>
) {
  return useQuery({
    queryKey: cmsQueryKeys.pois({ 
      category: params.category, 
      nodeId: params.nodeId?.toString(),
      tenant: params.tenant 
    }),
    queryFn: async () => {
      try {
        const response = await payloadClient.getPOIs({
          tenant: params.tenant,
          primaryCategory: params.category,
          nodeId: params.nodeId,
          limit: params.limit || 50,
        })
        return response.docs
      } catch (error) {
        console.warn("[CMS] POIs fetch failed:", error)
        return []
      }
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    ...options,
  })
}

/**
 * Hook to fetch tenant hierarchy
 */
export function useTenantHierarchy(
  options?: Partial<UseQueryOptions<any>>
) {
  return useQuery({
    queryKey: cmsQueryKeys.tenantHierarchy(),
    queryFn: async () => {
      try {
        const hierarchy = await payloadClient.getTenantHierarchy()
        return hierarchy
      } catch (error) {
        console.warn("[CMS] Tenant hierarchy fetch failed:", error)
        return []
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes (rarely changes)
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
    ...options,
  })
}

/**
 * Check if CMS is available (for conditional rendering)
 */
export function useCMSHealth() {
  return useQuery({
    queryKey: ["cms", "health"],
    queryFn: async () => {
      try {
        // Try to fetch platform context as health check
        await payloadClient.getPlatformContext("platform")
        return { available: true, error: null }
      } catch (error) {
        return { available: false, error: String(error) }
      }
    },
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000,
    retry: 0,
  })
}
