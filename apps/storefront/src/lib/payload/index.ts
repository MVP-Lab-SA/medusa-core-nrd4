/**
 * Payload CMS Integration
 * 
 * Complete integration layer for Payload CMS with:
 * - Tenant-aware client
 * - Domain/subdomain tenant resolution
 * - Type definitions for all collections
 */

// Client
export {
  PayloadClient,
  PayloadError,
  getPayloadClient,
  createTenantClient,
} from './client';

// Tenant resolver
export {
  resolveTenantContext,
  resolveTenantSlug,
  resolveLocale,
  extractSubdomain,
  getTenantFromRequest,
  getTenantFromWindow,
  createTenantHeaders,
  buildTenantUrl,
  DEFAULT_TENANT_SLUG,
  DEFAULT_LOCALE,
} from './tenant-resolver';

// Types
export type {
  // Base types
  PayloadDocument,
  PayloadMedia,
  PayloadRichText,
  RichTextNode,
  PayloadPaginatedResponse,
  PayloadResponse,
  
  // Tenant & Nodes
  Tenant,
  TenantConfig,
  TenantAncestor,
  TenantSettings,
  TenantTier,
  ResidencyZone,
  Node,
  NodeType,
  NodeHierarchy,
  
  // Platform Context
  PlatformContext,
  PlatformContextResponse,
  PlatformCapabilities,
  GovernanceChain,
  SystemInfo,
  SystemsOverview,
  
  // Pages
  Page,
  PageStatus,
  ReviewStatus,
  PageTemplate,
  TemplateType,
  TemplateRegion,
  BreadcrumbItem,
  
  // POIs
  POI,
  POIType,
  POIPrimaryCategory,
  POISource,
  BusinessStatus,
  PriceLevel,
  StewardshipState,
  POIStewardship,
  OperatingHours,
  
  // Navigation
  Navigation,
  NavigationItemType,
  NavigationMainMenuItem,
  NavigationFooterMenuItem,
  
  // Blocks
  BlockType,
  LayoutBlock,
  BaseBlock,
  HeroBlock,
  RichTextBlock,
  MediaBlock,
  MediaContentBlock,
  CTABlock,
  CTAButton,
  CardGridBlock,
  POIGridBlock,
  POIMapBlock,
  ProductSliderBlock,
  TestimonialsBlock,
  StatsBlock,
  FAQBlock,
  FormBlock,
  NewsletterBlock,
  SpacerBlock,
  DividerBlock,
  TabsBlock,
  AccordionBlock,
  EmbedBlock,
  CodeBlock,
  NodeExplorerBlock,
  CityServicesBlock,
  
  // Globals
  SiteSettings,
} from './types';

export type { TenantContext, TenantMapping } from './tenant-resolver';

// React hooks
export {
  usePlatformContext,
  useNavigation,
  usePage,
  usePages,
  usePOI,
  usePOIs,
  useFeaturedPOIs,
  useSearchPOIs,
  cmsQueryKeys,
} from './hooks';
