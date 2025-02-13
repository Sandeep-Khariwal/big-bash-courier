"use client";

import React from "react";
import { Box, Container, Stack, Text, Flex, Card, Image } from "@mantine/core";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import TypewriterClass from "typewriter-effect";

const images: string[] = ["/parcel3.png", "/parcel1.png", "/parcel2.jpg"];

const AboutPage = () => {
  const isMd = useMediaQuery(`(max-width: 968px)`);
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} width={"100%"} height={isMd ? 250 : 500} />
    </Carousel.Slide>
  ));
  return (
    <Box id="about" style={{ backgroundColor: "#f9f9f9" }}>
      {/* About Section */}
      <Container style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "700",
            color: "#4da6cf",
            marginBottom: "1rem",
            fontSize: isMd ? "2rem" : "3rem",
          }}
        >
          About Big Bash Courier Service
        </h2>
        <Text
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: "400",
            color: "#333",
            marginBottom: "2rem",
          }}
        >
          We are a global courier service offering fast, reliable, and secure
          shipping solutions to destinations across the world.
        </Text>
      </Container>

      <Flex
        w={"100%"}
        direction={isMd ? "column" : "row"}
        align={"start"}
        justify={"space-around"}
      >
        <Flex m={"auto"} align={"start"} w={isMd ? "95%" : "50%"}>
          {/* <Carousel */}
          <Carousel withIndicators loop>
            {slides}
          </Carousel>
        </Flex>
        <Stack w={isMd ? "95%" : "45%"} p={10}>
          {/* Mission and Values Section */}
          <Card
            shadow="md"
            bg={"white"}
            p={20}
            style={{ marginBottom: "3rem" }}
          >
            <Box style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#4da6cf",
                  fontSize: 30,
                }}
              >
                Our Mission
              </h3>
              <Text
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: "400",
                  color: "#333",
                  marginTop: "1rem",
                }}
              >
                Our mission is to provide the most reliable and efficient
                courier services globally, ensuring that all shipments are
                delivered safely and on time. We strive to offer exceptional
                customer service, cutting-edge tracking technology, and a
                network of trusted partners to meet the diverse shipping needs
                of individuals and businesses worldwide.
              </Text>
            </Box>
          </Card>
          <Card
            shadow="md"
            bg={"white"}
            p={20}
            style={{ marginBottom: "3rem" }}
          >
            <Box style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#4da6cf",
                  fontSize: 30,
                }}
              >
                Our Values
              </h3>
              <Text
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: "400",
                  color: "#333",
                  marginTop: "1rem",
                }}
              >
                Integrity, customer satisfaction, and global reach are at the
                core of our values. We believe in transparent communication and
                building strong relationships with our clients. By offering
                solutions tailored to meet their unique needs, we ensure that
                every service is aligned with the highest standards of quality
                and trust.
              </Text>
            </Box>
          </Card>
        </Stack>
      </Flex>

      {/* Our Team Section */}
      <Stack p={20} style={{ marginBottom: "3rem" }}>
        <Flex fz={isMd ? "2rem" : "3rem"} gap={20} fw={700} w={"100%"} align={"center"} justify={"center"} >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#4da6cf",
              textAlign: "center",
            }}
          >
            Meet Our {" "}
          </h3>
          <TypewriterClass
            options={{
              strings: [" Team!", " Members!"],
              autoStart: true,
              loop: true,
            }}
          />
        </Flex>
        <Stack align="center" style={{ marginTop: "2rem" }}>
          <Flex direction="row" justify="center" wrap="wrap" gap="4rem">
            {/* Team Member 1 */}
            <Box style={{ maxWidth: "250px", textAlign: "center" }}>
              <Image
                src="/founder.jpg"
                alt="Team Member 3"
                width={250}
                height={250}
                style={{ borderRadius: "50%" }}
              />
              <Text
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  color: "#4da6cf",
                  marginTop: "1rem",
                  fontSize: "2rem",
                }}
              >
                John Doe
              </Text>
              <Text
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: "400",
                  color: "#333",
                  fontSize: "1rem",
                }}
              >
                CEO & Founder
              </Text>
            </Box>

            {/* Team Member 2 */}
            <Box style={{ maxWidth: "250px", textAlign: "center" }}>
              <Image
                src="/founder.jpg"
                alt="Team Member 3"
                width={250}
                height={250}
                style={{ borderRadius: "50%" }}
              />
              <Text
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  color: "#4da6cf",
                  marginTop: "1rem",
                  fontSize: "2rem",
                }}
              >
                Jane Smith
              </Text>
              <Text
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: "400",
                  color: "#333",
                  fontSize: "1rem",
                }}
              >
                Operations Manager
              </Text>
            </Box>

            {/* Team Member 3 */}
            <Box style={{ maxWidth: "250px", textAlign: "center" }}>
              <Image
                src="/founder.jpg"
                alt="Team Member 3"
                width={250}
                height={250}
                style={{ borderRadius: "50%" }}
              />
              <Text
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  color: "#4da6cf",
                  marginTop: "1rem",
                  fontSize: "2rem",
                }}
              >
                Sarah Lee
              </Text>
              <Text
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: "400",
                  color: "#333",
                  fontSize: "1rem",
                }}
              >
                Marketing Director
              </Text>
            </Box>
          </Flex>
        </Stack>
      </Stack>

      {/* Call to Action Section */}
      <Box style={{ backgroundColor: "#4da6cf", padding: "3rem 0" }}>
        <Container style={{ color: "#fff", textAlign: "center" }}>
          <h4
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            Join Us in Our Journey!
          </h4>
          <Text
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: "400",
              marginBottom: "2rem",
            }}
          >
            If you're ready to start shipping or looking for a reliable partner,
            we are here to help. Get in touch with us now!
          </Text>
          <Link
            href={"tel:+918168076003"}
            style={{
              backgroundColor: "#ec4899",
              color: "#fff",
              fontFamily: "Roboto, sans-serif",
              padding: "0.6rem 1.5rem",
            }}
          >
            Contact Us
          </Link>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
