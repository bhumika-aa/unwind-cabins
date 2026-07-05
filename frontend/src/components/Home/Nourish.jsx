import { Link } from 'react-router-dom';

const Nourish = () => {
  return (
    <section className="relative min-h-[600px] flex items-center bg-[#f4f7f6]">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Woman reading book on sofa" 
          className="w-full h-full object-cover object-right"
        />
        {/* Gradient that is dark on the left and transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-xl text-white">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Nourish the mind, body,<br />and spirit.
          </h2>
          
          <p className="text-gray-300 mb-8 leading-relaxed opacity-95">
            Many people find that the combination of being in a peaceful natural setting and engaging in activities that nourish the mind, body, and spirit leave them feeling rejuvenated and refreshed.
          </p>
          
          <Link 
            to="/cabins" 
            className="inline-block bg-[#e5a452] hover:bg-[#d49642] text-black font-bold px-8 py-4 rounded-sm transition-colors text-sm"
          >
            Find available cabins
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Nourish;
