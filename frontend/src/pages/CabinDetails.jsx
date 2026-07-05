import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiUsers, FiHeart, FiShare2, FiStar, FiCheck, FiCalendar, FiLoader } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import cabinService from '../services/cabinService';
import bookingService from '../services/bookingService';
import reviewService from '../services/reviewService';
import toast from 'react-hot-toast';

const CabinDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, toggleWishlist } = useAuth();

  const [cabin, setCabin] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);

  // Booking state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Review state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cabinRes, reviewsRes] = await Promise.all([
          cabinService.getCabin(id),
          reviewService.getReviews(),
        ]);
        setCabin(cabinRes.data);
        // filter reviews that belong to this cabin
        const cabinReviews = reviewsRes.data.filter(r =>
          (r.cabin?._id || r.cabin) === id
        );
        setReviews(cabinReviews);
      } catch (err) {
        toast.error('Failed to load cabin details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const calcNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calcNights();
  const cabinCost = cabin ? cabin.price * nights : 0;
  const cleaningFee = 45;
  const serviceFee = 60;
  const total = cabinCost + (nights > 0 ? cleaningFee + serviceFee : 0);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to make a booking');
      navigate('/login');
      return;
    }
    if (!checkIn || !checkOut) return toast.error('Please select check-in and check-out dates');
    if (nights <= 0) return toast.error('Check-out must be after check-in');

    setBookingLoading(true);
    try {
      const res = await bookingService.createBooking(id, { checkIn, checkOut, guests: Number(guests) });
      if (res.success) {
        toast.success('Booking created! View it in your dashboard.');
        navigate('/dashboard/bookings');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to leave a review');
      navigate('/login');
      return;
    }
    if (!comment.trim()) return toast.error('Please write a comment');

    setReviewLoading(true);
    try {
      const res = await reviewService.createReview({ cabin: id, rating, comment });
      if (res.success) {
        toast.success('Review submitted!');
        setComment('');
        setRating(5);
        // Re-fetch reviews
        const reviewsRes = await reviewService.getReviews();
        const cabinReviews = reviewsRes.data.filter(r => (r.cabin?._id || r.cabin) === id);
        setReviews(cabinReviews);
        // Update cabin rating display
        const cabinRes = await cabinService.getCabin(id);
        setCabin(cabinRes.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#375344]" />
      </div>
    );
  }

  if (!cabin) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Cabin not found.</p>
      </div>
    );
  }

  const images = cabin.images?.length > 0
    ? cabin.images.map(img => img.url)
    : ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200&q=80'];

  const today = new Date().toISOString().split('T')[0];

  const isSaved = user?.wishlist?.some(item => 
    (typeof item === 'object' ? item._id : item) === id
  );

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save cabins');
      navigate('/login');
      return;
    }
    await toggleWishlist(id);
  };

  return (
    <div className="bg-[#f4f7f6] min-h-screen py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1f2937] mb-2">{cabin.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1">
                <FiStar className="text-[#e5a452] fill-current" />
                {cabin.rating > 0 ? cabin.rating : 'New'} {cabin.reviews > 0 && `(${cabin.reviews} reviews)`}
              </span>
              <span className="flex items-center gap-1"><FiMapPin /> {cabin.location}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
              <FiShare2 /> Share
            </button>
            <button 
              onClick={handleSaveToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors border ${isSaved ? 'border-red-200 text-red-500 bg-red-50' : 'border-gray-200'}`}
            >
              <FiHeart className={isSaved ? 'fill-current' : ''} /> {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh] md:h-[480px]">
            <div className="md:col-span-2 md:row-span-2 h-full">
              <img
                src={images[mainImage]}
                alt="Main"
                className="w-full h-full object-cover rounded-l-2xl cursor-pointer"
                onClick={() => setMainImage(0)}
              />
            </div>
            {images.slice(1, 5).map((img, i) => (
              <div key={i} className="hidden md:block h-full">
                <img
                  src={img}
                  alt={`Cabin ${i + 2}`}
                  onClick={() => setMainImage(i + 1)}
                  className={`w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity ${i === 1 ? 'rounded-tr-2xl' : i === 3 ? 'rounded-br-2xl' : ''}`}
                />
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => setMainImage(i)}
                  className={`w-16 h-16 object-cover rounded-md shrink-0 cursor-pointer border-2 transition-all ${i === mainImage ? 'border-[#375344]' : 'border-transparent'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content + Booking Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="pb-8 border-b border-gray-200 mb-8">
              <h2 className="text-2xl font-bold mb-4 font-serif text-[#1f2937]">Entire cabin hosted by UnwindCabins</h2>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <span>{cabin.maxGuests} guests</span>
                <span>· {cabin.bedrooms} bedrooms</span>
                <span>· {cabin.beds} beds</span>
                <span>· {cabin.bathrooms} bathroom{cabin.bathrooms !== 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="pb-8 border-b border-gray-200 mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#1f2937]">About this cabin</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{cabin.description}</p>
            </div>

            {cabin.amenities?.length > 0 && (
              <div className="pb-8 border-b border-gray-200 mb-8">
                <h3 className="text-xl font-bold mb-6 text-[#1f2937]">What this place offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cabin.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-600">
                      <FiCheck className="text-[#375344]" /> {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="pb-8 border-b border-gray-200 mb-8">
              <h3 className="text-xl font-bold mb-6 text-[#1f2937] flex items-center gap-2">
                <FiStar className="text-[#e5a452] fill-current" />
                {cabin.rating > 0 ? cabin.rating : 'No'} · {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
              </h3>

              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first!</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review._id} className="flex gap-4">
                      <img
                        src={review.user?.avatar?.url || `/default-avatar.png`}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <strong className="text-[#1f2937]">
                            {review.user?.firstName} {review.user?.lastName}
                          </strong>
                          <span className="text-gray-400 text-sm">· {new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex text-[#e5a452] text-sm mb-2">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Leave a Review */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#1f2937]">Leave a Review</h3>
              {!isAuthenticated ? (
                <p className="text-gray-500">
                  Please{' '}
                  <button onClick={() => navigate('/login')} className="text-[#375344] font-medium underline">
                    log in
                  </button>{' '}
                  to leave a review.
                </p>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className={`text-3xl transition-colors ${star <= (hoverRating || rating) ? 'text-[#e5a452]' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      rows={4}
                      placeholder="Share your experience..."
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={reviewLoading}
                    className="bg-[#375344] hover:bg-[#2c4236] text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-70 flex items-center gap-2"
                  >
                    {reviewLoading && <FiLoader className="animate-spin" />}
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl sticky top-24">
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-bold text-[#1f2937]">£{cabin.price}</span>
                <span className="text-gray-500 mb-1">/ night</span>
              </div>

              <form onSubmit={handleBooking}>
                <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                  <div className="flex border-b border-gray-300">
                    <div className="flex-1 p-3 border-r border-gray-300">
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Check-in</label>
                      <input
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={e => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(''); }}
                        className="w-full outline-none text-sm bg-transparent"
                        required
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Check-out</label>
                      <input
                        type="date"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={e => setCheckOut(e.target.value)}
                        className="w-full outline-none text-sm bg-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Guests</label>
                    <select
                      className="w-full outline-none text-sm bg-transparent"
                      value={guests}
                      onChange={e => setGuests(e.target.value)}
                    >
                      {[...Array(cabin.maxGuests || 6)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} guest{i + 1 > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-[#e5a452] hover:bg-[#d49642] text-white font-bold py-4 rounded-lg transition-colors mb-4 text-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {bookingLoading && <FiLoader className="animate-spin" />}
                  {bookingLoading ? 'Reserving...' : 'Reserve'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mb-6">You won't be charged yet</p>

              {nights > 0 && (
                <div className="space-y-3 text-gray-600 mb-4 pb-4 border-b border-gray-200 text-sm">
                  <div className="flex justify-between">
                    <span className="underline">£{cabin.price} × {nights} night{nights !== 1 ? 's' : ''}</span>
                    <span>£{cabinCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>£{cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>£{serviceFee}</span>
                  </div>
                </div>
              )}

              {nights > 0 && (
                <div className="flex justify-between font-bold text-lg text-[#1f2937]">
                  <span>Total</span>
                  <span>£{total}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinDetails;
