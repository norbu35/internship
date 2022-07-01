import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import AboutUs from "./AboutUs/AboutUs";
import FAQ from "./FAQ/FAQ";
import SelectionProcess from "./SelectionProcess/SelectionProcess";
import Testimonials from "./Testimonials/Testimonials";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <>
      <Header logoColor={"white"} />
      <Hero />
      <AboutUs />
      <SelectionProcess />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
