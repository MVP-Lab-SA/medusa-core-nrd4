import * as React from "react"
import { ChevronDown } from "lucide-react"
import { clx } from "@medusajs/ui"

const COUNTRIES = [
  { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
  { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
  { code: "IT", dialCode: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "ES", dialCode: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳" },
  { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
  { code: "BR", dialCode: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", dialCode: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "AE", dialCode: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "EG", dialCode: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "NG", dialCode: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "ZA", dialCode: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "KR", dialCode: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "SG", dialCode: "+65", name: "Singapore", flag: "🇸🇬" },
]

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  defaultCountry?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function PhoneInput({
  value = "",
  onChange,
  defaultCountry = "US",
  placeholder = "Phone number",
  disabled = false,
  className
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = React.useState(
    COUNTRIES.find((c) => c.code === defaultCountry) || COUNTRIES[0]
  )
  const [isOpen, setIsOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.dialCode.includes(search) ||
      country.code.toLowerCase().includes(search.toLowerCase())
  )

  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    onChange?.(`${selectedCountry.dialCode} ${formatted}`)
  }

  const phoneValue = value.replace(selectedCountry.dialCode, "").trim()

  return (
    <div ref={containerRef} className={clx("relative", className)}>
      <div className="flex">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={clx(
            "flex items-center gap-2 px-3 py-3 rounded-l-lg border-y border-l transition-all",
            "bg-zinc-800 border-zinc-700 text-white",
            "hover:bg-zinc-700",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="text-zinc-400 text-sm">{selectedCountry.dialCode}</span>
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </button>
        <input
          type="tel"
          value={phoneValue}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clx(
            "flex-1 px-4 py-3 rounded-r-lg border-y border-r transition-all",
            "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500",
            "hover:border-cyan-500/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl overflow-hidden">
          <div className="p-2 border-b border-zinc-800">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  setSelectedCountry(country)
                  setIsOpen(false)
                  setSearch("")
                  onChange?.(`${country.dialCode} ${phoneValue}`)
                }}
                className={clx(
                  "w-full px-4 py-3 text-left flex items-center gap-3 transition-colors hover:bg-zinc-800",
                  selectedCountry.code === country.code && "bg-zinc-800"
                )}
              >
                <span className="text-xl">{country.flag}</span>
                <span className="text-white flex-1">{country.name}</span>
                <span className="text-zinc-500 text-sm">{country.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
