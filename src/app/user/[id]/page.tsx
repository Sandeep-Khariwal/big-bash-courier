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

enum SideTabs {
  HOME = "home",
  BOOKING = "booking",
}

const User = () => {
  const navigation = useRouter();
  const [activeTab, setActiveTab] = useState<SideTabs>(SideTabs.HOME);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);

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
      <Flex w={"100%"} mih={"100vh"}>
        <Stack
          w={"10%"}
          bg={"linear-gradient(to top, #4da6cf, #ec4899)"}
          gap={20}
          pt={20}
          align="center"
        >
          <Flex
            direction={"column"}
            h={"100%"}
            align={"center"}
            justify={"start"}
          >
            <Image src={"/logo.png"} w={50} alt="Not found" />
            <Stack h={"60%"} mt={20}>
              <Flex
                onClick={() => setActiveTab(SideTabs.HOME)}
                align={"center"}
                gap={10}
                mt={20}
                style={{
                  border:
                    activeTab === SideTabs.HOME ? "1px solid white" : "none",
                }}
                p={5}
              >
                <IoHomeSharp color="white" size={20} />
                <Text
                  fz={20}
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
                gap={10}
                mt={20}
                style={{
                  border:
                    activeTab === SideTabs.BOOKING ? "1px solid white" : "none",
                }}
                p={5}
              >
                <FaCalendarAlt color="white" size={20} />
                <Text
                  fz={20}
                  ff={"Roboto"}
                  fw={600}
                  c={"white"}
                  style={{ cursor: "pointer" }}
                >
                  Booking
                </Text>
              </Flex>
            </Stack>
          </Flex>
        </Stack>
        <Stack w={"90%"}>
          <Flex
            w={"100%"}
            bg={"linear-gradient(to left, #4da6cf, #ec4899)"}
            align={"center"}
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
          <Stack>
            {SideTabs.HOME === activeTab && <Hero isTopMargin={false} />}
            {SideTabs.BOOKING === activeTab && <Booking />}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default User;
