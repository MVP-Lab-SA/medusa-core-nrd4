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
  Node,
  NodeType,
  
  // Pages
  Page,
  PageStatus,
  PageTemplate,
  TemplateType,
  TemplateRegion,
  BreadcrumbItem,
  
  // POIs
  POI,
  POICategory,
  OperatingHours,
  
  // Navigation
  Navigation,
  NavigationType,
  NavigationItem,
  
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
  SiteGlobals,
  
  // Globals
  SiteGlobals,
} from './types';

export type { TenantContext, TenantMapping } from './tenant-resolver';
