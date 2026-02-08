/**
 * Payment Gateway Hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { paymentService } from "@/lib/mock/payments"
import type { PaymentMethod, DisputeEvidence } from "@/lib/mock/payments"

// Query Keys
export const paymentKeys = {
  all: ["payments"] as const,
  methods: (customerId: string) => [...paymentKeys.all, "methods", customerId] as const,
  wallet: (customerId: string) => [...paymentKeys.all, "wallet", customerId] as const,
  transactions: (customerId: string) => [...paymentKeys.all, "transactions", customerId] as const,
  disputes: (customerId: string) => [...paymentKeys.all, "disputes", customerId] as const,
  installments: (customerId: string) => [...paymentKeys.all, "installments", customerId] as const,
  loyalty: (customerId: string) => [...paymentKeys.all, "loyalty", customerId] as const,
  redemptionOptions: (points: number) => [...paymentKeys.all, "redemption", points] as const,
}

// Payment Methods
export function usePaymentMethods(customerId: string) {
  return useQuery({
    queryKey: paymentKeys.methods(customerId),
    queryFn: () => paymentService.getPaymentMethods(customerId),
    enabled: !!customerId,
  })
}

export function useAddPaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      type,
      token,
      setDefault,
    }: {
      customerId: string
      type: PaymentMethod["type"]
      token: string
      setDefault?: boolean
    }) => paymentService.addPaymentMethod(customerId, { type, token, setDefault }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.methods(variables.customerId) })
    },
  })
}

export function useRemovePaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ customerId, methodId }: { customerId: string; methodId: string }) =>
      paymentService.removePaymentMethod(customerId, methodId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.methods(variables.customerId) })
    },
  })
}

export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ customerId, methodId }: { customerId: string; methodId: string }) =>
      paymentService.setDefaultPaymentMethod(customerId, methodId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.methods(variables.customerId) })
    },
  })
}

// Wallet
export function useWallet(customerId: string) {
  return useQuery({
    queryKey: paymentKeys.wallet(customerId),
    queryFn: () => paymentService.getWallet(customerId),
    enabled: !!customerId,
  })
}

export function useTopUpWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      amount,
      paymentMethodId,
    }: {
      customerId: string
      amount: number
      paymentMethodId: string
    }) => paymentService.topUpWallet(customerId, amount, paymentMethodId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.wallet(variables.customerId) })
    },
  })
}

export function useWithdrawFromWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ customerId, amount }: { customerId: string; amount: number }) =>
      paymentService.withdrawFromWallet(customerId, amount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.wallet(variables.customerId) })
    },
  })
}

// Transactions
export function useTransactions(customerId: string) {
  return useQuery({
    queryKey: paymentKeys.transactions(customerId),
    queryFn: () => paymentService.getTransactions(customerId),
    enabled: !!customerId,
  })
}

// Refunds
export function useRequestRefund() {
  return useMutation({
    mutationFn: ({
      transactionId,
      amount,
      reason,
    }: {
      transactionId: string
      amount: number
      reason: string
    }) => paymentService.requestRefund(transactionId, amount, reason),
  })
}

// Disputes
export function useDisputes(customerId: string) {
  return useQuery({
    queryKey: paymentKeys.disputes(customerId),
    queryFn: () => paymentService.getDisputes(customerId),
    enabled: !!customerId,
  })
}

export function useCreateDispute() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ transactionId, reason }: { transactionId: string; reason: string }) =>
      paymentService.createDispute(transactionId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.disputes("") })
    },
  })
}

export function useSubmitDisputeEvidence() {
  return useMutation({
    mutationFn: ({
      disputeId,
      evidence,
    }: {
      disputeId: string
      evidence: Omit<DisputeEvidence, "id" | "uploadedAt">
    }) => paymentService.submitDisputeEvidence(disputeId, evidence),
  })
}

// Installments (BNPL)
export function useInstallmentPlans(customerId: string) {
  return useQuery({
    queryKey: paymentKeys.installments(customerId),
    queryFn: () => paymentService.getInstallmentPlans(customerId),
    enabled: !!customerId,
  })
}

export function useCalculateInstallments(amount: number, numberOfInstallments: number) {
  return useQuery({
    queryKey: [...paymentKeys.all, "calculate", amount, numberOfInstallments],
    queryFn: () => paymentService.calculateInstallments(amount, numberOfInstallments),
    enabled: amount > 0 && numberOfInstallments > 0,
  })
}

// Loyalty
export function useLoyaltyAccount(customerId: string) {
  return useQuery({
    queryKey: paymentKeys.loyalty(customerId),
    queryFn: () => paymentService.getLoyaltyAccount(customerId),
    enabled: !!customerId,
  })
}

export function useEarnPoints() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      points,
      description,
      orderId,
    }: {
      customerId: string
      points: number
      description: string
      orderId?: string
    }) => paymentService.earnPoints(customerId, points, description, orderId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.loyalty(variables.customerId) })
    },
  })
}

export function useRedeemPoints() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      points,
      description,
    }: {
      customerId: string
      points: number
      description: string
    }) => paymentService.redeemPoints(customerId, points, description),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.loyalty(variables.customerId) })
    },
  })
}

export function useRedemptionOptions(points: number) {
  return useQuery({
    queryKey: paymentKeys.redemptionOptions(points),
    queryFn: () => paymentService.getRedemptionOptions(points),
    enabled: points > 0,
  })
}
