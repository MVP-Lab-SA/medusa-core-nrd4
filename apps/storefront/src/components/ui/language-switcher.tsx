import { useState } from "react"
import { ChevronDownMini, GlobeEurope } from "@medusajs/icons"

interface Language {
  code: string
  name: string
  flag?: string
}

interface LanguageSwitcherProps {
  languages: Language[]
  currentLanguage: string
  onChange: (code: string) => void
  showFlags?: boolean
  className?: string
}

export function LanguageSwitcher({
  languages,
  currentLanguage,
  onChange,
  showFlags = true,
  className = ""
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const current = languages.find(l => l.code === currentLanguage) || languages[0]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
      >
        {showFlags && current.flag ? (
          <span className="text-lg">{current.flag}</span>
        ) : (
          <GlobeEurope className="w-5 h-5 text-gray-500" />
        )}
        <span className="text-sm text-gray-700">{current.name}</span>
        <ChevronDownMini className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              {languages.map(language => (
                <button
                  key={language.code}
                  onClick={() => {
                    onChange(language.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 ${
                    language.code === currentLanguage ? "bg-cyan-50 text-cyan-700" : "text-gray-700"
                  }`}
                >
                  {showFlags && language.flag && (
                    <span className="text-lg">{language.flag}</span>
                  )}
                  <span className="text-sm">{language.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
