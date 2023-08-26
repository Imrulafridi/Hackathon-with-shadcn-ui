"use client";

import { useAppSelector } from "@/redux/hook";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CartItem } from "./../../components/section/CartItem";
import CartOrderSummary from "../../components/section/CarOrderSummary";
import Link from "next/link";
import { selectIsLoading } from "@/redux/cartSlice";
import { MdShoppingBag } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const CartDataLoadingFromApi = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-full h-40">
        <h1>Loading Data</h1>
      </div>
    </div>
  );
};

const CartLoadedData = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalAmount);

  if (cartItems.length > 0) {
    return (
      <Box
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({totalItems})
            </Heading>

            <Stack spacing="6">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary
              totalPrice={totalPrice}
              totalItems={totalItems}
              product={cartItems}
            />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link href={"/products"} className="text-blue-700">
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    );
  } else {
    return (
      <div className="container mx-auto flex flex-col justify-center items-center h-[50vh] space-y-8">
        <MdShoppingBag className="h-56 w-56" />
        <h1 className="font-bold text-4xl font-serif">YOUR CART IS EMPTY</h1>
        <Link href={`/products`}>
          <Button className="m-2 w-56 h-12">
            <ShoppingCart className="mr-2 h-5 w-5" /> Start Shopping
          </Button>
        </Link>
      </div>
    );
  }
};

const CartData = () => {
  const isLoading = useAppSelector(selectIsLoading);

  return <>{isLoading ? <CartDataLoadingFromApi /> : <CartLoadedData />}</>;
};

export default CartData;
