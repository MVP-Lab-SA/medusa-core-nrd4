import { useState } from "react"
import { useParams } from "@tanstack/react-router"
import { User, BellAlert, LockClosedSolid, CreditCard, MapPin, Sun } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher"
import { useTheme } from "@/lib/theme"

export function AccountSettingsPage() {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }
  const [activeTab, setActiveTab] = useState("profile")
  const { theme } = useTheme()
  
  // Profile state
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  
  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [promotions, setPromotions] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Sun },
    { id: "notifications", label: "Notifications", icon: BellAlert },
    { id: "security", label: "Security", icon: LockClosedSolid },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "addresses", label: "Addresses", icon: MapPin },
  ]

  return (
    <AccountLayout currentPath={`/${countryCode}/account/settings`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account preferences</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Settings Tabs */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left text-sm ${
                  activeTab === tab.id
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                    : "hover:bg-gray-800 text-gray-400"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white">
                      {firstName[0]}{lastName[0]}
                    </div>
                    <button className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors text-gray-300 text-sm">
                      Change Photo
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                    />
                  </div>
                  
                  <button className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Appearance</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Choose a theme that suits your style. Your preference will be saved automatically.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-4">Select Theme</h3>
                    <ThemeSwitcher variant="grid" />
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Current Theme</h3>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{
                          background: theme.isDark
                            ? `linear-gradient(135deg, ${theme.id === "cityos-dark" ? "#0a0f1a" : theme.id === "minimal-dark" ? "#000" : theme.id === "ocean-breeze" ? "#0c1929" : theme.id === "sunset-warm" ? "#1a0f0f" : "#f8fafc"} 50%, ${theme.id === "cityos-dark" ? "#06b6d4" : theme.id === "minimal-dark" ? "#fafafa" : theme.id === "ocean-breeze" ? "#0ea5e9" : theme.id === "sunset-warm" ? "#f97316" : "#0891b2"} 50%)`
                            : `linear-gradient(135deg, #f8fafc 50%, #0891b2 50%)`,
                        }}
                      />
                      <div>
                        <p className="font-medium text-white">{theme.name}</p>
                        <p className="text-sm text-gray-500">{theme.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <p className="text-cyan-400 text-sm">
                      Theme changes are applied instantly and saved to your browser. Your preference will persist across sessions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-400">Notification Channels</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`w-11 h-6 rounded-full transition-colors ${
                          emailNotifications ? "bg-cyan-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          emailNotifications ? "translate-x-5" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via text message</p>
                      </div>
                      <button
                        onClick={() => setSmsNotifications(!smsNotifications)}
                        className={`w-11 h-6 rounded-full transition-colors ${
                          smsNotifications ? "bg-cyan-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          smsNotifications ? "translate-x-5" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400">Notification Types</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Order Updates</p>
                        <p className="text-sm text-gray-500">Shipping and delivery notifications</p>
                      </div>
                      <button
                        onClick={() => setOrderUpdates(!orderUpdates)}
                        className={`w-11 h-6 rounded-full transition-colors ${
                          orderUpdates ? "bg-cyan-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          orderUpdates ? "translate-x-5" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Promotions & Deals</p>
                        <p className="text-sm text-gray-500">Sales, discounts, and special offers</p>
                      </div>
                      <button
                        onClick={() => setPromotions(!promotions)}
                        className={`w-11 h-6 rounded-full transition-colors ${
                          promotions ? "bg-cyan-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          promotions ? "translate-x-5" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Newsletter</p>
                        <p className="text-sm text-gray-500">Weekly updates and product news</p>
                      </div>
                      <button
                        onClick={() => setNewsletter(!newsletter)}
                        className={`w-11 h-6 rounded-full transition-colors ${
                          newsletter ? "bg-cyan-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          newsletter ? "translate-x-5" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                  </div>
                  
                  <button className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="font-medium text-white mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                        />
                      </div>
                      <button className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">Disabled</span>
                    </div>
                    <button className="px-4 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors text-sm">
                      Enable 2FA
                    </button>
                  </div>
                  
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <h3 className="font-medium text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back.</p>
                    <button className="px-4 py-2 border border-red-500 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payments" && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-6">Payment Methods</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">Default</span>
                      <button className="text-gray-400 hover:text-white text-sm">Edit</button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">MC</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">Mastercard ending in 8888</p>
                        <p className="text-sm text-gray-500">Expires 06/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-gray-400 hover:text-white text-sm">Set Default</button>
                      <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                    </div>
                  </div>
                  
                  <button className="w-full p-4 border-2 border-dashed border-gray-700 hover:border-cyan-500 rounded-lg text-gray-400 hover:text-cyan-400 transition-colors">
                    + Add New Payment Method
                  </button>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-6">Saved Addresses</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">Default</span>
                        <span className="text-sm text-gray-500">Shipping</span>
                      </div>
                      <button className="text-gray-400 hover:text-white text-sm">Edit</button>
                    </div>
                    <p className="font-medium text-white">John Doe</p>
                    <p className="text-gray-400 text-sm">123 Smart City Ave</p>
                    <p className="text-gray-400 text-sm">San Francisco, CA 94102</p>
                    <p className="text-gray-400 text-sm">United States</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Billing</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-white text-sm">Set Default</button>
                        <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                      </div>
                    </div>
                    <p className="font-medium text-white">John Doe</p>
                    <p className="text-gray-400 text-sm">456 Tech Boulevard</p>
                    <p className="text-gray-400 text-sm">Los Angeles, CA 90001</p>
                    <p className="text-gray-400 text-sm">United States</p>
                  </div>
                  
                  <button className="w-full p-4 border-2 border-dashed border-gray-700 hover:border-cyan-500 rounded-lg text-gray-400 hover:text-cyan-400 transition-colors">
                    + Add New Address
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}
