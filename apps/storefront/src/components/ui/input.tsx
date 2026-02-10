import { clsx } from "clsx"
import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-city-gray mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            "appearance-none shadow-none outline-none focus:outline-none",
            "border border-city-steel",
            "rounded-none",
            "text-base font-medium text-city-white",
            "px-4 py-3 w-full",
            "bg-city-navy",
            "placeholder:text-city-muted",
            "focus:border-city-cyan focus:ring-1 focus:ring-city-cyan/30",
            "transition-colors duration-200",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-city-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
