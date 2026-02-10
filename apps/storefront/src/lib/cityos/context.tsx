/**
 * CityOS Platform Context Provider
 * 
 * Provides platform context to the entire application through React Context.
 * Handles tenant resolution, governance, and capability management.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import { getCityOSClient, type CityOSClientConfig } from './client'
import type {
  PlatformContext,
  Tenant,
  NodeHierarchy,
  GovernanceChain,
  Capabilities,
  SystemsRegistry,
  Locale,
  NodeType,
} from './types'
import { DEFAULT_PLATFORM_TENANT } from './types'

// ============================================================================
// Context Types
// ============================================================================

interface CityOSContextValue {
  // Core context data
  context: PlatformContext | null
  tenant: Tenant | null
  nodeHierarchy: NodeHierarchy[]
  governance: GovernanceChain | null
  capabilities: Capabilities | null
  systems: SystemsRegistry | null

  // State
  isLoading: boolean
  error: Error | null
  isDefaultTenant: boolean
  resolvedAt: string | null

  // Localization
  currentLocale: Locale
  supportedLocales: Locale[]
  isRTL: boolean
  setLocale: (locale: Locale) => void

  // Node navigation
  currentNode: NodeHierarchy | null
  setCurrentNode: (nodeId: string | null) => void
  getNodePath: (nodeId: string) => NodeHierarchy[]

  // Utilities
  refetch: () => Promise<void>
  invalidateCache: () => void
  getContextHeaders: () => Record<string, string>

  // Feature checks
  hasFeature: (feature: keyof Capabilities['features']) => boolean
  hasPlugin: (plugin: string) => boolean
}

const CityOSContext = createContext<CityOSContextValue | null>(null)

// ============================================================================
// Provider Props
// ============================================================================

interface CityOSProviderProps {
  children: ReactNode
  tenant?: string
  config?: Partial<CityOSClientConfig>
  fallbackToDefault?: boolean
  onContextLoaded?: (context: PlatformContext) => void
  onError?: (error: Error) => void
}

// ============================================================================
// Mock Data for Development
// ============================================================================

const createMockContext = (tenantSlug: string): PlatformContext => ({
  tenant: {
    id: `tenant-${tenantSlug}`,
    name: tenantSlug.charAt(0).toUpperCase() + tenantSlug.slice(1),
    slug: tenantSlug,
    domain: `${tenantSlug}.cityos.dev`,
    residencyZone: 'GLOBAL',
    status: 'active',
    description: `${tenantSlug} tenant`,
    settings: {
      defaultLocale: 'en',
      supportedLocales: [
        { locale: 'en' },
        { locale: 'fr' },
        { locale: 'ar' },
      ],
      timezone: 'UTC',
      currency: 'USD',
    },
  },
  nodeHierarchy: [
    {
      id: 'node-city-1',
      name: tenantSlug.charAt(0).toUpperCase() + tenantSlug.slice(1),
      code: `${tenantSlug.substring(0, 3).toUpperCase()}-001`,
      type: 'CITY' as NodeType,
      slug: tenantSlug,
      status: 'active',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      parent: null,
      children: [
        {
          id: 'node-district-1',
          name: 'Central District',
          code: `${tenantSlug.substring(0, 3).toUpperCase()}-D01`,
          type: 'DISTRICT' as NodeType,
          slug: 'central',
          status: 'active',
          parent: 'node-city-1',
          children: [
            {
              id: 'node-zone-1',
              name: 'Tech Zone',
              code: `${tenantSlug.substring(0, 3).toUpperCase()}-Z01`,
              type: 'ZONE' as NodeType,
              slug: 'tech-zone',
              status: 'active',
              parent: 'node-district-1',
              children: [],
            },
          ],
        },
      ],
    },
  ],
  governanceChain: {
    region: {
      id: 'region-global',
      name: 'Global',
      code: 'GLOBAL',
      residencyZone: 'GLOBAL',
    },
    country: {
      id: 'country-us',
      name: 'United States',
      code: 'US',
      settings: {},
    },
    authorities: [
      {
        id: 'auth-federal',
        name: 'Federal Authority',
        code: 'FED',
        type: 'federal',
        jurisdiction: { scope: 'national' },
      },
    ],
    policies: {
      dataResidency: { zone: 'GLOBAL' },
      compliance: { frameworks: ['SOC2', 'GDPR'] },
      classification: { levels: ['public', 'internal', 'confidential'] },
    },
  },
  capabilities: {
    plugins: {
      official: ['multi-tenant', 'search', 'seo', 'richtext-lexical'],
      community: ['docs-reorder', 'fields-select'],
      custom: ['openapi-generator', 'rbac-utils'],
    },
    features: {
      twoFactorAuth: true,
      rbac: true,
      multiTenancy: true,
      localization: { locales: ['en', 'fr', 'ar'], defaultLocale: 'en' },
      objectStorage: true,
      videoProcessing: true,
      openApiDocs: true,
      aiContent: false,
      analytics: false,
      payments: false,
      errorTracking: false,
      workflowOrchestration: false,
    },
    endpoints: {},
  },
  systems: {
    total: 22,
    active: 10,
    external: 4,
    registry: [
      {
        id: 'cms-payload',
        name: 'Payload CMS',
        type: 'internal',
        category: 'cms',
        status: 'active',
        capabilities: ['content-management', 'media', 'users', 'localization'],
        hasBaseUrl: true,
      },
      {
        id: 'commerce-medusa',
        name: 'Medusa Commerce',
        type: 'external',
        category: 'commerce',
        status: 'active',
        capabilities: ['product-catalog', 'cart', 'checkout', 'orders', 'inventory'],
        hasBaseUrl: true,
      },
      {
        id: 'workflow-temporal',
        name: 'Temporal Workflows',
        type: 'external',
        category: 'workflow',
        status: 'active',
        capabilities: ['workflow-orchestration', 'activities', 'signals'],
        hasBaseUrl: true,
      },
    ],
  },
  contextHeaders: [
    'X-CityOS-Correlation-Id',
    'X-CityOS-Tenant-Id',
    'X-CityOS-Node-Id',
    'X-CityOS-Node-Type',
    'X-CityOS-Locale',
    'X-CityOS-User-Id',
    'X-CityOS-Channel',
    'X-Idempotency-Key',
  ],
  hierarchyLevels: ['CITY', 'DISTRICT', 'ZONE', 'FACILITY', 'ASSET'],
  resolvedAt: new Date().toISOString(),
  isDefaultTenant: tenantSlug === 'platform',
})

// ============================================================================
// Provider Component
// ============================================================================

export function CityOSProvider({
  children,
  tenant = 'platform',
  config,
  fallbackToDefault = true,
  onContextLoaded,
  onError,
}: CityOSProviderProps): React.ReactElement {
  const [context, setContext] = useState<PlatformContext | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentLocale, setCurrentLocale] = useState<Locale>('en')
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)

  const client = useMemo(() => getCityOSClient(config), [config])

  // Fetch context
  const fetchContext = useCallback(async (skipCache = false) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await client.getContext({ tenant, skipCache })
      setContext(data)
      onContextLoaded?.(data)

      // Set initial locale from tenant settings
      if (data.tenant.settings.defaultLocale) {
        setCurrentLocale(data.tenant.settings.defaultLocale)
      }
    } catch (err) {
      const apiError = err instanceof Error ? err : new Error('Failed to fetch context')
      
      // Try fallback to mock data in development
      if (process.env.NODE_ENV === 'development' || fallbackToDefault) {
        console.warn('[CityOS] Using mock context data:', apiError.message)
        const mockData = createMockContext(tenant)
        setContext(mockData)
        onContextLoaded?.(mockData)
        setCurrentLocale(mockData.tenant.settings.defaultLocale)
      } else {
        setError(apiError)
        onError?.(apiError)
      }
    } finally {
      setIsLoading(false)
    }
  }, [client, tenant, fallbackToDefault, onContextLoaded, onError])

  useEffect(() => {
    fetchContext()
  }, [fetchContext])

  // Load locale from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('cityos-locale') as Locale
      if (savedLocale && context?.tenant.settings.supportedLocales.some(l => l.locale === savedLocale)) {
        setCurrentLocale(savedLocale)
      }
    }
  }, [context])

  // Node navigation helpers
  const findNodeRecursive = useCallback((
    nodes: NodeHierarchy[],
    nodeId: string
  ): NodeHierarchy | null => {
    for (const node of nodes) {
      if (node.id === nodeId) return node
      const found = findNodeRecursive(node.children, nodeId)
      if (found) return found
    }
    return null
  }, [])

  const currentNode = useMemo(() => {
    if (!currentNodeId || !context) return null
    return findNodeRecursive(context.nodeHierarchy, currentNodeId)
  }, [currentNodeId, context, findNodeRecursive])

  const getNodePath = useCallback((nodeId: string): NodeHierarchy[] => {
    if (!context) return []
    const path: NodeHierarchy[] = []
    let current = findNodeRecursive(context.nodeHierarchy, nodeId)

    while (current) {
      path.unshift(current)
      current = current.parent ? findNodeRecursive(context.nodeHierarchy, current.parent) : null
    }

    return path
  }, [context, findNodeRecursive])

  // Locale management
  const setLocale = useCallback((locale: Locale) => {
    const supported = context?.tenant.settings.supportedLocales.map(l => l.locale) ?? ['en']
    if (supported.includes(locale)) {
      setCurrentLocale(locale)
      if (typeof window !== 'undefined') {
        localStorage.setItem('cityos-locale', locale)
      }
    }
  }, [context])

  // Feature and plugin checks
  const hasFeature = useCallback((feature: keyof Capabilities['features']): boolean => {
    if (!context?.capabilities?.features) return false
    const value = context.capabilities.features[feature]
    if (typeof value === 'boolean') return value
    return !!value
  }, [context])

  const hasPlugin = useCallback((plugin: string): boolean => {
    if (!context?.capabilities?.plugins) return false
    const { official, community, custom } = context.capabilities.plugins
    return [...official, ...community, ...custom].includes(plugin)
  }, [context])

  // Generate context headers for API calls
  const getContextHeaders = useCallback((): Record<string, string> => {
    if (!context) return {}

    return {
      'X-CityOS-Correlation-Id': client.getCorrelationId(),
      'X-CityOS-Tenant-Id': context.tenant.id,
      'X-CityOS-Locale': currentLocale,
      'X-CityOS-Channel': 'storefront',
      ...(currentNodeId && { 'X-CityOS-Node-Id': currentNodeId }),
      ...(currentNode && { 'X-CityOS-Node-Type': currentNode.type }),
    }
  }, [context, client, currentLocale, currentNodeId, currentNode])

  // Build context value
  const value = useMemo((): CityOSContextValue => ({
    context,
    tenant: context?.tenant ?? null,
    nodeHierarchy: context?.nodeHierarchy ?? [],
    governance: context?.governanceChain ?? null,
    capabilities: context?.capabilities ?? null,
    systems: context?.systems ?? null,

    isLoading,
    error,
    isDefaultTenant: context?.isDefaultTenant ?? false,
    resolvedAt: context?.resolvedAt ?? null,

    currentLocale,
    supportedLocales: context?.tenant.settings.supportedLocales.map(l => l.locale) ?? ['en'],
    isRTL: currentLocale === 'ar',
    setLocale,

    currentNode,
    setCurrentNode: setCurrentNodeId,
    getNodePath,

    refetch: () => fetchContext(true),
    invalidateCache: () => {
      client.clearCache()
      fetchContext(true)
    },
    getContextHeaders,

    hasFeature,
    hasPlugin,
  }), [
    context,
    isLoading,
    error,
    currentLocale,
    setLocale,
    currentNode,
    getNodePath,
    fetchContext,
    client,
    getContextHeaders,
    hasFeature,
    hasPlugin,
  ])

  return (
    <CityOSContext.Provider value={value}>
      {children}
    </CityOSContext.Provider>
  )
}

// ============================================================================
// Hook
// ============================================================================

export function useCityOS(): CityOSContextValue {
  const context = useContext(CityOSContext)
  
  if (!context) {
    throw new Error('useCityOS must be used within a CityOSProvider')
  }
  
  return context
}

// ============================================================================
// Optional Context Hook (returns null if not in provider)
// ============================================================================

export function useCityOSOptional(): CityOSContextValue | null {
  return useContext(CityOSContext)
}
