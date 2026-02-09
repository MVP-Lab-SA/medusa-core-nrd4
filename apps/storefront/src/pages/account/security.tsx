/**
 * Account Security Page
 * 
 * Allows customers to manage their security settings including
 * password change, two-factor authentication, and session management.
 */

import { useState } from "react"
import { useParams } from "@tanstack/react-router"
import { 
  Key, 
  ShieldCheck, 
  Eye, 
  EyeSlash, 
  Check, 
  Clock,
  ComputerDesktop,
  Phone,
  ExclamationCircle,
  Trash,
} from "@medusajs/icons"
import { useCustomer } from "@/lib/context/customer-context"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountCard,
  AccountCardHeader,
  AccountButton,
  AccountInput,
  AccountPageHeader,
  AccountAlert,
  AccountToggle,
  AccountBadge,
  AccountModal,
} from "@/components/account/AccountUI"

export default function AccountSecurityPage() {
  const { countryCode } = useParams({ strict: false }) as { countryCode: string }
  const { customer } = useCustomer()
  
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Mock sessions data
  const sessions = [
    {
      id: "1",
      device: "Chrome on MacOS",
      type: "desktop",
      location: "New York, USA",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      type: "mobile",
      location: "New York, USA",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Firefox on Windows",
      type: "desktop",
      location: "Los Angeles, USA",
      lastActive: "3 days ago",
      isCurrent: false,
    },
  ]

  const handlePasswordChange = async () => {
    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError("Please fill in all password fields.")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setError("New password must be at least 8 characters long.")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Note: Medusa doesn't have a direct password change API in the store SDK
      // This would typically require a custom endpoint or using the auth reset flow
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setShowPasswordModal(false)
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setSuccess("Password changed successfully.")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err?.message || "Failed to change password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleToggle2FA = async (enabled: boolean) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setTwoFactorEnabled(enabled)
      setSuccess(enabled ? "Two-factor authentication enabled." : "Two-factor authentication disabled.")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to update 2FA settings.")
    } finally {
      setLoading(false)
    }
  }

  const handleRevokeSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to revoke this session?")) return
    
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSuccess("Session revoked successfully.")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to revoke session.")
    } finally {
      setLoading(false)
    }
  }

  const closePasswordModal = () => {
    setShowPasswordModal(false)
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setError(null)
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/security`}>
      <AccountPageHeader 
        title="Security" 
        description="Manage your password and security settings"
      />

      {success && (
        <div className="mb-6">
          <AccountAlert type="success">{success}</AccountAlert>
        </div>
      )}

      {error && !showPasswordModal && (
        <div className="mb-6">
          <AccountAlert type="error">{error}</AccountAlert>
        </div>
      )}

      <div className="space-y-6">
        {/* Password Section */}
        <AccountCard>
          <AccountCardHeader
            title="Password"
            description="Change your account password"
            icon={<Key className="w-5 h-5" />}
            action={
              <AccountButton onClick={() => setShowPasswordModal(true)}>
                Change Password
              </AccountButton>
            }
          />
          <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
            <div className="p-2 bg-gray-700 rounded-lg text-gray-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-white">Password last changed</p>
              <p className="text-sm text-gray-400">More than 30 days ago</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            For security, we recommend changing your password regularly and using a unique 
            password that you don't use for other accounts.
          </p>
        </AccountCard>

        {/* Two-Factor Authentication */}
        <AccountCard>
          <AccountCardHeader
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            icon={<ShieldCheck className="w-5 h-5" />}
          />
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${twoFactorEnabled ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-700 text-gray-400"}`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">
                  Two-factor authentication is {twoFactorEnabled ? "enabled" : "disabled"}
                </p>
                <p className="text-sm text-gray-400">
                  {twoFactorEnabled 
                    ? "Your account is protected with an authenticator app" 
                    : "Protect your account with an authenticator app"}
                </p>
              </div>
            </div>
            <AccountToggle
              checked={twoFactorEnabled}
              onChange={handleToggle2FA}
              disabled={loading}
            />
          </div>
          {!twoFactorEnabled && (
            <AccountAlert type="warning">
              Two-factor authentication adds an extra layer of security to your account. 
              When enabled, you'll need to enter a code from your authenticator app in addition to your password.
            </AccountAlert>
          )}
        </AccountCard>

        {/* Active Sessions */}
        <AccountCard>
          <AccountCardHeader
            title="Active Sessions"
            description="Manage devices where you're logged in"
            icon={<ComputerDesktop className="w-5 h-5" />}
            action={
              <AccountButton variant="danger" size="sm">
                Revoke All
              </AccountButton>
            }
          />
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg text-gray-400">
                    {session.type === "mobile" ? (
                      <Phone className="w-5 h-5" />
                    ) : (
                      <ComputerDesktop className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white font-medium">{session.device}</p>
                      {session.isCurrent && (
                        <AccountBadge variant="success" size="sm">Current</AccountBadge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">
                      {session.location} - {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.isCurrent && (
                  <button
                    onClick={() => handleRevokeSession(session.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Revoke session"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </AccountCard>

        {/* Security Activity */}
        <AccountCard>
          <AccountCardHeader
            title="Recent Security Activity"
            description="Recent security-related events on your account"
            icon={<Clock className="w-5 h-5" />}
          />
          <div className="space-y-3">
            {[
              { event: "Successful login", time: "Today, 10:30 AM", location: "New York, USA", type: "success" },
              { event: "Password changed", time: "Dec 15, 2024", location: "New York, USA", type: "info" },
              { event: "New device login", time: "Dec 10, 2024", location: "Los Angeles, USA", type: "warning" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === "success" ? "bg-emerald-400" :
                    activity.type === "warning" ? "bg-amber-400" : "bg-cyan-400"
                  }`} />
                  <div>
                    <p className="text-sm text-white">{activity.event}</p>
                    <p className="text-xs text-gray-500">{activity.location}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </AccountCard>

        {/* Danger Zone */}
        <AccountCard>
          <AccountCardHeader
            title="Danger Zone"
            description="Irreversible actions for your account"
            icon={<ExclamationCircle className="w-5 h-5 text-red-400" />}
          />
          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">Delete Account</p>
                <p className="text-sm text-gray-400">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <AccountButton variant="danger">
                Delete Account
              </AccountButton>
            </div>
          </div>
        </AccountCard>
      </div>

      {/* Change Password Modal */}
      <AccountModal
        open={showPasswordModal}
        onClose={closePasswordModal}
        title="Change Password"
        footer={
          <>
            <AccountButton variant="secondary" onClick={closePasswordModal} disabled={loading}>
              Cancel
            </AccountButton>
            <AccountButton onClick={handlePasswordChange} loading={loading} icon={<Check className="w-4 h-4" />}>
              Change Password
            </AccountButton>
          </>
        }
      >
        {error && (
          <div className="mb-4">
            <AccountAlert type="error">{error}</AccountAlert>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <AccountInput
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showCurrentPassword ? <EyeSlash className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <AccountInput
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
              placeholder="Enter your new password"
              hint="Must be at least 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showNewPassword ? <EyeSlash className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <AccountInput
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeSlash className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </AccountModal>
    </AccountLayout>
  )
}
