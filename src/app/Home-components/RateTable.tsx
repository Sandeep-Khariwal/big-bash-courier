"use client";

import { Button, ScrollArea, Table } from "@mantine/core";

const elements = [
  { rate: 6, weight: 1, address: "Canada", name: "DHL" },
  { rate: 7, weight: 12, address: "Australia", name: "FEDEX" },
  { rate: 39, weight: 3, address: "America", name: "UPS" },
  { rate: 3, weight: 47, address: "Dubai", name: "UPS" },
];

export default function RateTable() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.weight}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>{element.rate}</Table.Td>
      <Table.Td>
        {" "}
        <Button
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
    </ScrollArea>);
}
