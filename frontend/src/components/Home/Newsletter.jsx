import { useState } from 'react';
import miscService from '../../services/miscService';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await miscService.subscribeNewsletter(email);
      toast.success('Successfully subscribed to the newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#375344] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#e5a452]/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
          Sign up to our newsletter
        </h2>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          For exclusive discounts, early access to new cabins, and travel inspiration straight to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <input 
            type="email" 
            placeholder="Email address" 
            className="px-6 py-4 rounded-md text-gray-800 w-full sm:w-2/3 outline-none focus:ring-2 focus:ring-[#e5a452] transition-shadow"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#e5a452] hover:bg-[#d49642] px-8 py-4 rounded-md text-white font-bold transition-colors w-full sm:w-1/3 disabled:opacity-70"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
