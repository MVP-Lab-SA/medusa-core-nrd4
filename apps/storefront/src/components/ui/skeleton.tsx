import { clsx } from "clsx"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
  animate?: boolean
}

export const Skeleton = ({
  className,
  variant = "text",
  width,
  height,
  animate = true,
}: SkeletonProps) => {
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  }

  return (
    <div
      className={clsx(
        "bg-city-steel/30",
        animate && "animate-pulse",
        variantClasses[variant],
        className
      )}
      style={{
        width: width || (variant === "text" ? "100%" : undefined),
        height: height || (variant === "text" ? "1em" : undefined),
      }}
    />
  )
}

// Pre-built skeleton compositions
export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton variant="rectangular" className="aspect-square w-full" />
    <Skeleton variant="text" className="h-4 w-3/4" />
    <Skeleton variant="text" className="h-4 w-1/2" />
  </div>
)

export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <Skeleton variant="rectangular" className="aspect-square w-full" />
    <div className="flex flex-col gap-4">
      <Skeleton variant="text" className="h-8 w-3/4" />
      <Skeleton variant="text" className="h-6 w-1/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-2/3" />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rectangular" className="h-12 w-32" />
        <Skeleton variant="rectangular" className="h-12 w-32" />
      </div>
    </div>
  </div>
)

export const CartItemSkeleton = () => (
  <div className="flex gap-4 py-4">
    <Skeleton variant="rectangular" className="w-20 h-20" />
    <div className="flex-1 flex flex-col gap-2">
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-3 w-1/2" />
      <div className="flex justify-between mt-auto">
        <Skeleton variant="rectangular" className="h-8 w-24" />
        <Skeleton variant="text" className="h-4 w-16" />
      </div>
    </div>
  </div>
)

export const OrderSkeleton = () => (
  <div className="flex flex-col gap-4 p-4 border border-city-steel/30 rounded-lg">
    <div className="flex justify-between">
      <Skeleton variant="text" className="h-5 w-32" />
      <Skeleton variant="text" className="h-5 w-24" />
    </div>
    <Skeleton variant="text" className="h-4 w-1/2" />
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} variant="rectangular" className="w-16 h-16" />
      ))}
    </div>
  </div>
)

export const TableRowSkeleton = ({ columns = 4 }: { columns?: number }) => (
  <tr>
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-4 py-4">
        <Skeleton variant="text" className="h-4" />
      </td>
    ))}
  </tr>
)

export const FormFieldSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton variant="text" className="h-4 w-24" />
    <Skeleton variant="rectangular" className="h-10 w-full" />
  </div>
)

export const NavbarSkeleton = () => (
  <div className="flex items-center justify-between h-16 px-4">
    <Skeleton variant="rectangular" className="h-8 w-32" />
    <div className="flex gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant="text" className="h-4 w-16" />
      ))}
    </div>
    <div className="flex gap-4">
      <Skeleton variant="circular" className="w-8 h-8" />
      <Skeleton variant="circular" className="w-8 h-8" />
    </div>
  </div>
)

export default Skeleton
