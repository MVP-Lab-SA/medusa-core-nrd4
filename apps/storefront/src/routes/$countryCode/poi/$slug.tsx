/**
 * POI Detail Route
 * 
 * Displays a Point of Interest from Payload CMS.
 * 
 * Route: /{countryCode}/poi/{slug}
 */

import { createFileRoute, notFound } from '@tanstack/react-router';
import { createTenantClient, getTenantFromWindow } from '@/lib/payload';
import { POIDetail, PageSkeleton, PageError } from '@/components/cms';
import type { POI } from '@/lib/payload/types';

// =============================================================================
// ROUTE DEFINITION
// =============================================================================

export const Route = createFileRoute('/$countryCode/poi/$slug')({
  component: POIPageComponent,
  pendingComponent: PageSkeleton,
  errorComponent: ({ error }) => (
    <PageError error={error?.message} statusCode={500} />
  ),
  notFoundComponent: () => <PageError statusCode={404} />,
  loader: async ({ params }): Promise<any> => {
    const { slug, countryCode } = params;
    
    // Resolve tenant
    const tenantInfo = getTenantFromWindow();
    const tenantSlug = tenantInfo?.slug || 'platform';
    
    // Create tenant-scoped client
    const client = createTenantClient(tenantSlug, countryCode);
    
    try {
      const poi = await client.getPOI(slug);
      
      if (!poi) {
        throw notFound();
      }
      
      return { poi, relatedPOIs: [], tenantSlug };
    } catch (error) {
      // Development mock
      if (process.env.NODE_ENV === 'development') {
        return {
          poi: createMockPOI(slug),
          relatedPOIs: [],
          tenantSlug,
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

function POIPageComponent() {
  const data = Route.useLoaderData() as any;
  const { poi, relatedPOIs, isMock } = data || {};
  const params = Route.useParams();
  
  return (
    <div className="min-h-screen">
      {/* Development mode indicator */}
      {isMock && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-center text-sm text-yellow-800">
          CMS Preview Mode - Using mock data (Payload CMS not connected)
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <POIDetail poi={poi} countryCode={params.countryCode} />
        
        {/* Related POIs */}
        {relatedPOIs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Places</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPOIs.map((relatedPoi) => (
                <a
                  key={relatedPoi.id}
                  href={`/poi/${relatedPoi.slug}`}
                  className="block rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
                >
                  {relatedPoi.media?.featured && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPoi.media.featured.url}
                        alt={relatedPoi.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold">{relatedPoi.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{relatedPoi.category}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// MOCK DATA
// =============================================================================

function createMockPOI(slug: string): POI {
  const name = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    id: `mock-${slug}`,
    slug,
    name,
    type: 'place' as const,
    description: `Experience ${name}, one of the most popular destinations in the city. This is mock data - connect to Payload CMS to see real POI content.`,
    primaryCategory: 'museum' as const,
    tenant: 'platform',
    node: 'city-center',
    address: '123 Main Street, City Center',
    coordinates: {
      lat: 24.7136,
      lng: 46.6753,
    },
    phone: '+1 234 567 8900',
    email: 'info@example.com',
    website: 'https://example.com',
    regularOpeningHours: [
      { day: 'monday' as const, open: '09:00', close: '18:00' },
      { day: 'tuesday' as const, open: '09:00', close: '18:00' },
      { day: 'wednesday' as const, open: '09:00', close: '18:00' },
      { day: 'thursday' as const, open: '09:00', close: '18:00' },
      { day: 'friday' as const, open: '10:00', close: '16:00' },
      { day: 'saturday' as const, open: '10:00', close: '20:00' },
      { day: 'sunday' as const, open: '10:00', close: '20:00', closed: true },
    ],
    rating: 4.5,
    totalReviews: 128,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as unknown as POI;
}
