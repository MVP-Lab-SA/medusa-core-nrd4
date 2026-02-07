import { useEffect, useRef, useState } from "react"

interface MasonryGridProps {
  columns?: number
  gap?: number
  children: React.ReactNode[]
  className?: string
}

export function MasonryGrid({
  columns = 3,
  gap = 16,
  children,
  className = ""
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnCount, setColumnCount] = useState(columns)

  useEffect(() => {
    const updateColumns = () => {
      const width = containerRef.current?.offsetWidth || 0
      if (width < 640) setColumnCount(1)
      else if (width < 1024) setColumnCount(Math.min(2, columns))
      else setColumnCount(columns)
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [columns])

  // Distribute items across columns
  const columnArrays: React.ReactNode[][] = Array.from({ length: columnCount }, () => [])
  children.forEach((child, i) => {
    columnArrays[i % columnCount].push(child)
  })

  return (
    <div
      ref={containerRef}
      className={`flex ${className}`}
      style={{ gap }}
    >
      {columnArrays.map((column, colIndex) => (
        <div
          key={colIndex}
          className="flex-1 flex flex-col"
          style={{ gap }}
        >
          {column.map((item, itemIndex) => (
            <div key={itemIndex}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
