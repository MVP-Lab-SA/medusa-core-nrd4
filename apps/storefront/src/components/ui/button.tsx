import { clsx } from "clsx"

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "danger" | "transparent";
  size?: "full" | "fit";
};

export const Button = ({
  variant = "primary",
  className,
  size = "full",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "cursor-pointer disabled:cursor-default",
        "inline-flex items-center justify-center gap-2 px-4 py-2",
        "rounded-none shadow-none appearance-none border",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "text-base font-medium transition-all duration-200",
        size === "full" && "w-full",
        size === "fit" && "w-fit",
        {
          "bg-city-cyan text-city-dark hover:bg-city-cyan-light active:bg-city-cyan-glow border-transparent":
            variant === "primary",
          "bg-transparent text-city-white hover:bg-city-slate active:bg-city-steel border-city-steel":
            variant === "secondary",
          "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-900 border-transparent":
            variant === "danger",
          "bg-transparent text-city-white hover:bg-transparent active:bg-transparent border-transparent":
            variant === "transparent",
        },
        className
      )}
    />
  )
}
