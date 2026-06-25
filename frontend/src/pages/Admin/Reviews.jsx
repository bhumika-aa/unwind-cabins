import { useState, useEffect } from 'react';
import { FiTrash2, FiStar } from 'react-icons/fi';
import reviewService from '../../services/reviewService';
import toast from 'react-hot-toast';

export const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await reviewService.getReviews();
      setReviews(res.data);
    } catch (err) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(id);
        toast.success('Review deleted successfully');
        fetchReviews();
      } catch (err) {
        toast.error('Failed to delete review');
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar key={i} className={`inline ${i < rating ? 'text-[#e5a452] fill-[#e5a452]' : 'text-gray-300'}`} size={14} />
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Reviews</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No reviews found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Cabin</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Comment</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-800 font-medium">
                      {review.user ? `${review.user.firstName} ${review.user.lastName}` : 'Deleted User'}
                    </td>
                    <td className="p-4 text-gray-600">{review.cabin ? review.cabin.title : 'Deleted Cabin'}</td>
                    <td className="p-4 text-gray-600">
                      <div className="flex gap-1">{renderStars(review.rating)}</div>
                    </td>
                    <td className="p-4 text-gray-600 max-w-xs truncate" title={review.comment}>{review.comment}</td>
                    <td className="p-4 flex items-center justify-end gap-3">
                      <button onClick={() => handleDelete(review._id)} className="text-red-500 hover:text-red-700 transition-colors"><FiTrash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
