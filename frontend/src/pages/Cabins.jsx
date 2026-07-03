import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CabinCard from '../components/CabinCard';
import cabinService from '../services/cabinService';
import toast from 'react-hot-toast';
import { FiSearch, FiFilter, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AMENITY_OPTIONS = ['Hot tub', 'Pet friendly', 'Firepit', 'Wi-Fi', 'Kitchen', 'Free parking', 'BBQ grill', 'Indoor fireplace'];
const SORT_OPTIONS = [
  { label: 'Recommended', value: '-createdAt' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Highest Rated', value: '-rating' },
];
const PAGE_SIZE = 6;

const Cabins = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Local form state (for inputs while typing/selecting)
  const [localFilters, setLocalFilters] = useState({
    search: searchParams.get('search') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    guests: searchParams.get('maxGuests[gte]') || '',
    bedrooms: searchParams.get('bedrooms[gte]') || ''
  });

  // Applied filters (triggers API)
  const [appliedFilters, setAppliedFilters] = useState(localFilters);

  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '-createdAt');
  const [page, setPage] = useState(Number(searchParams.get('page') || 1));

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    if (appliedFilters.search) params.set('search', appliedFilters.search);
    if (appliedFilters.priceMin) params.set('price[gte]', appliedFilters.priceMin);
    if (appliedFilters.priceMax) params.set('price[lte]', appliedFilters.priceMax);
    if (appliedFilters.guests) params.set('maxGuests[gte]', appliedFilters.guests);
    if (appliedFilters.bedrooms) params.set('bedrooms[gte]', appliedFilters.bedrooms);
    params.set('sort', sortBy);
    params.set('page', page);
    params.set('limit', PAGE_SIZE);
    return `?${params.toString()}`;
  }, [appliedFilters, sortBy, page]);

  const fetchCabins = useCallback(async () => {
    setLoading(true);
    try {
      const query = buildQuery();
      const res = await cabinService.getCabins(query);
      setCabins(res.data || []);
      setPagination(res.pagination || {});
      setTotalCount(res.count || 0);
      setSearchParams(Object.fromEntries(new URLSearchParams(query)));
    } catch (err) {
      toast.error('Failed to load cabins');
    } finally {
      setLoading(false);
    }
  }, [buildQuery]);

  useEffect(() => {
    fetchCabins();
  }, [fetchCabins]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters(localFilters);
    setPage(1);
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    const resetState = { search: '', priceMin: '', priceMax: '', guests: '', bedrooms: '' };
    setLocalFilters(resetState);
    setAppliedFilters(resetState);
    setSortBy('-createdAt');
    setPage(1);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  const FilterPanel = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#1f2937]">Filters</h3>
        <button onClick={handleReset} className="text-sm text-[#375344] hover:underline">Reset all</button>
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cabin name..."
            value={localFilters.search}
            onChange={e => setLocalFilters({ ...localFilters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#375344]"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night (£)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            min={0}
            value={localFilters.priceMin}
            onChange={e => setLocalFilters({ ...localFilters, priceMin: e.target.value })}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#375344]"
          />
          <input
            type="number"
            placeholder="Max"
            min={0}
            value={localFilters.priceMax}
            onChange={e => setLocalFilters({ ...localFilters, priceMax: e.target.value })}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#375344]"
          />
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Guests</label>
        <select
          value={localFilters.guests}
          onChange={e => setLocalFilters({ ...localFilters, guests: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#375344]"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 6, 8, 10].map(n => (
            <option key={n} value={n}>{n}+ guests</option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Bedrooms</label>
        <select
          value={localFilters.bedrooms}
          onChange={e => setLocalFilters({ ...localFilters, bedrooms: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#375344]"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}+ bedroom{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleApplyFilters}
        disabled={loading}
        className="w-full bg-[#375344] text-white py-3 rounded-md font-medium hover:bg-[#2c4236] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        <FiFilter size={16} /> Apply Filters
      </button>
    </div>
  );

  return (
    <div className="bg-[#f4f7f6] min-h-screen">
      <div className="bg-[#375344] py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Cabins</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Find the perfect cabin for your next adventure. Use filters to narrow down your search.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-white text-[#375344] border border-[#375344] font-bold py-3 rounded-md flex items-center justify-center gap-2"
          >
            {isFilterOpen ? <><FiX /> Hide Filters</> : <><FiFilter /> Show Filters</>}
          </button>
          {isFilterOpen && <div className="mt-4"><FilterPanel /></div>}
        </div>

        {/* Desktop filter sidebar */}
        <div className="md:w-1/4 hidden md:block">
          <FilterPanel />
        </div>

        {/* Cabin listing */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 font-medium">
              {loading ? 'Loading...' : `${totalCount} cabin${totalCount !== 1 ? 's' : ''} found`}
            </p>
            <select
              value={sortBy}
              onChange={e => { setSortBy(e.target.value); setPage(1); }}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:border-[#375344]"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(PAGE_SIZE)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : cabins.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No cabins match your filters.</p>
              <button onClick={handleReset} className="text-[#375344] underline font-medium">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cabins.map(cabin => (
                <CabinCard key={cabin._id} cabin={cabin} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1"
              >
                <FiChevronLeft /> Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-md font-medium transition-colors ${page === i + 1 ? 'bg-[#375344] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-[#375344] font-medium hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1"
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cabins;
