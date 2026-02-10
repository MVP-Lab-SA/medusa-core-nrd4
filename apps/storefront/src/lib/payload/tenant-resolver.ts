/**
 * Tenant Resolver
 * 
 * Resolves tenant from subdomain or custom domain.
 * Examples:
 * - riyadh.cityos.sa -> tenant: riyadh
 * - dubai.cityos.ae -> tenant: dubai
 * - shop.riyadh.gov.sa -> tenant: riyadh (custom domain)
 */

import { getPayloadClient } from './client';
import type { Tenant } from './types';

// =============================================================================
// TYPES
// =============================================================================

export interface TenantContext {
  tenant: Tenant | null;
  tenantSlug: string;
  locale: string;
  isDefault: boolean;
  domain: string;
  subdomain: string | null;
}

export interface TenantMapping {
  pattern: RegExp;
  tenantSlug: string;
  locale?: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Default tenant when none can be resolved
 */
const DEFAULT_TENANT_SLUG = 'platform';

/**
 * Default locale
 */
const DEFAULT_LOCALE = 'en';

/**
 * Known domain patterns for tenant resolution
 * Order matters - first match wins
 */
const DOMAIN_PATTERNS: TenantMapping[] = [
  // Production domains
  { pattern: /^(\w+)\.cityos\.sa$/, tenantSlug: '$1', locale: 'ar' },
  { pattern: /^(\w+)\.cityos\.ae$/, tenantSlug: '$1', locale: 'ar' },
  { pattern: /^(\w+)\.cityos\.dev$/, tenantSlug: '$1' },
  
  // Custom government domains
  { pattern: /^shop\.riyadh\.gov\.sa$/, tenantSlug: 'riyadh', locale: 'ar' },
  { pattern: /^marketplace\.dubai\.gov\.ae$/, tenantSlug: 'dubai', locale: 'ar' },
  
  // Development/staging patterns
  { pattern: /^(\w+)\.staging\.cityos\.dev$/, tenantSlug: '$1' },
  { pattern: /^(\w+)\.preview\.cityos\.dev$/, tenantSlug: '$1' },
  
  // Localhost development
  { pattern: /^(\w+)\.localhost$/, tenantSlug: '$1' },
  { pattern: /^localhost$/, tenantSlug: DEFAULT_TENANT_SLUG },
  
  // Sandbox/preview environments (Medusa Bloom)
  { pattern: /^sb-[\w]+\.ai\.prod\.medusajs\.cloud$/, tenantSlug: DEFAULT_TENANT_SLUG },
];

/**
 * Locale mappings from URL path or subdomain
 */
const LOCALE_MAP: Record<string, string> = {
  'en': 'en',
  'ar': 'ar',
  'us': 'en',
  'sa': 'ar',
  'ae': 'ar',
  'uk': 'en',
};

// =============================================================================
// TENANT RESOLUTION
// =============================================================================

/**
 * Extract subdomain from hostname
 */
export function extractSubdomain(hostname: string): string | null {
  const parts = hostname.split('.');
  
  // Need at least 3 parts for a subdomain (sub.domain.tld)
  if (parts.length < 3) {
    return null;
  }
  
  // Skip common subdomains that aren't tenant identifiers
  const skipSubdomains = ['www', 'api', 'admin', 'cms', 'staging', 'preview'];
  const subdomain = parts[0];
  
  if (skipSubdomains.includes(subdomain)) {
    return null;
  }
  
  return subdomain;
}

/**
 * Resolve tenant slug from hostname
 */
export function resolveTenantSlug(hostname: string): { slug: string; locale?: string } {
  // Check against known patterns
  for (const { pattern, tenantSlug, locale } of DOMAIN_PATTERNS) {
    const match = hostname.match(pattern);
    if (match) {
      // Replace $1, $2, etc. with capture groups
      const resolvedSlug = tenantSlug.replace(/\$(\d+)/g, (_, index) => {
        return match[parseInt(index)] || '';
      });
      return { slug: resolvedSlug, locale };
    }
  }
  
  // Fallback: try to extract subdomain
  const subdomain = extractSubdomain(hostname);
  if (subdomain) {
    return { slug: subdomain };
  }
  
  // Default tenant
  return { slug: DEFAULT_TENANT_SLUG };
}

/**
 * Resolve locale from various sources
 */
export function resolveLocale(
  pathLocale?: string,
  headerLocale?: string,
  tenantLocale?: string
): string {
  // Priority: path > header > tenant > default
  const locale = pathLocale || headerLocale || tenantLocale || DEFAULT_LOCALE;
  return LOCALE_MAP[locale] || locale;
}

/**
 * Full tenant context resolution
 */
export async function resolveTenantContext(
  hostname: string,
  options: {
    pathLocale?: string;
    acceptLanguage?: string;
  } = {}
): Promise<TenantContext> {
  const { slug, locale: domainLocale } = resolveTenantSlug(hostname);
  const subdomain = extractSubdomain(hostname);
  
  // Resolve locale
  const locale = resolveLocale(
    options.pathLocale,
    options.acceptLanguage?.split(',')[0]?.split('-')[0],
    domainLocale
  );
  
  // Try to fetch full tenant from CMS
  let tenant: Tenant | null = null;
  try {
    const client = getPayloadClient();
    tenant = await client.getTenantBySlug(slug);
  } catch {
    // Tenant fetch failed, continue with slug only
  }
  
  return {
    tenant,
    tenantSlug: slug,
    locale,
    isDefault: slug === DEFAULT_TENANT_SLUG,
    domain: hostname,
    subdomain,
  };
}

// =============================================================================
// SERVER-SIDE HELPERS
// =============================================================================

/**
 * Get tenant context from request headers (TanStack Start)
 */
export function getTenantFromRequest(request: Request): { slug: string; locale: string } {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // Check for tenant header override (useful for testing)
  const tenantHeader = request.headers.get('X-Tenant-Slug');
  if (tenantHeader) {
    const localeHeader = request.headers.get('X-Locale') || DEFAULT_LOCALE;
    return { slug: tenantHeader, locale: localeHeader };
  }
  
  const { slug, locale } = resolveTenantSlug(hostname);
  const acceptLanguage = request.headers.get('Accept-Language');
  const resolvedLocale = resolveLocale(
    undefined,
    acceptLanguage?.split(',')[0]?.split('-')[0],
    locale
  );
  
  return { slug, locale: resolvedLocale };
}

/**
 * Create tenant-scoped headers for API requests
 */
export function createTenantHeaders(
  tenantSlug: string,
  locale: string = DEFAULT_LOCALE
): Record<string, string> {
  return {
    'X-Tenant-ID': tenantSlug,
    'X-Tenant-Slug': tenantSlug,
    'Accept-Language': locale,
    'X-Locale': locale,
  };
}

// =============================================================================
// CLIENT-SIDE HELPERS
// =============================================================================

/**
 * Get tenant context from current browser location
 */
export function getTenantFromWindow(): { slug: string; locale?: string } | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return resolveTenantSlug(window.location.hostname);
}

/**
 * Build URL with tenant context
 * Since tenant is in subdomain, this mainly handles locale in path
 */
export function buildTenantUrl(
  path: string,
  options: {
    locale?: string;
    includeLocale?: boolean;
  } = {}
): string {
  const { locale, includeLocale = false } = options;
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Optionally prefix with locale
  if (includeLocale && locale) {
    return `/${locale}${normalizedPath}`;
  }
  
  return normalizedPath;
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  DEFAULT_TENANT_SLUG,
  DEFAULT_LOCALE,
  DOMAIN_PATTERNS,
  LOCALE_MAP,
};
