import {
  Button,
  Flex,
  LoadingOverlay,
  Modal,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

const CreateRateForCompanyAndLocation = (props: {
  open: boolean;
  setOpenAddRateModal: React.Dispatch<SetStateAction<boolean>>;
  createdCompany: { _id: string; name: string };
}) => {
  const [selectedCountries, setSelectedCountries] = useState<string>();
  const [rates, setRates] = useState<
    {
      weight: Number;
      price: Number;
    }[]
  >([
    {
      weight: 1,
      price: 0,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddInstallment = () => {
    let index = rates.length + 1;
    setRates([
      ...rates,
      {
        weight: index,
        price: 0,
      },
    ]);
  };

  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      const response = await axios
        .get("http://localhost:3000/api/country")
        .then((response) => response.data);

      if (response.status) {
        setIsLoading(false);
        const countries = response.countries.map((c: any) => c.name) || [];
        setCountries(countries);
      }
    };
    fetchCountries();
  }, []);

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

  const addRatesInCompany = async () => {
    setIsLoading(true);
    const response = await axios
      .post("http://localhost:3000/api/rate", {
        companyId: props.createdCompany._id,
        country: selectedCountries,
        weightPrice: rates,
      })
      .then((response) => response.data);

    if (response.status === 200) {
      toast.success(response.message);
      setIsLoading(false);
      props.setOpenAddRateModal(false);
    }
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Toaster />
      <Modal
        opened={props.open}
        onClose={() => {}}
        withCloseButton={false}
        title="Create Rate"
        size={"md"}
      >
        <Select
          data={countries}
          w={"10rem"}
          placeholder="Select country"
          rightSection={null}
          onChange={(e) => setSelectedCountries(e || "")}
        />
        {selectedCountries && (
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
              {rates.map((rate, i: number) => (
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
                      value={rate.weight.toString()} 
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
                      value={rate.price.toString()} 
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
        <Text
          onClick={handleAddInstallment}
          c="blue"
          mt="md"
          style={{ whiteSpace: "nowrap", cursor: "pointer" }}
        >
          + Add Rates
        </Text>
        <Flex w={"100%"} align={"center"} justify={"end"}>
          <Button variant="outlin" onClick={addRatesInCompany}>
            Add Rates
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default CreateRateForCompanyAndLocation;
