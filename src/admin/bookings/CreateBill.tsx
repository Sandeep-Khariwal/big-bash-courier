"use client";

import {
  Button,
  Divider,
  Flex,
  LoadingOverlay,
  Radio,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React, { SetStateAction, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { createBill } from "@/admin/bookings/HtmlToPdf";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "@/lib/ApiHelper";

export interface BillData {
  trackingNumber: string;
  senderName: string;
  senderMobile: string;
  senderAddress: string;
  receiverName: string;
  receiverMobile: string;
  receiverAddress: string;
  destination: string;
  origin: string;
  shipmentType: "air" | "road";
  goodsDesc: string;
  pieces: string;
  actualWgt: string;
  chargedWgt: string;
  goodsValue: string;
  toPatCod: string;
  grossAmount: string;
  podChrg: string;
  odaChrg: string;
  insurancePercent: string;
  netAmount: string;
  date: Date | null;
}

const CreateBill = (props: {
  setIsBillComponent: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<BillData>({
    trackingNumber: "",
    senderName: "",
    senderMobile: "",
    senderAddress: "",
    receiverName: "",
    receiverMobile: "",
    receiverAddress: "",
    destination: "",
    origin: "",
    shipmentType: "air",
    goodsDesc: "",
    pieces: "",
    actualWgt: "",
    chargedWgt: "",
    goodsValue: "",
    toPatCod: "",
    grossAmount: "",
    podChrg: "",
    odaChrg: "",
    insurancePercent: "",
    netAmount: "",
    date: new Date(),
  });

  const handleReset = () => {
    setFormData({
      trackingNumber: "",
      senderName: "",
      senderMobile: "",
      senderAddress: "",
      receiverName: "",
      origin: "",
      receiverMobile: "",
      receiverAddress: "",
      destination: "",
      shipmentType: "air",
      goodsDesc: "",
      pieces: "",
      actualWgt: "",
      chargedWgt: "",
      goodsValue: "",
      toPatCod: "",
      grossAmount: "",
      podChrg: "",
      odaChrg: "",
      insurancePercent: "",
      netAmount: "",
      date: new Date(),
    });
  };

  const saveBill = async () => {
    if (!formData.trackingNumber) {
      toast.error("Tracking Number Required");
      return;
    }
    if (!formData.senderName) {
      toast.error("Sender Name Required");
      return;
    }
    if (!formData.senderMobile) {
      toast.error("Sender Mobile Required");
      return;
    }
    if (!formData.senderAddress) {
      toast.error("Sender Address Required");
      return;
    }
    if (!formData.receiverMobile) {
      toast.error("Reciever Mobile Required");
      return;
    }
    if (!formData.receiverName) {
      toast.error("Reciever Name Required");
      return;
    }
    if (!formData.receiverAddress) {
      toast.error("Reciever Address Required");
      return;
    }
    if (!formData.origin) {
      toast.error("Origin Required");
      return;
    }
    if (!formData.destination) {
      toast.error("Destination Required");
      return;
    }
    if (!formData.goodsDesc) {
      toast.error("Goods Details Required");
      return;
    }
    if (!formData.pieces) {
      toast.error("Pieces Required");
      return;
    }
    if (!formData.actualWgt) {
      toast.error("Actual WGT Required");
      return;
    }
    if (!formData.netAmount) {
      toast.error("Net Amount Required");
      return;
    }
    if (!formData.goodsValue) {
      toast.error("Declared value Required");
      return;
    }
    setIsLoading(true);
    const response = await axios
      .post(`${URL}/api/bill`, formData)
      .then((response) => response.data);

    if (response.status === 200) {
      toast.success("Bill created!!");
      setIsLoading(false);
      handlePrint();
    } else {
      toast.error("server issue!!");
      console.log(response);
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    const receiptHtml = createBill(formData);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(receiptHtml);
      printWindow.document.close();
      printWindow.print();
      handleReset()
    } else {
      console.error("Failed to open print window.");
    }
  };

  return (
    <Stack w={"90%"} h={"100%"} mx={"auto"} pb={20} >
      <Toaster />
      <LoadingOverlay visible={isLoading} />
      <Stack w={"100%"} h={"100%"}  >
        <Flex w={"100%"} align={"start"} justify={"space-between"}>
          <Text ml={20} fz={24} ff={"poppins"} c={"#696880"}>
            Create Bill
          </Text>
        </Flex>
        <Flex w={"100%"} align={"start"} justify={"space-between"}>
          <Stack w={"49%"}>
            <Flex
              w={"90%"}
              mx={"auto"}
              align={"center"}
              justify={"space-between"}
            >
              <TextInput
                placeholder="Enter Tracking number"
                label="Tracking Number"
                w={"48%"}
                c="gray"
                value={formData.trackingNumber}
                onChange={(e) =>
                  setFormData({ ...formData, trackingNumber: e.target.value })
                }
              />
              <DatePickerInput
                w={"48%"}
                label="Date"
                ff={"Poppins"}
                placeholder="Select Date"
                radius={"md"}
                value={formData.date}
                onChange={(date) =>
                  setFormData({ ...formData, date: date || null })
                }
              />
            </Flex>
            <Flex
              w={"90%"}
              mx={"auto"}
              align={"center"}
              justify={"space-between"}
            >
              <TextInput
                placeholder="Enter Sender Name"
                label="Sender Name"
                w={"48%"}
                c="gray"
                value={formData.senderName}
                onChange={(e) =>
                  setFormData({ ...formData, senderName: e.target.value })
                }
              />
              <TextInput
                placeholder="Enter Sender Mobile"
                label="Sender Mobile"
                w={"48%"}
                c="gray"
                value={formData.senderMobile}
                onChange={(e) =>
                  setFormData({ ...formData, senderMobile: e.target.value })
                }
              />
            </Flex>
            <TextInput
              placeholder="Enter Address"
              label="Sender Address"
              w={"90%"}
              mx={"auto"}
              c="gray"
              value={formData.senderAddress}
              onChange={(e) =>
                setFormData({ ...formData, senderAddress: e.target.value })
              }
            />
            <Flex
              w={"90%"}
              mx={"auto"}
              align={"center"}
              justify={"space-between"}
            >
              <TextInput
                placeholder="Enter Reciever Name"
                label="Reciever Name"
                w={"48%"}
                c="gray"
                value={formData.receiverName}
                onChange={(e) =>
                  setFormData({ ...formData, receiverName: e.target.value })
                }
              />
              <TextInput
                placeholder="Enter Reciever Mobile"
                label="Reciever Mobile"
                w={"48%"}
                c="gray"
                value={formData.receiverMobile}
                onChange={(e) =>
                  setFormData({ ...formData, receiverMobile: e.target.value })
                }
              />
            </Flex>
            <TextInput
              placeholder="Enter Address"
              label="Receiver Address"
              w={"90%"}
              mx={"auto"}
              c="gray"
              value={formData.receiverAddress}
              onChange={(e) =>
                setFormData({ ...formData, receiverAddress: e.target.value })
              }
            />
          </Stack>
          <Stack w={"49%"}>
            <Flex w={"90%"} mx={"auto"} align={"center"} gap={15}>
              <TextInput
                placeholder="Enter Origin"
                label="Origin"
                w={"48%"}
                mx={"auto"}
                c="gray"
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
              />
              <TextInput
                placeholder="Enter Destination"
                label="Destination"
                w={"48%"}
                mx={"auto"}
                c="gray"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
              />
            </Flex>
            <Flex w={"90%"} mx={"auto"} align={"center"} gap={15}>
              <Text fw={600} c={"gray"}>
                Type :
              </Text>
              <Flex align={"center"} gap={20}>
                <Radio
                  checked={formData.shipmentType === "air"}
                  onChange={() =>
                    setFormData({ ...formData, shipmentType: "air" })
                  }
                  label="Air"
                />
                <Radio
                  checked={formData.shipmentType === "road"}
                  onChange={() =>
                    setFormData({ ...formData, shipmentType: "road" })
                  }
                  label="Road"
                />
              </Flex>
            </Flex>
            <TextInput
              placeholder="Enter Goods description"
              label="Goods Desc"
              w={"90%"}
              mx={"auto"}
              c="gray"
              value={formData.goodsDesc}
              onChange={(e) =>
                setFormData({ ...formData, goodsDesc: e.target.value })
              }
              required
            />
            <Flex w={"100%"} gap={10} align={"center"} justify={"center"}>
              <Stack w={"45%"}>
                <Flex
                  w={"100%"}
                  mx={"auto"}
                  align={"center"}
                  justify={"space-between"}
                >
                  <TextInput
                    placeholder="Enter Pieces"
                    label="Pieces"
                    w={"48%"}
                    c="gray"
                    value={formData.pieces}
                    onChange={(e) =>
                      setFormData({ ...formData, pieces: e.target.value })
                    }
                  />
                  <TextInput
                    placeholder="Enter Actaul WGT"
                    label="Actual WGT"
                    w={"48%"}
                    c="gray"
                    value={formData.actualWgt}
                    onChange={(e) =>
                      setFormData({ ...formData, actualWgt: e.target.value })
                    }
                  />
                </Flex>
                <Flex
                  w={"100%"}
                  mx={"auto"}
                  align={"center"}
                  justify={"space-between"}
                >
                  <TextInput
                    placeholder="Charged WGT"
                    label="Charged WGT"
                    w={"48%"}
                    c="gray"
                    value={formData.chargedWgt}
                    onChange={(e) =>
                      setFormData({ ...formData, chargedWgt: e.target.value })
                    }
                  />
                  <TextInput
                    placeholder="Enter Goods value Rs."
                    label="Goods value Rs."
                    w={"48%"}
                    c="gray"
                    value={formData.goodsValue}
                    onChange={(e) =>
                      setFormData({ ...formData, goodsValue: e.target.value })
                    }
                  />
                </Flex>
                <TextInput
                  placeholder="To Pat/ COD"
                  label="To Pat/ COD"
                  w={"100%"}
                  c="gray"
                  value={formData.toPatCod}
                  onChange={(e) =>
                    setFormData({ ...formData, toPatCod: e.target.value })
                  }
                />
              </Stack>
              <Stack w={"45%"}>
                <Flex
                  w={"100%"}
                  mx={"auto"}
                  align={"center"}
                  justify={"space-between"}
                >
                  <TextInput
                    placeholder="Gross Amount"
                    label="Gross Amount"
                    w={"48%"}
                    c="gray"
                    value={formData.grossAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, grossAmount: e.target.value })
                    }
                  />
                  <TextInput
                    placeholder="POD CHRG."
                    label="POD CHRG."
                    w={"48%"}
                    c="gray"
                    value={formData.podChrg}
                    onChange={(e) =>
                      setFormData({ ...formData, podChrg: e.target.value })
                    }
                  />
                </Flex>
                <Flex
                  w={"100%"}
                  mx={"auto"}
                  align={"center"}
                  justify={"space-between"}
                >
                  <TextInput
                    placeholder="ODA CHRG."
                    label="ODA CHRG."
                    w={"48%"}
                    c="gray"
                    value={formData.odaChrg}
                    onChange={(e) =>
                      setFormData({ ...formData, odaChrg: e.target.value })
                    }
                  />
                  <TextInput
                    placeholder="Insurance %"
                    label="Insurance %"
                    w={"48%"}
                    c="gray"
                    value={formData.insurancePercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insurancePercent: e.target.value,
                      })
                    }
                  />
                </Flex>
                <TextInput
                  placeholder="Net Amount"
                  label="Net Amount"
                  w={"100%"}
                  c="gray"
                  value={formData.netAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, netAmount: e.target.value })
                  }
                />
              </Stack>
            </Flex>
          </Stack>
        </Flex>
        <Divider c={"gray"} />
        <Flex w={"100%"} align={"center"} justify={"center"} gap={10}>
          <Button variant="outline" onClick={saveBill}>
            Print
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button
            variant="outline"
            onClick={() => props.setIsBillComponent(false)}
          >
            Find
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default CreateBill;
