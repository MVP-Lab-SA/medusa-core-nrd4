/**
 * CityOS Design System - Centralized design tokens and utility classes
 * 
 * This file provides consistent styling across the entire storefront.
 * All pages and components should use these tokens for visual consistency.
 */

// =============================================================================
// COLOR TOKENS (matching theme.css)
// =============================================================================

export const colors = {
  // Backgrounds
  bgPrimary: "bg-city-dark",        // #0a0f1a - Darkest, main background
  bgSecondary: "bg-city-navy",      // #111827 - Cards, sections
  bgTertiary: "bg-city-slate",      // #1e293b - Elevated elements
  bgHover: "bg-city-steel",         // #334155 - Hover states

  // Text
  textPrimary: "text-city-white",   // #f8fafc - Main text
  textSecondary: "text-city-gray",  // #94a3b8 - Secondary text
  textMuted: "text-city-muted",     // #64748b - Muted/disabled text
  textAccent: "text-city-cyan",     // #06b6d4 - Accent/links

  // Borders
  borderPrimary: "border-city-steel",   // #334155 - Default borders
  borderAccent: "border-city-cyan",     // #06b6d4 - Accent borders

  // Status Colors (using Tailwind defaults for consistency)
  success: "text-emerald-400",
  successBg: "bg-emerald-500/10",
  warning: "text-amber-400",
  warningBg: "bg-amber-500/10",
  error: "text-red-400",
  errorBg: "bg-red-500/10",
  info: "text-city-cyan",
  infoBg: "bg-city-cyan/10",
} as const

// =============================================================================
// COMPONENT STYLES
// =============================================================================

