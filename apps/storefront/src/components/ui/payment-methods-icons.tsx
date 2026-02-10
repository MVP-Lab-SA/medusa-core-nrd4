interface PaymentMethodsIconsProps {
  methods?: ("visa" | "mastercard" | "amex" | "discover" | "paypal" | "apple" | "google" | "shop")[]
  size?: "sm" | "md" | "lg"
  className?: string
}

export function PaymentMethodsIcons({
  methods = ["visa", "mastercard", "amex", "paypal"],
  size = "md",
  className = ""
}: PaymentMethodsIconsProps) {
  const sizeClasses = {
    sm: "h-5",
    md: "h-6",
    lg: "h-8"
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {methods.map(method => (
        <PaymentIcon key={method} method={method} className={sizeClasses[size]} />
      ))}
    </div>
  )
}

function PaymentIcon({ method, className }: { method: string; className: string }) {
  switch (method) {
    case "visa":
      return (
        <svg className={className} viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#1A1F71"/>
          <path d="M19.5 21H17L18.8 11H21.3L19.5 21ZM15.3 11L12.9 17.8L12.6 16.4L11.7 12C11.7 12 11.6 11 10.3 11H6.1L6 11.2C6 11.2 7.4 11.5 9.1 12.5L11.3 21H14L18 11H15.3ZM35.3 21H37.5L35.6 11H33.5C32.4 11 32.1 11.9 32.1 11.9L28 21H30.7L31.3 19.3H34.5L34.9 21H35.3ZM32.1 17.2L33.5 13.4L34.3 17.2H32.1ZM28 14.3L28.4 12C28.4 12 27.2 11.6 25.9 11.6C24.5 11.6 21.3 12.2 21.3 15C21.3 17.6 25 17.6 25 19C25 20.4 21.7 20.1 20.5 19.2L20 21.6C20 21.6 21.2 22.2 23.1 22.2C25 22.2 28.1 21.2 28.1 18.6C28.1 15.9 24.4 15.7 24.4 14.5C24.4 13.3 27 13.5 28 14.3Z" fill="white"/>
        </svg>
      )
    case "mastercard":
      return (
        <svg className={className} viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
          <circle cx="19" cy="16" r="8" fill="#EB001B"/>
          <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
          <path d="M24 10.3C25.8 11.7 27 13.7 27 16C27 18.3 25.8 20.3 24 21.7C22.2 20.3 21 18.3 21 16C21 13.7 22.2 11.7 24 10.3Z" fill="#FF5F00"/>
        </svg>
      )
    case "amex":
      return (
        <svg className={className} viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#006FCF"/>
          <path d="M9 20L11.5 14H13.5L16 20H14L13.5 19H11.5L11 20H9ZM12 15.5L11.5 17.5H13L12.5 15.5H12ZM17 20V14H19L20.5 17.5L22 14H24V20H22.5V16L21 20H20L18.5 16V20H17ZM25 20V14H30V15.5H27V16.5H29.5V18H27V18.5H30V20H25ZM31 20L33 17L31 14H33L34 15.5L35 14H37L35 17L37 20H35L34 18.5L33 20H31ZM38 20L40.5 14H42.5L45 20H43L42.5 19H40.5L40 20H38ZM41 15.5L40.5 17.5H42L41.5 15.5H41Z" fill="white"/>
        </svg>
      )
    case "discover":
      return (
        <svg className={className} viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#F9F9F9"/>
          <rect x="24" y="12" width="20" height="8" rx="4" fill="#F26E21"/>
          <path d="M6 20V12H8.5C10.5 12 11.5 13 11.5 14.5C11.5 16 10.5 17 8.5 17H7.5V20H6ZM7.5 15.5H8.3C9.1 15.5 9.8 15.2 9.8 14.5C9.8 13.8 9.1 13.5 8.3 13.5H7.5V15.5ZM12 20V12H14V20H12ZM15 18.5C15 19.5 16 20.2 17.5 20.2C19 20.2 20 19.5 20 18.5C20 17.5 19.3 17 18 16.7L17 16.5C16.3 16.3 16 16.1 16 15.7C16 15.3 16.5 15 17 15C17.5 15 18 15.3 18 15.8H19.8C19.8 14.5 18.7 13.8 17 13.8C15.5 13.8 14.3 14.6 14.3 15.8C14.3 16.8 15 17.4 16.2 17.7L17.2 18C17.9 18.2 18.2 18.4 18.2 18.8C18.2 19.2 17.7 19.5 17.2 19.5C16.5 19.5 16 19.1 16 18.5H15Z" fill="#1D1D1D"/>
        </svg>
      )
    case "paypal":
      return (
        <svg className={className} viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
          <path d="M18.5 8H23C25.8 8 27.5 9.5 27 12C26.5 15.5 24.5 17 21.5 17H20L19 22H16L18.5 8Z" fill="#253B80"/>
          <path d="M21.5 10H26C28.8 10 30.5 11.5 30 14C29.5 17.5 27.5 19 24.5 19H23L22 24H19L21.5 10Z" fill="#179BD7"/>
        </svg>
      )
    case "apple":
      return (
        <svg className={className} viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#000"/>
          <path d="M24 10C22.3 10 21.2 11.2 20.5 11.2C19.7 11.2 18.5 10 17 10C14.5 10 12 12.2 12 16C12 18.4 13 21 14.5 22.8C15.6 24.2 16.5 25 17.8 25C19 25 19.6 24.2 21.2 24.2C22.8 24.2 23.3 25 24.7 25C26 25 27 24 28 22.8C29 21.5 29.5 20.3 29.5 20.2C29.5 20.1 27 19.1 27 16.2C27 13.7 29 12.6 29.1 12.5C27.8 10.6 25.8 10 24.8 10H24ZM23.5 7C24.4 6 25 4.7 24.8 3.5C23.7 3.6 22.4 4.3 21.5 5.3C20.7 6.2 20 7.5 20.2 8.7C21.5 8.8 22.6 8 23.5 7Z" fill="white"/>
        </svg>
      )
    case "google":
      return (
        <svg className={className} viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
          <path d="M24 14.4V17.9H29.5C29.3 19.2 28.7 20.3 27.8 21.1L30.5 23.2C32.2 21.6 33.2 19.2 33.2 16.3C33.2 15.5 33.1 14.9 33 14.4H24Z" fill="#4285F4"/>
          <path d="M17.8 18.8L17.1 19.3L14.8 21.1C16.4 24.1 19.9 26 24 26C26.6 26 28.8 25.1 30.5 23.5L27.8 21.4C26.9 22 25.6 22.4 24 22.4C21.5 22.4 19.4 20.7 18.5 18.4L17.8 18.8Z" fill="#34A853"/>
          <path d="M14.8 11C14.3 12.1 14 13.3 14 14.5C14 15.7 14.3 16.9 14.8 18C14.8 18 17.8 15.1 17.8 14.5C17.8 13.9 17.7 13.3 17.5 12.8L14.8 11Z" fill="#FBBC05"/>
          <path d="M24 10.1C25.7 10.1 27.2 10.7 28.4 11.8L30.6 9.6C28.8 7.9 26.6 7 24 7C19.9 7 16.4 8.9 14.8 11.9L17.5 14.1C18.4 11.8 20.5 10.1 24 10.1Z" fill="#EA4335"/>
        </svg>
      )
    case "shop":
      return (
        <svg className={className} viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#5A31F4"/>
          <path d="M14 12.5H15.8L17 17.5L18.5 12.5H20L17.8 20H16.2L14 12.5ZM21 20V12.5H22.5V20H21ZM24 17.5C24 18.9 25 19.7 26.5 19.7C28 19.7 29 18.9 29 17.5V12.5H30.5V17.5C30.5 19.8 28.8 21.2 26.5 21.2C24.2 21.2 22.5 19.8 22.5 17.5V12.5H24V17.5ZM32 20V12.5H36V14H33.5V15.5H35.5V17H33.5V18.5H36V20H32Z" fill="white"/>
        </svg>
      )
    default:
      return null
  }
}

interface SecurePaymentBadgeProps {
  className?: string
}

export function SecurePaymentBadge({ className = "" }: SecurePaymentBadgeProps) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg ${className}`}>
      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <div>
        <p className="text-sm font-medium text-gray-900">Secure Payment</p>
        <p className="text-xs text-gray-500">256-bit SSL encryption</p>
      </div>
    </div>
  )
}
