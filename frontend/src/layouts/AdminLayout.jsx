import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiBox, FiCalendar, FiMessageSquare, FiLogOut, FiSettings, FiGrid, FiFeather, FiStar, FiMail } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { name: 'Cabins', path: '/admin/cabins', icon: FiBox },
    { name: 'Bookings', path: '/admin/bookings', icon: FiCalendar },
    { name: 'Users', path: '/admin/users', icon: FiUsers },
    { name: 'Experiences', path: '/admin/experiences', icon: FiGrid },
    { name: 'Blogs', path: '/admin/blogs', icon: FiFeather },
    { name: 'Reviews', path: '/admin/reviews', icon: FiStar },
    { name: 'Messages', path: '/admin/messages', icon: FiMessageSquare },
    { name: 'Newsletter', path: '/admin/newsletter', icon: FiMail },
    { name: 'Settings', path: '/admin/settings', icon: FiSettings },
  ];

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f2937] text-white flex-col hidden md:flex h-full flex-shrink-0 z-10">
        <div className="p-6">
          <span className="text-2xl font-bold text-[#e5a452]">UNWIND</span>
          <span className="text-2xl font-bold text-white">ADMIN</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 py-4 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#375344] text-white' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              <item.icon /> {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white h-16 flex-shrink-0 shadow-sm flex items-center justify-between px-8 z-0">
          <h2 className="text-xl font-bold text-gray-800">Admin Portal</h2>
          <div className="flex items-center gap-4">
            <img src={user?.avatar?.url || '/default-avatar.png'} alt="Admin" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-medium text-gray-700">{user ? `${user.firstName} ${user.lastName}` : 'Admin'}</span>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
