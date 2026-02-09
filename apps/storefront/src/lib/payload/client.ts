/**
 * Payload CMS Client
 * 
 * Tenant-aware client for fetching content from Payload CMS.
 * Tenant is resolved from subdomain/domain via middleware.
 */

import type {
  Page,
  POI,
  POIPrimaryCategory,
  Navigation,
  Tenant,
  Node,
  NodeType,
  PageTemplate,
  PayloadPaginatedResponse,
  SiteSettings,
  PlatformContext,
  PlatformContextResponse,
} from './types';

// =============================================================================
// CONFIGURATION
// =============================================================================

// Default to the Replit Payload CMS URL
const PAYLOAD_API_URL = process.env.PAYLOAD_CMS_URL || 
  'https://9e78ac41-ae95-440f-9196-e9263c6eadda-00-130jbk279zua2.janeway.replit.dev';
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
   * Build request headers with CityOS tenant context
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

    // CityOS platform headers
    if (this.tenant) {
      headers['X-CityOS-Tenant-Id'] = this.tenant;
    }
    
    headers['X-CityOS-Locale'] = this.locale;
    headers['X-CityOS-Channel'] = 'storefront';

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
  // PLATFORM CONTEXT METHODS (CityOS)
  // ===========================================================================

  /**
   * Get full platform context for a tenant
   * Returns tenant config, ancestry, governance chain, capabilities, and systems
   */
  async getPlatformContext(tenantSlug?: string): Promise<PlatformContext | null> {
    try {
      const tenant = tenantSlug || this.tenant || 'platform';
      const response = await this.fetch<PlatformContextResponse>(
        '/api/platform/context',
        {
          params: { tenant },
          cache: true,
          revalidate: 5 * 60 * 1000, // 5 minutes for context
        }
      );
      return response.success ? response.data || null : null;
    } catch {
      return null;
    }
  }

  /**
   * Get tenant hierarchy for multi-site navigation
   */
  async getTenantHierarchy(): Promise<Tenant[]> {
    try {
      const result = await this.fetch<{ tenants: Tenant[] }>(
        '/api/platform/tenants/hierarchy'
      );
      return result.tenants || [];
    } catch {
      return [];
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
   * Alias for getPage - get page by slug
   */
  async getPageBySlug(slug: string): Promise<Page | null> {
    return this.getPage(slug);
  }

  /**
   * Get all published pages
   */
  async getPages(options: { limit?: number; page?: number } = {}): Promise<PayloadPaginatedResponse<Page>> {
    return this.fetch<PayloadPaginatedResponse<Page>>('/api/pages', {
      params: {
        'where[status][equals]': 'published',
        depth: 1,
        limit: options.limit || 100,
        page: options.page || 1,
      },
    });
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
   * Alias for getPOI - get POI by slug
   */
  async getPOIBySlug(slug: string): Promise<POI | null> {
    return this.getPOI(slug);
  }

  /**
   * Get all active POIs
   */
  async getPOIs(options: { limit?: number; page?: number; category?: POIPrimaryCategory } = {}): Promise<PayloadPaginatedResponse<POI>> {
    const params: Record<string, string | number | undefined> = {
      'where[status][equals]': 'active',
      depth: 1,
      limit: options.limit || 20,
      page: options.page || 1,
    };

    if (options.category) {
      params['where[primaryCategory][equals]'] = options.category;
    }

    return this.fetch<PayloadPaginatedResponse<POI>>('/api/pois', { params });
  }

  /**
   * Get POIs by category
   */
  async getPOIsByCategory(
    category: POIPrimaryCategory,
    options: { limit?: number; page?: number; nodeId?: string } = {}
  ): Promise<PayloadPaginatedResponse<POI>> {
    const params: Record<string, string | number | undefined> = {
      'where[primaryCategory][equals]': category,
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
    options: { limit?: number; page?: number; category?: POIPrimaryCategory } = {}
  ): Promise<PayloadPaginatedResponse<POI>> {
    const params: Record<string, string | number | undefined> = {
      'where[node][equals]': nodeId,
      'where[status][equals]': 'active',
      depth: 1,
      limit: options.limit || 10,
      page: options.page || 1,
    };

    if (options.category) {
      params['where[primaryCategory][equals]'] = options.category;
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
    options: { limit?: number; category?: POIPrimaryCategory } = {}
  ): Promise<POI[]> {
    const params: Record<string, string | number | undefined> = {
      'where[name][contains]': query,
      'where[status][equals]': 'active',
      depth: 1,
      limit: options.limit || 20,
    };

    if (options.category) {
      params['where[primaryCategory][equals]'] = options.category;
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
  // NAVIGATION METHODS (Global)
  // ===========================================================================

  /**
   * Get navigation global
   * Navigation is a Payload global, not a collection
   */
  async getNavigation(): Promise<Navigation | null> {
    try {
      return await this.fetch<Navigation>('/api/globals/navigation', {
        params: { depth: 3 },
      });
    } catch {
      return null;
    }
  }

  /**
   * Get main menu items
   */
  async getMainMenu(): Promise<Navigation['mainMenu']> {
    const nav = await this.getNavigation();
    return nav?.mainMenu || [];
  }

  /**
   * Get footer menu items
   */
  async getFooterMenu(): Promise<Navigation['footerMenu']> {
    const nav = await this.getNavigation();
    return nav?.footerMenu || [];
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
   * Get site settings global
   */
  async getSiteSettings(): Promise<SiteSettings | null> {
    try {
      return await this.fetch<SiteSettings>('/api/globals/site-settings');
    } catch {
      return null;
    }
  }

  // ===========================================================================
  // ANNOUNCEMENTS METHODS
  // ===========================================================================

  /**
   * Get active announcements
   */
  async getAnnouncements(): Promise<Record<string, unknown>[]> {
    try {
      const result = await this.fetch<PayloadPaginatedResponse<Record<string, unknown>>>(
        '/api/announcements',
        {
          params: {
            'where[status][equals]': 'active',
            sort: '-priority',
            depth: 1,
            limit: 10,
          },
        }
      );
      return result.docs;
    } catch {
      return [];
    }
  }

  // ===========================================================================
  // LABELS/TRANSLATIONS METHODS
  // ===========================================================================

  /**
   * Get labels for a locale
   */
  async getLabels(locale?: string): Promise<Record<string, unknown> | null> {
    try {
      return await this.fetch<Record<string, unknown>>(
        '/api/globals/labels',
        {
          params: locale ? { locale } : undefined,
        }
      );
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
