import { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiTrash2, FiClock } from 'react-icons/fi';
import bookingService from '../../services/bookingService';
import toast from 'react-hot-toast';

export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await bookingService.getBookings();
      setBookings(res.data);
    } catch (err) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await bookingService.updateBooking(id, { status });
      toast.success(`Booking status updated to ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingService.deleteBooking(id);
        toast.success('Booking deleted successfully');
        fetchBookings();
      } catch (err) {
        toast.error('Failed to delete booking');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Confirmed</span>;
      case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Pending</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Cancelled</span>;
      case 'completed': return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Completed</span>;
      case 'refunded': return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Refunded</span>;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Cabin</th>
                  <th className="p-4 font-medium">Dates</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-800 font-medium">{booking.user ? `${booking.user.firstName} ${booking.user.lastName}` : 'Deleted User'}</td>
                    <td className="p-4 text-gray-600">{booking.cabin ? booking.cabin.title : 'Deleted Cabin'}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-600">£{booking.totalPrice}</td>
                    <td className="p-4">{getStatusBadge(booking.status)}</td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button onClick={() => handleUpdateStatus(booking._id, 'confirmed')} title="Approve" className="text-green-500 hover:text-green-700 transition-colors"><FiCheckCircle size={18} /></button>
                      <button onClick={() => handleUpdateStatus(booking._id, 'cancelled')} title="Cancel" className="text-orange-500 hover:text-orange-700 transition-colors"><FiXCircle size={18} /></button>
                      <button onClick={() => handleUpdateStatus(booking._id, 'completed')} title="Complete" className="text-blue-500 hover:text-blue-700 transition-colors"><FiClock size={18} /></button>
                      <button onClick={() => handleDelete(booking._id)} title="Delete" className="text-red-500 hover:text-red-700 transition-colors ml-2"><FiTrash2 size={18} /></button>
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
