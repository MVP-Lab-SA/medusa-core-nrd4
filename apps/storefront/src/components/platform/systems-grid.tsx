/**
 * Systems Grid Component
 * 
 * Displays registered systems in the platform with status and capabilities.
 */

import React, { useState } from 'react'
import {
  CheckCircleSolid,
  Clock,
  XCircleSolid,
  Server,
  CurrencyDollar,
  ShoppingCart,
  User,
  EnvelopeSolid,
  ChartBar,
  CogSixTooth,
  CloudArrowUp,
  MagnifyingGlass,
  MapPin,
  Sparkles,
  TruckFast,
  ComputerDesktop,
  Share,
  ArrowPath,
  Buildings,
} from '@medusajs/icons'
import type { RegisteredSystem, SystemCategory, SystemStatus, SystemType } from '@/lib/cityos/types'

interface SystemsGridProps {
  systems: RegisteredSystem[]
  totalSystems?: number
  activeSystems?: number
  externalSystems?: number
}

const categoryIcons: Record<SystemCategory, React.ComponentType<{ className?: string }>> = {
  cms: Server,
  commerce: ShoppingCart,
  identity: User,
  payments: CurrencyDollar,
  logistics: TruckFast,
  analytics: ChartBar,
  communication: EnvelopeSolid,
  infrastructure: CogSixTooth,
  workflow: ArrowPath,
  erp: Buildings,
  storage: CloudArrowUp,
}

const categoryColors: Record<SystemCategory, string> = {
  cms: 'from-blue-500 to-blue-600',
  commerce: 'from-emerald-500 to-emerald-600',
  identity: 'from-purple-500 to-purple-600',
  payments: 'from-yellow-500 to-yellow-600',
  logistics: 'from-orange-500 to-orange-600',
  analytics: 'from-pink-500 to-pink-600',
  communication: 'from-cyan-500 to-cyan-600',
  infrastructure: 'from-gray-500 to-gray-600',
  workflow: 'from-indigo-500 to-indigo-600',
  erp: 'from-red-500 to-red-600',
  storage: 'from-teal-500 to-teal-600',
}

const statusConfig: Record<SystemStatus, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  active: { color: 'text-emerald-400', icon: CheckCircleSolid },
  planned: { color: 'text-yellow-400', icon: Clock },
  deprecated: { color: 'text-red-400', icon: XCircleSolid },
}

const typeLabels: Record<SystemType, { label: string; color: string }> = {
  internal: { label: 'Internal', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  external: { label: 'External', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  stub: { label: 'Stub', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
}

export function SystemsGrid({ 
  systems, 
  totalSystems = 22,
  activeSystems = 10,
  externalSystems = 4,
}: SystemsGridProps): React.ReactElement {
  const [filter, setFilter] = useState<SystemCategory | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<SystemStatus | 'all'>('all')

  const filteredSystems = systems.filter(system => {
    if (filter !== 'all' && system.category !== filter) return false
    if (statusFilter !== 'all' && system.status !== statusFilter) return false
    return true
  })

  const categories = Array.from(new Set(systems.map(s => s.category)))

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-white/50 mb-1">Total Systems</p>
          <p className="text-2xl font-semibold text-white">{totalSystems}</p>
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-sm text-emerald-400/70 mb-1">Active</p>
          <p className="text-2xl font-semibold text-emerald-400">{activeSystems}</p>
        </div>
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm text-purple-400/70 mb-1">External</p>
          <p className="text-2xl font-semibold text-purple-400">{externalSystems}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">Category:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as SystemCategory | 'all')}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as SystemStatus | 'all')}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="planned">Planned</option>
            <option value="deprecated">Deprecated</option>
          </select>
        </div>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSystems.map(system => {
          const CategoryIcon = categoryIcons[system.category] || Server
          const StatusIcon = statusConfig[system.status].icon
          const typeConfig = typeLabels[system.type]

          return (
            <div
              key={system.id}
              className="p-4 rounded-xl border border-white/10 bg-black/40 hover:border-white/20 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[system.category]} flex items-center justify-center`}>
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{system.name}</h4>
                    <p className="text-xs text-white/40 font-mono">{system.id}</p>
                  </div>
                </div>
                <StatusIcon className={`w-5 h-5 ${statusConfig[system.status].color}`} />
              </div>

              {/* Type and Category Tags */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${typeConfig.color}`}>
                  {typeConfig.label}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/5 text-white/60 border border-white/10">
                  {system.category}
                </span>
              </div>

              {/* Capabilities */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-white/40 mb-2">Capabilities:</p>
                <div className="flex flex-wrap gap-1">
                  {system.capabilities.slice(0, 4).map(cap => (
                    <span
                      key={cap}
                      className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/60"
                    >
                      {cap}
                    </span>
                  ))}
                  {system.capabilities.length > 4 && (
                    <span className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/40">
                      +{system.capabilities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Base URL indicator */}
              {system.hasBaseUrl && (
                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400/70">
                  <CheckCircleSolid className="w-3 h-3" />
                  <span>Base URL configured</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredSystems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50">No systems match the selected filters</p>
        </div>
      )}
    </div>
  )
}
