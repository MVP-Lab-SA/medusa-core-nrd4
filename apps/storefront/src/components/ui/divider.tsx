import { clsx } from "clsx"

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  label?: string;
}

const Divider = ({
  orientation = "horizontal",
  className,
  label,
}: DividerProps) => {
  if (orientation === "vertical") {
    return (
      <div
        className={clsx(
          "w-px bg-city-steel self-stretch",
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    )
  }

  if (label) {
    return (
      <div className={clsx("flex items-center gap-4", className)} role="separator">
        <div className="flex-1 h-px bg-city-steel" />
        <span className="text-city-muted text-sm font-medium">{label}</span>
        <div className="flex-1 h-px bg-city-steel" />
      </div>
    )
  }

  return (
    <hr
      className={clsx("border-0 h-px bg-city-steel", className)}
      role="separator"
      aria-orientation="horizontal"
    />
  )
}

export { Divider }
export default Divider
