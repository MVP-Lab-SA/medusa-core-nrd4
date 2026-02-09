/**
 * CMS Block Components
 * 
 * Renders Payload CMS layout blocks.
 * Each block type maps to a React component.
 */

import React from 'react';
import type {
  LayoutBlock,
  HeroBlock,
  RichTextBlock,
  MediaBlock,
  MediaContentBlock,
  CTABlock,
  CardGridBlock,
  POIGridBlock,
  StatsBlock,
  FAQBlock,
  NewsletterBlock,
  SpacerBlock,
  DividerBlock,
  TestimonialsBlock,
  ProductSliderBlock,
} from '@/lib/payload/types';

// =============================================================================
// BLOCK REGISTRY
// =============================================================================

type BlockComponent<T extends LayoutBlock = LayoutBlock> = React.FC<{ block: T }>;

const blockComponents: Record<string, BlockComponent> = {};

export function registerBlock<T extends LayoutBlock>(
  blockType: string,
  component: BlockComponent<T>
): void {
  blockComponents[blockType] = component as BlockComponent;
}

// =============================================================================
// RICH TEXT RENDERER
// =============================================================================

import type { PayloadRichText, RichTextNode } from '@/lib/payload/types';

function renderRichTextNode(node: RichTextNode, index: number): React.ReactNode {
  const key = `${node.type}-${index}`;

  // Text node
  if (node.text !== undefined) {
    let content: React.ReactNode = node.text;

    // Apply formatting
    if (node.format) {
      if (node.format & 1) content = <strong key={key}>{content}</strong>;
      if (node.format & 2) content = <em key={key}>{content}</em>;
      if (node.format & 8) content = <u key={key}>{content}</u>;
      if (node.format & 16) content = <code key={key}>{content}</code>;
      if (node.format & 32) content = <s key={key}>{content}</s>;
    }

    return content;
  }

  // Element nodes
  const children = node.children?.map((child, i) => renderRichTextNode(child, i));

  const headingClasses: Record<string, string> = {
    h1: 'text-4xl font-bold mb-6',
    h2: 'text-3xl font-bold mb-5',
    h3: 'text-2xl font-semibold mb-4',
    h4: 'text-xl font-semibold mb-3',
    h5: 'text-lg font-medium mb-2',
    h6: 'text-base font-medium mb-2',
  };

  switch (node.type) {
    case 'paragraph':
      return <p key={key} className="mb-4 last:mb-0">{children}</p>;
    case 'heading':
      const tag = node.tag || 'h2';
      const headingClass = headingClasses[tag] || headingClasses.h2;
      if (tag === 'h1') return <h1 key={key} className={headingClass}>{children}</h1>;
      if (tag === 'h2') return <h2 key={key} className={headingClass}>{children}</h2>;
      if (tag === 'h3') return <h3 key={key} className={headingClass}>{children}</h3>;
      if (tag === 'h4') return <h4 key={key} className={headingClass}>{children}</h4>;
      if (tag === 'h5') return <h5 key={key} className={headingClass}>{children}</h5>;
      return <h6 key={key} className={headingClass}>{children}</h6>;
    case 'list':
      if (node.listType === 'number') {
        return <ol key={key} className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
      }
      return <ul key={key} className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
    case 'listitem':
      return <li key={key}>{children}</li>;
    case 'link':
      return (
        <a
          key={key}
          href={node.url as string}
          className="text-primary underline hover:no-underline"
          target={node.url?.toString().startsWith('http') ? '_blank' : undefined}
          rel={node.url?.toString().startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    case 'quote':
      return (
        <blockquote key={key} className="border-l-4 border-primary pl-4 italic my-4">
          {children}
        </blockquote>
      );
    default:
      return <span key={key}>{children}</span>;
  }
}

export function RichText({ content }: { content: PayloadRichText | undefined }) {
  if (!content?.root?.children) {
    return null;
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {content.root.children.map((node, index) => renderRichTextNode(node, index))}
    </div>
  );
}

// =============================================================================
// HERO BLOCK
// =============================================================================

const HeroBlockComponent: React.FC<{ block: HeroBlock }> = ({ block }) => {
  const heightClasses: Record<string, string> = {
    auto: 'min-h-[400px]',
    screen: 'min-h-screen',
    half: 'min-h-[50vh]',
    third: 'min-h-[33vh]',
  };

  const alignmentClasses: Record<string, string> = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <section
      className={`relative flex flex-col justify-center ${heightClasses[block.height || 'auto']} ${alignmentClasses[block.alignment || 'center']}`}
    >
      {/* Background Media */}
      {block.media && (
        <div className="absolute inset-0 z-0">
          <img
            src={block.media.url}
            alt={block.media.alt || ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Video Background */}
      {block.video?.url && (
        <div className="absolute inset-0 z-0">
          <video
            src={block.video.url}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={block.video.poster?.url}
          />
        </div>
      )}

      {/* Overlay */}
      {block.overlay?.enabled && (
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: block.overlay.color || 'black',
            opacity: block.overlay.opacity || 0.5,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          {block.heading}
        </h1>

        {block.subheading && (
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl drop-shadow">
            {block.subheading}
          </p>
        )}

        {block.content && (
          <div className="text-white/80 mb-8 max-w-2xl">
            <RichText content={block.content} />
          </div>
        )}

        {/* CTAs */}
        {(block.cta?.primary || block.cta?.secondary) && (
          <div className="flex flex-wrap gap-4 justify-center">
            {block.cta.primary && (
              <a
                href={block.cta.primary.url || '#'}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                {block.cta.primary.label}
              </a>
            )}
            {block.cta.secondary && (
              <a
                href={block.cta.secondary.url || '#'}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {block.cta.secondary.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

registerBlock('hero', HeroBlockComponent);

// =============================================================================
// RICH TEXT BLOCK
// =============================================================================

const RichTextBlockComponent: React.FC<{ block: RichTextBlock }> = ({ block }) => {
  const maxWidthClasses: Record<string, string> = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
    full: 'max-w-none',
  };

  return (
    <section className="py-12 px-4">
      <div className={`container mx-auto ${maxWidthClasses[block.maxWidth || 'lg']}`}>
        <RichText content={block.content} />
      </div>
    </section>
  );
};

registerBlock('richText', RichTextBlockComponent);

// =============================================================================
// MEDIA BLOCK
// =============================================================================

const MediaBlockComponent: React.FC<{ block: MediaBlock }> = ({ block }) => {
  const aspectRatioClasses: Record<string, string> = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
    'auto': '',
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <figure>
          <div className={`${aspectRatioClasses[block.aspectRatio || 'auto']} overflow-hidden ${block.rounded ? 'rounded-xl' : ''}`}>
            <img
              src={block.media.url}
              alt={block.media.alt || ''}
              className="w-full h-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
};

registerBlock('media', MediaBlockComponent);

// =============================================================================
// MEDIA CONTENT BLOCK
// =============================================================================

const MediaContentBlockComponent: React.FC<{ block: MediaContentBlock }> = ({ block }) => {
  const isMediaLeft = block.mediaPosition === 'left';

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-${block.alignment || 'center'}`}>
          {/* Media */}
          <div className={isMediaLeft ? 'order-1' : 'order-1 md:order-2'}>
            <div className="rounded-xl overflow-hidden">
              <img
                src={block.media.url}
                alt={block.media.alt || ''}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Content */}
          <div className={isMediaLeft ? 'order-2' : 'order-2 md:order-1'}>
            <RichText content={block.content} />

            {block.cta && (
              <a
                href={block.cta.url || '#'}
                className="inline-block mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                {block.cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

registerBlock('mediaContent', MediaContentBlockComponent);

// =============================================================================
// CTA BLOCK
// =============================================================================

const CTABlockComponent: React.FC<{ block: CTABlock }> = ({ block }) => {
  const variantClasses: Record<string, string> = {
    banner: 'py-16 bg-primary text-white',
    card: 'py-8',
    inline: 'py-4',
  };

  return (
    <section className={`px-4 ${variantClasses[block.variant]}`}>
      <div className={`container mx-auto ${block.variant === 'card' ? 'bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:p-12' : ''}`}>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{block.heading}</h2>
          {block.content && (
            <p className="text-lg opacity-80 mb-8">{block.content}</p>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            {block.buttons.map((button, index) => (
              <a
                key={index}
                href={button.url || '#'}
                className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
                  button.variant === 'primary'
                    ? 'bg-white text-primary hover:bg-white/90'
                    : 'border-2 border-current hover:bg-white/10'
                }`}
              >
                {button.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

registerBlock('cta', CTABlockComponent);

// =============================================================================
// CARD GRID BLOCK
// =============================================================================

const CardGridBlockComponent: React.FC<{ block: CardGridBlock }> = ({ block }) => {
  const columnClasses: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {block.heading && (
          <h2 className="text-3xl font-bold mb-8 text-center">{block.heading}</h2>
        )}
        <div className={`grid gap-6 ${columnClasses[block.columns]}`}>
          {block.cards.map((card) => (
            <a
              key={card.id}
              href={card.url || '#'}
              className={`group block rounded-xl overflow-hidden transition-all ${
                block.variant === 'elevated'
                  ? 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl'
                  : block.variant === 'bordered'
                  ? 'border border-gray-200 dark:border-gray-700 hover:border-primary'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {card.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={card.image.url}
                    alt={card.image.alt || card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

registerBlock('cardGrid', CardGridBlockComponent);

// =============================================================================
// POI GRID BLOCK
// =============================================================================

const POIGridBlockComponent: React.FC<{ block: POIGridBlock }> = ({ block }) => {
  // POIs will be fetched and passed as resolved data
  const pois = Array.isArray(block.pois) ? block.pois : [];

  const columnClasses: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {block.heading && (
          <h2 className="text-3xl font-bold mb-8 text-center">{block.heading}</h2>
        )}
        <div className={`grid gap-6 ${columnClasses[block.columns]}`}>
          {pois.map((poi) => {
            if (typeof poi === 'string') return null;
            const featuredImage = poi.images?.[0];
            const imageUrl = typeof featuredImage === 'string' ? featuredImage : featuredImage?.url;
            const imageAlt = typeof featuredImage === 'string' ? poi.name : featuredImage?.alt || poi.name;
            return (
              <a
                key={poi.id}
                href={`/poi/${poi.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {poi.primaryCategory}
                  </span>
                  <h3 className="text-lg font-semibold mt-1 group-hover:text-primary transition-colors">
                    {poi.name}
                  </h3>
                  {poi.address && (
                    <p className="text-sm text-gray-500 mt-1">{poi.address}</p>
                  )}
                  {poi.rating && (
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">{'*'.repeat(Math.round(poi.rating))}</span>
                      <span className="text-sm text-gray-500 ml-1">({poi.totalReviews || 0})</span>
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

registerBlock('poiGrid', POIGridBlockComponent);

// =============================================================================
// STATS BLOCK
// =============================================================================

const StatsBlockComponent: React.FC<{ block: StatsBlock }> = ({ block }) => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {block.heading && (
          <h2 className="text-3xl font-bold mb-12 text-center">{block.heading}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {block.stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

registerBlock('stats', StatsBlockComponent);

// =============================================================================
// FAQ BLOCK
// =============================================================================

const FAQBlockComponent: React.FC<{ block: FAQBlock }> = ({ block }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        {block.heading && (
          <h2 className="text-3xl font-bold mb-8 text-center">{block.heading}</h2>
        )}
        <div className="space-y-4">
          {block.items.map((item, index) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold"
              >
                {item.question}
                <span className="ml-4">{openIndex === index ? '-' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <RichText content={item.answer} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

registerBlock('faq', FAQBlockComponent);

// =============================================================================
// NEWSLETTER BLOCK
// =============================================================================

const NewsletterBlockComponent: React.FC<{ block: NewsletterBlock }> = ({ block }) => {
  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="container mx-auto max-w-2xl text-center">
        {block.heading && (
          <h2 className="text-3xl font-bold mb-4">{block.heading}</h2>
        )}
        {block.description && (
          <p className="text-lg opacity-90 mb-8">{block.description}</p>
        )}
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder={block.placeholder || 'Enter your email'}
            className="flex-1 px-4 py-3 rounded-lg text-black"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            {block.buttonLabel || 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

registerBlock('newsletter', NewsletterBlockComponent);

// =============================================================================
// SPACER BLOCK
// =============================================================================

const SpacerBlockComponent: React.FC<{ block: SpacerBlock }> = ({ block }) => {
  const sizeClasses: Record<string, string> = {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-24',
    xl: 'h-32',
  };

  return <div className={sizeClasses[block.size]} />;
};

registerBlock('spacer', SpacerBlockComponent);

// =============================================================================
// DIVIDER BLOCK
// =============================================================================

const DividerBlockComponent: React.FC<{ block: DividerBlock }> = ({ block }) => {
  const styleClasses: Record<string, string> = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <hr
          className={`border-t ${styleClasses[block.style || 'solid']}`}
          style={{ borderColor: block.color }}
        />
      </div>
    </div>
  );
};

registerBlock('divider', DividerBlockComponent);

// =============================================================================
// TESTIMONIALS BLOCK
// =============================================================================

const TestimonialsBlockComponent: React.FC<{ block: TestimonialsBlock }> = ({ block }) => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {block.heading && (
          <h2 className="text-3xl font-bold mb-12 text-center">{block.heading}</h2>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {block.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar.url}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  {(testimonial.role || testimonial.company) && (
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ' at '}
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

registerBlock('testimonials', TestimonialsBlockComponent);

// =============================================================================
// PRODUCT SLIDER BLOCK (Medusa Integration)
// =============================================================================

const ProductSliderBlockComponent: React.FC<{ block: ProductSliderBlock }> = ({ block }) => {
  // This will integrate with Medusa product fetching
  // For now, render a placeholder
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {block.heading && (
          <h2 className="text-3xl font-bold mb-8">{block.heading}</h2>
        )}
        <div className="text-center text-gray-500 py-12 border-2 border-dashed rounded-xl">
          Product Slider: {block.source}
          {block.collectionHandle && ` - Collection: ${block.collectionHandle}`}
          {block.categoryHandle && ` - Category: ${block.categoryHandle}`}
        </div>
      </div>
    </section>
  );
};

registerBlock('productSlider', ProductSliderBlockComponent);

// =============================================================================
// BLOCK RENDERER
// =============================================================================

export interface BlockRendererProps {
  blocks: LayoutBlock[];
  className?: string;
}

export function BlockRenderer({ blocks, className = '' }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {blocks.map((block) => {
        const Component = blockComponents[block.blockType];

        if (!Component) {
          // Unknown block type - render debug info in development
          if (process.env.NODE_ENV === 'development') {
            return (
              <div
                key={block.id}
                className="p-4 bg-yellow-50 border border-yellow-200 rounded m-4"
              >
                <p className="text-yellow-800">
                  Unknown block type: <code>{block.blockType}</code>
                </p>
              </div>
            );
          }
          return null;
        }

        return <Component key={block.id} block={block} />;
      })}
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export { blockComponents };
