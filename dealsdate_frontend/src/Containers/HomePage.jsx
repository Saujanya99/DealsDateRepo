import Aboutus from "../Components/HomePage/Aboutus";
import Contact from "../Components/HomePage/Contact";
import Footer from "../Components/HomePage/Footer";
import Header from "../Components/HomePage/Header";
import Services from "../Components/HomePage/Services";

/*Pabitra Kumar Malick / Saujanya Waikar*/
const HomePage = ({ auth }) => {
  return (
    <>
      <Header />
      <Aboutus />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
