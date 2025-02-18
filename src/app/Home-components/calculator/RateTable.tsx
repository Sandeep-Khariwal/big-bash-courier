"use client";

import { Button, ScrollArea, Table } from "@mantine/core";
import { TableData } from "./Hero";
import {  useState } from "react";
import BookOrder from "./BookOrder";

export default function RateTable(props:{
  rateTableData:TableData[]
}) {
  const [bookParcel , setBookParcel] = useState<TableData | null>(null)
  const rows = props.rateTableData.map((element:TableData) => (
    <Table.Tr key={element.company._id}>
      <Table.Td>{element.company.name}</Table.Td>
      <Table.Td>{element.weight}</Table.Td>
      <Table.Td>{element.country}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>
        {" "}
        <Button
        onClick={()=>setBookParcel(element)}
          style={{
            backgroundColor: "#ec4899",
            color: "#fff",
            fontFamily: "Roboto, sans-serif",
            padding: "0.5rem 1.2rem",
          }}
        >
          Book now
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
    <ScrollArea w={"95%"} mx={"auto"} >
    <Table horizontalSpacing="md" w={"60%"} mx={"auto"} my={10}>
      <Table.Thead bg={"#4da6cf"}>
        <Table.Tr>
          <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
            Company
          </Table.Th>
          <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
            Weight(kg)
          </Table.Th>
          <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
            Location
          </Table.Th>
          <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
            Price
          </Table.Th>
          <Table.Th c={"white"} ff={"Poppins"} fw={600} fz={18}>
            Action
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody bg={"white"}>{rows}</Table.Tbody>
    </Table>
    </ScrollArea>
    {
      bookParcel != null && <BookOrder orderData={bookParcel} onClose={()=>setBookParcel(null)} />
    }
    </>);
}
