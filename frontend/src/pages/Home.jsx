import Hero from '../components/Home/Hero';
import SearchBar from '../components/Home/SearchBar';
import FeaturedCabins from '../components/Home/FeaturedCabins';
import Inspiration from '../components/Home/Inspiration';
import Testimonials from '../components/Home/Testimonials';
import VideoSection from '../components/Home/VideoSection';
import FAQ from '../components/Home/FAQ';
import Newsletter from '../components/Home/Newsletter';

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchBar />
      <FeaturedCabins />
      <Inspiration />
      <Testimonials />
      <VideoSection />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
