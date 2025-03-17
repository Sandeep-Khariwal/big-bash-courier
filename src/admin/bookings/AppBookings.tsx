"use client";

import { Flex, LoadingOverlay, ScrollArea, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ParcelCard from "./ParcelCard";
import axios from "axios";

export interface ParcelModel {
  _id: string;
  senderName: string;
  recieverName: string;
  company?: string;
  country: string;
  address: string;
  senderEmail: string;
  reciverEmail: string;
  senderContact: string;
  recieverContact: string;
  weight: number;
  price: number;
  done?: boolean;
  dispatch?: Date | null;
  delivered?: Date | null;
}

import toast, { Toaster } from "react-hot-toast";
import { URL } from "@/lib/ApiHelper";

const AppBookings = () => {
  const [allParcel, setAllParcel] = useState<ParcelModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookingType, setBookingType] = useState<string>("booking");
  useEffect(() => {
    getAllParcel();
  }, [bookingType]);

  const getAllParcel = async () => {
    setIsLoading(true);
    const isBookingOrCustom = bookingType === "custom"
    const response = await axios
      .get(`${URL}/api/parcel/${isBookingOrCustom}`)
      .then((response) => response.data);

    if (response.status === 200) {
      setAllParcel(response.allParcels);
      setIsLoading(false);
    } else {
      toast.error("server issue!!");
      console.log(response);
    }
  };
  return (
    <Stack w={"100%"} mih={"80vh"} style={{ overflowY: "hidden" }}>
      <LoadingOverlay visible={isLoading} />
      <Toaster />
      <Text fz={30} fw={700} ff={"poppins"} ta="center" c="#4da6cf" mb="md">
        📦 Parcel Bookings
      </Text>
      <Flex  w={"90%"} align={"center"} gap={20} mx={"auto"}>
        <Text
          onClick={() => setBookingType("booking")}
          c={bookingType === "booking" ? "#4da6cf" : "gray"}
          fz={20}
          fw={700}
          ff={"Roboto"}
          style={{
            cursor: "pointer",
            border: "none",
            borderBottom:bookingType === "booking" ? "2px solid #4da6cf":"none",
          }}
        >
          Bookings
        </Text>
        <Text
          onClick={() => setBookingType("custom")}
          c={bookingType === "custom" ? "#4da6cf" : "gray"}
          fz={20}
          fw={700}
          ff={"Roboto"}
          style={{
            cursor: "pointer",
            border: "none",
            borderBottom: bookingType === "custom"?"2px solid #4da6cf":"none",
          }}
        >
          Custom Bookings
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
  );
};

export default AppBookings;
