import { CheckCircleSolid, ExclamationCircleSolid, InformationCircleSolid, XCircleSolid, XMark } from "@medusajs/icons"
import { clsx } from "clsx"
import { createContext, ReactNode, useContext, useState, useCallback } from "react"

type ToastType = "info" | "success" | "warning" | "error"

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

type ToastContextType = {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  hideToast: (id: string) => void;
  // Convenience methods
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

const ToastIcon = ({ type }: { type: ToastType }) => {
  const icons = {
    info: <InformationCircleSolid className="w-5 h-5 text-blue-400" />,
    success: <CheckCircleSolid className="w-5 h-5 text-emerald-400" />,
    warning: <ExclamationCircleSolid className="w-5 h-5 text-amber-400" />,
    error: <XCircleSolid className="w-5 h-5 text-red-400" />,
  }
  return icons[type]
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setToasts((prev) => [...prev, { id, message, type }])
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      hideToast(id)
    }, 4000)
  }, [hideToast])

  const success = useCallback((message: string) => showToast(message, "success"), [showToast])
  const error = useCallback((message: string) => showToast(message, "error"), [showToast])
  const warning = useCallback((message: string) => showToast(message, "warning"), [showToast])
  const info = useCallback((message: string) => showToast(message, "info"), [showToast])

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast, success, error, warning, info }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              "bg-city-navy border border-city-steel shadow-lg shadow-city-dark/50",
              "px-4 py-3 flex items-start gap-3",
              "animate-enter"
            )}
          >
            <ToastIcon type={toast.type} />
            <p className="text-city-white text-sm flex-1">{toast.message}</p>
            <button
              onClick={() => hideToast(toast.id)}
              className="text-city-muted hover:text-city-white transition-colors"
            >
              <XMark className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
