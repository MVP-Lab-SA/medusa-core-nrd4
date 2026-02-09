/**
 * CMS Page Renderer
 * 
 * Renders a full page from Payload CMS data.
 * Handles hero, layout blocks, meta tags, and breadcrumbs.
 */

import React from 'react';
import type { Page, PageTemplate } from '@/lib/payload/types';
import { BlockRenderer, RichText } from './blocks';

// =============================================================================
// PAGE META
// =============================================================================

interface PageMetaProps {
  page: Page;
}

export function PageMeta({ page }: PageMetaProps) {
  const title = page.meta?.title || page.title;
  const description = page.meta?.description || page.description;
  const image = page.meta?.image?.url;

  // In TanStack Start, we'd use createFileRoute's meta option
  // This is for reference and can be integrated with the route's meta
  return null;
}

export function getPageMeta(page: Page) {
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || page.description,
    openGraph: page.meta?.image ? {
      images: [{ url: page.meta.image.url }],
    } : undefined,
    robots: page.meta?.noIndex ? { index: false, follow: false } : undefined,
  };
}

// =============================================================================
// BREADCRUMBS
// =============================================================================

interface BreadcrumbsProps {
  items: { label: string; url?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4">
      <div className="container mx-auto">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          <li>
            <a href="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </a>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-gray-400">/</span>
              {item.url && index < items.length - 1 ? (
                <a href={item.url} className="text-gray-500 hover:text-primary transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-900 dark:text-white font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

// =============================================================================
// PAGE HEADER
// =============================================================================

interface PageHeaderProps {
  title: string;
  description?: string;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: { label: string; url?: string }[];
}

export function PageHeader({ title, description, showBreadcrumbs, breadcrumbItems }: PageHeaderProps) {
  return (
    <header className="bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto">
        {showBreadcrumbs && breadcrumbItems && (
          <Breadcrumbs items={breadcrumbItems} />
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}

// =============================================================================
// PAGE RENDERER
// =============================================================================

interface PageRendererProps {
  page: Page;
  template?: PageTemplate;
}

export function PageRenderer({ page, template }: PageRendererProps) {
  // Determine template type for conditional rendering
  const templateType = typeof page.template === 'string' 
    ? template?.type 
    : page.template?.type;

  // Build breadcrumb items
  const breadcrumbItems = page.breadcrumb?.enabled 
    ? page.breadcrumb.items || [{ label: page.title }]
    : undefined;

  return (
    <article>
      {/* Hero Section (if present) */}
      {page.hero && (
        <BlockRenderer blocks={[page.hero]} />
      )}

      {/* Page Header (for non-hero pages) */}
      {!page.hero && (
        <PageHeader
          title={page.title}
          description={page.description}
          showBreadcrumbs={page.breadcrumb?.enabled}
          breadcrumbItems={breadcrumbItems}
        />
      )}

      {/* Breadcrumbs (for hero pages, shown below hero) */}
      {page.hero && page.breadcrumb?.enabled && breadcrumbItems && (
        <Breadcrumbs items={breadcrumbItems} />
      )}

      {/* Main Content - Layout Blocks */}
      <main>
        <BlockRenderer blocks={page.layout} />
      </main>
    </article>
  );
}

// =============================================================================
// LOADING SKELETON
// =============================================================================

export function PageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-gray-200 dark:bg-gray-800 h-[50vh] min-h-[400px]" />

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-4 max-w-3xl">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ERROR STATE
// =============================================================================

interface PageErrorProps {
  error?: string;
  statusCode?: number;
}

export function PageError({ error, statusCode = 404 }: PageErrorProps) {
  const isNotFound = statusCode === 404;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">
          {statusCode}
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
          {isNotFound ? 'Page Not Found' : 'Something Went Wrong'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          {error || (isNotFound 
            ? "The page you're looking for doesn't exist or has been moved."
            : 'An error occurred while loading this page.'
          )}
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { PageRendererProps, PageHeaderProps, BreadcrumbsProps };
