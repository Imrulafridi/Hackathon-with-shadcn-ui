import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { cartProduct } from "@/lib/interface";
import StripeCheckOut from "./StripeCheckOut";

type Props = {
  product: cartProduct[];
  totalPrice: number;
  totalItems: number;
};

const CartOrderSummary = ({ totalPrice, totalItems, product }: Props) => {
  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total Price:
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            $ {totalPrice}.00
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total Items:
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {totalItems}
          </Text>
        </Flex>
      </Stack>
      <StripeCheckOut product={product} />
    </Stack>
  );
};

export default CartOrderSummary;
