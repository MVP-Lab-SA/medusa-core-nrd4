/**
 * Centralized Account Design System
 * 
 * This file contains all shared UI components for account pages.
 * All account pages should import from here to maintain consistency.
 */

import { clsx } from "clsx"
import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react"
import { Spinner } from "@medusajs/icons"

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export const accountTheme = {
  colors: {
    bg: {
      page: "bg-black",
      card: "bg-gray-900",
      cardHover: "hover:bg-gray-800",
      input: "bg-gray-800",
      accent: "bg-cyan-500",
      accentHover: "hover:bg-cyan-400",
      accentSubtle: "bg-cyan-500/10",
      danger: "bg-red-500/10",
      success: "bg-emerald-500/10",
      warning: "bg-amber-500/10",
    },
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      muted: "text-gray-500",
      accent: "text-cyan-400",
      danger: "text-red-400",
      success: "text-emerald-400",
      warning: "text-amber-400",
      onAccent: "text-black",
    },
    border: {
      default: "border-gray-800",
      subtle: "border-gray-700",
      accent: "border-cyan-500",
      danger: "border-red-500",
    },
  },
  spacing: {
    card: "p-6",
    cardCompact: "p-4",
    section: "space-y-6",
    stack: "space-y-4",
  },
  radius: {
    card: "rounded-xl",
    button: "rounded-lg",
    input: "rounded-lg",
    badge: "rounded-full",
  },
}

// ============================================================================
// CARD COMPONENTS
// ============================================================================

interface AccountCardProps {
  children: ReactNode
  className?: string
  compact?: boolean
  hover?: boolean
}

export function AccountCard({ children, className, compact, hover }: AccountCardProps) {
  return (
    <div
      className={clsx(
        "bg-gray-900 border border-gray-800 rounded-xl",
        compact ? "p-4" : "p-6",
        hover && "hover:bg-gray-800 transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}

interface AccountCardHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
}

export function AccountCardHeader({ title, description, action, icon }: AccountCardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

interface AccountButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  icon?: ReactNode
}

export const AccountButton = forwardRef<HTMLButtonElement, AccountButtonProps>(
  ({ children, variant = "primary", size = "md", loading, icon, className, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-cyan-500 hover:bg-cyan-400 text-black font-medium",
      secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
      danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
      ghost: "text-gray-400 hover:text-white hover:bg-gray-800",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? <Spinner className="w-4 h-4 animate-spin" /> : icon}
        {children}
      </button>
    )
  }
)
AccountButton.displayName = "AccountButton"

// ============================================================================
// FORM COMPONENTS
// ============================================================================

interface AccountInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const AccountInput = forwardRef<HTMLInputElement, AccountInputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-")

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500" : "border-gray-700",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        {hint && !error && <p className="text-sm text-gray-500">{hint}</p>}
      </div>
    )
  }
)
AccountInput.displayName = "AccountInput"

interface AccountSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const AccountSelect = forwardRef<HTMLSelectElement, AccountSelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s/g, "-")

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "w-full px-4 py-3 bg-gray-800 border rounded-lg text-white",
            "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500" : "border-gray-700",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    )
  }
)
AccountSelect.displayName = "AccountSelect"

interface AccountTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const AccountTextarea = forwardRef<HTMLTextAreaElement, AccountTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s/g, "-")

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            "w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500" : "border-gray-700",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    )
  }
)
AccountTextarea.displayName = "AccountTextarea"

// ============================================================================
// TOGGLE COMPONENT
// ============================================================================

interface AccountToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
}

export function AccountToggle({ checked, onChange, label, description, disabled }: AccountToggleProps) {
  return (
    <label className={clsx("flex items-start gap-4 cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={clsx(
            "w-11 h-6 rounded-full transition-colors",
            checked ? "bg-cyan-500" : "bg-gray-700"
          )}
        />
        <div
          className={clsx(
            "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
            checked && "translate-x-5"
          )}
        />
      </div>
      {(label || description) && (
        <div>
          {label && <span className="text-sm font-medium text-white">{label}</span>}
          {description && <p className="text-sm text-gray-400 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  )
}

// ============================================================================
// BADGE COMPONENT
// ============================================================================

interface AccountBadgeProps {
  children: ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "accent"
  size?: "sm" | "md"
}

export function AccountBadge({ children, variant = "default", size = "sm" }: AccountBadgeProps) {
  const variants = {
    default: "bg-gray-800 text-gray-300",
    success: "bg-emerald-500/10 text-emerald-400",
    warning: "bg-amber-500/10 text-amber-400",
    danger: "bg-red-500/10 text-red-400",
    accent: "bg-cyan-500/10 text-cyan-400",
  }

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  }

  return (
    <span className={clsx("inline-flex items-center rounded-full font-medium", variants[variant], sizes[size])}>
      {children}
    </span>
  )
}

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

interface AccountEmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function AccountEmptyState({ icon, title, description, action }: AccountEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 bg-gray-800 rounded-full text-gray-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  )
}

// ============================================================================
// MODAL COMPONENT
// ============================================================================

interface AccountModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: "sm" | "md" | "lg"
}

export function AccountModal({ open, onClose, title, children, footer, size = "md" }: AccountModalProps) {
  if (!open) return null

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={clsx("relative w-full bg-gray-900 border border-gray-800 rounded-xl", sizes[size])}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="flex justify-end gap-3 p-6 border-t border-gray-800">{footer}</div>}
      </div>
    </div>
  )
}

