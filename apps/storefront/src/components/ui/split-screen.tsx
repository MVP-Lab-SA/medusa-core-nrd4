interface SplitScreenProps {
  left: React.ReactNode
  right: React.ReactNode
  leftWidth?: string
  reversed?: boolean
  verticalOnMobile?: boolean
  className?: string
}

export function SplitScreen({
  left,
  right,
  leftWidth = "50%",
  reversed = false,
  verticalOnMobile = true,
  className = ""
}: SplitScreenProps) {
  return (
    <div className={`flex ${verticalOnMobile ? "flex-col lg:flex-row" : "flex-row"} ${reversed ? "lg:flex-row-reverse" : ""} ${className}`}>
      <div 
        className={`${verticalOnMobile ? "w-full lg:w-auto" : ""}`}
        style={{ flexBasis: leftWidth }}
      >
        {left}
      </div>
      <div className="flex-1">
        {right}
      </div>
    </div>
  )
}
