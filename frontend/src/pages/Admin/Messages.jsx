import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import miscService from '../../services/miscService';
import toast from 'react-hot-toast';

export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await miscService.getMessages();
      setMessages(res.data);
    } catch (err) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await miscService.deleteMessage(id);
        toast.success('Message deleted');
        fetchMessages();
      } catch (err) {
        toast.error('Failed to delete message');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Messages</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No messages found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Message</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => (
                  <tr key={msg._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{msg.name}</td>
                    <td className="p-4 text-gray-600">{msg.email}</td>
                    <td className="p-4 text-gray-600 max-w-sm truncate" title={msg.message}>{msg.message}</td>
                    <td className="p-4 text-gray-600">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(msg._id)} className="text-red-500 hover:text-red-700">
                        <FiTrash2 size={18} />
                      </button>
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
