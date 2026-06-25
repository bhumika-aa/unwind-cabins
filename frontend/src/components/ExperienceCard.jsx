import { motion } from 'framer-motion';

const ExperienceCard = ({ experience }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#5c6861] rounded-lg overflow-hidden shadow-lg group flex flex-col h-full"
    >
      <div className="h-56 overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow text-white">
        <div className="text-xs tracking-wider text-gray-300 font-semibold mb-2 uppercase">
          {experience.category}
        </div>
        
        <h3 className="text-2xl font-bold font-serif mb-4">{experience.title}</h3>
        
        <p className="text-gray-200 text-sm flex-grow leading-relaxed">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
