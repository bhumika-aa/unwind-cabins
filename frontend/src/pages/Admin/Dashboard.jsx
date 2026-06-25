import { useState, useEffect } from 'react';
import { FiUsers, FiBox, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import cabinService from '../../services/cabinService';
import bookingService from '../../services/bookingService';
import userService from '../../services/userService';
import reviewService from '../../services/reviewService';

const StatCard = ({ title, value, icon: Icon, color, loading }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center text-white shrink-0`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      {loading ? (
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-1" />
      ) : (
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      )}
    </div>
  </div>
);

export const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, cabins: 0, bookings: 0, revenue: 0, reviews: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cabinsRes, bookingsRes, usersRes, reviewsRes] = await Promise.all([
          cabinService.getCabins('?limit=100'),
          bookingService.getBookings(),
          userService.getUsers(),
          reviewService.getReviews(),
        ]);

        const bookings = bookingsRes.data || [];
        const revenue = bookings
          .filter(b => b.status === 'confirmed' || b.status === 'completed')
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

        setStats({
          cabins: cabinsRes.count || 0,
          bookings: bookings.length,
          users: usersRes.count || 0,
          revenue: revenue,
          reviews: reviewsRes.count || 0,
        });

        // 5 most recent bookings
        setRecentBookings(bookings.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `£${stats.revenue.toLocaleString()}`, icon: FiDollarSign, color: 'bg-green-500' },
    { title: 'Total Bookings', value: stats.bookings, icon: FiCalendar, color: 'bg-blue-500' },
    { title: 'Total Cabins', value: stats.cabins, icon: FiBox, color: 'bg-[#e5a452]' },
    { title: 'Total Users', value: stats.users, icon: FiUsers, color: 'bg-purple-500' },
    { title: 'Total Reviews', value: stats.reviews, icon: FiTrendingUp, color: 'bg-rose-500' },
  ];

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
    refunded: 'bg-gray-100 text-gray-800',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {statCards.map(card => (
          <StatCard key={card.title} {...card} loading={loading} />
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Bookings</h2>
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="pb-3 font-medium">Cabin</th>
                  <th className="pb-3 font-medium">Guest</th>
                  <th className="pb-3 font-medium">Check-In</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-800">{b.cabin?.title || '—'}</td>
                    <td className="py-3 text-gray-600">
                      {b.user?.firstName ? `${b.user.firstName} ${b.user.lastName}` : '—'}
                    </td>
                    <td className="py-3 text-gray-600">{new Date(b.checkIn).toLocaleDateString()}</td>
                    <td className="py-3 font-medium">£{b.totalPrice}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor[b.status] || 'bg-gray-100'}`}>
                        {b.status?.toUpperCase()}
                      </span>
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
