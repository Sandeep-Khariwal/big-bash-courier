"use client";

import { Box, Flex, Stack, Text } from "@mantine/core";
import { useState } from "react";
import {
  BiArrowFromLeft,
  BiArrowFromTop,
  BiRupee,
} from "react-icons/bi";

export interface parcelModel {
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
}

export default function ParcelCard(props: {
  parcel: parcelModel;
  index: number;
}) {
  const [openCard, setOpenCard] = useState<boolean>(false);
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
      <Flex
        key={props.parcel._id}
        p="md"
        justify="space-between"
        align="center"
      >
        <Box>
          <Text fw={700} c={"white"}>
            {props.parcel.senderName} → {props.parcel.recieverName}
          </Text>
          <Text size="sm" c={"white"}>
            {props.parcel.company} - {props.parcel.country}
          </Text>
        </Box>
        <Flex align={"center"} gap={10}>
          <Text size="sm" fw={600} c={"white"}>
            {props.parcel.weight} kg | <BiRupee />
            {props.parcel.price}
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
            <Text
              fz={20}
              ff={"Roboto"}
              fw={700}
              style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
            >
              Address:{" "}
              <span
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  fontFamily: "Nunito",
                }}
              >
                {props.parcel.address}
              </span>
            </Text>

            <Flex w={"100%"} align={"center"} justify={"start"} gap={30}>
              <Stack w={"50%"} >
                <Text
                  fz={20}
                  ff={"Roboto"}
                  fw={700}
                  style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                >
                  ✉ Sender Email:{" "}
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      fontFamily: "Nunito",
                      marginLeft: 5,
                    }}
                  >
                    {props.parcel.senderEmail}
                  </span>
                </Text>
                <Text
                  fz={20}
                  ff={"Roboto"}
                  fw={700}
                  style={{ marginBottom: "8px", whiteSpace: "nowrap" }}
                >
                  ✉ Receiver Email:{" "}
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      fontFamily: "Nunito",
                      marginLeft: 5,
                    }}
                  >
                    {props.parcel.reciverEmail}
                  </span>
                </Text>
              </Stack>

              <Stack w={"50%"}>
                <Text
                  fz={20}
                  ff={"Roboto"}
                  fw={700}
                  style={{
                    marginBottom: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  📞 Sender Contact:{" "}
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      fontFamily: "Nunito",
                      marginLeft: 5,
                    }}
                  >
                    {props.parcel.senderContact}
                  </span>
                </Text>

                <Text fz={20} ff={"Roboto"} fw={700}>
                  📞 Receiver Contact:{" "}
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      fontFamily: "Nunito",
                      marginLeft: 5,
                    }}
                  >
                    {props.parcel.recieverContact}
                  </span>
                </Text>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
