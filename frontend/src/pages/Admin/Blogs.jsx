import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import blogService from '../../services/blogService';
import ImageUploader from '../../components/ImageUploader';
import toast from 'react-hot-toast';

export const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', content: '', author: '', tags: ''
  });
  const [images, setImages] = useState([]); // will hold max 1 image since it's a featured image
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await blogService.getBlogs();
      setBlogs(res.data);
    } catch (err) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setCurrentBlog(blog);
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author || 'Admin',
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : ''
      });
      setImages(blog.image ? [blog.image] : []);
    } else {
      setCurrentBlog(null);
      setFormData({
        title: '', content: '', author: '', tags: ''
      });
      setImages([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBlog(null);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImagesUploaded = (uploadedImages) => {
    // uploadedImages is an array (even for single uploads if ImageUploader returns array, or single obj)
    // For single, our ImageUploader returns the new images array or object depending on multiple prop.
    // Since multiple={false}, it returns a single object. We store it in an array to map easily or just as object.
    const imageToSet = Array.isArray(uploadedImages) ? uploadedImages[0] : uploadedImages;
    setImages(imageToSet ? [imageToSet] : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please upload a featured image');
      return;
    }

    setSubmitting(true);
    const blogData = {
      title: formData.title,
      content: formData.content,
      author: formData.author || 'Admin',
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      image: images[0]
    };

    try {
      if (currentBlog) {
        await blogService.updateBlog(currentBlog._id, blogData);
        toast.success('Blog updated successfully');
      } else {
        await blogService.createBlog(blogData);
        toast.success('Blog created successfully');
      }
      fetchBlogs();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog? This will also delete its featured image.')) {
      try {
        await blogService.deleteBlog(id);
        toast.success('Blog deleted successfully');
        fetchBlogs();
      } catch (err) {
        toast.error('Failed to delete blog');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
        <button onClick={() => handleOpenModal()} className="bg-[#375344] hover:bg-[#2d4336] text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
          <FiPlus /> Add New Blog
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No blogs found. Add one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-medium">Blog</th>
                  <th className="p-4 font-medium">Tags</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-4">
                      {blog.image ? (
                        <img src={blog.image.url} alt="blog" className="w-16 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded"></div>
                      )}
                      <span className="font-medium text-gray-800">{blog.title}</span>
                    </td>
                    <td className="p-4 text-gray-600">{Array.isArray(blog.tags) ? blog.tags.join(', ') : '—'}</td>
                    <td className="p-4 text-gray-600">{blog.author}</td>
                    <td className="p-4 flex items-center justify-end gap-3">
                      <button onClick={() => handleOpenModal(blog)} className="text-blue-500 hover:text-blue-700 transition-colors"><FiEdit size={18} /></button>
                      <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:text-red-700 transition-colors"><FiTrash2 size={18} /></button>
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
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Travel, Nature, Hiking" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} required rows="8" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                <ImageUploader 
                  multiple={false} 
                  folder="unwindcabins/blogs" 
                  onUploadSuccess={handleImagesUploaded} 
                  existingImages={images} 
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="bg-[#375344] hover:bg-[#2d4336] text-white px-8 py-2 rounded-md font-medium transition-colors disabled:opacity-70">
                  {submitting ? 'Saving...' : 'Save Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
