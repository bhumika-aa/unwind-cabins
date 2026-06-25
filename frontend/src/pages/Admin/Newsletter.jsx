import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import miscService from '../../services/miscService';
import toast from 'react-hot-toast';

export const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const res = await miscService.getSubscribers();
      setSubscribers(res.data);
    } catch (err) {
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this subscriber?')) {
      try {
        await miscService.deleteSubscriber(id);
        toast.success('Subscriber deleted');
        fetchSubscribers();
      } catch (err) {
        toast.error('Failed to delete subscriber');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Newsletter Subscribers</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading subscribers...</div>
        ) : subscribers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No subscribers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Subscribed Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(sub => (
                  <tr key={sub._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-600">{sub.email}</td>
                    <td className="p-4 text-gray-600">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(sub._id)} className="text-red-500 hover:text-red-700">
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
