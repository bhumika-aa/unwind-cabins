import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export const AdminSettings = () => {
  const { user } = useAuth();
  
  // Initialize with some default realistic values or user values
  const [settings, setSettings] = useState({
    siteName: 'UnwindCabins',
    supportEmail: 'support@unwindcabins.com',
    currency: '£',
    bookingServiceFee: 15,
    bookingCleaningFee: 90,
  });

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const [saving, setSaving] = useState(false);

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully');
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      setSettings({
        siteName: 'UnwindCabins',
        supportEmail: 'support@unwindcabins.com',
        currency: '£',
        bookingServiceFee: 15,
        bookingCleaningFee: 90,
      });
      if (user) {
        setProfile({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
        });
      }
      toast.success('Changes discarded');
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Platform Settings</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Profile</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 border-4 border-white shadow-md">
              <img 
                src={user?.avatar?.url || '/default-avatar.png'} 
                alt="Profile Preview" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/default-avatar.png'; }}
              />
            </div>
            <p className="text-sm text-gray-500 font-medium">Avatar Preview</p>
            <p className="text-xs text-gray-400 text-center mt-2">
              Update avatar from the main dashboard profile page.
            </p>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input 
              type="text" 
              name="siteName"
              value={settings.siteName}
              onChange={handleSettingsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <input 
              type="email" 
              name="supportEmail"
              value={settings.supportEmail}
              onChange={handleSettingsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select 
              name="currency"
              value={settings.currency}
              onChange={handleSettingsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
            >
              <option value="£">GBP (£)</option>
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Service Fee</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{settings.currency}</span>
              <input 
                type="number" 
                name="bookingServiceFee"
                value={settings.bookingServiceFee}
                onChange={handleSettingsChange}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Cleaning Fee</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{settings.currency}</span>
              <input 
                type="number" 
                name="bookingCleaningFee"
                value={settings.bookingCleaningFee}
                onChange={handleSettingsChange}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button 
          onClick={handleReset}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-[#375344] text-white rounded-md font-medium hover:bg-[#2c4236] transition-colors disabled:opacity-70"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
