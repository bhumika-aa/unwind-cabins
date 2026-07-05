import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const faqCategories = [
  {
    title: 'About our cabins',
    content: 'We provide beautifully crafted cabins designed for relaxation and disconnecting from the daily grind. Each cabin features modern amenities blended with rustic charm.'
  },
  {
    title: 'Tell me more about the cabin',
    content: 'Our cabins come fully equipped with premium bed linen, bath towels, and essential toiletries. You only need to bring your food, clothes, and a desire to unwind!'
  },
  {
    title: 'Pets, family & friends',
    content: 'Yes! Many of our cabins are pet-friendly and can accommodate up to 4 guests. Please ensure you select a pet-friendly option during booking.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1f2937] mb-16">
          Frequently asked questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-24 lg:gap-32 mb-16">
          {/* Left Column - Questions List */}
          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-bold text-[#1f2937] mb-3">1. About Unwind Cabins</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex gap-2"><span>&bull;</span> How long have you been in business?</li>
                <li className="flex gap-2"><span>&bull;</span> Why did you start this journey?</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-[#1f2937] mb-3">2. Tell me more about the cabin</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex gap-2"><span>&bull;</span> What do I need to bring?</li>
                <li className="flex gap-2"><span>&bull;</span> How do I get to the cabin?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#1f2937] mb-3">3. Pets, family &amp; friends</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex gap-2"><span>&bull;</span> Please tell me I can bring my dog</li>
                <li className="flex gap-2"><span>&bull;</span> How many people do you cabins sleep?</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Category Accordions */}
          <div className="space-y-6">
            {faqCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-[#f6ad55] rounded-md shadow-sm overflow-hidden"
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-black font-medium text-left p-6 flex justify-between items-center group transition-colors hover:bg-[#ed8936]"
                >
                  <span>{category.title}</span>
                  <motion.div 
                    animate={{ rotate: openIndex === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 rounded-full border border-black flex items-center justify-center shrink-0 ml-4"
                  >
                    <FiArrowRight size={14} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-800 text-sm border-t border-black/10 mt-2">
                        <div className="pt-4">
                          {category.content}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Footer of FAQ */}
        <div>
          <h3 className="text-xl font-bold text-[#1f2937] mb-4">Still have a question?</h3>
          <p className="text-gray-800">
            If you still have questions contact a member of the team on <a href="#" className="underline font-bold underline-offset-2">live chat</a> and we'd be more than happy to help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
