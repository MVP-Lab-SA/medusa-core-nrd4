/**
 * Payload CMS Types
 * 
 * These types align with Dakkah CityOS Payload CMS collections.
 * Based on actual schema from: https://github.com/Qahtani1979/Dakkah-CityOS-CMS
 * 
 * Collections:
 * - Pages: Main content pages with Lexical rich text + layout blocks
 * - POIs: Points of Interest (53 fields, Google Maps API v1 complete)
 * - Templates: Page rendering templates
 * - Navigation: Menu structures (global)
 * - Tenants: Multi-tenant configuration with hierarchical tiers
 * - Nodes: Hierarchical location structure (GLOBAL > CONTINENT > REGION > COUNTRY > CITY > DISTRICT > ZONE > FACILITY > ASSET)
 */

// =============================================================================
// BASE TYPES
// =============================================================================

export interface PayloadDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayloadMedia extends PayloadDocument {
  url: string;
  alt?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  focalX?: number;
  focalY?: number;
}

export interface PayloadRichText {
  root: {
    type: string;
    children: RichTextNode[];
    direction: 'ltr' | 'rtl' | null;
    format: string;
    indent: number;
    version: number;
  };
}

export interface RichTextNode {
  type: string;
  version: number;
  children?: RichTextNode[];
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  url?: string;
  [key: string]: unknown;
}

// =============================================================================
// TENANT TYPES (Hierarchical Multi-Tenancy)
// =============================================================================

export type TenantTier = 'MASTER' | 'GLOBAL' | 'REGIONAL' | 'COUNTRY' | 'CITY';

export type ResidencyZone = 'GCC' | 'EU' | 'MENA' | 'APAC' | 'AMERICAS' | 'GLOBAL';

export interface TenantSettings {
  defaultLocale?: string;
  supportedLocales?: { locale: string }[];
  timezone?: string;
  currency?: string;
}

export interface Tenant extends PayloadDocument {
  name: string;
  slug: string;
  tenantTier: TenantTier;
  parentTenant?: Tenant | string | null;
  domain?: string;
  customDomains?: { domain: string }[];
  status: 'active' | 'inactive' | 'suspended';
  settings?: TenantSettings;
  metadata?: Record<string, unknown>;
  residencyZone?: ResidencyZone;
  country?: string; // relationship to countries
  governanceAuthority?: string; // relationship to governance-authorities
  description?: string;
  defaultPersona?: string; // relationship to personas
}

export interface TenantConfig {
  id: string;
  name: string;
  slug: string;
  domain: string;
  tenantTier: string;
  parentTenant?: string | null;
  residencyZone: string;
  status: string;
  description?: string;
  settings: TenantSettings;
}

export interface TenantAncestor {
  id: string;
  name: string;
  slug: string;
  tenantTier: string;
  domain: string;
}

// =============================================================================
// NODE TYPES (Hierarchical Location Structure)
// =============================================================================

export type NodeType = 
  | 'GLOBAL'
  | 'CONTINENT'
  | 'REGION'
  | 'COUNTRY'
  | 'CITY'
  | 'DISTRICT'
  | 'ZONE'
  | 'FACILITY'
  | 'ASSET';

export interface Node extends PayloadDocument {
  name: string;
  slug: string;
  type: NodeType;
  code: string;
  parent?: Node | string;
  status: 'active' | 'inactive' | 'maintenance';
  coordinates?: {
    lat: number;
    lng: number;
  };
  metadata?: Record<string, unknown>;
  tenant?: Tenant | string;
}

export interface NodeHierarchy {
  id: string;
  name: string;
  code: string;
  type: string;
  slug: string;
  status: string;
  coordinates?: { lat: number; lng: number };
  parent?: string;
  children?: NodeHierarchy[];
}

// =============================================================================
// GOVERNANCE TYPES
// =============================================================================

export interface GovernanceChain {
  region?: {
    id: string;
    name: string;
    code: string;
    residencyZone: string;
  };
  country?: {
    id: string;
    name: string;
    code: string;
    settings?: Record<string, unknown>;
  };
  authorities?: Array<{
    id: string;
    name: string;
    code: string;
    type: string;
    jurisdiction?: Record<string, unknown>;
  }>;
  policies?: {
    dataResidency?: Record<string, unknown>;
    compliance?: Record<string, unknown>;
    classification?: Record<string, unknown>;
  };
}

