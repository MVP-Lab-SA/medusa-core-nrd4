import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { themes, defaultTheme, ThemeId, Theme, ThemeColors } from "./themes"

// =============================================================================
// CONTEXT TYPES
// =============================================================================

interface ThemeContextType {
  theme: Theme
  themeId: ThemeId
  colors: ThemeColors
  setTheme: (themeId: ThemeId) => void
  isDark: boolean
  // Utility function to get themed class
  t: (key: keyof ThemeColors) => string
  // Component style helpers
  styles: ThemeStyles
}

interface ThemeStyles {
  // Page
  page: string
  pageContainer: string
  pageContainerNarrow: string
  
  // Cards
  card: string
  cardHover: string
  cardTitle: string
  cardDescription: string
  
  // Buttons
  buttonPrimary: string
  buttonSecondary: string
  buttonOutline: string
  buttonGhost: string
  buttonDanger: string
  
  // Forms
  input: string
  inputLabel: string
  select: string
  textarea: string
  
  // Tables
  table: string
  tableHeader: string
  tableRow: string
  tableCell: string
  tableCellMuted: string
  
  // Badges
  badge: string
  badgeSuccess: string
  badgeWarning: string
  badgeError: string
  badgeInfo: string
  badgeNeutral: string
  
  // Navigation
  navLink: string
  navLinkActive: string
  breadcrumb: string
  
  // Tabs
  tabList: string
  tab: string
  tabActive: string
  
  // Empty States
  emptyState: string
  emptyStateIcon: string
  emptyStateTitle: string
  emptyStateDescription: string
  
  // Loading
  skeleton: string
  
  // Modal
  modalOverlay: string
  modalContent: string
  modalHeader: string
  
  // Alerts
  alertSuccess: string
  alertWarning: string
  alertError: string
  alertInfo: string
  
  // Stats
  statCard: string
  statValue: string
  statLabel: string
  
  // Sidebar
  sidebarNav: string
  sidebarNavItem: string
  sidebarNavItemActive: string
  
  // Grid
  grid2: string
  grid3: string
  grid4: string
  
  // Dividers
  divider: string
}

// =============================================================================
// STORAGE KEY
// =============================================================================

