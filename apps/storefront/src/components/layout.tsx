import ErrorBoundary from "@/components/error-boundary"
import Footer from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CartProvider } from "@/lib/context/cart"
import { ToastProvider } from "@/lib/context/toast-context"
import { CustomerProvider } from "@/lib/context/customer-context"
import { WishlistProvider } from "@/components/wishlist"
import { Outlet } from "@tanstack/react-router"

const Layout = () => {
  return (
    <ToastProvider>
      <CustomerProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-city-dark">
              <Navbar />

              <main className="relative flex-1">
                <ErrorBoundary>
                  <Outlet />
                </ErrorBoundary>
              </main>

              <Footer />
            </div>
          </CartProvider>
        </WishlistProvider>
      </CustomerProvider>
    </ToastProvider>
  )
}

export default Layout
