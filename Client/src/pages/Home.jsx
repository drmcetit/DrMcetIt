import { About } from "../components/Home/About/About";
import HeroCarousel from "../components/Home/hero_caurosal/hero_caurosal";
import { Updates } from "../components/Home/Updates/Updates";

const Home = () => {
    return (
      <>
      <HeroCarousel/>
      <About/>
      <Updates/>
      </>
    );
  };
  
  export default Home;  // ✅ Ensure this line is present
  