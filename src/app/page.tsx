"use client";

import { Stack } from "@mantine/core";
import Navbar from "./Home-components/NavBar";
// import Hero from "./Home-components/calculator/Hero";
import Service from "./Home-components/Service";
import AboutPage from "./Home-components/About";
import Map from "./Home-components/Map";
import Footer from "./Home-components/Footer";
import BackgroundCarouselWithHeading from "./Home-components/carousel/BackgroundImage";
import { useEffect } from "react";
import axios from "axios";
import { GetUserToken } from "@/utility/AddLocalStorage";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setUserData } from "@/lib/user/UserSlice";
import { setAdminData } from "@/lib/admin/AdminSlice";
import { URL } from "@/lib/ApiHelper";
import ClientBookingForm from "./Home-components/ClientBookingForm";
// import Hero from "./Home-components/calculator/Hero";

export default function Home() {
  const dispatch = useAppDispatch();
  const navigation = useRouter();
  
  useEffect(() => {
    getUserByToken();
  }, []);

  const getUserByToken = async () => {
    const response = await axios
      .get(`${URL}/api/user`, {
        headers: {
          authorization: `Bearer ${GetUserToken()}`,
        },
      })
      .then((response) => response.data);

    if (response.status === 200) {
      const { data } = response;
      if (data._id.startsWith("ADMN")) {
        navigation.push(`/admin/${data._id}`);
        dispatch(setAdminData(data));
      } else {
        dispatch(setUserData(data));
        navigation.push(`/user/${data._id}`);
      }
    }
  };
  return (
    <Stack w={"100%"} bg={"#FAFAFA"}>
      <Navbar />
      <BackgroundCarouselWithHeading />
      <ClientBookingForm/>
      {/* <Hero isTopMargin={true} /> */}
      <AboutPage />
      <Service />
      <Map />
      <Footer />
    </Stack>
  );
}
