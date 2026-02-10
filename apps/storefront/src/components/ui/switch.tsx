import { clsx } from "clsx"

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  className?: string
}

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  label,
  className,
}: SwitchProps) => {
  return (
    <label
      className={clsx(
        "inline-flex items-center gap-3 cursor-pointer",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-city-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-city-dark",
          checked ? "bg-city-cyan" : "bg-city-steel"
        )}
      >
        <span
          className={clsx(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
      {label && (
        <span className="text-sm text-city-gray">{label}</span>
      )}
    </label>
  )
}

export default Switch
