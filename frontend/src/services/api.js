import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., token expired)
      // We don't want to show toast for every 401 on initial load (like /me check)
      if (error.config.url !== '/auth/me') {
        toast.error('Session expired. Please login again.');
        // Could dispatch event to trigger logout in context
        window.dispatchEvent(new Event('auth-error'));
      }
    } else if (error.response?.status === 403) {
      toast.error('You are not authorized to perform this action.');
    } else if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.config.url !== '/auth/me') {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
