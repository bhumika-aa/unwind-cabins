import { useState } from 'react';
import { Link } from 'react-router-dom';
import miscService from '../services/miscService';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Please enter your email');
    setLoading(true);
    try {
      await miscService.subscribeNewsletter(email);
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      // Error handled by axios interceptor (409 = duplicate, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#375344] text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 font-serif">UnwindCabins</h3>
          <p className="text-sm text-gray-200">
            Leave the office behind and unwind in our cozy cabins nestled in the heart of nature.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/cabins" className="hover:text-white transition-colors">Our Cabins</Link></li>
            <li><Link to="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/gift" className="hover:text-white transition-colors">Gift a Stay</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <p className="text-sm text-gray-200 mb-4">Subscribe for updates and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              className="px-4 py-2 w-full rounded-l-md text-gray-800 outline-none text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#e5a452] px-4 py-2 rounded-r-md text-white font-medium hover:bg-[#d49642] transition-colors shrink-0 disabled:opacity-70"
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-12 pt-6 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} UnwindCabins. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
