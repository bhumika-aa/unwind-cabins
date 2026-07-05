import { Link } from 'react-router-dom';

const EscapeZoom = () => {
  return (
    <section className="relative h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#0f1715]">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Sunset lake cabin getaway" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-xl text-white">
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Escape from endless<br />Zoom calls
          </h2>
          
          <p className="text-lg mb-10 leading-relaxed text-gray-200">
            Discover the wonders of spending time offline and away from the office with our 3 day weekend getaway cabin retreats.
          </p>
          
          <Link 
            to="/cabins" 
            className="inline-block bg-[#e6fcf5] hover:bg-[#c3fae8] text-[#0f1715] font-medium px-8 py-3 rounded-md transition-colors"
          >
            Find the perfect getaway
          </Link>
        </div>
      </div>

      {/* Jagged Edge SVG overlay to blend into Footer */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,120 L0,60 L20,90 L60,40 L100,100 L140,50 L180,80 L220,30 L260,70 L300,20 L340,60 L380,10 L420,50 L460,0 L500,40 L540,10 L580,50 L620,20 L660,60 L700,30 L740,70 L780,40 L820,90 L860,50 L900,100 L940,60 L980,110 L1020,70 L1060,115 L1100,80 L1140,110 L1180,90 L1200,120 Z"
            className="fill-[#0f1715]"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default EscapeZoom;
