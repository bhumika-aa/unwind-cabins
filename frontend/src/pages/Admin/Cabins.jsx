import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import cabinService from '../../services/cabinService';
import ImageUploader from '../../components/ImageUploader';
import toast from 'react-hot-toast';

export const AdminCabins = () => {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCabin, setCurrentCabin] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '', location: '', price: '', maxGuests: '', bedrooms: '', beds: '', bathrooms: '', description: '', amenities: ''
  });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchCabins = async () => {
    try {
      const res = await cabinService.getCabins();
      setCabins(res.data);
    } catch (err) {
      toast.error('Failed to load cabins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCabins();
  }, []);

  const handleOpenModal = (cabin = null) => {
    if (cabin) {
      setCurrentCabin(cabin);
      setFormData({
        title: cabin.title, location: cabin.location, price: cabin.price, maxGuests: cabin.maxGuests,
        bedrooms: cabin.bedrooms, beds: cabin.beds, bathrooms: cabin.bathrooms, 
        description: cabin.description, amenities: cabin.amenities.join(', ')
      });
      setImages(cabin.images || []);
    } else {
      setCurrentCabin(null);
      setFormData({
        title: '', location: '', price: '', maxGuests: '', bedrooms: '', beds: '', bathrooms: '', description: '', amenities: ''
      });
      setImages([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCabin(null);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImagesUploaded = (uploadedImages) => {
    setImages(uploadedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setSubmitting(true);
    const cabinData = {
      ...formData,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
      images
    };

    try {
      if (currentCabin) {
        await cabinService.updateCabin(currentCabin._id, cabinData);
        toast.success('Cabin updated successfully');
      } else {
        await cabinService.createCabin(cabinData);
        toast.success('Cabin created successfully');
      }
      fetchCabins();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cabin? This will also delete all associated images from Cloudinary.')) {
      try {
        await cabinService.deleteCabin(id);
        toast.success('Cabin deleted successfully');
        fetchCabins();
      } catch (err) {
        toast.error('Failed to delete cabin');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Cabins</h1>
        <button onClick={() => handleOpenModal()} className="bg-[#375344] hover:bg-[#2d4336] text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
          <FiPlus /> Add New Cabin
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading cabins...</div>
        ) : cabins.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No cabins found. Add one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-medium">Cabin</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Price/Night</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cabins.map(cabin => (
                  <tr key={cabin._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-4">
                      {cabin.images && cabin.images.length > 0 ? (
                        <img src={cabin.images[0].url} alt="cabin" className="w-16 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded"></div>
                      )}
                      <span className="font-medium text-gray-800">{cabin.title}</span>
                    </td>
                    <td className="p-4 text-gray-600">{cabin.location}</td>
                    <td className="p-4 text-gray-600">£{cabin.price}</td>
                    <td className="p-4 flex items-center justify-end gap-3">
                      <button onClick={() => handleOpenModal(cabin)} className="text-blue-500 hover:text-blue-700 transition-colors"><FiEdit size={18} /></button>
                      <button onClick={() => handleDelete(cabin._id)} className="text-red-500 hover:text-red-700 transition-colors"><FiTrash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentCabin ? 'Edit Cabin' : 'Add New Cabin'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night (£)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                  <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
                  <input type="number" name="beds" value={formData.beds} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
                  <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" placeholder="Wifi, Kitchen, Hot tub" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                <ImageUploader 
                  multiple={true} 
                  folder="unwindcabins/cabins" 
                  onUploadSuccess={handleImagesUploaded} 
                  existingImages={images} 
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="bg-[#375344] hover:bg-[#2d4336] text-white px-8 py-2 rounded-md font-medium transition-colors disabled:opacity-70">
                  {submitting ? 'Saving...' : 'Save Cabin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminPlaceholder = ({ title }) => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage {title}</h1>
    <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
      CRUD interface for {title} will be rendered here.
    </div>
  </div>
);
