/**
 * Platform Dashboard Route
 * 
 * Displays the CityOS platform context dashboard with tenant info,
 * systems, hierarchy, governance, and capabilities.
 */

import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CityOSProvider } from '@/lib/cityos'
import { PlatformDashboard } from '@/components/platform/platform-dashboard'

export const Route = createFileRoute('/$countryCode/platform/')({
  component: PlatformPage,
  head: () => ({
    meta: [
      { title: 'Platform Dashboard | CityOS' },
      { name: 'description', content: 'CityOS Platform Context Dashboard - View tenant info, systems, hierarchy, and capabilities' },
    ],
  }),
})

function PlatformPage(): React.ReactElement {
  return (
    <CityOSProvider 
      tenant="platform" 
      fallbackToDefault={true}
      onContextLoaded={(context) => {
        console.log('[CityOS] Platform context loaded:', context.tenant.name)
      }}
    >
      <PlatformDashboard />
    </CityOSProvider>
  )
}
