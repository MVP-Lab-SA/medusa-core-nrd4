import { useTheme, themeList, ThemeId } from "@/lib/theme"
import { Check } from "@medusajs/icons"

interface ThemeSwitcherProps {
  variant?: "grid" | "list" | "compact"
}

export function ThemeSwitcher({ variant = "grid" }: ThemeSwitcherProps) {
  const { themeId, setTheme, colors } = useTheme()
  
  if (variant === "compact") {
    return (
      <div className="flex gap-2">
        {themeList.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              themeId === theme.id
                ? "border-cyan-500 scale-110"
                : "border-transparent hover:scale-105"
            }`}
            style={{
              background: theme.isDark
                ? `linear-gradient(135deg, ${theme.id === "cityos-dark" ? "#0a0f1a" : theme.id === "minimal-dark" ? "#000" : theme.id === "ocean-breeze" ? "#0c1929" : "#1a0f0f"} 50%, ${theme.id === "cityos-dark" ? "#06b6d4" : theme.id === "minimal-dark" ? "#fafafa" : theme.id === "ocean-breeze" ? "#0ea5e9" : "#f97316"} 50%)`
                : `linear-gradient(135deg, #f8fafc 50%, #0891b2 50%)`,
            }}
            title={theme.name}
          />
        ))}
      </div>
    )
  }
  
  if (variant === "list") {
    return (
      <div className="space-y-2">
        {themeList.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
              themeId === theme.id
                ? `${colors.bgTertiary} ${colors.borderAccent}`
                : `${colors.bgSecondary} ${colors.borderPrimary} hover:${colors.bgTertiary.replace('bg-', 'bg-')}`
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  background: theme.isDark
                    ? `linear-gradient(135deg, ${theme.id === "cityos-dark" ? "#0a0f1a" : theme.id === "minimal-dark" ? "#000" : theme.id === "ocean-breeze" ? "#0c1929" : "#1a0f0f"} 50%, ${theme.id === "cityos-dark" ? "#06b6d4" : theme.id === "minimal-dark" ? "#fafafa" : theme.id === "ocean-breeze" ? "#0ea5e9" : "#f97316"} 50%)`
                    : `linear-gradient(135deg, #f8fafc 50%, #0891b2 50%)`,
                }}
              />
              <span className={colors.textPrimary}>{theme.name}</span>
            </div>
            {themeId === theme.id && (
              <Check className={`w-5 h-5 ${colors.textAccent}`} />
            )}
          </button>
        ))}
      </div>
    )
  }
  
  // Grid variant (default)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {themeList.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          className={`relative p-4 rounded-xl border transition-all ${
            themeId === theme.id
              ? `${colors.borderAccent} ring-2 ring-cyan-500/20`
              : `${colors.borderPrimary} hover:${colors.borderAccent.replace('border-', 'border-')}/50`
          }`}
          style={{
            background: theme.isDark
              ? theme.id === "cityos-dark"
                ? "#0a0f1a"
                : theme.id === "minimal-dark"
                ? "#000000"
                : theme.id === "ocean-breeze"
                ? "#0c1929"
                : "#1a0f0f"
              : "#f8fafc",
          }}
        >
          {/* Theme Preview */}
          <div className="space-y-2 mb-3">
            {/* Mini card preview */}
            <div
              className="h-8 rounded"
              style={{
                background: theme.isDark
                  ? theme.id === "cityos-dark"
                    ? "#111827"
                    : theme.id === "minimal-dark"
                    ? "#0a0a0a"
                    : theme.id === "ocean-breeze"
                    ? "#0f2942"
                    : "#2d1810"
                  : "#ffffff",
              }}
            />
            {/* Mini button preview */}
            <div
              className="h-4 w-16 rounded"
              style={{
                background:
                  theme.id === "cityos-dark" || theme.id === "cityos-light"
                    ? "#06b6d4"
                    : theme.id === "minimal-dark"
                    ? "#fafafa"
                    : theme.id === "ocean-breeze"
                    ? "#0ea5e9"
                    : "#f97316",
              }}
            />
          </div>
          
          {/* Theme Info */}
          <div className="text-left">
            <p
              className="font-medium text-sm"
              style={{
                color: theme.isDark ? "#f8fafc" : "#0f172a",
              }}
            >
              {theme.name}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{
                color: theme.isDark ? "#94a3b8" : "#64748b",
              }}
            >
              {theme.isDark ? "Dark" : "Light"}
            </p>
          </div>
          
          {/* Selected indicator */}
          {themeId === theme.id && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-black" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher
