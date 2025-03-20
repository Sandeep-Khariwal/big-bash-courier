"use client";

import { URL } from "@/lib/ApiHelper";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Client {
  _id?: string;
  name: string;
  number: string;
}

const MessageSection = () => {
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [clientnumber, setClientNumber] = useState<string>("");
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("message : ", message);
    
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    setIsLoading(true);
    const response = await axios
      .get(`${URL}/api/contact`)
      .then((response) => response.data);

    if (response.status === 200) {
      setAllClients(response.contacts);
      setIsLoading(false);
    } else {
      toast.error("server issue!!");
      console.log(response);
      setIsLoading(false);
    }
  };

  const createContact = async () => {
    setIsLoading(true);
    const response = await axios
      .post(`${URL}/api/contact`, { name: clientName, number: clientnumber })
      .then((response) => response.data);

    if (response.status === 200) {
      toast.success("Contact added!!");
      setAllClients((prev) => [...prev, response.contact]);
      setIsLoading(false);
    } else {
      toast.error("server issue!!");
      console.log(response);
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (number: string) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAllChange = () => {
    if (checkAll) {
      setSelectedNumbers([]);
    } else {
      setSelectedNumbers(allClients.map((client) => client.number));
    }
    setCheckAll(!checkAll);
  };

  return (
    <Stack w={"90%"} h={"85vh"} mx={"auto"}>
      <Toaster />
      <LoadingOverlay visible={isLoading} />
      <Text fz={24} ff={"poppins"} c={"#696880"}>
        Send whatsapp messages to the clients
      </Text>

      <Flex
        w={"100%"}
        align={"center"}
        mt={20}
        justify={"space-between"}
        h={"100%"}
      >
        <Stack w={"45%"} h={"100%"}>
          <Flex w={"100%"} align={"end"} justify={"space-between"}>
            <TextInput
              w={"32%"}
              label="Client Name"
              onChange={(e) => setClientName(e.target.value)}
              c="gray"
              placeholder="Enter Name"
            />
            <TextInput
              w={"32%"}
              label="Client Number"
              onChange={(e) => setClientNumber(e.target.value)}
              c="gray"
              placeholder="Enter Number"
            />
            <Button
              onClick={createContact}
              w={"32%"}
              variant="filled"
              bg={"#4da6cf"}
            >
              + Add
            </Button>
          </Flex>
          <Flex w={"100%"} mt={20} align={"center"}>
            <Checkbox
              checked={checkAll}
              onClick={handleSelectAllChange}
              label="Select All"
              c={"gray"}
              style={{ cursor: "pointer" }}
            />
          </Flex>
          <Divider mb={10} />
          <ScrollArea
            my={10}
            style={{ height: "60%", marginBottom: "16px", overflow: "hidden" }}
          >
            <Box>
              {allClients.map((client) => (
                <Checkbox
                  key={client.number}
                  fw={600}
                  m={20}
                  fz={20}
                  c={"gray"}
                  label={
                    <Stack style={{ width: "100%" }}>
                      <Text fz={14}>
                        {client.name} <br />{" "}
                        <span style={{ fontWeight: 600 }}>{client.number}</span>{" "}
                      </Text>
                    </Stack>
                  }
                  checked={selectedNumbers.includes(client.number)}
                  onChange={() => handleCheckboxChange(client.number)}
                  mb="xs"
                />
              ))}
            </Box>
          </ScrollArea>
        </Stack>
        <Divider h={"100%"} orientation="vertical" />
        <Stack w={"45%"} h={"100%"}>
          <Text fz={24} fw={500} ff={"poppins"} c={"#27292B"}>
            Type the message
          </Text>
          <Textarea
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            autosize
            minRows={2}
          />
          <Button bg={"#4da6cf"}>Send Message</Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default MessageSection;