export const components = {
  // Page Layout
  pageWrapper: "min-h-screen bg-city-dark",
  pageContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
  pageContainerNarrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
  
  // Page Header
  pageHeader: "mb-8",
  pageTitle: "text-3xl font-bold text-city-white mb-2",
  pageSubtitle: "text-city-gray",
  
  // Cards
  card: "bg-city-navy border border-city-steel rounded-xl p-6",
  cardHover: "bg-city-navy border border-city-steel rounded-xl p-6 hover:border-city-cyan/50 transition-colors",
  cardHeader: "flex items-center justify-between mb-4",
  cardTitle: "text-lg font-semibold text-city-white",
  cardDescription: "text-city-gray text-sm",
  
  // Buttons
  buttonPrimary: "bg-city-cyan text-city-dark font-medium px-6 py-3 rounded-lg hover:bg-city-cyan-light transition-colors",
  buttonSecondary: "bg-city-slate text-city-white font-medium px-6 py-3 rounded-lg border border-city-steel hover:bg-city-steel transition-colors",
  buttonOutline: "border border-city-steel text-city-white font-medium px-6 py-3 rounded-lg hover:bg-city-slate transition-colors",
  buttonGhost: "text-city-gray hover:text-city-white transition-colors",
  buttonDanger: "bg-red-500/10 text-red-400 font-medium px-6 py-3 rounded-lg hover:bg-red-500/20 transition-colors",
  buttonSmall: "px-4 py-2 text-sm",
  
  // Forms
  input: "w-full bg-city-slate border border-city-steel rounded-lg px-4 py-3 text-city-white placeholder-city-muted focus:outline-none focus:border-city-cyan transition-colors",
  inputLabel: "block text-sm font-medium text-city-gray mb-2",
  inputError: "border-red-500 focus:border-red-500",
  inputHelper: "mt-1 text-sm text-city-muted",
  select: "w-full bg-city-slate border border-city-steel rounded-lg px-4 py-3 text-city-white focus:outline-none focus:border-city-cyan transition-colors appearance-none",
  textarea: "w-full bg-city-slate border border-city-steel rounded-lg px-4 py-3 text-city-white placeholder-city-muted focus:outline-none focus:border-city-cyan transition-colors resize-none",
  checkbox: "w-5 h-5 rounded border-city-steel bg-city-slate text-city-cyan focus:ring-city-cyan focus:ring-offset-city-dark",
  
  // Tables
  table: "w-full",
  tableHeader: "text-left text-city-gray text-sm font-medium border-b border-city-steel pb-3",
  tableRow: "border-b border-city-steel/50",
  tableCell: "py-4 text-city-white",
  tableCellMuted: "py-4 text-city-gray",
  
  // Lists
  listItem: "flex items-center justify-between py-4 border-b border-city-steel/50 last:border-0",
  
  // Badges/Tags
  badge: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
  badgeSuccess: "bg-emerald-500/10 text-emerald-400",
  badgeWarning: "bg-amber-500/10 text-amber-400",
  badgeError: "bg-red-500/10 text-red-400",
  badgeInfo: "bg-city-cyan/10 text-city-cyan",
  badgeNeutral: "bg-city-slate text-city-gray",
  
  // Navigation
  navLink: "text-city-gray hover:text-city-white transition-colors",
  navLinkActive: "text-city-cyan",
  breadcrumb: "flex items-center gap-2 text-sm text-city-gray mb-6",
  
  // Tabs
  tabList: "flex gap-1 border-b border-city-steel mb-6",
  tab: "px-4 py-3 text-city-gray hover:text-city-white transition-colors border-b-2 border-transparent -mb-px",
  tabActive: "px-4 py-3 text-city-cyan border-b-2 border-city-cyan -mb-px",
  
  // Empty States
  emptyState: "text-center py-12",
  emptyStateIcon: "w-16 h-16 mx-auto text-city-steel mb-4",
  emptyStateTitle: "text-xl font-semibold text-city-white mb-2",
  emptyStateDescription: "text-city-gray mb-6",
  
  // Loading States
  skeleton: "animate-pulse bg-city-slate rounded",
  spinner: "animate-spin text-city-cyan",
  
  // Modals/Dialogs
  modalOverlay: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50",
  modalContent: "fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-city-navy border border-city-steel rounded-xl p-6 z-50",
  modalHeader: "text-xl font-semibold text-city-white mb-4",
  
  // Alerts
  alert: "p-4 rounded-lg border",
  alertSuccess: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  alertWarning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  alertError: "bg-red-500/10 border-red-500/30 text-red-400",
  alertInfo: "bg-city-cyan/10 border-city-cyan/30 text-city-cyan",
  
  // Stats/Metrics
  statCard: "bg-city-navy border border-city-steel rounded-xl p-6",
  statValue: "text-3xl font-bold text-city-white",
  statLabel: "text-city-gray text-sm mt-1",
  statChange: "text-sm",
  statChangePositive: "text-emerald-400",
  statChangeNegative: "text-red-400",
  
  // Icons
  iconWrapper: "flex items-center justify-center w-10 h-10 rounded-lg bg-city-slate",
  iconWrapperLarge: "flex items-center justify-center w-12 h-12 rounded-xl bg-city-slate",
  iconAccent: "text-city-cyan",
  iconMuted: "text-city-muted",
  
  // Dividers
  divider: "border-t border-city-steel my-6",
  dividerLight: "border-t border-city-steel/50 my-4",
  
  // Grid Layouts
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-6",
  grid3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  grid4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
  
  // Sidebar Layout
  sidebarLayout: "flex gap-8",
  sidebar: "w-64 flex-shrink-0",
  sidebarContent: "flex-1",
  sidebarNav: "space-y-1",
  sidebarNavItem: "flex items-center gap-3 px-4 py-3 rounded-lg text-city-gray hover:bg-city-slate hover:text-city-white transition-colors",
  sidebarNavItemActive: "flex items-center gap-3 px-4 py-3 rounded-lg bg-city-slate text-city-cyan",
} as const

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Combine multiple class names, filtering out falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ")
}

/**
 * Get status badge classes based on status string
 */
export function getStatusBadge(status: string): string {
  const statusMap: Record<string, string> = {
    active: components.badgeSuccess,
    completed: components.badgeSuccess,
    success: components.badgeSuccess,
    approved: components.badgeSuccess,
    paid: components.badgeSuccess,
    pending: components.badgeWarning,
    processing: components.badgeWarning,
    review: components.badgeWarning,
    awaiting: components.badgeWarning,
    cancelled: components.badgeError,
    failed: components.badgeError,
    rejected: components.badgeError,
    expired: components.badgeError,
    overdue: components.badgeError,
    draft: components.badgeNeutral,
    inactive: components.badgeNeutral,
  }
  
  const normalizedStatus = status.toLowerCase().replace(/[_-]/g, "")
  
  for (const [key, value] of Object.entries(statusMap)) {
    if (normalizedStatus.includes(key)) {
      return `${components.badge} ${value}`
    }
  }
  
  return `${components.badge} ${components.badgeNeutral}`
}

/**
 * Format currency amount for display
 */
export function formatPrice(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  return new Date(date).toLocaleDateString("en-US", options || defaultOptions)
}

// =============================================================================
// RE-EXPORTS
// =============================================================================

export default {
  colors,
  components,
  cn,
  getStatusBadge,
  formatPrice,
  formatDate,
}