const THEME_STORAGE_KEY = "storefront-theme"

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateStyles(colors: ThemeColors, isDark: boolean): ThemeStyles {
  return {
    // Page
    page: `min-h-screen ${colors.bgPrimary}`,
    pageContainer: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`,
    pageContainerNarrow: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8`,
    
    // Cards
    card: `${colors.bgSecondary} ${colors.borderPrimary} border rounded-xl p-6`,
    cardHover: `${colors.bgSecondary} ${colors.borderPrimary} border rounded-xl p-6 hover:${colors.borderAccent.replace('border-', 'border-')}/50 transition-colors`,
    cardTitle: `text-lg font-semibold ${colors.textPrimary}`,
    cardDescription: `${colors.textSecondary} text-sm`,
    
    // Buttons
    buttonPrimary: `${colors.brandPrimary} ${isDark ? 'text-black' : 'text-white'} font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-all`,
    buttonSecondary: `${colors.bgTertiary} ${colors.textPrimary} font-medium px-6 py-3 rounded-lg ${colors.borderPrimary} border hover:${colors.bgHover.replace('bg-', 'bg-')} transition-colors`,
    buttonOutline: `${colors.borderPrimary} border ${colors.textPrimary} font-medium px-6 py-3 rounded-lg hover:${colors.bgTertiary.replace('bg-', 'bg-')} transition-colors`,
    buttonGhost: `${colors.textSecondary} hover:${colors.textPrimary.replace('text-', 'text-')} transition-colors`,
    buttonDanger: `${colors.errorBg} ${colors.error} font-medium px-6 py-3 rounded-lg hover:opacity-80 transition-all`,
    
    // Forms
    input: `w-full ${colors.bgTertiary} ${colors.borderPrimary} border rounded-lg px-4 py-3 ${colors.textPrimary} placeholder:${colors.textMuted.replace('text-', 'text-')} focus:outline-none focus:${colors.borderAccent.replace('border-', 'border-')} transition-colors`,
    inputLabel: `block text-sm font-medium ${colors.textSecondary} mb-2`,
    select: `w-full ${colors.bgTertiary} ${colors.borderPrimary} border rounded-lg px-4 py-3 ${colors.textPrimary} focus:outline-none focus:${colors.borderAccent.replace('border-', 'border-')} transition-colors appearance-none`,
    textarea: `w-full ${colors.bgTertiary} ${colors.borderPrimary} border rounded-lg px-4 py-3 ${colors.textPrimary} placeholder:${colors.textMuted.replace('text-', 'text-')} focus:outline-none focus:${colors.borderAccent.replace('border-', 'border-')} transition-colors resize-none`,
    
    // Tables
    table: `w-full`,
    tableHeader: `text-left ${colors.textSecondary} text-sm font-medium ${colors.borderPrimary} border-b pb-3`,
    tableRow: `${colors.borderSecondary} border-b`,
    tableCell: `py-4 ${colors.textPrimary}`,
    tableCellMuted: `py-4 ${colors.textSecondary}`,
    
    // Badges
    badge: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium`,
    badgeSuccess: `${colors.successBg} ${colors.success}`,
    badgeWarning: `${colors.warningBg} ${colors.warning}`,
    badgeError: `${colors.errorBg} ${colors.error}`,
    badgeInfo: `${colors.infoBg} ${colors.info}`,
    badgeNeutral: `${colors.bgTertiary} ${colors.textSecondary}`,
    
    // Navigation
    navLink: `${colors.textSecondary} hover:${colors.textPrimary.replace('text-', 'text-')} transition-colors`,
    navLinkActive: `${colors.textAccent}`,
    breadcrumb: `flex items-center gap-2 text-sm ${colors.textSecondary} mb-6`,
    
    // Tabs
    tabList: `flex gap-1 ${colors.borderPrimary} border-b mb-6`,
    tab: `px-4 py-3 ${colors.textSecondary} hover:${colors.textPrimary.replace('text-', 'text-')} transition-colors border-b-2 border-transparent -mb-px`,
    tabActive: `px-4 py-3 ${colors.textAccent} ${colors.borderAccent} border-b-2 -mb-px`,
    
    // Empty States
    emptyState: `text-center py-12`,
    emptyStateIcon: `w-16 h-16 mx-auto ${colors.textMuted} mb-4`,
    emptyStateTitle: `text-xl font-semibold ${colors.textPrimary} mb-2`,
    emptyStateDescription: `${colors.textSecondary} mb-6`,
    
    // Loading
    skeleton: `animate-pulse ${colors.bgTertiary} rounded`,
    
    // Modal
    modalOverlay: `fixed inset-0 bg-black/60 backdrop-blur-sm z-50`,
    modalContent: `fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto ${colors.bgSecondary} ${colors.borderPrimary} border rounded-xl p-6 z-50`,
    modalHeader: `text-xl font-semibold ${colors.textPrimary} mb-4`,
    
    // Alerts
    alertSuccess: `p-4 rounded-lg border ${colors.successBg} ${colors.success} border-emerald-500/30`,
    alertWarning: `p-4 rounded-lg border ${colors.warningBg} ${colors.warning} border-amber-500/30`,
    alertError: `p-4 rounded-lg border ${colors.errorBg} ${colors.error} border-red-500/30`,
    alertInfo: `p-4 rounded-lg border ${colors.infoBg} ${colors.info} ${colors.borderAccent}/30`,
    
    // Stats
    statCard: `${colors.bgSecondary} ${colors.borderPrimary} border rounded-xl p-6`,
    statValue: `text-3xl font-bold ${colors.textPrimary}`,
    statLabel: `${colors.textSecondary} text-sm mt-1`,
    
    // Sidebar
    sidebarNav: `space-y-1`,
    sidebarNavItem: `flex items-center gap-3 px-4 py-3 rounded-lg ${colors.textSecondary} hover:${colors.bgTertiary.replace('bg-', 'bg-')} hover:${colors.textPrimary.replace('text-', 'text-')} transition-colors`,
    sidebarNavItemActive: `flex items-center gap-3 px-4 py-3 rounded-lg ${colors.bgTertiary} ${colors.textAccent}`,
    
    // Grid
    grid2: `grid grid-cols-1 md:grid-cols-2 gap-6`,
    grid3: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`,
    grid4: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`,
    
    // Dividers
    divider: `${colors.borderPrimary} border-t my-6`,
  }
}

// =============================================================================
// CONTEXT
// =============================================================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// =============================================================================
// PROVIDER
// =============================================================================

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(defaultTheme)
  const [mounted, setMounted] = useState(false)
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
    if (savedTheme && themes[savedTheme]) {
      setThemeId(savedTheme)
    }
    setMounted(true)
  }, [])
  
  // Save theme to localStorage when it changes
  const setTheme = useCallback((newThemeId: ThemeId) => {
    if (themes[newThemeId]) {
      setThemeId(newThemeId)
      localStorage.setItem(THEME_STORAGE_KEY, newThemeId)
    }
  }, [])
  
  const theme = themes[themeId]
  const colors = theme.colors
  const styles = generateStyles(colors, theme.isDark)
  
  // Utility function to get a color class by key
  const t = useCallback((key: keyof ThemeColors): string => {
    return colors[key]
  }, [colors])
  
  const value: ThemeContextType = {
    theme,
    themeId,
    colors,
    setTheme,
    isDark: theme.isDark,
    t,
    styles,
  }
  
  // Don't block rendering - show children immediately with default theme
  // Theme will update after mount from localStorage
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// =============================================================================
// HOOK
// =============================================================================

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// =============================================================================
// EXPORTS
// =============================================================================

export { themes, themeList, defaultTheme } from "./themes"
export type { ThemeId, Theme, ThemeColors } from "./themes"
