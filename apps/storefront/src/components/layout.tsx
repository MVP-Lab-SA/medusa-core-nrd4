import ErrorBoundary from "@/components/error-boundary"
import Footer from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CartProvider } from "@/lib/context/cart"
import { ToastProvider } from "@/lib/context/toast-context"
import { CustomerProvider } from "@/lib/context/customer-context"
import { WishlistProvider } from "@/components/wishlist"
import { Outlet } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { XMark } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"

// Announcement Bar Component (inline)
const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  
  const announcements = [
    { text: "Free shipping on orders over $100", link: "/us/store" },
    { text: "New arrivals just dropped - Urban Tech Collection", link: "/us/store" },
    { text: "Sign up for 10% off your first order", link: "/us/account/register" },
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  if (!isVisible) return null
  
  return (
    <div className="bg-city-cyan text-city-dark py-2 px-4 relative">
      <div className="content-container flex items-center justify-center">
        <Link to={announcements[currentIndex].link as any} className="text-sm font-medium hover:underline">
          {announcements[currentIndex].text}
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70"
        >
          <XMark className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Back to Top Button (inline)
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])
  
  if (!isVisible) return null
  
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 md:bottom-8 right-4 z-40 p-3 bg-city-cyan text-city-dark rounded-full shadow-lg hover:bg-city-cyan-light transition-all"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
    </button>
  )
}

// Cookie Consent (inline)
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000)
    }
  }, [])
  
  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setIsVisible(false)
  }
  
  if (!isVisible) return null
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-city-navy border-t border-city-steel/30 md:bottom-4 md:left-4 md:right-auto md:max-w-md md:rounded-lg md:border">
      <p className="text-city-gray text-sm mb-4">
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
      </p>
      <div className="flex gap-3">
        <button 
          onClick={acceptCookies}
          className="px-4 py-2 bg-city-cyan text-city-dark text-sm font-medium hover:bg-city-cyan-light transition-colors"
        >
          Accept
        </button>
        <Link to={"/us/privacy" as any} className="px-4 py-2 text-city-gray text-sm hover:text-city-white transition-colors">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}

// Chat Widget (inline)
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Hi! How can I help you today?", isUser: false }
  ])
  const [input, setInput] = useState("")
  
  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { text: input, isUser: true }])
    setInput("")
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! Our team will get back to you shortly.", 
        isUser: false 
      }])
    }, 1000)
  }
  
  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-8 right-16 md:right-20 z-40 p-3 bg-city-slate text-city-cyan rounded-full shadow-lg hover:bg-city-steel transition-all border border-city-steel/50"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 md:bottom-20 right-4 z-50 w-80 bg-city-navy border border-city-steel/30 rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 bg-city-slate border-b border-city-steel/30">
            <h3 className="text-city-white font-semibold">Dakkah Support</h3>
            <p className="text-city-muted text-xs">We typically reply within minutes</p>
          </div>
          <div className="h-64 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.isUser 
                    ? "bg-city-cyan text-city-dark" 
                    : "bg-city-slate text-city-white"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-city-steel/30 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-city-slate border border-city-steel/50 rounded text-city-white text-sm placeholder:text-city-muted focus:outline-none focus:border-city-cyan"
            />
            <button 
              onClick={sendMessage}
              className="px-4 py-2 bg-city-cyan text-city-dark text-sm font-medium hover:bg-city-cyan-light transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// Mobile Bottom Nav (inline)
const MobileBottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-city-navy border-t border-city-steel/30 md:hidden">
      <nav className="flex justify-around py-2">
        <Link to={"/us" as any} className="flex flex-col items-center p-2 text-city-muted hover:text-city-cyan">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to={"/us/store" as any} className="flex flex-col items-center p-2 text-city-muted hover:text-city-cyan">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-xs mt-1">Store</span>
        </Link>
        <Link to={"/us/cart" as any} className="flex flex-col items-center p-2 text-city-muted hover:text-city-cyan">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-xs mt-1">Cart</span>
        </Link>
        <Link to={"/us/account" as any} className="flex flex-col items-center p-2 text-city-muted hover:text-city-cyan">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Account</span>
        </Link>
      </nav>
    </div>
  )
}

const Layout = () => {
  return (
    <ToastProvider>
      <CustomerProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-city-dark">
              {/* Announcement Bar */}
              <AnnouncementBar />
              
              <Navbar />

              <main className="relative flex-1 pb-16 md:pb-0">
                <ErrorBoundary>
                  <Outlet />
                </ErrorBoundary>
              </main>

              <Footer />
              
              {/* Global UI Components */}
              <BackToTop />
              <CookieConsent />
              <ChatWidget />
              
              {/* Mobile Bottom Navigation */}
              <MobileBottomNav />
            </div>
          </CartProvider>
        </WishlistProvider>
      </CustomerProvider>
    </ToastProvider>
  )
}

export default Layout
