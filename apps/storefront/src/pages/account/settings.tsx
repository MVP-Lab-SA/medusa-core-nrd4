import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowLeft, User, BellAlert, LockClosedSolid, CreditCard, MapPin } from "@medusajs/icons"

export function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  
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
    { id: "notifications", label: "Notifications", icon: BellAlert },
    { id: "security", label: "Security", icon: LockClosedSolid },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "addresses", label: "Addresses", icon: MapPin },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/us/account" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                        {firstName[0]}{lastName[0]}
                      </div>
                      <button className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors">
                        Change Photo
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    
                    <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-300">Notification Channels</h3>
                      
                      <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-400">Receive updates via email</p>
                        </div>
                        <button
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            emailNotifications ? "bg-cyan-500" : "bg-gray-600"
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            emailNotifications ? "translate-x-6" : "translate-x-0.5"
                          }`} />
                        </button>
                      </label>
                      
                      <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-400">Receive updates via text message</p>
                        </div>
                        <button
                          onClick={() => setSmsNotifications(!smsNotifications)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            smsNotifications ? "bg-cyan-500" : "bg-gray-600"
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            smsNotifications ? "translate-x-6" : "translate-x-0.5"
                          }`} />
                        </button>
                      </label>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-800">
                      <h3 className="font-medium text-gray-300">Notification Types</h3>
                      
                      <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-400">Shipping and delivery notifications</p>
                        </div>
                        <button
                          onClick={() => setOrderUpdates(!orderUpdates)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            orderUpdates ? "bg-cyan-500" : "bg-gray-600"
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            orderUpdates ? "translate-x-6" : "translate-x-0.5"
                          }`} />
                        </button>
                      </label>
                      
                      <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium">Promotions & Deals</p>
                          <p className="text-sm text-gray-400">Sales, discounts, and special offers</p>
                        </div>
                        <button
                          onClick={() => setPromotions(!promotions)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            promotions ? "bg-cyan-500" : "bg-gray-600"
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            promotions ? "translate-x-6" : "translate-x-0.5"
                          }`} />
                        </button>
                      </label>
                      
                      <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-gray-400">Weekly updates and product news</p>
                        </div>
                        <button
                          onClick={() => setNewsletter(!newsletter)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            newsletter ? "bg-cyan-500" : "bg-gray-600"
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            newsletter ? "translate-x-6" : "translate-x-0.5"
                          }`} />
                        </button>
                      </label>
                    </div>
                    
                    <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h3 className="font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                          <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-400">Add an extra layer of security</p>
                        </div>
                        <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">Disabled</span>
                      </div>
                      <button className="px-4 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                    
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <h3 className="font-medium text-red-400 mb-2">Danger Zone</h3>
                      <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back.</p>
                      <button className="px-4 py-2 border border-red-500 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === "payments" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-400">Expires 12/2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">Default</span>
                        <button className="text-gray-400 hover:text-white">Edit</button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">MC</span>
                        </div>
                        <div>
                          <p className="font-medium">Mastercard ending in 8888</p>
                          <p className="text-sm text-gray-400">Expires 06/2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-white">Set Default</button>
                        <button className="text-red-400 hover:text-red-300">Remove</button>
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
                  <h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">Default</span>
                          <span className="text-sm text-gray-400">Shipping</span>
                        </div>
                        <button className="text-gray-400 hover:text-white text-sm">Edit</button>
                      </div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-gray-400 text-sm">123 Smart City Ave</p>
                      <p className="text-gray-400 text-sm">San Francisco, CA 94102</p>
                      <p className="text-gray-400 text-sm">United States</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Billing</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="text-gray-400 hover:text-white text-sm">Set Default</button>
                          <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                        </div>
                      </div>
                      <p className="font-medium">John Doe</p>
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
      </div>
    </div>
  )
}
