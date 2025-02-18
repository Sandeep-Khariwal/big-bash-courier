"use client";
import React, { useState } from "react";
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Stack,
  NumberInput,
} from "@mantine/core";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "@/lib/ApiHelper";

const CreateNewUserModal = (props: {
  opened: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    discount: number;
    password: string;
  }>({
    name: "",
    email: "",
    discount: 0,
    password: "",
  });

  const handleSubmit = async () => {
    const response = await axios
      .post(`${URL}/api/user`, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        discount: formData.discount,
      })
      .then((response) => response.data);

    if (response.status) {
      toast.success("Form Submited Successfuly!.");
      setTimeout(() => {
        props.onClose();
      }, 2000);
    }
  };
  return (
    <>
      <Toaster />

      <Modal
        opened={props.opened}
        onClose={() => props.onClose()}
        title="Create New User"
        size="sm"
        centered
        zIndex={123}
      >
        <Stack gap={12}>
          <TextInput
            label="Username"
            placeholder="Enter user name"
            value={formData.name}
            name="name"
            style={{ fontFamily: "Roboto" }}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
          />
          <NumberInput
            label="User Discount"
            placeholder="Enter user discount"
            value={formData.discount}
            name="discount"
            style={{ fontFamily: "Roboto" }}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                discount: Number(val),
              }))
            }
            required
          />
          <TextInput
            label="Email"
            placeholder="Enter user email"
            value={formData.email}
            name="email"
            style={{ fontFamily: "Roboto" }}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            required
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="create user password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            style={{ fontFamily: "Nunito" }}
            required
          />
          <Group p="right" style={{ marginTop: "12px" }}>
            <Button
              type="submit"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#ec4899",
                color: "white",
                fontFamily: "Poppins, Roboto, Nunito",
                borderRadius: "8px",
                padding: "10px 20px",
              }}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default CreateNewUserModal;