// =============================================================================
// PLATFORM CAPABILITIES
// =============================================================================

export interface PlatformCapabilities {
  plugins: {
    official: string[];
    community: string[];
    custom: string[];
  };
  features: Record<string, boolean | unknown>;
  endpoints: Record<string, string>;
}

export interface SystemInfo {
  id: string;
  name: string;
  type: string;
  category: string;
  status: string;
  capabilities: string[];
  hasBaseUrl: boolean;
}

export interface SystemsOverview {
  total: number;
  active: number;
  external: number;
  registry: SystemInfo[];
}

// =============================================================================
// PLATFORM CONTEXT (Full API Response)
// =============================================================================

export interface PlatformContext {
  tenant: TenantConfig;
  tenantAncestry: TenantAncestor[];
  masterTenant: TenantAncestor;
  nodeHierarchy: NodeHierarchy[];
  governanceChain: GovernanceChain;
  capabilities: PlatformCapabilities;
  systems: SystemsOverview;
  contextHeaders: string[];
  hierarchyLevels: string[];
  tenantTiers: string[];
  resolvedAt: string;
  isDefaultTenant: boolean;
}

export interface PlatformContextResponse {
  success: boolean;
  data?: PlatformContext;
  error?: string;
  message?: string;
}

// =============================================================================
// PAGE TYPES
// =============================================================================

export type PageStatus = 'draft' | 'published' | 'archived';

export type ReviewStatus = 'none' | 'pending-review' | 'approved' | 'rejected';

export interface Page extends PayloadDocument {
  title: string;
  slug: string;
  status: PageStatus;
  content?: PayloadRichText;
  featuredImage?: PayloadMedia | string;
  author?: string; // relationship to users
  version: number;
  publishedVersion?: number;
  versionNotes?: string;
  lastPublishedAt?: string;
  layout?: LayoutBlock[];
  scheduledPublishAt?: string;
  scheduledUnpublishAt?: string;
  reviewStatus?: ReviewStatus;
  reviewedBy?: string;
  reviewNotes?: string;
  tenant?: Tenant | string;
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

// =============================================================================
// PAGE TEMPLATE TYPES
// =============================================================================

export type TemplateType = 
  | 'default'
  | 'landing'
  | 'content'
  | 'poi-detail'
  | 'poi-listing'
  | 'city-guide'
  | 'product-showcase'
  | 'marketplace';

export interface PageTemplate extends PayloadDocument {
  slug: string;
  name: string;
  type: TemplateType;
  description?: string;
  defaultLayout?: LayoutBlock[];
  regions: TemplateRegion[];
}

export interface TemplateRegion {
  name: string;
  key: string;
  allowedBlocks: BlockType[];
  maxBlocks?: number;
}

// =============================================================================
// POI (Points of Interest) TYPES - Google Maps API v1 Complete
// =============================================================================

export type POIType = 'place' | 'event-venue' | 'facility' | 'asset' | 'virtual';

export type POIPrimaryCategory = 
  | 'mosque'
  | 'restaurant'
  | 'park'
  | 'museum'
  | 'hospital'
  | 'school'
  | 'transport'
  | 'shopping'
  | 'government'
  | 'utility'
  | 'landmark'
  | 'hotel'
  | 'cafe'
  | 'entertainment'
  | 'sports'
  | 'cultural'
  | 'religious'
  | 'emergency'
  | 'parking'
  | 'charging-station'
  | 'other';

// Alias for POIPrimaryCategory
export type POICategory = POIPrimaryCategory;

export type POISource = 'imported' | 'user-created' | 'partner-created' | 'authority-created';

export type BusinessStatus = 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';

export type PriceLevel = 'FREE' | 'INEXPENSIVE' | 'MODERATE' | 'EXPENSIVE' | 'VERY_EXPENSIVE';

export type StewardshipState = 'unclaimed' | 'claim-pending' | 'claimed' | 'disputed' | 'reverted';

export interface POIStewardship {
  stewardshipState: StewardshipState;
  currentSteward?: string; // relationship to governance-authorities
  currentOwner?: string; // relationship to users
  claimedAt?: string;
  disputeReason?: string;
}

export interface POI extends PayloadDocument {
  name: string;
  slug: string;
  type: POIType;
  primaryCategory?: POIPrimaryCategory;
  node?: Node | string;
  description?: string;
  
