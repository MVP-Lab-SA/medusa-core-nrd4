import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { sdk } from "@/lib/utils/sdk"
import type { StoreCustomer } from "@medusajs/types"

interface CustomerContextType {
  customer: StoreCustomer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; first_name?: string; last_name?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomer = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error("useCustomer must be used within CustomerProvider")
  }
  return context
}

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<StoreCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCustomer = useCallback(async () => {
    try {
      const { customer } = await sdk.store.customer.retrieve()
      setCustomer(customer)
    } catch {
      setCustomer(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCustomer()
  }, [fetchCustomer])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await sdk.auth.login("customer", "emailpass", { email, password })
      await fetchCustomer()
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const register = async (data: { email: string; password: string; first_name?: string; last_name?: string }) => {
    setIsLoading(true)
    try {
      // First create auth identity
      await sdk.auth.register("customer", "emailpass", {
        email: data.email,
        password: data.password,
      })
      
      // Then create customer
      await sdk.store.customer.create({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      })
      
      // Login to get the token
      await sdk.auth.login("customer", "emailpass", {
        email: data.email,
        password: data.password,
      })
      
      await fetchCustomer()
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await sdk.auth.logout()
      setCustomer(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isLoading,
        isAuthenticated: !!customer,
        login,
        register,
        logout,
        refetch: fetchCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}
