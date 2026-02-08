/**
 * Mock Backend Services
 * Provides mock data for external systems not connected to Medusa
 */

// Re-export all mock services
export * from "./fleetbase"
export * from "./waltid"
export * from "./payments"
export * from "./erpnext"
export * from "./payloadcms"
export * from "./marketplace"

// Mock delay helper
export const mockDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// Generate random ID
export const generateId = () =>
  `mock_${Math.random().toString(36).substring(2, 15)}`

// Mock date helpers
export const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

export const futureDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

export const pastDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}
