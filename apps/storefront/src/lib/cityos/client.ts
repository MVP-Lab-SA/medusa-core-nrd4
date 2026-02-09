/**
 * CityOS Platform Context API Client
 * 
 * Handles all communication with the Platform Context API endpoints.
 * Implements caching, header propagation, and fallback behavior.
 */

import { v4 as uuidv4 } from 'uuid'
import type {
  PlatformContext,
  PlatformContextResponse,
  DefaultTenantResponse,
  Capabilities,
  CapabilitiesResponse,
  CityOSHeaders,
  Locale,
  NodeType,
} from './types'

// ============================================================================
// Configuration
// ============================================================================

export interface CityOSClientConfig {
  baseUrl: string
  defaultTenant?: string
  defaultLocale?: Locale
  channel?: 'cms' | 'storefront' | 'mobile' | 'api'
  timeout?: number
  enableCache?: boolean
  cacheMaxAge?: number // seconds
}

const DEFAULT_CONFIG: CityOSClientConfig = {
  baseUrl: process.env.CITYOS_API_URL || 'https://cms.dfrnt.dev',
  defaultTenant: 'platform',
  defaultLocale: 'en',
  channel: 'storefront',
  timeout: 10000,
  enableCache: true,
  cacheMaxAge: 60,
}

// ============================================================================
// Cache Implementation
// ============================================================================

interface CacheEntry<T> {
  data: T
  timestamp: number
  maxAge: number
}

class ContextCache {
  private cache = new Map<string, CacheEntry<unknown>>()

  set<T>(key: string, data: T, maxAge: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      maxAge: maxAge * 1000, // Convert to ms
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined
    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp > entry.maxAge
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }
}

const contextCache = new ContextCache()

// ============================================================================
// Header Utilities
// ============================================================================

export function generateCorrelationId(): string {
  return uuidv4()
}

export function buildCityOSHeaders(options: {
  tenantId: string
  correlationId?: string
  nodeId?: string
  nodeType?: NodeType
  locale?: Locale
  userId?: string
  channel?: 'cms' | 'storefront' | 'mobile' | 'api'
  idempotencyKey?: string
  region?: string
  country?: string
}): CityOSHeaders {
  const headers: CityOSHeaders = {
    'X-CityOS-Correlation-Id': options.correlationId || generateCorrelationId(),
    'X-CityOS-Tenant-Id': options.tenantId,
  }

  if (options.nodeId) headers['X-CityOS-Node-Id'] = options.nodeId
  if (options.nodeType) headers['X-CityOS-Node-Type'] = options.nodeType
  if (options.locale) headers['X-CityOS-Locale'] = options.locale
  if (options.userId) headers['X-CityOS-User-Id'] = options.userId
  if (options.channel) headers['X-CityOS-Channel'] = options.channel
  if (options.idempotencyKey) headers['X-Idempotency-Key'] = options.idempotencyKey
  if (options.region) headers['X-CityOS-Region'] = options.region
  if (options.country) headers['X-CityOS-Country'] = options.country

  return headers
}

// ============================================================================
// CityOS API Client Class
// ============================================================================

export class CityOSClient {
  private config: CityOSClientConfig
  private correlationId: string

  constructor(config: Partial<CityOSClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.correlationId = generateCorrelationId()
  }

  /**
   * Set correlation ID for request tracing
   */
  setCorrelationId(id: string): void {
    this.correlationId = id
  }

  /**
   * Get current correlation ID
   */
  getCorrelationId(): string {
    return this.correlationId
  }

