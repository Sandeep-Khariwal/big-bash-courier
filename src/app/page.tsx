import { Stack } from "@mantine/core";
import Navbar from "./Home-components/NavBar";
import Hero from "./Home-components/Hero";
import Service from "./Home-components/Service";
import AboutPage from "./Home-components/About";
import Map from "./Home-components/Map";
import Footer from "./Home-components/Footer";
import BackgroundCarouselWithHeading from "./Home-components/carousel/BackgroundImage";

export default function Home() {
  return (
    <Stack w={"100%"} bg={"#FAFAFA"}>
      <Navbar />
      <BackgroundCarouselWithHeading/>
      <Hero />
      <AboutPage />
      <Service />
      <Map />
      <Footer />
    </Stack>
  );
}
