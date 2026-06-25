import { useState } from 'react';
import { FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/cabins?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl mx-6 md:mx-12 lg:mx-24 -mt-16 relative z-20 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-1 w-full bg-gray-100 rounded-md flex items-center px-4 py-3">
        <FiMapPin className="text-gray-500 mr-3" />
        <input 
          type="text" 
          placeholder="I want to go" 
          className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <div className="flex-1 w-full bg-gray-100 rounded-md flex items-center px-4 py-3">
        <FiCalendar className="text-gray-500 mr-3" />
        <input 
          type="text" 
          placeholder="Check in" 
          onFocus={(e) => e.target.type = 'date'}
          onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
          className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      
      <div className="flex-1 w-full bg-gray-100 rounded-md flex items-center px-4 py-3">
        <FiCalendar className="text-gray-500 mr-3" />
        <input 
          type="text" 
          placeholder="Check out" 
          onFocus={(e) => e.target.type = 'date'}
          onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
          className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="flex-1 w-full bg-gray-100 rounded-md flex items-center px-4 py-3">
        <FiUsers className="text-gray-500 mr-3" />
        <input 
          type="number" 
          placeholder="Travellers" 
          min="1"
          className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>
      
      <button 
        onClick={handleSearch}
        className="w-full md:w-auto bg-[#375344] hover:bg-[#2d4336] text-white px-8 py-3 rounded-md font-medium transition-colors"
      >
        Find available cabins
      </button>
    </div>
  );
};

export default SearchBar;
