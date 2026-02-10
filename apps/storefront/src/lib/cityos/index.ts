/**
 * CityOS Platform Context Module
 * 
 * Exports all CityOS platform context types, hooks, and utilities
 * for multi-tenant governance and capability management.
 */

// Types
export * from './types'

// Client
export {
  CityOSClient,
  CityOSAPIError,
  getCityOSClient,
  generateCorrelationId,
  buildCityOSHeaders,
  fetchPlatformContext,
  fetchDefaultTenant,
  fetchCapabilities,
  type CityOSClientConfig,
} from './client'

// Hooks
export {
  usePlatformContext,
  useTenant,
  useNodeHierarchy,
  useGovernance,
  useCapabilities,
  useSystems,
  useLocalization,
  useContextHeaders,
  useHierarchyLevel,
} from './hooks'

// Context Provider
export {
  CityOSProvider,
  useCityOS,
  useCityOSOptional,
} from './context'
