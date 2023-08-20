import { cartProduct } from "@/lib/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { urlForImage } from "../../sanity/lib/image";


export interface cartData {
  items: Array<cartProduct>;
  totalQuantity: number;
  totalAmount: number;
  isLoading: boolean;
  error: any;
}

const initialState: cartData = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
};



export const fetchData = createAsyncThunk(
  "cart/fetchData",
  async (userId: string) => {
    const res = await fetch(`/api/cart/${userId}`);

    if (!res.ok) {
      console.log("NO USER DATA FOUND");
    }

    const data = await res.json();

    console.log("asyncfetchdata => ",data)

    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: cartData,
      action: PayloadAction<{ product: cartProduct; quantity: number }>
    ) => {
      const newItem = action.payload.product;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      state.totalQuantity = state.totalQuantity + action.payload.quantity;
      state.totalAmount =
        state.totalAmount +
        action.payload.quantity * action.payload.product.price;

      if (!existingItem) {
        const totalPrice = newItem.price * action.payload.quantity;
        state.items.push({
          ...newItem,
          // @ts-ignore
          image: urlForImage(newItem.image).url() as string,
          quantity: action.payload.quantity,
          totalPrice,
        });
      } else {
        const totalPrice =
          existingItem.totalPrice +
          existingItem.price * action.payload.quantity;
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = totalPrice;
      }
    },
    rmFromCart: (state: cartData, action: PayloadAction<{id: cartProduct["_id"]}>) => {
      const id = action.payload.id
      const newItems = state.items.filter((item) => item._id !== id)
      state.items = newItems 
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice ,0)
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity ,0)
    } 
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { cartItems, totalQuantity, totalAmount } = action.payload;
      state.items = cartItems;
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      state.isLoading = false;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false, 
      state.error = action.error;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, rmFromCart } = cartSlice.actions;
export const selectIsLoading = (state: RootState) => state.cart.isLoading;

export default cartSlice.reducer;
