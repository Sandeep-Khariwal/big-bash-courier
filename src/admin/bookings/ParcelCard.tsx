"use client";

import { URL } from "@/lib/ApiHelper";
import { Box, Flex, LoadingOverlay, Stack, Text } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { BiArrowFromLeft, BiArrowFromTop, BiRupee } from "react-icons/bi";
import { FaCheckCircle, FaMapPin } from "react-icons/fa";
import {
  FaAddressCard,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

export interface parcelModel {
  _id: string;
  senderName: string;
  userId: string;
  recieverName: string;
  company: string;
  country: string;
  recieverAddress: string;
  senderAddress: string;
  senderEmail: string;
  reciverEmail: string;
  senderContact: string;
  recieverContact: string;
  recieverPinCode: string;
  senderPinCode: string;
  weight: number;
  price: number;
  done: boolean;
  dispatch: Date | null;
  delivered: Date | null;
  isCustomBooking: boolean;
}

export default function ParcelCard(props: {
  parcel: parcelModel;
  index: number;
  getAllParcel?: () => void;
}) {
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const markDone = async () => {
    setIsLoading(true);
    const response = await axios
      .put(`${URL}/api/parcel/${props.parcel._id}`, { id: props.parcel._id })
      .then((response) => response.data);

    if (response.status === 200) {
      toast.success("Booking marked");
      if (props.getAllParcel) {
        props.getAllParcel();
      }
      setIsLoading(false);
    } else {
      toast.error("server issue!!");
      console.log(response);
    }
  };
  return (
    <Stack
      w={"95%"}
      mx={"auto"}
      bg={props.index % 2 === 0 ? "#ec4899" : "#4da6cf"}
      style={{
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "0.3s",
      }}
    >
      <LoadingOverlay visible={isLoading} />
      <Toaster />
      <Flex
        key={props.parcel._id}
        p="md"
        justify="space-between"
        align="center"
      >
        <Box>
          <Text fw={700} c={"white"} ff={"Roboto"}>
            {props.parcel.senderName} → {props.parcel.recieverName}
          </Text>
          <Text size="sm" c={"white"} ff={"poppins"}>
            {props.parcel?.company || "To"} - {props.parcel.recieverAddress}
          </Text>
        </Box>
        <Flex align={"center"} gap={10}>
          <Text size="sm" fw={600} c={"white"} ff={"poppins"}>
            {props.parcel.weight} kg
            {props.parcel.price
              ? "| " + <BiRupee /> + " " + props.parcel.price
              : ""}
          </Text>
          {openCard ? (
            <BiArrowFromTop
              color="white"
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => setOpenCard(!openCard)}
            />
          ) : (
            <BiArrowFromLeft
              color="white"
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => setOpenCard(!openCard)}
            />
          )}

          <FaCheckCircle
            color="green"
            size={24}
            style={{ cursor: "pointer" }}
            onClick={markDone}
          />
        </Flex>
      </Flex>
      {openCard && (
        <Stack bg={props.index % 2 === 0 ? "#4da6cf" : "#ec4899"}>
          <Stack
            gap={20}
            p="md"
            style={{
              borderRadius: "12px",
              color: "white",
            }}
          >
            <Flex w={"100%"} align={"center"} justify={"start"} gap={30}>
              <Stack w={"50%"}>
                <Text
                  fz={20}
                  ff={"Roboto"}
                  fw={600}
                  style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                >
                  From :
                </Text>
                <Flex gap={15} align={"center"}>
                  <Flex
                    fz={20}
                    ff={"Roboto"}
                    fw={700}
                    style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                  >
                    <FaUser />
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        fontFamily: "poppins",
                        marginLeft: 5,
                      }}
                    >
                      {props.parcel.senderName}
                    </span>
                  </Flex>
                  <Flex
                    fz={20}
                    ff={"Roboto"}
                    fw={700}
                    style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                  >
                    <FaPhone />
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        fontFamily: "poppins",
                        marginLeft: 5,
                      }}
                    >
                      {props.parcel.senderContact}
                    </span>
                  </Flex>
                  <Flex
                    fz={20}
                    ff={"Roboto"}
                    fw={700}
                    style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                  >
                    <FaMapPin />
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        fontFamily: "poppins",
                        marginLeft: 5,
                      }}
                    >
                      {props.parcel.senderPinCode}
                    </span>
                  </Flex>
                </Flex>

                <Flex
                  fz={20}
                  ff={"Roboto"}
                  fw={700}
                  style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                >
                  <FaAddressCard />
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      fontFamily: "poppins",
                      marginLeft: 5,
                    }}
                  >
                    {props.parcel.senderAddress}
                  </span>
                </Flex>
              </Stack>

              <Stack w={"50%"}>
                <Text
                  fz={20}
                  ff={"Roboto"}
                  fw={600}
                  style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                >
                  To :
                </Text>
                <Flex gap={10} align={"center"}>
                  <Flex
                    fz={20}
                    ff={"Roboto"}
                    fw={700}
                    style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                  >
                    <FaUser />
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        fontFamily: "poppins",
                        marginLeft: 5,
                      }}
                    >
                      {props.parcel.recieverName}
                    </span>
                  </Flex>
                  <Flex
                    fz={20}
                    ff={"Roboto"}
                    fw={700}
                    style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                  >
                    <FaPhone />
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        fontFamily: "poppins",
                        marginLeft: 5,
                      }}
                    >
                      {props.parcel.recieverContact}
                    </span>
                  </Flex>
                  <Flex
                    fz={20}
                    ff={"Roboto"}
                    fw={700}
                    style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                  >
                    <FaMapPin />
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        fontFamily: "poppins",
                        marginLeft: 5,
                      }}
                    >
                      {props.parcel.recieverPinCode}
                    </span>
                  </Flex>
                </Flex>

                <Flex
                  fz={20}
                  ff={"Roboto"}
                  fw={700}
                  style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                >
                  <FaAddressCard />
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      fontFamily: "poppins",
                      marginLeft: 5,
                    }}
                  >
                    {props.parcel.recieverAddress}
                  </span>
                </Flex>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
