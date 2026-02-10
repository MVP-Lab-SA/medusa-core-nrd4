import { forwardRef } from "react"
import { clsx } from "clsx"

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, checked, ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative mt-0.5">
          <input
            type="radio"
            ref={ref}
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div
            className={clsx(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              checked
                ? "bg-city-cyan border-city-cyan"
                : "bg-city-navy border-city-steel group-hover:border-city-gray",
              className
            )}
          >
            {checked && (
              <div className="w-2 h-2 bg-city-dark rounded-full" />
            )}
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-city-white text-base font-medium">
                {label}
              </span>
            )}
            {description && (
              <span className="text-city-muted text-sm">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    )
  }
)

Radio.displayName = "Radio"

export default Radio
