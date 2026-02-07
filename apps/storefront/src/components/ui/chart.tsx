import { clx } from "@medusajs/ui"

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: DataPoint[]
  height?: number
  showValues?: boolean
  showLabels?: boolean
  horizontal?: boolean
  className?: string
}

export function BarChart({
  data,
  height = 200,
  showValues = true,
  showLabels = true,
  horizontal = false,
  className,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  if (horizontal) {
    return (
      <div className={clx("space-y-3", className)}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100

          return (
            <div key={index} className="space-y-1">
              {showLabels && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">{item.label}</span>
                  {showValues && (
                    <span className="text-white font-medium">{item.value}</span>
                  )}
                </div>
              )}
              <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color || "#06b6d4",
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              {showValues && (
                <span className="text-xs text-neutral-400">{item.value}</span>
              )}
              <div
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${percentage}%`,
                  backgroundColor: item.color || "#06b6d4",
                  minHeight: 4,
                }}
              />
            </div>
          )
        })}
      </div>
      {showLabels && (
        <div className="flex items-center justify-between mt-3">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-neutral-500 text-center flex-1">
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

interface DonutChartProps {
  data: DataPoint[]
  size?: number
  strokeWidth?: number
  showLegend?: boolean
  showTotal?: boolean
  totalLabel?: string
  className?: string
}

export function DonutChart({
  data,
  size = 200,
  strokeWidth = 30,
  showLegend = true,
  showTotal = true,
  totalLabel = "Total",
  className,
}: DonutChartProps) {
  const total = data.reduce((acc, d) => acc + d.value, 0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const defaultColors = ["#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

  let currentOffset = 0

  return (
    <div className={clx("flex items-center gap-8", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#262626"
            strokeWidth={strokeWidth}
          />
          {/* Data segments */}
          {data.map((item, index) => {
            const percentage = item.value / total
            const strokeDasharray = percentage * circumference
            const strokeDashoffset = -currentOffset * circumference
            currentOffset += percentage

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color || defaultColors[index % defaultColors.length]}
                strokeWidth={strokeWidth}
                strokeDasharray={`${strokeDasharray} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            )
          })}
        </svg>

        {showTotal && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{total}</span>
            <span className="text-sm text-neutral-500">{totalLabel}</span>
          </div>
        )}
      </div>

      {showLegend && (
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color || defaultColors[index % defaultColors.length],
                }}
              />
              <span className="text-sm text-neutral-400">{item.label}</span>
              <span className="text-sm text-white font-medium ml-auto">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface LineChartProps {
  data: { label: string; values: number[] }[]
  labels: string[]
  height?: number
  colors?: string[]
  showDots?: boolean
  showGrid?: boolean
  className?: string
}

export function LineChart({
  data,
  labels,
  height = 200,
  colors = ["#06b6d4", "#10b981", "#f59e0b"],
  showDots = true,
  showGrid = true,
  className,
}: LineChartProps) {
  const allValues = data.flatMap((d) => d.values)
  const maxValue = Math.max(...allValues)
  const minValue = Math.min(...allValues)
  const range = maxValue - minValue || 1

  const width = 100 / (labels.length - 1)

  return (
    <div className={className}>
      <div className="relative" style={{ height }}>
        {/* Grid lines */}
        {showGrid && (
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-neutral-800" />
            ))}
          </div>
        )}

        {/* Lines and dots */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          {data.map((series, seriesIndex) => {
            const points = series.values.map((value, i) => {
              const x = i * width
              const y = 100 - ((value - minValue) / range) * 100
              return { x, y, value }
            })

            const pathD = points
              .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x}% ${p.y}%`)
              .join(" ")

            return (
              <g key={seriesIndex}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={colors[seriesIndex % colors.length]}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-500"
                />
                {showDots &&
                  points.map((p, i) => (
                    <circle
                      key={i}
                      cx={`${p.x}%`}
                      cy={`${p.y}%`}
                      r={4}
                      fill={colors[seriesIndex % colors.length]}
                      className="transition-all duration-500"
                    />
                  ))}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mt-3">
        {labels.map((label, index) => (
          <span key={index} className="text-xs text-neutral-500">
            {label}
          </span>
        ))}
      </div>

      {/* Legend */}
      {data.length > 1 && (
        <div className="flex items-center gap-4 mt-4">
          {data.map((series, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-xs text-neutral-400">{series.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
