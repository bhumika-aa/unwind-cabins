import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex flex-col"
    >
      <div className="flex text-[#e5a452] mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="text-gray-700 italic flex-grow mb-6">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-bold text-[#1f2937]">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