  // Location
  coordinates?: {
    lat: number;
    lng: number;
  };
  address?: string;
  formattedAddress?: string;
  shortAddress?: string;
  addressComponents?: Record<string, unknown>;
  plusCode?: Record<string, unknown>;
  viewport?: Record<string, unknown>;
  
  // Contact
  phone?: string;
  website?: string;
  email?: string;
  internationalPhoneNumber?: string;
  nationalPhoneNumber?: string;
  
  // Ratings & Reviews
  rating?: number;
  totalReviews?: number;
  reviews?: Record<string, unknown>;
  
  // Hours & Status
  openingHours?: Record<string, unknown>;
  businessStatus?: BusinessStatus;
  status: 'active' | 'inactive' | 'pending' | 'hidden' | 'archived';
  
  // Pricing
  priceLevel?: PriceLevel;
  priceRange?: Record<string, unknown>;
  
  // Editorial
  editorialSummary?: string;
  areaSummary?: string;
  
  // Social & Digital
  socialMedia?: Record<string, unknown>;
  googlePlaceId?: string;
  googleMapsUri?: string;
  
  // Features & Amenities (booleans)
  allowsDogs?: boolean;
  goodForChildren?: boolean;
  goodForGroups?: boolean;
  liveMusic?: boolean;
  outdoorSeating?: boolean;
  restroom?: boolean;
  reservable?: boolean;
  dineIn?: boolean;
  delivery?: boolean;
  takeout?: boolean;
  curbsidePickup?: boolean;
  
  // Food & Drink Service
  servesBreakfast?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;
  servesBrunch?: boolean;
  servesBeer?: boolean;
  servesWine?: boolean;
  servesCocktails?: boolean;
  servesCoffee?: boolean;
  servesVegetarianFood?: boolean;
  servesDessert?: boolean;
  menuForChildren?: boolean;
  
  // Facilities
  parkingOptions?: Record<string, unknown>;
  paymentOptions?: Record<string, unknown>;
  evChargeOptions?: Record<string, unknown>;
  fuelOptions?: Record<string, unknown>;
  accessibility?: Record<string, unknown>;
  
  // Additional Info
  capacity?: number;
  elevationMeters?: number;
  timezone?: string;
  utcOffsetMinutes?: number;
  languagesSpoken?: string[];
  currenciesAccepted?: string[];
  emergencyContact?: string;
  
  // Metadata
  tags?: string[];
  source?: POISource;
  canonicalConfidence?: number;
  geoPolygon?: Record<string, unknown>;
  containingPlaces?: Record<string, unknown>;
  attributes?: Record<string, unknown>;
  
  // Rich content
  yearEstablished?: number;
  managedBy?: string;
  totalArea?: string;
  transportLinks?: Record<string, unknown>;
  awards?: Record<string, unknown>;
  keyFeatures?: Record<string, unknown>;
  visitorInfo?: Record<string, unknown>;
  architecturalStyle?: string;
  sustainabilityCertifications?: Record<string, unknown>;
  historicalSignificance?: string;
  
  // Stewardship
  stewardship?: POIStewardship;
  
  // Media
  images?: (PayloadMedia | string)[];
  
  // Tenant
  tenant?: Tenant | string;
}

export interface OperatingHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  open: string;
  close: string;
  closed?: boolean;
}

// =============================================================================
// NAVIGATION TYPES (Global)
// =============================================================================

export type NavigationItemType = 'link' | 'external' | 'page';

export interface NavigationMainMenuItem {
  label: string;
  type: NavigationItemType;
  url?: string;
  page?: Page | string;
  openInNewTab?: boolean;
}

export interface NavigationFooterMenuItem {
  label: string;
  url: string;
}

export interface Navigation {
  mainMenu?: NavigationMainMenuItem[];
  footerMenu?: NavigationFooterMenuItem[];
}

// =============================================================================
// BLOCK TYPES (Payload Layout Builder with ALL_BLOCKS)
// =============================================================================

