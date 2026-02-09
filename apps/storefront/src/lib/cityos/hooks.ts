/**
 * CityOS Platform Context React Hooks
 * 
 * Provides React hooks for accessing platform context, tenant info,
 * governance data, and system capabilities.
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  getCityOSClient,
  CityOSAPIError,
  type CityOSClientConfig,
} from './client'
import type {
  PlatformContext,
  Tenant,
  NodeHierarchy,
  GovernanceChain,
  Capabilities,
  SystemsRegistry,
  RegisteredSystem,
  NodeType,
  Locale,
  SystemCategory,
} from './types'
import { HIERARCHY_LEVELS, DEFAULT_PLATFORM_TENANT } from './types'

// ============================================================================
// Hook State Types
// ============================================================================

interface AsyncState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

interface ContextState extends AsyncState<PlatformContext> {
  refetch: () => Promise<void>
  invalidate: () => void
}

// ============================================================================
// usePlatformContext - Main context hook
// ============================================================================

export function usePlatformContext(
  tenant?: string,
  config?: Partial<CityOSClientConfig>
): ContextState {
  const [state, setState] = useState<AsyncState<PlatformContext>>({
    data: null,
    isLoading: true,
    error: null,
  })

  const client = useMemo(() => getCityOSClient(config), [config])

  const fetchContext = useCallback(async (skipCache = false) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const context = await client.getContext({ tenant, skipCache })
      setState({ data: context, isLoading: false, error: null })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch context')
      setState({ data: null, isLoading: false, error })

      // Try fallback to default tenant on error
      if (tenant && tenant !== 'platform') {
        try {
          const defaultContext = await client.getDefaultTenant()
          setState({ data: defaultContext, isLoading: false, error: null })
        } catch {
          // Keep original error
        }
      }
    }
  }, [client, tenant])

  const refetch = useCallback(async () => {
    await fetchContext(true)
  }, [fetchContext])

  const invalidate = useCallback(() => {
    client.clearCache()
    fetchContext(true)
  }, [client, fetchContext])

  useEffect(() => {
    fetchContext()
  }, [fetchContext])

  return {
    ...state,
    refetch,
    invalidate,
  }
}

// ============================================================================
// useTenant - Tenant-specific hook
// ============================================================================

export function useTenant(tenantSlug?: string): AsyncState<Tenant> & {
  isDefault: boolean
  settings: Tenant['settings'] | null
} {
  const { data, isLoading, error } = usePlatformContext(tenantSlug)

  return {
    data: data?.tenant ?? null,
    isLoading,
    error,
    isDefault: data?.isDefaultTenant ?? false,
    settings: data?.tenant?.settings ?? null,
  }
}

// ============================================================================
// useNodeHierarchy - Node hierarchy navigation
// ============================================================================

export function useNodeHierarchy(tenant?: string): AsyncState<NodeHierarchy[]> & {
  findNode: (nodeId: string) => NodeHierarchy | null
  getNodePath: (nodeId: string) => NodeHierarchy[]
  getNodesByType: (type: NodeType) => NodeHierarchy[]
  getRootNodes: () => NodeHierarchy[]
} {
  const { data: context, isLoading, error } = usePlatformContext(tenant)
  const hierarchy = context?.nodeHierarchy ?? []

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

  const findNode = useCallback((nodeId: string): NodeHierarchy | null => {
    return findNodeRecursive(hierarchy, nodeId)
  }, [hierarchy, findNodeRecursive])

  const getNodePath = useCallback((nodeId: string): NodeHierarchy[] => {
    const path: NodeHierarchy[] = []
    let current = findNode(nodeId)

    while (current) {
      path.unshift(current)
      current = current.parent ? findNode(current.parent) : null
    }

    return path
  }, [findNode])

  const getNodesByType = useCallback((type: NodeType): NodeHierarchy[] => {
    const result: NodeHierarchy[] = []

    const traverse = (nodes: NodeHierarchy[]) => {
      for (const node of nodes) {
        if (node.type === type) result.push(node)
        traverse(node.children)
      }
    }

    traverse(hierarchy)
    return result
  }, [hierarchy])

  const getRootNodes = useCallback((): NodeHierarchy[] => {
    return hierarchy.filter(node => node.parent === null)
  }, [hierarchy])

  return {
    data: hierarchy,
    isLoading,
    error,
    findNode,
    getNodePath,
    getNodesByType,
    getRootNodes,
  }
}

// ============================================================================
// useGovernance - Governance chain hook
// ============================================================================

export function useGovernance(tenant?: string): AsyncState<GovernanceChain> & {
  region: GovernanceChain['region'] | null
  country: GovernanceChain['country'] | null
  authorities: GovernanceChain['authorities']
  policies: GovernanceChain['policies'] | null
} {
  const { data: context, isLoading, error } = usePlatformContext(tenant)
  const governance = context?.governanceChain ?? null

  return {
    data: governance,
    isLoading,
    error,
    region: governance?.region ?? null,
    country: governance?.country ?? null,
    authorities: governance?.authorities ?? [],
    policies: governance?.policies ?? null,
  }
}

// ============================================================================
// useCapabilities - Platform capabilities hook
// ============================================================================

export function useCapabilities(tenant?: string): AsyncState<Capabilities> & {
  hasFeature: (feature: keyof Capabilities['features']) => boolean
  hasPlugin: (pluginName: string) => boolean
  getEndpoint: (path: string) => Capabilities['endpoints'][string] | null
  supportedLocales: Locale[]
} {
  const { data: context, isLoading, error } = usePlatformContext(tenant)
  const capabilities = context?.capabilities ?? null

  const hasFeature = useCallback((feature: keyof Capabilities['features']): boolean => {
    if (!capabilities?.features) return false
    const value = capabilities.features[feature]
    if (typeof value === 'boolean') return value
    return !!value
  }, [capabilities])

  const hasPlugin = useCallback((pluginName: string): boolean => {
    if (!capabilities?.plugins) return false
    const { official, community, custom } = capabilities.plugins
    return [...official, ...community, ...custom].includes(pluginName)
  }, [capabilities])

  const getEndpoint = useCallback((path: string) => {
    return capabilities?.endpoints?.[path] ?? null
  }, [capabilities])

  const supportedLocales = useMemo((): Locale[] => {
    return capabilities?.features?.localization?.locales ?? ['en']
  }, [capabilities])

  return {
    data: capabilities,
    isLoading,
    error,
    hasFeature,
    hasPlugin,
    getEndpoint,
    supportedLocales,
  }
}

// ============================================================================
// useSystems - Systems registry hook
// ============================================================================

export function useSystems(tenant?: string): AsyncState<SystemsRegistry> & {
  getSystem: (systemId: string) => RegisteredSystem | null
  getSystemsByCategory: (category: SystemCategory) => RegisteredSystem[]
  getActiveSystems: () => RegisteredSystem[]
  getExternalSystems: () => RegisteredSystem[]
} {
  const { data: context, isLoading, error } = usePlatformContext(tenant)
  const systems = context?.systems ?? null

  const getSystem = useCallback((systemId: string): RegisteredSystem | null => {
    return systems?.registry.find(s => s.id === systemId) ?? null
  }, [systems])

  const getSystemsByCategory = useCallback((category: SystemCategory): RegisteredSystem[] => {
    return systems?.registry.filter(s => s.category === category) ?? []
  }, [systems])

  const getActiveSystems = useCallback((): RegisteredSystem[] => {
    return systems?.registry.filter(s => s.status === 'active') ?? []
  }, [systems])

  const getExternalSystems = useCallback((): RegisteredSystem[] => {
    return systems?.registry.filter(s => s.type === 'external') ?? []
  }, [systems])

  return {
    data: systems,
    isLoading,
    error,
    getSystem,
    getSystemsByCategory,
    getActiveSystems,
    getExternalSystems,
  }
}

// ============================================================================
// useLocalization - Localization hook
// ============================================================================

export function useLocalization(tenant?: string): {
  currentLocale: Locale
  supportedLocales: Locale[]
  isRTL: boolean
  setLocale: (locale: Locale) => void
  t: (key: string, fallback?: string) => string
} {
  const { data: context } = usePlatformContext(tenant)
  const [currentLocale, setCurrentLocale] = useState<Locale>('en')

  const supportedLocales = useMemo((): Locale[] => {
    return context?.tenant?.settings?.supportedLocales?.map(l => l.locale) ?? ['en']
  }, [context])

  const isRTL = useMemo(() => {
    return currentLocale === 'ar'
  }, [currentLocale])

  useEffect(() => {
    // Set initial locale from tenant settings
    if (context?.tenant?.settings?.defaultLocale) {
      setCurrentLocale(context.tenant.settings.defaultLocale)
    }
  }, [context])

  const setLocale = useCallback((locale: Locale) => {
    if (supportedLocales.includes(locale)) {
      setCurrentLocale(locale)
      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('cityos-locale', locale)
      }
    }
  }, [supportedLocales])

  // Simple translation function (placeholder for full i18n)
  const t = useCallback((key: string, fallback?: string): string => {
    // In a full implementation, this would look up translations
    return fallback ?? key
  }, [])

  return {
    currentLocale,
    supportedLocales,
    isRTL,
    setLocale,
    t,
  }
}

// ============================================================================
// useContextHeaders - Generate context headers for API calls
// ============================================================================

export function useContextHeaders(tenant?: string): {
  headers: Record<string, string>
  getHeaders: (overrides?: Partial<Record<string, string>>) => Record<string, string>
} {
  const { data: context } = usePlatformContext(tenant)
  const client = getCityOSClient()

  const headers = useMemo((): Record<string, string> => {
    if (!context) return {} as Record<string, string>

    const result: Record<string, string> = {
      'X-CityOS-Correlation-Id': client.getCorrelationId(),
      'X-CityOS-Tenant-Id': context.tenant.id,
      'X-CityOS-Locale': context.tenant.settings.defaultLocale,
      'X-CityOS-Channel': 'storefront',
    }
    return result
  }, [context, client])

  const getHeaders = useCallback((
    overrides?: Partial<Record<string, string>>
  ): Record<string, string> => {
    return { ...headers, ...overrides }
  }, [headers])

  return { headers, getHeaders }
}

// ============================================================================
// useHierarchyLevel - Get specific hierarchy level
// ============================================================================

export function useHierarchyLevel(tenant?: string): {
  levels: NodeType[]
  getLevelIndex: (type: NodeType) => number
  isValidLevel: (type: NodeType) => boolean
} {
  const levels = HIERARCHY_LEVELS

  const getLevelIndex = useCallback((type: NodeType): number => {
    return levels.indexOf(type)
  }, [levels])

  const isValidLevel = useCallback((type: NodeType): boolean => {
    return levels.includes(type)
  }, [levels])

  return {
    levels,
    getLevelIndex,
    isValidLevel,
  }
}
