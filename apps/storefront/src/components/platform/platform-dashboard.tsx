/**
 * Platform Dashboard Component
 * 
 * Main dashboard for CityOS platform context visualization.
 * Displays tenant info, systems, hierarchy, governance, and capabilities.
 */

import React, { useState } from 'react'
import {
  BuildingStorefront,
  Server,
  Buildings,
  DocumentText,
  PuzzleSolid,
  ArrowPath,
  Clock,
  CheckCircleSolid,
  ExclamationCircleSolid,
} from '@medusajs/icons'
import { useCityOS } from '@/lib/cityos'
import { TenantCard } from './tenant-card'
import { SystemsGrid } from './systems-grid'
import { NodeHierarchyTree } from './node-hierarchy-tree'
import { GovernancePanel } from './governance-panel'
import { CapabilitiesPanel } from './capabilities-panel'
import type { NodeHierarchy } from '@/lib/cityos/types'

type TabId = 'overview' | 'systems' | 'hierarchy' | 'governance' | 'capabilities'

interface Tab {
  id: TabId
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: BuildingStorefront },
  { id: 'systems', label: 'Systems', icon: Server },
  { id: 'hierarchy', label: 'Hierarchy', icon: Buildings },
  { id: 'governance', label: 'Governance', icon: DocumentText },
  { id: 'capabilities', label: 'Capabilities', icon: PuzzleSolid },
]

export function PlatformDashboard(): React.ReactElement {
  const {
    context,
    tenant,
    nodeHierarchy,
    governance,
    capabilities,
    systems,
    isLoading,
    error,
    isDefaultTenant,
    resolvedAt,
    currentLocale,
    supportedLocales,
    setLocale,
    currentNode,
    setCurrentNode,
    refetch,
    hasFeature,
  } = useCityOS()

  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [selectedNode, setSelectedNode] = useState<NodeHierarchy | null>(null)

  const handleNodeSelect = (node: NodeHierarchy) => {
    setSelectedNode(node)
    setCurrentNode(node.id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading platform context...</p>
        </div>
      </div>
    )
  }

  if (error && !context) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <ExclamationCircleSolid className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Failed to Load Context</h2>
          <p className="text-white/60 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowPath className="w-4 h-4 inline mr-2" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Buildings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">CityOS Platform</h1>
                <p className="text-sm text-white/50">
                  {tenant?.name || 'Platform'} Context Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Locale Selector */}
              <select
                value={currentLocale}
                onChange={(e) => setLocale(e.target.value as typeof currentLocale)}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
              >
                {supportedLocales.map(locale => (
                  <option key={locale} value={locale}>
                    {locale.toUpperCase()}
                  </option>
                ))}
              </select>

              {/* Refresh Button */}
              <button
                onClick={() => refetch()}
                className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                title="Refresh context"
              >
                <ArrowPath className="w-5 h-5" />
              </button>

              {/* Context Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <CheckCircleSolid className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/70">Context Loaded</span>
              </div>
            </div>
          </div>

          {/* Resolved Info */}
          {resolvedAt && (
            <div className="flex items-center gap-4 mt-3 text-xs text-white/40">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Resolved: {new Date(resolvedAt).toLocaleString()}
              </span>
              {isDefaultTenant && (
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Default Tenant
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1">
            {tabs.map(tab => {
              const TabIcon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors
                    border-b-2 -mb-px
                    ${isActive
                      ? 'text-white border-white'
                      : 'text-white/50 border-transparent hover:text-white/80 hover:border-white/30'
                    }
                  `}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && tenant && (
          <div className="space-y-8">
            {/* Tenant Card */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">Current Tenant</h2>
              <TenantCard tenant={tenant} isDefault={isDefaultTenant} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl border border-white/10 bg-black/40">
                <p className="text-sm text-white/50 mb-1">Systems</p>
                <p className="text-3xl font-semibold text-white">{systems?.total || 0}</p>
                <p className="text-xs text-emerald-400 mt-1">{systems?.active || 0} active</p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 bg-black/40">
                <p className="text-sm text-white/50 mb-1">Hierarchy Levels</p>
                <p className="text-3xl font-semibold text-white">{context?.hierarchyLevels.length || 0}</p>
                <p className="text-xs text-white/40 mt-1">CITY to ASSET</p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 bg-black/40">
                <p className="text-sm text-white/50 mb-1">Authorities</p>
                <p className="text-3xl font-semibold text-white">{governance?.authorities.length || 0}</p>
                <p className="text-xs text-white/40 mt-1">Governance bodies</p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 bg-black/40">
                <p className="text-sm text-white/50 mb-1">Plugins</p>
                <p className="text-3xl font-semibold text-white">
                  {capabilities ? 
                    capabilities.plugins.official.length + 
                    capabilities.plugins.community.length + 
                    capabilities.plugins.custom.length 
                    : 0
                  }
                </p>
                <p className="text-xs text-white/40 mt-1">Installed</p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">Platform Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: 'multiTenancy', label: 'Multi-Tenancy' },
                  { key: 'rbac', label: 'RBAC' },
                  { key: 'twoFactorAuth', label: '2FA' },
                  { key: 'localization', label: 'Localization' },
                  { key: 'objectStorage', label: 'Object Storage' },
                  { key: 'videoProcessing', label: 'Video Processing' },
                  { key: 'workflowOrchestration', label: 'Workflows' },
                  { key: 'openApiDocs', label: 'OpenAPI Docs' },
                ].map(feature => {
                  const enabled = capabilities && hasFeature(feature.key as keyof typeof capabilities.features)
                  return (
                    <div
                      key={feature.key}
                      className={`p-3 rounded-lg border ${
                        enabled
                          ? 'bg-emerald-500/10 border-emerald-500/20'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">{feature.label}</span>
                        {enabled ? (
                          <CheckCircleSolid className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/20" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Context Headers */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">Context Headers</h2>
              <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                <div className="flex flex-wrap gap-2">
                  {context?.contextHeaders.map(header => (
                    <code
                      key={header}
                      className="px-3 py-1.5 text-sm font-mono rounded-lg bg-white/5 text-white/70 border border-white/10"
                    >
                      {header}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Systems Tab */}
        {activeTab === 'systems' && systems && (
          <SystemsGrid
            systems={systems.registry}
            totalSystems={systems.total}
            activeSystems={systems.active}
            externalSystems={systems.external}
          />
        )}

        {/* Hierarchy Tab */}
        {activeTab === 'hierarchy' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Node Hierarchy</h2>
              {selectedNode && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/50">Selected:</span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-sm">
                    {selectedNode.name} ({selectedNode.code})
                  </span>
                  <button
                    onClick={() => {
                      setSelectedNode(null)
                      setCurrentNode(null)
                    }}
                    className="text-white/50 hover:text-white"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            <NodeHierarchyTree
              nodes={nodeHierarchy}
              selectedNodeId={selectedNode?.id}
              onNodeSelect={handleNodeSelect}
              expandedByDefault={true}
            />
          </div>
        )}

        {/* Governance Tab */}
        {activeTab === 'governance' && governance && (
          <div>
            <h2 className="text-lg font-medium text-white mb-4">Governance Chain</h2>
            <GovernancePanel governance={governance} />
          </div>
        )}

        {/* Capabilities Tab */}
        {activeTab === 'capabilities' && capabilities && (
          <div>
            <h2 className="text-lg font-medium text-white mb-4">Platform Capabilities</h2>
            <CapabilitiesPanel capabilities={capabilities} />
          </div>
        )}
      </div>
    </div>
  )
}
