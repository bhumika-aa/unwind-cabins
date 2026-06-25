import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiUserCheck, FiUserX, FiShield, FiUser } from 'react-icons/fi';
import userService from '../../services/userService';
import toast from 'react-hot-toast';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await userService.getUsers();
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (user) => {
    if (user.email === 'admin@unwindcabins.com') {
      toast.error('Cannot change primary admin role');
      return;
    }
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Are you sure you want to make this user an ${newRole}?`)) {
      try {
        await userService.updateUser(user._id, { role: newRole });
        toast.success(`User role updated to ${newRole}`);
        fetchUsers();
      } catch (err) {
        toast.error('Failed to update user role');
      }
    }
  };

  const handleDelete = async (id, email) => {
    if (email === 'admin@unwindcabins.com') {
      toast.error('Cannot delete primary admin');
      return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-4">
                      {user.avatar && user.avatar.url ? (
                        <img src={user.avatar.url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500"><FiUser /></div>
                      )}
                      <span className="font-medium text-gray-800">{user.firstName} {user.lastName}</span>
                    </td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4 text-gray-600">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 flex items-center justify-end gap-3">
                      <button onClick={() => handleRoleChange(user)} title="Toggle Role" className="text-gray-500 hover:text-[#e5a452] transition-colors">
                        {user.role === 'admin' ? <FiUserX size={18} /> : <FiShield size={18} />}
                      </button>
                      <button onClick={() => handleDelete(user._id, user.email)} className="text-red-500 hover:text-red-700 transition-colors"><FiTrash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
