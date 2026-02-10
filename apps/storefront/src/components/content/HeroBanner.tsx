import { ArrowRight } from "@medusajs/icons"

interface HeroBannerProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundColor?: string
  textColor?: 'light' | 'dark'
  alignment?: 'left' | 'center' | 'right'
  primaryButton?: {
    text: string
    link: string
  }
  secondaryButton?: {
    text: string
    link: string
  }
  height?: 'sm' | 'md' | 'lg' | 'full'
  overlay?: boolean
}

export function HeroBanner({ 
  title, 
  subtitle, 
  backgroundImage, 
  backgroundColor = '#1f2937',
  textColor = 'light',
  alignment = 'center',
  primaryButton,
  secondaryButton,
  height = 'lg',
  overlay = true
}: HeroBannerProps) {
  const heights = {
    sm: 'h-64',
    md: 'h-96',
    lg: 'h-[500px]',
    full: 'h-screen'
  }

  const alignments = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  }

  const textColors = {
    light: 'text-white',
    dark: 'text-gray-900'
  }

  return (
    <div 
      className={`relative ${heights[height]} flex flex-col justify-center px-8 md:px-16 ${alignments[alignment]}`}
      style={{
        backgroundColor: backgroundImage ? undefined : backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      <div className={`relative z-10 max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${textColors[textColor]}`}>
          {title}
        </h1>
        
        {subtitle && (
          <p className={`mt-4 text-lg md:text-xl ${textColor === 'light' ? 'text-gray-200' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        )}

        {(primaryButton || secondaryButton) && (
          <div className={`mt-8 flex gap-4 ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : ''}`}>
            {primaryButton && (
              <a 
                href={primaryButton.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100"
              >
                {primaryButton.text}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {secondaryButton && (
              <a 
                href={secondaryButton.link}
                className={`inline-flex items-center gap-2 px-6 py-3 border-2 font-medium rounded-lg ${
                  textColor === 'light' 
                    ? 'border-white text-white hover:bg-white/10' 
                    : 'border-gray-900 text-gray-900 hover:bg-gray-100'
                }`}
              >
                {secondaryButton.text}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