export type BlockType =
  | 'hero'
  | 'richText'
  | 'media'
  | 'mediaContent'
  | 'cta'
  | 'cardGrid'
  | 'poiGrid'
  | 'poiMap'
  | 'productSlider'
  | 'testimonials'
  | 'stats'
  | 'faq'
  | 'form'
  | 'newsletter'
  | 'spacer'
  | 'divider'
  | 'tabs'
  | 'accordion'
  | 'embed'
  | 'code'
  | 'nodeExplorer'
  | 'cityServices';

export type LayoutBlock =
  | HeroBlock
  | RichTextBlock
  | MediaBlock
  | MediaContentBlock
  | CTABlock
  | CardGridBlock
  | POIGridBlock
  | POIMapBlock
  | ProductSliderBlock
  | TestimonialsBlock
  | StatsBlock
  | FAQBlock
  | FormBlock
  | NewsletterBlock
  | SpacerBlock
  | DividerBlock
  | TabsBlock
  | AccordionBlock
  | EmbedBlock
  | CodeBlock
  | NodeExplorerBlock
  | CityServicesBlock;

// Block Definitions

export interface BaseBlock {
  id: string;
  blockType: BlockType;
}

export interface HeroBlock extends BaseBlock {
  blockType: 'hero';
  variant: 'default' | 'centered' | 'split' | 'video' | 'parallax';
  heading: string;
  subheading?: string;
  content?: PayloadRichText;
  media?: PayloadMedia;
  video?: {
    url: string;
    poster?: PayloadMedia;
  };
  overlay?: {
    enabled: boolean;
    color?: string;
    opacity?: number;
  };
  cta?: {
    primary?: CTAButton;
    secondary?: CTAButton;
  };
  alignment?: 'left' | 'center' | 'right';
  height?: 'auto' | 'screen' | 'half' | 'third';
}

export interface CTAButton {
  label: string;
  url?: string;
  page?: Page | string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
}

