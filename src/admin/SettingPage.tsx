"use client";

import {
  Button,
  Divider,
  Flex,
  LoadingOverlay,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "@/lib/ApiHelper";

interface RateInterface {
  company: string;
  country: string;
  rates: { weight: number; price: number }[];
}

const SettingPage = () => {
  const [allCompanies, setAllCompanies] = useState<
    { _id: string; name: string }[]
  >([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rate, setRate] = useState<RateInterface>();

  useEffect(() => {
    fetchCountries();
    fetchCompanies();
  }, []);
  const [rates, setRates] = useState<
    {
      weight: number;
      price: number;
    }[]
  >([
    {
      weight: 1,
      price: 0,
    },
  ]);
  const fetchCompanies = async () => {
    setIsLoading(true);
    const response = await axios
      .get(`${URL}/api/company`)
      .then((response) => response.data);

    if (response.status === 200) {
      setIsLoading(false);
      const companies =
        response.companies.map((c: {_id:string,name:string}) => {
          return {
            _id: c._id,
            name: c.name,
          };
        }) || [];
      setAllCompanies(companies);
    } else {
      console.log(response);
    }
  };

  const fetchCountries = async () => {
    setIsLoading(true);
    const response = await axios
      .get(`${URL}/api/country`)
      .then((response) => response.data);

    if (response.status === 200) {
      setIsLoading(false);
      const countries = response.countries.map((c: {_id:string,name:string}) => c.name) || [];
      setCountries(countries);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      getRateForEdit();
    }
  }, [selectedCountry]);

  const getRateForEdit = async () => {
    setIsLoading(true);

    const response = await axios
      .patch(`${URL}/api/rate`, {
        companyId: selectedCompany,
        country: selectedCountry,
      })
      .then((response) => response.data);

    if (response.status === 200) {
      setIsLoading(false);
      if (response.rate === null) {
        setRates([]);
        return;
      }
      setRate(response.rate);
      setRates(response.rate.rates);
    } else {
      console.log(response);
    }
  };

  const handleAddInstallment = () => {
    const index = rates.length + 1;
    setRates([
      ...rates,
      {
        weight: index,
        price: 0,
      },
    ]);
  };

  const removeRates = (index: number) => {
    const newRates = rates.filter((_, i) => i !== index);
    setRates(newRates);
  };

  const handleRatesChange = (index: number, field: string, value: string) => {
    const updatedRates = [...rates];
    updatedRates[index] = {
      ...updatedRates[index],
      [field]: Number(value),
    };

    setRates(updatedRates);
  };

  const saveDetails = async () => {
    setIsLoading(true);
    const response = await axios
      .post(`${URL}/api/rate`, {
        companyId: rate?.company,
        country: selectedCountry,
        weightPrice: rates,
      })
      .then((response) => response.data);

    if (response.status === 200) {
      toast.success(response.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Stack w={"100%"} mih={"80vh"} p={20}>
      <Toaster />
      <LoadingOverlay visible={isLoading} />
      <Flex w={"100%"} mt={20} gap={20}>
        <Text fw={600} fz={24} ff={"Roboto"}>
          Edit your Rate
        </Text>
      </Flex>
      <Divider w={"90%"} />
      <Stack w={"100%"}>
        <Flex align={"center"} gap={20}>
          <Select
            placeholder="select company"
            onChange={(value) => setSelectedCompany(value || "")}
            data={allCompanies.map((company) => ({
              value: company._id,
              label: company.name,
            }))}
          />
          <Select
            placeholder="select country"
            data={countries}
            onChange={(val) => setSelectedCountry(val || "")}
            disabled={!selectedCompany}
          />
        </Flex>

        <Stack>
          {selectedCountry && (
            <Table mt={20}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>S.No</Table.Th>
                  <Table.Th>Weight</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rates.map((r, i: number) => (
                  <Table.Tr key={i}>
                    <Table.Td fw={600} fz={16}>
                      {i + 1}
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        name="weight"
                        onChange={
                          (e) => handleRatesChange(i, "weight", e.target.value) 
                        }
                        value={r.weight.toString()} 
                        placeholder="Enter weight"
                        w={"7rem"}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        name="price"
                        onChange={
                          (e) => handleRatesChange(i, "price", e.target.value) 
                        }
                        value={r.price.toString()} 
                        placeholder="Enter price"
                        w={"7rem"}
                      />
                    </Table.Td>
                    {i > 0 && (
                      <Table.Td>
                        <BiTrash
                          style={{ cursor: "pointer" }}
                          onClick={() => removeRates(i)}
                          size={30}
                        />
                      </Table.Td>
                    )}
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}

          {selectedCountry && (
            <Text
              onClick={handleAddInstallment}
              c="blue"
              mt="md"
              style={{ whiteSpace: "nowrap", cursor: "pointer" }}
            >
              + Add Rates
            </Text>
          )}
        </Stack>

        <Button
          w={"30%"}
          disabled={rates.length < 0}
          variant="gradient"
          bg={"linear-gradient(to left, #4da6cf, #ec4899)"}
          onClick={saveDetails}
        >
          Save Details
        </Button>
      </Stack>
    </Stack>
  );
};

export default SettingPage;
