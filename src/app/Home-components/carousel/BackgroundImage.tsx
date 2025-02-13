"use client";

import React from "react";
import { Image, Flex, Text, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import TypewriterClass  from "typewriter-effect";

const BackgroundWithHeading = () => {
  const imageUrl = "/parcel1.png";
  const isMd = useMediaQuery(`(max-width: 968px)`);
  return (
    <Flex
      mih="85vh"
      w="100%"
      style={{
        position: "relative",
      }}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt="Background Image"
        w="100%"
        h="85vh"
        style={{
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Overlay */}
      <Flex
        h="100%"
        w="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Text Centered Over Image */}
      <Container
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2, 
          color: "white",
          textAlign: "center",
        }}
      >
        <Text fw={700} ff={"Roboto"} c={"#4da6cf"} style={{whiteSpace:"nowrap"}} fz={isMd?30:50}>
        <TypewriterClass
            options={{
              strings: ["  Big Bash Courier!", " world wide courier!"],
              autoStart: true,
              loop: true,
            }}
          />
         
        </Text>
        <Text fw={600} ff={"Nunito"} c={"#FFFFFF"} fz={isMd?18:24}>
          International curier services
        </Text>
      </Container>
    </Flex>
  );
};

export default BackgroundWithHeading;
