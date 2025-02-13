import React from 'react';
import { Box, Container, Button, Text, Group, Anchor } from '@mantine/core';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box style={{ backgroundColor: '#1f2937', padding: '3rem 0' }}>
      <Container style={{ color: '#fff', textAlign: 'center' }}>
        {/* Company Info Section */}
        <Box style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700', marginBottom: '1rem' }}>
            Big Bash Courier Service
          </h4>
          <Text style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '400', marginBottom: '1rem' }}>
            Fast, reliable, and worldwide delivery solutions. Contact us for the best shipping experience.
          </Text>
          <Link
          href={"tel:+918168076003"}
            style={{
              backgroundColor: '#ec4899',
              color: '#fff',
              fontFamily: 'Roboto, sans-serif',
              padding:"0.6rem 1.5rem"
            }}
          >
            Contact Us
          </Link>
        </Box>

        {/* Social Media Links */}
        <Box style={{ marginBottom: '2rem' }}>
          <h5 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}>Follow Us</h5>
          <Group align="center" style={{ gap: '1rem' }}>
            <Button
              component="a"
              href="https://facebook.com"
              target="_blank"
              style={{ color: '#fff' }}
            >
              <FaFacebookF size={20} />
            </Button>
            <Button
              component="a"
              href="https://twitter.com"
              target="_blank"
              style={{ color: '#fff' }}
            >
              <FaTwitter size={20} />
            </Button>
            <Button
              component="a"
              href="https://instagram.com"
              target="_blank"
              style={{ color: '#fff' }}
            >
              <FaInstagram size={20} />
            </Button>
            <Button
              component="a"
              href="https://linkedin.com"
              target="_blank"
              style={{ color: '#fff' }}
            >
              <FaLinkedinIn size={20} />
            </Button>
          </Group>
        </Box>

        {/* Legal/Additional Links Section */}
        <Text style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '400', color: '#fff' }}>
          &copy; {new Date().getFullYear()} Big Bash Courier Service. All Rights Reserved.
        </Text>
        {/* <Group align='center' style={{ marginTop: '1rem' }}>
          <Anchor href="#" style={{ color: '#fff' }}>Privacy Policy</Anchor>
          <Anchor href="#" style={{ color: '#fff' }}>Terms of Service</Anchor>
        </Group> */}
      </Container>
    </Box>
  );
};

export default Footer;
