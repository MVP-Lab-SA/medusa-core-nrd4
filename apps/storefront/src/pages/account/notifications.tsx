/**
 * Account Notifications Page
 * 
 * Allows customers to manage their notification preferences
 * for email, SMS, and push notifications.
 */

import { useState } from "react"
import { useParams } from "@tanstack/react-router"
import { 
  BellAlert,
  Envelope,
  Phone,
  ShoppingBag,
  Tag,
  Star,
  Sparkles,
  Check,
  XMark,
} from "@medusajs/icons"
import { useCustomer } from "@/lib/context/customer-context"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountCard,
  AccountCardHeader,
  AccountButton,
  AccountPageHeader,
  AccountAlert,
  AccountToggle,
  AccountTabs,
} from "@/components/account/AccountUI"

interface NotificationSetting {
  id: string
  title: string
  description: string
  email: boolean
  sms: boolean
  push: boolean
}

export default function AccountNotificationsPage() {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }
  const { customer } = useCustomer()
  
  const [activeTab, setActiveTab] = useState("preferences")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "orders",
      title: "Order Updates",
      description: "Get notified about order confirmations, shipping updates, and delivery status",
      email: true,
      sms: true,
      push: true,
    },
    {
      id: "promotions",
      title: "Promotions & Sales",
      description: "Be the first to know about exclusive deals, flash sales, and special offers",
      email: true,
      sms: false,
      push: true,
    },
    {
      id: "newsletter",
      title: "Newsletter",
      description: "Weekly updates with new arrivals, trends, and curated content",
      email: true,
      sms: false,
      push: false,
    },
    {
      id: "reviews",
      title: "Review Reminders",
      description: "Reminders to review products you've purchased",
      email: true,
      sms: false,
      push: false,
    },
    {
      id: "wishlist",
      title: "Wishlist Alerts",
      description: "Get notified when items in your wishlist go on sale or are back in stock",
      email: true,
      sms: false,
      push: true,
    },
    {
      id: "loyalty",
      title: "Loyalty & Rewards",
      description: "Updates about your points, tier status, and reward opportunities",
      email: true,
      sms: false,
      push: true,
    },
    {
      id: "account",
      title: "Account Security",
      description: "Important alerts about your account security and login activity",
      email: true,
      sms: true,
      push: true,
    },
  ])

  const [globalSettings, setGlobalSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
  })

  const handleToggle = (settingId: string, channel: "email" | "sms" | "push") => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === settingId
          ? { ...setting, [channel]: !setting[channel] }
          : setting
      )
    )
  }

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // In a real implementation, this would save to customer metadata or a custom module
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Notification preferences saved successfully.")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError("Failed to save preferences. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEnableAll = (channel: "email" | "sms" | "push") => {
    setSettings((prev) =>
      prev.map((setting) => ({ ...setting, [channel]: true }))
    )
  }

  const handleDisableAll = (channel: "email" | "sms" | "push") => {
    setSettings((prev) =>
      prev.map((setting) => ({ ...setting, [channel]: false }))
    )
  }

  const tabs = [
    { id: "preferences", label: "Preferences", icon: <BellAlert className="w-4 h-4" /> },
    { id: "channels", label: "Channels", icon: <Envelope className="w-4 h-4" /> },
  ]

  const getIconForSetting = (id: string) => {
    switch (id) {
      case "orders": return <ShoppingBag className="w-5 h-5" />
      case "promotions": return <Tag className="w-5 h-5" />
      case "newsletter": return <Envelope className="w-5 h-5" />
      case "reviews": return <Star className="w-5 h-5" />
      case "wishlist": return <Sparkles className="w-5 h-5" />
      case "loyalty": return <Sparkles className="w-5 h-5" />
      case "account": return <BellAlert className="w-5 h-5" />
      default: return <BellAlert className="w-5 h-5" />
    }
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/notifications`}>
      <AccountPageHeader 
        title="Notifications" 
        description="Manage how and when we contact you"
        action={
          <AccountButton onClick={handleSave} loading={loading} icon={<Check className="w-4 h-4" />}>
            Save Preferences
          </AccountButton>
        }
      />

      {success && (
        <div className="mb-6">
          <AccountAlert type="success">{success}</AccountAlert>
        </div>
      )}

      {error && (
        <div className="mb-6">
          <AccountAlert type="error">{error}</AccountAlert>
        </div>
      )}

      <AccountTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "preferences" && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <AccountCard compact>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Quick actions</p>
              <div className="flex gap-2">
                <AccountButton size="sm" variant="ghost" onClick={() => handleEnableAll("email")}>
                  Enable all email
                </AccountButton>
                <AccountButton size="sm" variant="ghost" onClick={() => handleDisableAll("email")}>
                  Disable all email
                </AccountButton>
              </div>
            </div>
          </AccountCard>

          {/* Notification Settings Table */}
          <AccountCard>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Notification Type
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400 w-24">
                      <div className="flex items-center justify-center gap-2">
                        <Envelope className="w-4 h-4" />
                        Email
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400 w-24">
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        SMS
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400 w-24">
                      <div className="flex items-center justify-center gap-2">
                        <BellAlert className="w-4 h-4" />
                        Push
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {settings.map((setting) => (
                    <tr key={setting.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                            {getIconForSetting(setting.id)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{setting.title}</p>
                            <p className="text-xs text-gray-500">{setting.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggle(setting.id, "email")}
                          className={`p-2 rounded-lg transition-colors ${
                            setting.email
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "bg-gray-800 text-gray-600"
                          }`}
                        >
                          {setting.email ? <Check className="w-4 h-4" /> : <XMark className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggle(setting.id, "sms")}
                          className={`p-2 rounded-lg transition-colors ${
                            setting.sms
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "bg-gray-800 text-gray-600"
                          }`}
                        >
                          {setting.sms ? <Check className="w-4 h-4" /> : <XMark className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggle(setting.id, "push")}
                          className={`p-2 rounded-lg transition-colors ${
                            setting.push
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "bg-gray-800 text-gray-600"
                          }`}
                        >
                          {setting.push ? <Check className="w-4 h-4" /> : <XMark className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccountCard>
        </div>
      )}

      {activeTab === "channels" && (
        <div className="space-y-6">
          {/* Email Channel */}
          <AccountCard>
            <AccountCardHeader
              title="Email Notifications"
              description={customer?.email || "No email configured"}
              icon={<Envelope className="w-5 h-5" />}
            />
            <div className="space-y-4">
              <AccountToggle
                checked={globalSettings.emailEnabled}
                onChange={(checked) => setGlobalSettings((prev) => ({ ...prev, emailEnabled: checked }))}
                label="Enable email notifications"
                description="Receive notifications via email"
              />
              {globalSettings.emailEnabled && (
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-white mb-2">Email delivery status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <p className="text-sm text-gray-400">All emails are being delivered successfully</p>
                  </div>
                </div>
              )}
            </div>
          </AccountCard>

          {/* SMS Channel */}
          <AccountCard>
            <AccountCardHeader
              title="SMS Notifications"
              description={customer?.phone || "No phone number configured"}
              icon={<Phone className="w-5 h-5" />}
            />
            <div className="space-y-4">
              <AccountToggle
                checked={globalSettings.smsEnabled}
                onChange={(checked) => setGlobalSettings((prev) => ({ ...prev, smsEnabled: checked }))}
                label="Enable SMS notifications"
                description="Receive notifications via text message"
              />
              {!customer?.phone && globalSettings.smsEnabled && (
                <AccountAlert type="warning">
                  Add a phone number to your profile to receive SMS notifications.
                </AccountAlert>
              )}
            </div>
          </AccountCard>

          {/* Push Channel */}
          <AccountCard>
            <AccountCardHeader
              title="Push Notifications"
              description="Browser and mobile app notifications"
              icon={<BellAlert className="w-5 h-5" />}
            />
            <div className="space-y-4">
              <AccountToggle
                checked={globalSettings.pushEnabled}
                onChange={(checked) => setGlobalSettings((prev) => ({ ...prev, pushEnabled: checked }))}
                label="Enable push notifications"
                description="Receive instant notifications in your browser or app"
              />
              {globalSettings.pushEnabled && (
                <AccountButton variant="secondary" size="sm">
                  Test Push Notification
                </AccountButton>
              )}
            </div>
          </AccountCard>

          {/* Quiet Hours */}
          <AccountCard>
            <AccountCardHeader
              title="Quiet Hours"
              description="Pause non-urgent notifications during specific hours"
            />
            <div className="space-y-4">
              <AccountToggle
                checked={globalSettings.quietHoursEnabled}
                onChange={(checked) => setGlobalSettings((prev) => ({ ...prev, quietHoursEnabled: checked }))}
                label="Enable quiet hours"
                description="Only urgent notifications will be sent during quiet hours"
              />
              {globalSettings.quietHoursEnabled && (
                <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">From</label>
                    <input
                      type="time"
                      value={globalSettings.quietHoursStart}
                      onChange={(e) => setGlobalSettings((prev) => ({ ...prev, quietHoursStart: e.target.value }))}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">To</label>
                    <input
                      type="time"
                      value={globalSettings.quietHoursEnd}
                      onChange={(e) => setGlobalSettings((prev) => ({ ...prev, quietHoursEnd: e.target.value }))}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </AccountCard>
        </div>
      )}
    </AccountLayout>
  )
}
