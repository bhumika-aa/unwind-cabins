import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import experienceService from '../../services/experienceService';
import ImageUploader from '../../components/ImageUploader';
import toast from 'react-hot-toast';

export const AdminExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', category: ''
  });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchExperiences = async () => {
    try {
      const res = await experienceService.getExperiences();
      setExperiences(res.data);
    } catch (err) {
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenModal = (experience = null) => {
    if (experience) {
      setCurrentExperience(experience);
      setFormData({
        title: experience.title, description: experience.description,
        category: experience.category || ''
      });
      setImages(experience.image ? [experience.image] : []);
    } else {
      setCurrentExperience(null);
      setFormData({
        title: '', description: '', category: ''
      });
      setImages([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentExperience(null);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImagesUploaded = (uploadedImages) => {
    const imageToSet = Array.isArray(uploadedImages) ? uploadedImages[0] : uploadedImages;
    setImages(imageToSet ? [imageToSet] : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please upload an image for the experience');
      return;
    }

    setSubmitting(true);
    const experienceData = {
      ...formData,
      image: images[0]
    };

    try {
      if (currentExperience) {
        await experienceService.updateExperience(currentExperience._id, experienceData);
        toast.success('Experience updated successfully');
      } else {
        await experienceService.createExperience(experienceData);
        toast.success('Experience created successfully');
      }
      fetchExperiences();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience? This will also delete its image.')) {
      try {
        await experienceService.deleteExperience(id);
        toast.success('Experience deleted successfully');
        fetchExperiences();
      } catch (err) {
        toast.error('Failed to delete experience');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Experiences</h1>
        <button onClick={() => handleOpenModal()} className="bg-[#375344] hover:bg-[#2d4336] text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
          <FiPlus /> Add New Experience
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading experiences...</div>
        ) : experiences.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No experiences found. Add one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-medium">Experience</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map(exp => (
                  <tr key={exp._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-4">
                      {exp.image ? (
                        <img src={exp.image.url} alt="exp" className="w-16 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded"></div>
                      )}
                      <span className="font-medium text-gray-800">{exp.title}</span>
                    </td>
                    <td className="p-4 text-gray-600">{exp.category || '—'}</td>
                    <td className="p-4 flex items-center justify-end gap-3">
                      <button onClick={() => handleOpenModal(exp)} className="text-blue-500 hover:text-blue-700 transition-colors"><FiEdit size={18} /></button>
                      <button onClick={() => handleDelete(exp._id)} className="text-red-500 hover:text-red-700 transition-colors"><FiTrash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentExperience ? 'Edit Experience' : 'Add New Experience'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]">
                    <option value="">Select category</option>
                    <option value="nature">Nature</option>
                    <option value="relax">Relax</option>
                    <option value="adventure">Adventure</option>
                    <option value="pets">Pets</option>
                    <option value="food">Food & Drink</option>
                    <option value="culture">Culture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Image</label>
                <ImageUploader 
                  multiple={false} 
                  folder="unwindcabins/experiences" 
                  onUploadSuccess={handleImagesUploaded} 
                  existingImages={images} 
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="bg-[#375344] hover:bg-[#2d4336] text-white px-8 py-2 rounded-md font-medium transition-colors disabled:opacity-70">
                  {submitting ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
