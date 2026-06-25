import { FiPlay } from 'react-icons/fi';

const VideoSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f4f7f6]">
      <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden relative shadow-2xl h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Cabin video thumbnail" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#375344] group-hover:scale-110 transition-transform">
              <FiPlay size={24} className="ml-1" />
            </div>
          </button>
        </div>
        <div className="absolute bottom-10 left-10 text-white">
          <h3 className="text-3xl font-serif font-bold mb-2">Experience the serenity</h3>
          <p className="text-lg text-gray-200">Take a virtual tour of our flagship cabin</p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
