import { Flex, Stack, Text } from "@mantine/core";
import React from "react";
import Hero from "./calculator/Hero";

const HomeSection = () => {
  return (
<Stack w={"90%"} h={"85vh"} mx={"auto"} style={{ overflowX: "auto", overflowY: "scroll" }}>
  <Flex w={"100%"} mx={"auto"} px={"auto"}>
    <Hero isTopMargin={false} />
  </Flex>
  <Stack
    w={"100%"}
    h={"150vh"}
    style={{ border: "1px solid#4da6cf" }}
    p={20}>
    <Text fz={24} ff={"poppins"} c={"#696880"}>
      Create Bill
    </Text>
  </Stack>
</Stack>

  );
};

export default HomeSection;
