"use client";

import { URL } from "@/lib/ApiHelper";
import { useAppSelector } from "@/lib/hooks";
import { Button, Flex, LoadingOverlay, Stack, Text, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
interface FormData {
  fromName: string;
  fromContact: string;
  fromWeight: string;
  fromPinCode: string;
  fromAddress: string;
  toName: string;
  toContact: string;
  toWeight: string;
  toPinCode: string;
  toAddress: string;
}

const ClientBookingForm = () => {
  // Define state to hold form values
  const isMd = useMediaQuery("(max-width: 968px)");
   const user = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<FormData>({
    fromName: "",
    fromContact: "",
    fromWeight: "",
    fromPinCode: "",
    fromAddress: "",
    toName: "",
    toContact: "",
    toWeight: "",
    toPinCode: "",
    toAddress: "",
  });
    const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle form field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    bookParcel()
  };

  const bookParcel = async () => {
    setIsLoading(true);
    const response = await axios
      .post(`${URL}/api/parcel`, {
        senderName: formData.fromName,
        senderContact: formData.fromContact,
        senderPinCode:formData.fromPinCode,
        weight: formData.fromWeight ,
        senderAddress:formData.fromAddress,

        recieverName: formData.toName,
        recieverContact: formData.toContact,
        recieverPinCode:formData.toPinCode,
        recieverAddress:formData.toAddress,
        isCustomBooking:true
      })
      .then((response) => response.data);

    if (response.status === 200) {
      if (user._id) {
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
        } else {
          setIsLoading(false);
          toast.error("server issue!!");
          console.log(response);
        }
      } else {
        setIsLoading(false);
        toast.success("Booking success!");
        setIsLoading(false);
      }
    } else {
      toast.error("server issue!!");
      console.log(response);
    }
  };
  return (
    <>
    <Toaster/>
    <LoadingOverlay visible={isLoading} />
      <Flex
        w={isMd?"95%":"70%"}
        direction={"column"}
        mih={"60vh"}
        align={"center"}
        justify={"space-between"}
        p={10}
        mx={"auto"}
        style={{
          position: "absolute",
          left: "50%",
          top: "60%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          background: "rgba(81, 100, 105, 0.6);",
          borderRadius: "1rem",
        }}
      >
        <Flex w={"100%"} align={"start"} justify={"space-between"}  direction={isMd?"column":"row"} >
          <Stack
            w={isMd?"100%":"45%"}
            h={"80%"}
            p={20}
            style={{ border: "1px solid white" }}
          >
            <Text fw={600} fz={22} ff={"Roboto"} c={"white"}>
              From :
            </Text>
            <Flex w={"100%"} gap={10} align={"center"} justify={"space-between"}>
              <TextInput placeholder="Enter Name" onChange={(e)=>handleChange(e,"fromName")} label="Name" c={"white"} />
              <TextInput
                placeholder="Enter Contact"
                label="Contact Number"
                c={"white"}
                onChange={(e)=>handleChange(e,"fromContact")}
              />
            </Flex>
            <Flex w={"100%"} gap={10} align={"center"} justify={"space-between"}>
              <TextInput
                placeholder="Enter Weight"
                label="Weight"
                c={"white"}
                onChange={(e)=>handleChange(e,"fromWeight")}
              />
              <TextInput
                placeholder="Enter pin code"
                label="PIN CODE"
                c={"white"}
                onChange={(e)=>handleChange(e,"fromPinCode")}
              />
            </Flex>
            <Flex>
              <TextInput placeholder="Address" label="Address" c={"white"} onChange={(e)=>handleChange(e,"fromAddress")} />
            </Flex>
          </Stack>
          <Stack
            w={isMd?"100%":"45%"}
            h={"80%"}
            p={20}
            style={{ border: "1px solid white" }}
          >
            <Text fw={600} fz={22} ff={"Roboto"} c={"white"}>
              To :
            </Text>
            <Flex w={"100%"} gap={10} align={"center"} justify={"space-between"}>
              <TextInput placeholder="Enter Name" label="Name" c={"white"} onChange={(e)=>handleChange(e,"toName")} />
              <TextInput
                placeholder="Enter Contact"
                label="Contact Number"
                c={"white"}
                onChange={(e)=>handleChange(e,"toContact")}
              />
            </Flex>
            <Flex w={"100%"} gap={10} align={"center"} justify={"space-between"}>
            
               <TextInput placeholder="Address"   onChange={(e)=>handleChange(e,"toAddress")} label="Address" c={"white"} />
              <TextInput
                placeholder="Enter pin code"
                label="PIN CODE"
                c={"white"}
                onChange={(e)=>handleChange(e,"toPinCode")}
              />
            </Flex>
          </Stack>
        </Flex>
        <Flex w={"100%"} align={"center"} justify={"start"} >
        <Button
          onClick={handleSubmit}
          style={{ position: "absolute", bottom: isMd?"-50px":"20px" }}
          color="blue"
        >
          Submit
        </Button>

        </Flex>
      </Flex>
    </>
  );
};

export default ClientBookingForm;
