/**
 * Capabilities Panel Component
 * 
 * Displays platform capabilities including plugins, features, and endpoints.
 */

import React, { useState } from 'react'
import {
  CheckCircleSolid,
  XCircleSolid,
  PuzzleSolid,
  CogSixTooth,
  ArrowUpRightOnBox,
  ChevronDown,
  ChevronRight,
} from '@medusajs/icons'
import type { Capabilities } from '@/lib/cityos/types'

interface CapabilitiesPanelProps {
  capabilities: Capabilities
  className?: string
}

const pluginTypeColors = {
  official: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  community: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  custom: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
}

const featureDescriptions: Record<string, string> = {
  twoFactorAuth: 'Two-factor authentication for enhanced security',
  rbac: 'Role-based access control for granular permissions',
  multiTenancy: 'Multi-tenant architecture support',
  localization: 'Multi-language content management',
  objectStorage: 'S3-compatible object storage',
  videoProcessing: 'Video upload and transcoding',
  openApiDocs: 'OpenAPI specification and Swagger UI',
  aiContent: 'AI-powered content generation',
  analytics: 'Built-in analytics and reporting',
  payments: 'Payment processing integration',
  errorTracking: 'Error monitoring and tracking',
  workflowOrchestration: 'Temporal workflow orchestration',
}

export function CapabilitiesPanel({ capabilities, className = '' }: CapabilitiesPanelProps): React.ReactElement {
  const [expandedSection, setExpandedSection] = useState<'plugins' | 'features' | 'endpoints' | null>('features')

  const { plugins, features, endpoints } = capabilities

  const totalPlugins = plugins.official.length + plugins.community.length + plugins.custom.length
  const enabledFeatures = Object.entries(features).filter(([_, value]) => {
    if (typeof value === 'boolean') return value
    return !!value
  }).length
  const totalFeatures = Object.keys(features).length

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-400/70 mb-1">Plugins</p>
          <p className="text-2xl font-semibold text-blue-400">{totalPlugins}</p>
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-sm text-emerald-400/70 mb-1">Features Enabled</p>
          <p className="text-2xl font-semibold text-emerald-400">
            {enabledFeatures}/{totalFeatures}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm text-purple-400/70 mb-1">Endpoints</p>
          <p className="text-2xl font-semibold text-purple-400">
            {Object.keys(endpoints).length}
          </p>
        </div>
      </div>

      {/* Plugins Section */}
      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'plugins' ? null : 'plugins')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <PuzzleSolid className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-white">Plugins</span>
            <span className="text-sm text-white/50">({totalPlugins} installed)</span>
          </div>
          {expandedSection === 'plugins' ? (
            <ChevronDown className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSection === 'plugins' && (
          <div className="p-4 pt-0 space-y-4">
            {/* Official Plugins */}
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Official</p>
              <div className="flex flex-wrap gap-2">
                {plugins.official.map(plugin => (
                  <span
                    key={plugin}
                    className={`px-3 py-1.5 text-sm rounded-lg border ${pluginTypeColors.official}`}
                  >
                    {plugin}
                  </span>
                ))}
              </div>
            </div>

            {/* Community Plugins */}
            {plugins.community.length > 0 && (
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Community</p>
                <div className="flex flex-wrap gap-2">
                  {plugins.community.map(plugin => (
                    <span
                      key={plugin}
                      className={`px-3 py-1.5 text-sm rounded-lg border ${pluginTypeColors.community}`}
                    >
                      {plugin}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Plugins */}
            {plugins.custom.length > 0 && (
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Custom</p>
                <div className="flex flex-wrap gap-2">
                  {plugins.custom.map(plugin => (
                    <span
                      key={plugin}
                      className={`px-3 py-1.5 text-sm rounded-lg border ${pluginTypeColors.custom}`}
                    >
                      {plugin}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'features' ? null : 'features')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <CogSixTooth className="w-5 h-5 text-emerald-400" />
            <span className="font-medium text-white">Features</span>
            <span className="text-sm text-white/50">({enabledFeatures} enabled)</span>
          </div>
          {expandedSection === 'features' ? (
            <ChevronDown className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSection === 'features' && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(features).map(([key, value]) => {
                const isEnabled = typeof value === 'boolean' ? value : !!value
                const isLocalization = key === 'localization' && typeof value === 'object'

                return (
                  <div
                    key={key}
                    className={`p-3 rounded-lg border transition-colors ${
                      isEnabled
                        ? 'bg-emerald-500/10 border-emerald-500/20'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      {isEnabled ? (
                        <CheckCircleSolid className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircleSolid className="w-5 h-5 text-white/30" />
                      )}
                    </div>
                    <p className="text-xs text-white/50">
                      {featureDescriptions[key] || 'No description available'}
                    </p>
                    {isLocalization && value && typeof value === 'object' && 'locales' in value && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {(value as { locales: string[] }).locales.map(locale => (
                          <span
                            key={locale}
                            className="px-2 py-0.5 text-xs rounded bg-emerald-500/20 text-emerald-400"
                          >
                            {locale.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Endpoints Section */}
      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'endpoints' ? null : 'endpoints')}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ArrowUpRightOnBox className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-white">API Endpoints</span>
            <span className="text-sm text-white/50">({Object.keys(endpoints).length} available)</span>
          </div>
          {expandedSection === 'endpoints' ? (
            <ChevronDown className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white/50" />
          )}
        </button>

        {expandedSection === 'endpoints' && (
          <div className="p-4 pt-0">
            {Object.keys(endpoints).length > 0 ? (
              <div className="space-y-2 max-h-[300px] overflow-auto">
                {Object.entries(endpoints).map(([path, config]) => (
                  <div
                    key={path}
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-sm font-mono text-purple-400">{path}</code>
                      <div className="flex items-center gap-1">
                        {config.methods.map(method => (
                          <span
                            key={method}
                            className={`px-2 py-0.5 text-xs font-medium rounded ${
                              method === 'GET'
                                ? 'bg-blue-500/20 text-blue-400'
                                : method === 'POST'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : method === 'PUT'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : method === 'DELETE'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-white/50">{config.purpose}</p>
                    <p className="text-xs text-white/30 mt-1">Auth: {config.auth}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white/40 py-4">No endpoints registered</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
