import { Check } from "@medusajs/icons"
import { clsx } from "clsx"
import { forwardRef } from "react"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onChange, checked, label, id, ...props }, ref) => {
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    return (
      <div className="flex items-center gap-3">
        <div className="relative inline-block w-5 h-5">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={clsx(
              "appearance-none shadow-none outline-none focus:outline-none cursor-pointer",
              "border border-city-steel",
              "rounded-none",
              "w-full h-full",
              "bg-city-navy",
              "checked:bg-city-cyan checked:border-city-cyan",
              "focus:ring-2 focus:ring-city-cyan/30",
              "transition-colors duration-200",
              "absolute top-0 left-0 z-10",
              className
            )}
            checked={checked}
            onChange={handleCheck}
            {...props}
          />
          <span
            className={clsx(
              "absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none",
              "z-20",
              {
                "opacity-0": !checked,
                "opacity-100": checked,
              }
            )}
          >
            <Check className="text-city-dark w-3 h-3" />
          </span>
        </div>
        {label && (
          <label
            htmlFor={id}
            className="text-city-gray text-base cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"
