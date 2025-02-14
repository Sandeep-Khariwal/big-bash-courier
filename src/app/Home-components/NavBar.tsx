"use client";

import { useState } from "react";
import Link from "next/link";
import { Text, Button, Menu, Flex, Stack, Box, Image } from "@mantine/core";
import { BiUser, BiUserPlus } from "react-icons/bi";
import SignInModal from "./AdminSignInModal";
import UserSignInModal from "./UserSignInModal";
import { useMediaQuery } from "@mantine/hooks";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export enum UserRole {
  Admin = "Admin",
  User = "User",
}

const Navbar = () => {
  const isMd = useMediaQuery(`(max-width: 968px)`);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showNov, setShowNav] = useState<boolean>(false);

  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#service" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <Stack
      w={"100%"}
      style={{ position: "fixed", zIndex: 1234 }}
      top={0}
      left={0}
    >
      <Flex
        w={"100%"}
        p={8}
        align={"center"}
        justify={"space-around"}
        bg={"#4da6cf"}
      >
        <Text fw={600} c={"white"} ff={"Nunito"} fz={16}>
          +918168076003
        </Text>
        <Text fw={600} c={"white"} ff={"Nunito"} fz={16}>
          Big Bash Courier
        </Text>
      </Flex>
      <Flex
        mt={-20}
        align={"center"}
        justify={"space-around"}
        bg={"#ec4899"}
        p={10}
      >
        <Stack align="center" gap={0} >
          <Image src={"/logo.png"} w={50} alt="Not found" />
          <Text fw={600} c={"white"} ff={"Nunito"} fz={18}>
            Big Bash Courier
          </Text>
        </Stack>
        {isMd && (
          <Box>
            {showNov ? (
              <IoClose
                onClick={() => setShowNav(!showNov)}
                style={{ color: "white" }}
                size={22}
              />
            ) : (
              <FaBars
                onClick={() => setShowNav(!showNov)}
                style={{ color: "white" }}
                size={22}
              />
            )}
          </Box>
        )}

        {!isMd && (
          <Flex align={"center"} gap={20} px={20}>
            {menuLinks.map((l, i: number) => (
              <Link
                key={i}
                onClick={() => setShowNav(!showNov)}
                href={`${l.href}`}
                style={{
                  fontFamily: "Nunito",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 20,
                  border: "none",
                  borderBottom: "1px solid transparent",
                  transition: "border-bottom 0.3s ease",
                }}
                className="menu-link"
              >
                {l.label}
              </Link>
            ))}
            <Menu shadow="md" width={120} position="bottom-start" >
              <Menu.Target>
                <Button
                  c={"white"}
                  ml={10}
                  variant="outline"
                  style={{ border: "1px solid white" }}
                >
                  Sign In
                </Button>
              </Menu.Target>

              <Menu.Dropdown    style={{ zIndex: 1235}}>
                <Menu.Item
                  onClick={() => {
                    setMenuOpen(true)
                    setSelectedRole(UserRole.Admin)
                  }}
                  leftSection={<BiUser size={14} />}
                >
                  Admin
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setMenuOpen(true)
                    setSelectedRole(UserRole.User)
                  }}
                  leftSection={<BiUserPlus size={16} />}
                >
                  User
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        )}
      </Flex>
      {isMd && showNov && (
        <Stack gap={20} px={20} bg={"#ec4899"} align="center" py={10}>
          {menuLinks.map((l, i: number) => (
            <Link
              key={i}
              onClick={() => setShowNav(!showNov)}
              href={`${l.href}`}
              style={{ fontFamily: "Nunito", color: "white" }}
            >
              {l.label}
            </Link>
          ))}
          <Menu shadow="md" width={120} position="bottom-start">
            <Menu.Target>
              <Button
                c={"white"}
                ml={10}
                variant="outline"
                style={{ border: "1px solid white" }}
              >
                Sign In
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setMenuOpen(true)
                  setSelectedRole(UserRole.Admin)
                }}
                leftSection={<BiUser size={14} />}
              >
                Admin
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setMenuOpen(true)
                  setSelectedRole(UserRole.User)
                }}
                leftSection={<BiUserPlus size={16} />}
              >
                User
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Stack>
      )}
      {UserRole.Admin === selectedRole && (
        <SignInModal
          opened={menuOpen}
          onClose={() => {
            setMenuOpen(false);
            setSelectedRole(null);
          }}
        />
      )}
      {UserRole.User === selectedRole && (
        <UserSignInModal
          opened={menuOpen}
          onClose={() => {
            setMenuOpen(false);
            setSelectedRole(null);
          }}
        />
      )}
    </Stack>
  );
};

export default Navbar;
