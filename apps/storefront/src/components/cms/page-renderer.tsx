/**
 * CMS Page Renderer
 * 
 * Renders CMS pages from Payload data with dynamic sections.
 */

import React from 'react'
import { Link } from '@tanstack/react-router'
import type { CMSPage, PageSection, Feature, Testimonial, Stat, TrustBadge, FAQ, FAQCategory } from '@/lib/cms'

// =============================================================================
// PAGE RENDERER
// =============================================================================

interface PageRendererProps {
  page: CMSPage
  countryCode: string
}

export function PageRenderer({ page, countryCode }: PageRendererProps) {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-city-charcoal py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-city-white mb-4">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-lg text-city-gray max-w-3xl">
              {page.description}
            </p>
          )}
        </div>
      </div>

      {/* Page Sections */}
      <div className="container mx-auto px-4 py-12">
        {page.sections.map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            countryCode={countryCode}
          />
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// SECTION RENDERER
// =============================================================================

interface SectionRendererProps {
  section: PageSection
  countryCode: string
}

function SectionRenderer({ section, countryCode }: SectionRendererProps) {
  const bgClass = {
    default: 'bg-transparent',
    muted: 'bg-city-slate/50',
    accent: 'bg-city-lime/5',
    dark: 'bg-city-charcoal',
  }[section.background || 'default']

  const spacingClass = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  }[section.spacing || 'md']

  return (
    <section className={`${bgClass} ${spacingClass} mb-8 last:mb-0 rounded-xl`}>
      {section.title && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-city-white">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-city-gray mt-2">{section.subtitle}</p>
          )}
        </div>
      )}

      {renderSectionContent(section, countryCode)}
    </section>
  )
}

function renderSectionContent(section: PageSection, countryCode: string) {
  switch (section.sectionType) {
    case 'features':
      return <FeaturesContent features={section.features} />
    case 'testimonials':
      return <TestimonialsContent testimonials={section.testimonials} />
    case 'stats':
      return <StatsContent stats={section.stats} />
    case 'trust-badges':
      return <TrustBadgesContent badges={section.badges} />
    case 'faq':
      return <FAQContent categories={section.categories} />
    case 'cta':
      return <CTAContent section={section} countryCode={countryCode} />
    case 'content':
      return (
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      )
    default:
      return null
  }
}

// =============================================================================
// SECTION CONTENT COMPONENTS
// =============================================================================

function FeaturesContent({ features }: { features: Feature[] }) {
  if (!features?.length) return null

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature) => (
        <div key={feature.id} className="p-6 bg-city-slate/50 rounded-xl">
          {feature.icon && (
            <div className="w-12 h-12 rounded-lg bg-city-lime/10 flex items-center justify-center mb-4">
              <span className="text-city-lime text-xl">{feature.icon}</span>
            </div>
          )}
          <h3 className="text-lg font-semibold text-city-white mb-2">
            {feature.title}
          </h3>
          <p className="text-city-gray text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

function TestimonialsContent({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="p-6 bg-city-slate/50 rounded-xl">
          {testimonial.rating && (
            <div className="flex mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < testimonial.rating! ? 'text-yellow-400' : 'text-city-steel'}
                >
                  Star
                </span>
              ))}
            </div>
          )}
          <blockquote className="text-city-gray mb-4">
            "{testimonial.quote}"
          </blockquote>
          <div className="flex items-center gap-3">
            {testimonial.avatar && (
              <img
                src={testimonial.avatar.url}
                alt={testimonial.author}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="text-city-white font-medium">{testimonial.author}</p>
              {testimonial.role && (
                <p className="text-city-gray text-sm">{testimonial.role}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function StatsContent({ stats }: { stats: Stat[] }) {
  if (!stats?.length) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.id} className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-city-lime">
            {stat.prefix}{stat.value}{stat.suffix}
          </p>
          <p className="text-city-gray mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

function TrustBadgesContent({ badges }: { badges: TrustBadge[] }) {
  if (!badges?.length) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {badges.map((badge) => (
        <div key={badge.id} className="text-center p-4">
          {badge.icon && (
            <div className="w-12 h-12 mx-auto rounded-full bg-city-lime/10 flex items-center justify-center mb-3">
              <span className="text-city-lime">{badge.icon}</span>
            </div>
          )}
          <h3 className="text-city-white font-medium">{badge.title}</h3>
          {badge.description && (
            <p className="text-city-gray text-sm mt-1">{badge.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

function FAQContent({ categories }: { categories: FAQCategory[] }) {
  if (!categories?.length) return null

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.id}>
          <h3 className="text-xl font-semibold text-city-white mb-4">
            {category.title}
          </h3>
          <div className="space-y-4">
            {category.faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="border border-city-steel rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-city-slate/50 transition-colors"
      >
        <span className="text-city-white font-medium">{faq.question}</span>
        <span className="text-city-gray">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-city-steel bg-city-slate/30">
          <p className="text-city-gray">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

interface CTASectionProps {
  section: Extract<PageSection, { sectionType: 'cta' }>
  countryCode: string
}

function CTAContent({ section, countryCode }: CTASectionProps) {
  return (
    <div className="text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-city-white mb-4">
        {section.heading}
      </h3>
      {section.description && (
        <p className="text-city-gray mb-8 max-w-2xl mx-auto">
          {section.description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {section.primaryButton && (
          <Link
            to={(`/${countryCode}${section.primaryButton.href}`) as any}
            className="px-6 py-3 bg-city-lime text-city-charcoal font-medium rounded-lg hover:bg-city-lime/90 transition-colors"
          >
            {section.primaryButton.label}
          </Link>
        )}
        {section.secondaryButton && (
          <Link
            to={(`/${countryCode}${section.secondaryButton.href}`) as any}
            className="px-6 py-3 border border-city-steel text-city-white font-medium rounded-lg hover:bg-city-slate transition-colors"
          >
            {section.secondaryButton.label}
          </Link>
        )}
      </div>
    </div>
  )
}
