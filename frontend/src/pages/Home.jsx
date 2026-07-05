import Hero from '../components/Home/Hero';
import SearchBar from '../components/Home/SearchBar';
import FeaturedCabins from '../components/Home/FeaturedCabins';
import Inspiration from '../components/Home/Inspiration';
import Testimonials from '../components/Home/Testimonials';
import VideoSection from '../components/Home/VideoSection';
import FAQ from '../components/Home/FAQ';
import WonderfulExperience from '../components/Home/WonderfulExperience';
import Nourish from '../components/Home/Nourish';
import EscapeZoom from '../components/Home/EscapeZoom';

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchBar />
      <FeaturedCabins />
      <Inspiration />
      <Testimonials />
      <WonderfulExperience />
      <VideoSection />
      <Nourish />
      <FAQ />
      <EscapeZoom />
    </div>
  );
};

export default Home;
