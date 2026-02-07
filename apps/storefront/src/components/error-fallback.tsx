import { Button } from "@/components/ui/button"
import { ExclamationCircleSolid } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

interface ErrorFallbackProps {
  error: Error;
  reset?: () => void;
}

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  const isDev = import.meta.env.DEV
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="content-container py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-city-navy border border-city-steel p-8">
          {/* Error icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <ExclamationCircleSolid className="w-8 h-8 text-red-400" />
          </div>

          {/* Error message */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-city-white mb-3">
              Oops! Something went wrong
            </h2>
            <p className="text-city-gray text-lg">
              We encountered an unexpected error.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            {reset && (
              <Button variant="secondary" onClick={reset}>
                Try again
              </Button>
            )}
            <Link to="/">
              <Button variant="primary">
                Go home
              </Button>
            </Link>
          </div>

          {/* Dev error details */}
          {isDev && (
            <div className="border-t border-city-steel pt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-city-muted hover:text-city-cyan text-sm flex items-center gap-2 transition-colors"
              >
                <span className={`transition-transform ${showDetails ? "rotate-90" : ""}`}>
                  &#9654;
                </span>
                {showDetails ? "Hide" : "Show"} error details
              </button>

              {showDetails && (
                <div className="mt-4 p-4 bg-city-slate border border-city-steel">
                  <div className="text-left space-y-3">
                    <div>
                      <p className="text-xs font-medium text-city-cyan uppercase tracking-wide mb-1">
                        Error Message
                      </p>
                      <code className="text-sm text-red-400 break-all">
                        {error.message}
                      </code>
                    </div>

                    {error.stack && (
                      <div>
                        <p className="text-xs font-medium text-city-cyan uppercase tracking-wide mb-1">
                          Stack Trace
                        </p>
                        <pre className="text-xs text-city-gray bg-city-dark border border-city-steel p-3 overflow-auto max-h-40">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
