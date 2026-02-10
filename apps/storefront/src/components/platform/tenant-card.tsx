/**
 * Tenant Card Component
 * 
 * Displays tenant information with status, settings, and governance info.
 */

import React from 'react'
import { 
  BuildingStorefront, 
  GlobeEurope, 
  Clock, 
  CurrencyDollar,
  CheckCircleSolid,
  XCircleSolid,
} from '@medusajs/icons'
import type { Tenant, ResidencyZone } from '@/lib/cityos/types'

interface TenantCardProps {
  tenant: Tenant
  isDefault?: boolean
  onClick?: () => void
}

const residencyZoneColors: Record<ResidencyZone, string> = {
  GCC: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  EU: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  MENA: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  GLOBAL: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export function TenantCard({ tenant, isDefault, onClick }: TenantCardProps): React.ReactElement {
  const isActive = tenant.status === 'active'

  return (
    <div
      onClick={onClick}
      className={`
        relative p-6 rounded-xl border transition-all duration-300
        ${onClick ? 'cursor-pointer hover:border-white/30 hover:bg-white/5' : ''}
        ${isActive ? 'border-white/10 bg-black/40' : 'border-red-500/20 bg-red-500/5'}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
            <BuildingStorefront className="w-6 h-6 text-white/70" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">{tenant.name}</h3>
            <p className="text-sm text-white/50">{tenant.domain}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isDefault && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Default
            </span>
          )}
          <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
            isActive 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {isActive ? (
              <CheckCircleSolid className="w-3 h-3" />
            ) : (
              <XCircleSolid className="w-3 h-3" />
            )}
            {tenant.status}
          </span>
        </div>
      </div>

      {/* Description */}
      {tenant.description && (
        <p className="text-sm text-white/60 mb-4 line-clamp-2">
          {tenant.description}
        </p>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <GlobeEurope className="w-4 h-4 text-white/40" />
          <span className="text-white/60">Locale:</span>
          <span className="text-white/90 font-medium">
            {tenant.settings.defaultLocale.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-white/40" />
          <span className="text-white/60">TZ:</span>
          <span className="text-white/90 font-medium truncate">
            {tenant.settings.timezone}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CurrencyDollar className="w-4 h-4 text-white/40" />
          <span className="text-white/60">Currency:</span>
          <span className="text-white/90 font-medium">
            {tenant.settings.currency}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/60">Locales:</span>
          <span className="text-white/90 font-medium">
            {tenant.settings.supportedLocales.length}
          </span>
        </div>
      </div>

      {/* Residency Zone */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-xs text-white/40 uppercase tracking-wider">
          Data Residency
        </span>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${residencyZoneColors[tenant.residencyZone]}`}>
          {tenant.residencyZone}
        </span>
      </div>

      {/* Slug Badge */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-white/30 font-mono">{tenant.slug}</span>
      </div>
    </div>
  )
}
