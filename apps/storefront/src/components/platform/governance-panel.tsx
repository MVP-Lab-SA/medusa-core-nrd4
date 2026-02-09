/**
 * Governance Panel Component
 * 
 * Displays governance chain including region, country, authorities, and policies.
 */

import React from 'react'
import {
  GlobeEurope,
  FlagMini,
  Buildings,
  DocumentText,
  ShieldCheck,
  LockClosedSolid,
  CheckCircleSolid,
} from '@medusajs/icons'
import type { GovernanceChain, AuthorityType, ResidencyZone } from '@/lib/cityos/types'

interface GovernancePanelProps {
  governance: GovernanceChain
  className?: string
}

const authorityTypeColors: Record<AuthorityType, string> = {
  federal: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  state: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  municipal: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  regulatory: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

const residencyZoneDescriptions: Record<ResidencyZone, string> = {
  GCC: 'Gulf Cooperation Council - Data stored in GCC member states',
  EU: 'European Union - GDPR compliant data residency',
  MENA: 'Middle East & North Africa region',
  GLOBAL: 'Global data residency with no geographic restrictions',
}

export function GovernancePanel({ governance, className = '' }: GovernancePanelProps): React.ReactElement {
  const { region, country, authorities, policies } = governance

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Region & Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Region Card */}
        <div className="p-5 rounded-xl border border-white/10 bg-black/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <GlobeEurope className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">Region</p>
              <h3 className="text-lg font-medium text-white">{region.name}</h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Code</span>
              <span className="font-mono text-white/90">{region.code}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Residency Zone</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                {region.residencyZone}
              </span>
            </div>
          </div>
        </div>

        {/* Country Card */}
        <div className="p-5 rounded-xl border border-white/10 bg-black/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <FlagMini className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">Country</p>
              <h3 className="text-lg font-medium text-white">{country.name}</h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">ISO Code</span>
              <span className="font-mono text-white/90">{country.code}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Settings</span>
              <span className="text-white/70">
                {Object.keys(country.settings).length} configured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Authorities */}
      <div className="p-5 rounded-xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Buildings className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider">Governance Authorities</p>
            <p className="text-sm text-white/60">{authorities.length} registered</p>
          </div>
        </div>

        <div className="space-y-3">
          {authorities.map(authority => (
            <div
              key={authority.id}
              className="p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{authority.name}</span>
                  <span className="text-xs font-mono text-white/40">({authority.code})</span>
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded border ${authorityTypeColors[authority.type]}`}>
                  {authority.type}
                </span>
              </div>
              {authority.jurisdiction.scope && (
                <p className="text-xs text-white/50">
                  Scope: {authority.jurisdiction.scope}
                </p>
              )}
            </div>
          ))}

          {authorities.length === 0 && (
            <p className="text-center text-white/40 py-4">No authorities registered</p>
          )}
        </div>
      </div>

      {/* Policies */}
      <div className="p-5 rounded-xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <DocumentText className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider">Governance Policies</p>
            <p className="text-sm text-white/60">Data residency, compliance & classification</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Data Residency */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <LockClosedSolid className="w-4 h-4 text-purple-400" />
              <h4 className="font-medium text-white">Data Residency</h4>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                {policies.dataResidency.zone}
              </span>
            </div>
            <p className="text-xs text-white/50">
              {residencyZoneDescriptions[policies.dataResidency.zone as ResidencyZone]}
            </p>
          </div>

          {/* Compliance */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="font-medium text-white">Compliance</h4>
            </div>
            {policies.compliance.frameworks && policies.compliance.frameworks.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {policies.compliance.frameworks.map((framework: string) => (
                  <span
                    key={framework}
                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  >
                    <CheckCircleSolid className="w-3 h-3" />
                    {framework}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/50">No compliance frameworks configured</p>
            )}
          </div>

          {/* Classification */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <DocumentText className="w-4 h-4 text-blue-400" />
              <h4 className="font-medium text-white">Data Classification</h4>
            </div>
            {policies.classification.levels && policies.classification.levels.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {policies.classification.levels.map((level: string, index: number) => (
                  <span
                    key={level}
                    className={`px-2 py-1 text-xs font-medium rounded border ${
                      index === 0
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : index === 1
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {level}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/50">No classification levels defined</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
