/**
 * Payload CMS Types
 * 
 * These types align with our Payload CMS collections:
 * - Pages: Main content pages
 * - POIs: Points of Interest for smart city
 * - Templates: Page rendering templates
 * - Navigation: Menu structures
 * - Tenants: Multi-tenant configuration
 * - Nodes: Hierarchical location structure
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
// TENANT & NODE TYPES
// =============================================================================

export interface Tenant extends PayloadDocument {
  slug: string;
  name: string;
  domain: string;
  subdomains?: string[];
  status: 'active' | 'inactive' | 'suspended';
  config: {
    locale: string;
    timezone: string;
    currency: string;
    branding?: {
      logo?: PayloadMedia;
      favicon?: PayloadMedia;
      primaryColor?: string;
      secondaryColor?: string;
    };
  };
  governance?: {
    region: string;
    country: string;
    authority?: string;
  };
}

export type NodeType = 'CITY' | 'DISTRICT' | 'ZONE' | 'FACILITY' | 'ASSET';

export interface Node extends PayloadDocument {
  slug: string;
  name: string;
  type: NodeType;
  code: string;
  parent?: Node | string;
  children?: (Node | string)[];
  tenant: Tenant | string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  boundary?: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  metadata?: Record<string, unknown>;
  status: 'active' | 'inactive' | 'maintenance';
}

// =============================================================================
// PAGE TYPES
// =============================================================================

export type PageStatus = 'draft' | 'published' | 'archived';

export interface Page extends PayloadDocument {
  slug: string;
  title: string;
  description?: string;
  template: PageTemplate | string;
  tenant: Tenant | string;
  node?: Node | string;
  status: PageStatus;
  publishedAt?: string;
  meta?: {
    title?: string;
    description?: string;
    image?: PayloadMedia;
    noIndex?: boolean;
  };
  hero?: HeroBlock;
  layout: LayoutBlock[];
  breadcrumb?: {
    enabled: boolean;
    items?: BreadcrumbItem[];
  };
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
// POI (Points of Interest) TYPES
// =============================================================================

export type POICategory = 
  | 'attraction'
  | 'restaurant'
  | 'hotel'
  | 'shopping'
  | 'transport'
  | 'service'
  | 'event'
  | 'healthcare'
  | 'education'
  | 'government';

export interface POI extends PayloadDocument {
  slug: string;
  name: string;
  description?: string;
  category: POICategory;
  subcategory?: string;
  tenant: Tenant | string;
  node: Node | string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    floor?: number;
    unit?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  hours?: OperatingHours[];
  media?: {
    featured?: PayloadMedia;
    gallery?: PayloadMedia[];
  };
  amenities?: string[];
  tags?: string[];
  rating?: {
    average: number;
    count: number;
  };
  status: 'active' | 'inactive' | 'coming-soon';
  meta?: {
    title?: string;
    description?: string;
  };
  relatedProducts?: string[]; // Medusa product IDs
  relatedPOIs?: (POI | string)[];
}

export interface OperatingHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  open: string;
  close: string;
  closed?: boolean;
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export type NavigationType = 'header' | 'footer' | 'sidebar' | 'mobile' | 'utility';

export interface Navigation extends PayloadDocument {
  slug: string;
  name: string;
  type: NavigationType;
  tenant: Tenant | string;
  items: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  label: string;
  type: 'link' | 'page' | 'poi' | 'node' | 'dropdown' | 'megamenu';
  url?: string;
  page?: Page | string;
  poi?: POI | string;
  node?: Node | string;
  target?: '_self' | '_blank';
  icon?: string;
  children?: NavigationItem[];
  featured?: {
    image?: PayloadMedia;
    title?: string;
    description?: string;
  };
}

// =============================================================================
// BLOCK TYPES (Payload Layout Builder)
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
  category?: POICategory;
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
  category?: POICategory;
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
// GLOBAL TYPES
// =============================================================================

export interface SiteGlobals {
  siteName: string;
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
