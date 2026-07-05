import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Cabins from './pages/Cabins';
import CabinDetails from './pages/CabinDetails';
import { Login, Register } from './pages/Auth';
import { DashboardLayout, Profile, Bookings, Wishlist } from './pages/Dashboard';
import { Experiences } from './pages/Experiences';
import { About, Contact, NotFound, StaticPage, GiftCard } from './pages/StaticPages';
import { ForgotPassword, ResetPassword } from './pages/PasswordReset';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { AdminCabins, AdminPlaceholder } from './pages/Admin/Cabins';
import { AdminBlogs } from './pages/Admin/Blogs';
import { AdminExperiences } from './pages/Admin/Experiences';
import { AdminUsers } from './pages/Admin/Users';
import { AdminBookings } from './pages/Admin/Bookings';
import { AdminReviews } from './pages/Admin/Reviews';
import { AdminMessages } from './pages/Admin/Messages';
import { AdminNewsletter } from './pages/Admin/Newsletter';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Admin Routes (Protected + Admin Only) */}
      <Route path="admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cabins" element={<AdminCabins />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="experiences" element={<AdminExperiences />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="newsletter" element={<AdminNewsletter />} />
        </Route>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        
        {/* Public Routes */}
        <Route path="cabins" element={<Cabins />} />
        <Route path="cabins/:id" element={<CabinDetails />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gift" element={<GiftCard />} />
        <Route path="terms" element={<StaticPage title="Terms & Conditions" />} />
        <Route path="privacy" element={<StaticPage title="Privacy Policy" />} />
        
        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        
        {/* Dashboard Routes (Protected) */}
        <Route path="dashboard" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="settings" element={<StaticPage title="Settings" />} />
          </Route>
        </Route>

        {/* Profile aliases → redirect to /dashboard */}
        <Route path="profile" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="settings" element={<StaticPage title="Settings" />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
