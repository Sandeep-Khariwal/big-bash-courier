"use client";

import { URL } from "@/lib/ApiHelper";
import {
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import React, { SetStateAction, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddNewCompanyModal = (props: {
  openAddCompanyModal: boolean;
  setOpenAddCompanyModal: React.Dispatch<SetStateAction<boolean>>;
  setOpenAddRateModal: React.Dispatch<SetStateAction<boolean>>;
  setCreatedCompany: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      name: string;
    }>
  >;
}) => {
  const [companyName, setCompanyName] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createCompany = async () => {
    setIsLoading(true);
    const response = await axios
      .post(`${URL}/api/company`, { name: companyName })
      .then((response) => response.data);

    if (response.status === 200) {
      toast.success("company created");
      setIsLoading(false);
      props.setOpenAddRateModal(true);
      const { company } = response;
      props.setCreatedCompany(company);
      props.setOpenAddCompanyModal(false);
    }
  };
  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Toaster />
      <Modal
        opened={props.openAddCompanyModal}
        title={"Add Company"}
        onClose={() => props.setOpenAddCompanyModal(false)}
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
            label="Company Name"
            placeholder="Enter company name"
            value={companyName}
            style={{ fontFamily: "Roboto" }}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <Group p="right" style={{ marginTop: "12px" }}>
            <Button
              type="submit"
              onClick={createCompany}
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
    </>
  );
};

export default AddNewCompanyModal;
