/**
 * Commerce Extras Hooks - Loyalty, Gift Cards, Digital Products, Delivery, Store Credits
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { commerceExtrasService } from "@/lib/mock/commerce-extras"

// Query Keys
export const commerceExtrasKeys = {
  all: ["commerce-extras"] as const,
  // Loyalty
  loyaltyProgram: () => [...commerceExtrasKeys.all, "loyalty-program"] as const,
  loyaltyAccount: (customerId: string) => [...commerceExtrasKeys.all, "loyalty", customerId] as const,
  loyaltyRewards: () => [...commerceExtrasKeys.all, "loyalty-rewards"] as const,
  // Gift Cards
  giftCardDesigns: () => [...commerceExtrasKeys.all, "gift-card-designs"] as const,
  giftCards: (customerId: string) => [...commerceExtrasKeys.all, "gift-cards", customerId] as const,
  giftCardBalance: (code: string) => [...commerceExtrasKeys.all, "gift-card", code] as const,
  // Downloads
  downloads: (customerId: string) => [...commerceExtrasKeys.all, "downloads", customerId] as const,
  // Licenses
  licenses: (customerId: string) => [...commerceExtrasKeys.all, "licenses", customerId] as const,
  // Deliveries
  deliveries: (customerId: string) => [...commerceExtrasKeys.all, "deliveries", customerId] as const,
  delivery: (trackingNumber: string) => [...commerceExtrasKeys.all, "delivery", trackingNumber] as const,
  deliverySlots: (date: string, zip: string) => [...commerceExtrasKeys.all, "delivery-slots", date, zip] as const,
  // Store Credits
  storeCredit: (customerId: string) => [...commerceExtrasKeys.all, "store-credit", customerId] as const,
}

// ==================== LOYALTY ====================

export function useLoyaltyProgram() {
  return useQuery({
    queryKey: commerceExtrasKeys.loyaltyProgram(),
    queryFn: () => commerceExtrasService.getLoyaltyProgram(),
  })
}

export function useLoyaltyAccount(customerId: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.loyaltyAccount(customerId),
    queryFn: () => commerceExtrasService.getLoyaltyAccount(customerId),
    enabled: !!customerId,
  })
}

export function useLoyaltyRewards() {
  return useQuery({
    queryKey: commerceExtrasKeys.loyaltyRewards(),
    queryFn: () => commerceExtrasService.getLoyaltyRewards(),
  })
}

export function useRedeemReward() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ customerId, rewardId }: { customerId: string; rewardId: string }) =>
      commerceExtrasService.redeemReward(customerId, rewardId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceExtrasKeys.loyaltyAccount(variables.customerId) })
    },
  })
}

// ==================== GIFT CARDS ====================

export function useGiftCardDesigns() {
  return useQuery({
    queryKey: commerceExtrasKeys.giftCardDesigns(),
    queryFn: () => commerceExtrasService.getGiftCardDesigns(),
  })
}

export function useGiftCards(customerId: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.giftCards(customerId),
    queryFn: () => commerceExtrasService.getGiftCards(customerId),
    enabled: !!customerId,
  })
}

export function usePurchaseGiftCard() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: {
      amount: number
      designId: string
      recipientEmail?: string
      recipientName?: string
      message?: string
      purchasedBy: string
    }) => commerceExtrasService.purchaseGiftCard(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceExtrasKeys.giftCards(variables.purchasedBy) })
    },
  })
}

export function useCheckGiftCardBalance(code: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.giftCardBalance(code),
    queryFn: () => commerceExtrasService.checkGiftCardBalance(code),
    enabled: !!code && code.length >= 6,
  })
}

// ==================== DIGITAL DOWNLOADS ====================

export function useDownloads(customerId: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.downloads(customerId),
    queryFn: () => commerceExtrasService.getDownloads(customerId),
    enabled: !!customerId,
  })
}

export function useDownloadFile() {
  return useMutation({
    mutationFn: (downloadId: string) => commerceExtrasService.downloadFile(downloadId),
  })
}

// ==================== LICENSES ====================

export function useLicenses(customerId: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.licenses(customerId),
    queryFn: () => commerceExtrasService.getLicenses(customerId),
    enabled: !!customerId,
  })
}

export function useActivateLicense() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ licenseId, deviceId }: { licenseId: string; deviceId: string }) =>
      commerceExtrasService.activateLicense(licenseId, deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...commerceExtrasKeys.all, "licenses"] })
    },
  })
}

// ==================== DELIVERY TRACKING ====================

export function useDeliveries(customerId: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.deliveries(customerId),
    queryFn: () => commerceExtrasService.getDeliveries(customerId),
    enabled: !!customerId,
  })
}

export function useDelivery(trackingNumber: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.delivery(trackingNumber),
    queryFn: () => commerceExtrasService.getDelivery(trackingNumber),
    enabled: !!trackingNumber,
  })
}

export function useDeliverySlots(date: string, zip: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.deliverySlots(date, zip),
    queryFn: () => commerceExtrasService.getDeliverySlots(date, zip),
    enabled: !!date && !!zip,
  })
}

export function useScheduleDelivery() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ deliveryId, slotId }: { deliveryId: string; slotId: string }) =>
      commerceExtrasService.scheduleDelivery(deliveryId, slotId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...commerceExtrasKeys.all, "deliveries"] })
    },
  })
}

// ==================== STORE CREDITS ====================

export function useStoreCredit(customerId: string) {
  return useQuery({
    queryKey: commerceExtrasKeys.storeCredit(customerId),
    queryFn: () => commerceExtrasService.getStoreCredit(customerId),
    enabled: !!customerId,
  })
}

export function useApplyStoreCredit() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ customerId, amount, orderId }: { customerId: string; amount: number; orderId: string }) =>
      commerceExtrasService.applyStoreCredit(customerId, amount, orderId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceExtrasKeys.storeCredit(variables.customerId) })
    },
  })
}
