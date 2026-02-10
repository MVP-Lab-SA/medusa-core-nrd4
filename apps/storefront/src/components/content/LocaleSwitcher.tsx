import { useState } from "react"
import { GlobeEurope, ChevronDown, Check } from "@medusajs/icons"

interface Locale {
  code: string
  name: string
  flag?: string
}

interface LocaleSwitcherProps {
  currentLocale: string
  locales: Locale[]
  onChange: (locale: string) => void
}

export function LocaleSwitcher({ currentLocale, locales, onChange }: LocaleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const current = locales.find(l => l.code === currentLocale) || locales[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        {current.flag ? (
          <span className="text-lg">{current.flag}</span>
        ) : (
          <GlobeEurope className="w-4 h-4 text-gray-500" />
        )}
        <span className="text-sm">{current.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => {
                  onChange(locale.code)
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  {locale.flag ? (
                    <span className="text-lg">{locale.flag}</span>
                  ) : (
                    <GlobeEurope className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-sm">{locale.name}</span>
                </div>
                {locale.code === currentLocale && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
