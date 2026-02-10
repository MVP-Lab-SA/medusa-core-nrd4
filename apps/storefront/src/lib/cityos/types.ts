/**
 * CityOS Platform Context Types
 * Based on Platform Context API Reference
 * 
 * These types define the complete platform context structure for multi-tenant
 * governance, hierarchy, and capability management.
 */

// ============================================================================
// Enums and Constants
// ============================================================================

export type ResidencyZone = 'GCC' | 'EU' | 'MENA' | 'GLOBAL'

export type TenantStatus = 'active' | 'inactive'

export type Locale = 'en' | 'fr' | 'ar'

export type Timezone = 'UTC' | 'Asia/Riyadh' | 'Europe/Paris' | 'Africa/Cairo' | 'Asia/Amman' | 'Europe/Amsterdam' | 'Europe/Madrid' | string

export type Currency = 'USD' | 'SAR' | 'EUR' | 'AED' | 'EGP' | 'JOD' | string

export type NodeType = 'CITY' | 'DISTRICT' | 'ZONE' | 'FACILITY' | 'ASSET'

export type AuthorityType = 'federal' | 'state' | 'municipal' | 'regulatory'

export type SystemType = 'internal' | 'external' | 'stub'

export type SystemCategory = 
  | 'cms' 
  | 'commerce' 
  | 'identity' 
  | 'payments' 
  | 'logistics' 
  | 'analytics' 
  | 'communication' 
  | 'infrastructure' 
  | 'workflow' 
  | 'erp' 
  | 'storage'

export type SystemStatus = 'active' | 'planned' | 'deprecated'

export type AuthMethod = 'api-key' | 'oauth2' | 'none' | 'hmac'

// ============================================================================
// Tenant Types
// ============================================================================

export interface LocaleConfig {
  locale: Locale
  name?: string
  direction?: 'ltr' | 'rtl'
}

export interface TenantSettings {
  defaultLocale: Locale
  supportedLocales: LocaleConfig[]
  timezone: Timezone
  currency: Currency
}

export interface Tenant {
  id: string
  name: string
  slug: string
  domain: string
  residencyZone: ResidencyZone
  status: TenantStatus
  description?: string
  settings: TenantSettings
}

// ============================================================================
// Node Hierarchy Types
// ============================================================================

export interface Coordinates {
  lat: number
  lng: number
}

export interface NodeMetadata {
  [key: string]: unknown
}

export interface NodeHierarchy {
  id: string
  name: string
  code: string // e.g., 'RYD-001'
  type: NodeType
  slug: string
  status: 'active' | 'inactive'
  coordinates?: Coordinates
  parent: string | null
  children: NodeHierarchy[]
  metadata?: NodeMetadata
}

// ============================================================================
// Governance Types
// ============================================================================

export interface Region {
  id: string
  name: string
  code: string // e.g., 'GCC'
  residencyZone: ResidencyZone
}

export interface CountrySettings {
  [key: string]: unknown
}

export interface Country {
  id: string
  name: string
  code: string // ISO code, e.g., 'AE', 'SA'
  settings: CountrySettings
}

export interface Jurisdiction {
  scope?: string
  regions?: string[]
  nodes?: string[]
  [key: string]: unknown
}

export interface GovernanceAuthority {
  id: string
  name: string
  code: string
  type: AuthorityType
  jurisdiction: Jurisdiction
}

export interface DataResidencyPolicy {
  zone: ResidencyZone
  requirements?: string[]
  [key: string]: unknown
}

export interface CompliancePolicy {
  frameworks?: string[]
  certifications?: string[]
  [key: string]: unknown
}

export interface ClassificationPolicy {
  levels?: string[]
  defaultLevel?: string
  [key: string]: unknown
}

export interface GovernancePolicies {
  dataResidency: DataResidencyPolicy
  compliance: CompliancePolicy
  classification: ClassificationPolicy
}

export interface GovernanceChain {
  region: Region
  country: Country
  authorities: GovernanceAuthority[]
  policies: GovernancePolicies
}

// ============================================================================
// Capabilities Types
// ============================================================================

export interface Plugins {
  official: string[]
  community: string[]
  custom: string[]
}

export interface LocalizationFeature {
  locales: Locale[]
  defaultLocale: Locale
}

export interface Features {
  twoFactorAuth: boolean
  rbac: boolean
  multiTenancy: boolean
  localization: LocalizationFeature
  objectStorage: boolean
  videoProcessing: boolean
  openApiDocs: boolean
  aiContent: boolean
  analytics: boolean
  payments: boolean
  errorTracking: boolean
  workflowOrchestration: boolean
}

export interface EndpointMap {
  [path: string]: {
    methods: string[]
    auth: string
    purpose: string
  }
}

export interface Capabilities {
  plugins: Plugins
  features: Features
  endpoints: EndpointMap
}

// ============================================================================
// Systems Registry Types
// ============================================================================

