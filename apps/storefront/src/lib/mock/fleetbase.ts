/**
 * Fleetbase Mock Service
 * Logistics & Fulfillment System
 */

import { generateId, mockDelay, futureDate, pastDate } from "./helpers"

// Types
export interface DeliveryZone {
  id: string
  name: string
  code: string
  minOrderValue: number
  deliveryFee: number
  estimatedDays: number
}

export interface DeliverySlot {
  id: string
  date: string
  startTime: string
  endTime: string
  available: boolean
  price: number
}

export interface DeliveryOrder {
  id: string
  orderId: string
  status: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "failed"
  driver?: Driver
  estimatedDelivery: string
  actualDelivery?: string
  trackingEvents: TrackingEvent[]
  package: ShipmentPackage
  proofOfDelivery?: ProofOfDelivery
}

export interface TrackingEvent {
  id: string
  timestamp: string
  status: string
  location: string
  description: string
  coordinates?: { lat: number; lng: number }
}

export interface Driver {
  id: string
  name: string
  phone: string
  photo: string
  rating: number
  vehicleType: string
  vehiclePlate: string
}

export interface ShipmentPackage {
  id: string
  weight: number
  dimensions: { length: number; width: number; height: number }
  items: number
}

export interface ProofOfDelivery {
  signature?: string
  photo?: string
  receivedBy: string
  timestamp: string
}

export interface ReturnShipment {
  id: string
  orderId: string
  status: "requested" | "label_generated" | "shipped" | "received" | "processed"
  reason: string
  trackingNumber?: string
  labelUrl?: string
  createdAt: string
}

export interface Warehouse {
  id: string
  name: string
  address: string
  city: string
  country: string
  coordinates: { lat: number; lng: number }
}

// Mock Data
const mockDrivers: Driver[] = [
  {
    id: "drv_1",
    name: "Ahmed Hassan",
    phone: "+966501234567",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
    rating: 4.9,
    vehicleType: "Van",
    vehiclePlate: "ABC 1234",
  },
  {
    id: "drv_2",
    name: "Mohammed Ali",
    phone: "+966502345678",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed",
    rating: 4.7,
    vehicleType: "Motorcycle",
    vehiclePlate: "XYZ 5678",
  },
  {
    id: "drv_3",
    name: "Sara Ahmed",
    phone: "+966503456789",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
    rating: 4.8,
    vehicleType: "Car",
    vehiclePlate: "DEF 9012",
  },
]

const mockWarehouses: Warehouse[] = [
  {
    id: "wh_1",
    name: "Riyadh Central Hub",
    address: "King Fahd Road, Al Olaya",
    city: "Riyadh",
    country: "Saudi Arabia",
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: "wh_2",
    name: "Jeddah Distribution Center",
    address: "Prince Sultan Road",
    city: "Jeddah",
    country: "Saudi Arabia",
    coordinates: { lat: 21.4858, lng: 39.1925 },
  },
]

const mockDeliveryZones: DeliveryZone[] = [
  { id: "zone_1", name: "Riyadh City", code: "RUH", minOrderValue: 0, deliveryFee: 15, estimatedDays: 1 },
  { id: "zone_2", name: "Jeddah City", code: "JED", minOrderValue: 0, deliveryFee: 15, estimatedDays: 1 },
  { id: "zone_3", name: "Eastern Province", code: "DMM", minOrderValue: 50, deliveryFee: 25, estimatedDays: 2 },
  { id: "zone_4", name: "Other Regions", code: "OTH", minOrderValue: 100, deliveryFee: 35, estimatedDays: 3 },
]

// Store for mock deliveries
const mockDeliveries: Map<string, DeliveryOrder> = new Map()
const mockReturns: Map<string, ReturnShipment> = new Map()

