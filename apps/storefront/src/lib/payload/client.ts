/**
 * Payload CMS Client
 * 
 * Tenant-aware client for fetching content from Payload CMS.
 * Tenant is resolved from subdomain/domain via middleware.
 */

import type {
  Page,
  POI,
  POICategory,
  Navigation,
  NavigationType,
  Tenant,
  Node,
  NodeType,
  PageTemplate,
  PayloadPaginatedResponse,
  SiteGlobals,
} from './types';

// =============================================================================
// CONFIGURATION
// =============================================================================

const PAYLOAD_API_URL = process.env.PAYLOAD_CMS_URL || 'https://cms.cityos.dev';
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY;

// Cache configuration
const CACHE_TTL = 60 * 1000; // 1 minute
const cache = new Map<string, { data: unknown; timestamp: number }>();

// =============================================================================
// CLIENT CLASS
// =============================================================================

export class PayloadClient {
  private baseUrl: string;
  private tenant: string | null = null;
  private locale: string = 'en';

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || PAYLOAD_API_URL;
  }

  /**
   * Set the current tenant context
   */
  setTenant(tenant: string): this {
    this.tenant = tenant;
    return this;
  }

  /**
   * Set the current locale
   */
  setLocale(locale: string): this {
    this.locale = locale;
    return this;
  }

  /**
   * Build request headers with tenant context
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': this.locale,
    };

    if (PAYLOAD_API_KEY) {
      headers['Authorization'] = `Bearer ${PAYLOAD_API_KEY}`;
    }

    if (this.tenant) {
      headers['X-Tenant-ID'] = this.tenant;
      headers['X-Tenant-Slug'] = this.tenant;
    }

    return headers;
  }

  /**
   * Make a cached API request
   */
  private async fetch<T>(
    endpoint: string,
    options: {
      params?: Record<string, string | number | boolean | undefined>;
      cache?: boolean;
      revalidate?: number;
    } = {}
  ): Promise<T> {
    const { params, cache: useCache = true, revalidate = CACHE_TTL } = options;

    // Build URL with query params
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    // Add tenant to query if set
    if (this.tenant) {
      url.searchParams.set('tenant', this.tenant);
    }

    const cacheKey = `${this.tenant || 'default'}:${url.toString()}`;

    // Check cache
    if (useCache) {
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < revalidate) {
        return cached.data as T;
      }
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new PayloadError(
          `Payload API error: ${response.status} ${response.statusText}`,
          response.status
        );
      }

      const data = await response.json();

      // Cache response
      if (useCache) {
        cache.set(cacheKey, { data, timestamp: Date.now() });
      }

      return data as T;
    } catch (error) {
      if (error instanceof PayloadError) {
        throw error;
      }
      throw new PayloadError(
        `Failed to fetch from Payload: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      );
    }
  }

  // ===========================================================================
  // TENANT METHODS
  // ===========================================================================

  /**
   * Get tenant by domain or subdomain
   */
  async getTenantByDomain(domain: string): Promise<Tenant | null> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<Tenant>>(
        '/api/tenants',
        {
          params: {
            'where[domain][equals]': domain,
            limit: 1,
          },
        }
      );
      return result.docs[0] || null;
    } catch {
      return null;
    }
  }

  /**
   * Get tenant by slug
   */
  async getTenantBySlug(slug: string): Promise<Tenant | null> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<Tenant>>(
        '/api/tenants',
        {
          params: {
            'where[slug][equals]': slug,
            limit: 1,
          },
        }
      );
      return result.docs[0] || null;
    } catch {
      return null;
    }
  }

  // ===========================================================================
  // PAGE METHODS
  // ===========================================================================

  /**
   * Get page by slug
   */
  async getPage(slug: string): Promise<Page | null> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<Page>>(
        '/api/pages',
        {
          params: {
            'where[slug][equals]': slug,
            'where[status][equals]': 'published',
            depth: 2,
            limit: 1,
          },
        }
      );
      return result.docs[0] || null;
    } catch {
      return null;
    }
  }

  /**
   * Get pages by template type
   */
  async getPagesByTemplate(
    templateType: string,
    options: { limit?: number; page?: number } = {}
  ): Promise<PayloadPaginatedResponse<Page>> {
    return this.fetch<PayloadPaginatedResponse<Page>>('/api/pages', {
      params: {
        'where[template.type][equals]': templateType,
        'where[status][equals]': 'published',
        depth: 1,
        limit: options.limit || 10,
        page: options.page || 1,
      },
    });
  }

  /**
   * Get pages by node
   */
  async getPagesByNode(
    nodeId: string,
    options: { limit?: number; page?: number } = {}
  ): Promise<PayloadPaginatedResponse<Page>> {
    return this.fetch<PayloadPaginatedResponse<Page>>('/api/pages', {
      params: {
        'where[node][equals]': nodeId,
        'where[status][equals]': 'published',
        depth: 1,
        limit: options.limit || 10,
        page: options.page || 1,
      },
    });
  }

  // ===========================================================================
  // POI METHODS
  // ===========================================================================

  /**
   * Get POI by slug
   */
  async getPOI(slug: string): Promise<POI | null> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<POI>>(
        '/api/pois',
        {
          params: {
            'where[slug][equals]': slug,
            'where[status][equals]': 'active',
            depth: 2,
            limit: 1,
          },
        }
      );
      return result.docs[0] || null;
    } catch {
      return null;
    }
  }

  /**
   * Get POIs by category
   */
  async getPOIsByCategory(
    category: POICategory,
    options: { limit?: number; page?: number; nodeId?: string } = {}
  ): Promise<PayloadPaginatedResponse<POI>> {
    const params: Record<string, string | number | undefined> = {
      'where[category][equals]': category,
      'where[status][equals]': 'active',
      depth: 1,
      limit: options.limit || 10,
      page: options.page || 1,
    };

    if (options.nodeId) {
      params['where[node][equals]'] = options.nodeId;
    }

    return this.fetch<PayloadPaginatedResponse<POI>>('/api/pois', { params });
  }

  /**
   * Get POIs by node (location)
   */
  async getPOIsByNode(
    nodeId: string,
    options: { limit?: number; page?: number; category?: POICategory } = {}
  ): Promise<PayloadPaginatedResponse<POI>> {
    const params: Record<string, string | number | undefined> = {
      'where[node][equals]': nodeId,
      'where[status][equals]': 'active',
      depth: 1,
      limit: options.limit || 10,
      page: options.page || 1,
    };

    if (options.category) {
      params['where[category][equals]'] = options.category;
    }

    return this.fetch<PayloadPaginatedResponse<POI>>('/api/pois', { params });
  }

  /**
   * Get featured POIs
   */
  async getFeaturedPOIs(limit: number = 6): Promise<POI[]> {
    const result = await this.fetch<PayloadPaginatedResponse<POI>>(
      '/api/pois',
      {
        params: {
          'where[status][equals]': 'active',
          sort: '-rating.average',
          depth: 1,
          limit,
        },
      }
    );
    return result.docs;
  }

  /**
   * Search POIs
   */
  async searchPOIs(
    query: string,
    options: { limit?: number; category?: POICategory } = {}
  ): Promise<POI[]> {
    const params: Record<string, string | number | undefined> = {
      'where[name][contains]': query,
      'where[status][equals]': 'active',
      depth: 1,
      limit: options.limit || 20,
    };

    if (options.category) {
      params['where[category][equals]'] = options.category;
    }

    const result = await this.fetch<PayloadPaginatedResponse<POI>>(
      '/api/pois',
      { params }
    );
    return result.docs;
  }

  // ===========================================================================
  // NODE METHODS
  // ===========================================================================

  /**
   * Get node by slug
   */
  async getNode(slug: string): Promise<Node | null> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<Node>>(
        '/api/nodes',
        {
          params: {
            'where[slug][equals]': slug,
            depth: 2,
            limit: 1,
          },
        }
      );
      return result.docs[0] || null;
    } catch {
      return null;
    }
  }

  /**
   * Get node by code
   */
  async getNodeByCode(code: string): Promise<Node | null> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<Node>>(
        '/api/nodes',
        {
          params: {
            'where[code][equals]': code,
            depth: 2,
            limit: 1,
          },
        }
      );
      return result.docs[0] || null;
    } catch {
      return null;
    }
  }

  /**
   * Get nodes by type
   */
  async getNodesByType(
    type: NodeType,
    options: { parentId?: string; limit?: number } = {}
  ): Promise<Node[]> {
    const params: Record<string, string | number | undefined> = {
      'where[type][equals]': type,
      'where[status][equals]': 'active',
      depth: 1,
      limit: options.limit || 50,
    };

    if (options.parentId) {
      params['where[parent][equals]'] = options.parentId;
    }

    const result = await this.fetch<PayloadPaginatedResponse<Node>>(
      '/api/nodes',
      { params }
    );
    return result.docs;
  }

  /**
   * Get node hierarchy (children)
   */
  async getNodeChildren(nodeId: string): Promise<Node[]> {
    const result = await this.fetch<PayloadPaginatedResponse<Node>>(
      '/api/nodes',
      {
        params: {
          'where[parent][equals]': nodeId,
          'where[status][equals]': 'active',
          depth: 1,
          limit: 100,
        },
      }
    );
    return result.docs;
  }

  /**
   * Get root nodes (cities)
   */
  async getRootNodes(): Promise<Node[]> {
    return this.getNodesByType('CITY');
  }

  // ===========================================================================
  // NAVIGATION METHODS
  // ===========================================================================

  /**
   * Get navigation by type
   */
  async getNavigation(type: NavigationType): Promise<Navigation | null> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<Navigation>>(
        '/api/navigation',
        {
          params: {
            'where[type][equals]': type,
            depth: 3,
            limit: 1,
          },
        }
      );
      return result.docs[0] || null;
    } catch {
      return null;
    }
  }

  /**
   * Get header navigation
   */
  async getHeaderNavigation(): Promise<Navigation | null> {
    return this.getNavigation('header');
  }

  /**
   * Get footer navigation
   */
  async getFooterNavigation(): Promise<Navigation | null> {
    return this.getNavigation('footer');
  }

  /**
   * Get all navigations
   */
  async getAllNavigations(): Promise<Navigation[]> {
    const result = await this.fetch<PayloadPaginatedResponse<Navigation>>(
      '/api/navigation',
      {
        params: {
          depth: 3,
          limit: 10,
        },
      }
    );
    return result.docs;
  }

  // ===========================================================================
  // TEMPLATE METHODS
  // ===========================================================================

  /**
   * Get template by slug
   */
  async getTemplate(slug: string): Promise<PageTemplate | null> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<PageTemplate>>(
        '/api/templates',
        {
          params: {
            'where[slug][equals]': slug,
            depth: 1,
            limit: 1,
          },
        }
      );
      return result.docs[0] || null;
    } catch {
      return null;
    }
  }

  // ===========================================================================
  // GLOBALS METHODS
  // ===========================================================================

  /**
   * Get site globals
   */
  async getSiteGlobals(): Promise<SiteGlobals | null> {
    try {
      return await this.fetch<SiteGlobals>('/api/globals/site-settings');
    } catch {
      return null;
    }
  }

  // ===========================================================================
  // UTILITY METHODS
  // ===========================================================================

  /**
   * Clear cache
   */
  clearCache(): void {
    cache.clear();
  }

  /**
   * Clear cache for specific key pattern
   */
  clearCachePattern(pattern: string): void {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  }
}

// =============================================================================
// ERROR CLASS
// =============================================================================

export class PayloadError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'PayloadError';
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

let clientInstance: PayloadClient | null = null;

export function getPayloadClient(): PayloadClient {
  if (!clientInstance) {
    clientInstance = new PayloadClient();
  }
  return clientInstance;
}

/**
 * Create a tenant-scoped client
 */
export function createTenantClient(tenant: string, locale?: string): PayloadClient {
  const client = new PayloadClient();
  client.setTenant(tenant);
  if (locale) {
    client.setLocale(locale);
  }
  return client;
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { PayloadClient as PayloadClientType };
