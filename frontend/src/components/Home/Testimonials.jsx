import TestimonialCard from '../TestimonialCard';

const mockTestimonials = [
  {
    id: 1,
    rating: 5,
    quote: "Absolutely breathtaking! The cabin was spotless, the views were incredible, and the peace and quiet was exactly what we needed. We will definitely be coming back next year.",
    name: "Sarah Jenkins",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 2,
    rating: 5,
    quote: "A perfect getaway. The attention to detail in the cabin design is outstanding. Waking up to the sound of birds and having coffee on the porch was the highlight of our trip.",
    name: "Michael Chen",
    location: "Manchester, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 3,
    rating: 4,
    quote: "Very relaxing stay. The hot tub was a fantastic addition, especially after a long day of hiking in the surrounding trails. Highly recommend for couples looking to unwind.",
    name: "Emily Davies",
    location: "Bristol, UK",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1f2937] mb-4">
          What our guests say
        </h2>
        <div className="w-24 h-1 bg-[#e5a452] mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg">
          Don't just take our word for it. Read what others have experienced during their stay with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockTestimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
