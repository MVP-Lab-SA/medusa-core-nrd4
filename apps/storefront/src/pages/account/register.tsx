import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useCustomer } from "@/lib/context/customer-context"
import { Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"

interface RegisterPageProps {
  countryCode: string;
}

const RegisterPage = ({ countryCode }: RegisterPageProps) => {
  const { register, isLoading, isAuthenticated } = useCustomer()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [error, setError] = useState("")

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate({ to: "/$countryCode/account", params: { countryCode } })
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions.")
      return
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      })
      navigate({ to: "/$countryCode/account", params: { countryCode } })
    } catch {
      setError("An error occurred during registration. Please try again.")
    }
  }

  return (
    <div className="bg-city-dark min-h-[70vh] py-20">
      <div className="content-container">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-city-white mb-2">Create Account</h1>
            <p className="text-city-gray">Join the CityOS network</p>
          </div>

          <div className="bg-city-navy border border-city-steel p-8">
            {error && (
              <Alert variant="error" className="mb-6">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />

              <div className="flex items-start gap-3">
                <Checkbox
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <label htmlFor="acceptTerms" className="text-city-gray text-sm">
                  I agree to the{" "}
                  <Link 
                    to="/$countryCode/terms" 
                    params={{ countryCode }}
                    className="text-city-cyan hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link 
                    to="/$countryCode/privacy" 
                    params={{ countryCode }}
                    className="text-city-cyan hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-city-gray text-sm">
                Already have an account?{" "}
                <Link
                  to="/$countryCode/account/login"
                  params={{ countryCode }}
                  className="text-city-cyan hover:text-city-cyan-light"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
