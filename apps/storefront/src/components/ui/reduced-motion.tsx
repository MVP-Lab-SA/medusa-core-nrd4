import { useState, useEffect, createContext, useContext } from "react"

interface ReducedMotionContextType {
  prefersReducedMotion: boolean
  setManualPreference: (reduced: boolean | null) => void
}

const ReducedMotionContext = createContext<ReducedMotionContextType>({
  prefersReducedMotion: false,
  setManualPreference: () => {}
})

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const [systemPreference, setSystemPreference] = useState(false)
  const [manualPreference, setManualPreference] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setSystemPreference(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setSystemPreference(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const prefersReducedMotion = manualPreference ?? systemPreference

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion, setManualPreference }}>
      {children}
    </ReducedMotionContext.Provider>
  )
}

export function useReducedMotion() {
  return useContext(ReducedMotionContext)
}

interface ReducedMotionToggleProps {
  className?: string
}

export function ReducedMotionToggle({ className = "" }: ReducedMotionToggleProps) {
  const { prefersReducedMotion, setManualPreference } = useReducedMotion()

  return (
    <label className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm text-gray-700">Reduce animations</span>
      <button
        role="switch"
        aria-checked={prefersReducedMotion}
        onClick={() => setManualPreference(!prefersReducedMotion)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          prefersReducedMotion ? "bg-cyan-500" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            prefersReducedMotion ? "left-5.5 translate-x-0" : "left-0.5"
          }`}
          style={{ left: prefersReducedMotion ? "22px" : "2px" }}
        />
      </button>
    </label>
  )
}