export interface RichTextBlock extends BaseBlock {
  blockType: 'richText';
  content: PayloadRichText;
  columns?: 1 | 2 | 3;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface MediaBlock extends BaseBlock {
  blockType: 'media';
  media: PayloadMedia;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16' | 'auto';
  rounded?: boolean;
}

export interface MediaContentBlock extends BaseBlock {
  blockType: 'mediaContent';
  media: PayloadMedia;
  content: PayloadRichText;
  mediaPosition: 'left' | 'right';
  alignment?: 'top' | 'center' | 'bottom';
  cta?: CTAButton;
}

export interface CTABlock extends BaseBlock {
  blockType: 'cta';
  variant: 'banner' | 'card' | 'inline';
  heading: string;
  content?: string;
  background?: {
    type: 'color' | 'gradient' | 'image';
    color?: string;
    gradient?: string;
    image?: PayloadMedia;
  };
  buttons: CTAButton[];
}

export interface CardGridBlock extends BaseBlock {
  blockType: 'cardGrid';
  heading?: string;
  cards: {
    id: string;
    title: string;
    description?: string;
    image?: PayloadMedia;
    icon?: string;
    url?: string;
    page?: Page | string;
  }[];
  columns: 2 | 3 | 4;
  variant?: 'default' | 'bordered' | 'elevated';
}

export interface POIGridBlock extends BaseBlock {
  blockType: 'poiGrid';
  heading?: string;
  source: 'manual' | 'category' | 'node' | 'featured';
  pois?: (POI | string)[];
  category?: POIPrimaryCategory;
  node?: Node | string;
  limit?: number;
  columns: 2 | 3 | 4;
  showMap?: boolean;
}

export interface POIMapBlock extends BaseBlock {
  blockType: 'poiMap';
  heading?: string;
  source: 'manual' | 'category' | 'node' | 'all';
  pois?: (POI | string)[];
  category?: POIPrimaryCategory;
  node?: Node | string;
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  height?: 'sm' | 'md' | 'lg' | 'full';
  showFilters?: boolean;
  showList?: boolean;
}

export interface ProductSliderBlock extends BaseBlock {
  blockType: 'productSlider';
  heading?: string;
  source: 'manual' | 'collection' | 'category' | 'related';
  productIds?: string[];
  collectionHandle?: string;
  categoryHandle?: string;
  limit?: number;
}

export interface TestimonialsBlock extends BaseBlock {
  blockType: 'testimonials';
  heading?: string;
  variant: 'carousel' | 'grid' | 'masonry';
  testimonials: {
    id: string;
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: PayloadMedia;
    rating?: number;
  }[];
}

export interface StatsBlock extends BaseBlock {
  blockType: 'stats';
  heading?: string;
  stats: {
    id: string;
    value: string;
    label: string;
    icon?: string;
    prefix?: string;
    suffix?: string;
  }[];
  variant?: 'default' | 'cards' | 'inline';
}

export interface FAQBlock extends BaseBlock {
  blockType: 'faq';
  heading?: string;
  items: {
    id: string;
    question: string;
    answer: PayloadRichText;
  }[];
  variant?: 'accordion' | 'list';
}

export interface FormBlock extends BaseBlock {
  blockType: 'form';
  formId: string;
  heading?: string;
  description?: string;
  submitLabel?: string;
  successMessage?: string;
}

export interface NewsletterBlock extends BaseBlock {
  blockType: 'newsletter';
  heading?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  variant?: 'inline' | 'stacked' | 'banner';
}

export interface SpacerBlock extends BaseBlock {
  blockType: 'spacer';
  size: 'sm' | 'md' | 'lg' | 'xl';
}

export interface DividerBlock extends BaseBlock {
  blockType: 'divider';
  style?: 'solid' | 'dashed' | 'dotted';
  color?: string;
}

export interface TabsBlock extends BaseBlock {
  blockType: 'tabs';
  tabs: {
    id: string;
    label: string;
    content: LayoutBlock[];
  }[];
}

export interface AccordionBlock extends BaseBlock {
  blockType: 'accordion';
  items: {
    id: string;
    title: string;
    content: LayoutBlock[];
    defaultOpen?: boolean;
  }[];
  allowMultiple?: boolean;
}

export interface EmbedBlock extends BaseBlock {
  blockType: 'embed';
  embedType: 'youtube' | 'vimeo' | 'twitter' | 'instagram' | 'iframe';
  url: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export interface CodeBlock extends BaseBlock {
  blockType: 'code';
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export interface NodeExplorerBlock extends BaseBlock {
  blockType: 'nodeExplorer';
  heading?: string;
  rootNode?: Node | string;
  depth?: number;
  showMap?: boolean;
  showStats?: boolean;
}

export interface CityServicesBlock extends BaseBlock {
  blockType: 'cityServices';
  heading?: string;
  services: {
    id: string;
    name: string;
    description?: string;
    icon: string;
    url?: string;
    status?: 'available' | 'coming-soon' | 'maintenance';
  }[];
  columns: 2 | 3 | 4 | 6;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface PayloadPaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PayloadResponse<T> {
  doc: T;
  message: string;
}

// =============================================================================
// GLOBAL TYPES (Site Settings)
// =============================================================================

export interface SiteSettings {
  siteName?: string;
  siteDescription?: string;
  logo?: PayloadMedia;
  favicon?: PayloadMedia;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  defaultMeta?: {
    title?: string;
    description?: string;
    image?: PayloadMedia;
  };
  scripts?: {
    head?: string;
    bodyStart?: string;
    bodyEnd?: string;
  };
}

// =============================================================================
// CONTEXT HEADERS (CityOS Platform)
// =============================================================================

export const CITYOS_HEADERS = [
  'X-CityOS-Correlation-Id',
  'X-CityOS-Tenant-Id',
  'X-CityOS-Node-Id',
  'X-CityOS-Node-Type',
  'X-CityOS-Locale',
  'X-CityOS-User-Id',
  'X-CityOS-Channel',
  'X-Idempotency-Key',
  'X-CityOS-Region',
  'X-CityOS-Country',
  'X-CityOS-Tenant-Tier',
  'X-CityOS-Master-Tenant-Id',
  'X-CityOS-Platform-Tenant-Id',
] as const;

export type CityOSHeader = typeof CITYOS_HEADERS[number];

export const HIERARCHY_LEVELS = ['GLOBAL', 'CONTINENT', 'REGION', 'COUNTRY', 'CITY', 'DISTRICT', 'ZONE', 'FACILITY', 'ASSET'] as const;

export const TENANT_TIERS = ['MASTER', 'GLOBAL', 'REGIONAL', 'COUNTRY', 'CITY'] as const;
