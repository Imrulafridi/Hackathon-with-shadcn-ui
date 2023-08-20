"use client";

import { cartProduct } from "@/lib/interface";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Image,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Button } from "../ui/button";
import { MdLocalShipping } from "react-icons/md";
import { urlForImage } from "../../../sanity/lib/image";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/cartSlice";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  product: cartProduct;
  userId: string;
  qty: number;
};

export default function ProductsDetails(props: Props) {
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const subtract = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleRequestData = async () => {
    const res = await fetch(`/api/cart/${props.userId}`);
    if (!res.ok) {
      throw new Error("Failed to Fetch Data From API");
    }
    const data = await res.json();
    return data;
  };

  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: props.product._id,
        quantity: qty,
        image: urlForImage(props.product.image).url(),
        product_name: props.product.title,
        price: props.product.price,
        totalPrice: props.product.price * props.qty,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to add Data");
    }
  };

  const handleCart = async () => {
    setIsLoading(true);
    try {
      const cartData = await handleRequestData();
      const existingItem = cartData.cartItems.find(
        (item: any) => item._id === props.product._id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + qty;
        const newPrice = props.product.price * newQuantity;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
          {
            method: "PUT",
            body: JSON.stringify({
              product_id: props.product._id,
              quantity: newQuantity,
              price: newPrice,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update data");
        }
      } else {
        await handleAddToCart();
      }
    } catch (error) {
      console.log((error as { message: string }).message);
    }

    setIsLoading(false);
  };

  const addtoCart = () => {
    toast.promise(handleCart(), {
      loading: "Adding To Cart",
      success: "Product added To Cart",
      error: "Failed to Add Product to cart",
    });
    dispatch(addToCart({ product: props.product, quantity: qty }));
  };
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={urlForImage(props.product.image).url()}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {props.product.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={"bold"}
              fontSize={"2xl"}
            >
              Price ${props.product.price}.00 USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {props.product.description}
              </Text>
            </VStack>
          </Stack>

          <div className="flex justify-center items-center gap-5 text-2xl font-bold mt-8">
            <p>Quantity:</p>
            <button
              onClick={subtract}
              className="flex justify-center items-center w-10 h-10 border border-gray-700 rounded-full"
            >
              -
            </button>
            {qty}
            <button
              onClick={() => setQty(qty + 1)}
              className="flex justify-center items-center w-10 h-10 border border-gray-700 rounded-full"
            >
              +
            </button>
          </div>

          <Button onClick={() => addtoCart()} variant="default">
            Add To Cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Toaster />
    </Container>
  );
}
