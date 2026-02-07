import { clsx } from "clsx"
import { ReactNode } from "react"

interface TableProps {
  children: ReactNode
  className?: string
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className={clsx("w-full border-collapse", className)}>
        {children}
      </table>
    </div>
  )
}

interface TableHeadProps {
  children: ReactNode
  className?: string
}

export const TableHead = ({ children, className }: TableHeadProps) => {
  return (
    <thead
      className={clsx(
        "bg-city-navy border-b border-city-steel/30",
        className
      )}
    >
      {children}
    </thead>
  )
}

interface TableBodyProps {
  children: ReactNode
  className?: string
}

export const TableBody = ({ children, className }: TableBodyProps) => {
  return <tbody className={className}>{children}</tbody>
}

interface TableRowProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const TableRow = ({ children, className, onClick }: TableRowProps) => {
  return (
    <tr
      onClick={onClick}
      className={clsx(
        "border-b border-city-steel/20 last:border-b-0 transition-colors",
        onClick && "cursor-pointer hover:bg-city-steel/10",
        className
      )}
    >
      {children}
    </tr>
  )
}

interface TableHeaderCellProps {
  children: ReactNode
  className?: string
  align?: "left" | "center" | "right"
}

export const TableHeaderCell = ({
  children,
  className,
  align = "left",
}: TableHeaderCellProps) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <th
      className={clsx(
        "px-4 py-3 text-sm font-semibold text-city-gray uppercase tracking-wider",
        alignClasses[align],
        className
      )}
    >
      {children}
    </th>
  )
}

interface TableCellProps {
  children: ReactNode
  className?: string
  align?: "left" | "center" | "right"
}

export const TableCell = ({
  children,
  className,
  align = "left",
}: TableCellProps) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <td
      className={clsx(
        "px-4 py-4 text-sm text-city-gray",
        alignClasses[align],
        className
      )}
    >
      {children}
    </td>
  )
}

export default Table
