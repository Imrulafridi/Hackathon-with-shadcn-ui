"use client";

import { ReactNode } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const Logo = (props: any) => {
  return <Image src={`/logo.webp`} alt="logo" width={150} height={50} />;
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Link href={"/"}>
                <Logo color={useColorModeValue("gray.700", "white")} />
              </Link>
            </Box>
            <Text fontSize={"sm"}>
              Small, artisan label that offers a thoughtfully curated collection
              of high quality everyday essentials made.
            </Text>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Box as="a" href={"/male"}>
              Male
            </Box>
            <Box as="a" href={"/female"}>
              Female
            </Box>
            <Box as="a" href={"/kids"}>
              Kids
            </Box>
            <Box as="a" href={"/products"}>
              All Products
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={"/"}>
              About
            </Box>
            <Box as="a" href={"/"}>
              Press
            </Box>
            <Box as="a" href={"/"}>
              Careers
            </Box>
            <Box as="a" href={"/"}>
              Contact
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={"/"}>
              Help Center
            </Box>
            <Box as="a" href={"/"}>
              Terms of Service
            </Box>
            <Box as="a" href={"/"}>
              Legal
            </Box>
            <Box as="a" href={"/"}>
              Privacy Policy
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Box as="a" href={"/"}>
              Facebook
            </Box>
            <Box as="a" href={"/"}>
              Twitter
            </Box>
            <Box as="a" href={"/"}>
              Instagram
            </Box>
            <Box as="a" href={"/"}>
              LinkedIn
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
