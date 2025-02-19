import { Flex, LoadingOverlay, ScrollArea, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { ParcelModel } from "../bookings/AppBookings";
import ParcelCard from "../bookings/ParcelCard";
import { BiArrowFromRight, BiUser } from "react-icons/bi";
import { URL } from "@/lib/ApiHelper";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  parcel: string[];
  discount: number;
}

const AppUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);
  const [allParcel, setAllParcel] = useState<ParcelModel[]>([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      getUserParcels();
    }
  }, [selectedUserId]);

  const getAllUsers = async () => {
    setIsLoading(true);
    const response = await axios
      .patch(`${URL}/api/user`)
      .then((response) => response.data);

    if (response.status === 200) {
      setUsers(response.users);
      setIsLoading(false);
    } else {
      console.log(response);
    }
  };

  const getUserParcels = async () => {
    setIsLoading(true);
    const response = await axios
      .patch(`${URL}/api/user/parcel`, {
        parcelIds: selectedUserId,
      })
      .then((response) => response.data);

    if (response.status === 200) {
      setAllParcel(response.allParcels);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log(response);
    }
  };

  return (
    <Stack w={"90%"} mx={"auto"} mih={"80vh"} p={20}>
      <LoadingOverlay visible={isLoading} />
      {!(selectedUserId.length > 0) && (
        <Stack w={"100%"} mih={"80vh"} style={{ overflowY: "hidden" }}>
          <Text fz={30} fw={700} ta="center" c="#4da6cf" mb="md">
            <BiUser /> All Users
          </Text>
          <ScrollArea
            w={"90%"}
            className="scrollArea"
            h={"70vh"}
            mx={"auto"}
            p={10}
            style={{
              border: "1px solid gray",
              borderRadius: "0.5rem",
            }}
          >
            <Stack>
              {users.map((d: UserData) => (
                <UserCard key={d._id} user={d} setSelectedUserId={setSelectedUserId} />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      )}
      {selectedUserId.length > 0 && (
        <Stack w={"100%"} mih={"80vh"} style={{ overflowY: "hidden" }}>
          <Flex w={"95%"} mx={"auto"} p={20} align={"center"} >
            <Flex w={"50%"} align={"center"} gap={10} >
            <BiArrowFromRight size={36} color="#4da6cf" style={{cursor:"pointer"}}  onClick={() => setSelectedUserId([])} />
            <Text fz={28} fw={700} ta="center" c="#4da6cf"  onClick={() => setSelectedUserId([])} style={{cursor:"pointer"}} >
              {" "}
               Back
            </Text>
            </Flex>
          <Text fz={30} fw={700} ta="center" c="#4da6cf" mb="md">
            📦 Parcel Bookings
          </Text>
          </Flex>
          <ScrollArea
            w={"90%"}
            className="scrollArea"
            h={"70vh"}
            mx={"auto"}
            p={10}
            style={{
              border: "1px solid gray",
              borderRadius: "0.5rem",
            }}
          >
            <Stack>
              {allParcel.map((parcel: ParcelModel, index) => (
                <ParcelCard key={parcel._id} parcel={parcel} index={index} />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      )}
    </Stack>
  );
};

export default AppUsers;
