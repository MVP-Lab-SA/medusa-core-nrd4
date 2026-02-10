import { Button } from "@/components/ui/button"
import { Link, useLocation } from "@tanstack/react-router"

const NotFound = () => {
  const location = useLocation()

  return (
    <div className="content-container py-12">
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="max-w-md space-y-6">
          {/* Animated 404 with glow effect */}
          <div className="relative">
            <h1 className="text-9xl font-black text-city-cyan/20">404</h1>
            <h1 className="text-9xl font-black text-city-cyan absolute inset-0 animate-pulse">
              404
            </h1>
          </div>

          {/* Main message */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-city-white">
              Page not found
            </h2>

            <p className="text-city-gray">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Current path */}
          <div className="px-4 py-3 bg-city-slate border border-city-steel font-mono text-sm text-city-muted">
            {location.pathname}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button className="px-6 py-3" variant="primary">
                Go home
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              className="px-6 py-3"
              onClick={() => window.history.back()}
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
