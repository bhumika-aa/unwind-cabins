import { Link } from 'react-router-dom';
import ExperienceCard from '../ExperienceCard';

const mockExperiences = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'FOR THOSE WHO LOVE',
    title: 'To Explore nature',
    description: 'Discover some of the most beautiful scenery – from the wonders of Snowdonia to the famous beauty of the Scottish Highlands.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'FOR THOSE WHO WANT',
    title: 'To Relax, rest & re-set',
    description: 'Experience mind and body connection through breathing exercises and relaxation with our Yoga inspired get away for you and the family.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'FOR THOSE WHO HAVE',
    title: 'Four-legged friends',
    description: 'When going on holiday nobody wants to put their dog in a kennel. So, lets keep the family together with our pet friendly cabins.'
  }
];

const Inspiration = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#f4f7f6]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1f2937] mb-2">
            Inspiration for your next getaway
          </h2>
          <div className="w-48 h-1 bg-[#e5a452] mb-6"></div>
          <p className="text-gray-600 text-lg">
            We've curated some amazing experiences to help you find your next getaway.
          </p>
        </div>
        <Link to="/experiences" className="mt-4 md:mt-0 text-gray-800 font-medium hover:text-[#375344] underline decoration-gray-400 underline-offset-4 transition-colors">
          View all experiences
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockExperiences.map(exp => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
};

export default Inspiration;
