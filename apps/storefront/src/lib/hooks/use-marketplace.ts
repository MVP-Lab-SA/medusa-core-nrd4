/**
 * Marketplace Hooks - Vendors, B2B, Subscriptions, Bookings, Reviews, Wishlists
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { marketplaceService } from "@/lib/mock/marketplace"
import type {
  QuoteItem,
  PurchaseOrderItem,
  WishlistItem,
} from "@/lib/mock/marketplace"

// Query Keys
export const marketplaceKeys = {
  all: ["marketplace"] as const,
  // Vendors
  vendors: (options?: { category?: string }) => [...marketplaceKeys.all, "vendors", options] as const,
  vendor: (handle: string) => [...marketplaceKeys.all, "vendor", handle] as const,
  vendorReviews: (vendorId: string) => [...marketplaceKeys.all, "vendor", vendorId, "reviews"] as const,
  // B2B
  company: (customerId: string) => [...marketplaceKeys.all, "company", customerId] as const,
  quotes: (companyId: string) => [...marketplaceKeys.all, "quotes", companyId] as const,
  purchaseOrders: (companyId: string) => [...marketplaceKeys.all, "pos", companyId] as const,
  approvals: (companyId: string) => [...marketplaceKeys.all, "approvals", companyId] as const,
  // Subscriptions
  subscriptionPlans: () => [...marketplaceKeys.all, "plans"] as const,
  subscriptionPlan: (planId: string) => [...marketplaceKeys.all, "plan", planId] as const,
  subscriptions: (customerId: string) => [...marketplaceKeys.all, "subscriptions", customerId] as const,
  // Bookings
  services: (category?: string) => [...marketplaceKeys.all, "services", category] as const,
  service: (handle: string) => [...marketplaceKeys.all, "service", handle] as const,
  providers: (serviceId?: string) => [...marketplaceKeys.all, "providers", serviceId] as const,
  provider: (providerId: string) => [...marketplaceKeys.all, "provider", providerId] as const,
  bookingSlots: (serviceId: string, date: string, providerId?: string) =>
    [...marketplaceKeys.all, "slots", serviceId, date, providerId] as const,
  bookings: (customerId: string) => [...marketplaceKeys.all, "bookings", customerId] as const,
  // Reviews
  productReviews: (productId: string, options?: object) =>
    [...marketplaceKeys.all, "reviews", productId, options] as const,
  reviewStats: (productId: string) => [...marketplaceKeys.all, "stats", productId] as const,
  // Wishlists
  wishlists: (customerId: string) => [...marketplaceKeys.all, "wishlists", customerId] as const,
  sharedWishlist: (token: string) => [...marketplaceKeys.all, "wishlist", token] as const,
}

// ==================== VENDORS ====================

export function useVendors(options?: { category?: string; limit?: number }) {
  return useQuery({
    queryKey: marketplaceKeys.vendors(options),
    queryFn: () => marketplaceService.getVendors(options),
  })
}

export function useVendor(handle: string) {
  return useQuery({
    queryKey: marketplaceKeys.vendor(handle),
    queryFn: () => marketplaceService.getVendor(handle),
    enabled: !!handle,
  })
}

export function useVendorReviews(vendorId: string) {
  return useQuery({
    queryKey: marketplaceKeys.vendorReviews(vendorId),
    queryFn: () => marketplaceService.getVendorReviews(vendorId),
    enabled: !!vendorId,
  })
}

export function useFollowVendor() {
  return useMutation({
    mutationFn: (vendorId: string) => marketplaceService.followVendor(vendorId),
  })
}

// ==================== B2B ====================

export function useCompany(customerId: string) {
  return useQuery({
    queryKey: marketplaceKeys.company(customerId),
    queryFn: () => marketplaceService.getCompany(customerId),
    enabled: !!customerId,
  })
}

export function useRegisterCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      name: string
      taxId: string
      industry: string
      size: "small" | "medium" | "large" | "enterprise"
    }) => marketplaceService.registerCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.company("") })
    },
  })
}

export function useQuotes(companyId: string) {
  return useQuery({
    queryKey: marketplaceKeys.quotes(companyId),
    queryFn: () => marketplaceService.getQuotes(companyId),
    enabled: !!companyId,
  })
}

export function useCreateQuote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ companyId, items }: { companyId: string; items: Omit<QuoteItem, "id">[] }) =>
      marketplaceService.createQuote(companyId, items),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.quotes(variables.companyId) })
    },
  })
}

export function usePurchaseOrders(companyId: string) {
  return useQuery({
    queryKey: marketplaceKeys.purchaseOrders(companyId),
    queryFn: () => marketplaceService.getPurchaseOrders(companyId),
    enabled: !!companyId,
  })
}

export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      companyId,
      items,
      shippingAddress,
      billingAddress,
    }: {
      companyId: string
      items: Omit<PurchaseOrderItem, "id">[]
      shippingAddress: string
      billingAddress: string
    }) => marketplaceService.createPurchaseOrder(companyId, { items, shippingAddress, billingAddress }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.purchaseOrders(variables.companyId) })
    },
  })
}

export function useApprovalRequests(companyId: string) {
  return useQuery({
    queryKey: marketplaceKeys.approvals(companyId),
    queryFn: () => marketplaceService.getApprovalRequests(companyId),
    enabled: !!companyId,
  })
}

// ==================== SUBSCRIPTIONS ====================

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: marketplaceKeys.subscriptionPlans(),
    queryFn: () => marketplaceService.getSubscriptionPlans(),
  })
}

export function useSubscriptionPlan(planId: string) {
  return useQuery({
    queryKey: marketplaceKeys.subscriptionPlan(planId),
    queryFn: () => marketplaceService.getSubscriptionPlan(planId),
    enabled: !!planId,
  })
}

export function useSubscriptions(customerId: string) {
  return useQuery({
    queryKey: marketplaceKeys.subscriptions(customerId),
    queryFn: () => marketplaceService.getSubscriptions(customerId),
    enabled: !!customerId,
  })
}

export function useCreateSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ customerId, planId }: { customerId: string; planId: string }) =>
      marketplaceService.createSubscription(customerId, planId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.subscriptions(variables.customerId) })
    },
  })
}

export function usePauseSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ subscriptionId, until }: { subscriptionId: string; until?: string }) =>
      marketplaceService.pauseSubscription(subscriptionId, until),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.subscriptions("") })
    },
  })
}

export function useCancelSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (subscriptionId: string) => marketplaceService.cancelSubscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.subscriptions("") })
    },
  })
}

// ==================== BOOKINGS ====================

export function useBookingServices(category?: string) {
  return useQuery({
    queryKey: marketplaceKeys.services(category),
    queryFn: () => marketplaceService.getServices(category),
  })
}

export function useBookingService(handle: string) {
  return useQuery({
    queryKey: marketplaceKeys.service(handle),
    queryFn: () => marketplaceService.getService(handle),
    enabled: !!handle,
  })
}

export function useServiceProviders(serviceId?: string) {
  return useQuery({
    queryKey: marketplaceKeys.providers(serviceId),
    queryFn: () => marketplaceService.getProviders(serviceId),
  })
}

export function useServiceProvider(providerId: string) {
  return useQuery({
    queryKey: marketplaceKeys.provider(providerId),
    queryFn: () => marketplaceService.getProvider(providerId),
    enabled: !!providerId,
  })
}

export function useAvailableSlots(serviceId: string, date: string, providerId?: string) {
  return useQuery({
    queryKey: marketplaceKeys.bookingSlots(serviceId, date, providerId),
    queryFn: () => marketplaceService.getAvailableSlots(serviceId, date, providerId),
    enabled: !!serviceId && !!date,
  })
}

export function useBookings(customerId: string) {
  return useQuery({
    queryKey: marketplaceKeys.bookings(customerId),
    queryFn: () => marketplaceService.getBookings(customerId),
    enabled: !!customerId,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      customerId: string
      serviceId: string
      providerId?: string
      slotId: string
      participants: number
      notes?: string
    }) => marketplaceService.createBooking(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.bookings(variables.customerId) })
    },
  })
}

export function useCancelBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (bookingId: string) => marketplaceService.cancelBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.bookings("") })
    },
  })
}

// ==================== REVIEWS ====================

export function useProductReviews(
  productId: string,
  options?: { limit?: number; offset?: number; sort?: "newest" | "helpful" | "rating" }
) {
  return useQuery({
    queryKey: marketplaceKeys.productReviews(productId, options),
    queryFn: () => marketplaceService.getProductReviews(productId, options),
    enabled: !!productId,
  })
}

export function useReviewStats(productId: string) {
  return useQuery({
    queryKey: marketplaceKeys.reviewStats(productId),
    queryFn: () => marketplaceService.getReviewStats(productId),
    enabled: !!productId,
  })
}

export function useCreateReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      productId: string
      customerId: string
      customerName: string
      orderId?: string
      rating: number
      title: string
      content: string
      pros?: string[]
      cons?: string[]
      images?: string[]
    }) => marketplaceService.createReview(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.productReviews(variables.productId) })
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.reviewStats(variables.productId) })
    },
  })
}

export function useMarkReviewHelpful() {
  return useMutation({
    mutationFn: (reviewId: string) => marketplaceService.markReviewHelpful(reviewId),
  })
}

// ==================== WISHLISTS ====================

export function useWishlists(customerId: string) {
  return useQuery({
    queryKey: marketplaceKeys.wishlists(customerId),
    queryFn: () => marketplaceService.getWishlists(customerId),
    enabled: !!customerId,
  })
}

export function useCreateWishlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      name,
      isPublic,
    }: {
      customerId: string
      name: string
      isPublic?: boolean
    }) => marketplaceService.createWishlist(customerId, name, isPublic),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.wishlists(variables.customerId) })
    },
  })
}

export function useAddToWishlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      wishlistId,
      item,
    }: {
      wishlistId: string
      item: Omit<WishlistItem, "id" | "addedAt">
    }) => marketplaceService.addToWishlist(wishlistId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.wishlists("") })
    },
  })
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ wishlistId, itemId }: { wishlistId: string; itemId: string }) =>
      marketplaceService.removeFromWishlist(wishlistId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.wishlists("") })
    },
  })
}

export function useSharedWishlist(shareToken: string) {
  return useQuery({
    queryKey: marketplaceKeys.sharedWishlist(shareToken),
    queryFn: () => marketplaceService.getSharedWishlist(shareToken),
    enabled: !!shareToken,
  })
}

// ==================== BUNDLES ====================

export function useBundles() {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "bundles"] as const,
    queryFn: () => marketplaceService.getBundles(),
  })
}

export function useBundle(handle: string) {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "bundle", handle] as const,
    queryFn: () => marketplaceService.getBundle(handle),
    enabled: !!handle,
  })
}

// ==================== FLASH SALES ====================

export function useFlashSales() {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "flash-sales"] as const,
    queryFn: () => marketplaceService.getFlashSales(),
  })
}

export function useFlashSale(id: string) {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "flash-sale", id] as const,
    queryFn: () => marketplaceService.getFlashSale(id),
    enabled: !!id,
  })
}

// ==================== REFERRALS ====================

export function useReferralProgram() {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "referral-program"] as const,
    queryFn: () => marketplaceService.getReferralProgram(),
  })
}

export function useReferrals(customerId: string) {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "referrals", customerId] as const,
    queryFn: () => marketplaceService.getReferrals(customerId),
    enabled: !!customerId,
  })
}

export function useReferralStats() {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "referral-stats"] as const,
    queryFn: async () => {
      // Return mock referral stats
      return {
        totalReferrals: 12,
        successfulReferrals: 8,
        pendingReferrals: 4,
        totalEarnings: 240,
        pendingEarnings: 60,
        conversionRate: 66.7,
        referralCode: "SMART2024",
        referralLink: "https://example.com/ref/SMART2024",
      }
    },
  })
}

// ==================== PROVIDERS ====================

export function useProviders() {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "providers"] as const,
    queryFn: () => marketplaceService.getProviders(),
  })
}

export function useProvider(id: string) {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "provider", id] as const,
    queryFn: () => marketplaceService.getProvider(id),
    enabled: !!id,
  })
}

// ==================== DIGITAL ASSETS ====================

export function useDigitalAssets() {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "digital-assets"] as const,
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      return [
        {
          id: "asset-1",
          name: "SmartHome Hub Pro Firmware v3.2",
          type: "firmware",
          size: "24.5 MB",
          downloadedAt: "2024-01-15",
          expiresAt: null,
          downloadUrl: "#",
          version: "3.2.0",
          product: {
            id: "prod-1",
            title: "SmartHome Hub Pro",
            thumbnail: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W4EG3RC1BMTN3C5B4WCMB-01KH0W4EG4CG8TGGG0EG71HYPG.jpeg",
          },
        },
        {
          id: "asset-2",
          name: "Security Camera User Manual",
          type: "document",
          size: "8.2 MB",
          downloadedAt: "2024-01-10",
          expiresAt: null,
          downloadUrl: "#",
          version: "1.0",
          product: {
            id: "prod-2",
            title: "Smart Security Camera",
            thumbnail: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W484Q762BGTQ0A8Q9CRVF-01KH0W484R9PRJ6K9AECWV4Q2K.jpeg",
          },
        },
        {
          id: "asset-3",
          name: "SmartLock Configuration Tool",
          type: "software",
          size: "156 MB",
          downloadedAt: "2024-01-08",
          expiresAt: "2025-01-08",
          downloadUrl: "#",
          version: "2.1.4",
          product: {
            id: "prod-3",
            title: "Smart Lock Pro",
            thumbnail: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W3ZN17W4PT9HNKWVTDX02-01KH0W3ZN1Q4JRFES9PPD1BKV5.jpeg",
          },
        },
      ]
    },
  })
}

// ==================== LICENSE KEYS ====================

export function useLicenseKeys() {
  return useQuery({
    queryKey: [...marketplaceKeys.all, "license-keys"] as const,
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      return [
        {
          id: "lic-1",
          key: "XXXX-XXXX-XXXX-7A9B",
          product: {
            id: "prod-1",
            title: "SmartHome Hub Pro",
            thumbnail: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W4EG3RC1BMTN3C5B4WCMB-01KH0W4EG4CG8TGGG0EG71HYPG.jpeg",
          },
          status: "active",
          activatedAt: "2024-01-15",
          expiresAt: "2025-01-15",
          deviceLimit: 5,
          devicesUsed: 2,
        },
        {
          id: "lic-2",
          key: "XXXX-XXXX-XXXX-3C2D",
          product: {
            id: "prod-2",
            title: "Smart Security Camera",
            thumbnail: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W484Q762BGTQ0A8Q9CRVF-01KH0W484R9PRJ6K9AECWV4Q2K.jpeg",
          },
          status: "active",
          activatedAt: "2024-01-10",
          expiresAt: null,
          deviceLimit: 1,
          devicesUsed: 1,
        },
        {
          id: "lic-3",
          key: "XXXX-XXXX-XXXX-8E4F",
          product: {
            id: "prod-3",
            title: "Smart Lock Pro",
            thumbnail: "https://cdn.mignite.app/ws/works_01KGWXWAS7AR3JBVNAVFVWNRD4/generated-01KH0W3ZN17W4PT9HNKWVTDX02-01KH0W3ZN1Q4JRFES9PPD1BKV5.jpeg",
          },
          status: "expired",
          activatedAt: "2023-01-08",
          expiresAt: "2024-01-08",
          deviceLimit: 3,
          devicesUsed: 3,
        },
      ]
    },
  })
}
