"use client";
import React, { useState } from "react";
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { SaveUserToken } from "@/utility/AddLocalStorage";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setAdminData } from "@/lib/admin/AdminSlice";

const SignInModal = (props: { opened: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
   const dispatch = useAppDispatch();
  const navigation = useRouter();
  const handleSubmit = async () => {
    const response = await axios
      .put("http://localhost:3000/api/admin", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => response.data);

    if (response.status === 200) {
      const { admin, token } = response;
      toast.success("Logged In!");
      dispatch(setAdminData(admin))
      SaveUserToken(token);
      props.onClose();
      setTimeout(() => {
        navigation.push(`/admin/${admin._id}`);
      }, 1500);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <>
      <Toaster />

      <Modal
        opened={props.opened}
        onClose={() => props.onClose()}
        title="Admin Sign In"
        size="sm"
        centered
        zIndex={123}
      >
        <Stack gap={12}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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

export default SignInModal;
