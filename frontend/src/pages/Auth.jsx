import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import toast from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login({ email, password });
    setLoading(false);
    if (success) {
      try {
        const me = await authService.getMe();
        navigate(me.data?.role === 'admin' ? '/admin/dashboard' : '/dashboard');
      } catch {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold font-serif mb-2 text-[#1f2937]">Welcome back</h1>
            <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344] focus:border-transparent" placeholder="Enter your email" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344] focus:border-transparent" placeholder="••••••••" />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-[#375344] border-gray-300 rounded focus:ring-[#375344]" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-[#375344] hover:underline">Forgot password?</Link>
              </div>
              
              <button type="submit" disabled={loading} className="w-full bg-[#375344] hover:bg-[#2d4336] text-white py-3 rounded-md font-medium transition-colors mt-6 disabled:opacity-70">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account? <Link to="/register" className="font-medium text-[#375344] hover:underline">Sign up</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&w=1000&q=80')" }}>
        <div className="h-full w-full bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-4xl font-serif font-bold mb-4">UnwindCabins</h2>
            <p className="text-lg text-gray-200">Your perfect getaway is just a click away.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const success = await register(formData);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&w=1000&q=80')" }}>
        <div className="h-full w-full bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Join Us</h2>
            <p className="text-lg text-gray-200">Start planning your dream cabin vacation.</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold font-serif mb-2 text-[#1f2937]">Create an account</h1>
            <p className="text-gray-500 mb-8">Please enter your details to register.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="Enter your email" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="••••••••" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="••••••••" />
              </div>
              
              <div className="flex items-start">
                <input type="checkbox" required className="mt-1 w-4 h-4 text-[#375344] border-gray-300 rounded focus:ring-[#375344]" />
                <span className="ml-2 text-sm text-gray-600">I agree to the <Link to="/terms" className="text-[#375344] hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#375344] hover:underline">Privacy Policy</Link></span>
              </div>
              
              <button type="submit" disabled={loading} className="w-full bg-[#375344] hover:bg-[#2d4336] text-white py-3 rounded-md font-medium transition-colors mt-6 disabled:opacity-70">
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/login" className="font-medium text-[#375344] hover:underline">Sign in</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
