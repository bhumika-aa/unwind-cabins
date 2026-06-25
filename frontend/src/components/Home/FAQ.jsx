import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in is from 3:00 PM onwards, and check-out is by 11:00 AM. If you need early check-in or late check-out, please contact us in advance and we'll do our best to accommodate based on availability."
  },
  {
    question: "Are pets allowed in the cabins?",
    answer: "Yes! We have specific pet-friendly cabins available. Please make sure to select the 'Pet Friendly' filter when searching, and note there is a small additional cleaning fee."
  },
  {
    question: "Do I need to bring my own towels and bed linen?",
    answer: "No, all our cabins come fully equipped with premium bed linen, bath towels, and hand towels. We also provide basic toiletries like soap, shampoo, and body wash."
  },
  {
    question: "Is there Wi-Fi available?",
    answer: "Yes, all our cabins feature high-speed Wi-Fi, making them perfect for both relaxing and remote working if needed."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1f2937] mb-4">
            Frequently asked questions
          </h2>
          <div className="w-24 h-1 bg-[#e5a452] mx-auto mb-6"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-bold text-[#1f2937]">{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="text-gray-500" />
                ) : (
                  <FiChevronDown className="text-gray-500" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 bg-gray-50 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
