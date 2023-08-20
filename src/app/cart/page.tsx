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

const CartData = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalAmount);

  const loading = useAppSelector(selectIsLoading);

  if(loading){
    return (
      <h1>LOADING....</h1>
    )
  }


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
              <CartItem key={item._id} {...item} />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary totalPrice={totalPrice} totalItems={totalItems} />
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
};

export default CartData;

// // import CartItemCard from "@/components/shared/CartItemCard";
// // import Wrapper from "@/components/shared/Wrapper";
// import { useAppSelector } from "@/redux/hook";
// import { BiShoppingBag } from "react-icons/bi";
// import { selectIsLoading } from "@/redux/cartSlice";
// // import StripeCheckOutButton from "@/components/sections/CheckOut";
// import { Toaster, toast } from "react-hot-toast";
// import {Image} from "@chakra-ui/react"
// import { urlForImage } from "../../../sanity/lib/image";

// const CartDataLoadingFromApi = () => {
//   return (
//     <div>
//       <div className="flex justify-center items-center w-full h-40">
//         <h1>Loading Data</h1>
//       </div>
//     </div>
//   );
// };

// const LoadedCartData = () => {
//   const cartItems = useAppSelector((state) => state.cart.items);
//   const totalItems = useAppSelector((state) => state.cart.totalQuantity);
//   const totalPrice = useAppSelector((state) => state.cart.totalAmount);
//   console.log(cartItems[0].image);

//   if (cartItems.length > 0) {
//     return (
//       <div>
//         <h3>Shopping Cart</h3>
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-x-5 px-5">
//           <div className="basis-3/4">
//             {cartItems.map((itm) => (
//               //   <CartItemCard key={itm._id} cartItem={itm} />
//               <div key={itm._id}>
//                 <h3>{itm.title}</h3>
//                 <Image src={itm.image as unknown as string} alt="image" width={200} height={300} />
//                 <h1>{itm.price}</h1>
//                 <h2>{itm.quantity}</h2>
//                 <p>{itm.totalPrice}</p>
//               </div>
//             ))}
//           </div>
//           <div className="basis-1/4 bg-gray-200 rounded-md w-full h-full  mt-5 sm:mt-0 p-2 self-start">
//             <div className="flex flex-col items-center justify-between gap-5">
//               <h4>Order Summary</h4>
//               <div className="flex justify-between items-center w-full">
//                 <div>
//                   <p>Quantity</p>
//                 </div>
//                 <div>
//                   <p>{totalItems}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center w-full">
//                 <div>
//                   <p>Total Amount</p>
//                 </div>
//                 <div>
//                   <p>${totalPrice}</p>
//                 </div>
//               </div>
//               <div>{/* <StripeCheckOutButton products={cartItems} /> */}</div>
//             </div>
//           </div>
//         </div>
//         <Toaster />
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <h3>Shopping Cart</h3>

//         <div className="flex flex-col w-full gap-10 h-full justify-center items-center">
//           <BiShoppingBag size={200} />
//           <h1>Your shopping bag is empty</h1>
//           {/* <StartShopping /> */}
//         </div>
//       </div>
//     );
//   }
// };

// const CartPage = () => {
//   const isLoading = useAppSelector(selectIsLoading);

//   return <>{isLoading ? <CartDataLoadingFromApi /> : <LoadedCartData />}</>;
// };

// export default CartPage;
