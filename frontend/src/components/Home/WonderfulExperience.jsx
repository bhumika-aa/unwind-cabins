import { FiStar } from 'react-icons/fi';

const WonderfulExperience = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Woman in purple jacket" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-r lg:from-black/20 lg:to-black/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-end">
        <div className="max-w-xl text-white">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
            A truly wonderful<br />experience
          </h2>
          
          <p className="text-lg mb-6 leading-relaxed opacity-90">
            Brilliant for anyone looking to get away from the hustle and bustle of city life or detox from their tech for a few days. I could have stayed another week!
          </p>
          
          <p className="text-lg mb-10 leading-relaxed opacity-90">
            They really have thought about everything here down to the finest details.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-7 h-7 bg-[#0ea5e9] flex items-center justify-center rounded-[2px] bg-[#10b981]">
                  <FiStar size={14} className="text-white fill-current" />
                </div>
              ))}
            </div>
            <span className="text-sm font-medium opacity-90 tracking-wide">01 Jan 2023</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WonderfulExperience;
