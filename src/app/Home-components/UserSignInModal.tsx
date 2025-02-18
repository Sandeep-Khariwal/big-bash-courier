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
import { useRouter } from "next/navigation";
import { SaveUserToken } from "@/utility/AddLocalStorage";
import { useAppDispatch } from "@/lib/hooks";
import { setUserData } from "@/lib/user/UserSlice";
import { URL } from "@/lib/ApiHelper";

const UserSignInModal = (props: { opened: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigation = useRouter()
   const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    const response = await axios
      .put(`${URL}/api/user`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => response.data);

    if (response.status === 200) {
      const {user,token} = response
      toast.success("Logged In!.");
      dispatch(setUserData(user))
      SaveUserToken(token)
      props.onClose()
      setTimeout(()=>{
        navigation.push(`/user/${user._id}`)
      },2000)
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
        title="User Sign In"
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

export default UserSignInModal;
