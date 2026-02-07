import { clsx } from "clsx"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-city-navy border border-city-steel",
      elevated: "bg-city-slate border border-city-steel shadow-lg shadow-city-dark/50",
      bordered: "bg-transparent border-2 border-city-steel",
      ghost: "bg-city-slate/50",
    }

    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    }

    return (
      <div
        ref={ref}
        className={clsx(
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={clsx("mb-4", className)}>{children}</div>
)

const CardTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h3 className={clsx("text-lg font-bold text-city-white", className)}>
    {children}
  </h3>
)

const CardDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <p className={clsx("text-city-gray text-sm mt-1", className)}>{children}</p>
)

const CardContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={clsx("", className)}>{children}</div>

const CardFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={clsx("mt-4 pt-4 border-t border-city-steel", className)}>
    {children}
  </div>
)

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
