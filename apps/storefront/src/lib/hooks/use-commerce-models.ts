/**
 * React Query hooks for Commerce Business Models
 * Rentals, Memberships, Auctions, Donations, Pre-orders, Try Before You Buy, Consignment, Trade-In
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { commerceModelsService } from "../mock/commerce-models"

// ==================== QUERY KEYS ====================

export const commerceKeys = {
  all: ["commerce"] as const,
  
  // Rentals
  rentalProducts: () => [...commerceKeys.all, "rental-products"] as const,
  rentalProduct: (handle: string) => [...commerceKeys.all, "rental-product", handle] as const,
  customerRentals: (customerId: string) => [...commerceKeys.all, "customer-rentals", customerId] as const,
  
  // Memberships
  membershipTiers: () => [...commerceKeys.all, "membership-tiers"] as const,
  membershipTier: (handle: string) => [...commerceKeys.all, "membership-tier", handle] as const,
  customerMembership: (customerId: string) => [...commerceKeys.all, "customer-membership", customerId] as const,
  
  // Auctions
  auctions: (options?: { status?: string; category?: string }) => [...commerceKeys.all, "auctions", options] as const,
  auction: (handle: string) => [...commerceKeys.all, "auction", handle] as const,
  auctionBids: (auctionId: string) => [...commerceKeys.all, "auction-bids", auctionId] as const,
  
  // Donations/Crowdfunding
  campaigns: (options?: { status?: string; category?: string; featured?: boolean }) => [...commerceKeys.all, "campaigns", options] as const,
  campaign: (handle: string) => [...commerceKeys.all, "campaign", handle] as const,
  customerDonations: (customerId: string) => [...commerceKeys.all, "customer-donations", customerId] as const,
  
  // Pre-orders
  preorderProducts: () => [...commerceKeys.all, "preorder-products"] as const,
  preorderProduct: (handle: string) => [...commerceKeys.all, "preorder-product", handle] as const,
  customerPreorders: (customerId: string) => [...commerceKeys.all, "customer-preorders", customerId] as const,
  
  // Try Before You Buy
  trialProducts: () => [...commerceKeys.all, "trial-products"] as const,
  trialProduct: (handle: string) => [...commerceKeys.all, "trial-product", handle] as const,
  customerTrials: (customerId: string) => [...commerceKeys.all, "customer-trials", customerId] as const,
  
  // Consignment
  consignmentItems: (options?: { category?: string; status?: string }) => [...commerceKeys.all, "consignment-items", options] as const,
  consignmentItem: (handle: string) => [...commerceKeys.all, "consignment-item", handle] as const,
  consignmentSeller: (customerId: string) => [...commerceKeys.all, "consignment-seller", customerId] as const,
  
  // Trade-In
  tradeInPrograms: () => [...commerceKeys.all, "tradein-programs"] as const,
  tradeInProgram: (handle: string) => [...commerceKeys.all, "tradein-program", handle] as const,
  customerTradeIns: (customerId: string) => [...commerceKeys.all, "customer-tradeins", customerId] as const,
}

// ==================== RENTALS ====================

export function useRentalProducts() {
  return useQuery({
    queryKey: commerceKeys.rentalProducts(),
    queryFn: () => commerceModelsService.getRentalProducts(),
  })
}

export function useRentalProduct(handle: string) {
  return useQuery({
    queryKey: commerceKeys.rentalProduct(handle),
    queryFn: () => commerceModelsService.getRentalProduct(handle),
    enabled: !!handle,
  })
}

export function useCustomerRentals(customerId: string | undefined) {
  return useQuery({
    queryKey: commerceKeys.customerRentals(customerId || ""),
    queryFn: () => commerceModelsService.getCustomerRentals(customerId!),
    enabled: !!customerId,
  })
}

export function useCreateRental() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, productId, startDate, endDate, duration }: {
      customerId: string
      productId: string
      startDate: string
      endDate: string
      duration: "daily" | "weekly" | "monthly"
    }) => commerceModelsService.createRental(customerId, productId, startDate, endDate, duration),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.customerRentals(variables.customerId) })
    },
  })
}

// ==================== MEMBERSHIPS ====================

export function useMembershipTiers() {
  return useQuery({
    queryKey: commerceKeys.membershipTiers(),
    queryFn: () => commerceModelsService.getMembershipTiers(),
  })
}

export function useMembershipTier(handle: string) {
  return useQuery({
    queryKey: commerceKeys.membershipTier(handle),
    queryFn: () => commerceModelsService.getMembershipTier(handle),
    enabled: !!handle,
  })
}

export function useCustomerMembership(customerId: string | undefined) {
  return useQuery({
    queryKey: commerceKeys.customerMembership(customerId || ""),
    queryFn: () => commerceModelsService.getCustomerMembership(customerId!),
    enabled: !!customerId,
  })
}

export function useCreateMembership() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, tierId, billingCycle }: {
      customerId: string
      tierId: string
      billingCycle: "monthly" | "annual"
    }) => commerceModelsService.createMembership(customerId, tierId, billingCycle),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.customerMembership(variables.customerId) })
    },
  })
}

// ==================== AUCTIONS ====================

export function useAuctions(options?: { status?: string; category?: string }) {
  return useQuery({
    queryKey: commerceKeys.auctions(options),
    queryFn: () => commerceModelsService.getAuctions(options),
  })
}

export function useAuction(handle: string) {
  return useQuery({
    queryKey: commerceKeys.auction(handle),
    queryFn: () => commerceModelsService.getAuction(handle),
    enabled: !!handle,
  })
}

export function useAuctionBids(auctionId: string) {
  return useQuery({
    queryKey: commerceKeys.auctionBids(auctionId),
    queryFn: () => commerceModelsService.getAuctionBids(auctionId),
    enabled: !!auctionId,
  })
}

export function usePlaceBid() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ auctionId, customerId, customerName, amount, isAutoBid, maxAutoBid }: {
      auctionId: string
      customerId: string
      customerName: string
      amount: number
      isAutoBid?: boolean
      maxAutoBid?: number
    }) => commerceModelsService.placeBid(auctionId, customerId, customerName, amount, isAutoBid, maxAutoBid),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.auctionBids(variables.auctionId) })
      queryClient.invalidateQueries({ queryKey: commerceKeys.auctions() })
    },
  })
}

// ==================== DONATIONS / CROWDFUNDING ====================

export function useCampaigns(options?: { status?: string; category?: string; featured?: boolean }) {
  return useQuery({
    queryKey: commerceKeys.campaigns(options),
    queryFn: () => commerceModelsService.getCampaigns(options),
  })
}

export function useCampaign(handle: string) {
  return useQuery({
    queryKey: commerceKeys.campaign(handle),
    queryFn: () => commerceModelsService.getCampaign(handle),
    enabled: !!handle,
  })
}

export function useCustomerDonations(customerId: string | undefined) {
  return useQuery({
    queryKey: commerceKeys.customerDonations(customerId || ""),
    queryFn: () => commerceModelsService.getCustomerDonations(customerId!),
    enabled: !!customerId,
  })
}

export function useCreateDonation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, campaignId, amount, rewardId, anonymous, message }: {
      customerId: string
      campaignId: string
      amount: number
      rewardId?: string
      anonymous?: boolean
      message?: string
    }) => commerceModelsService.createDonation(customerId, campaignId, amount, rewardId, anonymous, message),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.customerDonations(variables.customerId) })
      queryClient.invalidateQueries({ queryKey: commerceKeys.campaigns() })
    },
  })
}

// ==================== PRE-ORDERS ====================

export function usePreorderProducts() {
  return useQuery({
    queryKey: commerceKeys.preorderProducts(),
    queryFn: () => commerceModelsService.getPreorderProducts(),
  })
}

export function usePreorderProduct(handle: string) {
  return useQuery({
    queryKey: commerceKeys.preorderProduct(handle),
    queryFn: () => commerceModelsService.getPreorderProduct(handle),
    enabled: !!handle,
  })
}

export function useCustomerPreorders(customerId: string | undefined) {
  return useQuery({
    queryKey: commerceKeys.customerPreorders(customerId || ""),
    queryFn: () => commerceModelsService.getCustomerPreorders(customerId!),
    enabled: !!customerId,
  })
}

export function useCreatePreorder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, productId }: {
      customerId: string
      productId: string
    }) => commerceModelsService.createPreorder(customerId, productId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.customerPreorders(variables.customerId) })
      queryClient.invalidateQueries({ queryKey: commerceKeys.preorderProducts() })
    },
  })
}

// ==================== TRY BEFORE YOU BUY ====================

export function useTrialProducts() {
  return useQuery({
    queryKey: commerceKeys.trialProducts(),
    queryFn: () => commerceModelsService.getTrialProducts(),
  })
}

export function useTrialProduct(handle: string) {
  return useQuery({
    queryKey: commerceKeys.trialProduct(handle),
    queryFn: () => commerceModelsService.getTrialProduct(handle),
    enabled: !!handle,
  })
}

export function useCustomerTrials(customerId: string | undefined) {
  return useQuery({
    queryKey: commerceKeys.customerTrials(customerId || ""),
    queryFn: () => commerceModelsService.getCustomerTrials(customerId!),
    enabled: !!customerId,
  })
}

export function useCreateTrial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, productId }: {
      customerId: string
      productId: string
    }) => commerceModelsService.createTrial(customerId, productId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.customerTrials(variables.customerId) })
    },
  })
}

export function useUpdateTrialDecision() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, trialId, decision }: {
      customerId: string
      trialId: string
      decision: "keep" | "return"
    }) => commerceModelsService.updateTrialDecision(customerId, trialId, decision),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.customerTrials(variables.customerId) })
    },
  })
}

// ==================== CONSIGNMENT ====================

export function useConsignmentItems(options?: { category?: string; status?: string }) {
  return useQuery({
    queryKey: commerceKeys.consignmentItems(options),
    queryFn: () => commerceModelsService.getConsignmentItems(options),
  })
}

export function useConsignmentItem(handle: string) {
  return useQuery({
    queryKey: commerceKeys.consignmentItem(handle),
    queryFn: () => commerceModelsService.getConsignmentItem(handle),
    enabled: !!handle,
  })
}

export function useConsignmentSeller(customerId: string | undefined) {
  return useQuery({
    queryKey: commerceKeys.consignmentSeller(customerId || ""),
    queryFn: () => commerceModelsService.getConsignmentSeller(customerId!),
    enabled: !!customerId,
  })
}

export function useSubmitConsignmentItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, item }: {
      customerId: string
      item: Parameters<typeof commerceModelsService.submitConsignmentItem>[1]
    }) => commerceModelsService.submitConsignmentItem(customerId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.consignmentItems() })
    },
  })
}

// ==================== TRADE-IN ====================

export function useTradeInPrograms() {
  return useQuery({
    queryKey: commerceKeys.tradeInPrograms(),
    queryFn: () => commerceModelsService.getTradeInPrograms(),
  })
}

export function useTradeInProgram(handle: string) {
  return useQuery({
    queryKey: commerceKeys.tradeInProgram(handle),
    queryFn: () => commerceModelsService.getTradeInProgram(handle),
    enabled: !!handle,
  })
}

export function useCustomerTradeIns(customerId: string | undefined) {
  return useQuery({
    queryKey: commerceKeys.customerTradeIns(customerId || ""),
    queryFn: () => commerceModelsService.getCustomerTradeIns(customerId!),
    enabled: !!customerId,
  })
}

export function useSubmitTradeIn() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, programId, productName, productModel, condition, images, description }: {
      customerId: string
      programId: string
      productName: string
      productModel: string
      condition: "excellent" | "good" | "fair" | "poor"
      images: string[]
      description: string
    }) => commerceModelsService.submitTradeIn(customerId, programId, productName, productModel, condition, images, description),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.customerTradeIns(variables.customerId) })
    },
  })
}

export function useAcceptTradeInQuote() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, tradeInId }: {
      customerId: string
      tradeInId: string
    }) => commerceModelsService.acceptTradeInQuote(customerId, tradeInId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commerceKeys.customerTradeIns(variables.customerId) })
    },
  })
}
