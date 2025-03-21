import {
  Button,
  Flex,
  LoadingOverlay,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React, { SetStateAction, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import { URL } from "@/lib/ApiHelper";
import toast, { Toaster } from "react-hot-toast";
import { BillData } from "./CreateBill";
import Image from "next/image";

const FindBills = (props: {
  setIsBillComponent: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [billData, setBillData] = useState<BillData[]>([]);
  const [totalRevanue,setTotalRevanue] = useState<number>(0)

  const getAllBill = async () => {
    setBillData([]);
    setIsLoading(true);
    let newDate1;
    if (fromDate) {
      newDate1 = new Date(fromDate);
      newDate1.setDate(newDate1.getDate() + 1);
    }
    let newDate2;
    if (toDate) {
      newDate2 = new Date(toDate);
      newDate2.setDate(newDate2.getDate() + 1);
    }

    const response = await axios
      .put(`${URL}/api/bill`, {
        senderName: senderName,
        destination: destination,
        fromDate: newDate1,
        toDate: newDate2
      })
      .then((response) => response.data);

    if (response.status === 200) {
      setBillData(response.allBills);
      const revanue = response.allBills.reduce((sum: number, acc: BillData) => {
        return sum + Number(acc.netAmount);
      }, 0);

      setTotalRevanue(revanue)
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(response.message);
      console.log(response);
    }
  };

  return (
    <Stack w={"90%"} mih={"85vh"} mx={"auto"}>
      <LoadingOverlay visible={isLoading} />
      <Toaster />
      <Flex w={"100%"} align={"center"} justify={"start"} gap={20}>
        <Image
          src={"/backArrow.png"}
          width={25}
          height={20}
          alt="empty image"
          onClick={() => props.setIsBillComponent(true)}
          style={{ cursor: "pointer" }}
        />
        <Text ml={20} fz={24} ff={"poppins"} c={"#696880"}>
          Find All Bills
        </Text>
        {/* <Button
          variant="outline"
          onClick={() => props.setIsBillComponent(true)}
        >
          Create New Bill
        </Button> */}
      </Flex>
      <Flex w={"100%"} align={"end"} justify={"start"} gap={20}>
        <DatePickerInput
          w={"20%"}
          c={"gray"}
          label="From Date"
          ff={"Poppins"}
          placeholder="Select From Date"
          radius={"md"}
          value={fromDate}
          onChange={(date) => setFromDate(date)}
        />
        <DatePickerInput
          w={"20%"}
          c={"gray"}
          label="To Date"
          ff={"Poppins"}
          placeholder="Select To Date"
          radius={"md"}
          value={toDate}
          onChange={(date) => setToDate(date)}
        />
        <TextInput
          placeholder="Enter Destination"
          label="Destination"
          w={"20%"}
          c="gray"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <TextInput
          placeholder="Enter sender name"
          label="Sender Name"
          w={"20%"}
          c="gray"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />
        <Button w={"10%"} variant="outline" onClick={getAllBill}>
          Find
        </Button>
      </Flex>
      <Stack w={"100%"} h={"100%"}>
        {billData.length > 0 ? (
          <Table horizontalSpacing="md" w={"100%"} mx={"auto"} my={10}>
            <Table.Thead bg={"#4da6cf"}>
              <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
                S.No
              </Table.Th>
              <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
                Tracking No.
              </Table.Th>
              <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
                Date
              </Table.Th>
              <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
                Destination
              </Table.Th>
              <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
                Sender
              </Table.Th>
              <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
                Reciever
              </Table.Th>
              <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
                Weight
              </Table.Th>
              <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
                Amount
              </Table.Th>
            </Table.Thead>

            <Table.Tbody bg={"white"}>
              {billData.length > 0 &&
                billData.map((bill: BillData, index: number) => (
                  <Table.Tr key={index} c={"gray"}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{bill.trackingNumber}</Table.Td>
                    <Table.Td>
                      {new Date(bill?.date || "").toISOString().split("T")[0]}
                    </Table.Td>
                    <Table.Td>{bill.destination}</Table.Td>
                    <Table.Td>{bill.senderName}</Table.Td>
                    <Table.Td>{bill.receiverName}</Table.Td>
                    <Table.Td>{bill.actualWgt}kg</Table.Td>
                    <Table.Td>Rs. {bill.netAmount}</Table.Td>
                  </Table.Tr>
                ))}
                <Table.Tr>
                  <Table.Td colSpan={7} ta={"end"} fw={600} fz={18} >Total Revanue</Table.Td>
                  <Table.Td fw={600} fz={18} >Rs {totalRevanue}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
          </Table>
        ) : (
          <Flex
            w={"100%"}
            h={"100%"}
            direction={"column"}
            align={"center"}
            justify={"center"}
          >
            <Image
              src={"/empty.png"}
              width={200}
              height={200}
              alt="empty image"
            />
            <Text ml={20} mt={10} fw={700} fz={24} ff={"poppins"} c={"#696880"}>
              No data found
            </Text>
          </Flex>
        )}
      </Stack>
    </Stack>
  );
};

export default FindBills;
