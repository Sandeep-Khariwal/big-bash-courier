"use client";

import { LoadingOverlay, ScrollArea, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

export interface ParcelModel {
  _id: string;
  senderName: string;
  recieverName: string;
  company: string;
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
import ParcelCard from "@/admin/bookings/ParcelCard";
import { useAppSelector } from "@/lib/hooks";
import { URL } from "@/lib/ApiHelper";

const Booking = () => {
  const [allParcel, setAllParcel] = useState<ParcelModel[]>([]);
  const user = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (user._id) {
      getAllParcel();
    }
  }, [user]);

  const getAllParcel = async () => {
    setIsLoading(true);
    const response = await axios
      .get(`${URL}/api/user/parcel/${user._id}`)
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
      <Text fz={30} fw={700} ta="center" c="#4da6cf" mb="md">
        📦 Parcel Bookings
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
          {allParcel.length > 0 ? (
            allParcel.map((parcel: ParcelModel, index) => (
              <ParcelCard key={parcel._id} parcel={parcel} index={index} />
            ))
          ) : (
            <Text fz={30} fw={700} ta="center" c="#4da6cf" mb="md">
              No parcel booked yet
            </Text>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default Booking;
