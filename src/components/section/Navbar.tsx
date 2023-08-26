"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { fetchData } from "@/redux/cartSlice";

interface Props {
  children: React.ReactNode;
}

const Links = ["Male", "Female", "Kids", "Products"];

const NavLink = (props: Props) => {
  const { children } = props;
  const link = children?.toLocaleString();
  return (
    <Link href={`/${link?.toLowerCase()}`}>
      <Box
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {children}
      </Box>
    </Link>
  );
};

const Logo = () => {
  return <Image src={`/logo.webp`} alt="logo" width={150} height={150} />;
};

export default function Navbar({ userId }: { userId: string }) {
  const quantity: number = useAppSelector((state) => state.cart.totalQuantity);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId]);

  return (
    <div>
      <Box
        className="container"
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href={"/"}>
              <Logo />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Box className="mr-4">
              <UserButton afterSignOutUrl="/" />
            </Box>

            <Link href="/cart">
              <Button className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                  {quantity}
                </div>
              </Button>
            </Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  );
}