// ============================================================================
// STATS CARD COMPONENT
// ============================================================================

interface AccountStatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  trend?: { value: number; positive: boolean }
  accent?: boolean
}

export function AccountStatCard({ label, value, icon, trend, accent }: AccountStatCardProps) {
  return (
    <AccountCard>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <p className={clsx("text-2xl font-bold", accent ? "text-cyan-400" : "text-white")}>{value}</p>
          {trend && (
            <p className={clsx("text-sm mt-1", trend.positive ? "text-emerald-400" : "text-red-400")}>
              {trend.positive ? "+" : ""}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className={clsx("p-3 rounded-lg", accent ? "bg-cyan-500/10 text-cyan-400" : "bg-gray-800 text-gray-400")}>
          {icon}
        </div>
      </div>
    </AccountCard>
  )
}

// ============================================================================
// TABLE COMPONENTS
// ============================================================================

interface AccountTableProps {
  children: ReactNode
  className?: string
}

export function AccountTable({ children, className }: AccountTableProps) {
  return (
    <div className={clsx("overflow-x-auto", className)}>
      <table className="w-full">
        {children}
      </table>
    </div>
  )
}

export function AccountTableHead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-gray-800">
        {children}
      </tr>
    </thead>
  )
}

export function AccountTableHeadCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th className={clsx("px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", className)}>
      {children}
    </th>
  )
}

export function AccountTableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-gray-800">{children}</tbody>
}

export function AccountTableRow({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <tr 
      onClick={onClick}
      className={clsx(
        "transition-colors",
        onClick && "cursor-pointer hover:bg-gray-800/50"
      )}
    >
      {children}
    </tr>
  )
}

export function AccountTableCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={clsx("px-4 py-4 text-sm text-gray-300", className)}>
      {children}
    </td>
  )
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

interface AccountTabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[]
  activeTab: string
  onChange: (tabId: string) => void
}

export function AccountTabs({ tabs, activeTab, onChange }: AccountTabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-gray-900 border border-gray-800 rounded-lg mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "bg-cyan-500 text-black"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// ALERT COMPONENT
// ============================================================================

interface AccountAlertProps {
  type: "info" | "success" | "warning" | "error"
  title?: string
  children: ReactNode
}

export function AccountAlert({ type, title, children }: AccountAlertProps) {
  const types = {
    info: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
  }

  return (
    <div className={clsx("p-4 rounded-lg border", types[type])}>
      {title && <p className="font-medium mb-1">{title}</p>}
      <p className="text-sm opacity-90">{children}</p>
    </div>
  )
}

// ============================================================================
// LOADING SKELETON
// ============================================================================

interface AccountSkeletonProps {
  className?: string
}

export function AccountSkeleton({ className }: AccountSkeletonProps) {
  return (
    <div className={clsx("animate-pulse bg-gray-800 rounded", className)} />
  )
}

export function AccountCardSkeleton() {
  return (
    <AccountCard>
      <AccountSkeleton className="h-6 w-1/3 mb-4" />
      <AccountSkeleton className="h-4 w-2/3 mb-2" />
      <AccountSkeleton className="h-4 w-1/2" />
    </AccountCard>
  )
}

// ============================================================================
// PAGE HEADER COMPONENT
// ============================================================================

interface AccountPageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  breadcrumb?: { label: string; href?: string }[]
}

export function AccountPageHeader({ title, description, action, breadcrumb }: AccountPageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          {breadcrumb.map((item, index) => (
            <span key={item.label} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {item.href ? (
                <a href={item.href} className="hover:text-cyan-400 transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-300">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && <p className="text-gray-400 mt-1">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}
