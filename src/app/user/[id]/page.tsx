"use client";

import { Flex, Image, LoadingOverlay, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Hero from "@/app/Home-components/calculator/Hero";
import { GetUserToken, LogOut } from "@/utility/AddLocalStorage";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { setUserData } from "@/lib/user/UserSlice";
import Booking from "@/user/Booking";
import { URL } from "@/lib/ApiHelper";
import { useMediaQuery } from "@mantine/hooks";

enum SideTabs {
  HOME = "home",
  BOOKING = "booking",
}

const User = () => {
  const navigation = useRouter();
  const [activeTab, setActiveTab] = useState<SideTabs>(SideTabs.HOME);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
    const isMd = useMediaQuery(`(max-width: 968px)`);

  const dispatch = useAppDispatch();
  useEffect(() => {
    getUserByToken();
  }, []);

  const getUserByToken = async () => {
    setIsLoading(true);
    const response = await axios
      .get(`${URL}/api/user`, {
        headers: {
          authorization: `Bearer ${GetUserToken()}`,
        },
      })
      .then((response) => response.data);

    if (response.status === 200) {
      setIsLoading(false);
      const { data } = response;
      dispatch(setUserData(data));
    }
  };
  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Flex w={"100%"} mih={"100vh"} direction={isMd?"column-reverse":"row"} >
        <Stack
          w={isMd?"90%":"10%"}
          mx={"auto"}
          style={{
            borderRadius: isMd ? "1rem" : "0rem",
            position: isMd ? "fixed" : "static",
            left: isMd ? "50%" : 0,
            bottom: isMd ? 10 : 10, 
            transform: isMd ? "translateX(-50%)" : "none"
          }}
          bg={"linear-gradient(to top, #4da6cf, #ec4899)"}
          gap={20}
          align="center"
        >
          <Flex
            direction={isMd?"row":"column"}
            h={isMd?"auto":"100%"}
            w={"90%"}
            p={4}
            align={"center"}
            justify={isMd?"space-between":"start"}
          >
            <Image src={"/logo.png"} w={50} alt="Not found" />
            {/* <Flex direction={isMd?"row":"column"} h={"60%"}  mt={20}> */}
              <Flex
                onClick={() => setActiveTab(SideTabs.HOME)}
                align={"center"}
                direction={isMd?"column":"row"} 
                gap={10}
                mt={20}
                style={{
                  border:
                    activeTab === SideTabs.HOME ? isMd?"none": "1px solid white" : "none",
                }}
                p={5}
              >
                <IoHomeSharp color="white" size={isMd?30:20} />
                <Text
                  fz={isMd?16:20}
                  ff={"Roboto"}
                  fw={600}
                  c={"white"}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </Text>
              </Flex>
              <Flex
                onClick={() => setActiveTab(SideTabs.BOOKING)}
                align={"center"}
                direction={isMd?"column":"row"} 
                gap={10}
                mt={20}
                style={{
                  border:
                    activeTab === SideTabs.BOOKING ? isMd?"none":"1px solid white" : "none",
                }}
                p={5}
              >
                <FaCalendarAlt color="white" size={isMd?30:20} />
                <Text
                  fz={isMd?16:20}
                  ff={"Roboto"}
                  fw={600}
                  c={"white"}
                  style={{ cursor: "pointer" }}
                >
                  Booking
                </Text>
              </Flex>
            {/* </Flex> */}
          </Flex>
        </Stack>
        <Stack w={isMd?"100%":"90%"}  >
          <Flex
            w={"100%"}
            bg={"linear-gradient(to left, #4da6cf, #ec4899)"}
            align={"center"}
            style={{
              position: isMd ? "fixed" : "static",
              left: isMd ? "50%" : 0,
              top: isMd ? 0 : 0, 
              transform: isMd ? "translateX(-50%)" : "none"
            }}
            justify={"space-between"}
            gap={20}
            p={15}
          >
            <Flex>
              <Text fw={700} ff={"Roboto"} c={"#fff"} fz={24} ta={"center"}>
                Hy, {user.name}
              </Text>
            </Flex>
            <Flex px={20}>
              <IoMdLogOut
                onClick={() => {
                  LogOut();
                  dispatch(
                    setUserData({
                      _id: "",
                      name: "",
                      email: "",
                      discount: 0,
                    })
                  );
                  navigation.push("/");
                }}
                size={20}
                color="white"
                style={{ cursor: "pointer" }}
              />
            </Flex>
          </Flex>
          <Stack mih={"80vh"} >
            {SideTabs.HOME === activeTab && <Hero isTopMargin={false} />}
            {SideTabs.BOOKING === activeTab && <Booking />}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default User;
