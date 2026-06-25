import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 md:px-12 lg:px-24 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-1">
        <span className="text-2xl font-bold text-[#375344]">UNWIND</span>
        <span className="text-2xl font-bold text-[#1f2937]">CABINS</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/cabins" className="text-gray-700 hover:text-[#375344] font-medium transition-colors">Our cabins</Link>
        <Link to="/experiences" className="text-gray-700 hover:text-[#375344] font-medium transition-colors">Get inspired</Link>
        <Link to="/gift" className="text-gray-700 hover:text-[#375344] font-medium transition-colors">Gift a stay</Link>
        <Link to="/about" className="text-gray-700 hover:text-[#375344] font-medium transition-colors">About us</Link>
      </div>
      
      <div className="flex items-center">
        <Link to="/profile" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
          <FiUser size={20} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
