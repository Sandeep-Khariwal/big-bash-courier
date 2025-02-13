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

const SignInModal = (props: { opened: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async() => {
    const response = await axios.post("http://localhost:3000/api/user",{email:formData.email, password:formData.password }).then((response)=>response.data)

    if(response.status){
      toast.success("Form Submited Successfuly!.");
      // navigation.push("/");
    }
  };
  return (
    <>
    <Toaster/>
   
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
    </>);
};

export default SignInModal;
