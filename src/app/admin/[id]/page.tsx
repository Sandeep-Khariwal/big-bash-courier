import { Button, Flex, Stack, Text } from "@mantine/core";
import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import Hero from "@/app/Home-components/Hero";

const Admin = () => {
  return (
    <Flex w={"100%"} mih={"100vh"}>
      <Stack 
      w={"10%"} 
      bg={"linear-gradient(to top, #4da6cf, #ec4899)"} 
      gap={20} pt={20} align="center">
        <Flex direction={"column"} h={"100%"} align={"center"} justify={"space-between"} >
          <Text>Logo</Text>
          <Stack h={"60%"}>
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
            <Flex align={"center"} gap={10} mt={20}>
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
            <Flex align={"center"} gap={10} mt={20}>
              <FaAddressBook color="white" size={20} />
              <Text
                fz={20}
                ff={"Roboto"}
                fw={600}
                c={"white"}
                style={{ cursor: "pointer" }}
              >
                Users
              </Text>
            </Flex>
          </Stack>
          <Flex h={"30%"} align={"end"} justify={"center"} p={20} >
           <Flex align={"center"} gap={10} >
           <IoSettings color="white" size={20} style={{ cursor: "pointer" }} />
            <Text
                fz={20}
                ff={"Roboto"}
                fw={600}
                c={"white"}
                style={{ cursor: "pointer" }}
              >
                settings
              </Text>
           </Flex>
          </Flex>
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
          <Flex align={"center"} gap={20}>
            <Button
              variant={"subtle"}
              c={"white"}
              ff={"Poppins"}
            >
              {" "}
              <MdAdd color="white" size={20} /> Country{" "}
            </Button>
            <Button
              variant={"subtle"}
              ff={"Poppins"}
              c={"white"}
            >
              {" "}
              <MdAdd color="white" size={20} /> User
            </Button>
            <Button
              variant={"subtle"}
              ff={"Poppins"}
              c={"white"}
            >
              {" "}
              <MdAdd color="white" size={20} /> Company
            </Button>
          </Flex>
          <Flex>
            <Text fw={700} ff={"Roboto"} c={"#fff"} fz={24} ta={"center"}>
              Big Bash Courier
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