// API Functions
export const fleetbaseService = {
  // Delivery Zones
  async getDeliveryZones(): Promise<DeliveryZone[]> {
    await mockDelay(300)
    return mockDeliveryZones
  },

  async checkDeliveryZone(postalCode: string): Promise<DeliveryZone | null> {
    await mockDelay(200)
    // Simple mock logic
    if (postalCode.startsWith("1")) return mockDeliveryZones[0]
    if (postalCode.startsWith("2")) return mockDeliveryZones[1]
    if (postalCode.startsWith("3")) return mockDeliveryZones[2]
    return mockDeliveryZones[3]
  },

  // Delivery Slots
  async getDeliverySlots(zoneId: string, date?: string): Promise<DeliverySlot[]> {
    await mockDelay(400)
    const slots: DeliverySlot[] = []
    const baseDate = date ? new Date(date) : new Date()

    for (let d = 0; d < 7; d++) {
      const slotDate = new Date(baseDate)
      slotDate.setDate(slotDate.getDate() + d)
      const dateStr = slotDate.toISOString().split("T")[0]

      slots.push(
        { id: `slot_${d}_1`, date: dateStr, startTime: "09:00", endTime: "12:00", available: Math.random() > 0.3, price: 0 },
        { id: `slot_${d}_2`, date: dateStr, startTime: "12:00", endTime: "15:00", available: Math.random() > 0.3, price: 0 },
        { id: `slot_${d}_3`, date: dateStr, startTime: "15:00", endTime: "18:00", available: Math.random() > 0.3, price: 0 },
        { id: `slot_${d}_4`, date: dateStr, startTime: "18:00", endTime: "21:00", available: Math.random() > 0.2, price: 5 }
      )
    }

    return slots
  },

  // Delivery Tracking
  async createDeliveryOrder(orderId: string): Promise<DeliveryOrder> {
    await mockDelay(500)

    const delivery: DeliveryOrder = {
      id: generateId(),
      orderId,
      status: "pending",
      estimatedDelivery: futureDate(3).toISOString(),
      trackingEvents: [
        {
          id: generateId(),
          timestamp: new Date().toISOString(),
          status: "Order Placed",
          location: "Online",
          description: "Your order has been confirmed and is being prepared",
        },
      ],
      package: {
        id: generateId(),
        weight: 1.5,
        dimensions: { length: 30, width: 20, height: 10 },
        items: 2,
      },
    }

    mockDeliveries.set(orderId, delivery)
    return delivery
  },

  async getDeliveryOrder(orderId: string): Promise<DeliveryOrder | null> {
    await mockDelay(300)

    // Check if we have a mock delivery
    if (mockDeliveries.has(orderId)) {
      return mockDeliveries.get(orderId)!
    }

    // Generate a mock delivery for demo
    const statuses: DeliveryOrder["status"][] = ["pending", "assigned", "picked_up", "in_transit", "delivered"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const driver = randomStatus !== "pending" ? mockDrivers[Math.floor(Math.random() * mockDrivers.length)] : undefined

    const events: TrackingEvent[] = [
      {
        id: generateId(),
        timestamp: pastDate(3).toISOString(),
        status: "Order Placed",
        location: "Online",
        description: "Your order has been confirmed",
      },
    ]

    if (randomStatus !== "pending") {
      events.push({
        id: generateId(),
        timestamp: pastDate(2).toISOString(),
        status: "Processing",
        location: mockWarehouses[0].name,
        description: "Order is being prepared for shipment",
        coordinates: mockWarehouses[0].coordinates,
      })
    }

    if (["picked_up", "in_transit", "delivered"].includes(randomStatus)) {
      events.push({
        id: generateId(),
        timestamp: pastDate(1).toISOString(),
        status: "Picked Up",
        location: mockWarehouses[0].name,
        description: "Package picked up by driver",
        coordinates: mockWarehouses[0].coordinates,
      })
    }

    if (["in_transit", "delivered"].includes(randomStatus)) {
      events.push({
        id: generateId(),
        timestamp: pastDate(0.5).toISOString(),
        status: "In Transit",
        location: "En Route",
        description: "Package is on its way to you",
        coordinates: { lat: 24.72, lng: 46.68 },
      })
    }

    if (randomStatus === "delivered") {
      events.push({
        id: generateId(),
        timestamp: new Date().toISOString(),
        status: "Delivered",
        location: "Destination",
        description: "Package has been delivered",
        coordinates: { lat: 24.73, lng: 46.69 },
      })
    }

    const delivery: DeliveryOrder = {
      id: generateId(),
      orderId,
      status: randomStatus,
      driver,
      estimatedDelivery: futureDate(1).toISOString(),
      actualDelivery: randomStatus === "delivered" ? new Date().toISOString() : undefined,
      trackingEvents: events,
      package: {
        id: generateId(),
        weight: 1.5,
        dimensions: { length: 30, width: 20, height: 10 },
        items: 2,
      },
      proofOfDelivery:
        randomStatus === "delivered"
          ? {
              receivedBy: "Customer",
              timestamp: new Date().toISOString(),
              photo: "https://placehold.co/400x300?text=Proof+of+Delivery",
            }
          : undefined,
    }

    mockDeliveries.set(orderId, delivery)
    return delivery
  },

  async getDeliveryTracking(trackingId: string): Promise<TrackingEvent[]> {
    await mockDelay(300)
    const delivery = await this.getDeliveryOrder(trackingId)
    return delivery?.trackingEvents || []
  },

  // Returns
  async createReturnShipment(orderId: string, reason: string): Promise<ReturnShipment> {
    await mockDelay(600)

    const returnShipment: ReturnShipment = {
      id: generateId(),
      orderId,
      status: "label_generated",
      reason,
      trackingNumber: `RTN${Math.random().toString().slice(2, 12)}`,
      labelUrl: "https://placehold.co/400x600?text=Return+Label",
      createdAt: new Date().toISOString(),
    }

    mockReturns.set(returnShipment.id, returnShipment)
    return returnShipment
  },

  async getReturnShipment(returnId: string): Promise<ReturnShipment | null> {
    await mockDelay(300)
    return mockReturns.get(returnId) || null
  },

  async listReturnShipments(customerId: string): Promise<ReturnShipment[]> {
    await mockDelay(400)
    return Array.from(mockReturns.values())
  },

  // Warehouses
  async getWarehouses(): Promise<Warehouse[]> {
    await mockDelay(200)
    return mockWarehouses
  },

  async getNearestWarehouse(coordinates: { lat: number; lng: number }): Promise<Warehouse> {
    await mockDelay(300)
    // Simple distance calculation
    let nearest = mockWarehouses[0]
    let minDistance = Infinity

    for (const wh of mockWarehouses) {
      const distance = Math.sqrt(
        Math.pow(wh.coordinates.lat - coordinates.lat, 2) +
          Math.pow(wh.coordinates.lng - coordinates.lng, 2)
      )
      if (distance < minDistance) {
        minDistance = distance
        nearest = wh
      }
    }

    return nearest
  },

  // Drivers
  async getDriverLocation(driverId: string): Promise<{ lat: number; lng: number } | null> {
    await mockDelay(200)
    // Return random location near Riyadh
    return {
      lat: 24.7136 + (Math.random() - 0.5) * 0.1,
      lng: 46.6753 + (Math.random() - 0.5) * 0.1,
    }
  },
}
