"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, Text, Box, Flex, Button, Stack, Burger } from "@mantine/core";
// import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

enum Links {
  HOME = "home",
  ABOUT = "about",
  PRODUCT = "products",
  CONTACT = "contact",
}

export default function Navbar() {
  const [opened, setOpened] = useState<boolean>(false);
  const [openedLogin, setOpenedLogin] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<Links>(Links.CONTACT);
  const isMd = useMediaQuery("(max-width: 968px)");

  return (
    <Stack
      style={{
        backgroundImage: "url('/products.jpg')",
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
        color: "white",
        padding: "10px 0",
        position: "relative",
      }}
    >
      {/* Overlay for background image */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Navigation bar */}
      <Flex w={"100%"} align={"center"} justify={"space-between"} p="10px">
        {/* Logo */}
        <Image src="/logo.jpg" alt="Logo" width={150} height={50} />

        {/* Burger icon for mobile */}
        {isMd && (
          <Burger
            opened={opened}
            onClick={() => setOpened((prev) => !prev)}
            style={{ zIndex: 2 }}
          />
        )}

        {/* Navigation links (Responsive) */}
        {!isMd && (
          <Flex gap={20} style={{ zIndex: 2 }}>
            <Link
              href={"#home"}
              onPointerMove={() => setActiveLink(Links.HOME)}
              style={{
                color: activeLink === Links.HOME ? "#d2af6f" : "white",
                fontSize: 20,
                borderBottom:
                  activeLink === Links.HOME
                    ? "2px solid #d2af6f"
                    : "2px solid black",
                transition: "border-bottom 0.3s ease, color 0.5s ease",
              }}
            >
              Home
            </Link>
            <Link
              href={"#about"}
              onPointerMove={() => setActiveLink(Links.ABOUT)}
              style={{
                color: activeLink === Links.ABOUT ? "#d2af6f" : "white",
                fontSize: 20,
                borderBottom:
                  activeLink === Links.ABOUT
                    ? "2px solid #d2af6f"
                    : "2px solid black",
                transition: "border-bottom 0.3s ease, color 0.5s ease",
              }}
            >
              About us
            </Link>

            <Menu
              shadow="md"
              width={200}
              opened={openedLogin}
              onOpen={() => setOpenedLogin(true)}
              onClose={() => setOpenedLogin(false)}
            >
              <Menu.Target>
                <Button variant="outline" style={{ border: "1px solid white" }} c={"white"}>
                  Sign in
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Admin</Menu.Item>
                <Menu.Item>User</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        )}
      </Flex>

      {/* Mobile menu toggle */}
      {isMd && opened && (
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            zIndex: 3,
          }}
        >
          <Link
            href={"#home"}
            onPointerMove={() => setActiveLink(Links.HOME)}
            style={{
              color: activeLink === Links.HOME ? "#d2af6f" : "white",
              fontSize: 20,
              display: "block",
              padding: "10px 0",
              borderBottom:
                activeLink === Links.HOME
                  ? "2px solid #d2af6f"
                  : "2px solid transparent",
              transition: "border-bottom 0.3s ease, color 0.5s ease",
            }}
          >
            Home
          </Link>
          <Link
            href={"#about"}
            onPointerMove={() => setActiveLink(Links.ABOUT)}
            style={{
              color: activeLink === Links.ABOUT ? "#d2af6f" : "white",
              fontSize: 20,
              display: "block",
              padding: "10px 0",
              borderBottom:
                activeLink === Links.ABOUT
                  ? "2px solid #d2af6f"
                  : "2px solid transparent",
              transition: "border-bottom 0.3s ease, color 0.5s ease",
            }}
          >
            About us
          </Link>
          <Link
            href={"#contact"}
            onPointerMove={() => setActiveLink(Links.CONTACT)}
            style={{
              color: activeLink === Links.CONTACT ? "#d2af6f" : "white",
              fontSize: 20,
              display: "block",
              padding: "10px 0",
              borderBottom:
                activeLink === Links.CONTACT
                  ? "2px solid #d2af6f"
                  : "2px solid transparent",
              transition: "border-bottom 0.3s ease, color 0.5s ease",
            }}
          >
            Contact us
          </Link>
        </Box>
      )}

      {/* Main Content */}
      <Flex w={"100%"} h={"90%"}>
        <Text fz={54} m={"auto"} fw={700} style={{ color: "#d2af6f", zIndex: 2 }}>
          True Bond India
        </Text>
      </Flex>
    </Stack>
  );
}
