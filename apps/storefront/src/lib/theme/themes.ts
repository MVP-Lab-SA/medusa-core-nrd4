/**
 * Theme Definitions - Multiple design systems for the storefront
 * 
 * Each theme defines color tokens and component styles that can be
 * dynamically switched at runtime.
 */

export type ThemeId = "cityos-dark" | "cityos-light" | "minimal-dark" | "ocean-breeze" | "sunset-warm"

export interface ThemeColors {
  // Backgrounds
  bgPrimary: string
  bgSecondary: string
  bgTertiary: string
  bgHover: string
  
  // Text
  textPrimary: string
  textSecondary: string
  textMuted: string
  textAccent: string
  
  // Borders
  borderPrimary: string
  borderSecondary: string
  borderAccent: string
  
  // Status
  success: string
  successBg: string
  warning: string
  warningBg: string
  error: string
  errorBg: string
  info: string
  infoBg: string
  
  // Brand
  brandPrimary: string
  brandSecondary: string
  brandAccent: string
}

export interface Theme {
  id: ThemeId
  name: string
  description: string
  colors: ThemeColors
  isDark: boolean
}

// =============================================================================
// THEME DEFINITIONS
// =============================================================================

export const themes: Record<ThemeId, Theme> = {
  "cityos-dark": {
    id: "cityos-dark",
    name: "CityOS Dark",
    description: "Modern dark theme with cyan accents",
    isDark: true,
    colors: {
      bgPrimary: "bg-[#0a0f1a]",
      bgSecondary: "bg-[#111827]",
      bgTertiary: "bg-[#1e293b]",
      bgHover: "bg-[#334155]",
      textPrimary: "text-[#f8fafc]",
      textSecondary: "text-[#94a3b8]",
      textMuted: "text-[#64748b]",
      textAccent: "text-[#06b6d4]",
      borderPrimary: "border-[#334155]",
      borderSecondary: "border-[#1e293b]",
      borderAccent: "border-[#06b6d4]",
      success: "text-emerald-400",
      successBg: "bg-emerald-500/10",
      warning: "text-amber-400",
      warningBg: "bg-amber-500/10",
      error: "text-red-400",
      errorBg: "bg-red-500/10",
      info: "text-[#06b6d4]",
      infoBg: "bg-[#06b6d4]/10",
      brandPrimary: "bg-[#06b6d4]",
      brandSecondary: "bg-[#0891b2]",
      brandAccent: "bg-[#22d3ee]",
    },
  },
  
  "cityos-light": {
    id: "cityos-light",
    name: "CityOS Light",
    description: "Clean light theme with cyan accents",
    isDark: false,
    colors: {
      bgPrimary: "bg-[#f8fafc]",
      bgSecondary: "bg-white",
      bgTertiary: "bg-[#f1f5f9]",
      bgHover: "bg-[#e2e8f0]",
      textPrimary: "text-[#0f172a]",
      textSecondary: "text-[#475569]",
      textMuted: "text-[#94a3b8]",
      textAccent: "text-[#0891b2]",
      borderPrimary: "border-[#e2e8f0]",
      borderSecondary: "border-[#f1f5f9]",
      borderAccent: "border-[#0891b2]",
      success: "text-emerald-600",
      successBg: "bg-emerald-50",
      warning: "text-amber-600",
      warningBg: "bg-amber-50",
      error: "text-red-600",
      errorBg: "bg-red-50",
      info: "text-[#0891b2]",
      infoBg: "bg-cyan-50",
      brandPrimary: "bg-[#0891b2]",
      brandSecondary: "bg-[#06b6d4]",
      brandAccent: "bg-[#22d3ee]",
    },
  },
  
  "minimal-dark": {
    id: "minimal-dark",
    name: "Minimal Dark",
    description: "Ultra-minimal dark theme with subtle grays",
    isDark: true,
    colors: {
      bgPrimary: "bg-[#000000]",
      bgSecondary: "bg-[#0a0a0a]",
      bgTertiary: "bg-[#171717]",
      bgHover: "bg-[#262626]",
      textPrimary: "text-[#fafafa]",
      textSecondary: "text-[#a3a3a3]",
      textMuted: "text-[#737373]",
      textAccent: "text-[#fafafa]",
      borderPrimary: "border-[#262626]",
      borderSecondary: "border-[#171717]",
      borderAccent: "border-[#fafafa]",
      success: "text-green-400",
      successBg: "bg-green-500/10",
      warning: "text-yellow-400",
      warningBg: "bg-yellow-500/10",
      error: "text-red-400",
      errorBg: "bg-red-500/10",
      info: "text-blue-400",
      infoBg: "bg-blue-500/10",
      brandPrimary: "bg-[#fafafa]",
      brandSecondary: "bg-[#d4d4d4]",
      brandAccent: "bg-[#ffffff]",
    },
  },
  
  "ocean-breeze": {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Calming ocean-inspired dark theme",
    isDark: true,
    colors: {
      bgPrimary: "bg-[#0c1929]",
      bgSecondary: "bg-[#0f2942]",
      bgTertiary: "bg-[#143a5c]",
      bgHover: "bg-[#1a4a73]",
      textPrimary: "text-[#e0f2fe]",
      textSecondary: "text-[#7dd3fc]",
      textMuted: "text-[#38bdf8]",
      textAccent: "text-[#0ea5e9]",
      borderPrimary: "border-[#1e5a8a]",
      borderSecondary: "border-[#143a5c]",
      borderAccent: "border-[#0ea5e9]",
      success: "text-teal-400",
      successBg: "bg-teal-500/10",
      warning: "text-orange-400",
      warningBg: "bg-orange-500/10",
      error: "text-rose-400",
      errorBg: "bg-rose-500/10",
      info: "text-sky-400",
      infoBg: "bg-sky-500/10",
      brandPrimary: "bg-[#0ea5e9]",
      brandSecondary: "bg-[#0284c7]",
      brandAccent: "bg-[#38bdf8]",
    },
  },
  
  "sunset-warm": {
    id: "sunset-warm",
    name: "Sunset Warm",
    description: "Warm sunset-inspired dark theme",
    isDark: true,
    colors: {
      bgPrimary: "bg-[#1a0f0f]",
      bgSecondary: "bg-[#2d1810]",
      bgTertiary: "bg-[#3d2218]",
      bgHover: "bg-[#4d2c20]",
      textPrimary: "text-[#fef3c7]",
      textSecondary: "text-[#fcd34d]",
      textMuted: "text-[#f59e0b]",
      textAccent: "text-[#f97316]",
      borderPrimary: "border-[#5c3520]",
      borderSecondary: "border-[#3d2218]",
      borderAccent: "border-[#f97316]",
      success: "text-lime-400",
      successBg: "bg-lime-500/10",
      warning: "text-amber-400",
      warningBg: "bg-amber-500/10",
      error: "text-red-400",
      errorBg: "bg-red-500/10",
      info: "text-orange-400",
      infoBg: "bg-orange-500/10",
      brandPrimary: "bg-[#f97316]",
      brandSecondary: "bg-[#ea580c]",
      brandAccent: "bg-[#fb923c]",
    },
  },
}

export const defaultTheme: ThemeId = "cityos-dark"

export const themeList = Object.values(themes)
