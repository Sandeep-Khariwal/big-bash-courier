"use client";

import {
  Button,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaAddressBook, FaWhatsapp } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import CreateNewUserModal from "@/admin/CreateNewUserModal";
import { GetUserToken, LogOut } from "@/utility/AddLocalStorage";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddNewCompanyModal from "@/admin/AddNewCompanyModal";
import CreateRateForCompanyAndLocation from "@/admin/CreateRateForCompanyAndLocation";
import AppBookings from "@/admin/bookings/AppBookings";
import SettingPage from "@/admin/SettingPage";
import AppUsers from "@/admin/user/AppUsers";
import { useAppDispatch } from "@/lib/hooks";
import { setAdminData } from "@/lib/admin/AdminSlice";
import { URL } from "@/lib/ApiHelper";
import HomeSection from "@/app/Home-components/HomeSection";
import MessageSection from "@/admin/wtsp/MessageSection";

enum SideTabs {
  HOME = "home",
  BOOKING = "booking",
  USERS = "users",
  MSG = "message",
  EDITRATE = "edit rate",
  SETTINGS = "settings",
}

const Admin = () => {
  const [openAddUserModal, setOpenAddUserModal] = useState<boolean>(false);
  const [openAddCountryModal, setOpenAddCountryModal] =
    useState<boolean>(false);
  const [openAddCompanyModal, setOpenAddCompanyModal] =
    useState<boolean>(false);
  const [countryName, setCountryName] = useState<string>();
  const navigation = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openAddRateModal, setOpenAddRateModal] = useState<boolean>(false);
  const [createdCompany, setCreatedCompany] = useState<{
    _id: string;
    name: string;
  }>({ _id: "", name: "" });

  const [activeTab, setActiveTab] = useState<SideTabs>(SideTabs.HOME);
  const dispatch = useAppDispatch();
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
      dispatch(setAdminData(data));
    }
  };
  const createCountry = async () => {
    setIsLoading(true);
    const response = await axios
      .post(`${URL}/api/country`, { name: countryName })
      .then((response) => response.data);

    if (response.status) {
      setIsLoading(false);
      toast.success("Country created!");
      setOpenAddCountryModal(false);
    } else {
      setIsLoading(false);
      toast.error("error while Country created!");
    }
  };
  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Toaster />
      <Flex w={"100%"} mih={"100vh"}>
        <Stack
          w={"13%"}
          bg={"linear-gradient(to top, #4da6cf, #ec4899)"}
          gap={20}
          pt={20}
          align="center"
        >
          <Flex
            direction={"column"}
            h={"100%"}
            p={10}
            align={"center"}
            justify={"space-between"}
          >
            <Image src={"/logo.png"} w={50} alt="Not found" />
            <Stack h={"60%"}>
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
                  Bookings
                </Text>
              </Flex>
              <Flex
                onClick={() => setActiveTab(SideTabs.USERS)}
                align={"center"}
                gap={10}
                mt={20}
                style={{
                  border:
                    activeTab === SideTabs.USERS ? "1px solid white" : "none",
                }}
                p={5}
              >
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
              <Flex
                onClick={() => setActiveTab(SideTabs.MSG)}
                align={"center"}
                gap={10}
                mt={20}
                style={{
                  border:
                    activeTab === SideTabs.MSG ? "1px solid white" : "none",
                }}
                p={5}
              >
                <FaWhatsapp color="white" size={25} />
                <Text
                  fz={20}
                  ff={"Roboto"}
                  fw={600}
                  c={"white"}
                  style={{ cursor: "pointer" }}
                >
                  Message
                </Text>
              </Flex>
            </Stack>
            <Flex
              onClick={() => setActiveTab(SideTabs.SETTINGS)}
              h={"30%"}
              align={"end"}
              justify={"center"}
              pb={20}
            >
              <Flex align={"center"} gap={10}>
                <IoSettings
                  color="white"
                  size={20}
                  style={{ cursor: "pointer" }}
                />
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
        <Stack w={"90%"} h={"100vh"} style={{ overflow: "hidden" }}>
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
                onClick={() => setOpenAddCountryModal(true)}
              >
                {" "}
                <MdAdd color="white" size={20} /> Country{" "}
              </Button>
              <Button
                variant={"subtle"}
                ff={"Poppins"}
                c={"white"}
                onClick={() => setOpenAddUserModal(true)}
              >
                {" "}
                <MdAdd color="white" size={20} /> User
              </Button>
              <Button
                variant={"subtle"}
                ff={"Poppins"}
                c={"white"}
                onClick={() => setOpenAddCompanyModal(true)}
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
              <IoMdLogOut
                onClick={() => {
                  LogOut();
                  dispatch(setAdminData({ _id: "", name: "", email: "" }));
                  navigation.push("/");
                }}
                size={20}
                color="white"
                style={{ cursor: "pointer" }}
              />
            </Flex>
          </Flex>
          <Stack  mih={"85vh"} style={{ overflowY: "auto", height: "100%" }} py={20} >
            {activeTab === SideTabs.HOME && <HomeSection />}
            {activeTab === SideTabs.BOOKING && <AppBookings />}
            {activeTab === SideTabs.USERS && <AppUsers />}
            {activeTab === SideTabs.MSG && <MessageSection />}
            {activeTab === SideTabs.SETTINGS && <SettingPage />}
          </Stack>
        </Stack>
      </Flex>

      {openAddUserModal && (
        <CreateNewUserModal
          opened={openAddUserModal}
          onClose={() => setOpenAddUserModal(false)}
        />
      )}
      <Modal
        opened={openAddCountryModal}
        title={"Create Country"}
        onClose={() => setOpenAddCountryModal(false)}
        centered
      >
        <Flex
          w={"100%"}
          align={"center"}
          justify={"center"}
          gap={20}
          direction={"column"}
        >
          <TextInput
            w={"80%"}
            label="Country Name"
            placeholder="Enter country name"
            value={countryName}
            style={{ fontFamily: "Roboto" }}
            onChange={(e) => setCountryName(e.target.value)}
            required
          />
          <Group p="right" style={{ marginTop: "12px" }}>
            <Button
              type="submit"
              onClick={createCountry}
              style={{
                backgroundColor: "#ec4899",
                color: "white",
                fontFamily: "Poppins, Roboto, Nunito",
                borderRadius: "8px",
                padding: "10px 20px",
              }}
            >
              Create
            </Button>
          </Group>
        </Flex>
      </Modal>
      {openAddCompanyModal && (
        <AddNewCompanyModal
          openAddCompanyModal={openAddCompanyModal}
          setOpenAddCompanyModal={setOpenAddCompanyModal}
          setOpenAddRateModal={setOpenAddRateModal}
          setCreatedCompany={setCreatedCompany}
        />
      )}
      {openAddRateModal && (
        <CreateRateForCompanyAndLocation
          open={openAddRateModal}
          createdCompany={createdCompany}
          setOpenAddRateModal={setOpenAddRateModal}
        />
      )}
    </>
  );
};

export default Admin;
