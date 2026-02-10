import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert } from "@/components/ui/alert"
import { useCustomer } from "@/lib/context/customer-context"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { useState, useEffect } from "react"

interface LoginPageProps {
  countryCode: string;
}

const LoginPage = ({ countryCode }: LoginPageProps) => {
  const { login, isLoading, isAuthenticated } = useCustomer()
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as { redirect?: string }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/$countryCode/account", params: { countryCode } })
    }
  }, [isAuthenticated, navigate, countryCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
      const redirectTo = search.redirect
      if (redirectTo) {
        navigate({ to: redirectTo as "/" })
      } else {
        navigate({ to: "/$countryCode/account", params: { countryCode } })
      }
    } catch {
      setError("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="bg-city-dark min-h-[70vh] py-20">
      <div className="content-container">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-city-white mb-2">Welcome Back</h1>
            <p className="text-city-gray">Sign in to your account</p>
          </div>

          <div className="bg-city-navy border border-city-steel p-8">
            {error && (
              <Alert variant="error" className="mb-6">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-city-gray text-sm">
                Don't have an account?{" "}
                <Link
                  to="/$countryCode/account/register"
                  params={{ countryCode }}
                  className="text-city-cyan hover:text-city-cyan-light"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
