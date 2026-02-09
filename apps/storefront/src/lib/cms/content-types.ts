/**
 * CMS Content Types
 * 
 * This file defines all content types that can be managed via Payload CMS.
 * Each type maps to either a Payload collection or a global.
 */

// ============================================================================
// SITE SETTINGS (Global)
// ============================================================================
export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  logo?: MediaItem;
  favicon?: MediaItem;
  socialLinks?: {
    platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok';
    url: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  legalLinks: {
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy?: string;
  };
  analytics?: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
}

// ============================================================================
// NAVIGATION (Global)
// ============================================================================
export interface NavigationItem {
  id: string;
  label: string;
  type: 'link' | 'external' | 'page' | 'dropdown';
  url?: string;
  page?: { slug: string };
  openInNewTab?: boolean;
  children?: NavigationItem[];
  icon?: string;
  badge?: string;
}

export interface Navigation {
  mainMenu: NavigationItem[];
  footerMenu: {
    heading: string;
    items: NavigationItem[];
  }[];
  mobileMenu?: NavigationItem[];
  topBar?: {
    message: string;
    link?: string;
    dismissible?: boolean;
  };
}

// ============================================================================
// MEDIA
// ============================================================================
export interface MediaItem {
  id: string | number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  filename?: string;
}

// ============================================================================
// PAGE BLOCKS
// ============================================================================

// Hero Block
export interface HeroBlock {
  blockType: 'hero';
  heading: string;
  subheading?: string;
  image?: MediaItem;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  variant?: 'centered' | 'left-aligned' | 'split' | 'video' | 'carousel';
  badge?: string;
  overlay?: boolean;
}

// Hero Carousel Block
export interface HeroCarouselBlock {
  blockType: 'hero-carousel';
  slides: {
    heading: string;
    subheading?: string;
    image?: MediaItem;
    ctaText?: string;
    ctaLink?: string;
  }[];
  autoplay?: boolean;
  interval?: number;
}

// Stats Block
export interface StatsBlock {
  blockType: 'stats';
  heading?: string;
  stats: {
    value: string;
    label: string;
    icon?: string;
  }[];
  variant?: 'grid' | 'inline' | 'cards';
}

// Features Block
export interface FeaturesBlock {
  blockType: 'features';
  heading?: string;
  subheading?: string;
  features: {
    title: string;
    description: string;
    icon?: string;
    image?: MediaItem;
    link?: string;
  }[];
  columns?: 2 | 3 | 4;
  variant?: 'cards' | 'icons' | 'list';
}

// Testimonials Block
export interface TestimonialsBlock {
  blockType: 'testimonials';
  heading?: string;
  testimonials: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: MediaItem;
    rating?: number;
  }[];
  variant?: 'carousel' | 'grid' | 'stacked';
}

// CTA Block
export interface CTABlock {
  blockType: 'cta';
  heading: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  variant?: 'primary' | 'secondary' | 'banner' | 'minimal';
  background?: 'light' | 'dark' | 'gradient' | 'image';
  backgroundImage?: MediaItem;
}

// Content Block (Rich Text)
export interface ContentBlock {
  blockType: 'content';
  content: any; // Lexical rich text
  width?: 'narrow' | 'medium' | 'wide' | 'full';
}

// FAQ Block
export interface FAQBlock {
  blockType: 'faq';
  heading?: string;
  categories?: {
    name: string;
    items: {
      question: string;
      answer: string;
    }[];
  }[];
  items?: {
    question: string;
    answer: string;
  }[];
}

// Trust Badges Block
export interface TrustBadgesBlock {
  blockType: 'trust-badges';
  badges: {
    icon: string;
    title: string;
    description?: string;
  }[];
  variant?: 'horizontal' | 'grid';
}

// Banner Block
export interface BannerBlock {
  blockType: 'banner';
  message: string;
  link?: string;
  type?: 'info' | 'warning' | 'success' | 'error' | 'promo';
  dismissible?: boolean;
  countdown?: {
    endDate: string;
    label?: string;
  };
}

// Card Grid Block
export interface CardGridBlock {
  blockType: 'card-grid';
  heading?: string;
  cards: {
    title: string;
    description?: string;
    image?: MediaItem;
    link?: string;
    badge?: string;
  }[];
  columns?: 2 | 3 | 4;
}

// Steps/How It Works Block
export interface StepsBlock {
  blockType: 'steps';
  heading?: string;
  subheading?: string;
  steps: {
    number?: number;
    title: string;
    description: string;
    icon?: string;
    image?: MediaItem;
  }[];
  variant?: 'horizontal' | 'vertical' | 'alternating';
}

