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
  owner: "bg-purple-100 text-purple-700",
  admin: "bg-blue-100 text-blue-700",
  buyer: "bg-green-100 text-green-700",
  viewer: "bg-gray-100 text-gray-700",
  approver: "bg-yellow-100 text-yellow-700",
}

export function TeamMemberTable({ members, onRemove, onRoleChange, currentUserId }: TeamMemberTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Member</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Joined</th>
            <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="font-medium text-gray-900">{member.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">{member.email}</td>
              <td className="py-3 px-4">
                {onRoleChange && member.id !== currentUserId && member.role !== 'owner' ? (
                  <select
                    value={member.role}
                    onChange={(e) => onRoleChange(member.id, e.target.value as CompanyUser["role"])}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="admin">Administrator</option>
                    <option value="buyer">Buyer</option>
                    <option value="viewer">Viewer</option>
                    <option value="approver">Approver</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleBadgeColors[member.role] || 'bg-gray-100 text-gray-700'}`}>
                    {roleLabels[member.role] || member.role}
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : 'N/A'}
              </td>
              <td className="py-3 px-4 text-right">
                {onRemove && member.id !== currentUserId && member.role !== "owner" && (
                  <button
                    onClick={() => onRemove(member.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
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
