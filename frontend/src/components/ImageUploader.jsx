import { useState, useRef, useEffect } from 'react';
import { FiUploadCloud, FiX, FiCheck, FiTrash2 } from 'react-icons/fi';
import uploadService from '../services/uploadService';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const ImageUploader = ({ 
  multiple = false, 
  folder = 'unwindcabins',
  onUploadSuccess,
  existingImages = [] // Array of { url, public_id }
}) => {
  const [files, setFiles] = useState([]); // Selected files not yet uploaded
  const [uploadedImages, setUploadedImages] = useState(existingImages);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUploadedImages(existingImages);
  }, [existingImages]);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(`${file.name} is not a supported format. Please use JPG, PNG or WEBP.`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`${file.name} exceeds the 5MB limit.`);
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
    // Reset input so the same file can be selected again if removed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (newFiles) => {
    const validFiles = newFiles.filter(validateFile);
    
    if (validFiles.length === 0) return;

    if (!multiple) {
      setFiles([validFiles[0]]);
    } else {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removePendingFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeUploadedImage = async (image, index) => {
    try {
      if (image.public_id) {
        await uploadService.deleteImage(image.public_id);
      }
      const newImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(newImages);
      onUploadSuccess(multiple ? newImages : null);
      toast.success('Image removed');
    } catch (error) {
      toast.error('Failed to remove image');
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    try {
      if (multiple) {
        const res = await uploadService.uploadMultiple(files, folder, (p) => setProgress(p));
        const newImages = [...uploadedImages, ...res.data];
        setUploadedImages(newImages);
        onUploadSuccess(newImages);
      } else {
        // Single upload - if there's an existing image, we might want to delete it first, 
        // but for now we just upload the new one and overwrite the state
        if (uploadedImages.length > 0 && uploadedImages[0].public_id) {
          await uploadService.deleteImage(uploadedImages[0].public_id).catch(() => {});
        }
        
        const res = await uploadService.uploadSingle(files[0], folder, (p) => setProgress(p));
        setUploadedImages([res.data]);
        onUploadSuccess(res.data);
      }
      
      setFiles([]);
      toast.success('Upload successful!');
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging ? 'border-[#375344] bg-[#375344]/5' : 'border-gray-300 hover:border-gray-400'} ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-700 font-medium mb-1">
          {isDragging ? 'Drop files here' : 'Click or drag files to upload'}
        </p>
        <p className="text-sm text-gray-500">
          JPG, PNG or WEBP up to 5MB. {multiple ? 'Multiple files allowed.' : 'Single file only.'}
        </p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept={ALLOWED_TYPES.join(',')}
          multiple={multiple}
        />
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1 text-gray-600">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#375344] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* Pending Files Preview */}
      {files.length > 0 && !uploading && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
            Ready to upload ({files.length})
            <button 
              onClick={handleUpload}
              className="bg-[#e5a452] hover:bg-[#d49642] text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
            >
              Start Upload
            </button>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={`${file.name}-${index}`} 
                  className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-50 flex items-center justify-center"
                >
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); removePendingFile(index); }}
                      className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove file"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Already Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Uploaded Images ({uploadedImages.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {uploadedImages.map((image, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={image.public_id || index} 
                  className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-50"
                >
                  <img src={image.url} alt="uploaded" className="w-full h-full object-cover" />
                  
                  {multiple && index === 0 && (
                    <div className="absolute top-2 left-2 bg-[#375344] text-white text-xs px-2 py-1 rounded font-medium shadow-sm">
                      Cover
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => removeUploadedImage(image, index)}
                      className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete from Cloudinary"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
