import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../services/authService';
import toast from 'react-hot-toast';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSubmitted(true);
      toast.success('Password reset email sent!');
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f4f7f6] px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-serif font-bold text-[#1f2937] mb-2 text-center">Forgot Password</h2>
          
          {submitted ? (
            <div className="text-center mt-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <p className="text-gray-600 mb-6">We've sent an email to <strong>{email}</strong> with instructions to reset your password.</p>
              <Link to="/login" className="text-[#375344] font-medium hover:underline">Return to Login</Link>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-center mb-8">Enter your email address and we'll send you a link to reset your password.</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="Enter your email" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#375344] hover:bg-[#2d4336] text-white py-3 rounded-md font-medium transition-colors disabled:opacity-70">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm font-medium text-[#375344] hover:underline">Back to Login</Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f4f7f6] px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-serif font-bold text-[#1f2937] mb-2 text-center">Set New Password</h2>
          <p className="text-gray-500 text-center mb-8">Please enter your new password below.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#375344] hover:bg-[#2d4336] text-white py-3 rounded-md font-medium transition-colors mt-6 disabled:opacity-70">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