  /**
   * Build request headers for API calls
   */
  private buildHeaders(tenantId?: string): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'X-CityOS-Correlation-Id': this.correlationId,
      'X-CityOS-Channel': this.config.channel || 'storefront',
      ...(tenantId && { 'X-CityOS-Tenant-Id': tenantId }),
      ...(this.config.defaultLocale && { 'X-CityOS-Locale': this.config.defaultLocale }),
    }
  }

  /**
   * Generic fetch with timeout and error handling
   */
  private async fetchWithTimeout<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new CityOSAPIError(
          `API request failed: ${response.status} ${response.statusText}`,
          response.status,
          await response.text()
        )
      }

      return response.json()
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * GET /api/platform/context
   * Full context resolution for any tenant
   */
  async getContext(options: {
    tenant?: string
    tenantId?: string
    node?: string
    nodeId?: string
    skipCache?: boolean
  } = {}): Promise<PlatformContext> {
    const tenant = options.tenant || options.tenantId || this.config.defaultTenant
    const cacheKey = `context:${tenant}:${options.node || options.nodeId || ''}`

    // Check cache
    if (this.config.enableCache && !options.skipCache) {
      const cached = contextCache.get<PlatformContext>(cacheKey)
      if (cached) return cached
    }

    // Build URL with query params
    const url = new URL(`${this.config.baseUrl}/api/platform/context`)
    if (tenant) url.searchParams.set('tenant', tenant)
    if (options.node) url.searchParams.set('node', options.node)
    if (options.nodeId) url.searchParams.set('nodeId', options.nodeId)

    const response = await this.fetchWithTimeout<PlatformContextResponse>(
      url.toString(),
      { headers: this.buildHeaders(tenant) }
    )

    if (!response.success) {
      throw new CityOSAPIError('Failed to fetch platform context', 500)
    }

    // Cache the result
    if (this.config.enableCache) {
      contextCache.set(cacheKey, response.data, this.config.cacheMaxAge || 60)
    }

    return response.data
  }

  /**
   * GET /api/platform/tenants/default
   * Always returns the default platform tenant
   */
  async getDefaultTenant(skipCache = false): Promise<DefaultTenantResponse['data']> {
    const cacheKey = 'default-tenant'

    // Check cache
    if (this.config.enableCache && !skipCache) {
      const cached = contextCache.get<DefaultTenantResponse['data']>(cacheKey)
      if (cached) return cached
    }

    const response = await this.fetchWithTimeout<DefaultTenantResponse>(
      `${this.config.baseUrl}/api/platform/tenants/default`,
      { headers: this.buildHeaders() }
    )

    if (!response.success) {
      throw new CityOSAPIError('Failed to fetch default tenant', 500)
    }

    // Cache with longer TTL (300s as per API spec)
    if (this.config.enableCache) {
      contextCache.set(cacheKey, response.data, 300)
    }

    return response.data
  }

  /**
   * GET /api/platform/capabilities
   * Returns all plugin capabilities, enabled features, and available endpoints
   */
  async getCapabilities(skipCache = false): Promise<Capabilities> {
    const cacheKey = 'capabilities'

    // Check cache
    if (this.config.enableCache && !skipCache) {
      const cached = contextCache.get<Capabilities>(cacheKey)
      if (cached) return cached
    }

    const response = await this.fetchWithTimeout<CapabilitiesResponse>(
      `${this.config.baseUrl}/api/platform/capabilities`,
      { headers: this.buildHeaders() }
    )

    if (!response.success) {
      throw new CityOSAPIError('Failed to fetch capabilities', 500)
    }

    // Cache capabilities
    if (this.config.enableCache) {
      contextCache.set(cacheKey, response.data, this.config.cacheMaxAge || 60)
    }

    return response.data
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    contextCache.clear()
  }

  /**
   * Invalidate specific cache entry
   */
  invalidateCache(key: string): void {
    contextCache.delete(key)
  }
}

// ============================================================================
// Error Classes
// ============================================================================

export class CityOSAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public responseBody?: string
  ) {
    super(message)
    this.name = 'CityOSAPIError'
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let clientInstance: CityOSClient | null = null

export function getCityOSClient(config?: Partial<CityOSClientConfig>): CityOSClient {
  if (!clientInstance || config) {
    clientInstance = new CityOSClient(config)
  }
  return clientInstance
}

// ============================================================================
// Convenience Functions
// ============================================================================

export async function fetchPlatformContext(
  tenant?: string,
  options?: { skipCache?: boolean }
): Promise<PlatformContext> {
  const client = getCityOSClient()
  return client.getContext({ tenant, skipCache: options?.skipCache })
}

export async function fetchDefaultTenant(): Promise<DefaultTenantResponse['data']> {
  const client = getCityOSClient()
  return client.getDefaultTenant()
}

export async function fetchCapabilities(): Promise<Capabilities> {
  const client = getCityOSClient()
  return client.getCapabilities()
}
