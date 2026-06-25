import { useState } from 'react';

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState(500);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold font-serif mb-6 text-[#1f2937]">Filter your search</h3>
      
      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Price per night</h4>
        <input 
          type="range" 
          min="50" 
          max="1000" 
          value={priceRange} 
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full accent-[#375344]"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>£50</span>
          <span className="font-bold text-[#375344]">Up to £{priceRange}</span>
          <span>£1000+</span>
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Amenities</h4>
        <div className="space-y-3">
          {['Hot tub', 'Pet friendly', 'Firepit', 'Wi-Fi', 'Kitchen', 'Free parking'].map((amenity, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#375344] focus:ring-[#375344] accent-[#375344]" />
              <span className="text-gray-600">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Capacity */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Capacity</h4>
        <div className="grid grid-cols-2 gap-3">
          {['1-2 guests', '3-4 guests', '5-6 guests', '7+ guests'].map((capacity, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#375344]" />
              <span className="text-sm text-gray-600">{capacity}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Rooms */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Bedrooms</h4>
        <div className="flex gap-2">
          {['Any', '1', '2', '3', '4+'].map((room, idx) => (
            <button key={idx} className={`flex-1 py-2 rounded-md border ${idx === 0 ? 'bg-[#375344] text-white border-[#375344]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#375344]'}`}>
              {room}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full bg-[#e5a452] hover:bg-[#d49642] text-white font-bold py-3 rounded-md transition-colors">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
