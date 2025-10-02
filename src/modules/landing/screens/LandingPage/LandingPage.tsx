import { NavbarLanding } from "../../components/Navbar/Navbar";
import { HeroSection } from "../../components/HeroSection";
import { FeaturedPizzas } from "../../components/FeaturedPizzas";
import { AboutUs } from "../../components/AboutUs";
import { ContactOrder } from "../../components/ContactOrder";
import { Footer } from "../../components/Footer";
import classNames from "./LandingPage.module.scss";

const LandingPage = () => {
  return (
    <div className={classNames.container}>
      <NavbarLanding />
      <HeroSection />
      <FeaturedPizzas />
      <AboutUs />
      <ContactOrder />
      <Footer />
    </div>
  );
}

export default LandingPage;