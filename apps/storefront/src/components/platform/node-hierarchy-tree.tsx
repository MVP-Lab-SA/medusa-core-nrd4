/**
 * Node Hierarchy Tree Component
 * 
 * Displays the hierarchical node structure (CITY > DISTRICT > ZONE > FACILITY > ASSET)
 */

import React, { useState, useCallback } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Buildings,
  MapPin,
  SquaresPlus,
  BuildingStorefront,
  CubeSolid,
  CheckCircleSolid,
  XCircleSolid,
} from '@medusajs/icons'
import type { NodeHierarchy, NodeType } from '@/lib/cityos/types'

interface NodeHierarchyTreeProps {
  nodes: NodeHierarchy[]
  selectedNodeId?: string | null
  onNodeSelect?: (node: NodeHierarchy) => void
  expandedByDefault?: boolean
  maxDepth?: number
}

const nodeTypeIcons: Record<NodeType, React.ComponentType<{ className?: string }>> = {
  CITY: Buildings,
  DISTRICT: SquaresPlus,
  ZONE: MapPin,
  FACILITY: BuildingStorefront,
  ASSET: CubeSolid,
}

const nodeTypeColors: Record<NodeType, string> = {
  CITY: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  DISTRICT: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  ZONE: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  FACILITY: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  ASSET: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

interface TreeNodeProps {
  node: NodeHierarchy
  depth: number
  maxDepth: number
  selectedNodeId?: string | null
  onNodeSelect?: (node: NodeHierarchy) => void
  expandedByDefault: boolean
}

function TreeNode({
  node,
  depth,
  maxDepth,
  selectedNodeId,
  onNodeSelect,
  expandedByDefault,
}: TreeNodeProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault || depth < 2)
  const hasChildren = node.children.length > 0
  const isSelected = selectedNodeId === node.id
  const NodeIcon = nodeTypeIcons[node.type] || CubeSolid

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(prev => !prev)
  }, [])

  const handleSelect = useCallback(() => {
    onNodeSelect?.(node)
  }, [node, onNodeSelect])

  if (depth > maxDepth) return <></>

  return (
    <div className="select-none">
      {/* Node Item */}
      <div
        onClick={handleSelect}
        className={`
          flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all
          ${isSelected 
            ? 'bg-white/10 border border-white/20' 
            : 'hover:bg-white/5 border border-transparent'
          }
        `}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        {/* Expand/Collapse Toggle */}
        {hasChildren ? (
          <button
            onClick={handleToggle}
            className="p-0.5 rounded hover:bg-white/10 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-white/50" />
            ) : (
              <ChevronRight className="w-4 h-4 text-white/50" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}

        {/* Node Icon */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${nodeTypeColors[node.type].split(' ')[0]}`}>
          <NodeIcon className={`w-4 h-4 ${nodeTypeColors[node.type].split(' ')[1]}`} />
        </div>

        {/* Node Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium truncate">{node.name}</span>
            <span className="text-xs font-mono text-white/30">{node.code}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${nodeTypeColors[node.type]}`}>
              {node.type}
            </span>
            {node.coordinates && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {node.coordinates.lat.toFixed(2)}, {node.coordinates.lng.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center">
          {node.status === 'active' ? (
            <CheckCircleSolid className="w-4 h-4 text-emerald-400" />
          ) : (
            <XCircleSolid className="w-4 h-4 text-red-400" />
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {/* Connector Line */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-px bg-white/10"
            style={{ marginLeft: `${(depth + 1) * 20 + 10}px` }}
          />
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              maxDepth={maxDepth}
              selectedNodeId={selectedNodeId}
              onNodeSelect={onNodeSelect}
              expandedByDefault={expandedByDefault}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function NodeHierarchyTree({
  nodes,
  selectedNodeId,
  onNodeSelect,
  expandedByDefault = false,
  maxDepth = 10,
}: NodeHierarchyTreeProps): React.ReactElement {
  // Count nodes by type
  const nodeCounts = React.useMemo(() => {
    const counts: Record<NodeType, number> = {
      CITY: 0,
      DISTRICT: 0,
      ZONE: 0,
      FACILITY: 0,
      ASSET: 0,
    }

    const countRecursive = (nodeList: NodeHierarchy[]) => {
      for (const node of nodeList) {
        counts[node.type]++
        countRecursive(node.children)
      }
    }

    countRecursive(nodes)
    return counts
  }, [nodes])

  const totalNodes = Object.values(nodeCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex-1">
          <p className="text-sm text-white/50">Total Nodes</p>
          <p className="text-xl font-semibold text-white">{totalNodes}</p>
        </div>
        <div className="flex items-center gap-3">
          {(Object.entries(nodeCounts) as [NodeType, number][]).map(([type, count]) => (
            count > 0 && (
              <div key={type} className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${nodeTypeColors[type]}`}>
                  {type}
                </span>
                <span className="text-sm text-white/60">{count}</span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Tree */}
      <div className="p-4 rounded-xl border border-white/10 bg-black/40 max-h-[500px] overflow-auto">
        {nodes.length > 0 ? (
          nodes.map(node => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              maxDepth={maxDepth}
              selectedNodeId={selectedNodeId}
              onNodeSelect={onNodeSelect}
              expandedByDefault={expandedByDefault}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <Buildings className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">No nodes in hierarchy</p>
          </div>
        )}
      </div>
    </div>
  )
}
