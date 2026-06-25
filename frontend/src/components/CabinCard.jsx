import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CabinCard = ({ cabin }) => {
  // Support both MongoDB shape (_id + images[]) and legacy shape (id + image string)
  const cabinId = cabin._id || cabin.id;
  const imageUrl =
    cabin.images?.[0]?.url ||        // MongoDB Cloudinary format
    cabin.image ||                    // legacy string
    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#2d3330] rounded-lg overflow-hidden shadow-lg group flex flex-col relative"
    >
      <Link to={`/cabins/${cabinId}`} className="absolute inset-0 z-10" />
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={cabin.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80'; }}
        />
        <button className="absolute top-4 right-4 w-10 h-10 bg-black/40 rounded-md flex items-center justify-center text-white hover:bg-black/60 transition-colors backdrop-blur-sm z-20 relative">
          <FiHeart size={20} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow text-white">
        <div className="text-xs tracking-wider text-gray-300 font-semibold mb-2 uppercase">
          {cabin.location}
        </div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold font-serif">{cabin.title}</h3>
          <div className="text-xl font-bold shrink-0 ml-2">
            £{cabin.price}<span className="text-sm font-normal">pp</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
          {cabin.description}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          <div className="flex text-green-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(cabin.rating || 0) ? 'fill-current' : 'text-gray-500 fill-current'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-300">{cabin.reviews || 0} reviews</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CabinCard;
