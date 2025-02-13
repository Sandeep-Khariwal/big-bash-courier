"use client";

import { Box, Container, Card, Flex, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React from "react";
import TypewriterClass from "typewriter-effect";

const serviceData: {
  img: string;
  name: string;
  desc: string;
}[] = [
  {
    img: "/parcel1.png",
    name: "International Shipping",
    desc: "We ensure fast and safe delivery to any country we serve.  matter where you need to send, we’ve got it covered.",
  },
  {
    img: "/parcel2.jpg",
    name: " Domestic Shipping",
    desc: "Send parcels within the country quickly and safely. Our network covers all domestic routes with guaranteed delivery.",
  },
  {
    img: "/parcel3.png",
    name: "Express Delivery",
    desc: "Need it fast? Our express service guarantees that your parcel gets delivered quickly without any delay.",
  },
];

const Service = () => {
    const isMd = useMediaQuery(`(max-width: 968px)`);
  return (
    <Box w={"100%"} id="service" style={{ backgroundColor: "#f9f9f9" }} mt={20}>
      {/* Header Section */}
      <Container>
      <Flex fz={isMd ? "2rem" : "3rem"} gap={20} fw={700} w={"100%"} align={"center"} justify={"center"} >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#4da6cf",
              textAlign: "center",
            }}
          >
               Big Bash Courier {" "}
          </h3>
          <TypewriterClass
            options={{
              strings: [" Services!", " work!"],
              autoStart: true,
              loop: true,
            }}
          />
        </Flex>
        <Box
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: "400",
            color: "#ec4899",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Fast, Reliable, and Worldwide Delivery
        </Box>
      </Container>

      {/* Services Section */}
      <Stack w={"100%"}>
        <Flex
          w={"100%"}
          align={"center"}
          justify={"center"}
          gap={20}
          wrap={"wrap"}
        >
          {serviceData.length > 0 &&
            serviceData.map(
              (
                item: {
                  img: string;
                  name: string;
                  desc: string;
                },
                i: number
              ) => (
                <Card
                  key={i}
                  shadow="sm"
                  w={"350px"}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                  }}
                >
                  <Card.Section component="a" href={item.img}>
                    <Image
                      src={item.img}
                      width={350}
                      height={180}
                      alt="Norway"
                    />
                  </Card.Section>
                  <h5
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "600",
                      color: "#4da6cf",
                      marginTop: "1rem",
                    }}
                  >
                    {item.name}
                  </h5>
                  <Box
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "400",
                      color: "#333",
                      marginTop: "0.5rem",
                    }}
                  >
                    {item.desc}
                  </Box>
                </Card>
              )
            )}
        </Flex>
      </Stack>

      {/* CTA Section */}
      <Box
        style={{
          backgroundColor: "#4da6cf",
          padding: "2rem 0",
          marginTop: "3rem",
        }}
      >
        <Container>
          <h4
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "700",
              color: "#fff",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Ready to Ship with Big Bash Courier Service?
          </h4>
          <Box
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: "400",
              color: "#fff",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Contact us today to get the best deals and services for your
            shipping needs, both domestic and international.
          </Box>
          <a
            href={"#getStarted"}
            style={{
              backgroundColor: "#ec4899",
              alignItems: "center",
              textAlign: "center",
              margin: "auto",
              color: "#fff",
              fontFamily: "Roboto, sans-serif",
              padding: "0.6rem 1.5rem",
            }}
          >
            Get Started
          </a>
        </Container>
      </Box>
    </Box>
  );
};

export default Service;
