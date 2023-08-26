import {
  CloseButton,
  Image,
  Box,
  Text,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hook";
import { rmFromCart } from "../../redux/cartSlice";

export const CartItem = (props: any) => {
  const { image, price, title } = props;
  const dispatch = useAppDispatch();

  const onClickDelete = async () => {
    await fetch(`/api/cart/product/${props._id}`, {
      method: "DELETE",
    });
  };

  const deleteFromCart = () => {
    toast.promise(onClickDelete(), {
      loading: "Removing Product",
      success: "Product Removed",
      error: "Failed to Remove Product",
    });
    dispatch(rmFromCart({ id: props._id }));
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <Stack direction="row" spacing="5" width="full">
        <Image
          width="120px"
          height="120px"
          fit="cover"
          src={image as unknown as string}
          alt={title}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium" content="center">
              {props.name}
            </Text>
          </Stack>
        </Box>
      </Stack>

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
       PRICE: $ {price}.00
        <CloseButton
          aria-label={`Delete ${title} from cart`}
          onClick={() => deleteFromCart()}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
         <CloseButton
          aria-label={`Delete ${props.name} from cart`}
          onClick={() => deleteFromCart()}
        />
       PRICE: $ {price}.00
      </Flex>
    </Flex>
  );
};
