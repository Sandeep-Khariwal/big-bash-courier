"use client";

import { Button, Card, Flex, NumberInput, Select, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { CgCalculator } from "react-icons/cg";
import RateTable from "./RateTable";
import { useMediaQuery } from "@mantine/hooks";

const Hero = () => {
  const [showTable, setShowTable] = useState<boolean>(false);
  const isMd = useMediaQuery(`(max-width: 968px)`);

  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    // Fetch all countries from REST Countries API
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        await response.json();
        setCountries(["America", "Canada", "England", "Australia"]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);
  return (
    <Stack w={"100%"} mih={"40vh"}>
      <Card
        py={20}
        mt={-50}
        w={"70%"}
        mx={"auto"}
        shadow="xl"
        radius={"xl"}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Flex
          w={"70%"}
          h={"100%"}
          direction={isMd ? "column" : "row"}
          gap={20}
          mx={"auto"}
          align={"end"}
          justify={"space-around"}
        >
          <Select
            label="Select Country"
            placeholder="Select country"
            data={countries}
            searchable
          />
          <NumberInput
            label="Weight"
            required
            hideControls
            placeholder="Enter weight"
          />
          <Button bg={" #4da6cf"} onClick={() => setShowTable(!showTable)}>
            <CgCalculator size={16} style={{ marginRight: "0.5rem" }} />{" "}
            Calculator
          </Button>
        </Flex>
      </Card>
      <Stack mt={20}>{showTable && <RateTable />}</Stack>
    </Stack>
  );
};

export default Hero;
