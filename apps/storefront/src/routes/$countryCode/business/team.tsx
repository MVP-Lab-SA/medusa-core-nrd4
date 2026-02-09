import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Users, UserCircle, EnvelopeSolid, ShieldCheck, EllipsisVertical, PencilSquare, Trash, Check } from "@medusajs/icons"

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
    { name: "Admin", description: "Full access to all features", color: "bg-red-500/10 text-red-400" },
    { name: "Approver", description: "Can approve orders and quotes", color: "bg-purple-500/10 text-purple-400" },
    { name: "Purchaser", description: "Can create orders and quotes", color: "bg-city-cyan/10 text-city-cyan" },
    { name: "Viewer", description: "Read-only access", color: "bg-city-slate text-city-gray" },
  ]

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-city-white">Team Management</h1>
            <p className="text-city-gray">Manage your company's team members and roles</p>
          </div>
          <button 
            onClick={() => setShowInviteModal(true)}
            className="bg-city-cyan text-city-dark px-4 py-2 rounded-lg hover:bg-city-cyan-light transition-colors flex items-center gap-2 font-medium"
          >
            <UserCircle className="w-4 h-4" />
            Invite Member
          </button>
        </div>

        {/* Role Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {roles.map((role) => (
            <div key={role.name} className="bg-city-navy border border-city-steel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-city-muted" />
                <span className={`px-2 py-1 rounded text-sm font-medium ${role.color}`}>{role.name}</span>
              </div>
              <p className="text-sm text-city-gray">{role.description}</p>
            </div>
          ))}
        </div>

        {/* Team Members Table */}
        <div className="bg-city-navy border border-city-steel rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-city-steel">
            <h2 className="text-lg font-semibold text-city-white flex items-center gap-2">
              <Users className="w-5 h-5 text-city-cyan" />
              Team Members ({teamMembers.length})
            </h2>
          </div>
          <table className="w-full">
            <thead className="bg-city-slate border-b border-city-steel">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Member</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Role</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Last Active</th>
                <th className="text-right px-6 py-4 font-semibold text-city-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-city-steel/50 last:border-0 hover:bg-city-slate/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-city-cyan text-city-dark flex items-center justify-center font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-city-white">{member.name}</p>
                        <p className="text-sm text-city-muted">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      roles.find(r => r.name === member.role)?.color || "bg-city-slate"
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {member.status === "active" ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Check className="w-4 h-4" />
                        Active
                      </span>
                    ) : (
                      <span className="text-amber-400">Pending Invite</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-city-gray">{member.lastActive}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-city-slate rounded-lg transition-colors" title="Edit">
                        <PencilSquare className="w-4 h-4 text-city-gray" />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors" title="Remove">
                        <Trash className="w-4 h-4 text-red-400" />
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-city-navy border border-city-steel rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-city-white mb-4">Invite Team Member</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-city-gray mb-1">Email Address</label>
                  <div className="relative">
                    <EnvelopeSolid className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-city-muted" />
                    <input 
                      type="email" 
                      placeholder="colleague@company.com" 
                      className="w-full pl-10 pr-4 py-2 bg-city-slate border border-city-steel rounded-lg text-city-white placeholder-city-muted focus:outline-none focus:border-city-cyan transition-colors" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-city-gray mb-1">Role</label>
                  <select className="w-full px-4 py-2 bg-city-slate border border-city-steel rounded-lg text-city-white focus:outline-none focus:border-city-cyan transition-colors">
                    {roles.map((role) => (
                      <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-city-steel rounded-lg text-city-white hover:bg-city-slate transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-city-cyan text-city-dark rounded-lg hover:bg-city-cyan-light transition-colors font-medium">
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
