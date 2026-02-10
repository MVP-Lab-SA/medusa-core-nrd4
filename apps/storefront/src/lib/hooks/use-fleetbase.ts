/**
 * Fleetbase Hooks - Logistics & Fulfillment
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fleetbaseService } from "@/lib/mock/fleetbase"
import type { DeliveryOrder, DeliverySlot, DeliveryZone, ReturnShipment } from "@/lib/mock/fleetbase"

// Query Keys
export const fleetbaseKeys = {
  all: ["fleetbase"] as const,
  zones: () => [...fleetbaseKeys.all, "zones"] as const,
  slots: (zoneId: string, date?: string) => [...fleetbaseKeys.all, "slots", zoneId, date] as const,
  delivery: (orderId: string) => [...fleetbaseKeys.all, "delivery", orderId] as const,
  tracking: (trackingId: string) => [...fleetbaseKeys.all, "tracking", trackingId] as const,
  returns: (customerId: string) => [...fleetbaseKeys.all, "returns", customerId] as const,
  returnDetail: (returnId: string) => [...fleetbaseKeys.all, "return", returnId] as const,
  warehouses: () => [...fleetbaseKeys.all, "warehouses"] as const,
  driverLocation: (driverId: string) => [...fleetbaseKeys.all, "driver", driverId] as const,
}

// Delivery Zones
export function useDeliveryZones() {
  return useQuery({
    queryKey: fleetbaseKeys.zones(),
    queryFn: () => fleetbaseService.getDeliveryZones(),
  })
}

export function useCheckDeliveryZone(postalCode: string) {
  return useQuery({
    queryKey: [...fleetbaseKeys.zones(), postalCode],
    queryFn: () => fleetbaseService.checkDeliveryZone(postalCode),
    enabled: !!postalCode,
  })
}

// Delivery Slots
export function useDeliverySlots(zoneId: string, date?: string) {
  return useQuery({
    queryKey: fleetbaseKeys.slots(zoneId, date),
    queryFn: () => fleetbaseService.getDeliverySlots(zoneId, date),
    enabled: !!zoneId,
  })
}

// Delivery Order / Tracking
export function useDeliveryOrder(orderId: string) {
  return useQuery({
    queryKey: fleetbaseKeys.delivery(orderId),
    queryFn: () => fleetbaseService.getDeliveryOrder(orderId),
    enabled: !!orderId,
    refetchInterval: 30000, // Refresh every 30 seconds for live tracking
  })
}

export function useDeliveryTracking(trackingId: string) {
  return useQuery({
    queryKey: fleetbaseKeys.tracking(trackingId),
    queryFn: () => fleetbaseService.getDeliveryTracking(trackingId),
    enabled: !!trackingId,
  })
}

export function useCreateDeliveryOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderId: string) => fleetbaseService.createDeliveryOrder(orderId),
    onSuccess: (data) => {
      queryClient.setQueryData(fleetbaseKeys.delivery(data.orderId), data)
    },
  })
}

// Returns
export function useReturnShipments(customerId: string) {
  return useQuery({
    queryKey: fleetbaseKeys.returns(customerId),
    queryFn: () => fleetbaseService.listReturnShipments(customerId),
    enabled: !!customerId,
  })
}

export function useReturnShipment(returnId: string) {
  return useQuery({
    queryKey: fleetbaseKeys.returnDetail(returnId),
    queryFn: () => fleetbaseService.getReturnShipment(returnId),
    enabled: !!returnId,
  })
}

export function useCreateReturnShipment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
      fleetbaseService.createReturnShipment(orderId, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: fleetbaseKeys.returns("") })
    },
  })
}

// Warehouses
export function useWarehouses() {
  return useQuery({
    queryKey: fleetbaseKeys.warehouses(),
    queryFn: () => fleetbaseService.getWarehouses(),
  })
}

// Driver Location (for live tracking)
export function useDriverLocation(driverId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: fleetbaseKeys.driverLocation(driverId),
    queryFn: () => fleetbaseService.getDriverLocation(driverId),
    enabled: !!driverId && enabled,
    refetchInterval: 5000, // Update every 5 seconds
  })
}

// Customer Deliveries - List all deliveries for account page
export function useDeliveries() {
  return useQuery({
    queryKey: [...fleetbaseKeys.all, "customer-deliveries"],
    queryFn: async () => {
      // Return mock delivery data for the account page
      return [
        {
          id: "del_001",
          orderId: "order_001",
          orderNumber: "ORD-2024-001",
          status: "delivered" as const,
          estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          actualDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          address: {
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            postalCode: "10001",
          },
          carrier: "FedEx",
          trackingNumber: "FX123456789",
          items: [
            { name: "Wireless Headphones", quantity: 1 },
            { name: "USB-C Cable", quantity: 2 },
          ],
        },
        {
          id: "del_002",
          orderId: "order_002",
          orderNumber: "ORD-2024-002",
          status: "in_transit" as const,
          estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          address: {
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            postalCode: "10001",
          },
          carrier: "UPS",
          trackingNumber: "1Z999AA10123456784",
          items: [
            { name: "Smart Watch", quantity: 1 },
          ],
        },
        {
          id: "del_003",
          orderId: "order_003",
          orderNumber: "ORD-2024-003",
          status: "processing" as const,
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          address: {
            street: "456 Oak Avenue",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90001",
          },
          carrier: "USPS",
          trackingNumber: "9400111899223456789012",
          items: [
            { name: "Bluetooth Speaker", quantity: 1 },
            { name: "Phone Case", quantity: 1 },
          ],
        },
      ]
    },
  })
}
