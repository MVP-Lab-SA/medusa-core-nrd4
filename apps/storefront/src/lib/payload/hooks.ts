/**
 * Payload CMS React Hooks
 * 
 * Provides hooks for fetching CMS data with automatic fallback to defaults
 * when the CMS is unavailable.
 */

import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getPayloadClient, createTenantClient } from "./client"
import type { 
  Page as PayloadPage, 
  POI as PayloadPOI, 
  Navigation as PayloadNavigation,
  PlatformContext,
  POIPrimaryCategory,
  TenantConfig,
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

const defaultTenantConfig: TenantConfig = {
  id: "0",
  name: "Default",
  slug: "default",
  domain: "",
  tenantTier: "CITY",
  residencyZone: "GLOBAL",
  status: "active",
  settings: {
    defaultLocale: "en",
    supportedLocales: [{ locale: "en" }],
    timezone: "UTC",
    currency: "USD",
  },
}

const defaultPlatformContext: PlatformContext = {
  tenant: defaultTenantConfig,
  masterTenant: {
    id: "0",
    name: "Platform",
    slug: "platform",
    tenantTier: "MASTER",
    domain: "",
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

function getClient(tenant?: string, locale?: string) {
  if (tenant || locale) {
    const client = createTenantClient(tenant || 'platform', locale)
    return client
  }
  return getPayloadClient()
}

/**
 * Hook to fetch platform context with fallback
 */
export function usePlatformContext(
  tenant: string = "platform",
  options?: Partial<UseQueryOptions<PlatformContext, Error>>
) {
  return useQuery<PlatformContext, Error>({
    queryKey: cmsQueryKeys.platformContext(tenant),
    queryFn: async (): Promise<PlatformContext> => {
      try {
        const client = getPayloadClient()
        const context = await client.getPlatformContext(tenant)
        if (context) {
          return context
        }
        return defaultPlatformContext
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
  options?: Partial<UseQueryOptions<PayloadNavigation, Error>>
) {
  return useQuery<PayloadNavigation, Error>({
    queryKey: cmsQueryKeys.navigation(tenant, locale),
    queryFn: async (): Promise<PayloadNavigation> => {
      try {
        const client = getClient(tenant, locale)
        const navigation = await client.getNavigation()
        // Return CMS navigation if it has items, otherwise use default
        if (navigation && navigation.mainMenu && navigation.mainMenu.length > 0) {
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
  options?: Partial<UseQueryOptions<PayloadPage | null, Error>>
) {
  return useQuery<PayloadPage | null, Error>({
    queryKey: cmsQueryKeys.page(slug, tenant, locale),
    queryFn: async (): Promise<PayloadPage | null> => {
      try {
        const client = getClient(tenant, locale)
        return await client.getPage(slug)
      } catch (error) {
        console.warn(`[CMS] Page fetch failed for ${slug}:`, error)
        return null
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
    ...options,
  })
}

/**
 * Hook to fetch multiple pages
 */
export function usePages(
  tenant?: string,
  options?: Partial<UseQueryOptions<PayloadPage[], Error>>
) {
  return useQuery<PayloadPage[], Error>({
    queryKey: cmsQueryKeys.pages(tenant),
    queryFn: async (): Promise<PayloadPage[]> => {
      try {
        const client = getClient(tenant)
        const result = await client.getPages()
        return result.docs || []
      } catch (error) {
        console.warn("[CMS] Pages fetch failed:", error)
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
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
  options?: Partial<UseQueryOptions<PayloadPOI | null, Error>>
) {
  return useQuery<PayloadPOI | null, Error>({
    queryKey: cmsQueryKeys.poi(slug, tenant, locale),
    queryFn: async (): Promise<PayloadPOI | null> => {
      try {
        const client = getClient(tenant, locale)
        return await client.getPOI(slug)
      } catch (error) {
        console.warn(`[CMS] POI fetch failed for ${slug}:`, error)
        return null
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
    ...options,
  })
}

/**
 * Hook to fetch POIs with optional filtering
 */
export function usePOIs(
  params: {
    category?: POIPrimaryCategory
    nodeId?: string
    limit?: number
    tenant?: string
  } = {},
  options?: Partial<UseQueryOptions<PayloadPOI[], Error>>
) {
  return useQuery<PayloadPOI[], Error>({
    queryKey: cmsQueryKeys.pois(params),
    queryFn: async (): Promise<PayloadPOI[]> => {
      try {
        const client = getClient(params.tenant)
        const result = await client.getPOIs({
          category: params.category,
          limit: params.limit,
        })
        return result.docs || []
      } catch (error) {
        console.warn("[CMS] POIs fetch failed:", error)
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    ...options,
  })
}

/**
 * Hook to fetch featured POIs
 */
export function useFeaturedPOIs(
  limit: number = 6,
  tenant?: string,
  options?: Partial<UseQueryOptions<PayloadPOI[], Error>>
) {
  return useQuery<PayloadPOI[], Error>({
    queryKey: ["cms", "featured-pois", limit, tenant],
    queryFn: async (): Promise<PayloadPOI[]> => {
      try {
        const client = getClient(tenant)
        return await client.getFeaturedPOIs(limit)
      } catch (error) {
        console.warn("[CMS] Featured POIs fetch failed:", error)
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    ...options,
  })
}

/**
 * Hook to search POIs
 */
export function useSearchPOIs(
  query: string,
  params: {
    category?: POIPrimaryCategory
    limit?: number
    tenant?: string
  } = {},
  options?: Partial<UseQueryOptions<PayloadPOI[], Error>>
) {
  return useQuery<PayloadPOI[], Error>({
    queryKey: ["cms", "search-pois", query, params],
    queryFn: async (): Promise<PayloadPOI[]> => {
      if (!query || query.length < 2) return []
      try {
        const client = getClient(params.tenant)
        return await client.searchPOIs(query, {
          category: params.category,
          limit: params.limit,
        })
      } catch (error) {
        console.warn("[CMS] POI search failed:", error)
        return []
      }
    },
    staleTime: 2 * 60 * 1000, // Shorter for search results
    gcTime: 10 * 60 * 1000,
    retry: 1,
    enabled: query.length >= 2,
    ...options,
  })
}

// Re-export types for convenience
export type { 
  PayloadPage, 
  PayloadPOI, 
  PayloadNavigation, 
  PlatformContext,
  POIPrimaryCategory,
}
