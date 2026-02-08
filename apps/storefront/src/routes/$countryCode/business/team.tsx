import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Users, UserPlus, Mail, Shield, MoreVertical, Edit, Trash2, Check } from "lucide-react"

export const Route = createFileRoute("/$countryCode/business/team")({
  component: BusinessTeam,
})

function BusinessTeam() {
  const [showInviteModal, setShowInviteModal] = useState(false)

  const teamMembers = [
    { id: 1, name: "John Smith", email: "john@acme.com", role: "Admin", status: "active", avatar: "JS", lastActive: "2 hours ago" },
    { id: 2, name: "Jane Doe", email: "jane@acme.com", role: "Purchaser", status: "active", avatar: "JD", lastActive: "1 day ago" },
    { id: 3, name: "Bob Wilson", email: "bob@acme.com", role: "Viewer", status: "active", avatar: "BW", lastActive: "3 days ago" },
    { id: 4, name: "Alice Brown", email: "alice@acme.com", role: "Approver", status: "pending", avatar: "AB", lastActive: "Pending" },
  ]

  const roles = [
    { name: "Admin", description: "Full access to all features", color: "bg-red-100 text-red-700" },
    { name: "Approver", description: "Can approve orders and quotes", color: "bg-purple-100 text-purple-700" },
    { name: "Purchaser", description: "Can create orders and quotes", color: "bg-blue-100 text-blue-700" },
    { name: "Viewer", description: "Read-only access", color: "bg-gray-100 text-gray-700" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-gray-600">Manage your company's team members and roles</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {roles.map((role) => (
          <div key={role.name} className="bg-white border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-gray-500" />
              <span className={`px-2 py-1 rounded text-sm font-medium ${role.color}`}>{role.name}</span>
            </div>
            <p className="text-sm text-gray-600">{role.description}</p>
          </div>
        ))}
      </div>

      {/* Team Members Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members ({teamMembers.length})
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Member</th>
              <th className="text-left px-6 py-4 font-semibold">Role</th>
              <th className="text-left px-6 py-4 font-semibold">Status</th>
              <th className="text-left px-6 py-4 font-semibold">Last Active</th>
              <th className="text-right px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    roles.find(r => r.name === member.role)?.color || "bg-gray-100"
                  }`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {member.status === "active" ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <Check className="w-4 h-4" />
                      Active
                    </span>
                  ) : (
                    <span className="text-amber-600">Pending Invite</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600">{member.lastActive}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Remove">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Invite Team Member</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" placeholder="colleague@company.com" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  {roles.map((role) => (
                    <option key={role.name} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
