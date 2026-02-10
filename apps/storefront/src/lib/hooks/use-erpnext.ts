/**
 * ERPNext Hooks - Back-Office ERP
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { erpnextService } from "@/lib/mock/erpnext"
import type { TaxCertificate } from "@/lib/mock/erpnext"

// Query Keys
export const erpnextKeys = {
  all: ["erpnext"] as const,
  creditNotes: (customerId: string) => [...erpnextKeys.all, "credits", customerId] as const,
  creditBalance: (customerId: string) => [...erpnextKeys.all, "balance", customerId] as const,
  statements: (customerId: string) => [...erpnextKeys.all, "statements", customerId] as const,
  taxCertificates: (customerId: string) => [...erpnextKeys.all, "tax", customerId] as const,
  taxExemption: (customerId: string) => [...erpnextKeys.all, "exemption", customerId] as const,
  inventory: (variantId: string) => [...erpnextKeys.all, "inventory", variantId] as const,
  suppliers: () => [...erpnextKeys.all, "suppliers"] as const,
}

// Credit Notes / Store Credits
export function useCreditNotes(customerId: string) {
  return useQuery({
    queryKey: erpnextKeys.creditNotes(customerId),
    queryFn: () => erpnextService.getCreditNotes(customerId),
    enabled: !!customerId,
  })
}

export function useCreditBalance(customerId: string) {
  return useQuery({
    queryKey: erpnextKeys.creditBalance(customerId),
    queryFn: () => erpnextService.getCreditBalance(customerId),
    enabled: !!customerId,
  })
}

export function useApplyCreditNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      creditNoteId,
      amount,
    }: {
      customerId: string
      creditNoteId: string
      amount: number
    }) => erpnextService.applyCreditNote(customerId, creditNoteId, amount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: erpnextKeys.creditNotes(variables.customerId) })
      queryClient.invalidateQueries({ queryKey: erpnextKeys.creditBalance(variables.customerId) })
    },
  })
}

// Account Statements
export function useAccountStatements(customerId: string) {
  return useQuery({
    queryKey: erpnextKeys.statements(customerId),
    queryFn: () => erpnextService.getStatements(customerId),
    enabled: !!customerId,
  })
}

// Statements hook (no customerId required - uses mock data)
export function useStatements() {
  return useQuery({
    queryKey: [...erpnextKeys.all, "statements", "current"],
    queryFn: async () => {
      // Return mock statement data
      return [
        {
          id: "stmt_001",
          title: "January 2026 Statement",
          period: "January 2026",
          startDate: "2026-01-01",
          endDate: "2026-01-31",
          openingBalance: 0,
          closingBalance: 2450.00,
          totalDebits: 2450.00,
          totalCredits: 0,
          status: "available" as const,
        },
        {
          id: "stmt_002",
          title: "December 2025 Statement",
          period: "December 2025",
          startDate: "2025-12-01",
          endDate: "2025-12-31",
          openingBalance: 1200.00,
          closingBalance: 0,
          totalDebits: 0,
          totalCredits: 1200.00,
          status: "available" as const,
        },
        {
          id: "stmt_003",
          title: "November 2025 Statement",
          period: "November 2025",
          startDate: "2025-11-01",
          endDate: "2025-11-30",
          openingBalance: 0,
          closingBalance: 1200.00,
          totalDebits: 1200.00,
          totalCredits: 0,
          status: "available" as const,
        },
      ]
    },
  })
}

export function useDownloadStatement() {
  return useMutation({
    mutationFn: (statementId: string) => erpnextService.downloadStatement(statementId),
  })
}

// Tax Certificates
export function useTaxCertificates(customerId: string) {
  return useQuery({
    queryKey: erpnextKeys.taxCertificates(customerId),
    queryFn: () => erpnextService.getTaxCertificates(customerId),
    enabled: !!customerId,
  })
}

export function useUploadTaxCertificate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      customerId,
      type,
      taxId,
      jurisdiction,
      documentUrl,
    }: {
      customerId: string
      type: TaxCertificate["type"]
      taxId: string
      jurisdiction: string
      documentUrl: string
    }) => erpnextService.uploadTaxCertificate(customerId, { type, taxId, jurisdiction, documentUrl }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: erpnextKeys.taxCertificates(variables.customerId) })
    },
  })
}

export function useTaxExemptionStatus(customerId: string) {
  return useQuery({
    queryKey: erpnextKeys.taxExemption(customerId),
    queryFn: () => erpnextService.getTaxExemptionStatus(customerId),
    enabled: !!customerId,
  })
}

// Inventory
export function useCheckInventory(variantId: string, quantity: number) {
  return useQuery({
    queryKey: [...erpnextKeys.inventory(variantId), quantity],
    queryFn: () => erpnextService.checkInventory(variantId, quantity),
    enabled: !!variantId && quantity > 0,
  })
}

export function useInventoryAlerts(productIds: string[]) {
  return useQuery({
    queryKey: [...erpnextKeys.all, "alerts", productIds],
    queryFn: () => erpnextService.getInventoryAlerts(productIds),
    enabled: productIds.length > 0,
  })
}

// Suppliers (B2B)
export function useSuppliers() {
  return useQuery({
    queryKey: erpnextKeys.suppliers(),
    queryFn: () => erpnextService.getSuppliers(),
  })
}
