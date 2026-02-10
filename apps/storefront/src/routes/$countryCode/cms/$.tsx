/**
 * CMS Catch-All Route
 * 
 * Handles all content pages from Payload CMS.
 * Falls through to 404 if page not found in CMS.
 * 
 * Route: /{countryCode}/cms/{...slug}
 * 
 * This route is separate from Medusa commerce routes (/products, /cart, /checkout, etc.)
 */

import { createFileRoute, notFound } from '@tanstack/react-router';
import { createTenantClient, getTenantFromWindow } from '@/lib/payload';
import { PageRenderer, PageSkeleton, PageError } from '@/components/cms';
import type { Page } from '@/lib/payload/types';

// =============================================================================
// ROUTE DEFINITION
// =============================================================================

export const Route = createFileRoute('/$countryCode/cms/$')({
  component: CMSPageComponent,
  pendingComponent: PageSkeleton,
  errorComponent: ({ error }) => (
    <PageError error={error?.message} statusCode={500} />
  ),
  notFoundComponent: () => <PageError statusCode={404} />,
  loader: async ({ params }): Promise<any> => {
    const slug = params['_splat'] || 'home';
    const locale = params.countryCode;
    
    // Resolve tenant from window (client) or use default
    const tenantInfo = getTenantFromWindow();
    const tenantSlug = tenantInfo?.slug || 'platform';
    
    // Create tenant-scoped client
    const client = createTenantClient(tenantSlug, locale);
    
    try {
      const page = await client.getPage(slug);
      
      if (!page) {
        throw notFound();
      }
      
      return { page, tenantSlug, locale };
    } catch (error) {
      // If CMS is unavailable, return mock data for development
      if (process.env.NODE_ENV === 'development') {
        return {
          page: createMockPage(slug),
          tenantSlug,
          locale,
          isMock: true,
        };
      }
      throw error;
    }
  },
});

// =============================================================================
// COMPONENT
// =============================================================================

function CMSPageComponent() {
  const data = Route.useLoaderData() as any;
  const { page, isMock } = data || {};
  const params = Route.useParams();
  
  return (
    <div>
      {/* Development mode indicator */}
      {isMock && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-center text-sm text-yellow-800">
          CMS Preview Mode - Using mock data (Payload CMS not connected)
        </div>
      )}
      
      <PageRenderer page={page} countryCode={params.countryCode} />
    </div>
  );
}

// =============================================================================
// MOCK DATA (Development)
// =============================================================================

function createMockPage(slug: string): Page {
  return {
    id: `mock-${slug}`,
    slug,
    title: formatSlugAsTitle(slug),
    tenant: 'platform',
    version: 1,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    layout: [
      {
        id: 'mock-hero',
        blockType: 'hero',
        variant: 'default',
        heading: formatSlugAsTitle(slug),
        subheading: 'Content managed by Payload CMS',
        overlay: {
          enabled: true,
          color: '#000000',
          opacity: 0.4,
        },
        alignment: 'center',
        height: 'half',
      } as any,
      {
        id: 'mock-content',
        blockType: 'richText',
        maxWidth: 'lg',
        content: {
          root: {
            type: 'root',
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: `This is placeholder content for the "${slug}" page. When connected to Payload CMS, this will display your actual content with all the rich features of the block editor.`,
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [
                  { type: 'text', version: 1, text: 'Getting Started' },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'To connect this storefront to your Payload CMS instance:',
                  },
                ],
              },
              {
                type: 'list',
                listType: 'number',
                version: 1,
                children: [
                  {
                    type: 'listitem',
                    version: 1,
                    children: [
                      { type: 'text', version: 1, text: 'Set the PAYLOAD_CMS_URL environment variable' },
                    ],
                  },
                  {
                    type: 'listitem',
                    version: 1,
                    children: [
                      { type: 'text', version: 1, text: 'Configure your tenant in Payload' },
                    ],
                  },
                  {
                    type: 'listitem',
                    version: 1,
                    children: [
                      { type: 'text', version: 1, text: 'Create pages using the block editor' },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      {
        id: 'mock-cta',
        blockType: 'cta',
        variant: 'card',
        heading: 'Ready to create content?',
        content: 'Head to your Payload CMS dashboard to start building pages.',
        buttons: [
          {
            label: 'Open Payload CMS',
            url: 'https://payloadcms.com',
            variant: 'primary',
          },
        ],
      },
    ],
  };
}

function formatSlugAsTitle(slug: string): string {
  return slug
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