export interface RegisteredSystem {
  id: string
  name: string
  type: SystemType
  category: SystemCategory
  status: SystemStatus
  capabilities: string[]
  hasBaseUrl: boolean
  authMethod?: AuthMethod
  baseUrl?: string
}

export interface SystemsRegistry {
  total: number
  active: number
  external: number
  registry: RegisteredSystem[]
}

// ============================================================================
// Context Headers
// ============================================================================

export type ContextHeader =
  | 'X-CityOS-Correlation-Id'
  | 'X-CityOS-Tenant-Id'
  | 'X-CityOS-Node-Id'
  | 'X-CityOS-Node-Type'
  | 'X-CityOS-Locale'
  | 'X-CityOS-User-Id'
  | 'X-CityOS-Channel'
  | 'X-Idempotency-Key'
  | 'X-CityOS-Region'
  | 'X-CityOS-Country'
  | 'X-CityOS-Platform-Tenant-Id'
  | 'X-CityOS-Is-Default-Tenant'

export const HIERARCHY_LEVELS: NodeType[] = ['CITY', 'DISTRICT', 'ZONE', 'FACILITY', 'ASSET']

// ============================================================================
// API Response Types
// ============================================================================

export interface PlatformContextResponse {
  success: boolean
  data: PlatformContext
}

export interface PlatformContext {
  tenant: Tenant
  nodeHierarchy: NodeHierarchy[]
  governanceChain: GovernanceChain
  capabilities: Capabilities
  systems: SystemsRegistry
  contextHeaders: ContextHeader[]
  hierarchyLevels: NodeType[]
  resolvedAt: string // ISO date
  isDefaultTenant: boolean
}

export interface DefaultTenantResponse {
  success: boolean
  data: PlatformContext & {
    usage: {
      description: string
      headers: Record<string, string>
      bootstrapUrl: string
    }
  }
}

export interface CapabilitiesResponse {
  success: boolean
  data: Capabilities
}

// ============================================================================
// Request Headers Types
// ============================================================================

export interface CityOSHeaders {
  'X-CityOS-Correlation-Id': string
  'X-CityOS-Tenant-Id': string
  'X-CityOS-Node-Id'?: string
  'X-CityOS-Node-Type'?: NodeType
  'X-CityOS-Locale'?: Locale
  'X-CityOS-User-Id'?: string
  'X-CityOS-Channel'?: 'cms' | 'storefront' | 'mobile' | 'api'
  'X-Idempotency-Key'?: string
  'X-CityOS-Region'?: string
  'X-CityOS-Country'?: string
}

// ============================================================================
// Known Tenants
// ============================================================================

export const KNOWN_TENANTS = [
  'platform',
  'riyadh',
  'dubai',
  'jeddah',
  'barcelona',
  'amsterdam',
  'cairo',
  'amman',
  'demo',
  'enterprise',
] as const

export type KnownTenant = typeof KNOWN_TENANTS[number]

// ============================================================================
// Default Platform Tenant Configuration
// ============================================================================

export const DEFAULT_PLATFORM_TENANT: Partial<Tenant> = {
  slug: 'platform',
  domain: 'platform.cityos.dev',
  residencyZone: 'GLOBAL',
  status: 'active',
  settings: {
    defaultLocale: 'en',
    supportedLocales: [
      { locale: 'en', name: 'English', direction: 'ltr' },
      { locale: 'fr', name: 'Francais', direction: 'ltr' },
      { locale: 'ar', name: 'Arabic', direction: 'rtl' },
    ],
    timezone: 'UTC',
    currency: 'USD',
  },
}

// ============================================================================
// System IDs (22 Registered Systems)
// ============================================================================

export const SYSTEM_IDS = {
  CMS_PAYLOAD: 'cms-payload',
  CMS_BFF: 'cms-bff',
  COMMERCE_MEDUSA: 'commerce-medusa',
  IDENTITY_AUTH: 'identity-auth',
  PAYMENTS_STRIPE: 'payments-stripe',
  ANALYTICS_INTERNAL: 'analytics-internal',
  COMMUNICATION_EMAIL: 'communication-email',
  COMMUNICATION_SMS: 'communication-sms',
  INFRA_DATABASE: 'infra-database',
  INFRA_CACHE: 'infra-cache',
  INFRA_STORAGE: 'infra-storage',
  OBSERVABILITY_HEALTH: 'observability-health',
  OBSERVABILITY_METRICS: 'observability-metrics',
  SEARCH_ELASTICSEARCH: 'search-elasticsearch',
  GEO_MAPPING: 'geo-mapping',
  AI_RECOMMENDATIONS: 'ai-recommendations',
  LOGISTICS_DELIVERY: 'logistics-delivery',
  IOT_PLATFORM: 'iot-platform',
  SOCIAL_PLATFORM: 'social-platform',
  WORKFLOW_TEMPORAL: 'workflow-temporal',
  ERP_ERPNEXT: 'erp-erpnext',
  LOGISTICS_FLEETBASE: 'logistics-fleetbase',
} as const

export type SystemId = typeof SYSTEM_IDS[keyof typeof SYSTEM_IDS]
