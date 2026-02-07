import { useState, useRef, useEffect } from "react"
import { clx } from "@medusajs/ui"
import { ChevronDown } from "@medusajs/icons"

interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
}

const COUNTRIES: Country[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "AE", name: "UAE", dialCode: "+971", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
]

interface PhoneInputProps {
  value?: string
  onChange?: (value: string, country: Country) => void
  defaultCountry?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  label?: string
  error?: string
}

export function PhoneInput({
  value = "",
  onChange,
  defaultCountry = "US",
  placeholder = "Phone number",
  disabled = false,
  className,
  label,
  error,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.code === defaultCountry) || COUNTRIES[0]
  )
  const [phoneNumber, setPhoneNumber] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    onChange?.(`${country.dialCode}${phoneNumber}`, country)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d\s\-()]/g, "")
    setPhoneNumber(newValue)
    onChange?.(`${selectedCountry.dialCode}${newValue}`, selectedCountry)
  }

  return (
    <div ref={containerRef} className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          {label}
        </label>
      )}
      
      <div className="relative flex">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={clx(
            "flex items-center gap-2 px-3 py-3",
            "bg-neutral-900 border border-neutral-700 border-r-0 rounded-l-lg",
            "text-white hover:bg-neutral-800 transition-colors",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm text-neutral-400">{selectedCountry.dialCode}</span>
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </button>

        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clx(
            "flex-1 px-4 py-3",
            "bg-neutral-900 border border-neutral-700 rounded-r-lg",
            "text-white placeholder-neutral-500",
            "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            "transition-all duration-200",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500"
          )}
        />

        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-2 py-2 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto min-w-[250px]">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className={clx(
                  "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                  selectedCountry.code === country.code
                    ? "bg-cyan-500/20"
                    : "hover:bg-neutral-800"
                )}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="text-white text-sm flex-1">{country.name}</span>
                <span className="text-neutral-500 text-sm">{country.dialCode}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}
