import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { useCustomer } from "@/lib/context/customer-context"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { sdk } from "@/lib/utils/sdk"
import { formatPrice } from "@/lib/utils/price"
import { ArrowRightMini, CubeSolid, MapPin, User, Heart, ChartBar, Cog } from "@medusajs/icons"
import type { StoreOrder, StoreCustomerAddress } from "@medusajs/types"

interface AccountDashboardProps {
  countryCode: string;
}

// Simple inline chart component
const SpendingChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  
  return (
    <div className="h-40">
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-cyan-500/20 hover:bg-cyan-500/40 transition-colors rounded-t"
              style={{ height: `${(value / max) * 100}%` }}
            />
            <span className="text-xs text-gray-500">{months[index]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Empty state component
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: { 
  icon: any
  title: string
  description: string
  action?: { label: string; href: string }
}) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
      <Icon className="w-8 h-8 text-gray-600" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-6 max-w-sm mx-auto">{description}</p>
    {action && (
      <Link to={action.href}>
        <Button variant="primary">{action.label}</Button>
      </Link>
    )}
  </div>
)

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
      <div className="bg-city-dark min-h-[70vh] py-20">
        <div className="content-container">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-city-steel/50 rounded w-1/4" />
            <div className="h-40 bg-city-steel/50 rounded" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-city-dark py-12">
      <div className="content-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar
              fallback={`${customer.first_name?.[0] || ""}${customer.last_name?.[0] || ""}`}
              size="lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-city-white">
                {customer.first_name} {customer.last_name}
              </h1>
              <p className="text-city-gray">{customer.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/${countryCode}/account/settings`}>
              <Button variant="secondary" className="flex items-center gap-2">
                <Cog className="w-4 h-4" />
                Settings
              </Button>
            </Link>
            <Button variant="secondary" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link 
            to={`/${countryCode}/wishlist`}
            className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <p className="font-medium text-white">Wishlist</p>
              <p className="text-sm text-gray-400">3 items</p>
            </div>
          </Link>
          <Link 
            to={`/${countryCode}/orders/demo`}
            className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <CubeSolid className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="font-medium text-white">Track Order</p>
              <p className="text-sm text-gray-400">View status</p>
            </div>
          </Link>
          <Link 
            to={`/${countryCode}/returns`}
            className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-white">Returns</p>
              <p className="text-sm text-gray-400">Start a return</p>
            </div>
          </Link>
          <Link 
            to={`/${countryCode}/gift-cards`}
            className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-white">Gift Cards</p>
              <p className="text-sm text-gray-400">Buy or check</p>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CubeSolid className="w-5 h-5 text-city-cyan" />
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-city-white">{orders.length}</p>
                  <p className="text-city-muted text-sm">Lifetime orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartBar className="w-5 h-5 text-city-cyan" />
                    Total Spent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-cyan-400">${totalSpent}</p>
                  <p className="text-city-muted text-sm">Last 6 months</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-city-cyan" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="success">Active</Badge>
                  <p className="text-city-muted text-sm mt-2">Member since 2025</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Link to={`/${countryCode}/account`} className="text-cyan-400 text-sm hover:underline">
                    View All
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Order</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Date</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Total</th>
                          <th className="py-3 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                            <td className="py-4 px-4">
                              <span className="text-white font-medium">#{order.display_id}</span>
                            </td>
                            <td className="py-4 px-4 text-gray-400">
                              {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <Badge variant="cyan">
                                {order.fulfillment_status || "Processing"}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right text-cyan-400 font-medium">
                              {formatPrice({
                                amount: order.total,
                                currency_code: order.currency_code,
                              })}
                            </td>
                            <td className="py-4 px-4">
                              <Link 
                                to={`/${countryCode}/orders/${order.id}`}
                                className="text-gray-400 hover:text-cyan-400"
                              >
                                <ArrowRightMini className="w-5 h-5" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState
                    icon={CubeSolid}
                    title="No orders yet"
                    description="Start shopping to see your order history here"
                    action={{ label: "Browse Products", href: `/${countryCode}/store` }}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingOrders ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-city-steel/50 rounded" />
                    ))}
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Link
                        key={order.id}
                        to={`/${countryCode}/orders/${order.id}`}
                        className="flex items-center justify-between p-4 bg-city-slate border border-city-steel hover:border-city-cyan/50 transition-colors block"
                      >
                        <div>
                          <p className="text-city-white font-medium">
                            Order #{order.display_id}
                          </p>
                          <p className="text-city-muted text-sm">
                            {new Date(order.created_at).toLocaleDateString()} - {order.items?.length || 0} items
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-city-cyan font-medium">
                              {formatPrice({
                                amount: order.total,
                                currency_code: order.currency_code,
                              })}
                            </p>
                            <Badge variant="cyan">
                              {order.fulfillment_status || "Processing"}
                            </Badge>
                          </div>
                          <ArrowRightMini className="w-5 h-5 text-city-muted" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={CubeSolid}
                    title="No orders yet"
                    description="When you make a purchase, your orders will appear here"
                    action={{ label: "Start Shopping", href: `/${countryCode}/store` }}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Button variant="secondary">
                    Add Address
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {addresses.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="p-4 bg-city-slate border border-city-steel rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-city-white font-medium">
                            {address.first_name} {address.last_name}
                          </p>
                          <button className="text-gray-400 hover:text-cyan-400 text-sm">Edit</button>
                        </div>
                        <p className="text-city-gray text-sm">
                          {address.address_1}
                          {address.address_2 && <>, {address.address_2}</>}
                        </p>
                        <p className="text-city-gray text-sm">
                          {address.city}, {address.province} {address.postal_code}
                        </p>
                        <p className="text-city-gray text-sm">
                          {address.country_code?.toUpperCase()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={MapPin}
                    title="No saved addresses"
                    description="Add a shipping address to speed up checkout"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spending Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpendingChart data={spendingData} />
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total (6 months)</span>
                      <span className="text-cyan-400 font-semibold">${totalSpent}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">Monthly Average</span>
                      <span className="text-white">${Math.round(totalSpent / 6)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">Delivered</p>
                          <p className="text-sm text-gray-400">Completed orders</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-white">{Math.max(0, orders.length - 1)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">In Progress</p>
                          <p className="text-sm text-gray-400">Being processed</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-white">{orders.length > 0 ? 1 : 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">Items Purchased</p>
                          <p className="text-sm text-gray-400">Total items</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-white">
                        {orders.reduce((acc, order) => acc + (order.items?.length || 0), 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AccountDashboard
