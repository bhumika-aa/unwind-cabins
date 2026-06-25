import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CabinCard from '../CabinCard';
import cabinService from '../../services/cabinService';
import toast from 'react-hot-toast';

const FeaturedCabins = () => {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCabins = async () => {
      try {
        const res = await cabinService.getCabins('?limit=3&sort=-rating');
        setCabins(res.data);
      } catch (err) {
        toast.error('Failed to load cabins');
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCabins();
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1f2937] mb-2">
            Discover our idyllic countryside cabins
          </h2>
          <div className="w-48 h-1 bg-[#e5a452] mb-6"></div>
          <p className="text-gray-600 text-lg">
            Fully equipped kitchen and bathroom with plenty of walking and cycling routes to explore.
          </p>
        </div>
        <Link to="/cabins" className="mt-4 md:mt-0 text-gray-800 font-medium hover:text-[#375344] underline decoration-gray-400 underline-offset-4 transition-colors">
          View all cabins
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#375344]"></div>
        </div>
      ) : cabins.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No cabins available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cabins.map(cabin => (
            <CabinCard key={cabin._id || cabin.id} cabin={cabin} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCabins;
