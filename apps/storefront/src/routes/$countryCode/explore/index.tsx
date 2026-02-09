/**
 * Explore Route
 * 
 * Lists all POIs and nodes for exploration.
 * This is the main entry point for discovering city content.
 * 
 * Route: /{countryCode}/explore
 */

import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { createTenantClient, getTenantFromWindow } from '@/lib/payload';
import { POIGrid, POIList, PageSkeleton } from '@/components/cms';
import type { POI, POICategory, Node } from '@/lib/payload/types';

// =============================================================================
// SEARCH PARAMS
// =============================================================================

interface ExploreSearchParams {
  category?: POICategory;
  view?: 'grid' | 'list' | 'map';
  q?: string;
}

// =============================================================================
// ROUTE DEFINITION
// =============================================================================

export const Route = createFileRoute('/$countryCode/explore/')({
  component: ExploreComponent,
  pendingComponent: PageSkeleton,
  validateSearch: (search: Record<string, unknown>): ExploreSearchParams => {
    return {
      category: search.category as POICategory | undefined,
      view: (search.view as 'grid' | 'list' | 'map') || 'grid',
      q: search.q as string | undefined,
    };
  },
  loader: async ({ params }) => {
    const { countryCode } = params;
    
    // Resolve tenant
    const tenantInfo = getTenantFromWindow();
    const tenantSlug = tenantInfo?.slug || 'platform';
    
    // Create tenant-scoped client
    const client = createTenantClient(tenantSlug, countryCode);
    
    try {
      // Fetch featured POIs and root nodes
      const [featuredPOIs, rootNodes] = await Promise.all([
        client.getFeaturedPOIs(12),
        client.getRootNodes(),
      ]);
      
      return {
        featuredPOIs,
        rootNodes,
        tenantSlug,
      };
    } catch {
      // Development mock
      return {
        featuredPOIs: createMockPOIs(),
        rootNodes: createMockNodes(),
        tenantSlug,
        isMock: true,
      };
    }
  },
  meta: () => [
    { title: 'Explore - Discover Places' },
    { name: 'description', content: 'Explore points of interest, attractions, and services in your city.' },
  ],
});

// =============================================================================
// COMPONENT
// =============================================================================

function ExploreComponent() {
  const { featuredPOIs, rootNodes, isMock } = Route.useLoaderData();
  const { category, view, q } = Route.useSearch();
  
  const categories: { id: POICategory; label: string; icon: string }[] = [
    { id: 'attraction', label: 'Attractions', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { id: 'restaurant', label: 'Restaurants', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'hotel', label: 'Hotels', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'shopping', label: 'Shopping', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'transport', label: 'Transport', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 'healthcare', label: 'Healthcare', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'government', label: 'Government', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
  ];
  
  // Filter POIs by category if selected
  const filteredPOIs = category 
    ? featuredPOIs.filter(poi => poi.category === category)
    : featuredPOIs;
  
  return (
    <div className="min-h-screen">
      {/* Development mode indicator */}
      {isMock && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-center text-sm text-yellow-800">
          CMS Preview Mode - Using mock data (Payload CMS not connected)
        </div>
      )}
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Your City</h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discover attractions, restaurants, services, and more in your area.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="search"
                placeholder="Search places..."
                defaultValue={q}
                className="w-full px-6 py-4 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-8 px-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-40">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <Link
              to="/explore"
              search={{ view }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                !category ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to="/explore"
                search={{ category: cat.id, view }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  category === cat.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                </svg>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* View Toggle */}
      <section className="py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredPOIs.length} places found
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/explore"
              search={{ category, view: 'grid' }}
              className={`p-2 rounded-lg ${view === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
            <Link
              to="/explore"
              search={{ category, view: 'list' }}
              className={`p-2 rounded-lg ${view === 'list' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </Link>
            <Link
              to="/explore"
              search={{ category, view: 'map' }}
              className={`p-2 rounded-lg ${view === 'map' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {view === 'list' ? (
            <POIList pois={filteredPOIs} />
          ) : view === 'map' ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <POIList pois={filteredPOIs} />
              <div className="bg-gray-200 dark:bg-gray-800 rounded-xl h-[600px] flex items-center justify-center sticky top-24">
                <p className="text-gray-500">Map View (Connect mapping service)</p>
              </div>
            </div>
          ) : (
            <POIGrid pois={filteredPOIs} columns={3} />
          )}
        </div>
      </section>
      
      {/* City Nodes */}
      {rootNodes.length > 0 && (
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Explore by Area</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rootNodes.map((node) => (
                <Link
                  key={node.id}
                  to={`/explore/${node.slug}`}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold">{node.name}</h3>
                  <p className="text-gray-500 mt-1">{node.type}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// =============================================================================
// MOCK DATA
// =============================================================================

function createMockPOIs(): POI[] {
  const categories: POICategory[] = ['attraction', 'restaurant', 'hotel', 'shopping', 'transport', 'healthcare'];
  const names = [
    'City Museum', 'Grand Hotel', 'Central Mall', 'Metro Station', 
    'Heritage Park', 'Fine Dining', 'Medical Center', 'Cultural Center',
    'Sports Arena', 'Convention Center', 'Art Gallery', 'Public Library'
  ];
  
  return names.map((name, index) => ({
    id: `mock-${index}`,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    description: `Discover ${name}, a premier destination in our city.`,
    category: categories[index % categories.length],
    tenant: 'platform',
    node: 'city-center',
    location: {
      address: `${100 + index} Main Street`,
      coordinates: { lat: 24.7136 + (index * 0.01), lng: 46.6753 + (index * 0.01) },
    },
    rating: {
      average: 3.5 + (Math.random() * 1.5),
      count: Math.floor(Math.random() * 200) + 10,
    },
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

function createMockNodes(): Node[] {
  return [
    { id: 'node-1', slug: 'city-center', name: 'City Center', type: 'DISTRICT', code: 'CC', tenant: 'platform', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'node-2', slug: 'downtown', name: 'Downtown', type: 'DISTRICT', code: 'DT', tenant: 'platform', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'node-3', slug: 'waterfront', name: 'Waterfront', type: 'ZONE', code: 'WF', tenant: 'platform', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];
}
