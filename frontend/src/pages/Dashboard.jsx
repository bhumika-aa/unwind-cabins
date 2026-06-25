import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar, FiHeart, FiSettings, FiLogOut, FiUpload, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import bookingService from '../services/bookingService';
import reviewService from '../services/reviewService';
import uploadService from '../services/uploadService';
import authService from '../services/authService';
import CabinCard from '../components/CabinCard';
import toast from 'react-hot-toast';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="bg-[#f4f7f6] min-h-screen py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6 self-start">
          <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
            <img 
              src={user?.avatar?.url || "https://i.pravatar.cc/150"} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover mb-4 border" 
            />
            <h3 className="text-xl font-bold text-[#1f2937]">{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</h3>
            <p className="text-sm text-gray-500">{user?.email || ''}</p>
          </div>
          
          <nav className="space-y-2">
            <NavLink to="/dashboard" end className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#375344] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FiUser /> Profile & Reviews
            </NavLink>
            <NavLink to="/dashboard/bookings" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#375344] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FiCalendar /> My Bookings
            </NavLink>
            <NavLink to="/dashboard/wishlist" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#375344] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FiHeart /> Wishlist
            </NavLink>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-4">
              <FiLogOut /> Logout
            </button>
          </nav>
        </div>

        {/* Content area */}
        <div className="flex-1">
          <Outlet />
        </div>
        
      </div>
    </div>
  );
};

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [reviews, setReviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
  }, [user]);

  const fetchUserReviews = async () => {
    try {
      const res = await reviewService.getReviews();
      if (res.success && user) {
        const userReviews = res.data.filter(r => r.user?._id === user._id || r.user === user._id);
        setReviews(userReviews);
      }
    } catch (error) {
      console.error('Failed to fetch user reviews', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, [user]);

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      return toast.error('All profile fields are required');
    }
    const success = await updateProfile({ firstName, lastName, email, avatar });
    if (success) {
      toast.success('Profile details updated successfully');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      return toast.error('Please enter current and new passwords');
    }
    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      const res = await authService.updatePassword({ currentPassword, newPassword });
      if (res.success) {
        toast.success('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (5MB) and type
    if (file.size > 5 * 1024 * 1024) {
      return toast.error('File size must not exceed 5MB');
    }
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      return toast.error('Only JPG, JPEG, PNG, and WEBP formats are allowed');
    }

    setUploading(true);
    try {
      const res = await uploadService.uploadSingle(file, 'avatars');
      if (res.success) {
        setAvatar(res.data);
        toast.success('Avatar uploaded. Please save changes.');
      }
    } catch (error) {
      toast.error('Avatar upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const res = await reviewService.deleteReview(id);
        if (res.success) {
          toast.success('Review deleted');
          fetchUserReviews();
        }
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold font-serif mb-6 text-[#1f2937]">Personal Information</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <img 
            src={avatar?.url || "https://i.pravatar.cc/150"} 
            alt="Preview" 
            className="w-20 h-20 rounded-full object-cover border" 
          />
          <div className="relative">
            <input 
              type="file" 
              id="avatarFile" 
              onChange={handleAvatarChange} 
              className="hidden" 
              accept="image/*" 
            />
            <label 
              htmlFor="avatarFile" 
              className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <FiUpload /> {uploading ? 'Uploading...' : 'Upload New Avatar'}
            </label>
          </div>
        </div>

        <form onSubmit={handleDetailsSubmit} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" 
            />
          </div>
          <button type="submit" className="bg-[#e5a452] hover:bg-[#d49642] text-white px-6 py-3 rounded-md font-medium transition-colors">
            Save Changes
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold font-serif mb-6 text-[#1f2937]">Update Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" 
              />
            </div>
          </div>
          <button type="submit" className="bg-[#375344] hover:bg-[#2c4236] text-white px-6 py-3 rounded-md font-medium transition-colors">
            Update Password
          </button>
        </form>
      </div>

      {/* My Reviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold font-serif mb-6 text-[#1f2937]">My Reviews</h2>
        {loadingReviews ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">You haven't posted any reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review._id} className="border-b pb-4 flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-bold text-[#1f2937]">{review.cabin?.title || 'Unknown Cabin'}</h4>
                  <div className="flex items-center gap-1 text-yellow-500 my-1">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    <span className="text-xs text-gray-400 ml-2">({review.rating}/5)</span>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
                <button 
                  onClick={() => handleDeleteReview(review._id)} 
                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await bookingService.getBookings();
      if (res.success) {
        setBookings(res.data);
      }
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const res = await bookingService.deleteBooking(id);
        if (res.success) {
          toast.success('Booking cancelled successfully');
          fetchBookings();
        }
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold font-serif mb-6 text-[#1f2937]">My Bookings</h2>
      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => {
            const cabinImage = booking.cabin?.images?.[0]?.url || 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&w=300&q=80';
            return (
              <div key={booking._id} className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-6">
                <img 
                  src={cabinImage} 
                  alt={booking.cabin?.title} 
                  className="w-full md:w-48 h-32 object-cover rounded-md" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#1f2937]">{booking.cabin?.title || 'Cabin Stay'}</h3>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()} • {booking.guests} Guests
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">£{booking.totalPrice}</span>
                    {booking.status !== 'cancelled' && booking.status !== 'completed' && booking.status !== 'refunded' && (
                      <button 
                        onClick={() => handleCancel(booking._id)} 
                        className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Wishlist = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold font-serif mb-6 text-[#1f2937]">My Wishlist</h2>
      {!user?.wishlist || user.wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {user.wishlist.map(cabin => (
            <CabinCard 
              key={cabin._id || cabin.id} 
              cabin={{
                id: cabin._id || cabin.id,
                image: cabin.images?.[0]?.url || 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&w=800&q=80',
                location: cabin.location,
                title: cabin.title,
                price: cabin.price,
                description: cabin.description,
                rating: cabin.rating,
                reviews: cabin.reviews
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
