import { useState, useRef } from 'react';
import { FiChevronRight, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-4xl font-serif font-bold text-[#1f2937]">Get ready to unwind</h2>
          <div className="w-16 h-[2px] bg-[#e5a452] my-6"></div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            A cabin getaway can be a wonderful way to relax and reconnect with nature. Many cabin rentals are located in beautiful, secluded areas, surrounded by trees and other natural beauty.
          </p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            A cabin getaway can be a wonderful way to escape the hustle and bustle of daily life and reconnect with nature.
          </p>
          
          <Link to="/about" className="font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 group">
            Learn more <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Video Thumbnail */}
        <div className="flex-1 relative w-full">
          {/* Dotted Pattern Background */}
          <div className="absolute -top-8 -right-8 w-48 h-48 grid grid-cols-6 gap-3 z-0 opacity-20">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
            ))}
          </div>
          
          <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl h-[400px] w-full bg-gray-900">
            <video 
              ref={videoRef}
              src="/Video-front.mp4" 
              className="w-full h-full object-cover"
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <div 
                className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer group"
                onClick={handlePlayClick}
              >
                <button className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:bg-white/40 transition-colors border border-white/20 shadow-lg">
                  <div className="w-16 h-16 bg-transparent flex items-center justify-center text-white/90 group-hover:scale-110 transition-transform">
                    <FiPlay size={32} className="ml-2 fill-current" />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
