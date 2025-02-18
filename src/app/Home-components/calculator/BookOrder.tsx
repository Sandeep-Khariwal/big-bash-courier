"use client";
import {
  Button,
  Flex,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { TableData } from "./Hero";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useAppSelector } from "@/lib/hooks";
import { URL } from "@/lib/ApiHelper";

const BookOrder = (props: { orderData: TableData; onClose: () => void }) => {
  const [address, setAddress] = useState<string>("");
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [reciverEmail, setRecieverEmail] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [recieverName, setRecieverName] = useState<string>("");
  const [senderContact, setSenderContact] = useState<string>("");
  const [recieverContact, setRecieverContact] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);

  // Fetch all countries from REST Countries API
  const bookParcel = async () => {
    setIsLoading(true);
    const response = await axios
      .post(`${URL}/api/parcel`, {
        senderEmail: senderEmail,
        reciverEmail: reciverEmail,
        senderName: senderName,
        senderContact: senderContact,
        recieverName: recieverName,
        recieverContact: recieverContact,
        company: props.orderData.company.name,
        country: props.orderData.country,
        address,
        weight: props.orderData.weight,
        price: props.orderData.price,
        userId: user._id,
      })
      .then((response) => response.data);

    if (response.status === 200) {
      if(user._id){
        const response1 = await axios
          .put(`${URL}/api/user/parcel`, {
            userId: user._id,
            parcelId: response.parcel._id,
          })
          .then((response) => response.data);
  
        if (response1.status === 200) {
          setIsLoading(false);
          toast.success("Booking success!");
          setIsLoading(false);
          props.onClose();
        } else {
          setIsLoading(false);
          toast.error("server issue!!");
          console.log(response);
        }
      } else {
        setIsLoading(false);
        toast.success("Booking success!");
        setIsLoading(false);
        props.onClose(); 
      }
    } else {
      toast.error("server issue!!");
      console.log(response);
    }
  };
  return (
    <>
      <Toaster />
      <LoadingOverlay visible={isLoading} />
      <Modal
        opened={props.orderData ? true : false}
        onClose={() => props.onClose()}
        title="Book your parcel"
        centered
        size={"lg"}
        zIndex={1234}
      >
        <TextInput
          w={"10rem"}
          label="Company name"
          disabled
          value={props.orderData.company.name}
        />

        <Flex align={"center"} mt={20} justify={"start"} gap={20}>
          <TextInput
            value={props.orderData.country}
            disabled
            label="Country name"
          />
          <TextInput
            placeholder="proper Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Address"
          />
        </Flex>
        <Flex align={"center"} mt={20} justify={"start"} gap={20}>
          <TextInput
            value={senderName}
            label="Parcel Sender Name"
            placeholder="Enter sender name"
            onChange={(e) => setSenderName(e.target.value)}
          />
          <TextInput
            label="Parcel Reciever Name"
            value={recieverName}
            placeholder="Enter reciever name"
            onChange={(e) => setRecieverName(e.target.value)}
          />
        </Flex>

        <Flex align={"center"} mt={20} justify={"start"} gap={20}>
          <TextInput
            value={senderEmail}
            label="Parcel Sender Email"
            placeholder="Enter sender email"
            onChange={(e) => setSenderEmail(e.target.value)}
          />
          <TextInput
            label="Parcel Reciever Email"
            value={reciverEmail}
            placeholder="Enter reciever email"
            onChange={(e) => setRecieverEmail(e.target.value)}
          />
        </Flex>

        <Flex align={"center"} mt={20} justify={"start"} gap={20}>
          <TextInput
            value={senderContact}
            label="Parcel Sender Phone No"
            placeholder="Enter sender Phone no."
            onChange={(e) => setSenderContact(e.target.value)}
          />
          <TextInput
            label="Parcel Reciever Phone No"
            value={recieverContact}
            placeholder="Enter reciever phone no."
            onChange={(e) => setRecieverContact(e.target.value)}
          />
        </Flex>

        <Flex align={"end"} mt={20} justify={"start"} gap={20}>
          <TextInput value={props.orderData.weight} disabled label="weight" />
          <Text ff={"Roboto"} fw={600} fz={30}>
            <BiRupee />
            {props.orderData.price}
          </Text>
        </Flex>
        <Button variant="outline" onClick={bookParcel} mt={20}>
          submit parcel
        </Button>
      </Modal>
    </>
  );
};

export default BookOrder;
