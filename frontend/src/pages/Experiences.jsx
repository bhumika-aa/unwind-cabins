import { useState, useEffect } from 'react';
import ExperienceCard from '../components/ExperienceCard';
import experienceService from '../services/experienceService';
import toast from 'react-hot-toast';

export const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await experienceService.getExperiences();
        setExperiences(res.data || []);
      } catch (err) {
        toast.error('Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div className="bg-[#f4f7f6] min-h-screen">
      <div className="bg-[#375344] py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Experiences</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Get inspired for your next getaway. Curated activities for every kind of adventurer.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">No experiences found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map(exp => (
              <ExperienceCard
                key={exp._id}
                experience={{
                  id: exp._id,
                  image: exp.image?.url || 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
                  category: exp.category?.toUpperCase(),
                  title: exp.title,
                  description: exp.description,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