// Contact Info Block
export interface ContactInfoBlock {
  blockType: 'contact-info';
  heading?: string;
  items: {
    type: 'address' | 'phone' | 'email' | 'hours' | 'custom';
    icon?: string;
    label: string;
    value: string;
    link?: string;
  }[];
}

// Newsletter Block
export interface NewsletterBlock {
  blockType: 'newsletter';
  heading: string;
  description?: string;
  buttonText?: string;
  successMessage?: string;
  variant?: 'card' | 'inline' | 'popup';
}

// Products Block (fetches from Medusa)
export interface ProductsBlock {
  blockType: 'products';
  heading?: string;
  type: 'featured' | 'new' | 'bestsellers' | 'category' | 'collection' | 'manual';
  categoryHandle?: string;
  collectionHandle?: string;
  productHandles?: string[];
  limit?: number;
  columns?: 2 | 3 | 4;
}

// Categories Block
export interface CategoriesBlock {
  blockType: 'categories';
  heading?: string;
  type: 'all' | 'featured' | 'manual';
  categoryHandles?: string[];
  variant?: 'grid' | 'list' | 'carousel';
}

// Map Block
export interface MapBlock {
  blockType: 'map';
  heading?: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: {
    label?: string;
    lat: number;
    lng: number;
  }[];
}

// Values Block
export interface ValuesBlock {
  blockType: 'values';
  heading?: string;
  values: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

// Team Block
export interface TeamBlock {
  blockType: 'team';
  heading?: string;
  members: {
    name: string;
    role: string;
    bio?: string;
    image?: MediaItem;
    social?: {
      platform: string;
      url: string;
    }[];
  }[];
}

// Timeline Block
export interface TimelineBlock {
  blockType: 'timeline';
  heading?: string;
  items: {
    date: string;
    title: string;
    description?: string;
  }[];
}

// Loyalty Tiers Block
export interface LoyaltyTiersBlock {
  blockType: 'loyalty-tiers';
  heading?: string;
  tiers: {
    name: string;
    icon?: string;
    color?: string;
    minPoints: number;
    maxPoints?: number;
    benefits: string[];
    multiplier: number;
  }[];
}

// Blog Posts Block
export interface BlogPostsBlock {
  blockType: 'blog-posts';
  heading?: string;
  type: 'recent' | 'featured' | 'category' | 'manual';
  category?: string;
  postSlugs?: string[];
  limit?: number;
}

// Lookbook Block
export interface LookbookBlock {
  blockType: 'lookbook';
  heading?: string;
  looks: {
    title: string;
    image: MediaItem;
    products: {
      handle: string;
      position: { x: number; y: number };
    }[];
  }[];
}

// UGC Block
export interface UGCBlock {
  blockType: 'ugc';
  heading?: string;
  items: {
    image: MediaItem;
    username: string;
    caption?: string;
    likes?: number;
    link?: string;
  }[];
}

// Union type for all blocks
export type PageBlock =
  | HeroBlock
  | HeroCarouselBlock
  | StatsBlock
  | FeaturesBlock
  | TestimonialsBlock
  | CTABlock
  | ContentBlock
  | FAQBlock
  | TrustBadgesBlock
  | BannerBlock
  | CardGridBlock
  | StepsBlock
  | ContactInfoBlock
  | NewsletterBlock
  | ProductsBlock
  | CategoriesBlock
  | MapBlock
  | ValuesBlock
  | TeamBlock
  | TimelineBlock
  | LoyaltyTiersBlock
  | BlogPostsBlock
  | LookbookBlock
  | UGCBlock;

// ============================================================================
// CMS PAGE
// ============================================================================
export interface CMSPage {
  id: string | number;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  template?: 'default' | 'landing' | 'article' | 'contact' | 'legal';
  layout: PageBlock[];
  seo?: {
    title?: string;
    description?: string;
    image?: MediaItem;
    noIndex?: boolean;
  };
  tenant?: {
    id: string | number;
    slug: string;
  };
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// BLOG POST
// ============================================================================
export interface BlogPost {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  content: any; // Lexical rich text
  featuredImage?: MediaItem;
  author?: {
    name: string;
    avatar?: MediaItem;
    bio?: string;
  };
  category?: string;
  tags?: string[];
  readTime?: number;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// ANNOUNCEMENT
// ============================================================================
export interface Announcement {
  id: string | number;
  title: string;
  content: string;
  type: 'promotion' | 'update' | 'good-news' | 'alert';
  important?: boolean;
  link?: string;
  startDate?: string;
  endDate?: string;
  status: 'active' | 'scheduled' | 'expired';
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function isBlockType<T extends PageBlock>(
  block: PageBlock,
  type: T['blockType']
): block is T {
  return block.blockType === type;
}
