import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authService.getMe();
        if (res.success) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for global auth errors from axios interceptor
    const handleAuthError = () => {
      setUser(null);
      setIsAuthenticated(false);
    };
    
    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, []);

  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      setUser(res.data);
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      return false; // Error handled by axios interceptor toast
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      setUser(res.data);
      setIsAuthenticated(true);
      toast.success('Registered successfully');
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await authService.updateProfile(profileData);
      setUser(res.data);
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
