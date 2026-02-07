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
import { ArrowRightMini, CubeSolid, MapPin, User } from "@medusajs/icons"
import type { StoreOrder, StoreCustomerAddress } from "@medusajs/types"

interface AccountDashboardProps {
  countryCode: string;
}

const AccountDashboard = ({ countryCode }: AccountDashboardProps) => {
  const { customer, isLoading, isAuthenticated, logout } = useCustomer()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<StoreOrder[]>([])
  const [addresses, setAddresses] = useState<StoreCustomerAddress[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

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
          <Button variant="secondary" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CubeSolid className="w-5 h-5 text-city-cyan" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-city-white">{orders.length}</p>
                  <p className="text-city-muted text-sm">Total orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-city-cyan" />
                    Saved Addresses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-city-white">{addresses.length}</p>
                  <p className="text-city-muted text-sm">Shipping addresses</p>
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
            {orders.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between py-3 border-b border-city-steel last:border-0"
                      >
                        <div>
                          <p className="text-city-white font-medium">
                            Order #{order.display_id}
                          </p>
                          <p className="text-city-muted text-sm">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
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
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-city-slate border border-city-steel hover:border-city-cyan/50 transition-colors"
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CubeSolid className="w-12 h-12 text-city-steel mx-auto mb-4" />
                    <p className="text-city-gray">No orders yet</p>
                    <Link to="/$countryCode/store" params={{ countryCode }}>
                      <Button variant="primary" className="mt-4">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
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
                        className="p-4 bg-city-slate border border-city-steel"
                      >
                        <p className="text-city-white font-medium">
                          {address.first_name} {address.last_name}
                        </p>
                        <p className="text-city-gray text-sm mt-1">
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
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-city-steel mx-auto mb-4" />
                    <p className="text-city-gray">No saved addresses</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-city-muted text-sm">First Name</label>
                    <p className="text-city-white">{customer.first_name || "-"}</p>
                  </div>
                  <div>
                    <label className="text-city-muted text-sm">Last Name</label>
                    <p className="text-city-white">{customer.last_name || "-"}</p>
                  </div>
                  <div>
                    <label className="text-city-muted text-sm">Email</label>
                    <p className="text-city-white">{customer.email}</p>
                  </div>
                  <div>
                    <label className="text-city-muted text-sm">Phone</label>
                    <p className="text-city-white">{customer.phone || "-"}</p>
                  </div>
                  <Button variant="secondary" className="mt-4">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AccountDashboard
