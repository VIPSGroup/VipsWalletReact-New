import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartCount: JSON.parse(localStorage.getItem("cart")),
  },
  reducers: {
    addCart: (state, action) => {
      state.cartCount = action.payload;
    },
    removeCart: (state, action) => {
      state.cartCount = state.cartCount.filter((e) => e.product.Id !== action.payload);
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
