import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyState = ({ title, description, icon: Icon, actionText, actionLink }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
        {Icon && <Icon size={40} />}
      </div>
      <h3 className="text-2xl font-bold font-serif text-[#1f2937] mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8">{description}</p>
      
      {actionText && actionLink && (
        <Link 
          to={actionLink} 
          className="bg-[#375344] hover:bg-[#2d4336] text-white px-8 py-3 rounded-md font-medium transition-colors"
        >
          {actionText}
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyState;
