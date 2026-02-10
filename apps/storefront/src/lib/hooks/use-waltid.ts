/**
 * Walt.id Hooks - Identity & Credentials
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { waltidService } from "@/lib/mock/waltid"
import type { CredentialType, KYCDocument, VerifiableCredential } from "@/lib/mock/waltid"

// Query Keys
export const waltidKeys = {
  all: ["waltid"] as const,
  wallet: (customerId: string) => [...waltidKeys.all, "wallet", customerId] as const,
  credentials: (customerId: string) => [...waltidKeys.all, "credentials", customerId] as const,
  credential: (credentialId: string) => [...waltidKeys.all, "credential", credentialId] as const,
  kyc: (customerId: string) => [...waltidKeys.all, "kyc", customerId] as const,
  consents: (customerId: string) => [...waltidKeys.all, "consents", customerId] as const,
  ageVerification: (customerId: string, age: number) =>
    [...waltidKeys.all, "age", customerId, age] as const,
}

// Identity Wallet
export function useIdentityWallet(customerId: string) {
  return useQuery({
    queryKey: waltidKeys.wallet(customerId),
    queryFn: () => waltidService.getWallet(customerId),
    enabled: !!customerId,
  })
}

export function useCreateIdentityWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (customerId: string) => waltidService.createWallet(customerId),
    onSuccess: (data) => {
      queryClient.setQueryData(waltidKeys.wallet(data.customerId), data)
    },
  })
}

// Credentials
export function useCredentials(customerId: string) {
  return useQuery({
    queryKey: waltidKeys.credentials(customerId),
    queryFn: () => waltidService.getCredentials(customerId),
    enabled: !!customerId,
  })
}

export function useCredential(credentialId: string) {
  return useQuery({
    queryKey: waltidKeys.credential(credentialId),
    queryFn: () => waltidService.getCredential(credentialId),
    enabled: !!credentialId,
  })
}

export function useRequestCredential() {
  return useMutation({
    mutationFn: ({ customerId, type }: { customerId: string; type: CredentialType }) =>
      waltidService.requestCredential(customerId, type),
  })
}

export function useVerifyCredential() {
  return useMutation({
    mutationFn: (credentialId: string) => waltidService.verifyCredential(credentialId),
  })
}

// KYC
export function useKYCStatus(customerId: string) {
  return useQuery({
    queryKey: waltidKeys.kyc(customerId),
    queryFn: () => waltidService.getKYCStatus(customerId),
    enabled: !!customerId,
  })
}

export function useStartKYC() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      level,
    }: {
      customerId: string
      level: "basic" | "enhanced" | "full"
    }) => waltidService.startKYC(customerId, level),
    onSuccess: (data) => {
      queryClient.setQueryData(waltidKeys.kyc(data.customerId), data)
    },
  })
}

export function useUploadKYCDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      documentType,
      fileUrl,
    }: {
      customerId: string
      documentType: KYCDocument["type"]
      fileUrl: string
    }) => waltidService.uploadKYCDocument(customerId, documentType, fileUrl),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: waltidKeys.kyc(variables.customerId) })
    },
  })
}

export function useSubmitKYC() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (customerId: string) => waltidService.submitKYC(customerId),
    onSuccess: (data) => {
      queryClient.setQueryData(waltidKeys.kyc(data.customerId), data)
    },
  })
}

// Age Verification
export function useAgeVerification(customerId: string, minimumAge: number) {
  return useQuery({
    queryKey: waltidKeys.ageVerification(customerId, minimumAge),
    queryFn: () => waltidService.verifyAge(customerId, minimumAge),
    enabled: !!customerId && minimumAge > 0,
  })
}

// Consents
export function useConsents(customerId: string) {
  return useQuery({
    queryKey: waltidKeys.consents(customerId),
    queryFn: () => waltidService.getConsents(customerId),
    enabled: !!customerId,
  })
}

export function useUpdateConsent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      purpose,
      granted,
    }: {
      customerId: string
      purpose: string
      granted: boolean
    }) => waltidService.updateConsent(customerId, purpose, granted),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: waltidKeys.consents(variables.customerId) })
    },
  })
}

// Access Check
export function useCheckAccess(customerId: string, policyId: string) {
  return useQuery({
    queryKey: [...waltidKeys.all, "access", customerId, policyId],
    queryFn: () => waltidService.checkAccess(customerId, policyId),
    enabled: !!customerId && !!policyId,
  })
}
