"use client";

import {
  Button,
  Card,
  Flex,
  LoadingOverlay,
  NumberInput,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { CgCalculator } from "react-icons/cg";
import RateTable from "./RateTable";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "@/lib/ApiHelper";
import CustomBookingModal from "./CustomBookingModal";

export interface TableData {
  company: {
    _id: string;
    name: string;
  };
  price: number;
  weight: number;
  country: string;
  isCustomBooking: boolean;
}
const Hero = (props: { isTopMargin: boolean }) => {
  const isMd = useMediaQuery(`(max-width: 968px)`);
  const user = useAppSelector((state) => state.user);

  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedWeight, setSelectedWeight] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rateTableData, setRateTableData] = useState<TableData[]>([]);
  const [noRateFound, setNoRateFound] = useState<boolean>(false);
  const [openCustomBookingModal, setOpenCustomBookingModal] =
    useState<boolean>(false);

  useEffect(() => {
    // Fetch all countries from REST Countries API
    const fetchCountries = async () => {
      setIsLoading(true);
      const response = await axios
        .get(`${URL}/api/country`)
        .then((response) => response.data);

      if (response.status === 200) {
        console.log("response : ", response);
        
        setIsLoading(false);
        const countries =
          response.countries.map(
            (c: { _id: string; name: string }) => c.name
          ) || [];
        setCountries(countries);
      } else {
        console.log(response);
      }
    };
    fetchCountries();
  }, []);

  const getRate = async () => {
    setNoRateFound(false);
    if (!selectedCountry) {
      toast.error("country is required!!");
      return;
    }
    if (!selectedWeight) {
      toast.error("weight is required!!");
      return;
    }
    setIsLoading(true);
    const response = await axios
      .put(`${URL}/api/rate`, {
        country: selectedCountry,
        weight: selectedWeight,
      })
      .then((response) => response.data);

    if (response.status) {
      setIsLoading(false);
      const discountFactor = (100 - user.discount) / 100;

      const updatedRates = response.rates.map((rate: TableData) => ({
        ...rate,
        price: rate.price * discountFactor,
      }));
      if (updatedRates.length === 0) {
        setNoRateFound(true);
      }
      setRateTableData(updatedRates);
    }
  };

  return (
    <Stack w={"100%"} mih={"20vh"}>
      <Toaster />
      <LoadingOverlay visible={isLoading} />
      <Card
        py={20}
        mt={props.isTopMargin ? -50 : 20}
        w={isMd ? "90%" : "70%"}
        mx={"auto"}
        shadow="xl"
        radius={"xl"}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Flex
          w={isMd ? "100%" : "90%"}
          h={"100%"}
          direction={isMd ? "column" : "row"}
          gap={20}
          mx={"auto"}
          align={"end"}
          justify={"space-around"}
        >
          <Select
            w={isMd ? "100%" : "auto"}
            label="Select Country"
            placeholder="Select country"
            data={countries}
            onChange={(s) => setSelectedCountry(s || "")}
            searchable
          />
          <NumberInput
            w={isMd ? "100%" : "auto"}
            label="Weight"
            required
            hideControls
            onChange={(e) => setSelectedWeight(Number(e))}
            placeholder="Enter weight"
          />
          <Button bg={" #4da6cf"} onClick={getRate}>
            <CgCalculator size={16} style={{ marginRight: "0.5rem" }} />{" "}
            Calculator
          </Button>
          {props.isTopMargin && (
            <Button
              bg={"#ec4899"}
              onClick={() => setOpenCustomBookingModal(true)}
            >
              Custom Booking
            </Button>
          )}
        </Flex>
      </Card>
      <Stack mt={20}>
        {rateTableData.length > 0 && (
          <RateTable rateTableData={rateTableData} />
        )}

        {noRateFound && (
          <Text fw={600} fz={22} ff={"Roboto"} ta={"center"}>
            weight is not available
          </Text>
        )}
      </Stack>
      {
        <CustomBookingModal
          opened={openCustomBookingModal}
          onClose={() => {
            setOpenCustomBookingModal(false);
          }}
        />
      }
    </Stack>
  );
};

export default Hero;
