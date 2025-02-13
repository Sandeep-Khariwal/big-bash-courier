import { Flex, Stack, Text } from "@mantine/core";
import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Hero from "@/app/Home-components/Hero";

const Admin = () => {
  return (
    <Flex w={"100%"} mih={"100vh"}>
      <Stack 
      w={"10%"} 
      bg={"linear-gradient(to top, #4da6cf, #ec4899)"} 
      gap={20} pt={20} align="center">
        <Flex direction={"column"} h={"100%"} align={"center"} justify={"start"} >
          <Text>Logo</Text>
          <Stack h={"60%"} mt={20}>
            <Flex align={"center"} gap={10} mt={20}>
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
            <Flex align={"center"} gap={10} >
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
      <Stack w={"90%"} >
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
              Hy, sandeep khariwal
            </Text>
          </Flex>
          <Flex px={20}>
            <IoMdLogOut size={20} color="white" style={{ cursor: "pointer" }} />
          </Flex>
        </Flex>
        <Stack>
        <Hero/>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Admin;
