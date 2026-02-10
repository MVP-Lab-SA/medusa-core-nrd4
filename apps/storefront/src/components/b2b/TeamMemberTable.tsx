import { User, Trash } from "@medusajs/icons"

interface CompanyUser {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'buyer' | 'viewer' | 'approver'
  joinedAt: string
}

interface TeamMemberTableProps {
  members: CompanyUser[]
  onRemove?: (userId: string) => void
  onRoleChange?: (userId: string, role: CompanyUser["role"]) => void
  currentUserId?: string
}

const roleLabels: Record<string, string> = {
  owner: "Owner",
  admin: "Administrator",
  buyer: "Buyer",
  viewer: "Viewer",
  approver: "Approver",
}

const roleBadgeColors: Record<string, string> = {
  owner: "bg-purple-500/20 text-purple-400",
  admin: "bg-cyan-500/20 text-cyan-400",
  buyer: "bg-emerald-500/20 text-emerald-400",
  viewer: "bg-gray-700 text-gray-300",
  approver: "bg-amber-500/20 text-amber-400",
}

export function TeamMemberTable({ members, onRemove, onRoleChange, currentUserId }: TeamMemberTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-3 px-4 font-medium text-gray-400">Member</th>
            <th className="text-left py-3 px-4 font-medium text-gray-400">Email</th>
            <th className="text-left py-3 px-4 font-medium text-gray-400">Role</th>
            <th className="text-left py-3 px-4 font-medium text-gray-400">Joined</th>
            <th className="text-right py-3 px-4 font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-medium text-white">{member.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-400">{member.email}</td>
              <td className="py-3 px-4">
                {onRoleChange && member.id !== currentUserId && member.role !== 'owner' ? (
                  <select
                    value={member.role}
                    onChange={(e) => onRoleChange(member.id, e.target.value as CompanyUser["role"])}
                    className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
                  >
                    <option value="admin">Administrator</option>
                    <option value="buyer">Buyer</option>
                    <option value="viewer">Viewer</option>
                    <option value="approver">Approver</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleBadgeColors[member.role] || 'bg-gray-700 text-gray-300'}`}>
                    {roleLabels[member.role] || member.role}
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-gray-400">
                {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : 'N/A'}
              </td>
              <td className="py-3 px-4 text-right">
                {onRemove && member.id !== currentUserId && member.role !== "owner" && (
                  <button
                    onClick={() => onRemove(member.id)}
                    className="p-2 text-gray-500 hover:text-red-400"
                    title="Remove member"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
