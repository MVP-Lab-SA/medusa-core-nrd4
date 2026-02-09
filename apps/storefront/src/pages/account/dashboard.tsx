import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { useCustomer } from "@/lib/context/customer-context"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { sdk } from "@/lib/utils/sdk"
import { formatPrice } from "@/lib/utils/price"
import { ArrowRightMini, CubeSolid, MapPin, User, Heart, ChartBar, CogSixTooth, ShoppingBag, Star, ArrowPath } from "@medusajs/icons"
import type { StoreOrder, StoreCustomerAddress } from "@medusajs/types"
import { AccountLayout } from "@/components/account/AccountSidebar"

interface AccountDashboardProps {
  countryCode: string;
}

// Simple inline chart component
const SpendingChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  
  return (
    <div className="h-32">
      <div className="flex items-end justify-between h-24 gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-cyan-500/30 hover:bg-cyan-500/50 transition-colors rounded-t"
              style={{ height: `${(value / max) * 100}%` }}
            />
            <span className="text-xs text-gray-500">{months[index]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const AccountDashboard = ({ countryCode }: AccountDashboardProps) => {
  const { customer, isLoading, isAuthenticated, logout } = useCustomer()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<StoreOrder[]>([])
  const [addresses, setAddresses] = useState<StoreCustomerAddress[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  // Demo spending data
  const spendingData = [120, 280, 150, 420, 380, 290]
  const totalSpent = spendingData.reduce((a, b) => a + b, 0)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/$countryCode/account/login", params: { countryCode } })
    }
  }, [isLoading, isAuthenticated, navigate, countryCode])

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) return

      try {
        const [ordersRes, addressesRes] = await Promise.all([
          sdk.store.order.list({ limit: 5 }),
          sdk.store.customer.listAddress(),
        ])
        setOrders(ordersRes.orders || [])
        setAddresses(addressesRes.addresses || [])
      } catch {
        // Handle error
      } finally {
        setLoadingOrders(false)
      }
    }

    fetchData()
  }, [isAuthenticated])

  const handleLogout = async () => {
    await logout()
    navigate({ to: "/$countryCode", params: { countryCode } })
  }

  if (isLoading || !customer) {
    return (
      <AccountLayout currentPath={`/${countryCode}/account`}>
        <div className="animate-pulse space-y-6">
          <div className="h-24 bg-gray-800 rounded-xl" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-32 bg-gray-800 rounded-xl" />
            <div className="h-32 bg-gray-800 rounded-xl" />
            <div className="h-32 bg-gray-800 rounded-xl" />
          </div>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account`}>
      {/* Header Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              fallback={`${customer.first_name?.[0] || ""}${customer.last_name?.[0] || ""}`}
              size="lg"
            />
            <div>
              <h1 className="text-xl font-bold text-white">
                Welcome back, {customer.first_name}
              </h1>
              <p className="text-gray-400 text-sm">{customer.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/${countryCode}/account/settings`}>
              <Button variant="secondary" className="flex items-center gap-2">
                <CogSixTooth className="w-4 h-4" />
                Settings
              </Button>
            </Link>
            <Button variant="secondary" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-gray-400 text-sm">Total Orders</span>
          </div>
          <p className="text-2xl font-bold text-white">{orders.length}</p>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <ChartBar className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-gray-400 text-sm">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-cyan-400">${totalSpent}</p>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-gray-400 text-sm">Member Status</span>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Link 
          to={`/${countryCode}/account/wishlists`}
          className="flex flex-col items-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-pink-400" />
          </div>
          <span className="text-sm text-gray-300">Wishlists</span>
        </Link>
        <Link 
          to={`/${countryCode}/account/orders`}
          className="flex flex-col items-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <CubeSolid className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-sm text-gray-300">Track Order</span>
        </Link>
        <Link 
          to={`/${countryCode}/account/subscriptions`}
          className="flex flex-col items-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
            <ArrowPath className="w-6 h-6 text-amber-400" />
          </div>
          <span className="text-sm text-gray-300">Subscriptions</span>
        </Link>
        <Link 
          to={`/${countryCode}/account/loyalty`}
          className="flex flex-col items-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Star className="w-6 h-6 text-purple-400" />
          </div>
          <span className="text-sm text-gray-300">Rewards</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Recent Orders</h2>
            <Link to={`/${countryCode}/account/orders`} className="text-cyan-400 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="p-4">
            {loadingOrders ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-gray-800 rounded-lg" />
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-3">
                {orders.slice(0, 4).map((order) => (
                  <Link
                    key={order.id}
                    to={`/${countryCode}/orders/${order.id}`}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div>
                      <p className="text-white font-medium text-sm">#{order.display_id}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-medium text-sm">
                        {formatPrice({
                          amount: order.total,
                          currency_code: order.currency_code,
                        })}
                      </span>
                      <ArrowRightMini className="w-4 h-4 text-gray-500" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CubeSolid className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No orders yet</p>
                <Link to={`/${countryCode}/store`}>
                  <Button variant="secondary" className="mt-3">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Spending Overview */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Spending Overview</h2>
            <span className="text-gray-500 text-sm">Last 6 months</span>
          </div>
          <div className="p-4">
            <SpendingChart data={spendingData} />
            <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-xs">Total Spent</p>
                <p className="text-cyan-400 font-semibold">${totalSpent}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Monthly Avg</p>
                <p className="text-white font-semibold">${Math.round(totalSpent / 6)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl mt-6">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="font-semibold text-white">Saved Addresses</h2>
          <Button variant="secondary" className="text-sm">
            Add Address
          </Button>
        </div>
        <div className="p-4">
          {addresses.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {addresses.slice(0, 2).map((address) => (
                <div
                  key={address.id}
                  className="p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <p className="text-white font-medium text-sm">
                        {address.first_name} {address.last_name}
                      </p>
                    </div>
                    <button className="text-gray-500 hover:text-cyan-400 text-xs">Edit</button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {address.address_1}
                    {address.address_2 && <>, {address.address_2}</>}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {address.city}, {address.province} {address.postal_code}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <MapPin className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No saved addresses</p>
              <p className="text-gray-500 text-xs mt-1">Add an address to speed up checkout</p>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  )
}

export default AccountDashboard
