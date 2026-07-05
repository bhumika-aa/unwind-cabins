import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiLinkedin } from 'react-icons/fi';
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0f1715] text-white pt-20 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
          
          <div className="lg:col-span-1">
            <h4 className="text-[#a3e635] font-bold mb-6">About us</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">Our story</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Why us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="text-[#a3e635] font-bold mb-6">Our cabins</h4>
            <div className="space-y-6">
              <div>
                <p className="text-gray-300 text-sm mb-4">North of London</p>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><Link to="/cabins" className="hover:text-white transition-colors">Golden Hideaway</Link></li>
                  <li><Link to="/cabins" className="hover:text-white transition-colors">Oak Treehouse</Link></li>
                  <li><Link to="/cabins" className="hover:text-white transition-colors">Acacia Retreat</Link></li>
                  <li><Link to="/cabins" className="hover:text-white transition-colors">Blue Lagoon</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-4">South of London</p>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><Link to="/cabins" className="hover:text-white transition-colors">Lavender Retreat</Link></li>
                  <li><Link to="/cabins" className="hover:text-white transition-colors">Butterfly Treehouse</Link></li>
                  <li><Link to="/cabins" className="hover:text-white transition-colors">Mahogany Hideaway</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-[#a3e635] font-bold mb-6">Get inspired</h4>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to="/experiences" className="hover:text-white transition-colors">Explore nature</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Hiking trails</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Swimming</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Fishing</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Boating</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Cycling</Link></li>
              </ul>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to="/experiences" className="hover:text-white transition-colors">Rest, relax and re-set</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Spa treatments</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Hot tubs</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Nature Trails</Link></li>
              </ul>
              <ul className="space-y-4 text-sm text-gray-400 mt-4 md:mt-0">
                <li><Link to="/experiences" className="hover:text-white transition-colors">Great food and drink</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Pubs</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Restaurants</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Food markets</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Picnics</Link></li>
              </ul>
              <ul className="space-y-4 text-sm text-gray-400 mt-4 md:mt-0">
                <li><Link to="/experiences" className="hover:text-white transition-colors">For you and yours</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Solo or a couple</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Pet friendly</Link></li>
                <li><Link to="/experiences" className="hover:text-white transition-colors">Accessible cabins</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="text-[#a3e635] font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Help</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Complaints Policy</Link></li>
            </ul>
          </div>
          
        </div>

        {/* Newsletter Section */}
        <div className="mb-16">
          <h3 className="text-[#a3e635] font-bold text-xl mb-4">Sign up to our Newsletter</h3>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              For a weekly curated collection of 3 things you can watch, read or listen to switch off from the busy everyday.
            </p>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-xl gap-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="james@thegiantpeach.com"
                className="px-6 py-4 w-full rounded-md text-gray-800 outline-none text-sm bg-white"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#fbbf24] px-8 py-4 rounded-md text-gray-900 font-bold hover:bg-[#f59e0b] transition-colors shrink-0 disabled:opacity-70"
              >
                {loading ? '...' : 'Join the mailing list'}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-px bg-gray-800 mb-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold tracking-wider text-[#a3e635]">
            UNWINDCABINS
          </Link>
          <div className="text-sm text-gray-500">
            &copy; 2023 UnwindCabins
          </div>
          <div className="flex items-center gap-6 text-gray-500">
            <a href="#" className="hover:text-white transition-colors"><FiLinkedin size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FiTwitter size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FiFacebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FiInstagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FiYoutube size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
